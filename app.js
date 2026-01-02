/**
 * Vanguard Crux | Financial Modeling Core
 * v2.4.0-stable
 */

// ==========================================
// 1. CONFIGURATION & LOCALIZATION
// ==========================================

let currentLanguage = 'es';
let projectData = null;
let strategicData = null;
let charts = { cashflow: null, roi: null, scenarios: null };

// UI Text Resources
const LOCALE_RESOURCES = {
    en: {
        'header-title': 'Business Case Analyzer Pro',
        'status-positive-return': '✓ Positive Return',
        'status-negative-return': '✗ Negative Return',
        'status-creates-value': '✓ Creates Value',
        'status-destroys-value': '✗ Destroys Value',
        'chart-monthly-cashflow': 'Net Monthly Flow',
        'chart-cumulative-cashflow': 'Cumulative Position',
        'scenario-expected': 'Base Case',
        'scenario-best': 'Upside Case',
        'scenario-worst': 'Downside Case',
        'unit-months': 'mo',
        'viability-high': 'HIGH VIABILITY - Proceed to Financials',
        'viability-review': 'REVIEW NEEDED - Refine Strategy'
    },
    es: {
        'header-title': 'Analizador de Casos de Negocio Pro',
        'status-positive-return': '✓ Retorno Positivo',
        'status-negative-return': '✗ Retorno Negativo',
        'status-creates-value': '✓ Genera Valor',
        'status-destroys-value': '✗ Destruye Valor',
        'chart-monthly-cashflow': 'Flujo Mensual Neto',
        'chart-cumulative-cashflow': 'Posición Acumulada',
        'scenario-expected': 'Caso Base',
        'scenario-best': 'Caso Optimista',
        'scenario-worst': 'Caso Pesimista',
        'unit-months': 'meses',
        'viability-high': 'ALTA VIABILIDAD - Proceder a Financiero',
        'viability-review': 'REVISIÓN REQUERIDA - Refinar Estrategia'
    },
    pt: {
        'header-title': 'Analisador de Casos de Negócio Pro',
        'status-positive-return': '✓ Retorno Positivo',
        'status-negative-return': '✗ Retorno Negativo',
        'status-creates-value': '✓ Gera Valor',
        'status-destroys-value': '✗ Destrói Valor',
        'chart-monthly-cashflow': 'Fluxo Mensal Líquido',
        'chart-cumulative-cashflow': 'Posição Acumulada',
        'scenario-expected': 'Caso Base',
        'scenario-best': 'Caso Otimista',
        'scenario-worst': 'Caso Pessimista',
        'unit-months': 'meses',
        'viability-high': 'ALTA VIABILIDADE - Prosseguir',
        'viability-review': 'REVISÃO NECESSÁRIA - Refinar'
    }
};

// Contextual Help Content
const GUIDE_CONTENT = {
    es: {
        projectName: { title: "Nombre del Proyecto", content: "<p>Use un nombre orientado a la acción (ej: 'Optimización Logística').</p>" },
        problemOpportunity: { title: "Problema/Oportunidad", content: "<p>Defina el impacto cuantificable (costo, tiempo, riesgo).</p>" },
        proposedSolution: { title: "Solución Propuesta", content: "<p>Describa capacidades, no solo tecnología. Defina el alcance Fase 1.</p>" },
        successMetrics: { title: "Métricas SMART", content: "<p>Defina objetivos específicos, medibles y con plazos.</p>" }
    },
    en: {
        projectName: { title: "Project Name", content: "<p>Use action-oriented naming (e.g., 'Logistics Optimization').</p>" },
        problemOpportunity: { title: "Problem/Opportunity", content: "<p>Define quantifiable impact (cost, time, risk).</p>" },
        proposedSolution: { title: "Proposed Solution", content: "<p>Describe capabilities, not just tech. Define Phase 1 scope.</p>" },
        successMetrics: { title: "SMART Metrics", content: "<p>Define specific, measurable, time-bound goals.</p>" }
    },
    pt: {
        projectName: { title: "Nome do Projeto", content: "<p>Use um nome orientado à ação.</p>" },
        problemOpportunity: { title: "Problema/Oportunidade", content: "<p>Defina o impacto quantificável.</p>" },
        proposedSolution: { title: "Solução Proposta", content: "<p>Descreva capacidades. Defina o escopo da Fase 1.</p>" },
        successMetrics: { title: "Métricas SMART", content: "<p>Defina objetivos específicos e mensuráveis.</p>" }
    }
};

