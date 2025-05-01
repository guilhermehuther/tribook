from fastapi import APIRouter, HTTPException
from sqlmodel import select

from ..model.model import UserCreate, User
from ..helper.db import session_depends

router = APIRouter()

@router.post("/users/login", response_model=User, tags=["users"])
def create_item(item: UserCreate, session: session_depends):
    try:
        data = session.exec(
            select(User)
                .filter(User.name == item.name)
                .filter(User.password == item.password)
        ).one()
        
        if not data:
            raise HTTPException(status_code=204, detail="User not found.")
 
    except:
        raise HTTPException(status_code=401, detail="User or Password invalid.")
    
    return data
