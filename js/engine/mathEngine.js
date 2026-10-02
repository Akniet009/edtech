// FormuLab Dynamic Task Generator & Math Engine

import { FORMULAS_DATA } from '../data/formulas.js';
import { I18n } from '../i18n.js';

export class MathEngine {
  /**
   * Find formula by ID
   */
  static getFormula(formulaId) {
    return FORMULAS_DATA.find(f => f.id === formulaId);
  }

  /**
   * Generate a random task for a given formula ID with language localization
   */
  static generateTask(formulaId, lang = null) {
    const currentLang = lang || I18n.getLanguage();
    const rawFormula = this.getFormula(formulaId);
    if (!rawFormula) throw new Error(`Formula not found: ${formulaId}`);

    const formula = I18n.localizeFormula(rawFormula, currentLang);

    // 1. If Kazakh language requested and specific KZ task generator exists
    if (currentLang === 'kz') {
      const kzGen = I18n.getKazakhTaskGenerator(formulaId);
      if (typeof kzGen === 'function') {
        const task = kzGen();
        return {
          formulaId: formula.id,
          formulaTitle: formula.title,
          latex: formula.latex,
          subject: formula.subject,
          ...task
        };
      }
    }

    // 2. Default custom task generator (Russian)
    if (typeof formula.taskGenerator === 'function') {
      const task = formula.taskGenerator();
      return {
        formulaId: formula.id,
        formulaTitle: formula.title,
        latex: formula.latex,
        subject: formula.subject,
        ...task
      };
    }

    // 3. Fallback generator with language support
    const varValues = {};
    formula.variables.forEach(v => {
      const range = v.max - v.min;
      const rand = Math.floor(Math.random() * (range / v.step)) * v.step + v.min;
      varValues[v.symbol] = Number(rand.toFixed(2));
    });

    const valuesArr = formula.variables.map(v => varValues[v.symbol]);
    const ans = Number(formula.calculate(...valuesArr).toFixed(2));

    const isKz = currentLang === 'kz';

    const question = isKz
      ? `${formula.targetVariable.name} ($${formula.targetVariable.symbol}$) мәнін табыңыз, егер: ` +
        formula.variables.map(v => `$${v.symbol} = ${varValues[v.symbol]}\\text{ ${v.unit || ''}}$`).join(', ')
      : `Рассчитайте ${formula.targetVariable.name} (${formula.targetVariable.symbol}) при следующих значениях: ` +
        formula.variables.map(v => `$${v.symbol} = ${varValues[v.symbol]}\\text{ ${v.unit || ''}}$`).join(', ');

    const steps = isKz
      ? [
          `**1-қадам:** Формуланы қолданамыз: $$${formula.latex}$$`,
          `**2-қадам:** Сандық мәндерін қоямыз: ` +
            formula.variables.map(v => `${v.symbol} = ${varValues[v.symbol]}`).join(', '),
          `**3-қадам:** Нәтижесі: $$${formula.targetVariable.symbol} = ${ans}\\text{ ${formula.targetVariable.unit || ''}}$$`
        ]
      : [
          `**Шаг 1:** Запишем формулу: $$${formula.latex}$$`,
          `**Шаг 2:** Подставим числовые значения: ` +
            formula.variables.map(v => `${v.symbol} = ${varValues[v.symbol]}`).join(', '),
          `**Шаг 3:** Получаем результат: $$${formula.targetVariable.symbol} = ${ans}\\text{ ${formula.targetVariable.unit || ''}}$$`
        ];

    return {
      formulaId: formula.id,
      formulaTitle: formula.title,
      latex: formula.latex,
      subject: formula.subject,
      question,
      targetSymbol: formula.targetVariable.symbol,
      correctAnswer: ans,
      unit: formula.targetVariable.unit || '',
      steps
    };
  }

  /**
   * Check student answer with adaptive tolerance
   */
  static verifyAnswer(userAnswer, correctAnswer, tolerance = 0.05) {
    const userNum = parseFloat(String(userAnswer).trim().replace(',', '.'));
    if (isNaN(userNum)) {
      return { isCorrect: false, error: 'Пожалуйста, введите корректное число' };
    }

    const diff = Math.abs(userNum - correctAnswer);
    const relDiff = Math.abs(correctAnswer) > 0 ? diff / Math.abs(correctAnswer) : diff;

    const isCorrect = diff <= tolerance || relDiff <= tolerance;

    return {
      isCorrect,
      userNum,
      correctAnswer,
      diff
    };
  }

  /**
   * Format physical or mathematical units safely for KaTeX rendering
   */
  static formatLatexUnit(unit) {
    if (!unit) return '';
    const trimmed = String(unit).trim();
    if (!trimmed) return '';

    // Handle known special units
    if (trimmed === 'кг·м/с') return '\\text{кг}\\cdot\\text{м/с}';
    if (trimmed === 'м/с²') return '\\text{м/с}^2';
    if (trimmed === 'см²') return '\\text{см}^2';
    if (trimmed === 'см³') return '\\text{см}^3';
    if (trimmed === 'м³') return '\\text{м}^3';
    if (trimmed === 'Дж/(кг·°C)') return '\\text{Дж}/(\\text{кг}\\cdot^\\circ\\text{C})';
    if (trimmed === '°C') return '^\\circ\\text{C}';
    if (trimmed === '°') return '^\\circ';
    if (trimmed === '%') return '\\%';

    // Generic safe sanitization
    const sanitized = trimmed
      .replace(/%/g, '\\%')
      .replace(/·/g, '\\cdot ')
      .replace(/²/g, '^2')
      .replace(/³/g, '^3')
      .replace(/°C/g, '^\\circ\\text{C}')
      .replace(/°/g, '^\\circ');

    return `\\text{ ${sanitized}}`;
  }