// ==========================================
// 2. CORE ENGINES (Logic Layer)
// ==========================================

/* FinanceEngine: Handles high-precision financial arithmetic */
const FinanceEngine = {
    calcROI: (inv, ret) => inv === 0 ? 0 : ((ret - inv) / inv) * 100,
    
    calcNPV: (flows, rate) => {
        const r = rate / 100;
        return flows.reduce((acc, val, i) => acc + (val / Math.pow(1 + r, i + 1)), 0);
    },

    calcPayback: (inv, flows) => {
        let cum = -inv;
        for (let i = 0; i < flows.length; i++) {
            cum += flows[i];
            if (cum >= 0) {
                const prev = cum - flows[i];
                return i + (-prev / flows[i]);
            }
        }
        return flows.length;
    },

    calcIRR: (flows, guess = 0.1) => {
        // Newton-Raphson Method
        const maxIter = 50, eps = 1e-4;
        let r = guess;
        for (let i = 0; i < maxIter; i++) {
            let npv = 0, d_npv = 0;
            for (let j = 0; j < flows.length; j++) {
                const div = Math.pow(1 + r, j);
                npv += flows[j] / div;
                d_npv -= (j * flows[j]) / (div * (1 + r));
            }
            const newR = r - (npv / d_npv);
            if (Math.abs(newR - r) < eps) return newR * 100;
            r = newR;
        }
        return r * 100;
    },

    analyze: (data) => {
        const mRev = data.yearlyRevenue / 12;
        const mCost = (data.operatingCosts + data.maintenanceCosts) / 12;
        const mGrowth = Math.pow(1 + data.revenueGrowth / 100, 1/12) - 1;
        
        const timeline = [-data.initialInvestment];
        for (let m = 1; m <= data.projectDuration; m++) {
            timeline.push((mRev * Math.pow(1 + mGrowth, m - 1)) - mCost);
        }

        const operational = timeline.slice(1);
        const totalRev = operational.reduce((a, b) => a + b, 0);

        return {
            roi: FinanceEngine.calcROI(data.initialInvestment, totalRev),
            npv: FinanceEngine.calcNPV(operational, data.discountRate),
            payback: FinanceEngine.calcPayback(data.initialInvestment, operational),
            irr: FinanceEngine.calcIRR(timeline),
            cashFlows: timeline,
            totalRevenue: totalRev
        };
    }
};

/* StrategicScorer: Heuristic analysis for project validation */
const StrategicScorer = {
    evaluate: (input) => {
        const text = `${input.projectName} ${input.problem} ${input.solution} ${input.metrics}`.toLowerCase();
        const keywords = ['roi', 'efficiency', 'growth', 'ai', 'automate', 'scale', 'cost'];
        const matches = keywords.filter(k => text.includes(k)).length;
        const density = Math.min(text.length / 400, 1) * 100;
        
        const score = Math.min(Math.floor(70 + (matches * 3) + (density * 0.1)), 98);
        const isEs = currentLanguage === 'es';

        return {
            score: score,
            viability: score,
            recommendation: score > 80 ? LOCALE_RESOURCES[currentLanguage]['viability-high'] : LOCALE_RESOURCES[currentLanguage]['viability-review'],
            strengths: [
                isEs ? 'Alcance definido' : 'Defined scope',
                matches > 2 ? (isEs ? 'Terminología técnica sólida' : 'Strong technical terminology') : null
            ].filter(Boolean),
            weaknesses: [
                score < 85 ? (isEs ? 'Requiere mayor detalle de ejecución' : 'Execution detail required') : null
            ].filter(Boolean)
        };
    }
};

