// FormuLab Gamification Component
// Manages XP, leveling, unlockable badges/achievements, toast notifications, and stats persistence

import { I18n } from '../i18n.js';

export const BADGES_CONFIG = [
  {
    id: 'first_step',
    icon: 'fa-solid fa-seedling',
    xp: 30,
    titleKz: 'Алғашқы қадам',
    titleRu: 'Первый шаг',
    descKz: 'Тренажерде 1-ші есепті дұрыс шығардыңыз',
    descRu: 'Решите первую задачу в тренажере',
    check: (data) => data.stats.totalCorrect >= 1,
    getProgress: (data) => ({ current: Math.min(1, data.stats.totalCorrect || 0), target: 1 })
  },
  {
    id: 'mechanics_master',
    icon: 'fa-solid fa-apple-whole',
    xp: 60,
    titleKz: 'Ньютон шәкірті',
    titleRu: 'Ученик Ньютона',
    descKz: 'Механика бөлімінен 5 есепті дұрыс шешіңіз',
    descRu: 'Решите 5 задач по разделу Механика',
    check: (data) => (data.stats.mechanicsCorrect || 0) >= 5,
    getProgress: (data) => ({ current: Math.min(5, data.stats.mechanicsCorrect || 0), target: 5 })
  },
  {
    id: 'math_pioneer',
    icon: 'fa-solid fa-shapes',
    xp: 60,
    titleKz: 'Пифагор мұрагері',
    titleRu: 'Наследник Пифагора',
    descKz: 'Математикадан (Геометрия/Алгебра) 5 есепті шешіңіз',
    descRu: 'Решите 5 задач по математике (Геометрия/Алгебра)',
    check: (data) => (data.stats.mathCorrect || 0) >= 5,
    getProgress: (data) => ({ current: Math.min(5, data.stats.mathCorrect || 0), target: 5 })
  },
  {
    id: 'tesla_spark',
    icon: 'fa-solid fa-bolt-lightning',
    xp: 50,
    titleKz: 'Тесла серіктесі',
    titleRu: 'Партнёр Теслы',
    descKz: 'Электродинамика бөлімінен 3 есепті шешіңіз',
    descRu: 'Решите 3 задачи по разделу Электродинамика',
    check: (data) => (data.stats.electrodynamicsCorrect || 0) >= 3,
    getProgress: (data) => ({ current: Math.min(3, data.stats.electrodynamicsCorrect || 0), target: 3 })
  },
  {
    id: 'streak_fire',
    icon: 'fa-solid fa-fire-flame-curved',
    xp: 75,
    titleKz: 'Отты серия',
    titleRu: 'В огне',
    descKz: 'Үздіксіз 5 дұрыс жауап беріңіз',
    descRu: 'Добейтесь серии из 5 правильных ответов подряд',
    check: (data) => (data.stats.maxStreak || 0) >= 5,
    getProgress: (data) => ({ current: Math.min(5, data.stats.maxStreak || 0), target: 5 })
  },
  {
    id: 'unstoppable',
    icon: 'fa-solid fa-shield-halved',
    xp: 150,
    titleKz: 'Жеңілмес 10',
    titleRu: 'Непобедимый',
    descKz: 'Үздіксіз 10 дұрыс жауап сериясын орнатыңыз',
    descRu: 'Добейтесь серии из 10 правильных ответов подряд',
    check: (data) => (data.stats.maxStreak || 0) >= 10,
    getProgress: (data) => ({ current: Math.min(10, data.stats.maxStreak || 0), target: 10 })
  },
  {
    id: 'quiz_starter',
    icon: 'fa-solid fa-graduation-cap',
    xp: 50,
    titleKz: 'ҰБТ Сынақшысы',
    titleRu: 'Испытатель ЕНТ',
    descKz: '1-ші ҰБТ экспресс-тестін аяқтаңыз',
    descRu: 'Завершите свой первый экспресс-тест ЕНТ',
    check: (data) => (data.stats.examsCompleted || 0) >= 1,
    getProgress: (data) => ({ current: Math.min(1, data.stats.examsCompleted || 0), target: 1 })
  },
  {
    id: 'grant_winner',
    icon: 'fa-solid fa-award',
    xp: 200,
    titleKz: 'ҰБТ Грант иегері',
    titleRu: 'Обладатель Гранта',
    descKz: 'ҰБТ тестінен 90% немесе 10/10 жоғары нәтиже алыңыз',
    descRu: 'Наберите 90% или более правильных ответов в тесте',
    check: (data) => (data.stats.bestExamAccuracy || 0) >= 90,
    getProgress: (data) => ({ current: Math.min(90, data.stats.bestExamAccuracy || 0), target: 90, unit: '%' })
  },
  {
    id: 'speedster',
    icon: 'fa-solid fa-stopwatch-20',
    xp: 100,
    titleKz: 'Молния-Шебер',
    titleRu: 'Молниеносный',
    descKz: 'Тестті 5 минуттан аз уақытта 80%+ дәлдікпен аяқтаңыз',
    descRu: 'Пройдите тест быстрее 5 минут с точностью от 80%',
    check: (data) => !!data.stats.quickExamPassed,
    getProgress: (data) => ({ current: data.stats.quickExamPassed ? 1 : 0, target: 1 })
  },
  {
    id: 'einstein_legend',
    icon: 'fa-solid fa-atom',
    xp: 300,
    titleKz: 'Эйнштейн деңгейі',
    titleRu: 'Уровень Эйнштейна',
    descKz: '500 XP жинап, 25-тен астам есепті шешіңіз',
    descRu: 'Наберите 500 XP и решите не менее 25 задач',
    check: (data) => data.xp >= 500 && (data.stats.totalCorrect || 0) >= 25,
    getProgress: (data) => ({ current: Math.min(500, data.xp || 0), target: 500, unit: 'XP' })
  }
];

