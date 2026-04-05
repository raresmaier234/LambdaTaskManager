from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

from migrations import run_migrations
from routers import task_router

# Initialize FastAPI app
app = FastAPI(
    title="LambdaTasks API",
    description="Task management API with AWS Lambda",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Run migrations on startup
run_migrations()

app.include_router(task_router.router)

# Lambda handler
handler = Mangum(app, lifespan="off")