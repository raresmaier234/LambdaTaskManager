import importlib
import inspect
import pkgutil
from pynamodb.models import Model
import models


def discover_models(package):
    """Recursively discover all PynamoDB Model classes in a package"""
    model_classes = []

    def _recursive_import(pkg):
        for _, mod_name, ispkg in pkgutil.iter_modules(pkg.__path__):
            full_name = f"{pkg.__name__}.{mod_name}"
            mod = importlib.import_module(full_name)
            for name, obj in inspect.getmembers(mod):
                if inspect.isclass(obj) and issubclass(obj, Model) and obj is not Model:
                    # Skip abstract base models
                    meta = getattr(obj, 'Meta', None)
                    is_abstract = getattr(meta, 'abstract', False) if meta else False

                    if not is_abstract:
                        model_classes.append(obj)
            if ispkg:
                sub_pkg = importlib.import_module(full_name)
                _recursive_import(sub_pkg)

    _recursive_import(package)
    return model_classes


def run_migrations():
    """Auto-create all PynamoDB tables defined in models package"""
    model_classes = discover_models(models)
    for table_class in model_classes:
        if not table_class.exists():
            table_class.create_table(wait=True)