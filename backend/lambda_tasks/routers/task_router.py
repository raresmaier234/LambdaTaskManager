from fastapi import APIRouter
import boto3
import uuid
from datetime import datetime

from models.task.schema import TaskCreate, TaskResponse

router = APIRouter(prefix="/task", tags=["tasks"])

dynamodb = boto3.resource("dynamodb", region_name="us-east-2")

table = dynamodb.Table("Tasks")


@router.post("", response_model=TaskResponse)
def create_task(task: TaskCreate):
    """Create a new task"""
    now = datetime.utcnow().isoformat()
    task_data = task.model_dump()
    task_data.update({
        "id": str(uuid.uuid4()),
        "createdAt": now,
        "updatedAt": now
    })

    table.put_item(Item=task_data)
    return task_data

@router.get("")
def get_tasks():
    """Get all tasks"""
    response = table.scan()
    return {"tasks": response.get("Items", [])}
