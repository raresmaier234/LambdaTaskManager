from datetime import datetime
import enum
from typing import Optional, List

from pydantic import BaseModel

class TaskStatus(enum.Enum):
    TODO = "TODO"
    IN_PROGRESS = "IN-PROGRESS"
    DONE = "DONE"

class TaskPriority(enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"

class TaskFile(BaseModel):
    key: str
    name: str
    size: float
    type: str
    url: str


class TaskCreate(BaseModel):
    title: str
    description: str
    status: TaskStatus
    priority: TaskPriority
    files: Optional[List[TaskFile]] = None


class TaskResponse(BaseModel):
    id: str
    title: str
    description: str
    status: TaskStatus
    priority: TaskPriority
    files: Optional[List[TaskFile]] = None
    createdAt: datetime
    updatedAt: datetime