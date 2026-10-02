// FormuLab Main Application Controller

import { Catalog } from './components/catalog.js';
import { FormulaLab } from './components/formulaLab.js';
import { Practice } from './components/practice.js';
import { Quiz } from './components/quiz.js';
import { Gamification } from './components/gamification.js';
import { MistakesBank } from './components/mistakes.js';
import { CheatSheet, Certificate } from './components/exportPdf.js';
import { I18n } from './i18n.js';

// Expose globals immediately for onclick attributes and console access
window.Quiz = Quiz;
window.Practice = Practice;
window.FormulaLab = FormulaLab;
window.Gamification = Gamification;
window.MistakesBank = MistakesBank;
window.CheatSheet = CheatSheet;
window.Certificate = Certificate;
window.startUNTExam = (subject = 'all', count = 10, duration = 10) => {
  Quiz.ensureModal();
  Quiz.startQuickExam(subject, count, duration);
};
window.openUNTExamSetup = () => {
  Quiz.ensureModal();
  Quiz.openSetup();
};
window.openAchievements = () => {
  Gamification.openModal();
};
window.openMistakesBank = () => {
  MistakesBank.open();
};
window.openCheatSheet = (subject = 'all') => {
  CheatSheet.open(subject);
};
window.openCertificate = (data) => {
  Certificate.open(data);
};

