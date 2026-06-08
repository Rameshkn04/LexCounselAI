from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.schemas.user import UserRegister
from app.core.dependencies import get_db
from app.services.user_service import create_user

from app.schemas.user import UserLogin
from app.services.user_service import authenticate_user
from app.core.security import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/register")
def register(
    user: UserRegister,
    db: Session = Depends(get_db)
):
    try:
        created_user = create_user(
            db=db,
            name=user.name,
            email=user.email,
            password=user.password
        )

        if not created_user:
            raise HTTPException(
                status_code=400,
                detail="Email already exists"
            )

        return {
            "message": "User registered successfully",
            "email": created_user.email
        }

    except Exception as e:
        print("REGISTER ERROR:", repr(e))
        raise

@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    authenticated_user = authenticate_user(
        db,
        user.email,
        user.password
    )

    if not authenticated_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {
            "sub": authenticated_user.email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }