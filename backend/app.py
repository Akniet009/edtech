# FormuLab FastAPI + SymPy Backend API
# Provides REST endpoints for mathematical problem generation and step-by-step symbolic solutions.

from pathlib import Path
import random
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import sympy as sp

app = FastAPI(
    title="FormuLab SymPy Math Backend API",
    description="Dynamic Task Generator & Symbolic Math Engine powered by FastAPI & SymPy",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Prevent aggressive browser caching during development
@app.middleware("http")
async def add_no_cache_header(request: Request, call_next):
    response = await call_next(request)
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response

FRONTEND_DIR = Path(__file__).resolve().parent.parent

# Serve static assets for web interface
if (FRONTEND_DIR / "styles").exists():
    app.mount("/styles", StaticFiles(directory=str(FRONTEND_DIR / "styles")), name="styles")
if (FRONTEND_DIR / "js").exists():
    app.mount("/js", StaticFiles(directory=str(FRONTEND_DIR / "js")), name="js")
if (FRONTEND_DIR / "resources").exists():
    app.mount("/resources", StaticFiles(directory=str(FRONTEND_DIR / "resources")), name="resources")

class TaskResponse(BaseModel):
    formula_id: str
    formula_title: str
    latex_formula: str
    question: str
    target_symbol: str
    correct_answer: float
    unit: str
    solution_steps: list[str]

@app.get("/")
def read_root(request: Request):
    accept = request.headers.get("accept", "")
    if "application/json" in accept and "text/html" not in accept:
        return {
            "status": "online",
            "app": "FormuLab SymPy API Server",
            "version": "1.0.0"
        }
    index_path = FRONTEND_DIR / "index.html"
    if index_path.exists():
        return FileResponse(str(index_path))
    return {
        "status": "online",
        "app": "FormuLab SymPy API Server",
        "version": "1.0.0"
    }

@app.get("/api")
@app.get("/api/status")
def api_status():
    return {
        "status": "online",
        "app": "FormuLab SymPy API Server",
        "version": "1.0.0"
    }

@app.get("/api/v1/generate-task/{formula_id}", response_model=TaskResponse)
def generate_task(formula_id: str, lang: str = "kz"):
    """
    Generate a dynamic task using SymPy symbolic mathematics with KZ / RU language localization.
    """
    is_kz = (lang.lower() == "kz")

    if formula_id == "kinematics_motion":
        # s = v0 * t + (a * t^2)/2
        s, v0, a, t = sp.symbols('s v_0 a t')
        expr = v0 * t + sp.Rational(1, 2) * a * t**2
        
        v0_val = random.randint(2, 15)
        a_val = random.randint(1, 6)
        t_val = random.randint(2, 8)
        
        calculated_s = float(expr.subs({v0: v0_val, a: a_val, t: t_val}))
        
        if is_kz:
            return TaskResponse(
                formula_id=formula_id,
                formula_title="Бірқалыпты үдемелі қозғалыс",
                latex_formula=r"s = v_0 t + \frac{a t^2}{2}",
                question=f"Автокөлік v₀ = {v0_val} м/с бастапқы жылдамдықпен және a = {a_val} м/с² үдеумен қозғала бастады. t = {t_val} с ішіндегі орын ауыстыруды (s) табыңыз.",
                target_symbol="s",
                correct_answer=calculated_s,
                unit="м",
                solution_steps=[
                    r"**1-қадам:** $s = v_0 t + \frac{a t^2}{2}$ формуласын қолданамыз",
                    f"**2-қадам:** Көбейтінділерді есептейміз: $v_0 t = {v0_val * t_val}$, $\\frac{{a t^2}}{{2}} = \\frac{{{a_val} \\cdot {t_val**2}}}{{2}} = {0.5 * a_val * t_val**2}$",
                    f"**3-қадам:** Қорытынды нәтиже: $s = {calculated_s}\\text{{ м}}$"
                ]
            )
        else:
            return TaskResponse(
                formula_id=formula_id,
                formula_title="Равноускоренное движение",
                latex_formula=r"s = v_0 t + \frac{a t^2}{2}",
                question=f"Автомобиль стартует с начальной скоростью v₀ = {v0_val} м/с и двигается с ускорением a = {a_val} м/с². Найдите перемещение s за t = {t_val} с.",
                target_symbol="s",
                correct_answer=calculated_s,
                unit="м",
                solution_steps=[
                    r"**Шаг 1:** Используем формулу $s = v_0 t + \frac{a t^2}{2}$",
                    f"**Шаг 2:** Вычислим произведения: $v_0 t = {v0_val * t_val}$, $\\frac{{a t^2}}{{2}} = \\frac{{{a_val} \\cdot {t_val**2}}}{{2}} = {0.5 * a_val * t_val**2}$",
                    f"**Шаг 3:** Итоговое значение $s = {calculated_s}\\text{{ м}}$"
                ]
            )

    elif formula_id == "newton_second_law":
        # F = m * a
        F, m, a = sp.symbols('F m a')
        m_val = random.randint(2, 20)
        a_val = random.randint(1, 10)
        calculated_F = float(m_val * a_val)

        if is_kz:
            return TaskResponse(
                formula_id=formula_id,
                formula_title="Ньютонның екінші заңы",
                latex_formula=r"F = m a",
                question=f"Массасы m = {m_val} кг дене a = {a_val} м/с² үдеумен қозғалады. Денеге әсер ететін F күшін анықтаңыз.",
                target_symbol="F",
                correct_answer=calculated_F,
                unit="Н",
                solution_steps=[
                    r"**1-қадам:** Ньютонның екінші заңы: $F = m \cdot a$",
                    f"**2-қадам:** Есептейміз: $F = {m_val} \\cdot {a_val} = {calculated_F}\\text{{ Н}}$"
                ]
            )
        else:
            return TaskResponse(
                formula_id=formula_id,
                formula_title="Второй закон Ньютона",
                latex_formula=r"F = m a",
                question=f"Тело массой m = {m_val} кг движется с ускорением a = {a_val} м/с². Определите действующую силу F.",
                target_symbol="F",
                correct_answer=calculated_F,
                unit="Н",
                solution_steps=[
                    r"**Шаг 1:** Запишем второй закон Ньютона: $F = m \cdot a$",
                    f"**Шаг 2:** Вычислим: $F = {m_val} \\cdot {a_val} = {calculated_F}\\text{{ Н}}$"
                ]
            )

    elif formula_id == "ohm_law":
        # I = U / R
        U_val = random.randint(2, 24) * 5
        R_val = random.randint(2, 10)
        calculated_I = round(U_val / R_val, 2)

        if is_kz:
            return TaskResponse(
                formula_id=formula_id,
                formula_title="Тізбек бөлігі үшін Ом заңы",
                latex_formula=r"I = \frac{U}{R}",
                question=f"Тізбектегі кернеу U = {U_val} В, ал кедергі R = {R_val} Ом. Ток күші I неге тең?",
                target_symbol="I",
                correct_answer=calculated_I,
                unit="А",
                solution_steps=[
                    r"**1-қадам:** Ом заңының формуласы: $I = \frac{U}{R}$",
                    f"**2-қадам:** Есептейміз: $I = \\frac{{{U_val}}}{{{R_val}}} = {calculated_I}\\text{{ А}}$"
                ]
            )
        else:
            return TaskResponse(
                formula_id=formula_id,
                formula_title="Закон Ома для участка цепи",
                latex_formula=r"I = \frac{U}{R}",
                question=f"Напряжение в цепи U = {U_val} В, а сопротивление R = {R_val} Ом. Чему равна сила тока I?",
                target_symbol="I",
                correct_answer=calculated_I,
                unit="А",
                solution_steps=[
                    r"**Шаг 1:** Формула закона Ома: $I = \frac{U}{R}$",
                    f"**Шаг 2:** Вычислим: $I = \\frac{{{U_val}}}{{{R_val}}} = {calculated_I}\\text{{ А}}$"
                ]
            )

    # If formula is not recognized by backend SymPy solver
    err_msg = f"Формула '{formula_id}' табылмады немесе әлі қосылмаған." if is_kz else f"Формула '{formula_id}' не найдена или еще не добавлена."
    raise HTTPException(status_code=404, detail=err_msg)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
