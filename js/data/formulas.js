// FormuLab Formula Dataset
// Formulas ordered in strict pedagogical learning sequence.
// Physics Dynamics sequence: Newton's 1st Law -> Newton's 2nd Law -> Newton's 3rd Law!

export const FORMULAS_DATA = [
  // ==========================================
  // --- PHYSICS (ФИЗИКА В ЛОГИЧЕСКОМ ПОРЯДКЕ) ---
  // ==========================================

  // --- МЕХАНИКА: ДИНАМИКА (3 ЗАКОНА НЬЮТОНА ВМЕСТЕ) ---
  {
    id: "newton_first_law",
    subject: "physics",
    topic: "Механика",
    subtopic: "Динамика",
    title: "Первый закон Ньютона (Закон инерции)",
    latex: "\\sum \\vec{F} = 0 \\implies \\vec{v} = \\text{const}",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Существуют инерциальные системы отсчета, в которых тело сохраняет состояние покоя или равномерного прямолинейного движения, если на него не действуют силы.",
    variables: [
      { symbol: "v", name: "Скорость тела", unit: "м/с", min: 0, max: 100, default: 15, step: 1 },
      { symbol: "F_{\\text{рез}}", name: "Равнодействующая сила", unit: "Н", min: 0, max: 0, default: 0, step: 0 }
    ],
    targetVariable: { symbol: "a", name: "Ускорение", unit: "м/с²" },
    calculate: () => 0,
    visualizationType: "force_vector",
    taskGenerator: () => {
      const v = Math.floor(Math.random() * 20) + 5;
      return {
        question: `(ЕНТ • Механика) На тело массой $m = 8\\text{ кг}$ действуют силы, равнодействующая которых равна нулю ($F_{\\text{рез}} = 0\\text{ Н}$). Чему равно ускорение тела $a$?`,
        targetSymbol: "a",
        correctAnswer: 0,
        unit: "м/с²",
        steps: [
          `**Шаг 1:** По I закону Ньютона: если $\\sum \\vec{F} = 0$, то тело движется без ускорения.`,
          `**Шаг 2:** Следовательно, ускорение $a = 0\\text{ м/с}^2$, а скорость $v = ${v}\\text{ м/с} = \\text{const}$.`
        ]
      };
    }
  },
  {
    id: "newton_second_law",
    subject: "physics",
    topic: "Механика",
    subtopic: "Динамика",
    title: "Второй закон Ньютона",
    latex: "F = m a",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Ускорение тела прямо пропорционально равнодействующей всех сил и обратно пропорционально массе тела.",
    variables: [
      { symbol: "m", name: "Масса тела", unit: "кг", min: 1, max: 100, default: 10, step: 1 },
      { symbol: "a", name: "Ускорение", unit: "м/с²", min: 0.1, max: 20, default: 3, step: 0.5 }
    ],
    targetVariable: { symbol: "F", name: "Сила", unit: "Н" },
    calculate: (m, a) => m * a,
    visualizationType: "force_vector",
    taskGenerator: () => {
      const targetVar = ["F", "a", "m"][Math.floor(Math.random() * 3)];
      const m = Math.floor(Math.random() * 20) + 2;
      const a = Math.floor(Math.random() * 10) + 1;
      const F = m * a;

      if (targetVar === "F") {
        return {
          question: `(ЕНТ • Механика) Телу массой $m = ${m}\\text{ кг}$ сообщают ускорение $a = ${a}\\text{ м/с}^2$. Найдите равнодействующую силу $F$.`,
          targetSymbol: "F",
          correctAnswer: F,
          unit: "Н",
          steps: [
            `**Шаг 1:** Используем II закон Ньютона: $$F = m \\cdot a$$`,
            `**Шаг 2:** Подставляем значения: $$F = ${m} \\cdot ${a} = ${F}\\text{ Н}$$`
          ]
        };
      } else if (targetVar === "a") {
        return {
          question: `(ЕНТ • Механика) На тело массой $m = ${m}\\text{ кг}$ действует сила $F = ${F}\\text{ Н}$. Найдите ускорение тела $a$.`,
          targetSymbol: "a",
          correctAnswer: a,
          unit: "м/с²",
          steps: [
            `**Шаг 1:** Выразим ускорение из II закона Ньютона $F = m \\cdot a$: $$a = \\frac{F}{m}$$`,
            `**Шаг 2:** Подставим значения: $$a = \\frac{${F}}{${m}} = ${a}\\text{ м/с}^2$$`
          ]
        };
      } else {
        return {
          question: `(ЕНТ • Механика) Под действием силы $F = ${F}\\text{ Н}$ тело движется с ускорением $a = ${a}\\text{ м/с}^2$. Определите массу тела $m$.`,
          targetSymbol: "m",
          correctAnswer: m,
          unit: "кг",
          steps: [
            `**Шаг 1:** Выразим массу $m$: $$m = \\frac{F}{a}$$`,
            `**Шаг 2:** Вычислим: $$m = \\frac{${F}}{${a}} = ${m}\\text{ кг}$$`
          ]
        };
      }
    }
  },
  {
    id: "newton_third_law",
    subject: "physics",
    topic: "Механика",
    subtopic: "Динамика",
    title: "Третий закон Ньютона",
    latex: "\\vec{F}_{12} = -\\vec{F}_{21}",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Силы, с которыми два тела действуют друг на друга, равны по модулю и противоположны по направлению ($F_1 = F_2$).",
    variables: [
      { symbol: "F_{12}", name: "Сила действия первого тела", unit: "Н", min: 1, max: 500, default: 50, step: 5 }
    ],
    targetVariable: { symbol: "F_{21}", name: "Сила противодействия", unit: "Н" },
    calculate: (F12) => F12,
    visualizationType: "force_vector",
    taskGenerator: () => {
      const F1 = Math.floor(Math.random() * 80) + 20; // 20..100 N
      return {
        question: `(ЕНТ • Механика) Земля притягивает яблоко с силой $F_1 = ${F1}\\text{ Н}$. С какой по модулю силой $F_2$ яблоко притягивает Землю?`,
        targetSymbol: "F_2",
        correctAnswer: F1,
        unit: "Н",
        steps: [
          `**Шаг 1:** Согласно III закону Ньютона: силы взаимодействия двух тел равны по модулю и противоположны по направлению ($|F_1| = |F_2|$).`,
          `**Шаг 2:** Следовательно, сила $F_2 = F_1 = ${F1}\\text{ Н}$.`
        ]
      };
    }
  },
  {
    id: "hooke_law",
    subject: "physics",
    topic: "Механика",
    subtopic: "Динамика",
    title: "Закон Гука (Сила упругости)",
    latex: "F_{\\text{упр}} = k x",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Сила упругости, возникающая при деформации тела, пропорциональна удлинению пружины $x$.",
    variables: [
      { symbol: "k", name: "Жесткость пружины", unit: "Н/м", min: 10, max: 1000, default: 200, step: 10 },
      { symbol: "x", name: "Удлинение пружины", unit: "см", min: 1, max: 50, default: 5, step: 1 }
    ],
    targetVariable: { symbol: "F", name: "Сила упругости", unit: "Н" },
    calculate: (k, x_cm) => k * (x_cm / 100),
    visualizationType: "spring_oscillator",
    taskGenerator: () => {
      const k = (Math.floor(Math.random() * 10) + 1) * 50;
      const x_cm = Math.floor(Math.random() * 10) + 2;
      const x_m = x_cm / 100;
      const F = k * x_m;
      return {
        question: `(ЕНТ • Динамика) Пружину жесткостью $k = ${k}\\text{ Н/м}$ растянули на $x = ${x_cm}\\text{ см}$. Какова возникшая сила упругости $F_{\\text{упр}}$?`,
        targetSymbol: "F_{упр}",
        correctAnswer: F,
        unit: "Н",
        steps: [
          `**Шаг 1:** Переведем удлинение $x$ в СИ: $$x = ${x_cm}\\text{ см} = ${x_m}\\text{ м}$$`,
          `**Шаг 2:** Применим закон Гука: $$F_{\\text{упр}} = k \\cdot x = ${k} \\cdot ${x_m} = ${F}\\text{ Н}$$`
        ]
      };
    }
  },
  {
    id: "gravitation_law",
    subject: "physics",
    topic: "Механика",
    subtopic: "Гравитация",
    title: "Закон всемирного тяготения",
    latex: "F = G \\frac{m_1 m_2}{r^2}",
    examTags: ["ЕНТ", "ЕГЭ"],
    description: "Сила гравитационного притяжения между двумя точечными массами на расстоянии $r$.",
    variables: [
      { symbol: "m_1", name: "Масса первого тела (·10²⁴)", unit: "кг", min: 1, max: 100, default: 6, step: 1 },
      { symbol: "m_2", name: "Масса второго тела (·10²²)", unit: "кг", min: 1, max: 100, default: 7, step: 1 },
      { symbol: "r", name: "Расстояние (·10⁶)", unit: "м", min: 1, max: 10, default: 4, step: 0.5 }
    ],
    targetVariable: { symbol: "F", name: "Сила тяготения (·10²⁰)", unit: "Н" },
    calculate: (m1, m2, r) => Number(((6.67 * m1 * m2) / (r * r)).toFixed(2)),
    visualizationType: "gravitation_visual",
    taskGenerator: () => {
      const r_factor = Math.floor(Math.random() * 3) + 2;
      const ans = Math.pow(r_factor, 2);
      return {
        question: `(ЕНТ • Гравитация) Во сколько раз уменьшится сила гравитационного притяжения $F$ между двумя тела, если расстояние между ними увеличить в $k = ${r_factor}$ раз?`,
        targetSymbol: "уменьшится в (раз)",
        correctAnswer: ans,
        unit: "раз",
        steps: [
          `**Шаг 1:** Закон всемирного тяготения: $$F_1 = G \\frac{m_1 m_2}{r^2}$$`,
          `**Шаг 2:** Новое расстояние $r' = ${r_factor} r \\implies F_2 = G \\frac{m_1 m_2}{${ans} r^2} = \\frac{F_1}{${ans}}$$`
        ]
      };
    }
  },

  // --- МЕХАНИКА: КИНЕМАТИКА ---
  {
    id: "kinematics_motion",
    subject: "physics",
    topic: "Механика",
    subtopic: "Кинематика",
    title: "Равноускоренное движение",
    latex: "s = v_0 t + \\frac{a t^2}{2}",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Формула перемещения при прямолинейном равноускоренном движении из начального положения.",
    variables: [
      { symbol: "v_0", name: "Начальная скорость", unit: "м/с", min: 0, max: 50, default: 10, step: 1 },
      { symbol: "t", name: "Время движения", unit: "с", min: 1, max: 20, default: 5, step: 0.5 },
      { symbol: "a", name: "Ускорение", unit: "м/с²", min: -10, max: 20, default: 2, step: 0.5 }
    ],
    targetVariable: { symbol: "s", name: "Перемещение", unit: "м" },
    calculate: (v0, t, a) => v0 * t + 0.5 * a * Math.pow(t, 2),
    visualizationType: "motion_curve",
    taskGenerator: () => {
      const v0 = Math.floor(Math.random() * 15) + 2;
      const t = Math.floor(Math.random() * 8) + 2;
      const a = Math.floor(Math.random() * 6) + 1;
      const s = v0 * t + 0.5 * a * t * t;
      return {
        question: `(ЕНТ • Кинематика) Автомобиль стартует с начальной скоростью $v_0 = ${v0}\\text{ м/с}$ и движется с ускорением $a = ${a}\\text{ м/с}^2$. Найдите перемещение $s$ за время $t = ${t}\\text{ с}$.`,
        targetSymbol: "s",
        correctAnswer: s,
        unit: "м",
        steps: [
          `**Шаг 1:** Формула перемещения: $$s = v_0 t + \\frac{a t^2}{2}$$`,
          `**Шаг 2:** Вычислим: $$s = ${v0} \\cdot ${t} + \\frac{${a} \\cdot ${t * t}}{2} = ${s}\\text{ м}$$`
        ]
      };
    }
  },

  // --- МЕХАНИКА: ЗАКОНЫ СОХРАНЕНИЯ ---
  {
    id: "momentum",
    subject: "physics",
    topic: "Механика",
    subtopic: "Законы сохранения",
    title: "Импульс тела",
    latex: "p = m v",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Векторная величина, равная произведению массы тела на его скорость.",
    variables: [
      { symbol: "m", name: "Масса тела", unit: "кг", min: 1, max: 100, default: 5, step: 1 },
      { symbol: "v", name: "Скорость", unit: "м/с", min: 1, max: 50, default: 12, step: 1 }
    ],
    targetVariable: { symbol: "p", name: "Импульс", unit: "кг·м/с" },
    calculate: (m, v) => m * v,
    visualizationType: "vector_momentum",
    taskGenerator: () => {
      const m = Math.floor(Math.random() * 20) + 2;
      const v = Math.floor(Math.random() * 15) + 3;
      const p = m * v;
      return {
        question: `(ЕНТ • Импульс) Тело массой $m = ${m}\\text{ кг}$ движется со скоростью $v = ${v}\\text{ м/с}$. Чему равен модуль импульса тела $p$?`,
        targetSymbol: "p",
        correctAnswer: p,
        unit: "кг·м/с",
        steps: [
          `**Шаг 1:** Формула импульса: $$p = m \\cdot v$$`,
          `**Шаг 2:** Рассчитаем: $$p = ${m} \\cdot ${v} = ${p}\\text{ кг·м/с}$$`
        ]
      };
    }
  },
  {
    id: "kinetic_energy",
    subject: "physics",
    topic: "Механика",
    subtopic: "Законы сохранения",
    title: "Кинетическая энергия",
    latex: "E_k = \\frac{m v^2}{2}",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Энергия механической системы, зависящая от скоростей движения ее точек.",
    variables: [
      { symbol: "m", name: "Масса", unit: "кг", min: 1, max: 2000, default: 1000, step: 50 },
      { symbol: "v", name: "Скорость", unit: "м/с", min: 0, max: 60, default: 20, step: 2 }
    ],
    targetVariable: { symbol: "E_k", name: "Кинетическая энергия", unit: "Дж" },
    calculate: (m, v) => 0.5 * m * Math.pow(v, 2),
    visualizationType: "energy_bar",
    taskGenerator: () => {
      const m = (Math.floor(Math.random() * 10) + 1) * 2;
      const v = Math.floor(Math.random() * 12) + 3;
      const Ek = 0.5 * m * v * v;
      return {
        question: `(ЕНТ • Энергия) Тело массой $m = ${m}\\text{ кг}$ движется со скоростью $v = ${v}\\text{ м/с}$. Чему равна кинетическая энергия $E_k$?`,
        targetSymbol: "E_k",
        correctAnswer: Ek,
        unit: "Дж",
        steps: [
          `**Шаг 1:** Формула кинетической энергии: $$E_k = \\frac{m v^2}{2}$$`,
          `**Шаг 2:** Вычислим: $$E_k = \\frac{${m} \\cdot ${v * v}}{2} = ${Ek}\\text{ Дж}$$`
        ]
      };
    }
  },
  {
    id: "potential_energy",
    subject: "physics",
    topic: "Механика",
    subtopic: "Законы сохранения",
    title: "Потенциальная энергия",
    latex: "E_p = m g h",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Энергия взаимодействия тела с Землей на высоте $h$. Принимаем $g = 10\\text{ м/с}^2$.",
    variables: [
      { symbol: "m", name: "Масса", unit: "кг", min: 1, max: 100, default: 5, step: 1 },
      { symbol: "h", name: "Высота", unit: "м", min: 0, max: 100, default: 10, step: 1 }
    ],
    targetVariable: { symbol: "E_p", name: "Потенциальная энергия", unit: "Дж" },
    calculate: (m, h) => m * 10 * h,
    visualizationType: "gravity_height",
    taskGenerator: () => {
      const m = Math.floor(Math.random() * 15) + 1;
      const h = Math.floor(Math.random() * 20) + 2;
      const Ep = m * 10 * h;
      return {
        question: `(ЕНТ • Энергия) Груз массой $m = ${m}\\text{ кг}$ поднят на высоту $h = ${h}\\text{ м}$. Найдите его потенциальную энергию $E_p$ ($g = 10\\text{ м/с}^2$).`,
        targetSymbol: "E_p",
        correctAnswer: Ep,
        unit: "Дж",
        steps: [
          `**Шаг 1:** Формула потенциальной энергии: $$E_p = m \\cdot g \\cdot h$$`,
          `**Шаг 2:** Вычислим: $$E_p = ${m} \\cdot 10 \\cdot ${h} = ${Ep}\\text{ Дж}$$`
        ]
      };
    }
  },

  // --- ТЕРМОДИНАМИКА ---
  {
    id: "mendeleev_clapeyron",
    subject: "physics",
    topic: "Термодинамика",
    subtopic: "Молекулярная физика",
    title: "Уравнение Менделеева-Клапейрона",
    latex: "P V = \\nu R T",
    examTags: ["ЕНТ", "ЕГЭ"],
    description: "Связь параметров идеального газа: давления $P$, объема $V$, количества вещества $\\nu$ и температуры $T$. ($R = 8.31\\text{ Дж/(моль·К)}$).",
    variables: [
      { symbol: "\\nu", name: "Количество вещества", unit: "моль", min: 1, max: 10, default: 2, step: 1 },
      { symbol: "T", name: "Температура", unit: "К", min: 200, max: 500, default: 300, step: 10 },
      { symbol: "V", name: "Объем", unit: "м³", min: 0.01, max: 0.5, default: 0.05, step: 0.01 }
    ],
    targetVariable: { symbol: "P", name: "Давление", unit: "кПа" },
    calculate: (nu, T, V) => Number((((nu * 8.31 * T) / V) / 1000).toFixed(1)),
    visualizationType: "pv_diagram",
    taskGenerator: () => {
      const nu = Math.floor(Math.random() * 4) + 1;
      const T = (Math.floor(Math.random() * 20) + 20) * 10;
      const V = (Math.floor(Math.random() * 5) + 1) * 0.01;
      const P_kPa = Number((((nu * 8.31 * T) / V) / 1000).toFixed(1));
      return {
        question: `(ЕНТ • Термодинамика) Газ количеством $\\nu = ${nu}\\text{ моль}$ при $T = ${T}\\text{ К}$ занимает объем $V = ${V}\\text{ м}^3$. Найдите давление $P$ в кПа.`,
        targetSymbol: "P",
        correctAnswer: P_kPa,
        unit: "кПа",
        steps: [
          `**Шаг 1:** $P = \\frac{\\nu R T}{V} = \\frac{${nu} \\cdot 8.31 \\cdot ${T}}{${V}} \\approx ${P_kPa}\\text{ кПа}$$`
        ]
      };
    }
  },

  // --- ЭЛЕКТРОДИНАМИКА ---
  {
    id: "ohm_law",
    subject: "physics",
    topic: "Электродинамика",
    subtopic: "Постоянный ток",
    title: "Закон Ома для участка цепи",
    latex: "I = \\frac{U}{R}",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Сила тока в участке цепи прямо пропорциональна напряжению и обратно пропорциональна сопротивлению.",
    variables: [
      { symbol: "U", name: "Напряжение", unit: "В", min: 1, max: 220, default: 12, step: 1 },
      { symbol: "R", name: "Сопротивление", unit: "Ом", min: 1, max: 100, default: 4, step: 1 }
    ],
    targetVariable: { symbol: "I", name: "Сила тока", unit: "А" },
    calculate: (U, R) => Number((U / R).toFixed(2)),
    visualizationType: "circuit_diagram",
    taskGenerator: () => {
      const R = Math.floor(Math.random() * 10) + 2;
      const I = Math.floor(Math.random() * 8) + 1;
      const U = R * I;
      return {
        question: `(ЕНТ • Ток) Напряжение в цепи $U = ${U}\\text{ В}$, сопротивление $R = ${R}\\text{ Ом}$. Найдите силу тока $I$.`,
        targetSymbol: "I",
        correctAnswer: I,
        unit: "А",
        steps: [
          `**Шаг 1:** Закон Ома: $$I = \\frac{U}{R} = \\frac{${U}}{${R}} = ${I}\\text{ А}$$`
        ]
      };
    }
  },


  // ==========================================
  // --- MATHEMATICS (МАТЕМАТИКА ЕНТ РУСТЮМОВ) ---
  // ==========================================

  {
    id: "quadratic_func",
    subject: "math",
    topic: "Алгебра",
    subtopic: "Функции",
    title: "Квадратичная функция",
    latex: "y = a x^2 + b x + c",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "График — парабола. Ветви вверх при $a > 0$, вниз при $a < 0$. Вершина в точке $x_0 = -b / (2a)$.",
    variables: [
      { symbol: "a", name: "Коэффициент a", unit: "", min: -5, max: 5, default: 1, step: 0.5 },
      { symbol: "b", name: "Коэффициент b", unit: "", min: -10, max: 10, default: -4, step: 1 },
      { symbol: "c", name: "Свободный член c", unit: "", min: -10, max: 10, default: 3, step: 1 }
    ],
    targetVariable: { symbol: "x_0", name: "Абсцисса вершины параболы", unit: "" },
    calculate: (a, b, c) => (a === 0 ? 0 : Number((-b / (2 * a)).toFixed(2))),
    visualizationType: "parabola_graph",
    taskGenerator: () => {
      const a = Math.random() > 0.5 ? 1 : 2;
      const x0 = Math.floor(Math.random() * 7) - 3;
      const b = -2 * a * x0;
      const c = Math.floor(Math.random() * 10) - 5;
      return {
        question: `(ЕНТ • Алгебра) Найдите абсциссу вершины параболы $y = ${a === 1 ? '' : a}x^2 ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}x ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)}$.`,
        targetSymbol: "x_0",
        correctAnswer: x0,
        unit: "",
        steps: [
          `**Шаг 1:** Абсцисса вершины параболы: $$x_0 = -\\frac{b}{2a} = -\\frac{${b}}{2 \\cdot ${a}} = ${x0}$$`
        ]
      };
    }
  },
  {
    id: "discriminant",
    subject: "math",
    topic: "Алгебра",
    subtopic: "Уравнения",
    title: "Дискриминант квадратного уравнения",
    latex: "D = b^2 - 4 a c",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Определяет количество корней квадратного уравнения $ax^2 + bx + c = 0$.",
    variables: [
      { symbol: "a", name: "Коэффициент a", unit: "", min: 1, max: 10, default: 1, step: 1 },
      { symbol: "b", name: "Коэффициент b", unit: "", min: -15, max: 15, default: -5, step: 1 },
      { symbol: "c", name: "Коэффициент c", unit: "", min: -10, max: 10, default: 6, step: 1 }
    ],
    targetVariable: { symbol: "D", name: "Дискриминант", unit: "" },
    calculate: (a, b, c) => b * b - 4 * a * c,
    visualizationType: "roots_graph",
    taskGenerator: () => {
      const a = Math.floor(Math.random() * 3) + 1;
      const b = Math.floor(Math.random() * 10) - 5;
      const c = Math.floor(Math.random() * 8) - 4;
      const D = b * b - 4 * a * c;
      return {
        question: `(ЕНТ • Алгебра) Найдите дискриминант $D$ уравнения $${a === 1 ? '' : a}x^2 ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}x ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)} = 0$.`,
        targetSymbol: "D",
        correctAnswer: D,
        unit: "",
        steps: [
          `**Шаг 1:** $$D = b^2 - 4ac = (${b})^2 - 4 \\cdot ${a} \\cdot (${c}) = ${D}$$`
        ]
      };
    }
  },
  {
    id: "pythagoras",
    subject: "math",
    topic: "Геометрия",
    subtopic: "Треугольники",
    title: "Теорема Пифагора",
    latex: "c = \\sqrt{a^2 + b^2}",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "В прямоугольном треугольнике квадрат длины гипотенузы равен сумме квадратов длин катетов.",
    variables: [
      { symbol: "a", name: "Катет a", unit: "см", min: 1, max: 30, default: 3, step: 1 },
      { symbol: "b", name: "Катет b", unit: "см", min: 1, max: 30, default: 4, step: 1 }
    ],
    targetVariable: { symbol: "c", name: "Гипотенуза c", unit: "см" },
    calculate: (a, b) => Number(Math.sqrt(a * a + b * b).toFixed(2)),
    visualizationType: "right_triangle",
    taskGenerator: () => {
      const triples = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]];
      const [a, b, c] = triples[Math.floor(Math.random() * triples.length)];
      return {
        question: `(ЕНТ • Геометрия) В прямоугольном треугольнике катеты $a = ${a}\\text{ см}$ и $b = ${b}\\text{ см}$. Найдите гипотенузу $c$.`,
        targetSymbol: "c",
        correctAnswer: c,
        unit: "см",
        steps: [
          `**Шаг 1:** $$c = \\sqrt{a^2 + b^2} = \\sqrt{${a}^2 + ${b}^2} = ${c}\\text{ см}$$`
        ]
      };
    }
  },
  {
    id: "arithmetic_progression",
    subject: "math",
    topic: "Алгебра",
    subtopic: "Последовательности",
    title: "Арифметическая прогрессия (ЕНТ Рустюмов)",
    latex: "a_n = a_1 + (n - 1)d",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Формула $n$-го члена арифметической прогрессии из пособия Рустюмова.",
    variables: [
      { symbol: "a_1", name: "Первый член a₁", unit: "", min: -20, max: 20, default: 2, step: 1 },
      { symbol: "d", name: "Разность d", unit: "", min: 1, max: 10, default: 3, step: 1 },
      { symbol: "n", name: "Номер n", unit: "", min: 1, max: 50, default: 10, step: 1 }
    ],
    targetVariable: { symbol: "a_n", name: "n-й член aₙ", unit: "" },
    calculate: (a1, d, n) => a1 + (n - 1) * d,
    visualizationType: "progression_bars",
    taskGenerator: () => {
      const a1 = Math.floor(Math.random() * 10) + 1;
      const d = Math.floor(Math.random() * 5) + 2;
      const n = Math.floor(Math.random() * 15) + 5;
      const an = a1 + (n - 1) * d;
      return {
        question: `(ЕНТ • Рустюмов) В арифметической прогрессии $a_1 = ${a1}$, разность $d = ${d}$. Найдите $a_{${n}}$.`,
        targetSymbol: `a_{${n}}`,
        correctAnswer: an,
        unit: "",
        steps: [
          `**Шаг 1:** $$a_{${n}} = a_1 + (${n} - 1)d = ${a1} + ${n - 1} \\cdot ${d} = ${an}$$`
        ]
      };
    }
  },
  {
    id: "ent_geometric_progression",
    subject: "math",
    topic: "Алгебра",
    subtopic: "Прогрессии",
    title: "Геометрическая прогрессия (ЕНТ Рустюмов)",
    latex: "b_n = b_1 \\cdot q^{n-1}",
    examTags: ["ЕНТ", "ЕГЭ"],
    description: "Формула $n$-го члена геометрической прогрессии с первым членом $b_1$ и знаменателем $q$.",
    variables: [
      { symbol: "b_1", name: "Первый член b₁", unit: "", min: 1, max: 10, default: 3, step: 1 },
      { symbol: "q", name: "Знаменатель q", unit: "", min: 2, max: 5, default: 2, step: 1 },
      { symbol: "n", name: "Номер n", unit: "", min: 1, max: 8, default: 4, step: 1 }
    ],
    targetVariable: { symbol: "b_n", name: "n-й член bₙ", unit: "" },
    calculate: (b1, q, n) => b1 * Math.pow(q, n - 1),
    visualizationType: "progression_bars",
    taskGenerator: () => {
      const b1 = Math.floor(Math.random() * 5) + 1;
      const q = Math.floor(Math.random() * 3) + 2;
      const n = Math.floor(Math.random() * 4) + 3;
      const bn = b1 * Math.pow(q, n - 1);
      return {
        question: `(ЕНТ • Рустюмов) В геометрической прогрессии $b_1 = ${b1}$, знаменатель $q = ${q}$. Найдите $b_{${n}}$.`,
        targetSymbol: `b_{${n}}`,
        correctAnswer: bn,
        unit: "",
        steps: [
          `**Шаг 1:** $$b_{${n}} = b_1 \\cdot q^{${n}-1} = ${b1} \\cdot ${q}^{${n - 1}} = ${bn}$$`
        ]
      };
    }
  },
  {
    id: "ent_logarithms",
    subject: "math",
    topic: "Алгебра",
    subtopic: "Логарифмы",
    title: "Логарифмические уравнения (ЕНТ Рустюмов)",
    latex: "\\log_a b = c \\iff a^c = b",
    examTags: ["ЕНТ", "ЕГЭ"],
    description: "Определение логарифма по основанию $a$.",
    variables: [
      { symbol: "a", name: "Основание a", unit: "", min: 2, max: 10, default: 2, step: 1 },
      { symbol: "c", name: "Показатель c", unit: "", min: 1, max: 5, default: 3, step: 1 }
    ],
    targetVariable: { symbol: "b", name: "Аргумент b", unit: "" },
    calculate: (a, c) => Math.pow(a, c),
    visualizationType: "log_graph",
    taskGenerator: () => {
      const a = Math.floor(Math.random() * 4) + 2;
      const c = Math.floor(Math.random() * 4) + 1;
      const b = Math.pow(a, c);
      return {
        question: `(ЕНТ • Рустюмов) Решите уравнение: $\\log_{${a}} x = ${c}$. Найдите корень $x$.`,
        targetSymbol: "x",
        correctAnswer: b,
        unit: "",
        steps: [
          `**Шаг 1:** По определению логарифма: $$x = ${a}^{${c}} = ${b}$$`
        ]
      };
    }
  },
  {
    id: "ent_exponentials",
    subject: "math",
    topic: "Алгебра",
    subtopic: "Показательные уравнения",
    title: "Показательные уравнения (ЕНТ Рустюмов)",
    latex: "a^{f(x)} = a^{g(x)} \\iff f(x) = g(x)",
    examTags: ["ЕНТ", "ЕГЭ"],
    description: "Приведение показателей степени к единому основанию.",
    variables: [
      { symbol: "a", name: "Основание a", unit: "", min: 2, max: 7, default: 3, step: 1 },
      { symbol: "k", name: "Коэффициент", unit: "", min: 1, max: 4, default: 2, step: 1 }
    ],
    targetVariable: { symbol: "x", name: "Корень x", unit: "" },
    calculate: (a, k) => k,
    visualizationType: "exp_graph",
    taskGenerator: () => {
      const a = [2, 3, 5][Math.floor(Math.random() * 3)];
      const x_ans = Math.floor(Math.random() * 4) + 1;
      const pow = 2 * x_ans + 1;
      const b = Math.pow(a, pow);
      return {
        question: `(ЕНТ • Рустюмов) Найдите корень показательного уравнения: $${a}^{2x + 1} = ${b}$.`,
        targetSymbol: "x",
        correctAnswer: x_ans,
        unit: "",
        steps: [
          `**Шаг 1:** $${a}^{2x + 1} = ${a}^{${pow}} \\implies 2x + 1 = ${pow} \\implies x = ${x_ans}$$`
        ]
      };
    }
  },
  {
    id: "ent_derivative_tangent",
    subject: "math",
    topic: "Алгебра",
    subtopic: "Производная",
    title: "Геометрический смысл производной (ЕНТ Рустюмов)",
    latex: "k = f'(x_0) = \\tan\\alpha",
    examTags: ["ЕНТ", "ЕГЭ"],
    description: "Угловой коэффициент касательной равен значения производной в точке касания.",
    variables: [
      { symbol: "a", name: "Коэффициент a", unit: "", min: 1, max: 5, default: 2, step: 1 },
      { symbol: "x_0", name: "Точка x₀", unit: "", min: -5, max: 5, default: 3, step: 1 }
    ],
    targetVariable: { symbol: "k", name: "Угловой коэффициент k", unit: "" },
    calculate: (a, x0) => 2 * a * x0,
    visualizationType: "parabola_graph",
    taskGenerator: () => {
      const a = Math.floor(Math.random() * 3) + 1;
      const b = Math.floor(Math.random() * 6) - 3;
      const x0 = Math.floor(Math.random() * 5) + 1;
      const k = 2 * a * x0 + b;
      return {
        question: `(ЕНТ • Рустюмов) Найдите угловой коэффициент касательной к $f(x) = ${a === 1 ? '' : a}x^2 ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}x + 5$ в точке $x_0 = ${x0}$.`,
        targetSymbol: "k",
        correctAnswer: k,
        unit: "",
        steps: [
          `**Шаг 1:** $$k = f'(${x0}) = ( ${a === 1 ? '' : a}x^2 ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}x + 5 )' = ${2 * a} \\cdot ${x0} ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} = ${k}$$`
        ]
      };
    }
  },
  {
    id: "ent_combinatorics_combinations",
    subject: "math",
    topic: "Алгебра",
    subtopic: "Комбинаторика",
    title: "Сочетания C(n, k) (ЕНТ Рустюмов)",
    latex: "C_n^k = \\frac{n!}{k!(n-k)!}",
    examTags: ["ЕНТ", "ЕГЭ"],
    description: "Число способов выбрать $k$ элементов из $n$ без учета порядка.",
    variables: [
      { symbol: "n", name: "Всего n", unit: "", min: 3, max: 10, default: 5, step: 1 },
      { symbol: "k", name: "Выборка k", unit: "", min: 1, max: 5, default: 2, step: 1 }
    ],
    targetVariable: { symbol: "C_n^k", name: "Сочетания", unit: "" },
    calculate: (n, k) => {
      const fact = (num) => (num <= 1 ? 1 : num * fact(num - 1));
      return fact(n) / (fact(k) * fact(n - k));
    },
    visualizationType: "default",
    taskGenerator: () => {
      const n = Math.floor(Math.random() * 4) + 5;
      const k = Math.floor(Math.random() * 2) + 2;
      const fact = (num) => (num <= 1 ? 1 : num * fact(num - 1));
      const C = fact(n) / (fact(k) * fact(n - k));
      return {
        question: `(ЕНТ • Рустюмов) Из ${n} учеников нужно выбрать команду из ${k} человек. Сколькими способами это можно сделать?`,
        targetSymbol: `C_{${n}}^{${k}}`,
        correctAnswer: C,
        unit: "способов",
        steps: [
          `**Шаг 1:** $$C_{${n}}^{${k}} = \\frac{${n}!}{${k}! \\cdot ${n - k}!} = ${C}\\text{ способов}$$`
        ]
      };
    }
  }
];
