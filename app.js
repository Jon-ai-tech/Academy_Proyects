/**
 * Vanguard Crux | Financial Modeling Core
 * v2.0-stable 
 */

// ==========================================
// 1. CONFIGURATION & STATE
// ==========================================

let currentLanguage = 'es';
let projectData = null;
let strategicData = null;
let charts = { cashflow: null, roi: null, scenarios: null };

// ==========================================
// 2. LOCALIZATION RESOURCES (AUDITED)
// ==========================================

const LOCALE_RESOURCES = {
    en: {
        // --- Structure & Headers ---
        'header-title': 'Business Case Analyzer Pro',
        'header-subtitle': 'Professional Financial Analysis & ROI Calculator',
        'section-strategic': 'Strategic Analysis',
        'strategic-description': 'Start by defining the strategic foundation of your business case. Our AI will analyze the viability and provide insights.',
        'section-dashboard': 'Financial Dashboard',
        'section-project-info': 'Project Information',
        'section-visual-analysis': 'Visual Analysis',
        'section-scenarios': 'Scenario Comparison',
        'section-recommendations': 'Smart Recommendations',
        'section-export': 'Export Report',

        // --- Subsections (Calculator) ---
        'subsection-revenue': 'Revenue Projections',
        'subsection-costs': 'Cost Projections',
        'subsection-scenarios': 'Scenario Analysis',

        // --- Metric Cards ---
        'metric-label-roi': 'ROI (Return on Investment)',
        'metric-label-npv': 'NPV (Net Present Value)',
        'metric-label-payback': 'Payback Period',
        'metric-label-irr': 'IRR (Internal Rate of Return)',
        // Initial states
        'roi-status': 'Enter data to calculate',
        'npv-status': 'Discounted cash flow',
        'payback-status': 'Months to recover investment',
        'irr-status': 'Annualized return rate',

        // --- Strategic Form ---
        'label-stratProjectName': 'Project Name',
        'ph-stratProjectName': 'e.g., AI-Powered Customer Support Automation',
        'label-problemOpportunity': 'Problem/Opportunity Identified',
        'ph-problemOpportunity': 'e.g., Our support team spends 10 hours/week manually classifying tickets...',
        'label-proposedSolution': 'Proposed Solution',
        'ph-proposedSolution': 'e.g., Implement an AI triage agent for instant ticket classification...',
        'label-successMetrics': 'Success Metrics / ROI',
        'ph-successMetrics': 'e.g., Reduce classification time by 90% in Q1...',
        'analysis-title': 'Strategic Analysis Result',

        // --- Financial Form ---
        'label-projectName': 'Project Name',
        'ph-projectName': 'e.g., Digital Transformation',
        'label-initialInvestment': 'Initial Investment ($)',
        'label-discountRate': 'Discount Rate (%)',
        'label-projectDuration': 'Project Duration (months)',
        'label-yearlyRevenue': 'Annual Revenue Increase ($)',
        'label-revenueGrowth': 'Revenue Growth Rate (%)',
        'label-operatingCosts': 'Annual Operating Costs ($)',
        'label-maintenanceCosts': 'Annual Maintenance Costs ($)',
        'label-bestCaseMultiplier': 'Best Case Multiplier',
        'label-worstCaseMultiplier': 'Worst Case Multiplier',

        // --- Scenario Cards ---
        'title-expected': '📊 Expected Case',
        'title-best': '🚀 Best Case',
        'title-worst': '⚠️ Worst Case',
        'label-expected-roi': 'ROI:', 'label-expected-npv': 'NPV:', 'label-expected-payback': 'Payback:',
        'label-best-roi': 'ROI:', 'label-best-npv': 'NPV:', 'label-best-payback': 'Payback:',
        'label-worst-roi': 'ROI:', 'label-worst-npv': 'NPV:', 'label-worst-payback': 'Payback:',

        // --- Buttons & UI Elements ---
        'btn-generate-analysis': 'Generate Analysis',
        'btn-continue-financial': 'Continue to Financial Projection',
        'btn-back-step1': '← Back to Strategic Analysis',
        'btn-calculate': 'Calculate Analysis',
        'btn-reset': 'Reset Form',
        'btn-export': 'Export Full Report to PDF',
        'export-description': 'Generate a comprehensive PDF report with all metrics, charts and recommendations.',
        'default-recommendations': 'Complete the form and calculate to receive smart recommendations based on your business case.',
        'progress-title': 'Business Case Quality Score',

        // --- Tabs & Charts ---
        'tab-cashflow': 'Cash Flow Over Time',
        'tab-roi': 'ROI Comparison',
        'tab-scenarios': 'Scenario Analysis',
        'chart-monthly-cashflow': 'Net Monthly Flow',
        'chart-cumulative-cashflow': 'Cumulative Position',
        'scenario-expected': 'Base Case',
        'scenario-best': 'Upside Case',
        'scenario-worst': 'Downside Case',
        'unit-months': 'mo',

        // --- Dynamic Status ---
        'status-positive-return': '✓ Positive Return',
        'status-negative-return': '✗ Negative Return',
        'status-creates-value': '✓ Creates Value',
        'status-destroys-value': '✗ Destroys Value',
        'viability-high': 'HIGH VIABILITY - Proceed to Financials',
        'viability-review': 'REVIEW NEEDED - Refine Strategy'
    },
    es: {
        // --- Structure & Headers ---
        'header-title': 'Analizador de Casos de Negocio Pro',
        'header-subtitle': 'Análisis Financiero Profesional y Calculadora de ROI',
        'section-strategic': 'Análisis Estratégico',
        'strategic-description': 'Comience definiendo la base estratégica de su caso de negocio. El motor analizará la viabilidad.',
        'section-dashboard': 'Panel Financiero',
        'section-project-info': 'Información del Proyecto',
        'section-visual-analysis': 'Análisis Visual',
        'section-scenarios': 'Comparación de Escenarios',
        'section-recommendations': 'Recomendaciones Inteligentes',
        'section-export': 'Exportar Reporte',

        // --- Subsections (Calculator) ---
        'subsection-revenue': 'Proyección de Ingresos',
        'subsection-costs': 'Proyección de Costos',
        'subsection-scenarios': 'Análisis de Escenarios',

        // --- Metric Cards ---
        'metric-label-roi': 'ROI (Retorno de Inversión)',
        'metric-label-npv': 'VPN (Valor Presente Neto)',
        'metric-label-payback': 'Período de Recuperación',
        'metric-label-irr': 'TIR (Tasa Interna de Retorno)',
        // Initial states
        'roi-status': 'Ingrese datos para calcular',
        'npv-status': 'Flujo de caja descontado',
        'payback-status': 'Meses para recuperar inversión',
        'irr-status': 'Tasa de retorno anualizada',

        // --- Strategic Form ---
        'label-stratProjectName': 'Nombre del Proyecto',
        'ph-stratProjectName': 'ej., Automatización de soporte al cliente basada en IA',
        'label-problemOpportunity': 'Problema/Oportunidad',
        'ph-problemOpportunity': 'ej., Nuestro equipo de soporte pasa 10 horas/semana clasificando tickets...',
        'label-proposedSolution': 'Solución Propuesta',
        'ph-proposedSolution': 'ej., Implementar un agente de clasificación de tickets basado en IA...',
        'label-successMetrics': 'Métricas de Éxito / ROI',
        'ph-successMetrics': 'ej., Reducir el tiempo de clasificación en un 90% en Q1...',
        'analysis-title': 'Resultado del Análisis Estratégico',

        // --- Financial Form ---
        'label-projectName': 'Nombre del Proyecto',
        'ph-projectName': 'ej., Transformación Digital',
        'label-initialInvestment': 'Inversión Inicial ($)',
        'label-discountRate': 'Tasa de Descuento (%)',
        'label-projectDuration': 'Duración del Proyecto (meses)',
        'label-yearlyRevenue': 'Incremento de Ingresos ($)',
        'label-revenueGrowth': 'Tasa Crecimiento Ingresos (%)',
        'label-operatingCosts': 'Costos Operativos Anuales ($)',
        'label-maintenanceCosts': 'Costos Mantenimiento Anuales ($)',
        'label-bestCaseMultiplier': 'Multiplicador Mejor Caso',
        'label-worstCaseMultiplier': 'Multiplicador Peor Caso',

        // --- Scenario Cards ---
        'title-expected': '📊 Caso Esperado',
        'title-best': '🚀 Caso Optimista',
        'title-worst': '⚠️ Caso Pesimista',
        'label-expected-roi': 'ROI:', 'label-expected-npv': 'VPN:', 'label-expected-payback': 'Recup.:',
        'label-best-roi': 'ROI:', 'label-best-npv': 'VPN:', 'label-best-payback': 'Recup.:',
        'label-worst-roi': 'ROI:', 'label-worst-npv': 'VPN:', 'label-worst-payback': 'Recup.:',

        // --- Buttons & UI Elements ---
        'btn-generate-analysis': 'Generar Análisis',
        'btn-continue-financial': 'Continuar a Proyección Financiera',
        'btn-back-step1': '← Volver a Análisis Estratégico',
        'btn-calculate': 'Calcular Análisis',
        'btn-reset': 'Reiniciar Formulario',
        'btn-export': 'Exportar Reporte PDF',
        'export-description': 'Genere un reporte PDF completo con todas las métricas, gráficos y recomendaciones.',
        'default-recommendations': 'Complete el formulario y calcule para recibir recomendaciones inteligentes basadas en su análisis.',
        'progress-title': 'Puntaje de Calidad del Caso',

        // --- Tabs & Charts ---
        'tab-cashflow': 'Flujo de Caja en el Tiempo',
        'tab-roi': 'Comparación de ROI',
        'tab-scenarios': 'Análisis de Escenarios',
        'chart-monthly-cashflow': 'Flujo Mensual Neto',
        'chart-cumulative-cashflow': 'Posición Acumulada',
        'scenario-expected': 'Caso Base',
        'scenario-best': 'Caso Optimista',
        'scenario-worst': 'Caso Pesimista',
        'unit-months': 'meses',

        // --- Dynamic Status ---
        'status-positive-return': '✓ Retorno Positivo',
        'status-negative-return': '✗ Retorno Negativo',
        'status-creates-value': '✓ Genera Valor',
        'status-destroys-value': '✗ Destruye Valor',
        'viability-high': 'ALTA VIABILIDAD - Proceder a Financiero',
        'viability-review': 'REVISIÓN REQUERIDA - Refinar Estrategia'
    },
    pt: {
        // --- Structure & Headers ---
        'header-title': 'Analisador de Casos de Negócio Pro',
        'header-subtitle': 'Análise Financeira Profissional e Calculadora de ROI',
        'section-strategic': 'Análise Estratégica',
        'strategic-description': 'Comece definindo a base estratégica do seu caso de negócio.',
        'section-dashboard': 'Painel Financeiro',
        'section-project-info': 'Informações do Projeto',
        'section-visual-analysis': 'Análise Visual',
        'section-scenarios': 'Comparação de Cenários',
        'section-recommendations': 'Recomendações Inteligentes',
        'section-export': 'Exportar Relatório',

        // --- Subsections (Calculator) ---
        'subsection-revenue': 'Projeção de Receita',
        'subsection-costs': 'Projeção de Custos',
        'subsection-scenarios': 'Análise de Cenários',

        // --- Metric Cards ---
        'metric-label-roi': 'ROI (Retorno sobre Investimento)',
        'metric-label-npv': 'VPL (Valor Presente Líquido)',
        'metric-label-payback': 'Payback',
        'metric-label-irr': 'TIR (Taxa Interna de Retorno)',
        // Initial states
        'roi-status': 'Insira dados para calcular',
        'npv-status': 'Fluxo de caixa descontado',
        'payback-status': 'Meses para recuperar investimento',
        'irr-status': 'Taxa de retorno anualizada',

        // --- Strategic Form ---
        'label-stratProjectName': 'Nome do Projeto',
        'ph-stratProjectName': 'ex., Automação de suporte ao cliente',
        'label-problemOpportunity': 'Problema/Oportunidade',
        'ph-problemOpportunity': 'ex., Nossa equipe gasta 10 horas/semana...',
        'label-proposedSolution': 'Solução Proposta',
        'ph-proposedSolution': 'ex., Implementar um agente de triagem...',
        'label-successMetrics': 'Métricas de Sucesso / ROI',
        'ph-successMetrics': 'ex., Reduzir o tempo de classificação em 90%...',
        'analysis-title': 'Resultado da Análise Estratégica',

        // --- Financial Form ---
        'label-projectName': 'Nome do Projeto',
        'ph-projectName': 'ex., Transformação Digital',
        'label-initialInvestment': 'Investimento Inicial ($)',
        'label-discountRate': 'Taxa de Desconto (%)',
        'label-projectDuration': 'Duração do Projeto (meses)',
        'label-yearlyRevenue': 'Aumento de Receita Anual ($)',
        'label-revenueGrowth': 'Taxa de Crescimento (%)',
        'label-operatingCosts': 'Custos Operacionais ($)',
        'label-maintenanceCosts': 'Custos de Manutenção ($)',
        'label-bestCaseMultiplier': 'Multiplicador Melhor Caso',
        'label-worstCaseMultiplier': 'Multiplicador Pior Caso',

        // --- Scenario Cards ---
        'title-expected': '📊 Caso Esperado',
        'title-best': '🚀 Caso Otimista',
        'title-worst': '⚠️ Caso Pessimista',
        'label-expected-roi': 'ROI:', 'label-expected-npv': 'VPL:', 'label-expected-payback': 'Payback:',
        'label-best-roi': 'ROI:', 'label-best-npv': 'VPL:', 'label-best-payback': 'Payback:',
        'label-worst-roi': 'ROI:', 'label-worst-npv': 'VPL:', 'label-worst-payback': 'Payback:',

        // --- Buttons & UI Elements ---
        'btn-generate-analysis': 'Gerar Análise',
        'btn-continue-financial': 'Continuar para Financeiro',
        'btn-back-step1': '← Voltar para Estratégico',
        'btn-calculate': 'Calcular Análise',
        'btn-reset': 'Redefinir Formulário',
        'btn-export': 'Exportar Relatório PDF',
        'export-description': 'Gere um relatório PDF completo com todas as métricas, gráficos e recomendações.',
        'default-recommendations': 'Preencha o formulário e calcule para receber recomendações inteligentes.',
        'progress-title': 'Pontuação de Qualidade',

        // --- Tabs & Charts ---
        'tab-cashflow': 'Fluxo de Caixa',
        'tab-roi': 'Comparação de ROI',
        'tab-scenarios': 'Análise de Cenários',
        'chart-monthly-cashflow': 'Fluxo Mensual Líquido',
        'chart-cumulative-cashflow': 'Posição Acumulada',
        'scenario-expected': 'Caso Base',
        'scenario-best': 'Caso Otimista',
        'scenario-worst': 'Caso Pessimista',
        'unit-months': 'meses',

        // --- Dynamic Status ---
        'status-positive-return': '✓ Retorno Positivo',
        'status-negative-return': '✗ Retorno Negativo',
        'status-creates-value': '✓ Gera Valor',
        'status-destroys-value': '✗ Destrói Valor',
        'viability-high': 'ALTA VIABILIDADE - Prosseguir',
        'viability-review': 'REVISÃO NECESSÁRIA - Refinar'
    }
};

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
// 3. CORE ENGINES (Logic Layer)
// ==========================================

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
// 4. UI CONTROLLERS
// ==========================================

