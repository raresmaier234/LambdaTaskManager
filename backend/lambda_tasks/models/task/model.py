from pynamodb.attributes import UnicodeAttribute, UTCDateTimeAttribute

from layer.python.pynamodb.attributes import JSONAttribute, ListAttribute
from models.base import BaseModel


class TaskModel(BaseModel):
    """
    Task model for storing task information
    """
    class Meta:
        table_name = 'Tasks'

    id = UnicodeAttribute(hash_key=True)
    title = UnicodeAttribute()
    description = UnicodeAttribute(null=True)
    status = UnicodeAttribute()
    priority = UnicodeAttribute()
    files = ListAttribute(of=JSONAttribute, null=True)
    createdAt = UTCDateTimeAttribute()
    updatedAt = UTCDateTimeAttribute()