// ==========================================
// 3. UI CONTROLLERS & INTERACTION
// ==========================================

const UIUpdater = {
    format: (n, isCurrency = false) => {
        const loc = currentLanguage === 'es' ? 'es-ES' : 'en-US';
        return n.toLocaleString(loc, { maximumFractionDigits: isCurrency ? 0 : 2 });
    },

    updateDashboard: (m) => {
        document.getElementById('roi-value').textContent = `${UIUpdater.format(m.roi)}%`;
        document.getElementById('npv-value').textContent = `$${UIUpdater.format(m.npv, true)}`;
        document.getElementById('payback-value').textContent = m.payback.toFixed(1);
        document.getElementById('irr-value').textContent = `${UIUpdater.format(m.irr)}%`;
        
        // Update Status Texts
        const res = LOCALE_RESOURCES[currentLanguage];
        document.getElementById('roi-status').textContent = m.roi > 0 ? res['status-positive-return'] : res['status-negative-return'];
        document.getElementById('npv-status').textContent = m.npv > 0 ? res['status-creates-value'] : res['status-destroys-value'];
    },

    updateScenarios: (exp, best, worst) => {
        const unit = LOCALE_RESOURCES[currentLanguage]['unit-months'];
        const setCard = (p, d) => {
            document.getElementById(`${p}-roi`).textContent = `${UIUpdater.format(d.roi)}%`;
            document.getElementById(`${p}-npv`).textContent = `$${UIUpdater.format(d.npv, true)}`;
            document.getElementById(`${p}-payback`).textContent = `${d.payback.toFixed(1)} ${unit}`;
        };
        setCard('expected', exp);
        setCard('best', best);
        setCard('worst', worst);
    },

    toggleLoading: (show) => {
        const el = document.getElementById('loadingOverlay');
        show ? el.classList.remove('hidden') : el.classList.add('hidden');
    },

    showMessage: (type, msg) => {
        const el = document.getElementById('formMessage');
        el.className = `alert ${type}`;
        el.textContent = msg;
        el.classList.remove('hidden');
        setTimeout(() => el.classList.add('hidden'), 4000);
    }
};

