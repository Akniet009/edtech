// FormuLab UNT / ENT Express Exam & Quiz Component
// Manages timed mock exams, multi-choice question flows, score calculations, and mistake reviews

import { MathEngine } from '../engine/mathEngine.js';
import { I18n } from '../i18n.js';
import { FORMULAS_DATA } from '../data/formulas.js';
import { Gamification } from './gamification.js';

export class Quiz {
  static modalEl = null;
  static onStatsUpdate = null;
  static onOpenFormula = null;

  // Active exam state
  static questions = [];
  static currentIndex = 0;
  static userAnswers = {}; // { [index]: { value: number, optionLabel: string, isCorrect: boolean } }
  static timerInterval = null;
  static timeRemaining = 0; // seconds
  static totalDuration = 0; // seconds
  static startTime = null;
  static examOptions = {
    subject: 'all',
    count: 10,
    durationMinutes: 10
  };

  static _listenersAttached = false;

  static ensureModal() {
    if (!this.modalEl) {
      this.modalEl = document.getElementById('exam-modal');
    }
    if (this.modalEl && !this._listenersAttached) {
      this._listenersAttached = true;
      const closeBtn = this.modalEl.querySelector('.modal-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.handleModalClose());
      }
      this.modalEl.addEventListener('click', (e) => {
        if (e.target === this.modalEl) this.handleModalClose();
      });
    }
    return this.modalEl;
  }

  static init(modalEl, onStatsUpdate, onOpenFormula) {
    this.modalEl = modalEl || document.getElementById('exam-modal');
    this.onStatsUpdate = onStatsUpdate;
    this.onOpenFormula = onOpenFormula;
    this.ensureModal();
  }

  static handleModalClose() {
    if (this.timerInterval && Object.keys(this.userAnswers).length > 0 && !this.isCompleted) {
      if (confirm(I18n.t('examConfirmFinish'))) {
        this.finishExam();
      }
    } else {
      this.hide();
    }
  }

