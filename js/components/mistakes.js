// FormuLab Mistakes Bank Component («Қателермен жұмыс»)
// Automatically captures incorrect answers from Practice & Quiz, provides spaced repetition and targeted drills

import { I18n } from '../i18n.js';
import { MathEngine } from '../engine/mathEngine.js';
import { FORMULAS_DATA } from '../data/formulas.js';

export class MistakesBank {
  static modalEl = null;
  static onOpenFormula = null;
  static onPracticeFormula = null;
  static onStatsUpdate = null;

  static mistakes = []; // Array of mistake objects
  static activeFilter = 'all'; // 'all' | 'physics' | 'math'

  // Active drill state
  static drillQuestions = [];
  static drillIndex = 0;
  static isDrillActive = false;

  static init(modalEl, onOpenFormula, onPracticeFormula, onStatsUpdate) {
    this.modalEl = modalEl || document.getElementById('mistakes-modal');
    this.onOpenFormula = onOpenFormula;
    this.onPracticeFormula = onPracticeFormula;
    this.onStatsUpdate = onStatsUpdate;

    this.loadMistakes();
    this.ensureModalListeners();
    this.updateHeaderBadge();
  }

  static ensureModalListeners() {
    if (!this.modalEl) return;
    const closeBtn = this.modalEl.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.onclick = () => this.hide();
    }
    this.modalEl.onclick = (e) => {
      if (e.target === this.modalEl) this.hide();
    };
  }

  static loadMistakes() {
    try {
      const saved = localStorage.getItem('formulab_mistakes');
      this.mistakes = saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Failed to load mistakes bank:', e);
      this.mistakes = [];
    }
  }

  static saveMistakes() {
    try {
      localStorage.setItem('formulab_mistakes', JSON.stringify(this.mistakes));
      this.updateHeaderBadge();
    } catch (e) {
      console.warn('Failed to save mistakes bank:', e);
    }
  }

  static getCount() {
    return this.mistakes.filter(m => !m.mastered).length;
  }

  static updateHeaderBadge() {
    const badgeEl = document.getElementById('stat-mistakes-count');
    const itemEl = document.getElementById('btn-open-mistakes');
    const count = this.getCount();

    if (badgeEl) {
      badgeEl.textContent = count;
    }
    if (itemEl) {
      if (count > 0) {
        itemEl.classList.add('has-mistakes');
        itemEl.classList.remove('no-mistakes');
      } else {
        itemEl.classList.remove('has-mistakes');
        itemEl.classList.add('no-mistakes');
      }
    }
  }

  /**
   * Record a mistake from Practice mode
   */
  static recordPracticeMistake({ formula, task, userAnswer }) {
    if (!formula || !task) return;

    // Check if an existing mistake exists for this formula to update it
    const existingIdx = this.mistakes.findIndex(m => m.formulaId === formula.id && !m.mastered);

    const mistakeObj = {
      id: `mistake_${formula.id}_${Date.now()}`,
      formulaId: formula.id,
      formulaTitle: formula.title,
      subject: formula.subject,
      topic: formula.topic,
      latex: formula.latex,
      question: task.question,
      userAnswer: userAnswer !== undefined ? userAnswer : '—',
      correctAnswer: task.correctAnswer,
      unit: task.unit || '',
      steps: task.steps || [],
      date: new Date().toISOString(),
      attempts: 1,
      mastered: false,
      source: 'practice'
    };

    if (existingIdx >= 0) {
      this.mistakes[existingIdx].attempts = (this.mistakes[existingIdx].attempts || 1) + 1;
      this.mistakes[existingIdx].userAnswer = userAnswer;
      this.mistakes[existingIdx].question = task.question;
      this.mistakes[existingIdx].correctAnswer = task.correctAnswer;
      this.mistakes[existingIdx].date = new Date().toISOString();
    } else {
      this.mistakes.unshift(mistakeObj);
    }

    // Keep at most 50 mistakes
    if (this.mistakes.length > 50) {
      this.mistakes = this.mistakes.slice(0, 50);
    }

    this.saveMistakes();
  }

  /**
   * Record mistakes from completed Quiz
   */
  static recordExamMistakes(questions, userAnswers) {
    if (!questions || questions.length === 0) return;

    let addedCount = 0;

    questions.forEach((q, idx) => {
      const userAns = userAnswers[idx];
      const isCorrect = userAns && userAns.isCorrect;

      if (!isCorrect) {
        const mistakeObj = {
          id: `mistake_exam_${q.formulaId}_${Date.now()}_${idx}`,
          formulaId: q.formulaId,
          formulaTitle: q.formulaTitle,
          subject: q.subject,
          topic: q.topic,
          latex: q.latex,
          question: q.question,
          userAnswer: userAns ? `${userAns.value}${q.unit ? ' ' + q.unit : ''}` : 'Жауап берілмеді',
          correctAnswer: q.correctAnswer,
          unit: q.unit || '',
          steps: q.steps || [],
          date: new Date().toISOString(),
          attempts: 1,
          mastered: false,
          source: 'exam'
        };

        const existingIdx = this.mistakes.findIndex(m => m.formulaId === q.formulaId && !m.mastered);
        if (existingIdx >= 0) {
          this.mistakes[existingIdx].attempts = (this.mistakes[existingIdx].attempts || 1) + 1;
          this.mistakes[existingIdx].userAnswer = mistakeObj.userAnswer;
          this.mistakes[existingIdx].date = new Date().toISOString();
        } else {
          this.mistakes.unshift(mistakeObj);
          addedCount++;
        }
      }
    });

    if (this.mistakes.length > 50) {
      this.mistakes = this.mistakes.slice(0, 50);
    }

    this.saveMistakes();
  }

  static markAsMastered(mistakeId) {
    const item = this.mistakes.find(m => m.id === mistakeId);
    if (item) {
      item.mastered = true;
      item.masteredAt = new Date().toISOString();
      this.saveMistakes();
      this.renderModal();
    }
  }

  static removeMistake(mistakeId) {
    this.mistakes = this.mistakes.filter(m => m.id !== mistakeId);
    this.saveMistakes();
    this.renderModal();
  }

  static clearAll() {
    if (confirm(I18n.getLanguage() === 'kz' ? 'Қателер банкін толық тазалауды қалайсыз ба?' : 'Очистить весь банк ошибок?')) {
      this.mistakes = [];
      this.saveMistakes();
      this.renderModal();
    }
  }

  static open() {
    if (!this.modalEl) {
      this.modalEl = document.getElementById('mistakes-modal');
    }
    this.isDrillActive = false;
    this.ensureModalListeners();
    this.renderModal();
    if (this.modalEl) {
      this.modalEl.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  static hide() {
    this.isDrillActive = false;
    if (this.modalEl) {
      this.modalEl.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  // ==========================================
  // --- RENDER MISTAKES BANK MODAL ---
  // ==========================================
  static renderModal() {
    if (!this.modalEl) return;
    const modalBody = this.modalEl.querySelector('.modal-body');
    if (!modalBody) return;

    if (this.isDrillActive) {
      this.renderDrillScreen();
      return;
    }

    const isKz = I18n.getLanguage() === 'kz';
    const activeMistakes = this.mistakes.filter(m => !m.mastered);
    const masteredMistakes = this.mistakes.filter(m => m.mastered);
    const totalMistakes = this.mistakes.length;

    // Filter by subject
    const filtered = activeMistakes.filter(m => {
      if (this.activeFilter === 'physics') return m.subject === 'physics';
      if (this.activeFilter === 'math') return m.subject === 'math';
      return true;
    });

    const listHTML = filtered.map(m => {
      const isPhysics = m.subject === 'physics';
      const badgeClass = isPhysics ? 'badge-physics' : 'badge-math';
      const subjectName = isPhysics ? I18n.t('subjectPhysics') : I18n.t('subjectMath');
      const dateStr = new Date(m.date).toLocaleDateString(isKz ? 'kk-KZ' : 'ru-RU');
      const stepsHTML = m.steps && m.steps.length > 0
        ? m.steps.map(s => `<li class="solution-step">${s}</li>`).join('')
        : `<li>${m.correctAnswer}${m.unit ? ' ' + m.unit : ''}</li>`;

      return `
        <div class="mistake-item-card glass-panel" data-id="${m.id}">
          <div class="mistake-card-header">
            <div class="mistake-header-left">
              <span class="badge ${badgeClass}">${subjectName} • ${m.topic || ''}</span>
              <strong class="mistake-formula-title">${m.formulaTitle}</strong>
            </div>
            <div class="mistake-header-actions">
              <span class="mistake-date"><i class="fa-regular fa-clock"></i> ${dateStr}</span>
              <button type="button" class="btn-icon-tiny btn-remove-mistake" title="${isKz ? 'Тізімнен өшіру' : 'Удалить'}" data-remove-id="${m.id}">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>

          <div class="mistake-question-text">${m.question}</div>

          <div class="mistake-answers-row">
            <div class="mistake-ans-box wrong">
              <span class="ans-label">${isKz ? 'Сіздің қате жауабыңыз:' : 'Ваш неверный ответ:'}</span>
              <strong class="text-danger">${m.userAnswer}</strong>
            </div>
            <div class="mistake-ans-box correct">
              <span class="ans-label">${isKz ? 'Дұрыс эталон жауап:' : 'Правильный ответ:'}</span>
              <strong class="text-success">${m.correctAnswer}${m.unit ? ' ' + m.unit : ''}</strong>
            </div>
          </div>

          <!-- Step by Step Breakdown -->
          <details class="mistake-steps-details">
            <summary class="mistake-steps-summary">
              <i class="fa-solid fa-chevron-right"></i> ${I18n.t('solutionTitle')}
            </summary>
            <ul class="solution-steps-list">
              ${stepsHTML}
            </ul>
          </details>

          <!-- Card Actions -->
          <div class="mistake-card-actions">
            <button type="button" class="btn btn-outline btn-open-formula-card" data-formula-id="${m.formulaId}">
              <i class="fa-solid fa-sliders"></i> ${isKz ? 'Формуланы көру' : 'Открыть формулу'}
            </button>
            <button type="button" class="btn btn-primary btn-retry-single" data-mistake-id="${m.id}">
              <i class="fa-solid fa-rotate-right"></i> ${isKz ? 'Қайта шығарып көру' : 'Решить заново'}
            </button>
            <button type="button" class="btn btn-secondary btn-mark-mastered" data-master-id="${m.id}">
              <i class="fa-solid fa-check"></i> ${isKz ? 'Меңгердім ✓' : 'Усвоено ✓'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    modalBody.innerHTML = `
      <div class="mistakes-bank-content">
        <!-- Header Banner -->
        <div class="mistakes-hero-card glass-panel">
          <div class="mistakes-hero-left">
            <div class="mistakes-icon-box">
              <i class="fa-solid fa-bullseye"></i>
            </div>
            <div class="mistakes-hero-info">
              <h2 class="mistakes-hero-title">${isKz ? '«Қателермен жұмыс» банкі' : 'Банк работы над ошибками'}</h2>
              <p class="mistakes-hero-desc">
                ${isKz
                  ? 'Тест немесе есеп шығару кезінде қателескен тапсырмаларыңыз осында жиналады. Оларды қайталап, біліміңізді 100%-ға жеткізіңіз!'
                  : 'Задачи, в которых вы ошиблись при решении или тестировании, сохраняются здесь для целевого повторения.'}
              </p>
            </div>
          </div>

          <div class="mistakes-hero-stats">
            <div class="mistakes-stat-box">
              <strong class="mistakes-stat-num text-danger">${activeMistakes.length}</strong>
              <span class="mistakes-stat-lbl">${isKz ? 'Белсенді қателер' : 'Текущих ошибок'}</span>
            </div>
            <div class="mistakes-stat-box">
              <strong class="mistakes-stat-num text-success">${masteredMistakes.length}</strong>
              <span class="mistakes-stat-lbl">${isKz ? 'Түзетілді' : 'Исправлено'}</span>
            </div>
          </div>
        </div>

        <!-- Toolbar & Filter Tabs -->
        <div class="mistakes-toolbar">
          <div class="mistakes-filter-tabs">
            <button type="button" class="btn-filter-tab ${this.activeFilter === 'all' ? 'active' : ''}" data-filter="all">
              ${isKz ? 'Барлығы' : 'Все'} (${activeMistakes.length})
            </button>
            <button type="button" class="btn-filter-tab ${this.activeFilter === 'physics' ? 'active' : ''}" data-filter="physics">
              ${isKz ? 'Физика' : 'Физика'} (${activeMistakes.filter(m => m.subject === 'physics').length})
            </button>
            <button type="button" class="btn-filter-tab ${this.activeFilter === 'math' ? 'active' : ''}" data-filter="math">
              ${isKz ? 'Математика' : 'Математика'} (${activeMistakes.filter(m => m.subject === 'math').length})
            </button>
          </div>

          <div class="mistakes-toolbar-actions">
            ${activeMistakes.length > 0 ? `
              <button type="button" class="btn btn-primary btn-start-drill" id="btn-start-drill">
                <i class="fa-solid fa-play"></i> ${isKz ? 'Қателер бойынша сынақ тапсыру 🚀' : 'Тренировка по ошибкам 🚀'}
              </button>
              <button type="button" class="btn btn-outline btn-clear-mistakes" id="btn-clear-mistakes">
                <i class="fa-solid fa-broom"></i> ${isKz ? 'Тазалау' : 'Очистить'}
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Empty State vs List -->
        ${activeMistakes.length === 0 ? `
          <div class="mistakes-empty-state glass-panel">
            <div class="empty-sparkle-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
            <h3>${isKz ? 'Қателер жоқ! Керемет!' : 'Ошибок нет! Отлично!'}</h3>
            <p>${isKz
              ? 'Сіз барлық есептерді мінсіз шештіңіз немесе өткен барлық қателеріңізді түзеттіңіз. Жаңа сынақ тапсырып көріңіз!'
              : 'Все задачи решены верно или исправлены. Пройдите новый тест для проверки знаний!'}
            </p>
          </div>
        ` : `
          <div class="mistakes-cards-list">
            ${listHTML}
          </div>
        `}
      </div>
    `;

    // Render KaTeX in questions
    try {
      if (window.renderMathInElement) {
        window.renderMathInElement(modalBody, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      }
    } catch (e) {
      console.warn('KaTeX in mistakes:', e);
    }

    // Attach event listeners
    modalBody.querySelectorAll('[data-filter]').forEach(tab => {
      tab.onclick = () => {
        this.activeFilter = tab.getAttribute('data-filter');
        this.renderModal();
      };
    });

    const startDrillBtn = modalBody.querySelector('#btn-start-drill');
    if (startDrillBtn) {
      startDrillBtn.onclick = () => this.startDrill();
    }

    const clearBtn = modalBody.querySelector('#btn-clear-mistakes');
    if (clearBtn) {
      clearBtn.onclick = () => this.clearAll();
    }

    modalBody.querySelectorAll('.btn-remove-mistake').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-remove-id');
        this.removeMistake(id);
      };
    });

    modalBody.querySelectorAll('.btn-mark-mastered').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-master-id');
        this.markAsMastered(id);
      };
    });

    modalBody.querySelectorAll('.btn-open-formula-card').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const formulaId = btn.getAttribute('data-formula-id');
        const formula = FORMULAS_DATA.find(f => f.id === formulaId);
        if (formula && this.onOpenFormula) {
          this.hide();
          this.onOpenFormula(formula);
        }
      };
    });

    modalBody.querySelectorAll('.btn-retry-single').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const mistakeId = btn.getAttribute('data-mistake-id');
        const item = this.mistakes.find(m => m.id === mistakeId);
        if (item) {
          const formula = FORMULAS_DATA.find(f => f.id === item.formulaId);
          if (formula && this.onPracticeFormula) {
            this.hide();
            this.onPracticeFormula(formula);
          }
        }
      };
    });
  }

  // ==========================================
  // --- TARGETED DRILL MODE (Қателер сынағы) ---
  // ==========================================
  static startDrill() {
    const active = this.mistakes.filter(m => !m.mastered);
    if (active.length === 0) return;

    this.drillQuestions = active.map(m => {
      const options = MathEngine.generateDistractors(m.correctAnswer);
      return {
        mistakeId: m.id,
        formulaId: m.formulaId,
        formulaTitle: m.formulaTitle,
        subject: m.subject,
        question: m.question,
        correctAnswer: m.correctAnswer,
        unit: m.unit,
        steps: m.steps,
        options
      };
    });

    this.drillIndex = 0;
    this.isDrillActive = true;
    this.renderDrillScreen();
  }

  static renderDrillScreen() {
    const modalBody = this.modalEl.querySelector('.modal-body');
    if (!modalBody || this.drillQuestions.length === 0) return;

    const q = this.drillQuestions[this.drillIndex];
    const total = this.drillQuestions.length;
    const isKz = I18n.getLanguage() === 'kz';

    const optionsHTML = q.options.map(opt => `
      <button type="button" class="exam-choice-btn drill-choice-btn" data-value="${opt.value}">
        <span class="choice-label">${opt.label}</span>
        <span class="choice-value">${opt.value}${q.unit ? ' ' + q.unit : ''}</span>
      </button>
    `).join('');

    modalBody.innerHTML = `
      <div class="drill-card">
        <div class="drill-header">
          <div class="drill-header-badge">
            <i class="fa-solid fa-bullseye text-warning"></i>
            <span>${isKz ? 'Қателерді қайта тапсыру' : 'Работа над ошибками'} • <strong>${this.drillIndex + 1} / ${total}</strong></span>
          </div>
          <button type="button" class="btn btn-outline btn-exit-drill" id="btn-exit-drill">
            <i class="fa-solid fa-arrow-left"></i> ${isKz ? 'Тізімге оралу' : 'Назад к списку'}
          </button>
        </div>

        <div class="drill-question-box glass-panel">
          <span class="badge ${q.subject === 'physics' ? 'badge-physics' : 'badge-math'}">${q.formulaTitle}</span>
          <h3 class="drill-question-text" id="drill-question-text">${q.question}</h3>
        </div>

        <!-- Choices Grid -->
        <div class="exam-choices-grid">
          ${optionsHTML}
        </div>

        <!-- Feedback Result Area -->
        <div id="drill-feedback" class="feedback-area" style="display: none; margin-top: 1rem;"></div>
      </div>
    `;

    // Render KaTeX
    try {
      if (window.renderMathInElement) {
        window.renderMathInElement(modalBody, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      }
    } catch (e) {
      console.warn('KaTeX in drill:', e);
    }

    const exitBtn = modalBody.querySelector('#btn-exit-drill');
    if (exitBtn) {
      exitBtn.onclick = () => {
        this.isDrillActive = false;
        this.renderModal();
      };
    }

    // Answer choices
    modalBody.querySelectorAll('.drill-choice-btn').forEach(btn => {
      btn.onclick = () => {
        const val = Number(btn.getAttribute('data-value'));
        this.handleDrillAnswer(val, q, btn, modalBody);
      };
    });
  }

  static handleDrillAnswer(val, q, clickedBtn, modalBody) {
    const isCorrect = Math.abs(val - q.correctAnswer) < 0.01;
    const isKz = I18n.getLanguage() === 'kz';
    const feedbackEl = modalBody.querySelector('#drill-feedback');

    // Disable choices
    modalBody.querySelectorAll('.drill-choice-btn').forEach(b => {
      b.disabled = true;
      const bVal = Number(b.getAttribute('data-value'));
      if (Math.abs(bVal - q.correctAnswer) < 0.01) {
        b.classList.add('correct-choice');
      }
    });

    if (feedbackEl) feedbackEl.style.display = 'block';

    if (isCorrect) {
      clickedBtn.classList.add('correct-choice');
      this.markAsMastered(q.mistakeId);

      if (feedbackEl) {
        feedbackEl.className = 'feedback-area feedback-success';
        feedbackEl.innerHTML = `
          <div class="feedback-badge"><i class="fa-solid fa-circle-check"></i> ${isKz ? 'Дұрыс! Қате түзетілді! 🎉' : 'Правильно! Ошибка исправлена! 🎉'}</div>
          <p>${isKz ? 'Бұл есеп қателер тізімінен алынып, меңгерілгендер санатына өтті.' : 'Задача усвоена и перемещена в исправленные.'}</p>
          <div style="margin-top: 0.65rem;">
            <button type="button" class="btn btn-primary" id="btn-next-drill">
              ${this.drillIndex < this.drillQuestions.length - 1 ? (isKz ? 'Келесі есеп' : 'Следующая задача') : (isKz ? 'Аяқтау' : 'Завершить')} <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        `;
      }
    } else {
      clickedBtn.classList.add('wrong-choice');
      if (feedbackEl) {
        feedbackEl.className = 'feedback-area feedback-wrong';
        feedbackEl.innerHTML = `
          <div class="feedback-badge"><i class="fa-solid fa-circle-xmark"></i> ${isKz ? 'Тағы да қате' : 'Снова неверно'}</div>
          <p>${isKz ? `Дұрыс мән: <strong>${q.correctAnswer}${q.unit ? ' ' + q.unit : ''}</strong>` : `Правильный ответ: <strong>${q.correctAnswer}${q.unit ? ' ' + q.unit : ''}</strong>`}</p>
          <div style="margin-top: 0.65rem;">
            <button type="button" class="btn btn-secondary" id="btn-next-drill">
              ${this.drillIndex < this.drillQuestions.length - 1 ? (isKz ? 'Келесі есеп' : 'Следующая задача') : (isKz ? 'Аяқтау' : 'Завершить')} <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        `;
      }
    }

    const nextDrillBtn = modalBody.querySelector('#btn-next-drill');
    if (nextDrillBtn) {
      nextDrillBtn.onclick = () => {
        if (this.drillIndex < this.drillQuestions.length - 1) {
          this.drillIndex++;
          this.renderDrillScreen();
        } else {
          this.isDrillActive = false;
          this.renderModal();
        }
      };
    }
  }
}
