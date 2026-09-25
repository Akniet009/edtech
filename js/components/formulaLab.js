// FormuLab Interactive Laboratory Modal Component
// Synchronizes sliders with KaTeX live math rendering & real-time visualizer charts

import { MathEngine } from '../engine/mathEngine.js';
import { Visualizer } from './visualizer.js';

export class FormulaLab {
  static currentFormula = null;
  static varValues = {};
  static modalEl = null;

  static init(modalEl, onPracticeStart) {
    this.modalEl = modalEl;
    this.onPracticeStart = onPracticeStart;

    // Close button listener
    const closeBtn = this.modalEl.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hide());
    }

    // Modal background backdrop click listener
    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) this.hide();
    });
  }

  static open(formula) {
    this.currentFormula = formula;
    this.varValues = {};

    // Initialize default values for variables
    formula.variables.forEach(v => {
      this.varValues[v.symbol] = v.default;
    });

    this.renderModalContent();
    this.modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  static hide() {
    if (this.modalEl) {
      this.modalEl.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  static renderModalContent() {
    const f = this.currentFormula;
    if (!f) return;

    const modalBody = this.modalEl.querySelector('.modal-body');

    modalBody.innerHTML = `
      <div class="lab-grid">
        <!-- Left Column: Controls & Equation -->
        <div class="lab-controls-panel">
          <div class="lab-header">
            <span class="badge ${f.subject === 'physics' ? 'badge-physics' : 'badge-math'}">
              ${f.subject === 'physics' ? 'Физика' : 'Математика'} • ${f.topic}
            </span>
            <h2 class="lab-title">${f.title}</h2>
            <p class="lab-description">${f.description}</p>
          </div>

          <!-- Dynamic KaTeX Live Display -->
          <div class="lab-math-box glass-panel">
            <div class="math-label">Формула с подставленными значениями:</div>
            <div id="lab-katex-substituted" class="katex-live-display"></div>
            <div id="lab-katex-result" class="katex-result-display"></div>
          </div>

          <!-- Sliders List -->
          <div class="sliders-container">
            <h4 class="sliders-title"><i class="fa-solid fa-sliders"></i> Переменные формулы:</h4>
            ${f.variables.map(v => this.createSliderHTML(v)).join('')}
          </div>

          <div class="lab-actions">
            <button id="btn-lab-practice" class="btn btn-primary btn-large w-full">
              <i class="fa-solid fa-graduation-cap"></i> Закрепить на практике (1 клик)
            </button>
          </div>
        </div>

        <!-- Right Column: Live Visualizer Plot/Diagram -->
        <div class="lab-visualizer-panel glass-panel">
          <div class="visualizer-header">
            <h4 class="visualizer-title"><i class="fa-solid fa-chart-line"></i> Динамический график / Схема</h4>
            <span class="visualizer-subtext">Меняется в реальном времени</span>
          </div>
          <div id="lab-visualizer-container" class="visualizer-body"></div>
        </div>
      </div>
    `;

    // Attach slider input listeners
    f.variables.forEach(v => {
      const sliderEl = modalBody.querySelector(`#slider-${v.symbol.replace(/\\/g, '')}`);
      const valDisplayEl = modalBody.querySelector(`#val-${v.symbol.replace(/\\/g, '')}`);

      if (sliderEl) {
        sliderEl.addEventListener('input', (e) => {
          const numVal = parseFloat(e.target.value);
          this.varValues[v.symbol] = numVal;
          if (valDisplayEl) valDisplayEl.textContent = `${numVal} ${v.unit}`;
          this.updateState();
        });
      }
    });

    // Attach Practice button listener
    const practiceBtn = modalBody.querySelector('#btn-lab-practice');
    if (practiceBtn) {
      practiceBtn.addEventListener('click', () => {
        this.hide();
        if (this.onPracticeStart) this.onPracticeStart(f);
      });
    }

    // Initial render call
    this.updateState();
  }

  static createSliderHTML(v) {
    const valKey = v.symbol.replace(/\\/g, '');
    return `
      <div class="slider-group">
        <div class="slider-info">
          <label class="slider-label">
            <span class="var-symbol">$${v.symbol}$</span> ${v.name}
          </label>
          <span id="val-${valKey}" class="slider-val-badge">${v.default} ${v.unit}</span>
        </div>
        <input
          type="range"
          id="slider-${valKey}"
          class="custom-slider"
          min="${v.min}"
          max="${v.max}"
          step="${v.step}"
          value="${v.default}"
        />
      </div>
    `;
  }

  static updateState() {
    const f = this.currentFormula;
    if (!f) return;

    // Render KaTeX substituted math
    const mathResult = MathEngine.renderSubstitutedLatex(f, this.varValues);

    const subEl = this.modalEl.querySelector('#lab-katex-substituted');
    const resEl = this.modalEl.querySelector('#lab-katex-result');

    if (subEl && window.katex) {
      window.katex.render(`\\displaystyle ${mathResult.latexSubstituted}`, subEl, { displayMode: true });
    }
    if (resEl && window.katex) {
      window.katex.render(`\\displaystyle ${mathResult.latexResult}`, resEl, { displayMode: true });
    }

    // Also re-render math symbols in labels if needed
    if (window.renderMathInElement) {
      window.renderMathInElement(this.modalEl, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ]
      });
    }

    // Update Plot/Visualizer
    const visContainer = this.modalEl.querySelector('#lab-visualizer-container');
    if (visContainer) {
      Visualizer.render(visContainer, f, this.varValues);
    }
  }
}
