// FormuLab PDF Export & Printable Document Component
// Generates:
// 1. CheatSheet: High-resolution A4 multi-column Formula Reference Guide (Print/PDF ready)
// 2. Certificate: Official Academic UNT Result Certificate with gold seal & verification stamp

import { FORMULAS_DATA } from '../data/formulas.js';
import { I18n } from '../i18n.js';
import { Gamification } from './gamification.js';

export class CheatSheet {
  static modalEl = null;
  static currentFilter = 'all'; // 'all', 'physics', 'math', or specific topic name
  static searchQuery = '';
  static _listenersAttached = false;

  static init(modalEl) {
    this.modalEl = modalEl || document.getElementById('cheat-sheet-modal');
    this.ensureModal();
  }

  static ensureModal() {
    if (!this.modalEl) {
      this.modalEl = document.getElementById('cheat-sheet-modal');
    }
    if (this.modalEl && !this._listenersAttached) {
      this._listenersAttached = true;
      const closeBtn = this.modalEl.querySelector('.modal-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.hide());
      }
      this.modalEl.addEventListener('click', (e) => {
        if (e.target === this.modalEl) this.hide();
      });
    }
    return this.modalEl;
  }

  static open(filter = 'all') {
    this.ensureModal();
    this.currentFilter = filter;
    this.searchQuery = '';
    this.render();
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

  static print() {
    document.body.classList.add('print-mode-cheatsheet');
    const handleAfterPrint = () => {
      document.body.classList.remove('print-mode-cheatsheet');
      window.removeEventListener('afterprint', handleAfterPrint);
    };
    window.addEventListener('afterprint', handleAfterPrint);
    setTimeout(() => {
      window.print();
    }, 100);
  }

  static copyAsText() {
    try {
      const formulas = this.getFilteredFormulas();
      const textLines = [
        "==================================================",
        "FORMULAB — ҰБТ • ЕНТ НЕГІЗГІ ФОРМУЛАЛАР КЕСТЕСІ",
        `Жалпы саны: ${formulas.length} формула`,
        "==================================================\n"
      ];

      formulas.forEach((f, idx) => {
        const loc = I18n.localizeFormula(f);
        textLines.push(`${idx + 1}. [${loc.topic}] ${loc.title}`);
        textLines.push(`   Формула: ${f.latex}`);
        if (loc.variables && loc.variables.length > 0) {
          const vars = loc.variables.map(v => `${v.symbol} (${v.name}, [${v.unit || '-'}] )`).join(', ');
          textLines.push(`   Айнымалылар: ${vars}`);
        }
        if (loc.targetVariable) {
          textLines.push(`   Нәтиже: ${loc.targetVariable.symbol} (${loc.targetVariable.name}, [${loc.targetVariable.unit}])`);
        }
        textLines.push('');
      });

      navigator.clipboard.writeText(textLines.join('\n')).then(() => {
        if (Gamification && Gamification.showAchievementToast) {
          Gamification.showAchievementToast({
            title: I18n.t('cheatSheetCopied'),
            description: `${formulas.length} формула буферге сақталды`,
            icon: 'fa-solid fa-copy'
          });
        } else {
          alert(I18n.t('cheatSheetCopied'));
        }
      });
    } catch (e) {
      console.error('Failed to copy formulas:', e);
    }
  }

  static getFilteredFormulas() {
    let list = [...FORMULAS_DATA];

    if (this.currentFilter === 'physics' || this.currentFilter === 'math') {
      list = list.filter(f => f.subject === this.currentFilter);
    } else if (this.currentFilter !== 'all') {
      list = list.filter(f => f.topic === this.currentFilter);
    }

    if (this.searchQuery && this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      list = list.filter(f => {
        const loc = I18n.localizeFormula(f);
        return (
          loc.title.toLowerCase().includes(q) ||
          f.latex.toLowerCase().includes(q) ||
          (loc.description && loc.description.toLowerCase().includes(q)) ||
          loc.topic.toLowerCase().includes(q) ||
          (f.variables && f.variables.some(v => v.name.toLowerCase().includes(q) || v.symbol.toLowerCase().includes(q)))
        );
      });
    }

    return list;
  }

  static render() {
    if (!this.modalEl) return;
    const modalBody = this.modalEl.querySelector('.modal-body');
    if (!modalBody) return;

    const filtered = this.getFilteredFormulas();

    // Group formulas by topic
    const grouped = {};
    filtered.forEach(f => {
      const topic = f.topic || 'Басқа';
      if (!grouped[topic]) grouped[topic] = [];
      grouped[topic].push(f);
    });

    const topicKeys = Object.keys(grouped);

    // Filter pills list
    const filterOptions = [
      { id: 'all', label: I18n.t('cheatSheetFilterAll'), count: FORMULAS_DATA.length },
      { id: 'physics', label: I18n.t('cheatSheetFilterPhysics'), count: FORMULAS_DATA.filter(f => f.subject === 'physics').length },
      { id: 'math', label: I18n.t('cheatSheetFilterMath'), count: FORMULAS_DATA.filter(f => f.subject === 'math').length },
      { id: 'Механика', label: 'Механика', count: FORMULAS_DATA.filter(f => f.topic === 'Механика').length },
      { id: 'Электродинамика', label: 'Электродинамика', count: FORMULAS_DATA.filter(f => f.topic === 'Электродинамика').length },
      { id: 'Термодинамика', label: 'Термодинамика', count: FORMULAS_DATA.filter(f => f.topic === 'Термодинамика').length },
      { id: 'Оптика', label: 'Оптика', count: FORMULAS_DATA.filter(f => f.topic === 'Оптика').length },
      { id: 'Алгебра', label: 'Алгебра', count: FORMULAS_DATA.filter(f => f.topic === 'Алгебра').length },
      { id: 'Геометрия', label: 'Геометрия', count: FORMULAS_DATA.filter(f => f.topic === 'Геометрия').length },
      { id: 'Тригонометрия', label: 'Тригонометрия', count: FORMULAS_DATA.filter(f => f.topic === 'Тригонометрия').length },
    ];

    const filterPillsHTML = filterOptions.map(opt => `
      <button type="button" class="cheatsheet-filter-pill ${this.currentFilter === opt.id ? 'active' : ''}" data-filter="${opt.id}">
        ${opt.label} <span class="pill-badge">${opt.count}</span>
      </button>
    `).join('');

    // Generate topic cards HTML
    let contentHTML = '';
    if (topicKeys.length === 0) {
      contentHTML = `
        <div class="cheatsheet-empty">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; margin-bottom: 0.8rem; opacity: 0.5;"></i>
          <h3>${I18n.t('emptyTitle')}</h3>
          <p>${I18n.t('emptyDesc')}</p>
        </div>
      `;
    } else {
      topicKeys.forEach((topicName, tIdx) => {
        const items = grouped[topicName];
        const isPhysics = items[0]?.subject === 'physics';
        const topicIcon = isPhysics ? 'fa-bolt' : 'fa-calculator';

        const cardsHTML = items.map((f, fIdx) => {
          const loc = I18n.localizeFormula(f);
          const varsHTML = (loc.variables || []).map(v => `
            <div class="cheat-var-row">
              <span class="var-sym">$${v.symbol}$</span>
              <span class="var-sep">—</span>
              <span class="var-name">${v.name}</span>
              ${v.unit ? `<span class="var-unit">[${v.unit}]</span>` : ''}
            </div>
          `).join('');

          const targetVarHTML = loc.targetVariable ? `
            <div class="cheat-target-var">
              <span class="target-badge"><i class="fa-solid fa-crosshairs"></i> $${loc.targetVariable.symbol}$</span>
              <span class="var-name">${loc.targetVariable.name}</span>
              ${loc.targetVariable.unit ? `<span class="var-unit">[${loc.targetVariable.unit}]</span>` : ''}
            </div>
          ` : '';

          return `
            <div class="cheat-formula-card">
              <div class="cheat-card-top">
                <span class="cheat-index">${fIdx + 1}</span>
                <h4 class="cheat-formula-title">${loc.title}</h4>
                ${loc.subtopic ? `<span class="cheat-subtopic-tag">${loc.subtopic}</span>` : ''}
              </div>

              <div class="cheat-math-box">
                <div class="cheat-latex">$$${f.latex}$$</div>
              </div>

              ${targetVarHTML}

              ${varsHTML ? `
                <div class="cheat-vars-list">
                  ${varsHTML}
                </div>
              ` : ''}

              ${loc.description ? `
                <div class="cheat-desc-note">
                  <i class="fa-regular fa-lightbulb"></i> ${loc.description}
                </div>
              ` : ''}
            </div>
          `;
        }).join('');

        contentHTML += `
          <div class="cheatsheet-topic-group">
            <div class="cheatsheet-topic-header">
              <div class="topic-header-title">
                <i class="fa-solid ${topicIcon}"></i>
                <h3>${topicName}</h3>
              </div>
              <span class="topic-count-tag">${items.length} формула</span>
            </div>
            <div class="cheatsheet-grid">
              ${cardsHTML}
            </div>
          </div>
        `;
      });
    }

    modalBody.innerHTML = `
      <div class="cheatsheet-container">
        <!-- Interactive Controls (Hidden during A4 print) -->
        <div class="cheatsheet-controls glass-panel no-print">
          <div class="cheatsheet-controls-top">
            <div class="cheatsheet-title-group">
              <div class="cheatsheet-icon"><i class="fa-solid fa-file-pdf"></i></div>
              <div>
                <h2 class="cheatsheet-heading">${I18n.t('cheatSheetModalTitle')}</h2>
                <p class="cheatsheet-desc">${I18n.t('cheatSheetSubtitle')}</p>
              </div>
            </div>

            <div class="cheatsheet-action-btns">
              <button type="button" id="btn-print-cheat-sheet" class="btn btn-primary btn-print-sheet">
                <i class="fa-solid fa-print"></i> <span>${I18n.t('cheatSheetPrintBtn')}</span>
              </button>
              <button type="button" id="btn-copy-cheat-sheet" class="btn btn-outline">
                <i class="fa-solid fa-copy"></i> <span>${I18n.t('cheatSheetCopyBtn')}</span>
              </button>
            </div>
          </div>

          <div class="cheatsheet-search-row">
            <div class="search-box cheatsheet-search-box">
              <i class="fa-solid fa-magnifying-glass search-icon"></i>
              <input
                type="text"
                id="cheatsheet-search-input"
                class="search-input"
                placeholder="${I18n.t('searchPlaceholder')}"
                value="${this.searchQuery}"
              />
            </div>
          </div>

          <div class="cheatsheet-pills-row">
            ${filterPillsHTML}
          </div>
        </div>

        <!-- A4 Printable Document Sheet -->
        <div class="cheatsheet-printable-sheet" id="cheatsheet-printable-area">
          <div class="print-document-header">
            <div class="print-header-brand">
              <div class="print-brand-logo">📐 FormuLab</div>
              <div class="print-brand-tagline">ҰБТ • ЕНТ Рустюмов бойынша интерактивті формулалар атласы</div>
            </div>
            <div class="print-header-meta">
              <div><strong>A4 Формулалар анықтамалығы</strong></div>
              <div>Күні: ${new Date().toLocaleDateString('kk-KZ')} • 40 Формула жинағы</div>
            </div>
          </div>

          <div class="cheatsheet-content-body">
            ${contentHTML}
          </div>

          <div class="print-document-footer">
            <span>FormuLab EdTech • ҰБТ 2026 Академиясы</span>
            <span>https://edtech-delta-seven.vercel.app</span>
          </div>
        </div>
      </div>
    `;

    // Render KaTeX math safely
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
      console.warn('KaTeX render in cheatsheet:', e);
    }

    // Attach event listeners
    const printBtn = modalBody.querySelector('#btn-print-cheat-sheet');
    if (printBtn) {
      printBtn.addEventListener('click', () => this.print());
    }

    const copyBtn = modalBody.querySelector('#btn-copy-cheat-sheet');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => this.copyAsText());
    }

    const searchInput = modalBody.querySelector('#cheatsheet-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.render();
        // keep focus in input
        const reInput = modalBody.querySelector('#cheatsheet-search-input');
        if (reInput) {
          reInput.focus();
          reInput.selectionStart = reInput.selectionEnd = reInput.value.length;
        }
      });
    }

    modalBody.querySelectorAll('.cheatsheet-filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        this.currentFilter = filter;
        this.render();
      });
    });
  }
}

