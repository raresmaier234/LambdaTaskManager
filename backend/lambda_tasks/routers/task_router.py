from fastapi import APIRouter
import boto3
import uuid

from models.task.schema import TaskCreate

router = APIRouter(prefix="/task", tags=["tasks"])

dynamodb = boto3.resource("dynamodb", region_name="us-east-2")

table = dynamodb.Table("Tasks")


@router.post("")
def create_task(task: TaskCreate):
    """Create a new task"""
    item = {
        "taskId": str(uuid.uuid4()),
        "title": task.title
    }
    table.put_item(Item=item)
    return {"message": "Task saved", "task": item}

@router.get("")
def get_tasks():
    """Get all tasks"""
    response = table.scan()
    return {"tasks": response.get("Items", [])}
