// FormuLab Interactive Visualizer Component
// Handles dynamic plots, charts (Chart.js), and animated physical Canvas visualizers

export class Visualizer {
  static currentChart = null;

  /**
   * Main render dispatcher based on formula's visualizationType
   */
  static render(containerEl, formula, varValues) {
    if (!containerEl) return;
    containerEl.innerHTML = ''; // Clear container

    // Destroy existing Chart instance if any
    if (this.currentChart) {
      this.currentChart.destroy();
      this.currentChart = null;
    }

    const type = formula.visualizationType || 'default';

    switch (type) {
      case 'motion_curve':
      case 'parabola_graph':
      case 'pv_diagram':
      case 'energy_bar':
      case 'power_chart':
      case 'heat_chart':
      case 'trig_wave':
      case 'log_graph':
      case 'exp_graph':
        this.renderChart(containerEl, formula, varValues);
        break;

      default:
        this.renderCanvasDiagram(containerEl, formula, varValues);
        break;
    }
  }

  /**
   * Render Chart.js dynamic curves
   */
  static renderChart(container, formula, varValues) {
    const canvas = document.createElement('canvas');
    canvas.style.maxHeight = '280px';
    canvas.style.width = '100%';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const type = formula.visualizationType;

    let chartConfig = null;

    if (type === 'motion_curve') {
      const v0 = varValues.v_0 ?? 10;
      const a = varValues.a ?? 2;
      const maxT = varValues.t ?? 5;

      const labels = [];
      const dataPoints = [];
      const steps = 20;
      for (let i = 0; i <= steps; i++) {
        const t = (maxT / steps) * i;
        labels.push(t.toFixed(1) + 'с');
        dataPoints.push(v0 * t + 0.5 * a * t * t);
      }

      chartConfig = {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Перемещение s(t) [м]',
            data: dataPoints,
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            borderWidth: 3,
            fill: true,
            tension: 0.3,
            pointRadius: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { labels: { color: '#e2e8f0' } } },
          scales: {
            x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
            y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
          }
        }
      };
    } else if (type === 'parabola_graph') {
      const a = varValues.a ?? 1;
      const b = varValues.b ?? -4;
      const c = varValues.c ?? 3;

      const x0 = a !== 0 ? -b / (2 * a) : 0;
      const labels = [];
      const dataPoints = [];

      for (let x = x0 - 5; x <= x0 + 5; x += 0.5) {
        labels.push(x.toFixed(1));
        dataPoints.push(a * x * x + b * x + c);
      }

      chartConfig = {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: `y = ${a}x² + (${b})x + (${c})`,
            data: dataPoints,
            borderColor: '#06b6d4',
            backgroundColor: 'rgba(6, 182, 212, 0.15)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { labels: { color: '#e2e8f0' } } },
          scales: {
            x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
            y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
          }
        }
      };
    } else if (type === 'pv_diagram') {
      const nu = varValues['\\nu'] ?? 2;
      const T = varValues.T ?? 300;
      const R = 8.31;

      const labels = [];
      const dataPoints = [];
      for (let V = 0.01; V <= 0.1; V += 0.005) {
        labels.push(V.toFixed(2) + ' м³');
        const P_kPa = (nu * R * T) / V / 1000;
        dataPoints.push(P_kPa.toFixed(1));
      }

      chartConfig = {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Изотерма P(V) [кПа]',
            data: dataPoints,
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.15)',
            borderWidth: 3,
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { labels: { color: '#e2e8f0' } } },
          scales: {
            x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
            y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
          }
        }
      };
    } else if (type === 'energy_bar') {
      const m = varValues.m ?? 1000;
      const v = varValues.v ?? 20;
      const Ek = 0.5 * m * v * v;

      chartConfig = {
        type: 'bar',
        data: {
          labels: ['Кинетическая энергия (Eₖ)'],
          datasets: [{
            label: 'Дж',
            data: [Ek],
            backgroundColor: ['#10b981'],
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: '#94a3b8' } },
            y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
          }
        }
      };
    } else if (type === 'log_graph') {
      const a = varValues.a ?? 2;
      const labels = [];
      const dataPoints = [];
      for (let x = 0.5; x <= 16; x += 0.5) {
        labels.push(x.toFixed(1));
        dataPoints.push(Number((Math.log(x) / Math.log(a)).toFixed(2)));
      }

      chartConfig = {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: `y = log_${a}(x)`,
            data: dataPoints,
            borderColor: '#ec4899',
            backgroundColor: 'rgba(236, 72, 153, 0.15)',
            borderWidth: 3,
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { labels: { color: '#e2e8f0' } } },
          scales: {
            x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
            y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
          }
        }
      };
    } else if (type === 'exp_graph') {
      const a = varValues.a ?? 3;
      const labels = [];
      const dataPoints = [];
      for (let x = -3; x <= 4; x += 0.5) {
        labels.push(x.toFixed(1));
        dataPoints.push(Number(Math.pow(a, x).toFixed(2)));
      }

      chartConfig = {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: `y = ${a}^x`,
            data: dataPoints,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            borderWidth: 3,
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { labels: { color: '#e2e8f0' } } },
          scales: {
            x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
            y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
          }
        }
      };
    } else if (type === 'trig_wave') {
      const A = varValues.A ?? 1;
      const omega = varValues.omega ?? 1;
      const labels = [];
      const dataPoints = [];
      for (let deg = 0; deg <= 360; deg += 15) {
        const rad = (deg * Math.PI) / 180;
        labels.push(deg + '°');
        dataPoints.push(Number((A * Math.sin(omega * rad)).toFixed(3)));
      }

      chartConfig = {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: `y = ${A} · sin(${omega}α)`,
            data: dataPoints,
            borderColor: '#a855f7',
            backgroundColor: 'rgba(168, 85, 247, 0.15)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { labels: { color: '#e2e8f0' } } },
          scales: {
            x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
            y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
          }
        }
      };
    } else if (type === 'heat_chart') {
      const c = varValues.c ?? 4200;
      const m = varValues.m ?? 2;
      const dt = varValues['\\Delta t'] ?? varValues.dt ?? 20;

      const labels = [];
      const dataPoints = [];
      for (let t = 0; t <= dt; t += Math.max(1, Math.round(dt / 8))) {
        labels.push(t + '°C');
        dataPoints.push(Number(((c * m * t) / 1000).toFixed(1)));
      }

      chartConfig = {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Теплота Q(Δt) [кДж]',
            data: dataPoints,
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            borderWidth: 3,
            fill: true,
            tension: 0.2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { labels: { color: '#e2e8f0' } } },
          scales: {
            x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
            y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
          }
        }
      };
    } else {
      // Default plot fallback
      chartConfig = {
        type: 'line',
        data: {
          labels: ['0', '1', '2', '3', '4', '5'],
          dataPoints: [0, 2, 4, 6, 8, 10],
          datasets: [{ label: 'Зависимость', data: [0, 2, 4, 6, 8, 10], borderColor: '#6366f1' }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      };
    }

    // Render chart with Chart.js
    if (window.Chart && chartConfig) {
      this.currentChart = new window.Chart(ctx, chartConfig);
    }
  }

  /**
   * Render custom HTML5 Canvas diagrams (Physics vectors, circuits, geometry)
   */
  static renderCanvasDiagram(container, formula, varValues) {
    const canvas = document.createElement('canvas');
    canvas.width = 460;
    canvas.height = 240;
    canvas.style.width = '100%';
    canvas.style.height = '240px';
    canvas.style.borderRadius = '12px';
    canvas.style.background = 'rgba(15, 23, 42, 0.6)';
    canvas.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const type = formula.visualizationType;

    ctx.clearRect(0, 0, width, height);

    if (type === 'force_vector') {
      const m = varValues.m ?? 10;
      const a = varValues.a ?? 3;
      const F = m * a;

      // Draw surface ground
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(40, 180);
      ctx.lineTo(420, 180);
      ctx.stroke();

      // Draw Block
      const blockWidth = Math.min(100, 40 + m * 0.5);
      const blockHeight = 60;
      const blockX = width / 2 - blockWidth / 2;
      const blockY = 180 - blockHeight;

      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(blockX, blockY, blockWidth, blockHeight);
      ctx.strokeStyle = '#93c5fd';
      ctx.lineWidth = 2;
      ctx.strokeRect(blockX, blockY, blockWidth, blockHeight);

      // Mass label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`m = ${m} кг`, blockX + blockWidth / 2, blockY + blockHeight / 2 + 5);

      // Force Arrow (Right)
      const arrowLength = Math.min(140, 30 + F * 0.4);
      const arrowStartX = blockX + blockWidth;
      const arrowY = blockY + blockHeight / 2;

      this.drawArrow(ctx, arrowStartX, arrowY, arrowStartX + arrowLength, arrowY, '#ef4444', 4);
      ctx.fillStyle = '#ef4444';
      ctx.fillText(`F = ${F} Н`, arrowStartX + arrowLength / 2, arrowY - 12);

      // Acceleration Vector (above block)
      this.drawArrow(ctx, blockX + 10, blockY - 20, blockX + 10 + a * 5, blockY - 20, '#10b981', 3);
      ctx.fillStyle = '#10b981';
      ctx.fillText(`a = ${a} м/с²`, blockX + 25, blockY - 30);

    } else if (type === 'circuit_diagram') {
      const U = varValues.U ?? 12;
      const R = varValues.R ?? 4;
      const I = (U / R).toFixed(2);

      // Circuit Wire
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.strokeRect(70, 40, 320, 160);

      // Battery (Left)
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(60, 100, 20, 40);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 4;

      ctx.beginPath();
      ctx.moveTo(70, 105); ctx.lineTo(70, 135); // Long positive bar
      ctx.stroke();

      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(63, 112); ctx.lineTo(63, 128); // Short negative bar
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 14px Outfit, sans-serif';
      ctx.fillText(`U = ${U} В`, 20, 125);

      // Resistor Box (Top wire)
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(190, 25, 80, 30);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.strokeRect(190, 25, 80, 30);

      ctx.fillStyle = '#f59e0b';
      ctx.textAlign = 'center';
      ctx.fillText(`R = ${R} Ом`, 230, 45);

      // Current Arrows
      this.drawArrow(ctx, 230, 190, 290, 190, '#ec4899', 3);
      ctx.fillStyle = '#ec4899';
      ctx.font = 'bold 15px Outfit, sans-serif';
      ctx.fillText(`I = ${I} А`, 260, 180);

    } else if (type === 'right_triangle') {
      const a = varValues.a ?? 3;
      const b = varValues.b ?? 4;
      const c = Number(Math.sqrt(a * a + b * b).toFixed(2));

      const startX = 80;
      const startY = 190;
      const scale = 12;

      const drawA = Math.min(180, a * scale);
      const drawB = Math.min(140, b * scale);

      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX + drawA, startY);
      ctx.lineTo(startX, startY - drawB);
      ctx.closePath();
      ctx.stroke();

      ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.fill();

      // Right angle square
      ctx.strokeStyle = '#ec4899';
      ctx.strokeRect(startX, startY - 15, 15, 15);

      // Labels
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '14px Outfit, sans-serif';
      ctx.fillText(`a = ${a} см`, startX + drawA / 2, startY + 20);
      ctx.fillText(`b = ${b} см`, startX - 45, startY - drawB / 2);

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 15px Outfit, sans-serif';
      ctx.fillText(`c = ${c} см`, startX + drawA / 2 + 10, startY - drawB / 2 - 10);

    } else if (type === 'spring_oscillator') {
      const k = varValues.k ?? 200;
      const x_cm = varValues.x ?? 5;
      const F = (k * (x_cm / 100)).toFixed(1);

      // Wall
      ctx.fillStyle = '#475569';
      ctx.fillRect(30, 40, 20, 160);

      // Ground
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(30, 180); ctx.lineTo(430, 180);
      ctx.stroke();

      // Spring coil
      const springLength = 120 + x_cm * 4;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(50, 140);
      const coils = 12;
      for (let i = 0; i <= coils; i++) {
        const cx = 50 + (springLength / coils) * i;
        const cy = 140 + (i % 2 === 0 ? -15 : 15);
        ctx.lineTo(cx, cy);
      }
      ctx.stroke();

      // Mass block
      const blockX = 50 + springLength;
      ctx.fillStyle = '#6366f1';
      ctx.fillRect(blockX, 100, 60, 80);
      ctx.strokeStyle = '#818cf8';
      ctx.strokeRect(blockX, 100, 60, 80);

      // Force Vector (Left)
      this.drawArrow(ctx, blockX, 140, blockX - Math.min(80, F * 2), 140, '#ef4444', 4);
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 14px Outfit, sans-serif';
      ctx.fillText(`F_упр = ${F} Н`, blockX - 40, 120);

    } else if (type === 'circle_geometry') {
      const R = varValues.R ?? 5;
      const S = (Math.PI * R * R).toFixed(1);
      const L = (2 * Math.PI * R).toFixed(1);

      const centerX = width / 2;
      const centerY = height / 2;
      const drawR = Math.min(85, Math.max(30, R * 8));

      // Draw Circle Area
      ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, drawR, 0, 2 * Math.PI);
      ctx.fill();

      // Draw Outline
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Radius line
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + drawR, centerY);
      ctx.stroke();

      // Center point
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
      ctx.fill();

      // Labels
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 13px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`R = ${R} см`, centerX + drawR / 2, centerY - 10);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = '14px Outfit, sans-serif';
      ctx.fillText(`S = πR² ≈ ${S} см²`, centerX, height - 20);
      ctx.fillText(`L = 2πR ≈ ${L} см`, centerX, 25);

    } else if (type === 'general_triangle') {
      const a = varValues.a ?? 5;
      const b = varValues.b ?? 6;
      const gamma = varValues.gamma ?? varValues.alpha ?? 60;
      const S = (0.5 * a * b * Math.sin((gamma * Math.PI) / 180)).toFixed(1);

      const startX = 100;
      const startY = 180;
      const scale = 14;

      const pA = { x: startX, y: startY };
      const pB = { x: startX + Math.min(220, a * scale), y: startY };
      const rad = (gamma * Math.PI) / 180;
      const pC = {
        x: startX + Math.min(180, b * scale * Math.cos(rad)),
        y: startY - Math.min(140, b * scale * Math.sin(rad))
      };

      ctx.fillStyle = 'rgba(168, 85, 247, 0.15)';
      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pB.x, pB.y);
      ctx.lineTo(pC.x, pC.y);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#e2e8f0';
      ctx.font = '13px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`a = ${a}`, (pA.x + pB.x) / 2, pA.y + 20);
      ctx.fillText(`b = ${b}`, (pA.x + pC.x) / 2 - 20, (pA.y + pC.y) / 2);
      ctx.fillText(`γ = ${gamma}°`, pA.x + 25, pA.y - 10);

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 14px Outfit, sans-serif';
      ctx.fillText(`S = ½ab·sinγ ≈ ${S}`, width / 2, 25);

    } else if (type === 'coulomb_charges') {
      const q1 = varValues.q_1 ?? varValues.q1 ?? 2;
      const q2 = varValues.q_2 ?? varValues.q2 ?? -3;
      const r = varValues.r ?? 0.5;

      const isRepel = (q1 * q2) > 0;
      const c1X = 120;
      const c2X = 340;
      const cy = 120;

      // Charge 1
      ctx.fillStyle = q1 >= 0 ? '#ef4444' : '#3b82f6';
      ctx.beginPath();
      ctx.arc(c1X, cy, 25, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${q1 > 0 ? '+' : ''}${q1} мкКл`, c1X, cy + 5);

      // Charge 2
      ctx.fillStyle = q2 >= 0 ? '#ef4444' : '#3b82f6';
      ctx.beginPath();
      ctx.arc(c2X, cy, 25, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${q2 > 0 ? '+' : ''}${q2} мкКл`, c2X, cy + 5);

      // Distance line
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(c1X + 25, cy);
      ctx.lineTo(c2X - 25, cy);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#fbbf24';
      ctx.fillText(`r = ${r} м`, (c1X + c2X) / 2, cy - 10);

      // Force vectors
      if (isRepel) {
        this.drawArrow(ctx, c1X - 25, cy, c1X - 75, cy, '#ec4899', 3);
        this.drawArrow(ctx, c2X + 25, cy, c2X + 75, cy, '#ec4899', 3);
        ctx.fillStyle = '#ec4899';
        ctx.fillText('Отталкивание', width / 2, height - 20);
      } else {
        this.drawArrow(ctx, c1X + 25, cy, c1X + 65, cy, '#10b981', 3);
        this.drawArrow(ctx, c2X - 25, cy, c2X - 65, cy, '#10b981', 3);
        ctx.fillStyle = '#10b981';
        ctx.fillText('Притяжение', width / 2, height - 20);
      }

    } else if (type === 'optics_lens') {
      const F = varValues.F ?? 10;
      const d = varValues.d ?? 20;
      const f = (1 / ((1 / F) - (1 / d))).toFixed(1);

      const lensX = width / 2;
      const axisY = height / 2;

      // Optical Axis
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(20, axisY);
      ctx.lineTo(width - 20, axisY);
      ctx.stroke();

      // Convex Lens Line
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(lensX, 30);
      ctx.lineTo(lensX, height - 30);
      ctx.stroke();

      // Focal points
      const scaleF = 5;
      const fx1 = lensX - F * scaleF;
      const fx2 = lensX + F * scaleF;

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(fx1, axisY, 4, 0, 2 * Math.PI);
      ctx.arc(fx2, axisY, 4, 0, 2 * Math.PI);
      ctx.fill();

      ctx.font = '12px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('F', fx1, axisY + 18);
      ctx.fillText('F', fx2, axisY + 18);

      // Object arrow (Left)
      const objX = lensX - Math.min(180, d * scaleF);
      this.drawArrow(ctx, objX, axisY, objX, axisY - 50, '#10b981', 3);
      ctx.fillStyle = '#10b981';
      ctx.fillText(`Предмет d=${d}см`, objX, axisY - 60);

      // Image arrow (Right)
      if (f > 0) {
        const imgX = lensX + Math.min(180, f * scaleF);
        this.drawArrow(ctx, imgX, axisY, imgX, axisY + 50, '#ec4899', 3);
        ctx.fillStyle = '#ec4899';
        ctx.fillText(`Изображение f=${f}см`, imgX, axisY + 68);
      }

    } else {
      // General Canvas Diagram fallback
      ctx.fillStyle = '#94a3b8';
      ctx.font = '16px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Интерактивная визуализация: ${formula.title}`, width / 2, height / 2);
    }
  }

  /**
   * Utility helper to draw an arrow head on canvas
   */
  static drawArrow(ctx, fromx, fromy, tox, toy, color = '#ffffff', width = 2) {
    const headlen = 10;
    const dx = tox - fromx;
    const dy = toy - fromy;
    const angle = Math.atan2(dy, dx);

    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;

    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