const initApp = () => {
  // UI Containers
  const catalogGridEl = document.getElementById('catalog-grid');
  const labModalEl = document.getElementById('formula-lab-modal');
  const practiceModalEl = document.getElementById('practice-modal');
  const examModalEl = document.getElementById('exam-modal');
  const searchInputEl = document.getElementById('search-input');

  // Stats elements
  const statSolvedEl = document.getElementById('stat-solved');
  const statAccuracyEl = document.getElementById('stat-accuracy');
  const statStreakEl = document.getElementById('stat-streak');

  const updateStatsUI = (stats) => {
    if (statSolvedEl) statSolvedEl.textContent = stats.solvedCount;
    if (statStreakEl) statStreakEl.textContent = stats.streak;

    if (statAccuracyEl) {
      const accuracy = stats.solvedCount > 0
        ? Math.round((stats.correctCount / stats.solvedCount) * 100)
        : 100;
      statAccuracyEl.textContent = `${accuracy}%`;
    }
  };

  // Initialize UI language
  I18n.updateDOM();

  // Language Switcher Buttons (KZ / RU)
  const btnKz = document.getElementById('lang-btn-kz');
  const btnRu = document.getElementById('lang-btn-ru');

  if (btnKz) {
    btnKz.addEventListener('click', () => I18n.setLanguage('kz'));
  }
  if (btnRu) {
    btnRu.addEventListener('click', () => I18n.setLanguage('ru'));
  }

  // Reactive Language Change Listener
  window.addEventListener('formulab_lang_change', () => {
    I18n.updateDOM();
    Catalog.syncFilterUI();
    Catalog.render();

    // Re-render open modals with updated language
    if (FormulaLab.currentFormula && labModalEl && labModalEl.classList.contains('active')) {
      FormulaLab.renderModalContent();
    }
    if (Practice.currentFormula && practiceModalEl && practiceModalEl.classList.contains('active')) {
      Practice.generateNewTask();
    }
    Gamification.updateHeaderUI();
    if (Gamification.modalEl && Gamification.modalEl.classList.contains('active')) {
      Gamification.renderModal();
    }
    MistakesBank.updateHeaderBadge();
    if (MistakesBank.modalEl && MistakesBank.modalEl.classList.contains('active')) {
      MistakesBank.renderModal();
    }
    if (CheatSheet.modalEl && CheatSheet.modalEl.classList.contains('active')) {
      CheatSheet.render();
    }
    if (Certificate.modalEl && Certificate.modalEl.classList.contains('active')) {
      Certificate.render();
    }
  });

  // Initialize CheatSheet & Certificate components
  const cheatSheetModalEl = document.getElementById('cheat-sheet-modal');
  CheatSheet.init(cheatSheetModalEl);

  const certModalEl = document.getElementById('certificate-modal');
  Certificate.init(certModalEl);

  const btnOpenCheatSheet = document.getElementById('btn-open-cheat-sheet');
  if (btnOpenCheatSheet) {
    btnOpenCheatSheet.addEventListener('click', (e) => {
      e.preventDefault();
      CheatSheet.open('all');
    });
  }

  const btnHeroCheatSheet = document.getElementById('btn-hero-cheat-sheet');
  if (btnHeroCheatSheet) {
    btnHeroCheatSheet.addEventListener('click', (e) => {
      e.preventDefault();
      CheatSheet.open('all');
    });
  }

  // Initialize Gamification component
  const achievementsModalEl = document.getElementById('achievements-modal');
  Gamification.init(achievementsModalEl);

  const btnOpenAchievements = document.getElementById('btn-open-achievements');
  if (btnOpenAchievements) {
    btnOpenAchievements.addEventListener('click', (e) => {
      e.preventDefault();
      Gamification.openModal();
    });
  }

  // Initialize Mistakes Bank component
  const mistakesModalEl = document.getElementById('mistakes-modal');
  MistakesBank.init(
    mistakesModalEl,
    (formula) => FormulaLab.open(formula),
    (formula) => Practice.open(formula),
    updateStatsUI
  );

  const btnOpenMistakes = document.getElementById('btn-open-mistakes');
  if (btnOpenMistakes) {
    btnOpenMistakes.addEventListener('click', (e) => {
      e.preventDefault();
      MistakesBank.open();
    });
  }

  // Initialize Practice component with stats callback
  Practice.init(practiceModalEl, updateStatsUI);

  // Initialize Quiz / Exam Mode component
  Quiz.init(
    examModalEl,
    updateStatsUI,
    (formula) => FormulaLab.open(formula)
  );

  // Exam Buttons (Header and Hero Banner)
  const btnOpenExam = document.getElementById('btn-open-exam');
  const btnHeroExam = document.getElementById('btn-hero-exam');
  const btnExamSettings = document.getElementById('btn-exam-settings');

  if (btnHeroExam) {
    btnHeroExam.addEventListener('click', (e) => {
      e.preventDefault();
      Quiz.startQuickExam();
    });
  }
  if (btnOpenExam) {
    btnOpenExam.addEventListener('click', (e) => {
      e.preventDefault();
      Quiz.openSetup();
    });
  }
  if (btnExamSettings) {
    btnExamSettings.addEventListener('click', (e) => {
      e.preventDefault();
      Quiz.openSetup();
    });
  }

  // Initialize FormulaLab component
  FormulaLab.init(labModalEl, (formula) => {
    Practice.open(formula);
  });

  // Initialize Catalog component
  Catalog.init(
    catalogGridEl,
    (formula) => FormulaLab.open(formula),
    (formula) => Practice.open(formula)
  );

  // Search input listener with debouncing
  let searchTimeout = null;
  if (searchInputEl) {
    searchInputEl.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        Catalog.setSearchQuery(e.target.value);
      }, 150);
    });
  }

  // Subject Navigation Tabs (Барлық пәндер / Физика / Математика)
  const subjectTabs = document.querySelectorAll('.subject-tab');
  subjectTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const subject = tab.getAttribute('data-subject');
      Catalog.setSubject(subject);
    });
  });

  // Topic filter pills
  const topicPills = document.querySelectorAll('.topic-pill');
  topicPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const topic = pill.getAttribute('data-topic');
      Catalog.setTopic(topic);
    });
  });

  // Theme toggle button
  const themeToggleBtn = document.getElementById('btn-theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      themeToggleBtn.innerHTML = isLight
        ? '<i class="fa-solid fa-moon"></i>'
        : '<i class="fa-solid fa-sun"></i>';
      localStorage.setItem('formulab_theme', isLight ? 'light' : 'dark');
    });

    // Load theme preference
    const savedTheme = localStorage.getItem('formulab_theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  }

  console.log("FormuLab initialized with bilingual KZ / RU support!");
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