  /**
   * Replace slider values into LaTeX equation string dynamically and safely
   */
  static renderSubstitutedLatex(formula, variableValues = {}) {
    try {
      const args = formula.variables.map(v => variableValues[v.symbol] ?? v.default);
      const calculatedValue = formula.calculate(...args);

      let substitutedStr = '';

      // 1. If formula defines its own custom substituted formatter, use it
      if (typeof formula.renderSubstituted === 'function') {
        substitutedStr = formula.renderSubstituted(variableValues);
      } else {
        // 2. Safe token-based replacement without corrupting LaTeX commands or \mathbf
        let res = formula.latex;

        // Sort variables by symbol length descending to replace longer identifiers first (e.g. m_1 before m)
        const sortedVars = [...formula.variables].sort((a, b) => b.symbol.length - a.symbol.length);

        const tokens = [];
        sortedVars.forEach((v, idx) => {
          const rawVal = variableValues[v.symbol] ?? v.default;
          const token = `@@FML_VAR_${idx}@@`;
          // If value is negative, format nicely with parentheses if part of an expression
          const valStr = `\\mathbf{${rawVal}}`;
          tokens.push({ token, valStr });

          const escaped = v.symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

          if (v.symbol.startsWith('\\')) {
            // LaTeX command symbol like \alpha, \nu, \Delta t
            res = res.replace(new RegExp(escaped + '(?![a-zA-Z])', 'g'), token);
          } else {
            // Normal symbol like m, a, v_0 - ensure we do not match inside LaTeX commands like \frac or words
            res = res.replace(
              new RegExp('(?<!\\\\[a-zA-Z]*)(?<![a-zA-Z0-9_])' + escaped + '(?![a-zA-Z0-9_])', 'g'),
              token
            );
          }
        });

        // Replace all unique tokens with bold values
        tokens.forEach(({ token, valStr }) => {
          res = res.replaceAll(token, valStr);
        });

        substitutedStr = res;
      }

      const unitFormatted = this.formatLatexUnit(formula.targetVariable?.unit);
      const unitPart = unitFormatted ? `\\,${unitFormatted}` : '';
      const finalCalculatedLatex = `${formula.targetVariable.symbol} = \\mathbf{${calculatedValue}}${unitPart}`;

      return {
        latexOriginal: formula.latex,
        latexSubstituted: substitutedStr,
        latexResult: finalCalculatedLatex,
        value: calculatedValue
      };
    } catch (err) {
      console.error('renderSubstitutedLatex error:', err);
      return {
        latexOriginal: formula?.latex || '',
        latexSubstituted: formula?.latex || '',
        latexResult: `${formula?.targetVariable?.symbol || 'Result'} = \\mathbf{0}`,
        value: 0
      };
    }
  }

  /**
   * Generate multiple-choice distractors for a numeric answer
   */
  static generateDistractors(correctAnswer) {
    const ans = Number(correctAnswer);
    const distractors = new Set();
    const candidates = [
      Number((ans * 2).toFixed(2)),
      Number((ans / 2).toFixed(2)),
      Number((ans + 5).toFixed(2)),
      Number((ans - 5 > 0 ? ans - 5 : ans + 7).toFixed(2)),
      Number((ans * 1.5).toFixed(2)),
      Number((ans * 0.75).toFixed(2)),
      Number((ans + 10).toFixed(2)),
      Number((ans + 1).toFixed(2)),
      Number((ans - 1 > 0 ? ans - 1 : ans + 3).toFixed(2)),
      Number((ans * 3).toFixed(2))
    ];

    for (const c of candidates) {
      if (c !== ans && !isNaN(c) && isFinite(c)) {
        distractors.add(c);
        if (distractors.size === 3) break;
      }
    }

    let step = 1;
    while (distractors.size < 3) {
      distractors.add(Number((ans + step).toFixed(2)));
      step++;
    }

    const allValues = [ans, ...Array.from(distractors).slice(0, 3)];
    // Fisher-Yates shuffle
    for (let i = allValues.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allValues[i], allValues[j]] = [allValues[j], allValues[i]];
    }

    const labels = ['A', 'B', 'C', 'D'];
    return allValues.map((val, idx) => ({
      label: labels[idx],
      value: val,
      isCorrect: Math.abs(val - ans) < 0.001
    }));
  }

  /**
   * Generate a full batch of questions for the UNT/ENT Exam mode
   */
  static generateExamQuestions(subject = 'all', count = 10, lang = null) {
    const currentLang = lang || I18n.getLanguage();

    let pool = FORMULAS_DATA;
    if (subject === 'physics') {
      pool = FORMULAS_DATA.filter(f => f.subject === 'physics');
    } else if (subject === 'math') {
      pool = FORMULAS_DATA.filter(f => f.subject === 'math');
    }

    // Shuffle pool
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const selectedFormulas = shuffled.slice(0, Math.min(count, shuffled.length));

    return selectedFormulas.map((f, index) => {
      const task = this.generateTask(f.id, currentLang);
      const options = this.generateDistractors(task.correctAnswer);
      const locF = I18n.localizeFormula(f, currentLang);

      return {
        index: index + 1,
        formulaId: f.id,
        formulaTitle: locF.title,
        latex: f.latex,
        subject: f.subject,
        topic: locF.topic || f.topic,
        question: task.question,
        targetSymbol: task.targetSymbol,
        correctAnswer: task.correctAnswer,
        unit: task.unit || '',
        steps: task.steps || [],
        options
      };
    });
  }
}

