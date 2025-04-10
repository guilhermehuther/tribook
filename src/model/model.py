from sqlmodel import Field, SQLModel, Relationship, UniqueConstraint
from typing import Optional

# Interaction
class InteractionBase(SQLModel):
    is_like: bool

    id_post: int = Field(foreign_key="post.id_post")
    id_user: int = Field(foreign_key="user.id_user")

class Interaction(InteractionBase, table=True):
    id_intc: int = Field(default=None, primary_key=True)

    user: "User" = Relationship(back_populates="interaction")
    post: "Post" = Relationship(back_populates="interaction")

    __table_args__ = (UniqueConstraint("id_post", "id_user"), )

class InteractionCreate(InteractionBase):
    pass

class InteractionPublic(InteractionBase):
    id_intc: int

class InteractionUpdate(SQLModel):
    is_like: bool | None = None

# Post
class PostBase(SQLModel):
    content: str

    id_user: int = Field(foreign_key="user.id_user")

class Post(PostBase, table=True):
    id_post: int = Field(default=None, primary_key=True)

    user: "User" = Relationship(back_populates="post")
    interaction: Optional[list["Interaction"]] = Relationship(back_populates="post")

class PostCreate(PostBase):
    pass

class PostPublic(PostBase):
    id_post: int

class PostUpdate(SQLModel):
    content: str | None = None

# User
class UserBase(SQLModel):
    name: str
    password: str

class User(UserBase, table=True):
    id_user: int = Field(default=None, primary_key=True)

    post: Optional[list["Post"]] = Relationship(back_populates="user")
    interaction: Optional[list["Interaction"]] = Relationship(back_populates="user")

    __table_args__ = (UniqueConstraint("name"), )
    
class UserPublic(UserBase):
    id_user: int

class UserCreate(UserBase):
    pass