export class Gamification {
  static modalEl = null;
  static toastContainerEl = null;

  static state = {
    xp: 0,
    level: 1,
    unlockedBadges: {}, // { [badgeId]: ISOString }
    stats: {
      totalSolved: 0,
      totalCorrect: 0,
      mechanicsCorrect: 0,
      mathCorrect: 0,
      electrodynamicsCorrect: 0,
      maxStreak: 0,
      examsCompleted: 0,
      bestExamAccuracy: 0,
      quickExamPassed: false
    }
  };

  static init(modalEl) {
    this.modalEl = modalEl || document.getElementById('achievements-modal');
    this.ensureToastContainer();
    this.loadState();
    this.ensureModalListeners();
    this.updateHeaderUI();
  }

  static ensureToastContainer() {
    let container = document.getElementById('achievement-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'achievement-toast-container';
      container.className = 'achievement-toast-container';
      document.body.appendChild(container);
    }
    this.toastContainerEl = container;
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

  static loadState() {
    try {
      const saved = localStorage.getItem('formulab_gamification');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = {
          xp: parsed.xp || 0,
          level: parsed.level || this.calculateLevel(parsed.xp || 0),
          unlockedBadges: parsed.unlockedBadges || {},
          stats: { ...this.state.stats, ...(parsed.stats || {}) }
        };
      } else {
        // Migrate initial stats from formulab_stats if present
        const oldStats = localStorage.getItem('formulab_stats');
        if (oldStats) {
          const parsedOld = JSON.parse(oldStats);
          this.state.stats.totalSolved = parsedOld.solvedCount || 0;
          this.state.stats.totalCorrect = parsedOld.correctCount || 0;
          this.state.stats.maxStreak = parsedOld.streak || 0;
          this.state.xp = (parsedOld.correctCount || 0) * 15;
          this.state.level = this.calculateLevel(this.state.xp);
        }
      }
    } catch (e) {
      console.warn('Failed to load gamification state:', e);
    }
  }

  static saveState() {
    try {
      localStorage.setItem('formulab_gamification', JSON.stringify(this.state));
    } catch (e) {
      console.warn('Failed to save gamification state:', e);
    }
  }

  static calculateLevel(xp) {
    // 100 XP per level: Level 1: 0-99, Level 2: 100-199, etc.
    return Math.floor(xp / 100) + 1;
  }