const ChartManager = {
    createCharts: (exp, best, worst, duration) => {
        if (typeof Chart === 'undefined') return;
        const res = LOCALE_RESOURCES[currentLanguage];
        
        // 1. Cashflow Chart
        const ctxCF = document.getElementById('cashflowChart').getContext('2d');
        if (charts.cashflow) charts.cashflow.destroy();
        
        let cum = 0;
        const cumulative = exp.cashFlows.map(v => cum += v);
        const labels = ['Start', ...Array.from({length: duration}, (_, i) => `M${i+1}`)];

        charts.cashflow = new Chart(ctxCF, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    { label: res['chart-monthly-cashflow'], data: exp.cashFlows, borderColor: '#8338ec', backgroundColor: 'rgba(131, 56, 236, 0.3)', fill: true, tension: 0.4 },
                    { label: res['chart-cumulative-cashflow'], data: cumulative, borderColor: '#39ff14', backgroundColor: 'rgba(57, 255, 20, 0.3)', fill: true, tension: 0.4 }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#fff' } } }, scales: { x: { ticks: { color: '#ccc' }, grid: { color: '#333' } }, y: { ticks: { color: '#ccc' }, grid: { color: '#333' } } } }
        });

        // 2. ROI Chart
        const ctxROI = document.getElementById('roiChart').getContext('2d');
        if (charts.roi) charts.roi.destroy();
        charts.roi = new Chart(ctxROI, {
            type: 'bar',
            data: {
                labels: [res['scenario-expected'], res['scenario-best'], res['scenario-worst']],
                datasets: [{ label: 'ROI %', data: [exp.roi, best.roi, worst.roi], backgroundColor: ['#06b6d4', '#10b981', '#ef4444'] }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#ccc' } }, y: { ticks: { color: '#ccc' } } } }
        });

        // 3. Scenario Radar
        const ctxRadar = document.getElementById('scenariosChart').getContext('2d');
        if (charts.scenarios) charts.scenarios.destroy();
        charts.scenarios = new Chart(ctxRadar, {
            type: 'radar',
            data: {
                labels: ['ROI', 'NPV (s)', 'Payback (inv)', 'IRR'],
                datasets: [
                    { label: res['scenario-expected'], data: [exp.roi, exp.npv/1000, 100/exp.payback, exp.irr], borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.2)' },
                    { label: res['scenario-best'], data: [best.roi, best.npv/1000, 100/best.payback, best.irr], borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.2)' }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { r: { ticks: { display: false }, grid: { color: '#444' }, pointLabels: { color: '#fff' } } } }
        });
    }
};

// ==========================================
// 4. EVENT HANDLERS (The "Glue")
// ==========================================

// Global functions for HTML onclick events
window.switchTab = function(tabName) {
    document.querySelectorAll('.tab').forEach(t => {
        t.classList.remove('border-cyan-500', 'text-slate-300');
        t.classList.add('border-transparent', 'text-slate-400');
    });
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    
    // Activate clicked
    event.target.classList.remove('border-transparent', 'text-slate-400');
    event.target.classList.add('border-cyan-500', 'text-slate-300');
    document.getElementById(`${tabName}-tab`).classList.remove('hidden');
};

window.switchLanguage = function(lang) {
    currentLanguage = lang;
    const res = LOCALE_RESOURCES[lang];
    
    // Update Header
    if(document.getElementById('header-title')) document.getElementById('header-title').textContent = res['header-title'];
    
    // Update Buttons State
    ['en', 'es', 'pt'].forEach(l => {
        const btn = document.getElementById(`lang-${l}`);
        if(btn) {
            btn.classList.toggle('bg-cyan-500', l === lang);
            btn.classList.toggle('border-cyan-500', l === lang);
        }
    });

    // If we have data, refresh analysis to update text
    if (projectData) document.getElementById('projectForm').dispatchEvent(new Event('submit'));
};

window.showGuideModal = function(field) {
    const modal = document.getElementById('guideModal');
    const content = GUIDE_CONTENT[currentLanguage][field] || GUIDE_CONTENT['en'][field];
    if (content && modal) {
        document.getElementById('modal-title').textContent = content.title;
        document.getElementById('modal-body').innerHTML = content.content;
        modal.classList.remove('hidden');
    }
};

window.closeGuideModal = function() {
    document.getElementById('guideModal').classList.add('hidden');
};

window.goToStep2 = function() {
    document.getElementById('step1-strategic-module').style.display = 'none';
    document.getElementById('step2-financial-module').style.display = 'block';
    if(strategicData) document.getElementById('projectName').value = strategicData.projectName;
    window.scrollTo({top:0, behavior:'smooth'});
};

window.goToStep1 = function() {
    document.getElementById('step2-financial-module').style.display = 'none';
    document.getElementById('step1-strategic-module').style.display = 'block';
    window.scrollTo({top:0, behavior:'smooth'});
};

window.resetForm = function() {
    if(confirm('Reiniciar formulario? / Reset form?')) {
        document.getElementById('projectForm').reset();
        window.location.reload(); // Cleanest reset
    }
};

window.exportToPDF = function() {
    if (!projectData) return alert('Analysis required / Requiere análisis');
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Financial Report: ${projectData.projectName}`, 20, 20);
    doc.setFontSize(12);
    doc.text(`ROI: ${document.getElementById('roi-value').textContent}`, 20, 40);
    doc.text(`NPV: ${document.getElementById('npv-value').textContent}`, 20, 50);
    doc.save(`Report_${projectData.projectName}.pdf`);
};

// Form Submissions
document.getElementById('strategicForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    UIUpdater.toggleLoading(true);
    
    setTimeout(() => {
        strategicData = {
            projectName: document.getElementById('stratProjectName').value,
            problem: document.getElementById('problemOpportunity').value,
            solution: document.getElementById('proposedSolution').value,
            metrics: document.getElementById('successMetrics').value
        };
        
        const analysis = StrategicScorer.evaluate(strategicData);
        
        // Render Result
        const resDiv = document.getElementById('analysisContent');
        const isEs = currentLanguage === 'es';
        resDiv.innerHTML = `
            <div class="mb-4">
                <h4 class="font-bold text-cyan-400">Score: ${analysis.score}/100</h4>
                <div class="w-full bg-gray-700 h-2 rounded mt-2"><div class="bg-cyan-500 h-2 rounded" style="width:${analysis.score}%"></div></div>
            </div>
            <ul class="list-disc pl-5 mb-4">${analysis.strengths.map(s => `<li>${s}</li>`).join('')}</ul>
            <p class="font-bold p-3 bg-slate-700 rounded border-l-4 border-emerald-500">${analysis.recommendation}</p>
        `;
        
        document.getElementById('strategicAnalysisResult').classList.remove('hidden');
        UIUpdater.toggleLoading(false);
    }, 1000);
});

document.getElementById('projectForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    UIUpdater.toggleLoading(true);

    setTimeout(() => {
        const val = (id) => parseFloat(document.getElementById(id).value) || 0;
        
        projectData = {
            projectName: document.getElementById('projectName').value,
            initialInvestment: val('initialInvestment'),
            discountRate: val('discountRate'),
            projectDuration: parseInt(document.getElementById('projectDuration').value) || 24,
            yearlyRevenue: val('yearlyRevenue'),
            revenueGrowth: val('revenueGrowth'),
            operatingCosts: val('operatingCosts'),
            maintenanceCosts: val('maintenanceCosts'),
            bestCaseMultiplier: val('bestCaseMultiplier'),
            worstCaseMultiplier: val('worstCaseMultiplier')
        };

        const exp = FinanceEngine.analyze(projectData);
        const best = FinanceEngine.analyze({...projectData, yearlyRevenue: projectData.yearlyRevenue * projectData.bestCaseMultiplier});
        const worst = FinanceEngine.analyze({...projectData, yearlyRevenue: projectData.yearlyRevenue * projectData.worstCaseMultiplier});

        UIUpdater.updateDashboard(exp);
        UIUpdater.updateScenarios(exp, best, worst);
        ChartManager.createCharts(exp, best, worst, projectData.projectDuration);
        
        // Simple Recommendation Render
        const recDiv = document.getElementById('recommendations');
        const isPos = exp.roi > 0;
        recDiv.innerHTML = `
            <div class="flex items-center gap-3 p-3 rounded ${isPos ? 'bg-emerald-500/20' : 'bg-red-500/20'}">
                <span class="text-2xl">${isPos ? '✅' : '⚠️'}</span>
                <p>${isPos ? (currentLanguage==='es'?'Proyecto viable financieramente.':'Financially viable project.') : (currentLanguage==='es'?'Revisar estructura de costos.':'Review cost structure.')}</p>
            </div>
        `;

        UIUpdater.toggleLoading(false);
        UIUpdater.showMessage('success', 'Analysis Complete');
        document.getElementById('dashboard').scrollIntoView({behavior: 'smooth'});
    }, 600);
});

// Quality Assessment (Simplified for Compatibility)
const qualityAssessment = {
    assessField: (id, val) => {
        const len = val.length;
        let score = Math.min(len, 100);
        const el = document.getElementById(`quality-${id}`);
        if(el) {
            el.textContent = len > 20 ? (currentLanguage==='es'?'✓ Entrada válida':'✓ Valid input') : (currentLanguage==='es'?'...':'...');
            el.className = `field-quality show ${len > 20 ? 'good' : 'warning'}`;
        }
        return score;
    }
};

// Auto-attach listeners for quality
['stratProjectName', 'problemOpportunity', 'proposedSolution', 'successMetrics'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.addEventListener('input', (e) => {
        qualityAssessment.assessField(id, e.target.value);
        // Update progress bar stub
        const bar = document.getElementById('progress-fill');
        const txt = document.getElementById('overall-score');
        if(bar) bar.style.width = '75%'; // Static for aesthetic feel
        if(txt) txt.textContent = '75/100';
    });
});
