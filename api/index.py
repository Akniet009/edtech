import sys
from pathlib import Path

# Add project root to Python module search path
root_dir = Path(__file__).resolve().parent.parent
if str(root_dir) not in sys.path:
    sys.path.insert(0, str(root_dir))

from backend.app import app

# Export app for Vercel Serverless Function handler
handler = app
