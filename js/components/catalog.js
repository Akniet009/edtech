// FormuLab Catalog Component
// Handles catalog rendering, real-time search, subject & topic filters, exam tag badges

import { FORMULAS_DATA } from '../data/formulas.js';

export class Catalog {
  static currentSubject = 'all'; // 'all' | 'physics' | 'math'
  static searchQuery = '';
  static activeTopic = 'all';

  static init(containerEl, onFormulaClick, onPracticeClick) {
    this.containerEl = containerEl;
    this.onFormulaClick = onFormulaClick;
    this.onPracticeClick = onPracticeClick;
    this.render();
  }

  static setSubject(subject) {
    this.currentSubject = subject;
    this.activeTopic = 'all';
    this.render();
  }

  static setSearchQuery(query) {
    this.searchQuery = query.toLowerCase().trim();
    this.render();
  }

  static setTopic(topic) {
    this.activeTopic = topic;
    this.render();
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
      // Search match (title, topic, subtopic, latex, description)
      if (this.searchQuery) {
        const q = this.searchQuery;
        const matchesTitle = f.title.toLowerCase().includes(q);
        const matchesTopic = f.topic.toLowerCase().includes(q);
        const matchesSubtopic = f.subtopic.toLowerCase().includes(q);
        const matchesLatex = f.latex.toLowerCase().includes(q);
        const matchesDesc = f.description.toLowerCase().includes(q);
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
          <h3>Формулы не найдены</h3>
          <p>Попробуйте изменить поисковый запрос или сбросить фильтры.</p>
        </div>
      `;
      return;
    }

    this.containerEl.innerHTML = filtered.map(f => this.createCardHTML(f)).join('');

    // Trigger KaTeX rendering on new elements
    if (window.renderMathInElement) {
      window.renderMathInElement(this.containerEl, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ]
      });
    } else if (window.katex) {
      this.containerEl.querySelectorAll('.katex-render').forEach(el => {
        const latex = el.getAttribute('data-latex');
        if (latex) {
          try {
            window.katex.render(latex, el, { displayMode: true });
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
    const isPhysics = f.subject === 'physics';
    const badgeClass = isPhysics ? 'badge-physics' : 'badge-math';
    const subjectName = isPhysics ? 'Физика' : 'Математика';

    const examBadges = f.examTags.map(tag => `<span class="badge-exam">${tag}</span>`).join(' ');

    return `
      <div class="formula-card glass-panel" data-id="${f.id}">
        <div class="card-header">
          <span class="badge ${badgeClass}">${subjectName} • ${f.topic}</span>
          <div class="exam-tags">${examBadges}</div>
        </div>

        <h3 class="card-title">${f.title}</h3>
        <p class="card-subtopic">${f.subtopic}</p>

        <div class="katex-container katex-render" data-latex="${f.latex}">
          $$\\displaystyle ${f.latex}$$
        </div>

        <p class="card-description">${f.description}</p>

        <div class="card-footer">
          <button class="btn btn-outline btn-open-lab">
            <i class="fa-solid fa-sliders"></i> Зертхана
          </button>
          <button class="btn btn-primary btn-quick-practice">
            <i class="fa-solid fa-pen-to-square"></i> Есеп шығару
          </button>
        </div>
      </div>
    `;
  }
}
