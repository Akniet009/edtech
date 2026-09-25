// FormuLab Dynamic Task Generator & Math Engine

import { FORMULAS_DATA } from '../data/formulas.js';

export class MathEngine {
  /**
   * Find formula by ID
   */
  static getFormula(formulaId) {
    return FORMULAS_DATA.find(f => f.id === formulaId);
  }

  /**
   * Generate a random task for a given formula ID
   */
  static generateTask(formulaId) {
    const formula = this.getFormula(formulaId);
    if (!formula) throw new Error(`Formula not found: ${formulaId}`);

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

    // Default fallback generator if formula lacks custom generator
    const varValues = {};
    formula.variables.forEach(v => {
      const range = v.max - v.min;
      const rand = Math.floor(Math.random() * (range / v.step)) * v.step + v.min;
      varValues[v.symbol] = Number(rand.toFixed(2));
    });

    const valuesArr = formula.variables.map(v => varValues[v.symbol]);
    const ans = Number(formula.calculate(...valuesArr).toFixed(2));

    return {
      formulaId: formula.id,
      formulaTitle: formula.title,
      latex: formula.latex,
      subject: formula.subject,
      question: `Рассчитайте ${formula.targetVariable.name} (${formula.targetVariable.symbol}) при следующих значениях: ` +
        formula.variables.map(v => `$${v.symbol} = ${varValues[v.symbol]}\\text{ ${v.unit}}$`).join(', '),
      targetSymbol: formula.targetVariable.symbol,
      correctAnswer: ans,
      unit: formula.targetVariable.unit,
      steps: [
        `**Шаг 1:** Запишем формулу: $$${formula.latex}$$`,
        `**Шаг 2:** Подставим числовые значения variables: ` +
          formula.variables.map(v => `${v.symbol} = ${varValues[v.symbol]}`).join(', '),
        `**Шаг 3:** Получаем результат: $$${formula.targetVariable.symbol} = ${ans}\\text{ ${formula.targetVariable.unit}}$$`
      ]
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
   * Replace slider values into LaTeX equation string dynamically
   */
  static renderSubstitutedLatex(formula, variableValues) {
    let resultLatex = formula.latex;

    // Build key-value string: e.g. "s = 10 * 5 + (2 * 5^2)/2"
    // Also build value string: e.g. "s = 75 м"
    const args = formula.variables.map(v => variableValues[v.symbol] ?? v.default);
    const calculatedValue = formula.calculate(...args);

    let evaluatedStr = formula.latex;

    // Substitute variable symbols with numerical values
    formula.variables.forEach(v => {
      const val = variableValues[v.symbol] ?? v.default;
      // Regex to replace variable symbol safely
      const regex = new RegExp(v.symbol.replace(/\\/g, '\\\\'), 'g');
      evaluatedStr = evaluatedStr.replace(regex, `\\mathbf{${val}}`);
    });

    const targetUnit = formula.targetVariable.unit ? `\\text{ ${formula.targetVariable.unit}}` : '';
    const finalCalculatedLatex = `${formula.targetVariable.symbol} = \\mathbf{${calculatedValue}}${targetUnit}`;

    return {
      latexOriginal: formula.latex,
      latexSubstituted: evaluatedStr,
      latexResult: finalCalculatedLatex,
      value: calculatedValue
    };
  }
}