  static getLevelThresholds(level) {
    const currentBase = (level - 1) * 100;
    const nextBase = level * 100;
    return { currentBase, nextBase, needed: 100 };
  }

  static getRankTitle(level, lang = null) {
    const l = lang || I18n.getLanguage();
    const isKz = l === 'kz';

    if (level >= 6) return isKz ? 'Ғылым Академигі 🌟' : 'Академик-Профессор 🌟';
    if (level === 5) return isKz ? 'Ғылым Магистрі 🎓' : 'Магистр наук 🎓';
    if (level === 4) return isKz ? 'ҰБТ Сарапшысы 🏆' : 'Эксперт ЕНТ 🏆';
    if (level === 3) return isKz ? 'Тәжірибелі Шебер ⚡' : 'Опытный Мастер ⚡';
    if (level === 2) return isKz ? 'Формула іздеушісі 🔍' : 'Искатель формул 🔍';
    return isKz ? 'Бастаушы зерттеуші 🚀' : 'Начинающий исследователь 🚀';
  }

  static addXP(amount, reason = '') {
    const oldLevel = this.state.level;
    this.state.xp += amount;
    this.state.level = this.calculateLevel(this.state.xp);

    this.saveState();
    this.updateHeaderUI();

    if (this.state.level > oldLevel) {
      this.showLevelUpCelebration(this.state.level);
    }

    this.checkBadges();
  }

  static onProblemSolved({ subject, topic, isCorrect, streak }) {
    this.state.stats.totalSolved++;

    if (isCorrect) {
      this.state.stats.totalCorrect++;
      if (streak > (this.state.stats.maxStreak || 0)) {
        this.state.stats.maxStreak = streak;
      }

      if (subject === 'physics') {
        if (topic === 'Механика') this.state.stats.mechanicsCorrect = (this.state.stats.mechanicsCorrect || 0) + 1;
        if (topic === 'Электродинамика') this.state.stats.electrodynamicsCorrect = (this.state.stats.electrodynamicsCorrect || 0) + 1;
      } else if (subject === 'math') {
        this.state.stats.mathCorrect = (this.state.stats.mathCorrect || 0) + 1;
      }

      // Base XP: +15, with streak bonus
      let xpEarned = 15;
      if (streak >= 5) xpEarned += 10;
      else if (streak >= 3) xpEarned += 5;

      this.addXP(xpEarned, 'Problem Solved');
    } else {
      this.saveState();
      this.checkBadges();
    }
  }

  static onExamCompleted({ total, correct, accuracy, elapsedSeconds }) {
    this.state.stats.examsCompleted = (this.state.stats.examsCompleted || 0) + 1;

    if (accuracy > (this.state.stats.bestExamAccuracy || 0)) {
      this.state.stats.bestExamAccuracy = accuracy;
    }

    if (elapsedSeconds > 0 && elapsedSeconds < 300 && accuracy >= 80) {
      this.state.stats.quickExamPassed = true;
    }

    // Exam XP: 30 base + (correct * 10) + bonus for 100%
    let examXP = 30 + (correct * 10);
    if (accuracy === 100) examXP += 50;

    this.addXP(examXP, 'Exam Completed');
  }

  static checkBadges() {
    let unlockedAny = false;

    BADGES_CONFIG.forEach(badge => {
      if (!this.state.unlockedBadges[badge.id] && badge.check(this.state)) {
        this.state.unlockedBadges[badge.id] = new Date().toISOString();
        this.state.xp += badge.xp;
        this.state.level = this.calculateLevel(this.state.xp);
        unlockedAny = true;
        this.showBadgeToast(badge);
      }
    });

    if (unlockedAny) {
      this.saveState();
      this.updateHeaderUI();
    }
  }

