# __init__.py
import os
import importlib

# Dynamically import all .py files in the models directory
modules = [f[:-3] for f in os.listdir(os.path.dirname(__file__))
           if f.endswith('.py') and f != '__init__.py']

for module in modules:
    importlib.import_module(f'{__name__}.{module}')
