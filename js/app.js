// FormuLab Main Application Controller

import { Catalog } from './components/catalog.js';
import { FormulaLab } from './components/formulaLab.js';
import { Practice } from './components/practice.js';

document.addEventListener('DOMContentLoaded', () => {
  // UI Containers
  const catalogGridEl = document.getElementById('catalog-grid');
  const labModalEl = document.getElementById('formula-lab-modal');
  const practiceModalEl = document.getElementById('practice-modal');
  const searchInputEl = document.getElementById('search-input');

  // Stats elements
  const statSolvedEl = document.getElementById('stat-solved');
  const statAccuracyEl = document.getElementById('stat-accuracy');
  const statStreakEl = document.getElementById('stat-streak');

  // Initialize Practice component with stats callback
  Practice.init(practiceModalEl, (stats) => {
    if (statSolvedEl) statSolvedEl.textContent = stats.solvedCount;
    if (statStreakEl) statStreakEl.textContent = stats.streak;

    if (statAccuracyEl) {
      const accuracy = stats.solvedCount > 0
        ? Math.round((stats.correctCount / stats.solvedCount) * 100)
        : 100;
      statAccuracyEl.textContent = `${accuracy}%`;
    }
  });

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

  // Subject Navigation Tabs (Все, Физика, Математика)
  const subjectTabs = document.querySelectorAll('.subject-tab');
  subjectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      subjectTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const subject = tab.getAttribute('data-subject');
      Catalog.setSubject(subject);
    });
  });

  // Topic filter pills
  const topicPills = document.querySelectorAll('.topic-pill');
  topicPills.forEach(pill => {
    pill.addEventListener('click', () => {
      topicPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
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

  console.log("FormuLab MVP initialized successfully!");
});
