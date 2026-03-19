# Add your Gemini API key here
import os
from dotenv import load_dotenv

# Load the .env file from the root
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "KEY_NOT_FOUND")
