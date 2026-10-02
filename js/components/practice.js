// FormuLab Practice & Trainer Component
// Handles 1-click problem generation, answer verification, step-by-step solution breakdown, and streak updates

import { MathEngine } from '../engine/mathEngine.js';
import { I18n } from '../i18n.js';
import { Gamification } from './gamification.js';

export class Practice {
  static modalEl = null;
  static currentFormula = null;
  static currentTask = null;
  static stats = {
    solvedCount: 0,
    correctCount: 0,
    streak: 0
  };

  static init(modalEl, onStatsUpdate) {
    this.modalEl = modalEl;
    this.onStatsUpdate = onStatsUpdate;

    // Close button listener
    const closeBtn = this.modalEl.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hide());
    }

    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) this.hide();
    });

    // Load stats from localStorage
    const saved = localStorage.getItem('formulab_stats');
    if (saved) {
      try {
        this.stats = JSON.parse(saved);
        if (this.onStatsUpdate) this.onStatsUpdate(this.stats);
      } catch (e) {
        console.error(e);
      }
    }
  }

  static open(formula) {
    this.currentFormula = formula;
    this.generateNewTask();
    this.modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  static hide() {
    if (this.modalEl) {
      this.modalEl.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  static generateNewTask() {
    if (!this.currentFormula) return;
    this.currentTask = MathEngine.generateTask(this.currentFormula.id);
    this.renderTaskModal();
  }

  static renderTaskModal() {
    const task = this.currentTask;
    if (!task) return;

    const modalBody = this.modalEl.querySelector('.modal-body');
    const isKz = I18n.getLanguage() === 'kz';

    modalBody.innerHTML = `
      <div class="practice-card">
        <div class="practice-header">
          <span class="badge badge-accent">
            <i class="fa-solid fa-bolt"></i> ${I18n.t('practiceBadge')} • ${task.formulaTitle}
          </span>
          <h2 class="practice-title">${I18n.t('practiceTitle')}</h2>
        </div>

        <!-- Task Statement -->
        <div class="task-question-box glass-panel">
          <div class="task-icon"><i class="fa-solid fa-pen-ruler"></i></div>
          <div class="task-question-text" id="task-question-text">${task.question}</div>
        </div>

        <!-- Input & Submit Form -->
        <form id="practice-form" class="practice-input-group">
          <div class="input-wrapper">
            <label class="input-label">${I18n.t('yourAnswer')} (${task.targetSymbol}${task.unit ? ', ' + task.unit : ''}):</label>
            <div class="input-row">
              <input
                type="text"
                id="user-answer-input"
                class="custom-text-input"
                placeholder="${I18n.t('answerPlaceholder')}"
                autocomplete="off"
                required
              />
              <button type="submit" class="btn btn-primary btn-check">
                <i class="fa-solid fa-paper-plane"></i> ${I18n.t('checkBtn')}
              </button>
            </div>
          </div>
        </form>

        <!-- Feedback Result Area -->
        <div id="practice-feedback" class="feedback-area" style="display: none;"></div>

        <!-- Buttons Row -->
        <div class="practice-actions">
          <button id="btn-show-solution" class="btn btn-outline" style="display: inline-flex;">
            <i class="fa-solid fa-eye"></i> ${isKz ? 'Қадамдық шешу жолы' : 'Показать пошаговый разбор'}
          </button>
          <button id="btn-next-task" class="btn btn-secondary">
            <i class="fa-solid fa-arrows-rotate"></i> ${isKz ? 'Басқа есеп шығару' : 'Сгенерировать еще одну задачу'}
          </button>
        </div>

        <!-- Step-by-Step Solution Collapse -->
        <div id="solution-container" class="solution-box glass-panel" style="display: none;">
          <h4 class="solution-title"><i class="fa-solid fa-list-check"></i> ${I18n.t('solutionTitle')}:</h4>
          <div id="solution-steps-list" class="solution-steps"></div>
        </div>
      </div>
    `;

    // Render KaTeX math in task question
    if (window.renderMathInElement) {
      window.renderMathInElement(modalBody.querySelector('#task-question-text'), {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false
      });
    }

    // Attach form submit handler
    const form = modalBody.querySelector('#practice-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.checkUserAnswer();
    });

    // Attach solution toggle button
    const solutionBtn = modalBody.querySelector('#btn-show-solution');
    solutionBtn.addEventListener('click', () => {
      this.toggleSolution();
    });

    // Attach next task button
    const nextBtn = modalBody.querySelector('#btn-next-task');
    nextBtn.addEventListener('click', () => {
      this.generateNewTask();
    });

    // Focus input field automatically
    setTimeout(() => {
      const input = modalBody.querySelector('#user-answer-input');
      if (input) input.focus();
    }, 100);
  }

  static checkUserAnswer() {
    const input = this.modalEl.querySelector('#user-answer-input');
    const feedbackEl = this.modalEl.querySelector('#practice-feedback');

    if (!input || !feedbackEl) return;

    const res = MathEngine.verifyAnswer(input.value, this.currentTask.correctAnswer);
    const isKz = I18n.getLanguage() === 'kz';

    feedbackEl.style.display = 'block';

    if (res.error) {
      feedbackEl.className = 'feedback-area feedback-error';
      feedbackEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${I18n.t('invalidNumberError')}`;
      return;
    }

    if (res.isCorrect) {
      feedbackEl.className = 'feedback-area feedback-success';
      const unitStr = this.currentTask.unit ? ` ${this.currentTask.unit}` : '';
      feedbackEl.innerHTML = `
        <div class="feedback-badge"><i class="fa-solid fa-circle-check"></i> ${I18n.t('correctFeedback')}</div>
        <p>${isKz
          ? `Сіздің жауабыңыз: <strong>${res.userNum}</strong> (дұрыс мән: <strong>${res.correctAnswer}${unitStr}</strong>).`
          : `Ваш ответ <strong>${res.userNum}</strong> совпадает с эталонным <strong>${res.correctAnswer}${unitStr}</strong>.`
        }</p>
      `;

      // Update student stats
      this.stats.solvedCount++;
      this.stats.correctCount++;
      this.stats.streak++;
      this.saveStats();

      // Trigger gamification XP & badge unlocks
      if (this.currentFormula) {
        Gamification.onProblemSolved({
          formulaId: this.currentFormula.id,
          subject: this.currentFormula.subject,
          topic: this.currentFormula.topic,
          isCorrect: true,
          streak: this.stats.streak
        });
      }

    } else {
      feedbackEl.className = 'feedback-area feedback-wrong';
      const unitStr = this.currentTask.unit ? ` ${this.currentTask.unit}` : '';
      feedbackEl.innerHTML = `
        <div class="feedback-badge"><i class="fa-solid fa-circle-xmark"></i> ${isKz ? 'Қате болды' : 'Почти получилось!'}</div>
        <p>${isKz
          ? `Сіздің жауабыңыз: <strong>${res.userNum}</strong>. Дұрыс жауап: <strong>${res.correctAnswer}${unitStr}</strong>.`
          : `Ваш ответ: <strong>${res.userNum}</strong>. Правильный ответ: <strong>${res.correctAnswer}${unitStr}</strong>.`
        }</p>
        <p class="feedback-hint">${isKz
          ? 'Қатені табу үшін «Қадамдық шешу жолы» батырмасын басыңыз.'
          : 'Нажмите «Показать пошаговый разбор», чтобы найти ошибку в вычислениях.'
        }</p>
      `;

      this.stats.solvedCount++;
      this.stats.streak = 0; // reset streak
      this.saveStats();

      // Trigger gamification on wrong answer
      if (this.currentFormula) {
        Gamification.onProblemSolved({
          formulaId: this.currentFormula.id,
          subject: this.currentFormula.subject,
          topic: this.currentFormula.topic,
          isCorrect: false,
          streak: 0
        });
      }
    }
  }

  static toggleSolution() {
    const solutionBox = this.modalEl.querySelector('#solution-container');
    const stepsList = this.modalEl.querySelector('#solution-steps-list');

    if (!solutionBox || !stepsList) return;

    if (solutionBox.style.display === 'none') {
      solutionBox.style.display = 'block';

      stepsList.innerHTML = this.currentTask.steps.map(step => `
        <div class="solution-step-item">
          ${step}
        </div>
      `).join('');

      // Render KaTeX math in solution steps
      if (window.renderMathInElement) {
        window.renderMathInElement(stepsList, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      }
    } else {
      solutionBox.style.display = 'none';
    }
  }

  static saveStats() {
    localStorage.setItem('formulab_stats', JSON.stringify(this.stats));
    if (this.onStatsUpdate) this.onStatsUpdate(this.stats);
  }
}
