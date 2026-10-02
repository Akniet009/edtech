// FormuLab Catalog Component
// Handles catalog rendering, real-time search, subject & topic filters, exam tag badges

import { FORMULAS_DATA } from '../data/formulas.js';
import { I18n } from '../i18n.js';

export class Catalog {
  static currentSubject = 'all'; // 'all' | 'physics' | 'math'
  static searchQuery = '';
  static activeTopic = 'all';

  static init(containerEl, onFormulaClick, onPracticeClick) {
    this.containerEl = containerEl;
    this.onFormulaClick = onFormulaClick;
    this.onPracticeClick = onPracticeClick;
    this.syncFilterUI();
    this.render();
  }

  static setSubject(subject) {
    this.currentSubject = subject;
    this.activeTopic = 'all';
    this.syncFilterUI();
    this.render();
  }

  static setSearchQuery(query) {
    this.searchQuery = query.toLowerCase().trim();
    this.render();
  }

  static setTopic(topic) {
    this.activeTopic = topic;

    // Automatic subject alignment if user clicks a topic belonging to a specific subject
    if (topic !== 'all') {
      const mathTopics = ['Алгебра', 'Геометрия', 'Тригонометрия'];
      const physicsTopics = ['Механика', 'Термодинамика', 'Электродинамика', 'Оптика'];

      if (mathTopics.includes(topic) && this.currentSubject === 'physics') {
        this.currentSubject = 'math';
      } else if (physicsTopics.includes(topic) && this.currentSubject === 'math') {
        this.currentSubject = 'physics';
      }
    }

    this.syncFilterUI();
    this.render();
  }

  static resetFilters() {
    this.currentSubject = 'all';
    this.activeTopic = 'all';
    this.searchQuery = '';
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    this.syncFilterUI();
    this.render();
  }

  static syncFilterUI() {
    // 1. Sync Subject Tabs (.subject-tab)
    document.querySelectorAll('.subject-tab').forEach(tab => {
      const sub = tab.getAttribute('data-subject');
      tab.classList.toggle('active', sub === this.currentSubject);
    });

    // 2. Sync Topic Pills (.topic-pill)
    const allCount = this.currentSubject === 'physics' ? '17' : (this.currentSubject === 'math' ? '23' : '40');
    const allPillCount = document.querySelector('.topic-pill[data-topic="all"] .pill-count');
    if (allPillCount) {
      allPillCount.textContent = allCount;
    }

    document.querySelectorAll('.topic-pill').forEach(pill => {
      const pillTopic = pill.getAttribute('data-topic');
      const pillSub = pill.getAttribute('data-subject');

      // Visibility based on selected subject
      if (pillTopic === 'all' || this.currentSubject === 'all') {
        pill.classList.remove('hidden');
      } else if (pillSub && pillSub !== this.currentSubject) {
        pill.classList.add('hidden');
      } else {
        pill.classList.remove('hidden');
      }

      // Active state
      pill.classList.toggle('active', pillTopic === this.activeTopic);
    });
  }

  static getFilteredFormulas() {
    return FORMULAS_DATA.filter(f => {
      // Subject match
      if (this.currentSubject !== 'all' && f.subject !== this.currentSubject) {
        return false;
      }
      // Topic match
      if (this.activeTopic !== 'all' && f.topic !== this.activeTopic) {
        return false;
      }
      // Search match across both languages (KZ & RU)
      if (this.searchQuery) {
        const q = this.searchQuery;
        const locF = I18n.localizeFormula(f);

        const matchesTitle = f.title.toLowerCase().includes(q) || (locF.title && locF.title.toLowerCase().includes(q));
        const matchesTopic = f.topic.toLowerCase().includes(q) || (locF.topic && locF.topic.toLowerCase().includes(q));
        const matchesSubtopic = f.subtopic.toLowerCase().includes(q) || (locF.subtopic && locF.subtopic.toLowerCase().includes(q));
        const matchesLatex = f.latex.toLowerCase().includes(q);
        const matchesDesc = f.description.toLowerCase().includes(q) || (locF.description && locF.description.toLowerCase().includes(q));

        return matchesTitle || matchesTopic || matchesSubtopic || matchesLatex || matchesDesc;
      }
      return true;
    });
  }

  static render() {
    if (!this.containerEl) return;

    const filtered = this.getFilteredFormulas();

    if (filtered.length === 0) {
      this.containerEl.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-square-root-variable empty-icon"></i>
          <h3>${I18n.t('emptyTitle')}</h3>
          <p>${I18n.t('emptyDesc')}</p>
          <button class="btn-reset-filters" id="btn-reset-filters">
            <i class="fa-solid fa-rotate-left"></i> ${I18n.t('resetFilters')}
          </button>
        </div>
      `;

      const resetBtn = this.containerEl.querySelector('#btn-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.resetFilters();
        });
      }
      return;
    }

    this.containerEl.innerHTML = filtered.map(f => this.createCardHTML(f)).join('');

    // Trigger KaTeX rendering on new elements
    if (window.renderMathInElement) {
      window.renderMathInElement(this.containerEl, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false
      });
    } else if (window.katex) {
      this.containerEl.querySelectorAll('.katex-render').forEach(el => {
        const latex = el.getAttribute('data-latex');
        if (latex) {
          try {
            window.katex.render(latex, el, { displayMode: true, throwOnError: false });
          } catch (e) {
            console.error(e);
          }
        }
      });
    }

    // Attach click listeners
    this.containerEl.querySelectorAll('.formula-card').forEach(card => {
      const id = card.getAttribute('data-id');
      const formula = FORMULAS_DATA.find(item => item.id === id);

      card.querySelector('.btn-open-lab').addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.onFormulaClick) this.onFormulaClick(formula);
      });

      card.querySelector('.btn-quick-practice').addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.onPracticeClick) this.onPracticeClick(formula);
      });

      card.addEventListener('click', () => {
        if (this.onFormulaClick) this.onFormulaClick(formula);
      });
    });
  }

  static createCardHTML(f) {
    const locF = I18n.localizeFormula(f);
    const isPhysics = f.subject === 'physics';
    const badgeClass = isPhysics ? 'badge-physics' : 'badge-math';
    const subjectName = isPhysics ? I18n.t('subjectPhysics') : (I18n.getLanguage() === 'kz' ? 'Математика' : 'Математика');

    const examBadges = f.examTags.map(tag => `<span class="badge-exam">${tag}</span>`).join(' ');

    return `
      <div class="formula-card glass-panel" data-id="${f.id}">
        <div class="card-header">
          <span class="badge ${badgeClass}">${subjectName} • ${locF.topic || f.topic}</span>
          <div class="exam-tags">${examBadges}</div>
        </div>

        <h3 class="card-title">${locF.title}</h3>
        <p class="card-subtopic">${locF.subtopic}</p>

        <div class="katex-container katex-render" data-latex="${f.latex}">
          $$\\displaystyle ${f.latex}$$
        </div>

        <p class="card-description">${locF.description}</p>

        <div class="card-footer">
          <button class="btn btn-outline btn-open-lab">
            <i class="fa-solid fa-sliders"></i> ${I18n.t('labBtn')}
          </button>
          <button class="btn btn-primary btn-quick-practice">
            <i class="fa-solid fa-pen-to-square"></i> ${I18n.t('practiceBtn')}
          </button>
        </div>
      </div>
    `;
  }
}