  static openSetup() {
    this.ensureModal();
    this.stopTimer();
    this.questions = [];
    this.userAnswers = {};
    this.isCompleted = false;

    this.renderSetupModal();
    if (this.modalEl) this.modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  static startQuickExam(subject = 'all', count = 10, durationMinutes = 10) {
    this.ensureModal();
    this.examOptions = { subject, count, durationMinutes };
    this.startExam();
  }

  static hide() {
    this.stopTimer();
    if (this.modalEl) {
      this.modalEl.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  static stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  // ==========================================
  // --- 1. SETUP MODAL ---
  // ==========================================
  static renderSetupModal() {
    const modalBody = this.modalEl.querySelector('.modal-body');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div class="exam-setup-card">
        <div class="exam-setup-header">
          <div class="exam-badge-icon"><i class="fa-solid fa-graduation-cap"></i></div>
          <h2 class="exam-setup-title">${I18n.t('examSetupTitle')}</h2>
          <p class="exam-setup-subtitle">${I18n.t('examSetupSubtitle')}</p>
        </div>

        <form id="exam-setup-form" class="exam-setup-form">
          <!-- 1. Subject Selection -->
          <div class="setup-group">
            <label class="setup-label">
              <i class="fa-solid fa-book-bookmark"></i> ${I18n.t('examSubjectLabel')}
            </label>
            <div class="setup-options-grid setup-subjects-grid">
              <button type="button" class="btn-setup-opt ${this.examOptions.subject === 'all' ? 'active' : ''}" data-subject="all">
                <i class="fa-solid fa-layer-group"></i>
                <span>${I18n.t('examSubjectAll')}</span>
              </button>
              <button type="button" class="btn-setup-opt ${this.examOptions.subject === 'physics' ? 'active' : ''}" data-subject="physics">
                <i class="fa-solid fa-bolt"></i>
                <span>${I18n.t('examSubjectPhysics')}</span>
              </button>
              <button type="button" class="btn-setup-opt ${this.examOptions.subject === 'math' ? 'active' : ''}" data-subject="math">
                <i class="fa-solid fa-calculator"></i>
                <span>${I18n.t('examSubjectMath')}</span>
              </button>
            </div>
          </div>

          <!-- 2. Question Count -->
          <div class="setup-group">
            <label class="setup-label">
              <i class="fa-solid fa-list-ol"></i> ${I18n.t('examCountLabel')}
            </label>
            <div class="setup-options-row">
              <button type="button" class="btn-setup-opt ${this.examOptions.count === 5 ? 'active' : ''}" data-count="5">
                ${I18n.t('examCount5')}
              </button>
              <button type="button" class="btn-setup-opt ${this.examOptions.count === 10 ? 'active' : ''}" data-count="10">
                ${I18n.t('examCount10')}
              </button>
              <button type="button" class="btn-setup-opt ${this.examOptions.count === 15 ? 'active' : ''}" data-count="15">
                ${I18n.t('examCount15')}
              </button>
              <button type="button" class="btn-setup-opt ${this.examOptions.count === 20 ? 'active' : ''}" data-count="20">
                ${I18n.t('examCount20')}
              </button>
            </div>
          </div>

          <!-- 3. Time Limit -->
          <div class="setup-group">
            <label class="setup-label">
              <i class="fa-solid fa-stopwatch"></i> ${I18n.t('examTimeLabel')}
            </label>
            <div class="setup-options-row">
              <button type="button" class="btn-setup-opt ${this.examOptions.durationMinutes === 5 ? 'active' : ''}" data-time="5">
                ${I18n.t('examTime5')}
              </button>
              <button type="button" class="btn-setup-opt ${this.examOptions.durationMinutes === 10 ? 'active' : ''}" data-time="10">
                ${I18n.t('examTime10')}
              </button>
              <button type="button" class="btn-setup-opt ${this.examOptions.durationMinutes === 15 ? 'active' : ''}" data-time="15">
                ${I18n.t('examTime15')}
              </button>
              <button type="button" class="btn-setup-opt ${this.examOptions.durationMinutes === 0 ? 'active' : ''}" data-time="0">
                ${I18n.t('examTimeNoLimit')}
              </button>
            </div>
          </div>

          <!-- Start Button -->
          <div class="setup-footer">
            <button type="submit" class="btn btn-primary btn-launch-exam">
              <i class="fa-solid fa-rocket"></i> ${I18n.t('examStartModalBtn')}
            </button>
          </div>
        </form>
      </div>
    `;

    // Attach setup events
    modalBody.querySelectorAll('[data-subject]').forEach(btn => {
      btn.addEventListener('click', () => {
        modalBody.querySelectorAll('[data-subject]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.examOptions.subject = btn.getAttribute('data-subject');
      });
    });

    modalBody.querySelectorAll('[data-count]').forEach(btn => {
      btn.addEventListener('click', () => {
        modalBody.querySelectorAll('[data-count]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.examOptions.count = parseInt(btn.getAttribute('data-count'), 10);
      });
    });

    modalBody.querySelectorAll('[data-time]').forEach(btn => {
      btn.addEventListener('click', () => {
        modalBody.querySelectorAll('[data-time]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.examOptions.durationMinutes = parseInt(btn.getAttribute('data-time'), 10);
      });
    });

    const launchBtn = modalBody.querySelector('.btn-launch-exam');
    if (launchBtn) {
      launchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.startExam();
      });
    }

    const form = modalBody.querySelector('#exam-setup-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.startExam();
      });
    }
  }

  // ==========================================
  // --- 2. START EXAM ---
  // ==========================================
  static startExam() {
    this.ensureModal();
    this.stopTimer();

    try {
      this.questions = MathEngine.generateExamQuestions(
        this.examOptions.subject || 'all',
        this.examOptions.count || 10,
        I18n.getLanguage()
      );
    } catch (err) {
      console.error('Failed to generate exam questions:', err);
      this.questions = MathEngine.generateExamQuestions('all', 5, 'kz');
    }

    if (!this.questions || this.questions.length === 0) {
      console.error('No questions available');
      return;
    }

    this.currentIndex = 0;
    this.userAnswers = {};
    this.isCompleted = false;
    this.startTime = Date.now();

    // Timer setup
    const duration = this.examOptions.durationMinutes !== undefined ? this.examOptions.durationMinutes : 10;
    if (duration > 0) {
      this.totalDuration = duration * 60;
      this.timeRemaining = this.totalDuration;
      this.startCountdown();
    } else {
      this.totalDuration = 0;
      this.timeRemaining = 0;
    }

    if (this.modalEl) this.modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';

    this.renderQuestionScreen();
  }

  static startCountdown() {
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      this.updateTimerDisplay();

      if (this.timeRemaining <= 0) {
        this.stopTimer();
        alert(I18n.getLanguage() === 'kz' ? 'Уақыт аяқталды!' : 'Время вышло!');
        this.finishExam(true);
      }
    }, 1000);
  }

  static updateTimerDisplay() {
    const timerEl = this.modalEl.querySelector('#exam-countdown-timer');
    if (!timerEl) return;

    const mins = Math.floor(this.timeRemaining / 60);
    const secs = this.timeRemaining % 60;
    const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    timerEl.textContent = timeStr;

    if (this.timeRemaining <= 60) {
      timerEl.parentElement.classList.add('timer-warning');
    } else {
      timerEl.parentElement.classList.remove('timer-warning');
    }
  }

  // ==========================================
  // --- 3. QUESTION SCREEN ---
  // ==========================================
  static renderQuestionScreen() {
    this.ensureModal();
    const modalBody = this.modalEl ? this.modalEl.querySelector('.modal-body') : null;
    if (!modalBody || this.questions.length === 0) return;

    const q = this.questions[this.currentIndex];
    const total = this.questions.length;
    const progressPercent = Math.round(((this.currentIndex + 1) / total) * 100);
    const currentAnswer = this.userAnswers[this.currentIndex];

    const isPhysics = q.subject === 'physics';
    const subjectBadgeClass = isPhysics ? 'badge-physics' : 'badge-math';
    const subjectName = isPhysics ? I18n.t('subjectPhysics') : I18n.t('subjectMath');

    // Navigation pills for all questions
    const questionPillsHTML = this.questions.map((item, idx) => {
      const isAnswered = this.userAnswers[idx] !== undefined;
      const isCurrent = idx === this.currentIndex;
      let classes = 'exam-nav-pill';
      if (isCurrent) classes += ' current';
      if (isAnswered) classes += ' answered';

      return `<button type="button" class="${classes}" data-go-idx="${idx}">${idx + 1}</button>`;
    }).join('');

    // Timer display string
    const mins = Math.floor(this.timeRemaining / 60);
    const secs = this.timeRemaining % 60;
    const timeStr = this.totalDuration > 0
      ? `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
      : '∞';

    // Multiple-choice options
    const optionsHTML = q.options.map(opt => {
      const isSelected = currentAnswer && currentAnswer.optionLabel === opt.label;
      return `
        <button type="button" class="exam-choice-btn ${isSelected ? 'selected' : ''}" data-label="${opt.label}" data-value="${opt.value}">
          <span class="choice-label">${opt.label}</span>
          <span class="choice-value">${opt.value}${q.unit ? ' ' + q.unit : ''}</span>
        </button>
      `;
    }).join('');

    modalBody.innerHTML = `
      <div class="exam-active-card">
        <!-- Top Exam Header Bar -->
        <div class="exam-top-bar">
          <div class="exam-progress-info">
            <span class="exam-q-counter">
              ${I18n.t('examQuestionCount')} <strong>${this.currentIndex + 1}</strong> / ${total}
            </span>
            <div class="exam-progress-track">
              <div class="exam-progress-fill" style="width: ${progressPercent}%;"></div>
            </div>
          </div>

          <div class="exam-meta-actions">
            ${this.totalDuration > 0 ? `
              <div class="exam-timer-pill ${this.timeRemaining <= 60 ? 'timer-warning' : ''}">
                <i class="fa-regular fa-clock"></i>
                <span id="exam-countdown-timer">${timeStr}</span>
              </div>
            ` : ''}

            <button type="button" id="btn-exam-finish" class="btn btn-outline btn-finish-early">
              <i class="fa-solid fa-flag-checkered"></i> ${I18n.t('examFinishBtn')}
            </button>
          </div>
        </div>

        <!-- Question Pills Row -->
        <div class="exam-nav-pills-row">
          ${questionPillsHTML}
        </div>

        <!-- Question Card Box -->
        <div class="exam-question-box glass-panel">
          <div class="exam-question-header">
            <span class="badge ${subjectBadgeClass}">${subjectName} • ${q.topic}</span>
            <span class="badge-exam-ref"><i class="fa-solid fa-square-root-variable"></i> ${q.formulaTitle}</span>
          </div>

          <div class="exam-question-text" id="exam-question-text">
            ${q.question}
          </div>
        </div>

        <!-- Answer Options (4 Multiple-Choice Choices) -->
        <div class="exam-choices-grid">
          ${optionsHTML}
        </div>

        <!-- Alternative Manual Input Fallback -->
        <div class="exam-manual-input-box">
          <span class="manual-input-prompt">${I18n.t('examOrInput')}</span>
          <div class="manual-input-row">
            <input
              type="text"
              id="exam-custom-input"
              class="custom-text-input"
              placeholder="${currentAnswer ? currentAnswer.value : I18n.t('answerPlaceholder')}"
              value="${currentAnswer ? currentAnswer.value : ''}"
            />
            <button type="button" id="btn-save-custom-answer" class="btn btn-outline">
              <i class="fa-solid fa-check"></i> ${I18n.t('examSubmitAnswer')}
            </button>
          </div>
        </div>

        <!-- Navigation Footer -->
        <div class="exam-navigation-footer">
          <button type="button" id="btn-exam-prev" class="btn btn-outline" ${this.currentIndex === 0 ? 'disabled' : ''}>
            <i class="fa-solid fa-arrow-left"></i> ${I18n.t('examPrevQuestion')}
          </button>

          <div class="exam-footer-center">
            <span class="answered-status">
              ${currentAnswer ? `<i class="fa-solid fa-circle-check text-success"></i> ${I18n.t('examYourAnswer')} <strong>${currentAnswer.value}${q.unit ? ' ' + q.unit : ''}</strong>` : `<i class="fa-regular fa-circle"></i> ${I18n.t('examNotAnswered')}`}
            </span>
          </div>

          ${this.currentIndex < total - 1 ? `
            <button type="button" id="btn-exam-next" class="btn btn-primary">
              ${I18n.t('examNextQuestion')} <i class="fa-solid fa-arrow-right"></i>
            </button>
          ` : `
            <button type="button" id="btn-exam-submit-final" class="btn btn-primary btn-submit-final">
              <i class="fa-solid fa-check-double"></i> ${I18n.t('examFinishBtn')}
            </button>
          `}
        </div>
      </div>
    `;

    // Render KaTeX in statement safely
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
    } catch (katexErr) {
      console.warn('KaTeX rendering skipped in quiz:', katexErr);
    }

    // Attach click events
    modalBody.querySelectorAll('[data-go-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-go-idx'), 10);
        this.currentIndex = idx;
        this.renderQuestionScreen();
      });
    });

    modalBody.querySelectorAll('.exam-choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const label = btn.getAttribute('data-label');
        const value = Number(btn.getAttribute('data-value'));
        this.recordAnswer(label, value);
        this.renderQuestionScreen();
      });
    });

    const customInput = modalBody.querySelector('#exam-custom-input');
    const saveCustomBtn = modalBody.querySelector('#btn-save-custom-answer');
    if (customInput && saveCustomBtn) {
      const handleCustom = () => {
        const val = customInput.value.trim().replace(',', '.');
        const num = parseFloat(val);
        if (!isNaN(num)) {
          this.recordAnswer('Manual', num);
          this.renderQuestionScreen();
        }
      };
      saveCustomBtn.addEventListener('click', handleCustom);
      customInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleCustom();
        }
      });
    }

    const prevBtn = modalBody.querySelector('#btn-exam-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentIndex > 0) {
          this.currentIndex--;
          this.renderQuestionScreen();
        }
      });
    }

    const nextBtn = modalBody.querySelector('#btn-exam-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentIndex < total - 1) {
          this.currentIndex++;
          this.renderQuestionScreen();
        }
      });
    }

    const finishBtn = modalBody.querySelector('#btn-exam-finish');
    if (finishBtn) {
      finishBtn.addEventListener('click', () => {
        if (confirm(I18n.t('examConfirmFinish'))) {
          this.finishExam();
        }
      });
    }

    const submitFinalBtn = modalBody.querySelector('#btn-exam-submit-final');
    if (submitFinalBtn) {
      submitFinalBtn.addEventListener('click', () => {
        this.finishExam();
      });
    }
  }

  static recordAnswer(optionLabel, value) {
    const q = this.questions[this.currentIndex];
    const isCorrect = Math.abs(Number(value) - Number(q.correctAnswer)) < 0.01;
    this.userAnswers[this.currentIndex] = {
      optionLabel,
      value,
      isCorrect
    };
  }

  // ==========================================
  // --- 4. FINISH EXAM & SCORECARD ---
  // ==========================================
  static finishExam(isTimeUp = false) {
    this.stopTimer();
    this.isCompleted = true;
    const endTime = Date.now();
    const elapsedSeconds = this.startTime ? Math.round((endTime - this.startTime) / 1000) : 0;

    const total = this.questions.length;
    let correctCount = 0;

    this.questions.forEach((q, idx) => {
      const userAns = this.userAnswers[idx];
      if (userAns && userAns.isCorrect) {
        correctCount++;
      }
    });

    const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    // Update global app stats
    this.updateGlobalStats(total, correctCount);

    // Trigger gamification XP & achievements
    Gamification.onExamCompleted({
      total,
      correct: correctCount,
      accuracy,
      elapsedSeconds
    });

    this.renderScorecard(total, correctCount, accuracy, elapsedSeconds, isTimeUp);
  }

  static updateGlobalStats(total, correct) {
    try {
      const saved = localStorage.getItem('formulab_stats');
      const stats = saved ? JSON.parse(saved) : { solvedCount: 0, correctCount: 0, streak: 0 };

      stats.solvedCount += total;
      stats.correctCount += correct;

      if (correct / total >= 0.7) {
        stats.streak = (stats.streak || 0) + 1;
      } else {
        stats.streak = 0;
      }

      localStorage.setItem('formulab_stats', JSON.stringify(stats));

      if (this.onStatsUpdate) {
        this.onStatsUpdate(stats);
      }
    } catch (e) {
      console.error('Failed to update stats in Quiz:', e);
    }
  }

  static renderScorecard(total, correct, accuracy, elapsedSeconds, isTimeUp) {
    const modalBody = this.modalEl.querySelector('.modal-body');
    if (!modalBody) return;

    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;
    const timeFormatted = `${mins} мин ${secs} сек`;

    let feedbackMsg = I18n.t('examScorePractice');
    let feedbackClass = 'score-practice';
    if (accuracy >= 80) {
      feedbackMsg = I18n.t('examScoreExcellent');
      feedbackClass = 'score-excellent';
    } else if (accuracy >= 50) {
      feedbackMsg = I18n.t('examScoreGood');
      feedbackClass = 'score-good';
    }

    // Question reviews list
    const reviewsHTML = this.questions.map((q, idx) => {
      const userAns = this.userAnswers[idx];
      const isCorrect = userAns && userAns.isCorrect;
      const statusIcon = isCorrect
        ? '<i class="fa-solid fa-check text-success"></i>'
        : (userAns ? '<i class="fa-solid fa-xmark text-danger"></i>' : '<i class="fa-solid fa-minus text-muted"></i>');
      const cardClass = isCorrect ? 'review-correct' : (userAns ? 'review-incorrect' : 'review-unanswered');

      const userDisplay = userAns ? `${userAns.value}${q.unit ? ' ' + q.unit : ''}` : I18n.t('examNotAnswered');
      const correctDisplay = `${q.correctAnswer}${q.unit ? ' ' + q.unit : ''}`;

      const stepsHTML = q.steps.map(s => `<li class="solution-step">${s}</li>`).join('');

      return `
        <div class="review-item glass-panel ${cardClass}">
          <div class="review-item-header">
            <div class="review-status-title">
              <span class="review-icon">${statusIcon}</span>
              <span class="review-num">${I18n.t('examQuestionCount')} ${idx + 1}:</span>
              <strong>${q.formulaTitle}</strong>
            </div>
            <button type="button" class="btn btn-outline btn-open-formula-ref" data-formula-id="${q.formulaId}">
              <i class="fa-solid fa-sliders"></i> ${I18n.t('examViewFormula')}
            </button>
          </div>

          <div class="review-question-text">${q.question}</div>

          <div class="review-answers-row">
            <div class="review-ans-col">
              <span class="ans-label">${I18n.t('examYourAnswer')}</span>
              <strong class="${isCorrect ? 'text-success' : 'text-danger'}">${userDisplay}</strong>
            </div>
            <div class="review-ans-col">
              <span class="ans-label">${I18n.t('examCorrectAnswer')}</span>
              <strong class="text-success">${correctDisplay}</strong>
            </div>
          </div>

          <details class="review-steps-details">
            <summary class="review-steps-summary">
              <i class="fa-solid fa-chevron-right"></i> ${I18n.t('solutionTitle')}
            </summary>
            <ul class="solution-steps-list">
              ${stepsHTML}
            </ul>
          </details>
        </div>
      `;
    }).join('');

    modalBody.innerHTML = `
      <div class="exam-scorecard-card">
        <!-- Scorecard Header -->
        <div class="scorecard-header">
          <div class="score-circle ${feedbackClass}">
            <span class="score-big">${correct}</span>
            <span class="score-total">/ ${total}</span>
          </div>

          <h2 class="scorecard-title">${I18n.t('examScoreTitle')}</h2>
          <p class="scorecard-feedback">${feedbackMsg}</p>
        </div>

        <!-- Metrics Row -->
        <div class="scorecard-metrics-grid">
          <div class="metric-item glass-panel">
            <span class="metric-label"><i class="fa-solid fa-bullseye"></i> ${I18n.t('examAccuracy')}</span>
            <strong class="metric-value">${accuracy}%</strong>
          </div>
          <div class="metric-item glass-panel">
            <span class="metric-label"><i class="fa-regular fa-clock"></i> ${I18n.t('examTimeSpent')}</span>
            <strong class="metric-value">${timeFormatted}</strong>
          </div>
          <div class="metric-item glass-panel">
            <span class="metric-label"><i class="fa-solid fa-check-double"></i> ${I18n.t('examCorrect')}</span>
            <strong class="metric-value">${correct} / ${total}</strong>
          </div>
        </div>

        <!-- Actions -->
        <div class="scorecard-actions">
          <button type="button" id="btn-retake-exam" class="btn btn-primary">
            <i class="fa-solid fa-rotate-right"></i> ${I18n.t('examRetakeBtn')}
          </button>
          <button type="button" id="btn-close-scorecard" class="btn btn-outline">
            <i class="fa-solid fa-arrow-left"></i> ${I18n.t('examOpenCatalogBtn')}
          </button>
        </div>

        <!-- Mistakes Review Breakdown -->
        <div class="scorecard-review-section">
          <h3 class="review-section-title">
            <i class="fa-solid fa-clipboard-check"></i> ${I18n.t('examReviewTitle')}
          </h3>
          <div class="reviews-list">
            ${reviewsHTML}
          </div>
        </div>
      </div>
    `;

    // Render KaTeX in review items safely
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
    } catch (katexErr) {
      console.warn('KaTeX rendering skipped in review:', katexErr);
    }

    // Attach actions
    const retakeBtn = modalBody.querySelector('#btn-retake-exam');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => this.openSetup());
    }

    const closeScorecardBtn = modalBody.querySelector('#btn-close-scorecard');
    if (closeScorecardBtn) {
      closeScorecardBtn.addEventListener('click', () => this.hide());
    }

    modalBody.querySelectorAll('.btn-open-formula-ref').forEach(btn => {
      btn.addEventListener('click', () => {
        const formulaId = btn.getAttribute('data-formula-id');
        const f = FORMULAS_DATA.find(item => item.id === formulaId);
        if (f && this.onOpenFormula) {
          this.hide();
          this.onOpenFormula(f);
        }
      });
    });
  }
}
