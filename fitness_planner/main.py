from fastapi import FastAPI, Request, Form, HTTPException
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
import uuid

app = FastAPI()

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Setup templates
templates = Jinja2Templates(directory="templates")

# In-memory storage for users and plans
users_db = {}

from api.service import generate_fitness_plan

@app.get("/")
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/generate")
async def generate_plan(
    request: Request,
    username: str = Form(...),
    goal: str = Form(...),
    intensity: str = Form(...),
    info: str = Form(None)
):
    user_id = str(uuid.uuid4())
    
    # Call the API module to get the plan
    plan_data = generate_fitness_plan(username, goal, intensity, info)
    
    user_data = {
        "id": user_id,
        "username": username,
        "goal": goal,
        "intensity": intensity,
        "info": info,
        **plan_data
    }
    users_db[user_id] = user_data
    return templates.TemplateResponse("result.html", {"request": request, **user_data})

@app.get("/admin")
async def admin_dashboard(request: Request):
    return templates.TemplateResponse("all_users.html", {"request": request, "users": list(users_db.values())})

@app.post("/delete/{user_id}")
async def delete_user(user_id: str):
    if user_id in users_db:
        del users_db[user_id]
    return RedirectResponse(url="/admin", status_code=303)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
