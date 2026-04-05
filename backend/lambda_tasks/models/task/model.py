from pynamodb.attributes import UnicodeAttribute
from models.base import BaseModel


class TaskModel(BaseModel):
    """
    Task model for storing task information
    """
    class Meta:
        table_name = 'Tasks'

    taskId = UnicodeAttribute(hash_key=True)
    title = UnicodeAttribute()