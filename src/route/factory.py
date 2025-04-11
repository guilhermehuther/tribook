from abc import ABC, abstractmethod
from fastapi import APIRouter, HTTPException
from sqlmodel import SQLModel, select
from typing import Type, TypeVar

from ..helper.db import session_depends

class RoutesAbstractFactory(ABC):
    @abstractmethod
    def create_router(self) -> APIRouter:
        pass

T = TypeVar("T", bound=SQLModel)

class CRUDRouteFactory(RoutesAbstractFactory):
    def __init__(
        self,
        model: Type[T],
        read_model: Type[SQLModel],
        create_model: Type[SQLModel],
        update_model: Type[SQLModel],
        prefix: str
    ):
        self.model = model
        self.read_model = read_model
        self.create_model = create_model
        self.update_model = update_model
        self.prefix = prefix
        self.name_prefix = prefix.strip("/")

    def create_router(self) -> APIRouter:
        router = APIRouter(
            prefix=self.prefix, 
            tags=[self.name_prefix]
        )

        model = self.model
        read_model = self.read_model
        create_model = self.create_model
        update_model = self.update_model
        name_prefix = self.name_prefix

        @router.get("/", response_model=list[read_model], operation_id=f"read_all_{name_prefix}")
        def read_all(session: session_depends):
            return session.exec(select(model)).all()

        @router.get("/{item_id}", response_model=model, operation_id=f"read_one_{name_prefix}")
        def read_one(item_id: int, session: session_depends):
            item = session.get(model, item_id)
            
            if not item:
                raise HTTPException(status_code=404, detail="Item not found")
            return item

        @router.post("/", response_model=model, operation_id=f"post_{name_prefix}")
        def create_item(item: create_model, session: session_depends):
            db_item = model.model_validate(item)
            
            session.add(db_item)
            session.commit()
            session.refresh(db_item)
            
            return db_item

        @router.patch("/{item_id}", response_model=model, operation_id=f"patch_{name_prefix}")
        def update_item(item_id: int, item: update_model, session: session_depends):
            db_item = session.get(model, item_id)
            
            if not db_item:
                raise HTTPException(status_code=404, detail="Item not found")
            
            data = item.model_dump(exclude_unset=True)
            
            db_item.sqlmodel_update(data)
            
            session.add(db_item)
            session.commit()
            session.refresh(db_item)
            
            return db_item

        @router.delete("/{item_id}", operation_id=f"delete_{name_prefix}")
        def delete_item(item_id: int, session: session_depends):
            db_item = session.get(model, item_id)
            
            if not db_item:
                raise HTTPException(status_code=404, detail="Item not found")
            
            session.delete(db_item)
            session.commit()
            
            return {"deleted": item_id}
        
        return router
