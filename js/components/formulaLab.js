// FormuLab Interactive Laboratory Modal Component
// Synchronizes sliders with KaTeX live math rendering & real-time visualizer charts

import { MathEngine } from '../engine/mathEngine.js';
import { Visualizer } from './visualizer.js';
import { I18n } from '../i18n.js';

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
    if (!formula) return;
    this.currentFormula = formula;
    this.varValues = {};

    // Initialize default values for variables
    if (Array.isArray(formula.variables)) {
      formula.variables.forEach(v => {
        this.varValues[v.symbol] = v.default;
      });
    }

    try {
      this.renderModalContent();
    } catch (err) {
      console.error('Error rendering modal content:', err);
    }

    if (this.modalEl) {
      this.modalEl.classList.add('active');
    }
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

    const locF = I18n.localizeFormula(f);
    const modalBody = this.modalEl.querySelector('.modal-body');
    if (!modalBody) return;

    const isPhysics = f.subject === 'physics';
    const subjectName = isPhysics ? I18n.t('subjectPhysics') : (I18n.getLanguage() === 'kz' ? 'Математика' : 'Математика');
    const subtext = I18n.getLanguage() === 'kz' ? 'Нақты уақытта жаңарады' : 'Меняется в реальном времени';

    modalBody.innerHTML = `
      <div class="lab-grid">
        <!-- Left Column: Controls & Equation -->
        <div class="lab-controls-panel">
          <div class="lab-header">
            <span class="badge ${isPhysics ? 'badge-physics' : 'badge-math'}">
              ${subjectName} • ${locF.topic || f.topic}
            </span>
            <h2 class="lab-title">${locF.title}</h2>
            <p class="lab-description">${locF.description}</p>
          </div>

          <!-- Dynamic KaTeX Live Display -->
          <div class="lab-math-box glass-panel">
            <div class="math-label">${I18n.t('substitutedLabel')}</div>
            <div id="lab-katex-substituted" class="katex-live-display"></div>
            <div id="lab-katex-result" class="katex-result-display"></div>
          </div>

          <!-- Sliders List -->
          <div class="sliders-container">
            <h4 class="sliders-title"><i class="fa-solid fa-sliders"></i> ${I18n.t('variablesTitle')}</h4>
            ${locF.variables.map((v, index) => this.createSliderHTML(v, index)).join('')}
          </div>

          <div class="lab-actions">
            <button id="btn-lab-practice" class="btn btn-primary btn-large w-full">
              <i class="fa-solid fa-graduation-cap"></i> ${I18n.t('practiceBtnLarge')}
            </button>
          </div>
        </div>

        <!-- Right Column: Live Visualizer Plot/Diagram -->
        <div class="lab-visualizer-panel glass-panel">
          <div class="visualizer-header">
            <h4 class="visualizer-title"><i class="fa-solid fa-chart-line"></i> ${I18n.t('visualizerTitle')}</h4>
            <span class="visualizer-subtext">${subtext}</span>
          </div>
          <div id="lab-visualizer-container" class="visualizer-body"></div>
        </div>
      </div>
    `;

    // Attach slider input listeners using data attributes (immune to special characters in symbols)
    f.variables.forEach((v, index) => {
      const sliderEl = modalBody.querySelector(`.custom-slider[data-var-idx="${index}"]`);
      const valDisplayEl = modalBody.querySelector(`.slider-val-badge[data-var-idx="${index}"]`);

      if (sliderEl) {
        sliderEl.addEventListener('input', (e) => {
          const numVal = parseFloat(e.target.value);
          this.varValues[v.symbol] = numVal;
          if (valDisplayEl) {
            valDisplayEl.textContent = `${numVal} ${v.unit || ''}`.trim();
          }
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

  static createSliderHTML(v, index) {
    return `
      <div class="slider-group">
        <div class="slider-info">
          <label class="slider-label">
            <span class="var-symbol">$${v.symbol}$</span> ${v.name}
          </label>
          <span class="slider-val-badge" data-var-idx="${index}">${v.default} ${v.unit || ''}</span>
        </div>
        <input
          type="range"
          class="custom-slider"
          data-var-idx="${index}"
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
    if (!f || !this.modalEl) return;

    try {
      // Render KaTeX substituted math
      const mathResult = MathEngine.renderSubstitutedLatex(f, this.varValues);

      const subEl = this.modalEl.querySelector('#lab-katex-substituted');
      const resEl = this.modalEl.querySelector('#lab-katex-result');

      if (subEl && window.katex) {
        window.katex.render(`\\displaystyle ${mathResult.latexSubstituted}`, subEl, {
          displayMode: true,
          throwOnError: false
        });
      }
      if (resEl && window.katex) {
        window.katex.render(`\\displaystyle ${mathResult.latexResult}`, resEl, {
          displayMode: true,
          throwOnError: false
        });
      }

      // Also re-render math symbols in labels if needed
      if (window.renderMathInElement) {
        window.renderMathInElement(this.modalEl, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      }
    } catch (err) {
      console.error('Error rendering math in Lab:', err);
    }

    // Update Plot/Visualizer
    try {
      const visContainer = this.modalEl.querySelector('#lab-visualizer-container');
      if (visContainer) {
        Visualizer.render(visContainer, f, this.varValues);
      }
    } catch (err) {
      console.error('Error rendering visualizer:', err);
    }
  }
}