const UIUpdater = {
    format: (n, isCurrency = false) => {
        const loc = currentLanguage === 'es' ? 'es-ES' : 'en-US';
        if (n === undefined || n === null || isNaN(n)) return "0";
        return n.toLocaleString(loc, { maximumFractionDigits: isCurrency ? 0 : 2 });
    },

    updateDashboard: (m) => {
        document.getElementById('roi-value').textContent = `${UIUpdater.format(m.roi)}%`;
        document.getElementById('npv-value').textContent = `$${UIUpdater.format(m.npv, true)}`;
        document.getElementById('payback-value').textContent = m.payback.toFixed(1);
        document.getElementById('irr-value').textContent = `${UIUpdater.format(m.irr)}%`;
        
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
        if (el) show ? el.classList.remove('hidden') : el.classList.add('hidden');
    },

    showMessage: (type, msg) => {
        const el = document.getElementById('formMessage');
        if (el) {
            el.className = `alert ${type}`;
            el.textContent = msg;
            el.classList.remove('hidden');
            setTimeout(() => el.classList.add('hidden'), 4000);
        }
    }
};

const ChartManager = {
    createCharts: (exp, best, worst, duration) => {
        if (typeof Chart === 'undefined') return;
        const res = LOCALE_RESOURCES[currentLanguage];
        
        const initChart = (id, prevChart, config) => {
            const el = document.getElementById(id);
            if (!el) return null;
            const existing = Chart.getChart(id);
            if (existing) existing.destroy();
            if (prevChart && prevChart.destroy) prevChart.destroy();
            return new Chart(el.getContext('2d'), config);
        };

        const labels = ['Start', ...Array.from({length: duration}, (_, i) => `M${i+1}`)];
        let cum = 0;
        const cumulative = exp.cashFlows.map(v => cum += v);

        // 1. Cashflow
        charts.cashflow = initChart('cashflowChart', charts.cashflow, {
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

        // 2. ROI
        charts.roi = initChart('roiChart', charts.roi, {
            type: 'bar',
            data: {
                labels: [res['scenario-expected'], res['scenario-best'], res['scenario-worst']],
                datasets: [{ label: 'ROI %', data: [exp.roi, best.roi, worst.roi], backgroundColor: ['#06b6d4', '#10b981', '#ef4444'] }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#ccc' } }, y: { ticks: { color: '#ccc' } } } }
        });

        // 3. Radar
        charts.scenarios = initChart('scenariosChart', charts.scenarios, {
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
// 5. EVENT HANDLERS & HELPERS
// ==========================================

const updateFormText = (lang) => {
    const res = LOCALE_RESOURCES[lang];
    // List of ALL dynamic IDs in the HTML
    const textIds = [
        // Structural
        'header-title', 'header-subtitle', 'section-strategic', 'strategic-description',
        'section-dashboard', 'section-project-info', 'section-visual-analysis',
        'section-scenarios', 'section-recommendations', 'section-export',
        
        // Calculator Subsections
        'subsection-revenue', 'subsection-costs', 'subsection-scenarios',
        
        // Metric Cards (Labels & Default States)
        'metric-label-roi', 'metric-label-npv', 'metric-label-payback', 'metric-label-irr',
        'roi-status', 'npv-status', 'payback-status', 'irr-status',

        // Strategic Inputs
        'label-stratProjectName', 'label-problemOpportunity', 'label-proposedSolution', 'label-successMetrics',
        'analysis-title', 'progress-title',

        // Financial Inputs
        'label-projectName', 'label-initialInvestment', 'label-discountRate', 'label-projectDuration',
        'label-yearlyRevenue', 'label-revenueGrowth', 'label-operatingCosts', 'label-maintenanceCosts',
        'label-bestCaseMultiplier', 'label-worstCaseMultiplier',
        
        // Scenario Cards
        'title-expected', 'title-best', 'title-worst',
        'label-expected-roi', 'label-expected-npv', 'label-expected-payback',
        'label-best-roi', 'label-best-npv', 'label-best-payback',
        'label-worst-roi', 'label-worst-npv', 'label-worst-payback',

        // Footer & Extras
        'export-description', 'default-recommendations',

        // Buttons & Tabs
        'btn-generate-analysis', 'btn-continue-financial', 'btn-back-step1', 'btn-calculate', 'btn-reset', 'btn-export',
        'tab-cashflow', 'tab-roi', 'tab-scenarios'
    ];
    
    // Update Text Content
    textIds.forEach(id => {
        const el = document.getElementById(id);
        if (el && res[id]) el.textContent = res[id];
    });

    // Update Placeholders
    const phMap = {
        'stratProjectName': 'ph-stratProjectName',
        'problemOpportunity': 'ph-problemOpportunity',
        'proposedSolution': 'ph-proposedSolution',
        'successMetrics': 'ph-successMetrics',
        'projectName': 'ph-projectName'
    };
    Object.keys(phMap).forEach(id => {
        const el = document.getElementById(id);
        if (el && res[phMap[id]]) el.placeholder = res[phMap[id]];
    });
};

window.switchTab = function(tabName) {
    document.querySelectorAll('.tab').forEach(t => {
        t.classList.remove('border-cyan-500', 'text-slate-300');
        t.classList.add('border-transparent', 'text-slate-400');
    });
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    
    const active = document.getElementById(`${tabName}-tab`);
    if (active) active.classList.remove('hidden');
    
    const btn = event?.target;
    if (btn) {
        btn.classList.remove('border-transparent', 'text-slate-400');
        btn.classList.add('border-cyan-500', 'text-slate-300');
    }
};

window.switchLanguage = function(lang) {
    currentLanguage = lang;
    updateFormText(lang);
    
    ['en', 'es', 'pt'].forEach(l => {
        const btn = document.getElementById(`lang-${l}`);
        if(btn) {
            btn.classList.toggle('bg-cyan-500', l === lang);
            btn.classList.toggle('border-cyan-500', l === lang);
        }
    });

    // Re-render analysis/charts if data exists to update localized labels inside them
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
        window.location.reload(); 
    }
};

window.exportToPDF = function() {
    if (!projectData) return alert('Analysis required / Requiere análisis');
    if (typeof window.jspdf === 'undefined') return alert('PDF Library missing');
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Financial Report: ${projectData.projectName}`, 20, 20);
    doc.setFontSize(12);
    doc.text(`ROI: ${document.getElementById('roi-value').textContent}`, 20, 40);
    doc.text(`NPV: ${document.getElementById('npv-value').textContent}`, 20, 50);
    doc.save(`Report_${projectData.projectName}.pdf`);
};

// ==========================================
// 6. MAIN LISTENERS
// ==========================================

document.getElementById('strategicForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    UIUpdater.toggleLoading(true);
    
    setTimeout(() => {
        try {
            strategicData = {
                projectName: document.getElementById('stratProjectName').value,
                problem: document.getElementById('problemOpportunity').value,
                solution: document.getElementById('proposedSolution').value,
                metrics: document.getElementById('successMetrics').value
            };
            
            const analysis = StrategicScorer.evaluate(strategicData);
            
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
        } catch (err) {
            console.error(err);
            alert("Error in calculation logic. Check console.");
        } finally {
            UIUpdater.toggleLoading(false);
        }
    }, 1000);
});

document.getElementById('projectForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    UIUpdater.toggleLoading(true);

    setTimeout(() => {
        try {
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
            
            const recDiv = document.getElementById('recommendations');
            const isPos = exp.roi > 0;
            recDiv.innerHTML = `
                <div class="flex items-center gap-3 p-3 rounded ${isPos ? 'bg-emerald-500/20' : 'bg-red-500/20'}">
                    <span class="text-2xl">${isPos ? '✅' : '⚠️'}</span>
                    <p>${isPos ? (currentLanguage==='es'?'Proyecto viable financieramente.':'Financially viable project.') : (currentLanguage==='es'?'Revisar estructura de costos.':'Review cost structure.')}</p>
                </div>
            `;
            
            UIUpdater.showMessage('success', 'Analysis Complete');
            document.getElementById('dashboard').scrollIntoView({behavior: 'smooth'});

        } catch (err) {
            console.error("Critical Engine Error:", err);
            alert("Error in calculation engine: " + err.message);
        } finally {
            UIUpdater.toggleLoading(false);
        }
    }, 600);
});

// Initialization
window.addEventListener('load', () => {
    switchLanguage('es');
});

// Quality Assessment (Compatibility)
const qualityAssessment = {
    assessField: (id, val) => {
        const len = val.length;
        const el = document.getElementById(`quality-${id}`);
        if(el) {
            el.textContent = len > 20 ? (currentLanguage==='es'?'✓ Entrada válida':'✓ Valid input') : '...';
            el.className = `field-quality show ${len > 20 ? 'good' : 'warning'}`;
        }
    }
};

['stratProjectName', 'problemOpportunity', 'proposedSolution', 'successMetrics'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.addEventListener('input', (e) => {
        qualityAssessment.assessField(id, e.target.value);
        const bar = document.getElementById('progress-fill');
        const txt = document.getElementById('overall-score');
        if(bar) bar.style.width = '75%';
        if(txt) txt.textContent = '75/100';
    });
});
