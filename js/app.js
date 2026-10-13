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

  // Enhanced Search Box: Debouncing, Clear Button, Shortcuts (Ctrl+K, /), and Meta Reset
  let searchTimeout = null;
  const searchClearBtn = document.getElementById('search-clear-btn');
  const searchShortcutBadge = document.getElementById('search-shortcut-badge');
  const btnQuickReset = document.getElementById('btn-quick-reset-filters');

  if (searchShortcutBadge) {
    const isMac = typeof navigator !== 'undefined' && navigator.platform && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    searchShortcutBadge.innerHTML = isMac ? '<kbd>⌘</kbd> <kbd>K</kbd>' : '<kbd>Ctrl</kbd> <kbd>K</kbd>';
    searchShortcutBadge.addEventListener('click', () => {
      if (searchInputEl) {
        searchInputEl.focus();
        searchInputEl.select();
      }
    });
  }

  if (searchInputEl) {
    searchInputEl.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const val = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.style.display = val.trim().length > 0 ? 'flex' : 'none';
      }
      searchTimeout = setTimeout(() => {
        Catalog.setSearchQuery(val);
      }, 120);
    });

    if (searchClearBtn) {
      searchClearBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchInputEl.value = '';
        searchClearBtn.style.display = 'none';
        Catalog.setSearchQuery('');
        searchInputEl.focus();
      });
    }

    if (btnQuickReset) {
      btnQuickReset.addEventListener('click', (e) => {
        e.preventDefault();
        Catalog.resetFilters();
      });
    }

    // Global keyboard shortcuts: Ctrl+K, Cmd+K, "/" and Escape
    window.addEventListener('keydown', (e) => {
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal) return;

      const isModifierK = (e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K');
      const isSlash = e.key === '/' && document.activeElement !== searchInputEl &&
        document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA';

      if (isModifierK || isSlash) {
        e.preventDefault();
        searchInputEl.focus();
        searchInputEl.select();
      } else if (e.key === 'Escape' && document.activeElement === searchInputEl) {
        if (searchInputEl.value) {
          searchInputEl.value = '';
          if (searchClearBtn) searchClearBtn.style.display = 'none';
          Catalog.setSearchQuery('');
        } else {
          searchInputEl.blur();
        }
      }
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

  // Unified Header Dropdown Menu Controller
  const btnMenuToggle = document.getElementById('btn-menu-toggle');
  const dropdownMenu = document.getElementById('header-dropdown-menu');

  if (btnMenuToggle && dropdownMenu) {
    const toggleMenu = (forceState) => {
      const isCurrentlyActive = dropdownMenu.classList.contains('active');
      const nextState = forceState !== undefined ? forceState : !isCurrentlyActive;

      dropdownMenu.classList.toggle('active', nextState);
      btnMenuToggle.classList.toggle('active', nextState);
      btnMenuToggle.setAttribute('aria-expanded', nextState ? 'true' : 'false');
      dropdownMenu.setAttribute('aria-hidden', nextState ? 'false' : 'true');
    };

    btnMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close when clicking anywhere outside
    document.addEventListener('click', (e) => {
      if (!dropdownMenu.contains(e.target) && !btnMenuToggle.contains(e.target)) {
        toggleMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dropdownMenu.classList.contains('active')) {
        toggleMenu(false);
      }
    });

    // Close menu when triggering modals from menu
    const modalTriggerIds = [
      'btn-open-exam',
      'btn-open-cheat-sheet',
      'btn-open-achievements',
      'btn-open-mistakes'
    ];
    modalTriggerIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', () => {
          toggleMenu(false);
        });
      }
    });
  }

  console.log("FormuLab initialized with bilingual KZ / RU support and unified clean header menu!");
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

