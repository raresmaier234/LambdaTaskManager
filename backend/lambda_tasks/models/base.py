"""
Base configuration for PynamoDB models
Centralized settings for all DynamoDB models
"""
import os
from pynamodb.models import Model

# AWS Configuration - can be overridden by environment variables
AWS_REGION = os.getenv('AWS_REGION', 'us-east-2')
BILLING_MODE = os.getenv('DYNAMODB_BILLING_MODE', 'PAY_PER_REQUEST')

# Environment-based table name prefixes (dev, staging, prod)
ENVIRONMENT = os.getenv('ENVIRONMENT', 'dev')
TABLE_PREFIX = os.getenv('TABLE_PREFIX', f'{ENVIRONMENT}_')


class BaseModel(Model):
    """
    Base model for all PynamoDB models
    Centralizes common configuration like region and billing mode
    """
    class Meta:
        abstract = True
        region = AWS_REGION
        billing_mode = BILLING_MODE

    @classmethod
    def get_table_name(cls, base_name: str) -> str:
        """
        Generate table name with environment prefix

        Args:
            base_name: Base table name (e.g., 'Tasks', 'Users')

        Returns:
            Full table name with prefix (e.g., 'dev_Tasks', 'prod_Tasks')
        """
        return f"{TABLE_PREFIX}{base_name}"
