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
  }
];
