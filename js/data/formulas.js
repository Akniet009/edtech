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
    renderSubstituted: (v) => `\\sum \\vec{F} = \\mathbf{${v['F_{\\text{рез}}'] ?? 0}}\\text{ Н} \\implies v = \\mathbf{${v.v ?? 15}}\\text{ м/с} = \\text{const}`,
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
    renderSubstituted: (v) => `|\\vec{F}_{12}| = \\mathbf{${v['F_{12}'] ?? 50}}\\text{ Н} \\implies |\\vec{F}_{21}| = \\mathbf{${v['F_{12}'] ?? 50}}\\text{ Н}`,
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
  },

  // ==========================================
  // --- ТРИГОНОМЕТРИЯ (ЕНТ / ЕГЭ) ---
  // ==========================================
  {
    id: "trig_pythagorean_identity",
    subject: "math",
    topic: "Тригонометрия",
    subtopic: "Тождества",
    title: "Основное тригонометрическое тождество",
    latex: "\\sin^2\\alpha + \\cos^2\\alpha = 1",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Сумма квадратов синуса и косинуса одного и того же угла всегда равна единице для любого вещественного угла.",
    variables: [
      { symbol: "\\alpha", name: "Угол α", unit: "°", min: 0, max: 90, default: 30, step: 5 }
    ],
    targetVariable: { symbol: "\\cos\\alpha", name: "Косинус cos α", unit: "" },
    calculate: (alpha) => Number(Math.cos((alpha * Math.PI) / 180).toFixed(3)),
    visualizationType: "trig_wave",
    taskGenerator: () => {
      const pairs = [
        { sin: 0.6, cos: 0.8, sinTex: "\\frac{3}{5}", cosTex: "\\frac{4}{5}" },
        { sin: 0.8, cos: 0.6, sinTex: "\\frac{4}{5}", cosTex: "\\frac{3}{5}" },
        { sin: 0.28, cos: 0.96, sinTex: "0.28", cosTex: "0.96" }
      ];
      const p = pairs[Math.floor(Math.random() * pairs.length)];
      return {
        question: `(ЕНТ • Тригонометрия) Известно, что $\\sin\\alpha = ${p.sinTex}$ и угол $\\alpha \\in (0; 90^\\circ)$. Найдите значение $\\cos\\alpha$.`,
        targetSymbol: "\\cos\\alpha",
        correctAnswer: p.cos,
        unit: "",
        steps: [
          `**Шаг 1:** Используем тождество $\\sin^2\\alpha + \\cos^2\\alpha = 1$.`,
          `**Шаг 2:** Так как угол в I четверти, $\\cos\\alpha > 0$: $$\\cos\\alpha = \\sqrt{1 - \\sin^2\\alpha} = \\sqrt{1 - (${p.sin})^2} = ${p.cos}$$`
        ]
      };
    }
  },
  {
    id: "trig_double_angle_sin",
    subject: "math",
    topic: "Тригонометрия",
    subtopic: "Двойной угол",
    title: "Синус двойного угла",
    latex: "\\sin(2\\alpha) = 2\\sin\\alpha\\cos\\alpha",
    examTags: ["ЕНТ", "ЕГЭ"],
    description: "Формула синуса двойного аргумента выражается через произведение синуса и косинуса одинарного аргумента.",
    variables: [
      { symbol: "\\alpha", name: "Угол α", unit: "°", min: 0, max: 45, default: 15, step: 5 }
    ],
    targetVariable: { symbol: "\\sin(2\\alpha)", name: "Синус 2α", unit: "" },
    calculate: (alpha) => Number(Math.sin((2 * alpha * Math.PI) / 180).toFixed(3)),
    visualizationType: "trig_wave",
    taskGenerator: () => {
      const angles = [
        { alpha: 15, double: 30, val: 0.5, exact: "\\frac{1}{2}" },
        { alpha: 45, double: 90, val: 1.0, exact: "1" },
        { alpha: 75, double: 150, val: 0.5, exact: "\\frac{1}{2}" }
      ];
      const choice = angles[Math.floor(Math.random() * angles.length)];
      return {
        question: `(ЕНТ • Рустюмов) Вычислите значение тригонометрического выражения: $$2\\sin(${choice.alpha}^\\circ)\\cos(${choice.alpha}^\\circ)$$`,
        targetSymbol: "y",
        correctAnswer: choice.val,
        unit: "",
        steps: [
          `**Шаг 1:** Применим формулу синуса двойного угла: $2\\sin\\alpha\\cos\\alpha = \\sin(2\\alpha)$.`,
          `**Шаг 2:** $$\\sin(2 \\cdot ${choice.alpha}^\\circ) = \\sin(${choice.double}^\\circ) = ${choice.val}$$`
        ]
      };
    }
  },
  {
    id: "trig_double_angle_cos",
    subject: "math",
    topic: "Тригонометрия",
    subtopic: "Двойной угол",
    title: "Косинус двойного угла",
    latex: "\\cos(2\\alpha) = \\cos^2\\alpha - \\sin^2\\alpha",
    examTags: ["ЕНТ", "ЕГЭ"],
    description: "Косинус двойного угла равен разности квадратов косинуса и синуса одинарного угла.",
    variables: [
      { symbol: "\\alpha", name: "Угол α", unit: "°", min: 0, max: 90, default: 30, step: 5 }
    ],
    targetVariable: { symbol: "\\cos(2\\alpha)", name: "Косинус 2α", unit: "" },
    calculate: (alpha) => Number(Math.cos((2 * alpha * Math.PI) / 180).toFixed(3)),
    visualizationType: "trig_wave",
    taskGenerator: () => {
      const alphaVals = [
        { deg: 30, doubleDeg: 60, ans: 0.5 },
        { deg: 60, doubleDeg: 120, ans: -0.5 },
        { deg: 45, doubleDeg: 90, ans: 0 }
      ];
      const c = alphaVals[Math.floor(Math.random() * alphaVals.length)];
      return {
        question: `(ЕНТ • Тригонометрия) Вычислите значение выражения: $$\\cos^2(${c.deg}^\\circ) - \\sin^2(${c.deg}^\\circ)$$`,
        targetSymbol: "y",
        correctAnswer: c.ans,
        unit: "",
        steps: [
          `**Шаг 1:** Применим формулу косинуса двойного угла: $\\cos^2\\alpha - \\sin^2\\alpha = \\cos(2\\alpha)$.`,
          `**Шаг 2:** $$\\cos(2 \\cdot ${c.deg}^\\circ) = \\cos(${c.doubleDeg}^\\circ) = ${c.ans}$$`
        ]
      };
    }
  },
  {
    id: "trig_tangent_relation",
    subject: "math",
    topic: "Тригонометрия",
    subtopic: "Тождества",
    title: "Связь тангенса и косинуса",
    latex: "1 + \\tan^2\\alpha = \\frac{1}{\\cos^2\\alpha}",
    examTags: ["ЕНТ", "ЕГЭ"],
    description: "Связывает тригонометрические функции тангенса и косинуса для решения уравнений без нахождения самого угла.",
    variables: [
      { symbol: "t", name: "Тангенс tan α", unit: "", min: 1, max: 5, default: 2, step: 1 }
    ],
    targetVariable: { symbol: "\\frac{1}{\\cos^2\\alpha}", name: "Значение", unit: "" },
    calculate: (t) => 1 + t * t,
    visualizationType: "trig_wave",
    taskGenerator: () => {
      const t = Math.floor(Math.random() * 4) + 2;
      const ans = 1 + t * t;
      return {
        question: `(ЕНТ • Рустюмов) Известно, что $\\tan\\alpha = ${t}$. Найдите значение выражения $\\frac{1}{\\cos^2\\alpha}$.`,
        targetSymbol: "\\frac{1}{\\cos^2\\alpha}",
        correctAnswer: ans,
        unit: "",
        steps: [
          `**Шаг 1:** Используем формулу $1 + \\tan^2\\alpha = \\frac{1}{\\cos^2\\alpha}$.`,
          `**Шаг 2:** $$\\frac{1}{\\cos^2\\alpha} = 1 + (${t})^2 = 1 + ${t * t} = ${ans}$$`
        ]
      };
    }
  },
  {
    id: "trig_harmonic_wave",
    subject: "math",
    topic: "Тригонометрия",
    subtopic: "Функции и графики",
    title: "Гармоническая функция (Амплитуда и частота)",
    latex: "y = A \\sin(\\omega x)",
    examTags: ["ЕНТ", "ЕГЭ"],
    description: "Гармоническая синусоидальная функция. Параметр $A$ определяет амплитуду, а $\\omega$ определяет частоту колебаний.",
    variables: [
      { symbol: "A", name: "Амплитуда A", unit: "", min: 1, max: 6, default: 3, step: 1 },
      { symbol: "\\omega", name: "Частота ω", unit: "", min: 1, max: 4, default: 2, step: 1 }
    ],
    targetVariable: { symbol: "A", name: "Амплитуда", unit: "" },
    calculate: (A) => A,
    visualizationType: "trig_wave",
    taskGenerator: () => {
      const A = Math.floor(Math.random() * 5) + 2;
      const omega = Math.floor(Math.random() * 3) + 2;
      return {
        question: `(ЕНТ • Тригонометрия) Найдите амплитуду $A$ гармонического колебания, заданного уравнением: $$y = ${A} \\sin(${omega}x)$$`,
        targetSymbol: "A",
        correctAnswer: A,
        unit: "",
        steps: [
          `**Шаг 1:** В общем виде уравнение гармонического колебания: $y = A \\sin(\\omega x)$.`,
          `**Шаг 2:** Амплитуда — это коэффициент перед функцией синуса: $$A = ${A}$$`
        ]
      };
    }
  },

  // ==========================================
  // --- ГЕОМЕТРИЯ (ЕНТ / РУСТЮМОВ) ---
  // ==========================================
  {
    id: "law_of_cosines",
    subject: "math",
    topic: "Геометрия",
    subtopic: "Теоремы",
    title: "Теорема косинусов",
    latex: "c^2 = a^2 + b^2 - 2ab\\cos\\gamma",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Квадрат любой стороны треугольника равен сумме квадратов двух других сторон минус удвоенное произведение этих сторон на косинус угла между ними.",
    variables: [
      { symbol: "a", name: "Сторона a", unit: "см", min: 2, max: 15, default: 5, step: 1 },
      { symbol: "b", name: "Сторона b", unit: "см", min: 2, max: 15, default: 8, step: 1 },
      { symbol: "\\gamma", name: "Угол γ", unit: "°", min: 30, max: 120, default: 60, step: 15 }
    ],
    targetVariable: { symbol: "c", name: "Сторона c", unit: "см" },
    calculate: (a, b, gamma) => {
      const rad = (gamma * Math.PI) / 180;
      return Number(Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(rad)).toFixed(2));
    },
    visualizationType: "general_triangle",
    taskGenerator: () => {
      const tasks = [
        { a: 5, b: 8, gamma: 60, c: 7, cosVal: "0.5" },
        { a: 3, b: 8, gamma: 60, c: 7, cosVal: "0.5" },
        { a: 3, b: 5, gamma: 120, c: 7, cosVal: "-0.5" }
      ];
      const t = tasks[Math.floor(Math.random() * tasks.length)];
      return {
        question: `(ЕНТ • Рустюмов) В треугольнике стороны $a = ${t.a}\\text{ см}$, $b = ${t.b}\\text{ см}$, а угол между ними $\\gamma = ${t.gamma}^\\circ$. Найдите третью сторону $c$.`,
        targetSymbol: "c",
        correctAnswer: t.c,
        unit: "см",
        steps: [
          `**Шаг 1:** Запишем теорему косинусов: $c^2 = a^2 + b^2 - 2ab\\cos\\gamma$.`,
          `**Шаг 2:** Подставим значения: $c^2 = ${t.a}^2 + ${t.b}^2 - 2 \\cdot ${t.a} \\cdot ${t.b} \\cdot (${t.cosVal}) = ${t.c**2}$.`,
          `**Шаг 3:** Извлекаем корень: $$c = \\sqrt{${t.c**2}} = ${t.c}\\text{ см}$$`
        ]
      };
    }
  },
  {
    id: "law_of_sines",
    subject: "math",
    topic: "Геометрия",
    subtopic: "Теоремы",
    title: "Теорема синусов и радиус описанной окружности",
    latex: "\\frac{a}{\\sin\\alpha} = 2R",
    examTags: ["ЕНТ", "ЕГЭ"],
    description: "Отношение стороны треугольника к синусу противолежащего угла равно удвоенному радиусу описанной около него окружности ($2R$).",
    variables: [
      { symbol: "a", name: "Сторона a", unit: "см", min: 2, max: 20, default: 6, step: 1 },
      { symbol: "\\alpha", name: "Угол α", unit: "°", min: 30, max: 90, default: 30, step: 15 }
    ],
    targetVariable: { symbol: "R", name: "Радиус описанной окружности", unit: "см" },
    calculate: (a, alpha) => {
      const rad = (alpha * Math.PI) / 180;
      return Number((a / (2 * Math.sin(rad))).toFixed(2));
    },
    visualizationType: "circle_geometry",
    taskGenerator: () => {
      const a = (Math.floor(Math.random() * 5) + 3) * 2;
      const R = a;
      return {
        question: `(ЕНТ • Рустюмов) В треугольнике сторона $a = ${a}\\text{ см}$ лежит напротив угла $\\alpha = 30^\\circ$. Найдите радиус $R$ описанной окружности.`,
        targetSymbol: "R",
        correctAnswer: R,
        unit: "см",
        steps: [
          `**Шаг 1:** По теореме синусов: $\\frac{a}{\\sin\\alpha} = 2R \\implies R = \\frac{a}{2\\sin\\alpha}$.`,
          `**Шаг 2:** Так как $\\sin(30^\\circ) = 0.5$: $$R = \\frac{${a}}{2 \\cdot 0.5} = ${R}\\text{ см}$$`
        ]
      };
    }
  },
  {
    id: "triangle_area_sine",
    subject: "math",
    topic: "Геометрия",
    subtopic: "Площади",
    title: "Площадь треугольника через синус угла",
    latex: "S = \\frac{1}{2} a b \\sin\\gamma",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Площадь любого треугольника равна половине произведения двух его сторон на синус угла между ними.",
    variables: [
      { symbol: "a", name: "Сторона a", unit: "см", min: 2, max: 15, default: 6, step: 1 },
      { symbol: "b", name: "Сторона b", unit: "см", min: 2, max: 15, default: 10, step: 1 },
      { symbol: "\\gamma", name: "Угол γ", unit: "°", min: 30, max: 90, default: 30, step: 15 }
    ],
    targetVariable: { symbol: "S", name: "Площадь S", unit: "см²" },
    calculate: (a, b, gamma) => {
      const rad = (gamma * Math.PI) / 180;
      return Number((0.5 * a * b * Math.sin(rad)).toFixed(2));
    },
    visualizationType: "general_triangle",
    taskGenerator: () => {
      const a = (Math.floor(Math.random() * 4) + 2) * 2;
      const b = Math.floor(Math.random() * 6) + 5;
      const S = 0.5 * a * b * 0.5;
      return {
        question: `(ЕНТ • Рустюмов) Найдите площадь треугольника со сторонами $a = ${a}\\text{ см}$, $b = ${b}\\text{ см}$ и углом между ними $\\gamma = 30^\\circ$.`,
        targetSymbol: "S",
        correctAnswer: S,
        unit: "см²",
        steps: [
          `**Шаг 1:** Формула площади: $S = \\frac{1}{2} a b \\sin\\gamma$.`,
          `**Шаг 2:** $$\\sin(30^\\circ) = 0.5 \\implies S = \\frac{1}{2} \\cdot ${a} \\cdot ${b} \\cdot 0.5 = ${S}\\text{ см}^2$$`
        ]
      };
    }
  },
  {
    id: "triangle_area_heron",
    subject: "math",
    topic: "Геометрия",
    subtopic: "Площади",
    title: "Формула Герона (Площадь по трем сторонам)",
    latex: "S = \\sqrt{p(p-a)(p-b)(p-c)}",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Позволяет вычислить площадь треугольника, зная только длины всех трех его сторон, где $p = \\frac{a+b+c}{2}$ — полупериметр.",
    variables: [
      { symbol: "a", name: "Сторона a", unit: "см", min: 3, max: 20, default: 13, step: 1 },
      { symbol: "b", name: "Сторона b", unit: "см", min: 3, max: 20, default: 14, step: 1 },
      { symbol: "c", name: "Сторона c", unit: "см", min: 3, max: 20, default: 15, step: 1 }
    ],
    targetVariable: { symbol: "S", name: "Площадь S", unit: "см²" },
    calculate: (a, b, c) => {
      const p = (a + b + c) / 2;
      return Number(Math.sqrt(p * (p - a) * (p - b) * (p - c)).toFixed(2));
    },
    visualizationType: "general_triangle",
    taskGenerator: () => {
      const triangles = [
        { a: 13, b: 14, c: 15, p: 21, S: 84 },
        { a: 5, b: 5, c: 6, p: 8, S: 12 },
        { a: 5, b: 5, c: 8, p: 9, S: 12 }
      ];
      const tr = triangles[Math.floor(Math.random() * triangles.length)];
      return {
        question: `(ЕНТ • Рустюмов) Стороны треугольника равны $a = ${tr.a}\\text{ см}$, $b = ${tr.b}\\text{ см}$, $c = ${tr.c}\\text{ см}$. Найдите площадь треугольника по формуле Герона.`,
        targetSymbol: "S",
        correctAnswer: tr.S,
        unit: "см²",
        steps: [
          `**Шаг 1:** Вычислим полупериметр: $$p = \\frac{${tr.a} + ${tr.b} + ${tr.c}}{2} = ${tr.p}\\text{ см}$$`,
          `**Шаг 2:** Формула Герона: $$S = \\sqrt{${tr.p}(${tr.p}-${tr.a})(${tr.p}-${tr.b})(${tr.p}-${tr.c})} = \\sqrt{${tr.S**2}} = ${tr.S}\\text{ см}^2$$`
        ]
      };
    }
  },
  {
    id: "circle_area_circumference",
    subject: "math",
    topic: "Геометрия",
    subtopic: "Окружность и круг",
    title: "Площадь круга и длина окружности",
    latex: "S = \\pi R^2, \\quad L = 2\\pi R",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Основные метрические соотношения для круга и окружности через радиус $R$.",
    variables: [
      { symbol: "R", name: "Радиус R", unit: "см", min: 1, max: 20, default: 5, step: 1 }
    ],
    targetVariable: { symbol: "S", name: "Площадь S", unit: "см²" },
    calculate: (R) => Number((Math.PI * R * R).toFixed(2)),
    visualizationType: "circle_geometry",
    taskGenerator: () => {
      const R = Math.floor(Math.random() * 8) + 3;
      const R2 = R * R;
      return {
        question: `(ЕНТ • Геометрия) Радиус круга равен $R = ${R}\\text{ см}$. Чему равна величина $\\frac{S}{\\pi}$ (площадь круга, деленная на $\\pi$)?`,
        targetSymbol: "S/\\pi",
        correctAnswer: R2,
        unit: "см²",
        steps: [
          `**Шаг 1:** Площадь круга: $S = \\pi R^2$.`,
          `**Шаг 2:** $$\\frac{S}{\\pi} = R^2 = ${R}^2 = ${R2}\\text{ см}^2$$`
        ]
      };
    }
  },
  {
    id: "trapezoid_area",
    subject: "math",
    topic: "Геометрия",
    subtopic: "Площади",
    title: "Площадь трапеции",
    latex: "S = \\frac{a + b}{2} \\cdot h",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Площадь трапеции равна произведению полусуммы оснований на высоту.",
    variables: [
      { symbol: "a", name: "Верхнее основание a", unit: "см", min: 2, max: 15, default: 4, step: 1 },
      { symbol: "b", name: "Нижнее основание b", unit: "см", min: 4, max: 25, default: 10, step: 1 },
      { symbol: "h", name: "Высота h", unit: "см", min: 2, max: 15, default: 5, step: 1 }
    ],
    targetVariable: { symbol: "S", name: "Площадь S", unit: "см²" },
    calculate: (a, b, h) => ((a + b) / 2) * h,
    visualizationType: "default",
    taskGenerator: () => {
      const a = Math.floor(Math.random() * 5) + 3;
      const b = a + (Math.floor(Math.random() * 4) + 1) * 2;
      const h = Math.floor(Math.random() * 6) + 3;
      const S = ((a + b) / 2) * h;
      return {
        question: `(ЕНТ • Геометрия) Основания трапеции равны $a = ${a}\\text{ см}$ и $b = ${b}\\text{ см}$, а ее высота $h = ${h}\\text{ см}$. Найдите площадь трапеции $S$.`,
        targetSymbol: "S",
        correctAnswer: S,
        unit: "см²",
        steps: [
          `**Шаг 1:** Формула площади трапеции: $S = \\frac{a + b}{2} \\cdot h$.`,
          `**Шаг 2:** $$S = \\frac{${a} + ${b}}{2} \\cdot ${h} = ${ (a + b) / 2 } \\cdot ${h} = ${S}\\text{ см}^2$$`
        ]
      };
    }
  },
  {
    id: "cylinder_volume",
    subject: "math",
    topic: "Геометрия",
    subtopic: "Стереометрия",
    title: "Объем цилиндра (ЕНТ Стереометрия)",
    latex: "V = \\pi R^2 h",
    examTags: ["ЕНТ", "ЕГЭ"],
    description: "Объем прямого кругового цилиндра равен площади его основания, умноженной на высоту.",
    variables: [
      { symbol: "R", name: "Радиус основания R", unit: "см", min: 1, max: 10, default: 3, step: 1 },
      { symbol: "h", name: "Высота цилиндра h", unit: "см", min: 2, max: 20, default: 6, step: 1 }
    ],
    targetVariable: { symbol: "V", name: "Объем V", unit: "см³" },
    calculate: (R, h) => Number((Math.PI * R * R * h).toFixed(2)),
    visualizationType: "default",
    taskGenerator: () => {
      const R = Math.floor(Math.random() * 4) + 2;
      const h = Math.floor(Math.random() * 6) + 3;
      const V_pi = R * R * h;
      return {
        question: `(ЕНТ • Стереометрия) Радиус основания цилиндра $R = ${R}\\text{ см}$, а высота $h = ${h}\\text{ см}$. Найдите значение $\\frac{V}{\\pi}$ (объем цилиндра, деленный на $\\pi$).`,
        targetSymbol: "V/\\pi",
        correctAnswer: V_pi,
        unit: "см³",
        steps: [
          `**Шаг 1:** Объем цилиндра: $V = \\pi R^2 h$.`,
          `**Шаг 2:** $$\\frac{V}{\\pi} = R^2 \\cdot h = ${R}^2 \\cdot ${h} = ${R * R} \\cdot ${h} = ${V_pi}\\text{ см}^3$$`
        ]
      };
    }
  },

  // ==========================================
  // --- ФИЗИКА: ЭЛЕКТРОДИНАМИКА, ТЕРМОДИНАМИКА, ОПТИКА ---
  // ==========================================
  {
    id: "coulombs_law",
    subject: "physics",
    topic: "Электродинамика",
    subtopic: "Электростатика",
    title: "Закон Кулона (Взаимодействие зарядов)",
    latex: "F = k \\frac{|q_1 q_2|}{r^2}",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Сила взаимодействия двух неподвижных точечных зарядов в вакууме прямо пропорциональна произведению модулей зарядов и обратно пропорциональна квадрату расстояния между ними.",
    variables: [
      { symbol: "q_1", name: "Заряд q₁", unit: "мкКл", min: 1, max: 10, default: 2, step: 1 },
      { symbol: "q_2", name: "Заряд q₂", unit: "мкКл", min: 1, max: 10, default: 5, step: 1 },
      { symbol: "r", name: "Расстояние r", unit: "м", min: 0.2, max: 3, default: 1, step: 0.1 }
    ],
    targetVariable: { symbol: "F", name: "Сила взаимодействия", unit: "Н" },
    calculate: (q1, q2, r) => {
      const k = 9e9;
      const F = (k * (q1 * 1e-6) * (q2 * 1e-6)) / (r * r);
      return Number(F.toFixed(3));
    },
    visualizationType: "coulomb_charges",
    taskGenerator: () => {
      const q1 = Math.floor(Math.random() * 4) + 2;
      const q2 = Math.floor(Math.random() * 5) + 2;
      const r = 1;
      const F = Number((9e9 * (q1 * 1e-6) * (q2 * 1e-6) / (r * r)).toFixed(3));
      return {
        question: `(ЕНТ • Электродинамика) Два точечных заряда $q_1 = ${q1}\\text{ мкКл}$ и $q_2 = ${q2}\\text{ мкКл}$ находятся в вакууме на расстоянии $r = 1\\text{ м}$. С какой силой $F$ они взаимодействуют? ($k = 9 \\cdot 10^9\\text{ Н}\\cdot\\text{м}^2/\\text{Кл}^2$).`,
        targetSymbol: "F",
        correctAnswer: F,
        unit: "Н",
        steps: [
          `**Шаг 1:** Закон Кулона: $F = k \\frac{q_1 q_2}{r^2}$.`,
          `**Шаг 2:** Переведем заряды в систему СИ: $q_1 = ${q1} \\cdot 10^{-6}\\text{ Кл}$, $q_2 = ${q2} \\cdot 10^{-6}\\text{ Кл}$.`,
          `**Шаг 3:** $$F = 9 \\cdot 10^9 \\cdot \\frac{${q1} \\cdot 10^{-6} \\cdot ${q2} \\cdot 10^{-6}}{1^2} = ${F}\\text{ Н}$$`
        ]
      };
    }
  },
  {
    id: "joule_lenz_law",
    subject: "physics",
    topic: "Электродинамика",
    subtopic: "Постоянный ток",
    title: "Закон Джоуля-Ленца (Тепловое действие тока)",
    latex: "Q = I^2 R t",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Количество теплоты, выделяемое проводником с током, пропорционально квадрату силы тока, сопротивлению проводника и времени прохождения тока.",
    variables: [
      { symbol: "I", name: "Сила тока I", unit: "А", min: 1, max: 10, default: 3, step: 0.5 },
      { symbol: "R", name: "Сопротивление R", unit: "Ом", min: 1, max: 20, default: 5, step: 1 },
      { symbol: "t", name: "Время t", unit: "с", min: 5, max: 60, default: 10, step: 5 }
    ],
    targetVariable: { symbol: "Q", name: "Теплота Q", unit: "Дж" },
    calculate: (I, R, t) => Number((I * I * R * t).toFixed(1)),
    visualizationType: "circuit_diagram",
    taskGenerator: () => {
      const I = Math.floor(Math.random() * 4) + 2;
      const R = Math.floor(Math.random() * 5) + 2;
      const t = (Math.floor(Math.random() * 5) + 1) * 10;
      const Q = I * I * R * t;
      return {
        question: `(ЕНТ • Электродинамика) По проводнику сопротивлением $R = ${R}\\text{ Ом}$ протекает ток $I = ${I}\\text{ А}$ в течение времени $t = ${t}\\text{ с}$. Какое количество теплоты $Q$ выделится в проводнике?`,
        targetSymbol: "Q",
        correctAnswer: Q,
        unit: "Дж",
        steps: [
          `**Шаг 1:** Закон Джоуля-Ленца: $Q = I^2 R t$.`,
          `**Шаг 2:** $$Q = (${I})^2 \\cdot ${R} \\cdot ${t} = ${I * I} \\cdot ${R} \\cdot ${t} = ${Q}\\text{ Дж}$$`
        ]
      };
    }
  },
  {
    id: "capacitor_energy",
    subject: "physics",
    topic: "Электродинамика",
    subtopic: "Электроемкость",
    title: "Энергия заряженного конденсатора",
    latex: "W = \\frac{C U^2}{2}",
    examTags: ["ЕНТ", "ЕГЭ"],
    description: "Энергия электрического поля заряженного конденсатора определяется его емкостью $C$ и напряжением между обкладками $U$.",
    variables: [
      { symbol: "C", name: "Емкость C", unit: "мкФ", min: 10, max: 500, default: 100, step: 10 },
      { symbol: "U", name: "Напряжение U", unit: "В", min: 10, max: 200, default: 50, step: 5 }
    ],
    targetVariable: { symbol: "W", name: "Энергия W", unit: "Дж" },
    calculate: (C_uF, U) => Number((0.5 * (C_uF * 1e-6) * U * U).toFixed(4)),
    visualizationType: "circuit_diagram",
    taskGenerator: () => {
      const C_uF = (Math.floor(Math.random() * 4) + 1) * 100;
      const U = (Math.floor(Math.random() * 4) + 1) * 50;
      const W = Number((0.5 * (C_uF * 1e-6) * U * U).toFixed(2));
      return {
        question: `(ЕНТ • Физика) Конденсатор емкостью $C = ${C_uF}\\text{ мкФ}$ заряжен до напряжения $U = ${U}\\text{ В}$. Определите энергию электрического поля конденсатора $W$.`,
        targetSymbol: "W",
        correctAnswer: W,
        unit: "Дж",
        steps: [
          `**Шаг 1:** Формула энергии конденсатора: $W = \\frac{C U^2}{2}$.`,
          `**Шаг 2:** Переводим в систему СИ: $C = ${C_uF} \\cdot 10^{-6}\\text{ Ф}$.`,
          `**Шаг 3:** $$W = \\frac{${C_uF} \\cdot 10^{-6} \\cdot ${U}^2}{2} = ${W}\\text{ Дж}$$`
        ]
      };
    }
  },
  {
    id: "heat_quantity",
    subject: "physics",
    topic: "Термодинамика",
    subtopic: "Тепловые явления",
    title: "Количество теплоты при нагревании / охлаждении",
    latex: "Q = c m \\Delta t",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Количество теплоты, необходимое для нагревания тела массой $m$ на разность температур $\\Delta t$, где $c$ — удельная теплоемкость вещества.",
    variables: [
      { symbol: "c", name: "Удельная теплоемкость c", unit: "Дж/(кг·°C)", min: 400, max: 4200, default: 4200, step: 100 },
      { symbol: "m", name: "Масса m", unit: "кг", min: 1, max: 20, default: 2, step: 0.5 },
      { symbol: "\\Delta t", name: "Изменение температуры Δt", unit: "°C", min: 5, max: 80, default: 20, step: 5 }
    ],
    targetVariable: { symbol: "Q", name: "Теплота Q", unit: "кДж" },
    calculate: (c, m, dt) => Number(((c * m * dt) / 1000).toFixed(1)),
    visualizationType: "heat_chart",
    taskGenerator: () => {
      const substances = [
        { name: "воды", c: 4200 },
        { name: "железа", c: 460 },
        { name: "меди", c: 380 }
      ];
      const sub = substances[Math.floor(Math.random() * substances.length)];
      const m = Math.floor(Math.random() * 4) + 2;
      const dt = (Math.floor(Math.random() * 5) + 2) * 5;
      const Q_kJ = (sub.c * m * dt) / 1000;
      return {
        question: `(ЕНТ • Термодинамика) Какое количество теплоты в **кДж** требуется передать телу из ${sub.name} массой $m = ${m}\\text{ кг}$ для нагревания на $\\Delta t = ${dt}^\\circ\\text{C}$? ($c = ${sub.c}\\text{ Дж/(кг}\\cdot^\\circ\\text{C)}$).`,
        targetSymbol: "Q",
        correctAnswer: Q_kJ,
        unit: "кДж",
        steps: [
          `**Шаг 1:** Формула количества теплоты: $Q = c m \\Delta t$.`,
          `**Шаг 2:** $$Q = ${sub.c} \\cdot ${m} \\cdot ${dt} = ${sub.c * m * dt}\\text{ Дж} = ${Q_kJ}\\text{ кДж}$$`
        ]
      };
    }
  },
  {
    id: "carnot_efficiency",
    subject: "physics",
    topic: "Термодинамика",
    subtopic: "Тепловые двигатели",
    title: "КПД идеального теплового двигателя (Цикл Карно)",
    latex: "\\eta = \\frac{T_1 - T_2}{T_1} \\cdot 100\\%",
    examTags: ["ЕНТ", "ЕГЭ"],
    description: "Максимально возможный коэффициент полезного действия теплового двигателя, работающего по циклу Карно, зависит только от абсолютных температур нагревателя $T_1$ и холодильника $T_2$.",
    variables: [
      { symbol: "T_1", name: "Температура нагревателя T₁", unit: "К", min: 400, max: 1200, default: 600, step: 50 },
      { symbol: "T_2", name: "Температура холодильника T₂", unit: "К", min: 250, max: 450, default: 300, step: 10 }
    ],
    targetVariable: { symbol: "\\eta", name: "КПД двигателя", unit: "%" },
    calculate: (T1, T2) => Number((((T1 - T2) / T1) * 100).toFixed(1)),
    visualizationType: "pv_diagram",
    taskGenerator: () => {
      const T1 = (Math.floor(Math.random() * 4) + 4) * 100;
      const T2 = 300;
      const eta = Number((((T1 - T2) / T1) * 100).toFixed(1));
      return {
        question: `(ЕНТ • Физика) Идеальная тепловая машина работает по циклу Карно. Температура нагревателя $T_1 = ${T1}\\text{ К}$, а холодильника $T_2 = ${T2}\\text{ К}$. Найдите КПД $\\eta$ тепловой машины в процентах.`,
        targetSymbol: "\\eta",
        correctAnswer: eta,
        unit: "%",
        steps: [
          `**Шаг 1:** Формула КПД цикла Карно: $\\eta = \\frac{T_1 - T_2}{T_1} \\cdot 100\\%$.`,
          `**Шаг 2:** $$\\eta = \\frac{${T1} - ${T2}}{${T1}} \\cdot 100\\% = \\frac{${T1 - T2}}{${T1}} \\cdot 100\\% = ${eta}\\%$$`
        ]
      };
    }
  },
  {
    id: "thin_lens_formula",
    subject: "physics",
    topic: "Оптика",
    subtopic: "Геометрическая оптика",
    title: "Формула тонкой линзы и оптическая сила",
    latex: "D = \\frac{1}{F} = \\frac{1}{d} + \\frac{1}{f}",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Связывает фокусное расстояние линзы $F$, оптическую силу $D$ (в диоптриях, дптр), расстояние от линзы до предмета $d$ и расстояние от линзы до изображения $f$.",
    variables: [
      { symbol: "F", name: "Фокусное расстояние F", unit: "см", min: 5, max: 30, default: 10, step: 1 },
      { symbol: "d", name: "Расстояние до предмета d", unit: "см", min: 11, max: 60, default: 20, step: 1 }
    ],
    targetVariable: { symbol: "f", name: "Расстояние до изображения f", unit: "см" },
    calculate: (F, d) => {
      if (d === F) return 999;
      return Number(((F * d) / (d - F)).toFixed(1));
    },
    visualizationType: "optics_lens",
    taskGenerator: () => {
      const pairs = [
        { F: 10, d: 15, f: 30 },
        { F: 12, d: 20, f: 30 },
        { F: 10, d: 20, f: 20 },
        { F: 6, d: 10, f: 15 }
      ];
      const p = pairs[Math.floor(Math.random() * pairs.length)];
      return {
        question: `(ЕНТ • Оптика) Предмет находится на расстоянии $d = ${p.d}\\text{ см}$ от собирающей линзы с фокусным расстоянием $F = ${p.F}\\text{ см}$. На каком расстоянии $f$ от линзы получится действительное изображение?`,
        targetSymbol: "f",
        correctAnswer: p.f,
        unit: "см",
        steps: [
          `**Шаг 1:** Формула тонкой линзы: $\\frac{1}{F} = \\frac{1}{d} + \\frac{1}{f} \\implies \\frac{1}{f} = \\frac{1}{F} - \\frac{1}{d}$.`,
          `**Шаг 2:** $$\\frac{1}{f} = \\frac{1}{${p.F}} - \\frac{1}{${p.d}} = \\frac{${p.d} - ${p.F}}{${p.F * p.d}} = \\frac{1}{${p.f}} \\implies f = ${p.f}\\text{ см}$$`
        ]
      };
    }
  },

  // ==========================================
  // --- АЛГЕБРА (ЕНТ / РУСТЮМОВ) ---
  // ==========================================
  {
    id: "algebra_vieta_theorem",
    subject: "math",
    topic: "Алгебра",
    subtopic: "Квадратные уравнения",
    title: "Теорема Виета (Связь корней и коэффициентов)",
    latex: "x_1 + x_2 = -p, \\quad x_1 \\cdot x_2 = q",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Для приведенного квадратного уравнения $x^2 + px + q = 0$ сумма корней равна второму коэффициенту с противоположным знаком, а произведение корней равно свободному члену.",
    variables: [
      { symbol: "x_1", name: "Корень x₁", unit: "", min: -10, max: 10, default: 3, step: 1 },
      { symbol: "x_2", name: "Корень x₂", unit: "", min: -10, max: 10, default: -5, step: 1 }
    ],
    targetVariable: { symbol: "q", name: "Свободный член q", unit: "" },
    calculate: (x1, x2) => x1 * x2,
    visualizationType: "parabola_graph",
    taskGenerator: () => {
      const x1 = Math.floor(Math.random() * 6) + 1;
      const x2 = -(Math.floor(Math.random() * 6) + 1);
      const p = -(x1 + x2);
      const q = x1 * x2;
      return {
        question: `(ЕНТ • Рустюмов) В уравнении $x^2 ${p >= 0 ? '+ ' + p : '- ' + Math.abs(p)}x + q = 0$ один из корней равен $x_1 = ${x1}$. Зная, что сумма корней равна ${-p}, найдите свободный член $q$.`,
        targetSymbol: "q",
        correctAnswer: q,
        unit: "",
        steps: [
          `**Шаг 1:** По теореме Виета: $x_1 + x_2 = ${-p} \\implies x_2 = ${-p} - ${x1} = ${x2}$.`,
          `**Шаг 2:** Произведение корней равно $q$: $$q = x_1 \\cdot x_2 = ${x1} \\cdot (${x2}) = ${q}$$`
        ]
      };
    }
  },
  {
    id: "algebra_short_multiplication",
    subject: "math",
    topic: "Алгебра",
    subtopic: "Формулы сокращенного умножения",
    title: "Разность квадратов (ЕНТ Рустюмов)",
    latex: "a^2 - b^2 = (a - b)(a + b)",
    examTags: ["ЕНТ", "ЕГЭ", "ОГЭ"],
    description: "Разность квадратов двух выражений равна произведению их разности и их суммы. Позволяет мгновенно производить расчеты на экзаменах.",
    variables: [
      { symbol: "a", name: "Число a", unit: "", min: 10, max: 100, default: 53, step: 1 },
      { symbol: "b", name: "Число b", unit: "", min: 5, max: 50, default: 47, step: 1 }
    ],
    targetVariable: { symbol: "a^2 - b^2", name: "Результат", unit: "" },
    calculate: (a, b) => a * a - b * b,
    visualizationType: "default",
    taskGenerator: () => {
      const pairs = [
        { a: 63, b: 37, sum: 100, diff: 26, ans: 2600 },
        { a: 74, b: 26, sum: 100, diff: 48, ans: 4800 },
        { a: 82, b: 18, sum: 100, diff: 64, ans: 6400 },
        { a: 55, b: 45, sum: 100, diff: 10, ans: 1000 }
      ];
      const p = pairs[Math.floor(Math.random() * pairs.length)];
      return {
        question: `(ЕНТ • Рустюмов) Вычислите рациональным способом: $$${p.a}^2 - ${p.b}^2$$`,
        targetSymbol: "x",
        correctAnswer: p.ans,
        unit: "",
        steps: [
          `**Шаг 1:** Применим формулу разности квадратов: $a^2 - b^2 = (a - b)(a + b)$.`,
          `**Шаг 2:** $$(${p.a} - ${p.b})(${p.a} + ${p.b}) = ${p.diff} \\cdot ${p.sum} = ${p.ans}$$`
        ]
      };
    }
  },

  // ==========================================
  // --- ADDITIONAL HIGH-YIELD UNT FORMULAS ---
  // ==========================================

  // --- 1. СИЛА ТРЕНИЯ (ҮЙКЕЛІС КҮШІ) ---
  {
    id: "friction_force",
    subject: "physics",
    topic: "Механика",
    subtopic: "Динамика",
    title: "Сила трения скольжения",
    latex: "F_{\\text{тр}} = \\mu N",
    examTags: ["ЕНТ", "ҰБТ", "ЕГЭ"],
    description: "Сила трения скольжения прямо пропорциональна коэффициенту трения и силе нормальной реакции опоры.",
    variables: [
      { symbol: "\\mu", name: "Коэффициент трения", unit: "", min: 0.05, max: 0.8, default: 0.2, step: 0.05 },
      { symbol: "N", name: "Сила реакции опоры", unit: "Н", min: 10, max: 500, default: 100, step: 10 }
    ],
    targetVariable: { symbol: "F_{\\text{тр}}", name: "Сила трения", unit: "Н" },
    calculate: (mu, N) => Math.round(mu * N * 10) / 10,
    visualizationType: "force_vector",
    taskGenerator: () => {
      const muList = [0.1, 0.2, 0.25, 0.3, 0.4, 0.5];
      const mu = muList[Math.floor(Math.random() * muList.length)];
      const m = Math.floor(Math.random() * 8) + 2;
      const N = m * 10;
      const F = Math.round(mu * N * 10) / 10;
      return {
        question: `(ЕНТ • Механика) Брусок массой $m = ${m}\\text{ кг}$ скользит по горизонтальной плоскости с коэффициентом трения $\\mu = ${mu}$. Найдите силу трения $F_{\\text{тр}}$ (при $g = 10\\text{ м/с}^2$).`,
        targetSymbol: "F_{\\text{тр}}",
        correctAnswer: F,
        unit: "Н",
        steps: [
          `**Шаг 1:** Сила реакции опоры на горизонтали: $N = mg = ${m} \\cdot 10 = ${N}\\text{ Н}$.`,
          `**Шаг 2:** Закон сухого трения: $F_{\\text{тр}} = \\mu N = ${mu} \\cdot ${N} = ${F}\\text{ Н}$.`
        ]
      };
    }
  },

  // --- 2. СИЛА АРХИМЕДА (АРХИМЕД КҮШІ) ---
  {
    id: "archimedes_force",
    subject: "physics",
    topic: "Механика",
    subtopic: "Гидростатика",
    title: "Сила Архимеда (Выталкивающая сила)",
    latex: "F_A = \\rho g V",
    examTags: ["ЕНТ", "ҰБТ", "ОГЭ"],
    description: "На тело, погруженное в жидкость или газ, действует выталкивающая сила, равная весу вытесненной им жидкости.",
    variables: [
      { symbol: "\\rho", name: "Плотность жидкости", unit: "кг/м³", min: 800, max: 1200, default: 1000, step: 50 },
      { symbol: "V", name: "Объем тела", unit: "м³", min: 0.001, max: 0.05, default: 0.01, step: 0.001 }
    ],
    targetVariable: { symbol: "F_A", name: "Сила Архимеда", unit: "Н" },
    calculate: (rho, V) => Math.round(rho * 10 * V),
    visualizationType: "default",
    taskGenerator: () => {
      const rho = 1000;
      const vLiters = Math.floor(Math.random() * 5) + 2; // 2..6 л
      const V = vLiters * 0.001;
      const F_A = rho * 10 * V;
      return {
        question: `(ЕНТ • Гидростатика) Тело объемом $V = ${vLiters}\\text{ л} = ${V}\\text{ м}^3$ полностью погружено в воду ($\\rho = 1000\\text{ кг/м}^3$). Определите силу Архимеда $F_A$ (при $g = 10\\text{ м/с}^2$).`,
        targetSymbol: "F_A",
        correctAnswer: F_A,
        unit: "Н",
        steps: [
          `**Шаг 1:** Закон Архимеда: $F_A = \\rho_{\\text{ж}} g V$.`,
          `**Шаг 2:** Подставим значения: $F_A = 1000 \\cdot 10 \\cdot ${V} = ${F_A}\\text{ Н}$.`
        ]
      };
    }
  },

  // --- 3. ГИДРОСТАТИЧЕСКОЕ ДАВЛЕНИЕ (ГИДРОСТАТИКАЛЫҚ ҚЫСЫМ) ---
  {
    id: "hydrostatic_pressure",
    subject: "physics",
    topic: "Механика",
    subtopic: "Гидростатика",
    title: "Гидростатическое давление",
    latex: "p = \\rho g h",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Давление неподвижного столба жидкости на дно сосуда пропорционально плотности жидкости и глубине погружения.",
    variables: [
      { symbol: "\\rho", name: "Плотность жидкости", unit: "кг/м³", min: 700, max: 1200, default: 1000, step: 50 },
      { symbol: "h", name: "Глубина столба", unit: "м", min: 1, max: 50, default: 10, step: 1 }
    ],
    targetVariable: { symbol: "p", name: "Давление", unit: "кПа" },
    calculate: (rho, h) => Math.round((rho * 10 * h) / 1000),
    visualizationType: "default",
    taskGenerator: () => {
      const h = Math.floor(Math.random() * 15) + 5;
      const p = Math.round((1000 * 10 * h) / 1000);
      return {
        question: `(ЕНТ • Гидростатика) Водолаз погрузился в озеро на глубину $h = ${h}\\text{ м}$. Найдите гидростатическое давление воды в кПа ($\\rho = 1000\\text{ кг/м}^3$, $g = 10\\text{ м/с}^2$).`,
        targetSymbol: "p",
        correctAnswer: p,
        unit: "кПа",
        steps: [
          `**Шаг 1:** Формула гидростатического давления: $p = \\rho g h$.`,
          `**Шаг 2:** $p = 1000 \\cdot 10 \\cdot ${h} = ${p * 1000}\\text{ Па} = ${p}\\text{ кПа}$.`
        ]
      };
    }
  },

  // --- 4. МЕХАНИЧЕСКАЯ РАБОТА (МЕХАНИКАЛЫҚ ЖҰМЫС) ---
  {
    id: "mechanical_work",
    subject: "physics",
    topic: "Механика",
    subtopic: "Законы сохранения",
    title: "Механическая работа",
    latex: "A = F s \\cos\\alpha",
    examTags: ["ЕНТ", "ҰБТ", "ЕГЭ"],
    description: "Механическая работа постоянной силы равна произведению модуля силы на модуль перемещения и косинус угла между ними.",
    variables: [
      { symbol: "F", name: "Сила", unit: "Н", min: 10, max: 500, default: 60, step: 10 },
      { symbol: "s", name: "Перемещение", unit: "м", min: 1, max: 50, default: 15, step: 1 }
    ],
    targetVariable: { symbol: "A", name: "Работа", unit: "Дж" },
    calculate: (F, s) => F * s,
    visualizationType: "motion_curve",
    taskGenerator: () => {
      const F = (Math.floor(Math.random() * 8) + 2) * 10;
      const s = Math.floor(Math.random() * 10) + 2;
      const A = F * s;
      return {
        question: `(ЕНТ • Механика) Под действием горизонтальной силы $F = ${F}\\text{ Н}$ тело переместилось на расстояние $s = ${s}\\text{ м}$ вдоль направления силы. Найдите совершенную работу $A$.`,
        targetSymbol: "A",
        correctAnswer: A,
        unit: "Дж",
        steps: [
          `**Шаг 1:** Так как сила сонаправлена с перемещением, $\\cos(0^\\circ) = 1$. Формула: $A = F s$.`,
          `**Шаг 2:** $A = ${F} \\cdot ${s} = ${A}\\text{ Дж}$.`
        ]
      };
    }
  },

  // --- 5. МЕХАНИЧЕСКАЯ МОЩНОСТЬ (МЕХАНИКАЛЫҚ ҚУАТ) ---
  {
    id: "mechanical_power",
    subject: "physics",
    topic: "Механика",
    subtopic: "Законы сохранения",
    title: "Механическая мощность",
    latex: "N = \\frac{A}{t} = F v",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Мощность — физическая величина, равная отношению совершенной работы ко времени, за которое она была совершена.",
    variables: [
      { symbol: "A", name: "Работа", unit: "Дж", min: 100, max: 5000, default: 1200, step: 50 },
      { symbol: "t", name: "Время", unit: "с", min: 1, max: 60, default: 10, step: 1 }
    ],
    targetVariable: { symbol: "N", name: "Мощность", unit: "Вт" },
    calculate: (A, t) => Math.round(A / t),
    visualizationType: "default",
    taskGenerator: () => {
      const t = Math.floor(Math.random() * 8) + 4;
      const N = (Math.floor(Math.random() * 8) + 2) * 50;
      const A = N * t;
      return {
        question: `(ЕНТ • Механика) Двигатель за время $t = ${t}\\text{ с}$ совершает работу $A = ${A}\\text{ Дж}$. Определите полезную мощность двигателя $N$ в ваттах.`,
        targetSymbol: "N",
        correctAnswer: N,
        unit: "Вт",
        steps: [
          `**Шаг 1:** Мощность равна отношению работы ко времени: $N = \\frac{A}{t}$.`,
          `**Шаг 2:** $N = \\frac{${A}}{${t}} = ${N}\\text{ Вт}$.`
        ]
      };
    }
  },

  // --- 6. ПЕРИОД МАТЕМАТИЧЕСКОГО МАЯТНИКА (МАТЕМАТИКАЛЫҚ МАЯТНИК) ---
  {
    id: "math_pendulum",
    subject: "physics",
    topic: "Механика",
    subtopic: "Колебания и волны",
    title: "Период математического маятника",
    latex: "T = 2\\pi \\sqrt{\\frac{l}{g}}",
    examTags: ["ЕНТ", "ҰБТ", "ЕГЭ"],
    description: "Период малых колебаний математического маятника зависит от длины нити и ускорения свободного падения, но не зависит от массы.",
    variables: [
      { symbol: "l", name: "Длина нити", unit: "м", min: 0.1, max: 10, default: 2.5, step: 0.1 }
    ],
    targetVariable: { symbol: "T", name: "Период колебаний", unit: "с" },
    calculate: (l) => Math.round(2 * Math.PI * Math.sqrt(l / 9.8) * 100) / 100,
    visualizationType: "motion_curve",
    taskGenerator: () => {
      const l = 4;
      const T = Math.round(2 * 3.14 * Math.sqrt(4 / 10) * 10) / 10;
      return {
        question: `(ЕНТ • Колебания) Во сколько раз изменится период колебаний математического маятника, если длину нити увеличить в 4 раза?`,
        targetSymbol: "k",
        correctAnswer: 2,
        unit: "раза",
        steps: [
          `**Шаг 1:** Формула периода: $T = 2\\pi \\sqrt{\\frac{l}{g}}$, значит $T \\sim \\sqrt{l}$.`,
          `**Шаг 2:** При увеличении длины в 4 раза период увеличится в $\\sqrt{4} = 2$ раза.`
        ]
      };
    }
  },

  // --- 7. ПЕРИОД ПРУЖИННОГО МАЯТНИКА (СЕРІППЕЛІ МАЯТНИК) ---
  {
    id: "spring_pendulum",
    subject: "physics",
    topic: "Механика",
    subtopic: "Колебания и волны",
    title: "Период пружинного маятника",
    latex: "T = 2\\pi \\sqrt{\\frac{m}{k}}",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Период свободных колебаний пружинного маятника зависит от массы груза и жесткости пружины.",
    variables: [
      { symbol: "m", name: "Масса груза", unit: "кг", min: 0.1, max: 10, default: 1, step: 0.1 },
      { symbol: "k", name: "Жесткость пружины", unit: "Н/м", min: 10, max: 500, default: 100, step: 10 }
    ],
    targetVariable: { symbol: "T", name: "Период колебаний", unit: "с" },
    calculate: (m, k) => Math.round(2 * Math.PI * Math.sqrt(m / k) * 100) / 100,
    visualizationType: "motion_curve",
    taskGenerator: () => {
      return {
        question: `(ЕНТ • Колебания) Массу груза на пружине увеличили в 9 раз. Во сколько раз увеличится период колебаний маятника?`,
        targetSymbol: "k",
        correctAnswer: 3,
        unit: "раза",
        steps: [
          `**Шаг 1:** Период пружинного маятника: $T = 2\\pi \\sqrt{\\frac{m}{k}}$, т.е. $T \\sim \\sqrt{m}$.`,
          `**Шаг 2:** При $m' = 9m$, период изменится в $\\sqrt{9} = 3$ раза.`
        ]
      };
    }
  },

  // --- 8. ФОРМУЛА ТОМСОНА (ТОМСОН ФОРМУЛАСЫ) ---
  {
    id: "thomson_formula",
    subject: "physics",
    topic: "Электродинамика",
    subtopic: "Электромагнитные колебания",
    title: "Формула Томсона (Колебательный контур)",
    latex: "T = 2\\pi \\sqrt{L C}",
    examTags: ["ЕНТ", "ҰБТ", "ЕГЭ"],
    description: "Период свободных электромагнитных колебаний в идеальном колебательном контуре определяется индуктивностью и емкостью.",
    variables: [
      { symbol: "L", name: "Индуктивность катушки", unit: "Гн", min: 0.01, max: 2, default: 0.1, step: 0.05 },
      { symbol: "C", name: "Емкость конденсатора", unit: "мкФ", min: 1, max: 100, default: 25, step: 1 }
    ],
    targetVariable: { symbol: "T", name: "Период", unit: "мс" },
    calculate: (L, C) => Math.round(2 * Math.PI * Math.sqrt(L * (C * 1e-6)) * 1000 * 100) / 100,
    visualizationType: "motion_curve",
    taskGenerator: () => {
      return {
        question: `(ЕНТ • Колебательный контур) Емкость конденсатора контура уменьшили в 4 раза, а индуктивность не меняли. Как изменится период свободных колебаний? (Укажите число: во сколько раз уменьшится)`,
        targetSymbol: "n",
        correctAnswer: 2,
        unit: "раза",
        steps: [
          `**Шаг 1:** Формула Томсона: $T = 2\\pi \\sqrt{LC}$, следовательно $T \\sim \\sqrt{C}$.`,
          `**Шаг 2:** При уменьшении $C$ в 4 раза период $T$ уменьшится в $\\sqrt{4} = 2$ раза.`
        ]
      };
    }
  },

  // --- 9. ЗАКОН ЭЛЕКТРОМАГНИТНОЙ ИНДУКЦИИ ФАРАДЕЯ (ФАРАДЕЙ ЗАҢЫ) ---
  {
    id: "faraday_induction",
    subject: "physics",
    topic: "Электродинамика",
    subtopic: "Электромагнитная индукция",
    title: "Закон электромагнитной индукции Фарадея",
    latex: "\\mathcal{E}_i = -\\frac{\\Delta \\Phi}{\\Delta t}",
    examTags: ["ЕНТ", "ҰБТ", "ЕГЭ"],
    description: "ЭДС индукции в замкнутом проводящем контуре пропорциональна скорости изменения магнитного потока через поверхность контура.",
    variables: [
      { symbol: "\\Delta\\Phi", name: "Изменение магнитного потока", unit: "Вб", min: 0.1, max: 5, default: 1.2, step: 0.1 },
      { symbol: "\\Delta t", name: "Интервал времени", unit: "с", min: 0.05, max: 2, default: 0.3, step: 0.05 }
    ],
    targetVariable: { symbol: "\\mathcal{E}_i", name: "ЭДС индукции", unit: "В" },
    calculate: (dPhi, dt) => Math.round((dPhi / dt) * 10) / 10,
    visualizationType: "default",
    taskGenerator: () => {
      const dPhi = (Math.floor(Math.random() * 8) + 2) * 0.1;
      const dt = 0.05;
      const E = Math.round(dPhi / dt);
      return {
        question: `(ЕНТ • Электродинамика) За время $\\Delta t = 0.05\\text{ с}$ магнитный поток через контур равномерно изменился на $\\Delta \\Phi = ${dPhi.toFixed(2)}\\text{ Вб}$. Найдите модуль ЭДС индукции $\\mathcal{E}_i$ в вольтах.`,
        targetSymbol: "\\mathcal{E}_i",
        correctAnswer: E,
        unit: "В",
        steps: [
          `**Шаг 1:** По закону Фарадея модуль ЭДС: $|\\mathcal{E}_i| = \\frac{\\Delta \\Phi}{\\Delta t}$.`,
          `**Шаг 2:** $|\\mathcal{E}_i| = \\frac{${dPhi.toFixed(2)}}{0.05} = ${E}\\text{ В}$.`
        ]
      };
    }
  },

  // --- 10. УРАВНЕНИЕ ЭЙНШТЕЙНА ДЛЯ ФОТОЭФФЕКТА (ФОТОЭФФЕКТ) ---
  {
    id: "photoelectric_effect",
    subject: "physics",
    topic: "Оптика",
    subtopic: "Квантовая физика",
    title: "Уравнение Эйнштейна для фотоэффекта",
    latex: "h \\nu = A_{\\text{вых}} + E_k",
    examTags: ["ЕНТ", "ҰБТ", "ЕГЭ"],
    description: "Энергия падающего кванта света идет на работу выхода электрона из металла и сообщение ему максимальной кинетической энергии.",
    variables: [
      { symbol: "h\\nu", name: "Энергия фотона", unit: "эВ", min: 1, max: 10, default: 5.2, step: 0.2 },
      { symbol: "A", name: "Работа выхода", unit: "эВ", min: 1, max: 5, default: 2.2, step: 0.1 }
    ],
    targetVariable: { symbol: "E_k", name: "Кинетическая энергия", unit: "эВ" },
    calculate: (hNu, A) => Math.max(0, Math.round((hNu - A) * 10) / 10),
    visualizationType: "default",
    taskGenerator: () => {
      const A = Math.floor(Math.random() * 3) + 2;
      const Ek = Math.floor(Math.random() * 4) + 1;
      const hNu = A + Ek;
      return {
        question: `(ЕНТ • Квантовая физика) Энергия фотона, падающего на катод, равна $h\\nu = ${hNu}\\text{ эВ}$. Работа выхода электронов $A_{\\text{вых}} = ${A}\\text{ эВ}$. Какова максимальная кинетическая энергия фотоэлектронов $E_k$ в эВ?`,
        targetSymbol: "E_k",
        correctAnswer: Ek,
        unit: "эВ",
        steps: [
          `**Шаг 1:** Уравнение Эйнштейна: $h\\nu = A_{\\text{вых}} + E_k \\implies E_k = h\\nu - A_{\\text{вых}}$.`,
          `**Шаг 2:** $E_k = ${hNu} - ${A} = ${Ek}\\text{ эВ}$.`
        ]
      };
    }
  },

  // --- 11. СОПРОТИВЛЕНИЕ ПРОВОДНИКА (ӨТКІЗГІШ КЕДЕРГІСІ) ---
  {
    id: "conductor_resistance",
    subject: "physics",
    topic: "Электродинамика",
    subtopic: "Постоянный ток",
    title: "Электрическое сопротивление проводника",
    latex: "R = \\rho \\frac{l}{S}",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Сопротивление однородного проводника прямо пропорционально его длине и обратно пропорционально площади поперечного сечения.",
    variables: [
      { symbol: "l", name: "Длина проводника", unit: "м", min: 10, max: 500, default: 100, step: 10 },
      { symbol: "S", name: "Сечение проводника", unit: "мм²", min: 0.5, max: 10, default: 2, step: 0.5 }
    ],
    targetVariable: { symbol: "R", name: "Сопротивление", unit: "Ом" },
    calculate: (l, S) => Math.round((0.017 * l / S) * 100) / 100,
    visualizationType: "default",
    taskGenerator: () => {
      return {
        question: `(ЕНТ • Электродинамика) Длину медного проводника увеличили в 3 раза, а площадь поперечного сечения уменьшили в 2 раза. Во сколько раз увеличилось сопротивление проводника?`,
        targetSymbol: "k",
        correctAnswer: 6,
        unit: "раз",
        steps: [
          `**Шаг 1:** Формула сопротивления: $R = \\rho \\frac{l}{S}$.`,
          `**Шаг 2:** $R' = \\rho \\frac{3l}{S/2} = 6 \\cdot \\left(\\rho \\frac{l}{S}\\right) = 6R$. Сопротивление выросло в 6 раз.`
        ]
      };
    }
  },

  // --- 12. СИЛА АМПЕРА (АМПЕР КҮШІ) ---
  {
    id: "ampere_force",
    subject: "physics",
    topic: "Электродинамика",
    subtopic: "Магнитное поле",
    title: "Сила Ампера (Проводник с током в поле)",
    latex: "F_A = I B L \\sin\\alpha",
    examTags: ["ЕНТ", "ҰБТ", "ЕГЭ"],
    description: "Сила, с которой магнитное поле действует на проводник с током, прямо пропорциональна силе тока, индукции поля и длине проводника.",
    variables: [
      { symbol: "I", name: "Сила тока", unit: "А", min: 1, max: 20, default: 5, step: 0.5 },
      { symbol: "B", name: "Магнитная индукция", unit: "Тл", min: 0.1, max: 2, default: 0.4, step: 0.05 },
      { symbol: "L", name: "Длина проводника", unit: "м", min: 0.1, max: 2, default: 0.5, step: 0.1 }
    ],
    targetVariable: { symbol: "F_A", name: "Сила Ампера", unit: "Н" },
    calculate: (I, B, L) => Math.round(I * B * L * 100) / 100,
    visualizationType: "force_vector",
    taskGenerator: () => {
      const I = Math.floor(Math.random() * 6) + 2;
      const B = 0.5;
      const L = 0.2;
      const F = Math.round(I * B * L * 100) / 100;
      return {
        question: `(ЕНТ • Магнетизм) Проводник длиной $L = 0.2\\text{ м}$ с током $I = ${I}\\text{ А}$ расположен перпендикулярно линиям однородного магнитного поля с индукцией $B = 0.5\\text{ Тл}$. Найдите силу Ампера $F_A$.`,
        targetSymbol: "F_A",
        correctAnswer: F,
        unit: "Н",
        steps: [
          `**Шаг 1:** Так как проводник перпендикулярен линиям, $\\sin(90^\\circ) = 1$. Формула: $F_A = I B L$.`,
          `**Шаг 2:** $F_A = ${I} \\cdot 0.5 \\cdot 0.2 = ${F}\\text{ Н}$.`
        ]
      };
    }
  },

  // --- 13. СИЛА ЛОРЕНЦА (ЛОРЕНЦ КҮШІ) ---
  {
    id: "lorentz_force",
    subject: "physics",
    topic: "Электродинамика",
    subtopic: "Магнитное поле",
    title: "Сила Лоренца (Заряд в магнитном поле)",
    latex: "F_L = q v B \\sin\\alpha",
    examTags: ["ЕНТ", "ҰБТ", "ЕГЭ"],
    description: "Сила, действующая на движущуюся заряженную частицу в магнитном поле со стороны поля.",
    variables: [
      { symbol: "q", name: "Заряд частицы", unit: "мкКл", min: 1, max: 10, default: 2, step: 1 },
      { symbol: "v", name: "Скорость", unit: "м/с", min: 100, max: 2000, default: 500, step: 100 },
      { symbol: "B", name: "Индукция поля", unit: "Тл", min: 0.1, max: 2, default: 0.4, step: 0.1 }
    ],
    targetVariable: { symbol: "F_L", name: "Сила Лоренца", unit: "мН" },
    calculate: (q, v, B) => Math.round(q * 1e-6 * v * B * 1000 * 10) / 10,
    visualizationType: "default",
    taskGenerator: () => {
      return {
        question: `(ЕНТ • Магнетизм) Протон влетел в однородное магнитное поле параллельно линиям магнитной индукции ($\\alpha = 0^\\circ$). Чему равна действующая на него сила Лоренца?`,
        targetSymbol: "F_L",
        correctAnswer: 0,
        unit: "Н",
        steps: [
          `**Шаг 1:** Формула силы Лоренца: $F_L = q v B \\sin\\alpha$.`,
          `**Шаг 2:** Так как угол $\\alpha = 0^\\circ$, $\\sin(0^\\circ) = 0$, поэтому $F_L = 0\\text{ Н}$.`
        ]
      };
    }
  },

  // --- 14. ЗАКОН ПРЕЛОМЛЕНИЯ СВЕТА СНЕЛЛИУСА (СНЕЛЛИУС ЗАҢЫ) ---
  {
    id: "snell_law",
    subject: "physics",
    topic: "Оптика",
    subtopic: "Геометрическая оптика",
    title: "Закон преломления света (Закон Снеллиуса)",
    latex: "\\frac{\\sin\\alpha}{\\sin\\beta} = \\frac{n_2}{n_1} = n_{21}",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Отношение синуса угла падения к синусу угла преломления равно относительному показателю преломления второй среды относительно первой.",
    variables: [
      { symbol: "n_1", name: "Показатель 1-й среды", unit: "", min: 1, max: 2, default: 1, step: 0.1 },
      { symbol: "n_2", name: "Показатель 2-й среды", unit: "", min: 1, max: 2.5, default: 1.5, step: 0.1 }
    ],
    targetVariable: { symbol: "n_{21}", name: "Относительный показатель", unit: "" },
    calculate: (n1, n2) => Math.round((n2 / n1) * 100) / 100,
    visualizationType: "default",
    taskGenerator: () => {
      return {
        question: `(ЕНТ • Оптика) Луч света падает из воздуха ($n_1 = 1$) в стекло под углом $\\alpha = 45^\\circ$. Если угол преломления равен $\\beta = 30^\\circ$, найдите показатель преломления стекла $n_2$ (с точностью до сотых, $\\sqrt{2} \\approx 1.41$).`,
        targetSymbol: "n_2",
        correctAnswer: 1.41,
        unit: "",
        steps: [
          `**Шаг 1:** Закон Снеллиуса: $\\frac{\\sin\\alpha}{\\sin\\beta} = n_2$.`,
          `**Шаг 2:** $n_2 = \\frac{\\sin 45^\\circ}{\\sin 30^\\circ} = \\frac{\\sqrt{2}/2}{1/2} = \\sqrt{2} \\approx 1.41$.`
        ]
      };
    }
  },

  // --- 15. ОСНОВНОЕ УРАВНЕНИЕ МКТ ДЛЯ ДАВЛЕНИЯ (ИДЕАЛ ГАЗ ҚЫСЫМЫ) ---
  {
    id: "ideal_gas_pressure",
    subject: "physics",
    topic: "Термодинамика",
    subtopic: "Молекулярно-кинетическая теория",
    title: "Давление идеального газа через концентрацию",
    latex: "p = n k T",
    examTags: ["ЕНТ", "ҰБТ", "ЕГЭ"],
    description: "Давление идеального газа прямо пропорционально концентрации молекул и абсолютной температуре (постоянная Больцмана k).",
    variables: [
      { symbol: "T", name: "Температура", unit: "К", min: 100, max: 600, default: 300, step: 20 },
      { symbol: "n", name: "Концентрация (10²⁵ м⁻³)", unit: "", min: 1, max: 10, default: 2, step: 0.5 }
    ],
    targetVariable: { symbol: "p", name: "Давление", unit: "кПа" },
    calculate: (T, n) => Math.round(n * 1e25 * 1.38e-23 * T / 1000 * 10) / 10,
    visualizationType: "pv_diagram",
    taskGenerator: () => {
      return {
        question: `(ЕНТ • МКТ) При постоянной температуре концентрацию молекул идеального газа увеличили в 3 раза. Во сколько раз увеличилось давление газа?`,
        targetSymbol: "k",
        correctAnswer: 3,
        unit: "раза",
        steps: [
          `**Шаг 1:** Уравнение МКТ: $p = n k T$, т.е. при $T = \\text{const}$ давление прямо пропорционально концентрации $p \\sim n$.`,
          `**Шаг 2:** Если концентрация выросла в 3 раза, давление также увеличится в 3 раза.`
        ]
      };
    }
  },

  // --- 16. БЕСКОНЕЧНО УБЫВАЮЩАЯ ГЕОМЕТРИЧЕСКАЯ ПРОГРЕССИЯ ---
  {
    id: "infinite_geometric_series",
    subject: "math",
    topic: "Алгебра",
    subtopic: "Прогрессии",
    title: "Сумма бесконечно убывающей геометрической прогрессии",
    latex: "S = \\frac{b_1}{1 - q} \\quad (|q| < 1)",
    examTags: ["ЕНТ", "ҰБТ", "Рустюмов"],
    description: "Формула предельной суммы всех членов геометрической прогрессии со знаменателем, модуль которого строго меньше 1.",
    variables: [
      { symbol: "b_1", name: "Первый член b₁", unit: "", min: 2, max: 60, default: 18, step: 2 },
      { symbol: "q", name: "Знаменатель q", unit: "", min: 0.1, max: 0.9, default: 0.5, step: 0.1 }
    ],
    targetVariable: { symbol: "S", name: "Сумма прогрессии", unit: "" },
    calculate: (b1, q) => Math.round((b1 / (1 - q)) * 10) / 10,
    visualizationType: "progression_bars",
    taskGenerator: () => {
      const b1 = (Math.floor(Math.random() * 6) + 2) * 3;
      const q = 0.5;
      const S = b1 / (1 - q);
      return {
        question: `(ЕНТ • Рустюмов) Найдите сумму бесконечно убывающей геометрической прогрессии, если $b_1 = ${b1}$ и знаменатель $q = \\frac{1}{2}$.`,
        targetSymbol: "S",
        correctAnswer: S,
        unit: "",
        steps: [
          `**Шаг 1:** Применим формулу суммы бесконечно убывающей прогрессии: $S = \\frac{b_1}{1 - q}$.`,
          `**Шаг 2:** $S = \\frac{${b1}}{1 - 0.5} = \\frac{${b1}}{0.5} = ${S}$.`
        ]
      };
    }
  },

  // --- 17. ОБЪЕМ КОНУСА (КОНУС КӨЛЕМІ) ---
  {
    id: "cone_volume",
    subject: "math",
    topic: "Геометрия",
    subtopic: "Стереометрия",
    title: "Объем кругового конуса",
    latex: "V = \\frac{1}{3} \\pi R^2 h",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Объем круглого конуса равен одной трети произведения площади основания на высоту.",
    variables: [
      { symbol: "R", name: "Радиус основания", unit: "см", min: 1, max: 20, default: 6, step: 1 },
      { symbol: "h", name: "Высота конуса", unit: "см", min: 1, max: 30, default: 10, step: 1 }
    ],
    targetVariable: { symbol: "V", name: "Объем конуса", unit: "см³" },
    calculate: (R, h) => Math.round((1/3) * Math.PI * R * R * h),
    visualizationType: "default",
    taskGenerator: () => {
      const R = 3;
      const h = Math.floor(Math.random() * 5) + 4;
      const V_pi = (1/3) * (R * R) * h;
      return {
        question: `(ЕНТ • Стереометрия) Радиус основания конуса равен $R = 3\\text{ см}$, а высота $h = ${h}\\text{ см}$. Найдите объем конуса $V$ (значение $V / \\pi$).`,
        targetSymbol: "V/\\pi",
        correctAnswer: V_pi,
        unit: "см³",
        steps: [
          `**Шаг 1:** Формула объема конуса: $V = \\frac{1}{3} \\pi R^2 h$.`,
          `**Шаг 2:** $V/\\pi = \\frac{1}{3} \\cdot 3^2 \\cdot ${h} = 3 \\cdot ${h} = ${V_pi}\\text{ см}^3$.`
        ]
      };
    }
  },

  // --- 18. ОБЪЕМ ШАРА И ПЛОЩАДЬ СФЕРЫ (ШАР КӨЛЕМІ) ---
  {
    id: "sphere_volume_surface",
    subject: "math",
    topic: "Геометрия",
    subtopic: "Стереометрия",
    title: "Объем шара и площадь сферы",
    latex: "V = \\frac{4}{3} \\pi R^3, \\quad S = 4 \\pi R^2",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Объем шара пропорционален кубу его радиуса, а площадь поверхности сферы — квадрату радиуса.",
    variables: [
      { symbol: "R", name: "Радиус шара", unit: "см", min: 1, max: 15, default: 3, step: 1 }
    ],
    targetVariable: { symbol: "V", name: "Объем шара", unit: "см³" },
    calculate: (R) => Math.round((4/3) * Math.PI * Math.pow(R, 3)),
    visualizationType: "default",
    taskGenerator: () => {
      const R = 3;
      const V_pi = (4/3) * Math.pow(3, 3);
      return {
        question: `(ЕНТ • Стереометрия) Радиус шара равен $R = 3\\text{ см}$. Чему равен объем шара, деленный на $\\pi$ (т.е. $V/\\pi$)?`,
        targetSymbol: "V/\\pi",
        correctAnswer: V_pi,
        unit: "см³",
        steps: [
          `**Шаг 1:** Формула объема шара: $V = \\frac{4}{3} \\pi R^3$.`,
          `**Шаг 2:** $V/\\pi = \\frac{4}{3} \\cdot 3^3 = 4 \\cdot 9 = 36\\text{ см}^3$.`
        ]
      };
    }
  },

  // --- 19. ОБЪЕМ ПАРАЛЛЕЛЕПИПЕДА (ПАРАЛЛЕЛЕПИПЕД КӨЛЕМІ) ---
  {
    id: "parallelepiped_volume",
    subject: "math",
    topic: "Геометрия",
    subtopic: "Стереометрия",
    title: "Объем прямоугольного параллелепипеда",
    latex: "V = a \\cdot b \\cdot c",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Объем прямоугольного параллелепипеда равен произведению его трех измерений: длины, ширины и высоты.",
    variables: [
      { symbol: "a", name: "Длина a", unit: "см", min: 1, max: 30, default: 6, step: 1 },
      { symbol: "b", name: "Ширина b", unit: "см", min: 1, max: 30, default: 5, step: 1 },
      { symbol: "c", name: "Высота c", unit: "см", min: 1, max: 30, default: 4, step: 1 }
    ],
    targetVariable: { symbol: "V", name: "Объем", unit: "см³" },
    calculate: (a, b, c) => a * b * c,
    visualizationType: "default",
    taskGenerator: () => {
      const a = Math.floor(Math.random() * 5) + 3;
      const b = Math.floor(Math.random() * 4) + 2;
      const c = Math.floor(Math.random() * 4) + 2;
      const V = a * b * c;
      return {
        question: `(ЕНТ • Стереометрия) Измерения прямоугольного параллелепипеда равны $a = ${a}\\text{ см}$, $b = ${b}\\text{ см}$, $c = ${c}\\text{ см}$. Найдите его объем $V$.`,
        targetSymbol: "V",
        correctAnswer: V,
        unit: "см³",
        steps: [
          `**Шаг 1:** Объем параллелепипеда равен произведению его трех измерений: $V = a b c$.`,
          `**Шаг 2:** $V = ${a} \\cdot ${b} \\cdot ${c} = ${V}\\text{ см}^3$.`
        ]
      };
    }
  },

  // --- 20. КЛАССИЧЕСКАЯ ВЕРОЯТНОСТЬ (КЛАССИКАЛЫҚ ЫҚТИМАЛДЫҚ) ---
  {
    id: "probability_classic",
    subject: "math",
    topic: "Алгебра",
    subtopic: "Теория вероятностей",
    title: "Классическое определение вероятности",
    latex: "P(A) = \\frac{m}{n}",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Вероятность события A равна отношению числа благоприятных исходов m к общему числу всех равновозможных исходов n.",
    variables: [
      { symbol: "m", name: "Благоприятные исходы m", unit: "", min: 1, max: 20, default: 4, step: 1 },
      { symbol: "n", name: "Все исходы n", unit: "", min: 2, max: 50, default: 20, step: 1 }
    ],
    targetVariable: { symbol: "P(A)", name: "Вероятность", unit: "" },
    calculate: (m, n) => Math.round((m / n) * 100) / 100,
    visualizationType: "default",
    taskGenerator: () => {
      const white = Math.floor(Math.random() * 6) + 4;
      const black = Math.floor(Math.random() * 6) + 5;
      const total = white + black;
      const p = Math.round((white / total) * 100) / 100;
      return {
        question: `(ЕНТ • Теория вероятностей) В урне ${white} белых и ${black} черных шаров. Наугад вынимают один шар. Найдите вероятность того, что вынут белый шар (с точностью до сотых).`,
        targetSymbol: "P(A)",
        correctAnswer: p,
        unit: "",
        steps: [
          `**Шаг 1:** Общее число шаров $n = ${white} + ${black} = ${total}$, благоприятных $m = ${white}$.`,
          `**Шаг 2:** Вероятность: $P(A) = \\frac{m}{n} = \\frac{${white}}{${total}} \\approx ${p}$.`
        ]
      };
    }
  },

  // --- 21. РАЗМЕЩЕНИЯ (ОРНАЛАСТЫРУЛАР A_n^k) ---
  {
    id: "combinatorics_permutations",
    subject: "math",
    topic: "Алгебра",
    subtopic: "Комбинаторика",
    title: "Число размещений (A_n^k)",
    latex: "A_n^k = \\frac{n!}{(n - k)!}",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Число упорядоченных подмножеств из k элементов, составленных из множества n различных элементов.",
    variables: [
      { symbol: "n", name: "Всего элементов n", unit: "", min: 2, max: 8, default: 5, step: 1 },
      { symbol: "k", name: "Выбирается k", unit: "", min: 1, max: 4, default: 2, step: 1 }
    ],
    targetVariable: { symbol: "A_n^k", name: "Число размещений", unit: "" },
    calculate: (n, k) => {
      let r = 1;
      for (let i = 0; i < k; i++) r *= (n - i);
      return r;
    },
    visualizationType: "default",
    taskGenerator: () => {
      const n = Math.floor(Math.random() * 3) + 5; // 5, 6, 7
      const k = 2;
      const ans = n * (n - 1);
      return {
        question: `(ЕНТ • Комбинаторика) Вычислите число размещений из ${n} элементов по 2: $$A_{${n}}^2$$`,
        targetSymbol: "A_n^2",
        correctAnswer: ans,
        unit: "",
        steps: [
          `**Шаг 1:** Формула числа размещений: $A_n^k = n(n-1)...(n-k+1)$.`,
          `**Шаг 2:** $A_{${n}}^2 = ${n} \\cdot (${n} - 1) = ${n} \\cdot ${n - 1} = ${ans}$.`
        ]
      };
    }
  },

  // --- 22. ФОРМУЛА НЬЮТОНА-ЛЕЙБНИЦА (ИНТЕГРАЛ) ---
  {
    id: "newton_leibniz_integral",
    subject: "math",
    topic: "Алгебра",
    subtopic: "Математический анализ",
    title: "Формула Ньютона-Лейбница (Определенный интеграл)",
    latex: "\\int_a^b f(x) dx = F(b) - F(a)",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Основная формула интегрального исчисления: определенный интеграл равен разности значений первообразной на верхнем и нижнем пределах.",
    variables: [
      { symbol: "a", name: "Нижний предел", unit: "", min: 0, max: 3, default: 0, step: 1 },
      { symbol: "b", name: "Верхний предел", unit: "", min: 1, max: 6, default: 3, step: 1 }
    ],
    targetVariable: { symbol: "I", name: "Значение интеграла", unit: "" },
    calculate: (a, b) => Math.round((Math.pow(b, 2) - Math.pow(a, 2)) * 10) / 10,
    visualizationType: "parabola_graph",
    taskGenerator: () => {
      const b = Math.floor(Math.random() * 4) + 2;
      const ans = Math.pow(b, 2);
      return {
        question: `(ЕНТ • Интеграл) Вычислите определенный интеграл: $$\\int_0^{${b}} 2x \\, dx$$`,
        targetSymbol: "I",
        correctAnswer: ans,
        unit: "",
        steps: [
          `**Шаг 1:** Первообразная функции $f(x) = 2x$ равна $F(x) = x^2$.`,
          `**Шаг 2:** По формуле Ньютона-Лейбница: $F(${b}) - F(0) = ${b}^2 - 0 = ${ans}$.`
        ]
      };
    }
  },

  // --- 23. СЛОЖНЫЕ ПРОЦЕНТЫ (КҮРДЕЛІ ПАЙЫЗ) ---
  {
    id: "compound_interest",
    subject: "math",
    topic: "Алгебра",
    subtopic: "Текстовые задачи ЕНТ",
    title: "Формула сложных процентов",
    latex: "S_n = S_0 \\left(1 + \\frac{p}{100}\\right)^n",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Формула роста капитала, при которой начисленные проценты в каждом периоде присоединяются к основной сумме вклада.",
    variables: [
      { symbol: "S_0", name: "Начальная сумма (тыс. ₸)", unit: "", min: 50, max: 1000, default: 200, step: 50 },
      { symbol: "p", name: "Процентная ставка", unit: "%", min: 5, max: 20, default: 10, step: 1 },
      { symbol: "n", name: "Срок (лет)", unit: "", min: 1, max: 4, default: 2, step: 1 }
    ],
    targetVariable: { symbol: "S_n", name: "Конечная сумма", unit: "тыс. ₸" },
    calculate: (S0, p, n) => Math.round(S0 * Math.pow(1 + p / 100, n) * 10) / 10,
    visualizationType: "default",
    taskGenerator: () => {
      const S0 = 100;
      const p = 10;
      const ans = 121;
      return {
        question: `(ЕНТ • Финансовая математика) В банк внесли вклад $100\\text{ тыс. ₸}$ под $10\\%$ годовых с капитализацией (сложный процент). Сколько тысяч тенге будет на счете через 2 года?`,
        targetSymbol: "S",
        correctAnswer: ans,
        unit: "тыс. ₸",
        steps: [
          `**Шаг 1:** Формула сложного процента: $S = S_0 (1 + 0.10)^2 = 100 \\cdot 1.1^2$.`,
          `**Шаг 2:** $100 \\cdot 1.21 = 121\\text{ тыс. ₸}$.`
        ]
      };
    }
  },

  // --- 24. РАССТОЯНИЕ МЕЖДУ ДВУМЯ ТОЧКАМИ (ЕКІ НҮКТЕ АРАҚАШЫҚТЫҒЫ) ---
  {
    id: "distance_between_points",
    subject: "math",
    topic: "Геометрия",
    subtopic: "Координатный метод",
    title: "Расстояние между двумя точками на плоскости",
    latex: "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Формула расстояния между точками A(x₁, y₁) и B(x₂, y₂) на декартовой координатной плоскости (следствие теоремы Пифагора).",
    variables: [
      { symbol: "x_1", name: "x₁", unit: "", min: -5, max: 5, default: 1, step: 1 },
      { symbol: "y_1", name: "y₁", unit: "", min: -5, max: 5, default: 2, step: 1 },
      { symbol: "x_2", name: "x₂", unit: "", min: -5, max: 5, default: 4, step: 1 },
      { symbol: "y_2", name: "y₂", unit: "", min: -5, max: 5, default: 6, step: 1 }
    ],
    targetVariable: { symbol: "d", name: "Расстояние", unit: "" },
    calculate: (x1, y1, x2, y2) => Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) * 100) / 100,
    visualizationType: "default",
    taskGenerator: () => {
      return {
        question: `(ЕНТ • Аналитическая геометрия) Найдите расстояние между точками $A(1, 2)$ и $B(4, 6)$ на координатной плоскости.`,
        targetSymbol: "d",
        correctAnswer: 5,
        unit: "",
        steps: [
          `**Шаг 1:** Формула расстояния: $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$.`,
          `**Шаг 2:** $d = \\sqrt{(4 - 1)^2 + (6 - 2)^2} = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.`
        ]
      };
    }
  },

  // --- 25. СИНУС СУММЫ УГЛОВ (БҰРЫШТАР ҚОСЫНДЫСЫНЫҢ СИНУСЫ) ---
  {
    id: "trig_sum_angles",
    subject: "math",
    topic: "Тригонометрия",
    subtopic: "Формулы сложения",
    title: "Синус суммы двух углов",
    latex: "\\sin(\\alpha + \\beta) = \\sin\\alpha \\cos\\beta + \\cos\\alpha \\sin\\beta",
    examTags: ["ЕНТ", "ҰБТ", "Рустюмов"],
    description: "Формула сложения тригонометрических функций для синуса суммы двух произвольных углов.",
    variables: [
      { symbol: "\\alpha", name: "Угол α", unit: "°", min: 0, max: 90, default: 30, step: 15 },
      { symbol: "\\beta", name: "Угол β", unit: "°", min: 0, max: 90, default: 45, step: 15 }
    ],
    targetVariable: { symbol: "\\sin(\\alpha+\\beta)", name: "Значение", unit: "" },
    calculate: (a, b) => Math.round(Math.sin((a + b) * Math.PI / 180) * 1000) / 1000,
    visualizationType: "trig_wave",
    taskGenerator: () => {
      return {
        question: `(ЕНТ • Тригонометрия) Вычислите точное значение: $$\\sin 15^\\circ \\cos 15^\\circ$$`,
        targetSymbol: "x",
        correctAnswer: 0.25,
        unit: "",
        steps: [
          `**Шаг 1:** Используем формулу синуса двойного угла: $\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha \\implies \\sin\\alpha\\cos\\alpha = \\frac{1}{2}\\sin 2\\alpha$.`,
          `**Шаг 2:** $\\sin 15^\\circ \\cos 15^\\circ = \\frac{1}{2} \\sin 30^\\circ = \\frac{1}{2} \\cdot \\frac{1}{2} = 0.25$.`
        ]
      };
    }
  },

  // --- 26. ЦЕНТРОСТРЕМИТЕЛЬНОЕ УСКОРЕНИЕ (ЦЕНТРГЕ ТАРТҚЫШ ҮДЕУ) ---
  {
    id: "centripetal_acceleration",
    subject: "physics",
    topic: "Механика",
    subtopic: "Кинематика",
    title: "Центростремительное (нормальное) ускорение",
    latex: "a_n = \\frac{v^2}{R} = \\omega^2 R",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Ускорение тела при равномерном движении по окружности, направленное к ее центру и характеризующее изменение направления скорости.",
    variables: [
      { symbol: "v", name: "Линейная скорость", unit: "м/с", min: 1, max: 100, default: 20, step: 1 },
      { symbol: "R", name: "Радиус окружности", unit: "м", min: 1, max: 50, default: 10, step: 1 }
    ],
    targetVariable: { symbol: "a_n", name: "Ускорение", unit: "м/с²" },
    calculate: (v, R) => Math.round((Math.pow(v, 2) / R) * 10) / 10,
    visualizationType: "motion_curve",
    taskGenerator: () => {
      const v = 20;
      const R = 10;
      const a = (v * v) / R;
      return {
        question: `(ЕНТ • Механика) Автомобиль движется по закруглению дороги радиусом $R = ${R}\\text{ м}$ со скоростью $v = ${v}\\text{ м/с}$. Найдите центростремительное ускорение автомобиля.`,
        targetSymbol: "a_n",
        correctAnswer: a,
        unit: "м/с²",
        steps: [
          `**Шаг 1:** Формула центростремительного ускорения: $a_n = \\frac{v^2}{R}$.`,
          `**Шаг 2:** $a_n = \\frac{${v}^2}{${R}} = \\frac{400}{10} = ${a}\\text{ м/с}^2$.`
        ]
      };
    }
  },

  // --- 27. УГЛОВАЯ СКОРОСТЬ И ЧАСТОТА (БҰРЫШТЫҚ ЖЫЛДАМДЫҚ) ---
  {
    id: "angular_velocity",
    subject: "physics",
    topic: "Механика",
    subtopic: "Кинематика",
    title: "Угловая скорость и частота вращения",
    latex: "\\omega = 2\\pi \\nu = \\frac{2\\pi}{T}",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Угловая скорость связывает угол поворота за единицу времени с частотой вращения ν и периодом обращения T.",
    variables: [
      { symbol: "\\nu", name: "Частота вращения", unit: "Гц", min: 1, max: 50, default: 5, step: 1 }
    ],
    targetVariable: { symbol: "\\omega", name: "Угловая скорость", unit: "рад/с" },
    calculate: (nu) => Math.round(2 * Math.PI * nu * 10) / 10,
    visualizationType: "motion_curve",
    taskGenerator: () => {
      const nu = 5;
      const omega = Math.round(2 * 3.14 * nu * 10) / 10;
      return {
        question: `(ЕНТ • Вращательное движение) Колесо совершает вращение с частотой $\\nu = ${nu}\\text{ Гц}$. Чему равна угловая скорость вращения $\\omega$ (принять $\\pi \\approx 3.14$)?`,
        targetSymbol: "\\omega",
        correctAnswer: omega,
        unit: "рад/с",
        steps: [
          `**Шаг 1:** Формула связи угловой скорости и частоты: $\\omega = 2\\pi \\nu$.`,
          `**Шаг 2:** $\\omega = 2 \\cdot 3.14 \\cdot ${nu} = ${omega}\\text{ рад/с}$.`
        ]
      };
    }
  },

  // --- 28. ВНУТРЕННЯЯ ЭНЕРГИЯ ОДНОАТОМНОГО ГАЗА (ІШКІ ЭНЕРГИЯ) ---
  {
    id: "internal_energy_gas",
    subject: "physics",
    topic: "Термодинамика",
    subtopic: "Основы МКТ и термодинамики",
    title: "Внутренняя энергия идеального одноатомного газа",
    latex: "U = \\frac{3}{2}\\nu R T = \\frac{3}{2} p V",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Внутренняя энергия идеального одноатомного газа прямо пропорциональна его абсолютной температуре и числу молей вещества.",
    variables: [
      { symbol: "\\nu", name: "Количество вещества", unit: "моль", min: 1, max: 20, default: 2, step: 1 },
      { symbol: "T", name: "Температура", unit: "К", min: 100, max: 600, default: 300, step: 10 }
    ],
    targetVariable: { symbol: "U", name: "Внутренняя энергия", unit: "Дж" },
    calculate: (nu, T) => Math.round(1.5 * nu * 8.31 * T),
    visualizationType: "thermo_cycle",
    taskGenerator: () => {
      const p = 100;
      const V = 2;
      const U = Math.round(1.5 * p * V);
      return {
        question: `(ЕНТ • Термодинамика) Идеальный одноатомный газ занимает объем $V = ${V}\\text{ м}^3$ под давлением $p = ${p}\\text{ кПа}$. Найдите внутреннюю энергию газа $U$ в кДж.`,
        targetSymbol: "U",
        correctAnswer: U,
        unit: "кДж",
        steps: [
          `**Шаг 1:** Формула внутренней энергии через давление и объем: $U = \\frac{3}{2} p V$.`,
          `**Шаг 2:** $U = 1.5 \\cdot ${p} \\cdot ${V} = ${U}\\text{ кДж}$.`
        ]
      };
    }
  },

  // --- 29. ПЕРВЫЙ ЗАКОН ТЕРМОДИНАМИКИ (ТЕРМОДИНАМИКАНЫҢ I ЗАҢЫ) ---
  {
    id: "thermodynamics_first_law",
    subject: "physics",
    topic: "Термодинамика",
    subtopic: "Первый закон термодинамики",
    title: "Первый закон термодинамики",
    latex: "Q = \\Delta U + A",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Количество теплоты, переданное системе, идет на изменение ее внутренней энергии и совершение системой работы против внешних сил.",
    variables: [
      { symbol: "\\Delta U", name: "Изменение энергии", unit: "Дж", min: 0, max: 2000, default: 600, step: 50 },
      { symbol: "A", name: "Работа газа", unit: "Дж", min: 0, max: 2000, default: 400, step: 50 }
    ],
    targetVariable: { symbol: "Q", name: "Количество теплоты", unit: "Дж" },
    calculate: (dU, A) => dU + A,
    visualizationType: "thermo_cycle",
    taskGenerator: () => {
      const dU = 500;
      const A = 300;
      const Q = dU + A;
      return {
        question: `(ЕНТ • Термодинамика) Газу передали количество теплоты. При этом внутренняя энергия газа увеличилась на $\\Delta U = ${dU}\\text{ Дж}$, а газ совершил работу $A = ${A}\\text{ Дж}$. Найдите $Q$.`,
        targetSymbol: "Q",
        correctAnswer: Q,
        unit: "Дж",
        steps: [
          `**Шаг 1:** По первому закону термодинамики: $Q = \\Delta U + A$.`,
          `**Шаг 2:** $Q = ${dU} + ${A} = ${Q}\\text{ Дж}$.`
        ]
      };
    }
  },

  // --- 30. ТЕПЛОТА ПЛАВЛЕНИЯ (БАЛҚУ ЖӘНЕ КРИСТАЛДАНУ ЖЫЛУЫ) ---
  {
    id: "phase_change_heat",
    subject: "physics",
    topic: "Термодинамика",
    subtopic: "Фазовые переходы",
    title: "Теплота плавления и кристаллизации",
    latex: "Q = \\lambda m",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Количество теплоты, необходимое для плавления кристаллического вещества при температуре плавления, пропорционально массе вещества.",
    variables: [
      { symbol: "\\lambda", name: "Уд. теплота плавления", unit: "кДж/кг", min: 10, max: 400, default: 330, step: 10 },
      { symbol: "m", name: "Масса", unit: "кг", min: 0.5, max: 20, default: 2, step: 0.5 }
    ],
    targetVariable: { symbol: "Q", name: "Теплота плавления", unit: "кДж" },
    calculate: (lam, m) => Math.round(lam * m),
    visualizationType: "default",
    taskGenerator: () => {
      const m = 3;
      const lam = 330;
      const Q = m * lam;
      return {
        question: `(ЕНТ • Тепловые явления) Какое количество теплоты в кДж потребуется для плавления льда массой $m = ${m}\\text{ кг}$ при $0^\\circ\\text{C}$ (удельная теплота плавления льда $\\lambda = 330\\text{ кДж/кг}$)?`,
        targetSymbol: "Q",
        correctAnswer: Q,
        unit: "кДж",
        steps: [
          `**Шаг 1:** Формула теплоты плавления: $Q = \\lambda m$.`,
          `**Шаг 2:** $Q = 330 \\cdot ${m} = ${Q}\\text{ кДж}$.`
        ]
      };
    }
  },

  // --- 31. МАГНИТНЫЙ ПОТОК (МАГНИТ АҒЫНЫ) ---
  {
    id: "magnetic_flux",
    subject: "physics",
    topic: "Электродинамика",
    subtopic: "Магнитное поле",
    title: "Магнитный поток (Теорема о потоке)",
    latex: "\\Phi = B S \\cos\\alpha",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Магнитный поток через плоскую поверхность контура равен произведению модуля индукции поля на площадь контура и косинус угла между нормалью и полем.",
    variables: [
      { symbol: "B", name: "Магнитная индукция", unit: "Тл", min: 0.1, max: 5, default: 0.5, step: 0.1 },
      { symbol: "S", name: "Площадь рамки", unit: "м²", min: 0.01, max: 2, default: 0.2, step: 0.01 }
    ],
    targetVariable: { symbol: "\\Phi", name: "Магнитный поток", unit: "Вб" },
    calculate: (B, S) => Math.round(B * S * 100) / 100,
    visualizationType: "default",
    taskGenerator: () => {
      const B = 2;
      const S = 0.5;
      const Phi = B * S;
      return {
        question: `(ЕНТ • Магнетизм) Рамка площадью $S = ${S}\\text{ м}^2$ расположена перпендикулярно линиям однородного магнитного поля с индукцией $B = ${B}\\text{ Тл}$ ($\\cos 0^\\circ = 1$). Найдите магнитный поток $\\Phi$.`,
        targetSymbol: "\\Phi",
        correctAnswer: Phi,
        unit: "Вб",
        steps: [
          `**Шаг 1:** Формула магнитного потока: $\\Phi = B S \\cos\\alpha$. Так как поле перпендикулярно рамке, $\\alpha = 0^\\circ$, $\\cos 0^\\circ = 1$.`,
          `**Шаг 2:** $\\Phi = ${B} \\cdot ${S} = ${Phi}\\text{ Вб}$.`
        ]
      };
    }
  },

  // --- 32. ЭНЕРГИЯ ФОТОНА (ФОТОН ЭНЕРГИЯСЫ) ---
  {
    id: "photon_energy",
    subject: "physics",
    topic: "Оптика",
    subtopic: "Квантовая физика",
    title: "Энергия фотона (Формула Планка)",
    latex: "E = h \\nu = \\frac{h c}{\\lambda}",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Энергия кванта электромагнитного излучения (фотона) прямо пропорциональна частоте света и обратно пропорциональна длине волны.",
    variables: [
      { symbol: "\\nu", name: "Частота (×10¹⁴ Гц)", unit: "×10¹⁴ Гц", min: 1, max: 20, default: 6, step: 1 }
    ],
    targetVariable: { symbol: "E", name: "Энергия (×10⁻¹⁹ Дж)", unit: "×10⁻¹⁹ Дж" },
    calculate: (nu) => Math.round(6.63 * nu * 10) / 100,
    visualizationType: "default",
    taskGenerator: () => {
      return {
        question: `(ЕНТ • Квантовая физика) Во сколько раз энергия фотона ультрафиолетового излучения больше энергии фотона инфракрасного, если частота УФ излучения в 8 раз больше?`,
        targetSymbol: "k",
        correctAnswer: 8,
        unit: "раз",
        steps: [
          `**Шаг 1:** Формула энергии фотона: $E = h\\nu$. Энергия прямо пропорциональна частоте ($E \\sim \\nu$).`,
          `**Шаг 2:** При $\\nu_2 = 8\\nu_1$, отношение энергий равно $E_2 / E_1 = 8$.`
        ]
      };
    }
  },

  // --- 33. ЗАКОН РАДИОАКТИВНОГО РАСПАДА (РАДИОАКТИВТІ ЫДЫРАУ) ---
  {
    id: "radioactive_decay",
    subject: "physics",
    topic: "Оптика",
    subtopic: "Ядерная физика",
    title: "Закон радиоактивного распада",
    latex: "N = N_0 \\cdot 2^{-\\frac{t}{T_{1/2}}}",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Закон описывает уменьшение среднего числа нераспавшихся радиоактивных ядер со временем с постоянным периодом полураспада T.",
    variables: [
      { symbol: "N_0", name: "Начальное число ядер", unit: "", min: 100, max: 10000, default: 1600, step: 100 },
      { symbol: "k", name: "Число периодов (t/T)", unit: "", min: 1, max: 6, default: 3, step: 1 }
    ],
    targetVariable: { symbol: "N", name: "Остаток ядер", unit: "" },
    calculate: (N0, k) => Math.round(N0 / Math.pow(2, k)),
    visualizationType: "default",
    taskGenerator: () => {
      const N0 = 1600;
      const k = 3;
      const N = N0 / 8;
      return {
        question: `(ЕНТ • Ядерная физика) Начальное число радиоактивных ядер $N_0 = ${N0}$. Сколько нераспавшихся ядер останется через время, равное 3 периодам полураспада ($t = 3T$)?`,
        targetSymbol: "N",
        correctAnswer: N,
        unit: "ядер",
        steps: [
          `**Шаг 1:** Закон радиоактивного распада: $N = N_0 \\cdot 2^{-t/T} = \\frac{N_0}{2^k}$.`,
          `**Шаг 2:** При $k = 3$, $N = \\frac{${N0}}{2^3} = \\frac{${N0}}{8} = ${N}$ ядер.`
        ]
      };
    }
  },

  // --- 34. ВЗАИМОСВЯЗЬ МАССЫ И ЭНЕРГИИ ЭЙНШТЕЙНА (ЭЙНШТЕЙН ФОРМУЛАСЫ) ---
  {
    id: "einstein_mass_energy",
    subject: "physics",
    topic: "Оптика",
    subtopic: "Теория относительности",
    title: "Взаимосвязь массы и энергии Эйнштейна",
    latex: "E = m c^2",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Фундаментальный закон релятивистской физики: полная энергия покоя тела пропорциональна его массе и квадрату скорости света.",
    variables: [
      { symbol: "m", name: "Масса (мг)", unit: "мг", min: 1, max: 50, default: 5, step: 1 }
    ],
    targetVariable: { symbol: "E", name: "Энергия (×10¹¹ Дж)", unit: "×10¹¹ Дж" },
    calculate: (m) => Math.round(m * 9 * 10) / 10,
    visualizationType: "default",
    taskGenerator: () => {
      return {
        question: `(ЕНТ • СТО) Чему равна энергия покоя частицы массой $m = 2\\text{ кг}$ в системе СИ (скорость света $c = 3 \\cdot 10^8\\text{ м/с}$)? В ответе укажите коэффициент при $10^{16}\\text{ Дж}$.`,
        targetSymbol: "E",
        correctAnswer: 18,
        unit: "×10¹⁶ Дж",
        steps: [
          `**Шаг 1:** Формула Эйнштейна: $E = m c^2$.`,
          `**Шаг 2:** $E = 2 \\cdot (3 \\cdot 10^8)^2 = 2 \\cdot 9 \\cdot 10^{16} = 18 \\cdot 10^{16}\\text{ Дж}$.`
        ]
      };
    }
  },

  // --- 35. СКОРОСТЬ ВОЛНЫ (ТОЛҚЫННЫҢ ТАРАЛУ ЖЫЛДАМДЫҒЫ) ---
  {
    id: "wave_speed",
    subject: "physics",
    topic: "Механика",
    subtopic: "Колебания и волны",
    title: "Скорость распространения волны",
    latex: "v = \\lambda \\nu = \\frac{\\lambda}{T}",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Скорость распространения волны равна произведению длины волны на частоту колебаний.",
    variables: [
      { symbol: "\\lambda", name: "Длина волны", unit: "м", min: 0.5, max: 20, default: 4, step: 0.5 },
      { symbol: "\\nu", name: "Частота", unit: "Гц", min: 5, max: 200, default: 50, step: 5 }
    ],
    targetVariable: { symbol: "v", name: "Скорость волны", unit: "м/с" },
    calculate: (lam, nu) => Math.round(lam * nu),
    visualizationType: "motion_curve",
    taskGenerator: () => {
      const lam = 4;
      const nu = 50;
      const v = lam * nu;
      return {
        question: `(ЕНТ • Механические волны) Волна распространяется с частотой $\\nu = ${nu}\\text{ Гц}$, длина волны составляет $\\lambda = ${lam}\\text{ м}$. Найдите скорость волны $v$.`,
        targetSymbol: "v",
        correctAnswer: v,
        unit: "м/с",
        steps: [
          `**Шаг 1:** Формула скорости распространения волны: $v = \\lambda \\nu$.`,
          `**Шаг 2:** $v = ${lam} \\cdot ${nu} = ${v}\\text{ м/с}$.`
        ]
      };
    }
  },

  // --- 36. ПЛОЩАДЬ РОМБА ЧЕРЕЗ ДИАГОНАЛИ (РОМБ АУДАНЫ) ---
  {
    id: "rhombus_area",
    subject: "math",
    topic: "Геометрия",
    subtopic: "Планиметрия (Площади)",
    title: "Площадь ромба через диагонали",
    latex: "S = \\frac{1}{2} d_1 d_2",
    examTags: ["ЕНТ", "ҰБТ", "Рустюмов"],
    description: "Площадь ромба равна половине произведения длин его диагоналей: $S = \\frac{1}{2} d_1 d_2$.",
    variables: [
      { symbol: "d_1", name: "Диагональ d₁", unit: "", min: 2, max: 30, default: 8, step: 2 },
      { symbol: "d_2", name: "Диагональ d₂", unit: "", min: 2, max: 30, default: 6, step: 2 }
    ],
    targetVariable: { symbol: "S", name: "Площадь ромба", unit: "" },
    calculate: (d1, d2) => 0.5 * d1 * d2,
    visualizationType: "default",
    taskGenerator: () => {
      const d1 = 12;
      const d2 = 10;
      const S = 0.5 * d1 * d2;
      return {
        question: `(ЕНТ • Планиметрия) Диагонали ромба равны $d_1 = ${d1}$ и $d_2 = ${d2}$. Найдите площадь этого ромба $S$.`,
        targetSymbol: "S",
        correctAnswer: S,
        unit: "",
        steps: [
          `**Шаг 1:** Площадь ромба через диагонали: $S = \\frac{1}{2} d_1 d_2$.`,
          `**Шаг 2:** $S = \\frac{1}{2} \\cdot ${d1} \\cdot ${d2} = ${S}$.`
        ]
      };
    }
  },

  // --- 37. ПЛОЩАДЬ ПАРАЛЛЕЛОГРАММА (ПАРАЛЛЕЛОГРАММ АУДАНЫ) ---
  {
    id: "parallelogram_area",
    subject: "math",
    topic: "Геометрия",
    subtopic: "Планиметрия (Площади)",
    title: "Площадь параллелограмма",
    latex: "S = a \\cdot h_a = a b \\sin\\alpha",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Площадь параллелограмма равна произведению стороны на опущенную к ней высоту, или произведению двух сторон на синус угла между ними.",
    variables: [
      { symbol: "a", name: "Основание a", unit: "", min: 2, max: 30, default: 10, step: 1 },
      { symbol: "h", name: "Высота h", unit: "", min: 1, max: 20, default: 6, step: 1 }
    ],
    targetVariable: { symbol: "S", name: "Площадь", unit: "" },
    calculate: (a, h) => a * h,
    visualizationType: "default",
    taskGenerator: () => {
      const a = 14;
      const h = 5;
      const S = a * h;
      return {
        question: `(ЕНТ • Геометрия) Сторона параллелограмма равна $a = ${a}$, а высота, проведенная к ней, равна $h = ${h}$. Найдите площадь параллелограмма $S$.`,
        targetSymbol: "S",
        correctAnswer: S,
        unit: "",
        steps: [
          `**Шаг 1:** Формула площади параллелограмма: $S = a \\cdot h$.`,
          `**Шаг 2:** $S = ${a} \\cdot ${h} = ${S}$.`
        ]
      };
    }
  },

  // --- 38. ПЛОЩАДЬ РАВНОСТОРОННЕГО ТРЕУГОЛЬНИКА (ДҰРЫС ҮШБҰРЫШ АУДАНЫ) ---
  {
    id: "equilateral_triangle_area",
    subject: "math",
    topic: "Геометрия",
    subtopic: "Планиметрия (Площади)",
    title: "Площадь и высота равностороннего треугольника",
    latex: "S = \\frac{a^2\\sqrt{3}}{4}, \\quad h = \\frac{a\\sqrt{3}}{2}",
    examTags: ["ЕНТ", "ҰБТ", "Рустюмов"],
    description: "Для правильного (равностороннего) треугольника со стороной a площадь и высота вычисляются по базовым формулам ЕНТ.",
    variables: [
      { symbol: "a", name: "Сторона a", unit: "", min: 2, max: 20, default: 6, step: 2 }
    ],
    targetVariable: { symbol: "S", name: "Площадь", unit: "" },
    calculate: (a) => Math.round((Math.pow(a, 2) * Math.sqrt(3) / 4) * 100) / 100,
    visualizationType: "pythagoras",
    taskGenerator: () => {
      const a = 4;
      const k = (a * a) / 4;
      return {
        question: `(ЕНТ • Планиметрия) Сторона правильного треугольника равна $a = ${a}$. Найдите его площадь в виде $k\\sqrt{3}$. Укажите коэффициент $k$.`,
        targetSymbol: "k",
        correctAnswer: k,
        unit: "",
        steps: [
          `**Шаг 1:** Формула площади правильного треугольника: $S = \\frac{a^2\\sqrt{3}}{4}$.`,
          `**Шаг 2:** $S = \\frac{${a}^2\\sqrt{3}}{4} = \\frac{16\\sqrt{3}}{4} = ${k}\\sqrt{3}$. Значит, $k = ${k}$.`
        ]
      };
    }
  },

  // --- 39. ОБЪЕМ ПИРАМИДЫ (ПИРАМИДА КӨЛЕМІ) ---
  {
    id: "pyramid_volume",
    subject: "math",
    topic: "Геометрия",
    subtopic: "Стереометрия",
    title: "Объем пирамиды",
    latex: "V = \\frac{1}{3} S_{\\text{осн}} H",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Объем любой пирамиды равен одной трети произведения площади ее основания на высоту.",
    variables: [
      { symbol: "S", name: "Площадь основания", unit: "", min: 3, max: 150, default: 36, step: 3 },
      { symbol: "H", name: "Высота пирамиды", unit: "", min: 1, max: 30, default: 9, step: 1 }
    ],
    targetVariable: { symbol: "V", name: "Объем пирамиды", unit: "" },
    calculate: (S, H) => Math.round((S * H / 3) * 10) / 10,
    visualizationType: "default",
    taskGenerator: () => {
      const S = 30;
      const H = 6;
      const V = (S * H) / 3;
      return {
        question: `(ЕНТ • Стереометрия) Площадь основания пирамиды равна $S_{\\text{осн}} = ${S}$, а высота пирамиды $H = ${H}$. Найдите объем пирамиды $V$.`,
        targetSymbol: "V",
        correctAnswer: V,
        unit: "",
        steps: [
          `**Шаг 1:** Формула объема пирамиды: $V = \\frac{1}{3} S_{\\text{осн}} H$.`,
          `**Шаг 2:** $V = \\frac{1}{3} \\cdot ${S} \\cdot ${H} = ${V}$.`
        ]
      };
    }
  },

  // --- 40. СКАЛЯРНОЕ ПРОИЗВЕДЕНИЕ ВЕКТОРОВ (ВЕКТОРЛАРДЫҢ СКАЛЯР КӨБЕЙТІНДІСІ) ---
  {
    id: "vector_dot_product",
    subject: "math",
    topic: "Геометрия",
    subtopic: "Векторы",
    title: "Скалярное произведение векторов на плоскости",
    latex: "\\vec{a} \\cdot \\vec{b} = x_1 x_2 + y_1 y_2 = |\\vec{a}||\\vec{b}|\\cos\\varphi",
    examTags: ["ЕНТ", "ҰБТ"],
    description: "Скалярное произведение двух векторов равно сумме произведений их соответствующих координат.",
    variables: [
      { symbol: "x_1", name: "x₁", unit: "", min: -5, max: 5, default: 3, step: 1 },
      { symbol: "y_1", name: "y₁", unit: "", min: -5, max: 5, default: 4, step: 1 },
      { symbol: "x_2", name: "x₂", unit: "", min: -5, max: 5, default: 2, step: 1 },
      { symbol: "y_2", name: "y₂", unit: "", min: -5, max: 5, default: -1, step: 1 }
    ],
    targetVariable: { symbol: "\\vec{a}\\cdot\\vec{b}", name: "Скалярное произведение", unit: "" },
    calculate: (x1, y1, x2, y2) => (x1 * x2) + (y1 * y2),
    visualizationType: "default",
    taskGenerator: () => {
      const x1 = 3, y1 = 4, x2 = 2, y2 = -1;
      const res = (x1 * x2) + (y1 * y2);
      return {
        question: `(ЕНТ • Векторы) Даны векторы $\\vec{a}(3; 4)$ и $\\vec{b}(2; -1)$. Найдите их скалярное произведение $\\vec{a} \\cdot \\vec{b}$.`,
        targetSymbol: "res",
        correctAnswer: res,
        unit: "",
        steps: [
          `**Шаг 1:** Формула скалярного произведения в координатах: $\\vec{a}\\cdot\\vec{b} = x_1 x_2 + y_1 y_2$.`,
          `**Шаг 2:** $\\vec{a}\\cdot\\vec{b} = 3 \\cdot 2 + 4 \\cdot (-1) = 6 - 4 = ${res}$.`
        ]
      };
    }
  },

  // --- 41. СУММА ЧЛЕНОВ АРИФМЕТИЧЕСКОЙ ПРОГРЕССИИ (АРИФМЕТИКАЛЫҚ ПРОГРЕССИЯ ҚОСЫНДЫСЫ) ---
  {
    id: "sum_arithmetic_progression",
    subject: "math",
    topic: "Алгебра",
    subtopic: "Числовые последовательности",
    title: "Сумма первых n членов арифметической прогрессии",
    latex: "S_n = \\frac{2a_1 + (n - 1)d}{2} \\cdot n = \\frac{a_1 + a_n}{2} \\cdot n",
    examTags: ["ЕНТ", "ҰБТ", "Рустюмов"],
    description: "Формула для нахождения суммы первых n членов арифметической прогрессии по ее первому члену a₁ и разности d.",
    variables: [
      { symbol: "a_1", name: "Первый член a₁", unit: "", min: -10, max: 50, default: 3, step: 1 },
      { symbol: "d", name: "Разность d", unit: "", min: 1, max: 10, default: 2, step: 1 },
      { symbol: "n", name: "Число членов n", unit: "", min: 2, max: 30, default: 10, step: 1 }
    ],
    targetVariable: { symbol: "S_n", name: "Сумма прогрессии", unit: "" },
    calculate: (a1, d, n) => ((2 * a1 + (n - 1) * d) / 2) * n,
    visualizationType: "default",
    taskGenerator: () => {
      const a1 = 2;
      const d = 3;
      const n = 10;
      const S = ((2 * a1 + (n - 1) * d) / 2) * n;
      return {
        question: `(ЕНТ • Прогрессии) В арифметической прогрессии $a_1 = ${a1}$, разность $d = ${d}$. Найдите сумму первых 10 членов $S_{10}$.`,
        targetSymbol: "S_10",
        correctAnswer: S,
        unit: "",
        steps: [
          `**Шаг 1:** Формула суммы: $S_n = \\frac{2a_1 + (n - 1)d}{2} \\cdot n$.`,
          `**Шаг 2:** $S_{10} = \\frac{2 \\cdot 2 + 9 \\cdot 3}{2} \\cdot 10 = \\frac{4 + 27}{2} \\cdot 10 = 31 \\cdot 5 = ${S}$.`
        ]
      };
    }
  },

  // --- 42. СУММА ЧЛЕНОВ ГЕОМЕТРИЧЕСКОЙ ПРОГРЕССИИ (ГЕОМЕТРИЯЛЫҚ ПРОГРЕССИЯ ҚОСЫНДЫСЫ) ---
  {
    id: "sum_geometric_progression",
    subject: "math",
    topic: "Алгебра",
    subtopic: "Числовые последовательности",
    title: "Сумма первых n членов геометрической прогрессии",
    latex: "S_n = \\frac{b_1 (q^n - 1)}{q - 1}",
    examTags: ["ЕНТ", "ҰБТ", "Рустюмов"],
    description: "Формула суммы конечного числа членов геометрической прогрессии со знаменателем q ≠ 1.",
    variables: [
      { symbol: "b_1", name: "Первый член b₁", unit: "", min: 1, max: 20, default: 2, step: 1 },
      { symbol: "q", name: "Знаменатель q", unit: "", min: 2, max: 5, default: 2, step: 1 },
      { symbol: "n", name: "Число членов n", unit: "", min: 2, max: 8, default: 5, step: 1 }
    ],
    targetVariable: { symbol: "S_n", name: "Сумма прогрессии", unit: "" },
    calculate: (b1, q, n) => Math.round(b1 * (Math.pow(q, n) - 1) / (q - 1)),
    visualizationType: "default",
    taskGenerator: () => {
      const b1 = 3;
      const q = 2;
      const n = 4;
      const S = b1 * (Math.pow(q, n) - 1) / (q - 1);
      return {
        question: `(ЕНТ • Прогрессии) Найдите сумму первых 4 членов геометрической прогрессии ($S_4$), если $b_1 = ${b1}$, $q = ${q}$.`,
        targetSymbol: "S_4",
        correctAnswer: S,
        unit: "",
        steps: [
          `**Шаг 1:** Формула суммы геометрической прогрессии: $S_n = \\frac{b_1(q^n - 1)}{q - 1}$.`,
          `**Шаг 2:** $S_4 = \\frac{3 \\cdot (2^4 - 1)}{2 - 1} = \\frac{3 \\cdot (16 - 1)}{1} = 3 \\cdot 15 = ${S}$.`
        ]
      };
    }
  },

  // --- 43. ПЕРЕХОД К НОВОМУ ОСНОВАНИЮ ЛОГАРИФМА (ЛОГАРИФМ НЕГІЗІН АУЫСТЫРУ) ---
  {
    id: "logarithm_base_change",
    subject: "math",
    topic: "Алгебра",
    subtopic: "Логарифмические уравнения",
    title: "Формула перехода к новому основанию логарифма",
    latex: "\\log_a b = \\frac{\\log_c b}{\\log_c a} = \\frac{1}{\\log_b a}",
    examTags: ["ЕНТ", "ҰБТ", "Рустюмов"],
    description: "Позволяет перейти от одного основания логарифма к любому другому удобному основанию c (например, к десятичному или натуральному).",
    variables: [
      { symbol: "a", name: "Основание a", unit: "", min: 2, max: 10, default: 4, step: 1 },
      { symbol: "b", name: "Аргумент b", unit: "", min: 2, max: 100, default: 16, step: 1 }
    ],
    targetVariable: { symbol: "\\log_a b", name: "Значение", unit: "" },
    calculate: (a, b) => Math.round((Math.log(b) / Math.log(a)) * 100) / 100,
    visualizationType: "default",
    taskGenerator: () => {
      return {
        question: `(ЕНТ • Логарифмы) Вычислите значение выражения: $\\log_4 16 + \\log_3 27$.`,
        targetSymbol: "x",
        correctAnswer: 5,
        unit: "",
        steps: [
          `**Шаг 1:** $\\log_4 16 = \\log_4 (4^2) = 2$.`,
          `**Шаг 2:** $\\log_3 27 = \\log_3 (3^3) = 3$.`,
          `**Шаг 3:** Итого: $2 + 3 = 5$.`
        ]
      };
    }
  },

  // --- 44. ПРОИЗВОДНАЯ СТЕПЕННОЙ ФУНКЦИИ (ДӘРЕЖЕЛІК ФУНКЦИЯ ТУЫНДЫСЫ) ---
  {
    id: "derivative_power_rule",
    subject: "math",
    topic: "Алгебра",
    subtopic: "Дифференциальное исчисление",
    title: "Производная степенной функции",
    latex: "(x^n)' = n x^{n - 1}, \\quad (c \\cdot x^n)' = c \\cdot n x^{n - 1}",
    examTags: ["ЕНТ", "ҰБТ", "Рустюмов"],
    description: "Основное правило дифференцирования степенной функции для решения задач на экстремумы, касательные и скорость изменения величин на ЕНТ.",
    variables: [
      { symbol: "c", name: "Коэффициент c", unit: "", min: 1, max: 10, default: 3, step: 1 },
      { symbol: "n", name: "Показатель степени n", unit: "", min: 1, max: 5, default: 3, step: 1 },
      { symbol: "x", name: "Точка x", unit: "", min: 1, max: 5, default: 2, step: 1 }
    ],
    targetVariable: { symbol: "f'(x)", name: "Значение производной", unit: "" },
    calculate: (c, n, x) => c * n * Math.pow(x, n - 1),
    visualizationType: "default",
    taskGenerator: () => {
      const c = 4;
      const n = 3;
      const x = 2;
      const ans = c * n * Math.pow(x, n - 1);
      return {
        question: `(ЕНТ • Производная) Дана функция $f(x) = ${c}x^{${n}}$. Найдите значение ее производной в точке $x_0 = ${x}$.`,
        targetSymbol: "f'(x_0)",
        correctAnswer: ans,
        unit: "",
        steps: [
          `**Шаг 1:** Находим формулу производной: $f'(x) = (${c}x^3)' = ${c} \\cdot 3x^2 = 12x^2$.`,
          `**Шаг 2:** Подставляем точку $x_0 = ${x}$: $f'(${x}) = 12 \\cdot (${x})^2 = 12 \\cdot 4 = ${ans}$.`
        ]
      };
    }
  },

  // --- 45. СУММА И РАЗНОСТЬ КУБОВ (КУБТАРДЫҢ ҚОСЫНДЫСЫ МЕН АЙЫРЫМЫ) ---
  {
    id: "cubes_sum_difference",
    subject: "math",
    topic: "Алгебра",
    subtopic: "Формулы сокращенного умножения",
    title: "Разность и сумма кубов (ЕНТ Рустюмов)",
    latex: "a^3 - b^3 = (a - b)(a^2 + ab + b^2), \\quad a^3 + b^3 = (a + b)(a^2 - ab + b^2)",
    examTags: ["ЕНТ", "ҰБТ", "Рустюмов"],
    description: "Формулы разложения на множители разности и суммы кубов двух выражений — один из самых частых приемов сокращения дробей на ЕНТ.",
    variables: [
      { symbol: "a", name: "Число a", unit: "", min: 1, max: 10, default: 4, step: 1 },
      { symbol: "b", name: "Число b", unit: "", min: 1, max: 10, default: 1, step: 1 }
    ],
    targetVariable: { symbol: "a^3 - b^3", name: "Значение разности кубов", unit: "" },
    calculate: (a, b) => Math.pow(a, 3) - Math.pow(b, 3),
    visualizationType: "default",
    taskGenerator: () => {
      return {
        question: `(ЕНТ • Алгебра) Сократите дробь и найдите ее значение при $x = 10$: $$\\frac{x^3 - 8}{x - 2}$$`,
        targetSymbol: "val",
        correctAnswer: 124,
        unit: "",
        steps: [
          `**Шаг 1:** Разложим числитель по формуле разности кубов: $x^3 - 2^3 = (x - 2)(x^2 + 2x + 4)$.`,
          `**Шаг 2:** Сокращаем на $(x - 2)$: получаем $x^2 + 2x + 4$.`,
          `**Шаг 3:** При $x = 10$: $10^2 + 2 \\cdot 10 + 4 = 100 + 20 + 4 = 124$.`
        ]
      };
    }
  }
];

