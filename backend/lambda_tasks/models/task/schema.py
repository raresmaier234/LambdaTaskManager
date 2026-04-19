import enum
from dataclasses import dataclass

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


@dataclass
class TaskCreate:
    title: str
    description: str
    status: TaskStatus
    priority: TaskPriority
    files: TaskFile = None
    createdAt: str = None
    updatedAt: str = None
