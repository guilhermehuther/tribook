from fastapi import APIRouter

router = APIRouter()

from .factory import CRUDRouteFactory
from ..model.model import (
    User, UserCreate, UserPublic,
    Interaction, InteractionCreate, InteractionPublic, InteractionUpdate,
    Post, PostCreate, PostPublic, PostUpdate
)

user_factory = CRUDRouteFactory(
    model=User,
    read_model=UserPublic,
    create_model=UserCreate,
    update_model=UserCreate,
    prefix="/users"
)

interaction_factory = CRUDRouteFactory(
    model=Interaction,
    read_model=InteractionPublic,
    create_model=InteractionCreate,
    update_model=InteractionUpdate,
    prefix="/interaction"
)

post_factory = CRUDRouteFactory(
    model=Post,
    read_model=PostPublic,
    create_model=PostCreate,
    update_model=PostUpdate,
    prefix="/post"
)

user_router = user_factory.create_router()
interaction_router = interaction_factory.create_router()
post_router = post_factory.create_router()


router.include_router(user_router)
router.include_router(interaction_router)
router.include_router(post_router)