  static showBadgeToast(badge) {
    this.ensureToastContainer();
    const isKz = I18n.getLanguage() === 'kz';
    const title = isKz ? badge.titleKz : badge.titleRu;
    const desc = isKz ? badge.descKz : badge.descRu;

    const toast = document.createElement('div');
    toast.className = 'achievement-toast glass-panel';
    toast.innerHTML = `
      <div class="toast-badge-icon">
        <i class="${badge.icon}"></i>
      </div>
      <div class="toast-info">
        <span class="toast-sub">${isKz ? '🎉 ЖАҢА ЖЕТІСТІК АШЫЛДЫ!' : '🎉 НОВОЕ ДОСТИЖЕНИЕ!'}</span>
        <h4 class="toast-title">${title}</h4>
        <p class="toast-desc">${desc}</p>
      </div>
      <div class="toast-xp-pill">+${badge.xp} XP</div>
    `;

    toast.onclick = () => {
      toast.remove();
      this.openModal();
    };

    this.toastContainerEl.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 400);
    }, 5500);
  }

  static showLevelUpCelebration(newLevel) {
    this.ensureToastContainer();
    const isKz = I18n.getLanguage() === 'kz';
    const rankTitle = this.getRankTitle(newLevel, isKz ? 'kz' : 'ru');

    const toast = document.createElement('div');
    toast.className = 'achievement-toast toast-levelup glass-panel';
    toast.innerHTML = `
      <div class="toast-badge-icon icon-levelup">
        <i class="fa-solid fa-angles-up"></i>
      </div>
      <div class="toast-info">
        <span class="toast-sub">${isKz ? '⭐ ДЕҢГЕЙ КӨТЕРІЛДІ!' : '⭐ ПОВЫШЕНИЕ УРОВНЯ!'}</span>
        <h4 class="toast-title">LEVEL ${newLevel} • ${rankTitle}</h4>
        <p class="toast-desc">${isKz ? 'Жарайсың! Білімің жаңа сатыға көтерілді!' : 'Отличная работа! Ваш уровень мастерства вырос!'}</p>
      </div>
    `;

    this.toastContainerEl.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 400);
    }, 5500);
  }

  static updateHeaderUI() {
    const lvlEl = document.getElementById('user-level-badge');
    const xpEl = document.getElementById('user-xp');
    const nextXpEl = document.getElementById('user-next-xp');
    const xpBarEl = document.getElementById('user-xp-bar');

    const { currentBase, nextBase, needed } = this.getLevelThresholds(this.state.level);
    const progressXP = this.state.xp - currentBase;
    const progressPct = Math.min(100, Math.max(0, Math.round((progressXP / needed) * 100)));

    if (lvlEl) lvlEl.textContent = `LVL ${this.state.level}`;
    if (xpEl) xpEl.textContent = this.state.xp;
    if (nextXpEl) nextXpEl.textContent = nextBase;
    if (xpBarEl) xpBarEl.style.width = `${progressPct}%`;
  }

  static openModal() {
    if (!this.modalEl) {
      this.modalEl = document.getElementById('achievements-modal');
    }
    this.ensureModalListeners();
    this.renderModal();
    if (this.modalEl) {
      this.modalEl.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  static hide() {
    if (this.modalEl) {
      this.modalEl.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  static renderModal() {
    if (!this.modalEl) return;
    const modalBody = this.modalEl.querySelector('.modal-body');
    if (!modalBody) return;

    const isKz = I18n.getLanguage() === 'kz';
    const rankTitle = this.getRankTitle(this.state.level, isKz ? 'kz' : 'ru');
    const { currentBase, nextBase, needed } = this.getLevelThresholds(this.state.level);
    const progressXP = this.state.xp - currentBase;
    const progressPct = Math.min(100, Math.max(0, Math.round((progressXP / needed) * 100)));

    const unlockedCount = Object.keys(this.state.unlockedBadges).length;
    const totalBadges = BADGES_CONFIG.length;

    // Badges cards HTML
    const badgesHTML = BADGES_CONFIG.map(b => {
      const isUnlocked = !!this.state.unlockedBadges[b.id];
      const unlockDate = isUnlocked ? new Date(this.state.unlockedBadges[b.id]).toLocaleDateString(isKz ? 'kk-KZ' : 'ru-RU') : null;
      const title = isKz ? b.titleKz : b.titleRu;
      const desc = isKz ? b.descKz : b.descRu;
      const progress = b.getProgress(this.state);
      const unit = progress.unit ? ` ${progress.unit}` : '';

      return `
        <div class="badge-card glass-panel ${isUnlocked ? 'badge-unlocked' : 'badge-locked'}">
          <div class="badge-card-icon-wrap">
            <div class="badge-icon-box">
              <i class="${b.icon}"></i>
            </div>
            ${isUnlocked
              ? '<span class="badge-status-icon status-check"><i class="fa-solid fa-check"></i></span>'
              : '<span class="badge-status-icon status-lock"><i class="fa-solid fa-lock"></i></span>'
            }
          </div>

          <div class="badge-card-body">
            <div class="badge-card-title-row">
              <h4 class="badge-title">${title}</h4>
              <span class="badge-xp-reward">+${b.xp} XP</span>
            </div>
            <p class="badge-desc">${desc}</p>

            ${isUnlocked ? `
              <div class="badge-unlocked-footer">
                <i class="fa-regular fa-calendar-check"></i> ${isKz ? 'Ашылған күні:' : 'Получено:'} ${unlockDate}
              </div>
            ` : `
              <div class="badge-progress-wrap">
                <div class="badge-progress-text">
                  <span>${isKz ? 'Прогресс:' : 'Прогресс:'}</span>
                  <strong>${progress.current} / ${progress.target}${unit}</strong>
                </div>
                <div class="badge-progress-track">
                  <div class="badge-progress-fill" style="width: ${Math.round((progress.current / progress.target) * 100)}%;"></div>
                </div>
              </div>
            `}
          </div>
        </div>
      `;
    }).join('');

    modalBody.innerHTML = `
      <div class="achievements-modal-content">
        <!-- Player Rank Header Profile -->
        <div class="achievements-hero-card glass-panel">
          <div class="achievements-hero-left">
            <div class="hero-level-circle">
              <span class="hero-lvl-num">${this.state.level}</span>
              <span class="hero-lvl-label">LEVEL</span>
            </div>
            <div class="hero-player-info">
              <span class="hero-rank-subtitle">${isKz ? 'Ағымдағы дәрежеңіз' : 'Ваше текущее звание'}</span>
              <h2 class="hero-rank-title">${rankTitle}</h2>
              <div class="hero-xp-track-box">
                <div class="hero-xp-track">
                  <div class="hero-xp-fill" style="width: ${progressPct}%;"></div>
                </div>
                <div class="hero-xp-numbers">
                  <span><strong>${this.state.xp}</strong> XP</span>
                  <span>${isKz ? 'Келесі деңгейге дейін:' : 'До следующего уровня:'} <strong>${nextBase - this.state.xp} XP</strong></span>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Stats Pills -->
          <div class="achievements-quick-stats">
            <div class="hero-stat-pill">
              <i class="fa-solid fa-trophy text-gold"></i>
              <div>
                <strong>${unlockedCount} / ${totalBadges}</strong>
                <span>${isKz ? 'Жетістіктер' : 'Достижения'}</span>
              </div>
            </div>
            <div class="hero-stat-pill">
              <i class="fa-solid fa-fire text-orange"></i>
              <div>
                <strong>${this.state.stats.maxStreak || 0}</strong>
                <span>${isKz ? 'Үздік серия' : 'Лучшая серия'}</span>
              </div>
            </div>
            <div class="hero-stat-pill">
              <i class="fa-solid fa-check-double text-green"></i>
              <div>
                <strong>${this.state.stats.totalCorrect || 0}</strong>
                <span>${isKz ? 'Дұрыс есеп' : 'Правильно'}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Badges Section Title -->
        <div class="achievements-grid-header">
          <h3 class="section-title">
            <i class="fa-solid fa-medal"></i> ${isKz ? 'Барлық жетістіктер мен медальдар' : 'Все достижения и медали'}
          </h3>
          <span class="badges-counter-badge">${unlockedCount} / ${totalBadges} ${isKz ? 'ашылды' : 'открыто'}</span>
        </div>

        <!-- Badges Grid -->
        <div class="badges-grid">
          ${badgesHTML}
        </div>
      </div>
    `;
  }
}