export class Certificate {
  static modalEl = null;
  static examData = null;
  static studentName = '';
  static certId = '';
  static _listenersAttached = false;

  static init(modalEl) {
    this.modalEl = modalEl || document.getElementById('certificate-modal');
    this.ensureModal();
  }

  static ensureModal() {
    if (!this.modalEl) {
      this.modalEl = document.getElementById('certificate-modal');
    }
    if (this.modalEl && !this._listenersAttached) {
      this._listenersAttached = true;
      const closeBtn = this.modalEl.querySelector('.modal-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.hide());
      }
      this.modalEl.addEventListener('click', (e) => {
        if (e.target === this.modalEl) this.hide();
      });
    }
    return this.modalEl;
  }

  static open(data = null) {
    this.ensureModal();
    this.examData = data || {
      total: 10,
      correct: 10,
      accuracy: 100,
      elapsedSeconds: 180,
      subject: 'all'
    };

    const savedName = localStorage.getItem('formulab_student_name');
    this.studentName = savedName || I18n.t('certDefaultName');

    // Generate or retain unique certificate serial
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    this.certId = `KZ-FL-${new Date().getFullYear()}-${randomSuffix}`;

    this.render();
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

  static print() {
    document.body.classList.add('print-mode-certificate');
    const handleAfterPrint = () => {
      document.body.classList.remove('print-mode-certificate');
      window.removeEventListener('afterprint', handleAfterPrint);
    };
    window.addEventListener('afterprint', handleAfterPrint);
    setTimeout(() => {
      window.print();
    }, 100);
  }

  static share() {
    const accuracy = this.examData.accuracy;
    const shareText = `🎓 Мен FormuLab платформасында ҰБТ Экспресс-Тестін сәтті тапсырдым!\n` +
      `📊 Нәтижем: ${this.examData.correct}/${this.examData.total} (${accuracy}% дәлдік)\n` +
      `🏆 Сертификат №: ${this.certId}\n` +
      `Сен де біліміңді тексер: https://edtech-delta-seven.vercel.app`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).then(() => {
        if (Gamification && Gamification.showAchievementToast) {
          Gamification.showAchievementToast({
            title: I18n.t('certCopiedToast'),
            description: shareText.substring(0, 50) + '...',
            icon: 'fa-solid fa-share-nodes'
          });
        } else {
          alert(I18n.t('certCopiedToast'));
        }
      });
    }
  }

  static getRankTitle(accuracy) {
    if (accuracy >= 95) return '«Ғылым Академигі • Grand Master»';
    if (accuracy >= 80) return '«ҰБТ Сарапшысы • Physics & Math Expert»';
    if (accuracy >= 65) return '«Тәжірибелі Зерттеуші • Senior Scholar»';
    return '«Ізденуші Талапкер • Junior Scholar»';
  }

  static render() {
    if (!this.modalEl) return;
    const modalBody = this.modalEl.querySelector('.modal-body');
    if (!modalBody) return;

    const mins = Math.floor((this.examData.elapsedSeconds || 0) / 60);
    const secs = (this.examData.elapsedSeconds || 0) % 60;
    const timeFormatted = `${mins} мин ${secs < 10 ? '0' : ''}${secs} сек`;
    const rankTitle = this.getRankTitle(this.examData.accuracy);

    const today = new Date();
    const day = today.getDate();
    const monthsKz = ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'];
    const monthsRu = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const monthName = I18n.currentLang === 'kz' ? monthsKz[today.getMonth()] : monthsRu[today.getMonth()];
    const formattedDate = `${day} ${monthName} ${today.getFullYear()} ж.`;

    const subjectTitle = this.examData.subject === 'physics'
      ? I18n.t('subjectPhysics')
      : (this.examData.subject === 'math' ? I18n.t('subjectMath') : I18n.t('subjectAll'));

    modalBody.innerHTML = `
      <div class="certificate-wrapper">
        <!-- Interactive Controls (Hidden during Print) -->
        <div class="certificate-controls glass-panel no-print">
          <div class="cert-input-row">
            <label for="cert-name-input" class="cert-input-label">
              <i class="fa-solid fa-user-graduate"></i>
              <span>${I18n.t('certNameLabel')}</span>
            </label>
            <div class="cert-input-group">
              <input
                type="text"
                id="cert-name-input"
                class="cert-name-input"
                value="${this.studentName}"
                placeholder="${I18n.t('certNamePlaceholder')}"
                maxlength="40"
              />
            </div>
          </div>

          <div class="cert-action-btns">
            <button type="button" id="btn-print-certificate" class="btn btn-primary btn-print-cert">
              <i class="fa-solid fa-print"></i> <span>${I18n.t('certPrintBtn')}</span>
            </button>
            <button type="button" id="btn-share-certificate" class="btn btn-outline">
              <i class="fa-solid fa-share-nodes"></i> <span>${I18n.t('certShareBtn')}</span>
            </button>
          </div>
        </div>

        <!-- A4 Certificate Paper Canvas -->
        <div class="certificate-paper" id="certificate-print-area">
          <div class="cert-ornament-border">
            <div class="cert-inner-border">
              
              <!-- Corner Ornaments -->
              <div class="cert-corner corner-tl">❖</div>
              <div class="cert-corner corner-tr">❖</div>
              <div class="cert-corner corner-bl">❖</div>
              <div class="cert-corner corner-br">❖</div>

              <!-- Top Emblem & Republic Header -->
              <div class="cert-header-block">
                <div class="cert-republic-banner">${I18n.t('certRepublic')}</div>
                <div class="cert-crest-icon">
                  <i class="fa-solid fa-award"></i>
                </div>
                <h1 class="cert-main-title">${I18n.t('certTitle')}</h1>
                <div class="cert-subtitle-underline"></div>
              </div>

              <!-- Recipient Section -->
              <div class="cert-recipient-block">
                <p class="cert-intro-text">${I18n.t('certPresentedTo')}</p>
                <div class="cert-student-name" id="cert-display-name">${this.studentName}</div>
                <p class="cert-achievement-desc">
                  ${I18n.t('certCompletedText')}
                </p>
              </div>

              <!-- Achievement Metrics Row -->
              <div class="cert-metrics-row">
                <div class="cert-metric-card">
                  <div class="metric-top-label">${I18n.t('certScore')}</div>
                  <div class="metric-value-big">${this.examData.correct} <span class="metric-sub">/ ${this.examData.total}</span></div>
                  <div class="metric-desc-sub">${subjectTitle}</div>
                </div>

                <div class="cert-metric-card">
                  <div class="metric-top-label">${I18n.t('certAccuracy')}</div>
                  <div class="metric-value-big text-gold">${this.examData.accuracy}%</div>
                  <div class="metric-desc-sub">ҰБТ нормативі</div>
                </div>

                <div class="cert-metric-card">
                  <div class="metric-top-label">${I18n.t('certTime')}</div>
                  <div class="metric-value-big">${timeFormatted}</div>
                  <div class="metric-desc-sub">Тапсыру жылдамдығы</div>
                </div>

                <div class="cert-metric-card cert-rank-card">
                  <div class="metric-top-label">${I18n.t('certRank')}</div>
                  <div class="metric-rank-title">${rankTitle}</div>
                  <div class="metric-desc-sub">FormuLab Ресми Дәрежесі</div>
                </div>
              </div>

              <!-- Bottom Footer: Signatures, Gold Seal & QR Verification -->
              <div class="cert-footer-row">
                <!-- Left Signature Block -->
                <div class="cert-sign-col">
                  <div class="cert-sign-signature">FormuLab EdTech</div>
                  <div class="cert-sign-line"></div>
                  <div class="cert-sign-label">ҰБТ Сарапшылар Кеңесі</div>
                  <div class="cert-sign-role">Бағдарлама жетекшісі</div>
                </div>

                <!-- Center Official Gold Seal -->
                <div class="cert-seal-col">
                  <div class="cert-gold-seal">
                    <div class="seal-inner-ring">
                      <div class="seal-stars">★ ★ ★ ★ ★</div>
                      <div class="seal-text-center">FORMULAB</div>
                      <div class="seal-sub-center">VERIFIED</div>
                      <div class="seal-year">2026</div>
                    </div>
                  </div>
                </div>

                <!-- Right Verification Details -->
                <div class="cert-verify-col">
                  <div class="cert-meta-item">
                    <span class="meta-label">${I18n.t('certNumber')}</span>
                    <strong class="meta-code">${this.certId}</strong>
                  </div>
                  <div class="cert-meta-item">
                    <span class="meta-label">${I18n.t('certDate')}</span>
                    <span>${formattedDate}</span>
                  </div>
                  <div class="cert-security-badge">
                    <i class="fa-solid fa-shield-halved"></i> Ресми расталған куәлік
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    `;

    // Attach event listeners
    const nameInput = modalBody.querySelector('#cert-name-input');
    const nameDisplay = modalBody.querySelector('#cert-display-name');
    if (nameInput && nameDisplay) {
      nameInput.addEventListener('input', (e) => {
        const val = e.target.value.trim() || I18n.t('certDefaultName');
        this.studentName = val;
        nameDisplay.textContent = val;
        localStorage.setItem('formulab_student_name', val);
      });
    }

    const printBtn = modalBody.querySelector('#btn-print-certificate');
    if (printBtn) {
      printBtn.addEventListener('click', () => this.print());
    }

    const shareBtn = modalBody.querySelector('#btn-share-certificate');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => this.share());
    }
  }
}
