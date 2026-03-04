# Honor-rioAdvocat-cios
import React, { useState, useRef } from "react";
import {
  Scale, FileText, DollarSign, CheckCircle, AlertCircle, Download,
  ArrowRight, Sparkles, TrendingUp, Shield, Clock, Target, MapPin,
  Edit3, RotateCcw, Eye, EyeOff, LogOut, Lock, Mail, ChevronRight,
  User, Building2, Hash, Camera, X, Save, BadgeCheck
} from "lucide-react";

// ─── CREDENCIAIS ──────────────────────────────────────────────────────────────
const USUARIOS = [
  { email: "adv@escritorio.com.br",   senha: "oab2025",  nome: "Dr. Carlos Mendes",   cargo: "Advogado Sênior" },
  { email: "admin@escritorio.com.br", senha: "admin123", nome: "Dra. Ana Paula Souza", cargo: "Sócia-Administradora" },
];

// ─── TABELAS OAB 2025 ─────────────────────────────────────────────────────────
const TABELAS_OAB = {
  SP: {
    label: "OAB/SP", horaIntelectual: 832.25,
    areas: {
      "Direito Trabalhista":    { minBase: 6600,  percentual: 0.20 },
      "Direito Cível":          { minBase: 5992,  percentual: 0.20 },
      "Direito Tributário":     { minBase: 9987,  percentual: 0.20 },
      "Direito Criminal":       { minBase: 9500,  percentual: 0.20 },
      "Direito de Família":     { minBase: 6658,  percentual: 0.20 },
      "Direito Empresarial":    { minBase: 8322,  percentual: 0.20 },
      "Direito Imobiliário":    { minBase: 5826,  percentual: 0.20 },
      "Direito do Consumidor":  { minBase: 4161,  percentual: 0.20 },
      "Direito Previdenciário": { minBase: 4994,  percentual: 0.20 },
      "Direito Administrativo": { minBase: 9987,  percentual: 0.20 },
    },
  },
  PR: {
    label: "OAB/PR", horaIntelectual: 720.00,
    areas: {
      "Direito Trabalhista":    { minBase: 5800,  percentual: 0.20 },
      "Direito Cível":          { minBase: 5200,  percentual: 0.20 },
      "Direito Tributário":     { minBase: 8700,  percentual: 0.20 },
      "Direito Criminal":       { minBase: 8200,  percentual: 0.20 },
      "Direito de Família":     { minBase: 5800,  percentual: 0.20 },
      "Direito Empresarial":    { minBase: 7200,  percentual: 0.20 },
      "Direito Imobiliário":    { minBase: 5000,  percentual: 0.20 },
      "Direito do Consumidor":  { minBase: 3600,  percentual: 0.20 },
      "Direito Previdenciário": { minBase: 4300,  percentual: 0.20 },
      "Direito Administrativo": { minBase: 8700,  percentual: 0.20 },
    },
  },
};

function calcularHonorarioBase(area, valorCausa, seccional) {
  const tabela = TABELAS_OAB[seccional] || TABELAS_OAB.SP;
  const config = tabela.areas[area] || { minBase: 6000, percentual: 0.20 };
  const porPercentual = valorCausa > 0 ? valorCausa * config.percentual : 0;
  let base = Math.max(config.minBase, porPercentual);
  if      (valorCausa > 5000000) base = Math.max(base, valorCausa * 0.08);
  else if (valorCausa > 2000000) base = Math.max(base, valorCausa * 0.10);
  else if (valorCausa > 1000000) base = Math.max(base, valorCausa * 0.12);
  else if (valorCausa > 500000)  base = Math.max(base, valorCausa * 0.15);
  else if (valorCausa > 200000)  base = Math.max(base, valorCausa * 0.18);
  return base;
}

const fmtBRL    = (v) => Number(v).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtBRLInt = (v) => Math.round(v).toLocaleString("pt-BR");
const parseStr  = (s) => { const n = parseFloat(String(s || "").replace(/[^\d,.]/g, "").replace(",", ".")); return isNaN(n) ? 0 : n; };

// ─── INLINE EDITABLE NUMBER ───────────────────────────────────────────────────
function InlineNumber({ value, onChange, min = 0, max, suffix = "", highlight = false, large = false }) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState("");
  const start  = () => { setRaw(String(value)); setEditing(true); };
  const commit = () => {
    const n = parseFloat(raw.replace(",", "."));
    if (!isNaN(n)) { let v = Math.max(min, n); if (max !== undefined) v = Math.min(max, v); onChange(v); }
    setEditing(false);
  };
  if (editing) {
    return (
      <input autoFocus type="number" value={raw} min={min} max={max}
        onChange={e => setRaw(e.target.value)} onBlur={commit}
        onKeyDown={e => { if (e.key === "Enter") commit(); if (e.key === "Escape") setEditing(false); }}
        className={`rounded-lg border-2 outline-none text-center font-black
          ${highlight ? "bg-white/20 border-white/60 text-white" : "bg-white border-purple-400 text-purple-700"}
          ${large ? "text-3xl w-36 py-1 px-2" : "text-xs w-16 py-0.5 px-1"}`}
      />
    );
  }
  return (
    <button onClick={start} title="Clique para editar"
      className={`group inline-flex items-center gap-1 font-black rounded-lg px-1 py-0.5 border-2 border-transparent cursor-pointer
        ${highlight ? "hover:bg-white/15 hover:border-white/40" : "hover:bg-purple-50 hover:border-purple-300"}
        ${large ? "text-4xl" : "text-xs"}`}>
      <span className={highlight ? "text-white" : large ? "text-purple-600" : "text-slate-600"}>
        {fmtBRLInt(value)}{suffix}
      </span>
      <Edit3 className={`opacity-0 group-hover:opacity-60 flex-shrink-0 ${highlight ? "text-white" : "text-purple-400"} ${large ? "w-5 h-5" : "w-3 h-3"}`} />
    </button>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  // AUTH
  const [usuario,    setUsuario]    = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginSenha, setLoginSenha] = useState("");
  const [loginErro,  setLoginErro]  = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // PERFIL
  const [perfilAberto, setPerfilAberto] = useState(false);
  const [perfil, setPerfil] = useState({ nome: "", oab: "", escritorio: "", logo: null });
  const [perfilTemp, setPerfilTemp] = useState({ nome: "", oab: "", escritorio: "", logo: null });
  const logoInputRef = useRef(null);

  const abrirPerfil = () => {
    setPerfilTemp({ ...perfil, nome: perfil.nome || (usuario ? usuario.nome : ""), escritorio: perfil.escritorio || "" });
    setPerfilAberto(true);
  };
  const salvarPerfil = () => { setPerfil({ ...perfilTemp }); setPerfilAberto(false); };
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPerfilTemp(p => ({ ...p, logo: ev.target.result }));
    reader.readAsDataURL(file);
  };

  // APP
  const [step,      setStep]      = useState(1);
  const [seccional, setSeccional] = useState("SP");
  const [caseData,  setCaseData]  = useState({
    area: "", description: "", value: "", urgency: "media",
    phase: "", clientExpectation: "", duration: "",
    successProbability: "media", challenges: "",
  });
  const [analysis,  setAnalysis]  = useState(null);
  const [proposal,  setProposal]  = useState(null);
  const [planEdits, setPlanEdits] = useState(null);
  const [origBase,  setOrigBase]  = useState(null);

  // ── LOGIN: totalmente síncrono, sem form, sem setTimeout ─────────────────
  const fazerLogin = () => {
    const user = USUARIOS.find(
      u => u.email.toLowerCase() === loginEmail.toLowerCase().trim()
        && u.senha === loginSenha
    );
    if (user) {
      setLoginErro("");
      setUsuario(user);
    } else {
      setLoginErro("E-mail ou senha incorretos.");
    }
  };

  const preencherDemo = (u) => {
    setLoginEmail(u.email);
    setLoginSenha(u.senha);
    setLoginErro("");
  };

  const fazerLogout = () => {
    setUsuario(null);
    setLoginEmail(""); setLoginSenha(""); setLoginErro("");
    setStep(1); setAnalysis(null); setProposal(null); setPlanEdits(null);
    setPerfilAberto(false);
    setCaseData({ area:"", description:"", value:"", urgency:"media", phase:"", clientExpectation:"", duration:"", successProbability:"media", challenges:"" });
  };

  // ── ANÁLISE ───────────────────────────────────────────────────────────────
  const hi = (f, v) => setCaseData(p => ({ ...p, [f]: v }));

  const analyzeCase = () => {
    const valorCausa = parseStr(caseData.value);
    let score = 0;
    if (valorCausa > 1000000) score += 2; else if (valorCausa > 200000) score++;
    if (caseData.urgency === "alta") score++;
    if (caseData.successProbability === "baixa") score++;
    if (caseData.challenges.length > 100) score++;
    const complexity = score <= 1 ? "baixa" : score >= 4 ? "alta" : "média";
    const services = [
      "Análise documental e estratégia processual",
      "Elaboração de peças processuais",
      "Acompanhamento processual completo",
      "Protocolo e peticionamento eletrônico",
      "Relatórios periódicos ao cliente",
    ];
    if (caseData.urgency === "alta")                services.push("Atendimento prioritário e plantão jurídico");
    if (/recurso/i.test(caseData.phase))            services.push("Recursos e manifestações recursais");
    if (/Trabalhista|Criminal/.test(caseData.area)) services.push("Representação em audiências");
    if (/consulta/i.test(caseData.phase))           services.push("Parecer técnico circunstanciado");
    if (valorCausa > 500000)                        services.push("Estratégia especializada para demanda de alto valor");
    setAnalysis({ complexity, score, services, valorCausa, riskLevel: caseData.successProbability === "alta" ? "baixo" : caseData.successProbability === "baixa" ? "alto" : "médio" });
    setStep(2);
  };

  const buildPlans = (base, ana) => [
    { key:"essencial",   name:"Essencial",   price:Math.round(base*0.70), description:"Serviços fundamentais para sua demanda",           services:ana.services.slice(0,4), downPayment:30, installments:2, highlight:false, badge:null },
    { key:"estrategico", name:"Estratégico", price:base,                  description:"Acompanhamento completo com estratégia otimizada", services:ana.services,            downPayment:25, installments:3, highlight:true,  badge:"Mais Escolhido" },
    { key:"premium",     name:"Premium",     price:Math.round(base*1.45), description:"Atendimento VIP com máxima dedicação",             services:[...ana.services,"Atendimento prioritário 24/7","Reuniões estratégicas mensais","Canal direto com o advogado responsável"], downPayment:20, installments:5, highlight:false, badge:null },
  ];

  const generateProposal = () => {
    const vc = analysis.valorCausa;
    let base = calcularHonorarioBase(caseData.area, vc, seccional);
    base = Math.round(base
      * (analysis.complexity === "baixa" ? 0.85 : analysis.complexity === "alta" ? 1.30 : 1.0)
      * (caseData.urgency === "alta" ? 1.30 : caseData.urgency === "baixa" ? 0.90 : 1.0)
      * (caseData.successProbability === "baixa" ? 1.20 : 1.0)
      * (/recurso/i.test(caseData.phase) ? 1.20 : 1.0)
    );
    setOrigBase(base);
    setPlanEdits(buildPlans(base, analysis));
    setProposal({ caseTitle:`${caseData.area} — ${caseData.description.substring(0,55)}...`, estimatedDuration:caseData.duration||"6 a 18 meses", disclaimer:`A contratação não garante resultado específico, mas assegura atuação técnica especializada, ética e comprometida com seus interesses. Valores calculados com base na Tabela ${TABELAS_OAB[seccional].label} 2025.`, baseValue:base, valorCausa:vc, seccional });
    setStep(3);
  };

  const resetToBase  = () => { if (origBase && analysis) setPlanEdits(buildPlans(origBase, analysis)); };
  const updatePlan   = (key, field, value) => setPlanEdits(p => p.map(pl => pl.key === key ? { ...pl, [field]: value } : pl));
  const calcParc     = (plan) => (plan.price - plan.price * plan.downPayment / 100) / (plan.installments || 1);

  const downloadProposal = () => {
    if (!proposal || !planEdits || !usuario) return;
    const nomeExibido = perfil.nome || usuario.nome;
    const oabExibido  = perfil.oab  ? `OAB ${perfil.oab}` : usuario.cargo;
    const escritorio  = perfil.escritorio || "";
    const logoHtml    = perfil.logo
      ? `<img src="${perfil.logo}" alt="Logo" style="max-height:70px;max-width:200px;object-fit:contain;margin-bottom:10px;display:block;margin-left:auto;margin-right:auto">`
      : "";
    const html = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Proposta</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif;color:#1e293b;padding:40px}
.hdr{text-align:center;border-bottom:4px solid #7c3aed;padding-bottom:18px;margin-bottom:24px}
.hdr h1{color:#7c3aed;font-size:24px;font-weight:900}.sec{background:#7c3aed;color:white;padding:8px 16px;border-radius:6px;font-size:15px;font-weight:800;margin:20px 0 12px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.item{background:#f8fafc;padding:10px;border-radius:6px;border-left:4px solid #7c3aed}
.lbl{font-size:10px;color:#64748b;font-weight:700;text-transform:uppercase}.val{font-size:14px;font-weight:700}
.plan{border:2px solid #e2e8f0;border-radius:10px;padding:20px;margin:14px 0;position:relative}
.plan.hl{background:linear-gradient(135deg,#7c3aed,#3b82f6);color:white;border:none;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.pbdg{position:absolute;top:-10px;right:20px;background:#f59e0b;color:white;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:800;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.ppr{font-size:32px;font-weight:900;color:#7c3aed;margin:6px 0}.plan.hl .ppr{color:white}
ul{list-style:none;padding:0;margin-top:8px}ul li{padding:5px 0 5px 22px;position:relative;font-size:12px}
ul li:before{content:"✓";position:absolute;left:0;color:#10b981;font-weight:900}
.plan.hl ul li:before{color:white}
.disc{background:#fef3c7;border-left:4px solid #f59e0b;padding:14px;border-radius:6px;margin:20px 0;font-size:12px;color:#78350f}
.ftr{text-align:center;margin-top:28px;padding-top:14px;border-top:2px solid #e2e8f0;font-size:11px;color:#64748b}
</style></head><body>
<div class="hdr">${logoHtml}<h1>PROPOSTA DE HONORÁRIOS ADVOCATÍCIOS</h1>${escritorio?`<p style="color:#7c3aed;font-weight:700;font-size:14px;margin-top:4px">${escritorio}</p>`:""}<p style="color:#64748b;margin-top:4px">${proposal.caseTitle}</p></div>
<div class="sec">📊 Análise do Caso</div>
<div class="grid">
<div class="item"><div class="lbl">Área</div><div class="val">${caseData.area}</div></div>
<div class="item"><div class="lbl">Valor da Causa</div><div class="val">${proposal.valorCausa>0?"R$ "+fmtBRL(proposal.valorCausa):"Não informado"}</div></div>
<div class="item"><div class="lbl">Complexidade</div><div class="val">${analysis.complexity}</div></div>
<div class="item"><div class="lbl">Honorário Base OAB</div><div class="val">R$ ${fmtBRLInt(proposal.baseValue)}</div></div>
</div>
<div class="sec">💼 Planos de Honorários</div>
${planEdits.map(plan=>{const iv=calcParc(plan),ent=Math.round(plan.price*plan.downPayment/100);return`<div class="plan ${plan.highlight?"hl":""}">
${plan.badge?`<div class="pbdg">⭐ ${plan.badge}</div>`:""}
<div style="text-align:center;border-bottom:1px solid ${plan.highlight?"rgba(255,255,255,.3)":"#e2e8f0"};padding-bottom:12px;margin-bottom:12px">
<div style="font-size:20px;font-weight:900">${plan.name}</div>
<div class="ppr">R$ ${fmtBRLInt(plan.price)}</div>
<div style="font-size:11px">Entrada ${plan.downPayment}% + ${plan.installments}x sem juros</div>
<div style="font-size:11px;opacity:.7">Entrada R$ ${fmtBRLInt(ent)} + ${plan.installments}x R$ ${fmtBRL(iv)}</div>
</div>
<strong>Serviços:</strong><ul>${plan.services.map(s=>`<li>${s}</li>`).join("")}</ul></div>`;}).join("")}
<div class="disc"><strong>⚠️ Importante:</strong> ${proposal.disclaimer}</div>
<div class="ftr"><p>Atenciosamente,</p><p style="margin-top:4px;font-size:14px"><strong>${nomeExibido}</strong></p><p style="margin-top:2px">${oabExibido}${escritorio?" · "+escritorio:""}</p>
<p style="margin-top:6px;font-size:10px">Emitido em ${new Date().toLocaleDateString("pt-BR")} · ${TABELAS_OAB[proposal.seccional].label} 2025</p></div>
</body></html>`;
    const blob = new Blob([html],{type:"text/html"});
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href=url; a.download=`proposta-${Date.now()}.html`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  // ════════════════════════════════════════════════════════════════════════════
  // TELA DE LOGIN
  // ════════════════════════════════════════════════════════════════════════════
  if (!usuario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600 rounded-full opacity-10 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600 rounded-full opacity-10 blur-3xl" />
          <div className="absolute inset-0 opacity-5" style={{backgroundImage:"linear-gradient(rgba(139,92,246,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.4) 1px,transparent 1px)",backgroundSize:"60px 60px"}} />
        </div>

        <div className="relative w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">

            {/* Cabeçalho */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 pt-10 pb-14 text-center relative">
              <div className="absolute inset-0 opacity-20" style={{backgroundImage:"radial-gradient(circle at 50% 130%,white,transparent 60%)"}} />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-4 shadow-xl ring-2 ring-white/30">
                  <Scale className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-2xl font-black text-white mb-1">Gerador de Propostas</h1>
                <p className="text-purple-200 text-sm">Sistema Jurídico · Tabela OAB 2025</p>
              </div>
            </div>

            {/* Corpo */}
            <div className="px-8 pb-10 pt-8">
              <p className="text-center text-slate-400 text-sm mb-7">Faça login para acessar o sistema</p>

              {/* E-mail */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && fazerLogin()}
                    placeholder="seu@escritorio.com.br"
                    className="w-full bg-white border border-slate-300 text-slate-900 placeholder-slate-400 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400/40 transition-all"
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={mostrarSenha ? "text" : "password"}
                    value={loginSenha}
                    onChange={e => setLoginSenha(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && fazerLogin()}
                    placeholder="••••••••"
                    className="w-full bg-white border border-slate-300 text-slate-900 placeholder-slate-400 rounded-2xl pl-11 pr-12 py-3.5 text-sm font-medium outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400/40 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(v => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {mostrarSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Erro */}
              {loginErro && (
                <div className="flex items-center gap-2 bg-red-500/15 border border-red-500/30 rounded-xl px-4 py-3 mb-5">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <p className="text-red-300 text-xs font-medium">{loginErro}</p>
                </div>
              )}

              {/* Botão — onClick puro, sem form */}
              <button
                type="button"
                onClick={fazerLogin}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl font-bold text-base hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                Entrar no Sistema <ChevronRight className="w-5 h-5" />
              </button>

              {/* Usuários demo */}
              <div className="mt-8 border-t border-white/8 pt-6">
                <p className="text-center text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">Acesso de demonstração</p>
                <div className="space-y-2">
                  {USUARIOS.map(u => (
                    <button
                      key={u.email}
                      type="button"
                      onClick={() => preencherDemo(u)}
                      className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-black text-white flex-shrink-0">
                        {u.nome.split(" ").map(n => n[0]).slice(0,2).join("")}
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-300 truncate">{u.nome}</p>
                        <p className="text-xs text-slate-500 truncate">{u.email}</p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-slate-600 text-xs mt-5">Tabela OAB/SP e OAB/PR 2025 · Uso interno</p>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SISTEMA PRINCIPAL
  // ════════════════════════════════════════════════════════════════════════════
  const legalAreas = Object.keys(TABELAS_OAB.SP.areas);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto p-6">

        {/* Título */}
        <div className="text-center mb-7 mt-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-5 shadow-xl">
            <Scale className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 mb-3">
            Gerador de Propostas Jurídicas
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Honorários calculados conforme a Tabela <span className="font-bold text-purple-600">OAB 2025</span>
          </p>
        </div>

        {/* Barra de usuário */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md px-5 py-3 mb-5 border border-purple-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {perfil.logo ? (
              <img src={perfil.logo} alt="logo" className="w-10 h-10 rounded-xl object-contain bg-white border border-purple-100 p-0.5 shadow flex-shrink-0" />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-black text-sm shadow flex-shrink-0">
                {(perfil.nome || usuario.nome).split(" ").map(n => n[0]).slice(0,2).join("")}
              </div>
            )}
            <div className="min-w-0">
              <p className="font-black text-slate-800 text-sm truncate">{perfil.nome || usuario.nome}</p>
              <p className="text-slate-500 text-xs truncate">{perfil.oab ? `OAB ${perfil.oab}` : usuario.cargo}{perfil.escritorio ? ` · ${perfil.escritorio}` : ""}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={abrirPerfil}
              className="flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-3 py-2 rounded-xl transition-all">
              <User className="w-3.5 h-3.5" /> Meu Perfil
            </button>
            <button onClick={fazerLogout}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-red-500 bg-slate-100 hover:bg-red-50 border border-slate-200 hover:border-red-200 px-3 py-2 rounded-xl transition-all">
              <LogOut className="w-3.5 h-3.5" /> Sair
            </button>
          </div>
        </div>

        {/* MODAL DE PERFIL */}
        {perfilAberto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md border border-purple-100 overflow-hidden">
              {/* Header do modal */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-black text-lg">Meu Perfil</h3>
                    <p className="text-purple-200 text-xs">Dados exibidos na proposta</p>
                  </div>
                </div>
                <button onClick={() => setPerfilAberto(false)}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all">
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* Logo */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Logo do Escritório</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden flex-shrink-0 relative group cursor-pointer"
                      onClick={() => logoInputRef.current?.click()}>
                      {perfilTemp.logo ? (
                        <>
                          <img src={perfilTemp.logo} alt="logo" className="w-full h-full object-contain p-1" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center rounded-2xl">
                            <Camera className="w-5 h-5 text-white" />
                          </div>
                        </>
                      ) : (
                        <div className="text-center">
                          <Camera className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                          <span className="text-xs text-slate-400 font-medium">Clique</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 font-medium mb-2">Clique na área ao lado para carregar a logo do seu escritório.</p>
                      <p className="text-xs text-slate-400">PNG, JPG ou SVG. Aparecerá no topo da proposta.</p>
                      {perfilTemp.logo && (
                        <button onClick={() => setPerfilTemp(p => ({...p, logo: null}))}
                          className="mt-2 text-xs text-red-500 hover:text-red-600 font-semibold flex items-center gap-1">
                          <X className="w-3 h-3" /> Remover logo
                        </button>
                      )}
                    </div>
                  </div>
                  <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                </div>

                {/* Nome */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-purple-500" /> Nome do Advogado(a)
                  </label>
                  <input type="text" placeholder="Ex: Dr. João Silva"
                    value={perfilTemp.nome}
                    onChange={e => setPerfilTemp(p => ({...p, nome: e.target.value}))}
                    className="w-full p-3.5 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all text-sm font-medium text-slate-800"
                  />
                </div>

                {/* OAB */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BadgeCheck className="w-3.5 h-3.5 text-purple-500" /> Número OAB
                  </label>
                  <input type="text" placeholder="Ex: SP 123.456"
                    value={perfilTemp.oab}
                    onChange={e => setPerfilTemp(p => ({...p, oab: e.target.value}))}
                    className="w-full p-3.5 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all text-sm font-medium text-slate-800"
                  />
                </div>

                {/* Escritório */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-purple-500" /> Nome do Escritório
                  </label>
                  <input type="text" placeholder="Ex: Silva & Associados Advogados"
                    value={perfilTemp.escritorio}
                    onChange={e => setPerfilTemp(p => ({...p, escritorio: e.target.value}))}
                    className="w-full p-3.5 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all text-sm font-medium text-slate-800"
                  />
                </div>

                {/* Preview */}
                {(perfilTemp.logo || perfilTemp.nome || perfilTemp.oab || perfilTemp.escritorio) && (
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-4">
                    <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-3">Preview na proposta</p>
                    <div className="flex items-center gap-3">
                      {perfilTemp.logo && <img src={perfilTemp.logo} alt="logo" className="h-10 w-auto max-w-[80px] object-contain" />}
                      <div>
                        {perfilTemp.escritorio && <p className="font-black text-slate-800 text-sm">{perfilTemp.escritorio}</p>}
                        {perfilTemp.nome && <p className="text-slate-700 text-xs font-semibold">{perfilTemp.nome}</p>}
                        {perfilTemp.oab && <p className="text-purple-600 text-xs font-bold">OAB {perfilTemp.oab}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Botões */}
                <div className="flex gap-3 pt-1">
                  <button onClick={() => setPerfilAberto(false)}
                    className="flex-1 py-3 rounded-2xl font-bold text-sm border-2 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
                    Cancelar
                  </button>
                  <button onClick={salvarPerfil}
                    className="flex-1 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" /> Salvar Perfil
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Seccional */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-5 mb-5 border border-purple-100">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-purple-600" />
            <span className="font-bold text-slate-700">Seccional da OAB</span>
          </div>
          <div className="flex gap-3">
            {Object.entries(TABELAS_OAB).map(([key, t]) => (
              <button key={key} onClick={() => setSeccional(key)}
                className={`px-6 py-3 rounded-xl font-bold transition-all text-sm ${seccional === key ? "bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg scale-105" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stepper */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-7 mb-6 border border-purple-100">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {[{Icon:FileText,label:"Dados",s:1},{Icon:TrendingUp,label:"Análise",s:2},{Icon:Sparkles,label:"Proposta",s:3}].map(({Icon,label,s},i,arr)=>(
              <React.Fragment key={s}>
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-2 transition-all ${step>=s?"bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg scale-110":"bg-slate-200 text-slate-400"}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className={`font-bold text-sm ${step>=s?"text-purple-600":"text-slate-400"}`}>{label}</span>
                </div>
                {i<arr.length-1&&(
                  <div className="flex-1 h-2 mx-3 rounded-full bg-slate-200 overflow-hidden">
                    <div className={`h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500 ${step>s?"w-full":"w-0"}`}/>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── STEP 1 ── */}
        {step===1&&(
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-purple-100">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-800">Informações do Caso</h2>
                <p className="text-slate-500 text-sm">Tabela {TABELAS_OAB[seccional].label} 2025 · Hora intelectual: R$ {TABELAS_OAB[seccional].horaIntelectual.toLocaleString("pt-BR")}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><Target className="w-4 h-4 text-purple-600"/>Área do Direito *</label>
                <select className="w-full p-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all bg-white font-medium"
                  value={caseData.area} onChange={e=>hi("area",e.target.value)}>
                  <option value="">Selecione a área...</option>
                  {legalAreas.map(a=><option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><Clock className="w-4 h-4 text-blue-600"/>Fase Processual *</label>
                <input type="text" placeholder="Ex: Inicial, Recursal, Execução"
                  className="w-full p-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  value={caseData.phase} onChange={e=>hi("phase",e.target.value)}/>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><DollarSign className="w-4 h-4 text-green-600"/>Valor da Causa</label>
                <input type="text" placeholder="Ex: 250000"
                  className="w-full p-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
                  value={caseData.value} onChange={e=>hi("value",e.target.value)}/>
                {caseData.area&&parseStr(caseData.value)>0&&(
                  <p className="mt-1 text-xs text-green-700 font-semibold bg-green-50 rounded-lg px-2 py-1">
                    ✓ R$ {parseStr(caseData.value).toLocaleString("pt-BR")} → Mínimo tabela: R$ {fmtBRLInt(calcularHonorarioBase(caseData.area,parseStr(caseData.value),seccional))}
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Descrição do Caso *</label>
                <textarea rows={3} placeholder="Descreva brevemente a situação jurídica..."
                  className="w-full p-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all resize-none"
                  value={caseData.description} onChange={e=>hi("description",e.target.value)}/>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Urgência</label>
                <div className="grid grid-cols-3 gap-2">
                  {["baixa","media","alta"].map(l=>(
                    <button key={l} type="button" onClick={()=>hi("urgency",l)}
                      className={`p-3 rounded-xl font-semibold text-sm transition-all ${caseData.urgency===l?"bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg scale-105":"bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                      {l.charAt(0).toUpperCase()+l.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Probabilidade de Êxito</label>
                <div className="grid grid-cols-3 gap-2">
                  {["baixa","media","alta"].map(l=>(
                    <button key={l} type="button" onClick={()=>hi("successProbability",l)}
                      className={`p-3 rounded-xl font-semibold text-sm transition-all ${caseData.successProbability===l?"bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-lg scale-105":"bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                      {l.charAt(0).toUpperCase()+l.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Expectativa do Cliente</label>
                <input type="text" placeholder="O que o cliente busca alcançar?"
                  className="w-full p-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all"
                  value={caseData.clientExpectation} onChange={e=>hi("clientExpectation",e.target.value)}/>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Duração Estimada</label>
                <input type="text" placeholder="Ex: 12 a 24 meses"
                  className="w-full p-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  value={caseData.duration} onChange={e=>hi("duration",e.target.value)}/>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Principais Desafios</label>
                <textarea rows={3} placeholder="Quais os principais riscos e desafios do caso?"
                  className="w-full p-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all resize-none"
                  value={caseData.challenges} onChange={e=>hi("challenges",e.target.value)}/>
              </div>
            </div>
            <button onClick={analyzeCase} disabled={!caseData.area||!caseData.description||!caseData.phase}
              className="mt-7 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3">
              Analisar Caso <ArrowRight className="w-6 h-6"/>
            </button>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step===2&&analysis&&(
          <div className="space-y-5">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-purple-100">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white"/>
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-800">Análise Completa</h2>
                  <p className="text-slate-500 text-sm">Tabela {TABELAS_OAB[seccional].label} 2025</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 mb-7">
                {[
                  {label:"Complexidade",    value:analysis.complexity,  cls:"from-blue-500 to-blue-600",     Icon:Shield},
                  {label:"Nível de Risco",  value:analysis.riskLevel,   cls:"from-green-500 to-emerald-600", Icon:AlertCircle},
                  {label:"Serviços",        value:analysis.services.length+" itens", cls:"from-purple-500 to-purple-600", Icon:CheckCircle},
                  {label:"Honorário Mín.",  value:analysis.valorCausa>0?"R$ "+fmtBRLInt(Math.round(calcularHonorarioBase(caseData.area,analysis.valorCausa,seccional))):"Mín. Tabela", cls:"from-amber-500 to-orange-600", Icon:DollarSign},
                ].map(({label,value,cls,Icon})=>(
                  <div key={label} className={`bg-gradient-to-br ${cls} p-5 rounded-2xl text-white shadow-xl`}>
                    <Icon className="w-7 h-7 opacity-80 mb-2"/>
                    <div className="text-xl font-black capitalize leading-tight">{value}</div>
                    <div className="text-white/75 font-semibold text-xs mt-1">{label}</div>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-purple-50 p-6 rounded-2xl border-2 border-purple-200">
                <h3 className="font-black text-lg text-slate-800 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600"/>Serviços Recomendados
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {analysis.services.map((svc,i)=>(
                    <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                      <div className="w-5 h-5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-white"/>
                      </div>
                      <span className="text-slate-700 font-medium text-sm">{svc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={()=>setStep(1)} className="flex-1 bg-white/80 border-2 border-slate-300 text-slate-700 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">Voltar</button>
              <button onClick={generateProposal} className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3">
                Gerar Proposta <Sparkles className="w-6 h-6"/>
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 ── */}
        {step===3&&proposal&&planEdits&&(
          <div className="space-y-5">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-purple-100">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mb-4">
                  <DollarSign className="w-8 h-8 text-white"/>
                </div>
                <h2 className="text-4xl font-black text-slate-800 mb-1">Proposta de Honorários</h2>
                <p className="text-slate-500 text-sm mb-2">{proposal.caseTitle}</p>
                <span className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-bold">
                  {TABELAS_OAB[proposal.seccional].label} 2025 · Base: R$ {fmtBRLInt(proposal.baseValue)}
                  {proposal.valorCausa>0&&` (${((proposal.baseValue/proposal.valorCausa)*100).toFixed(1)}% da causa)`}
                </span>
              </div>

              <div className="flex items-center justify-between bg-violet-50 border-2 border-violet-200 rounded-2xl px-5 py-3 mb-7">
                <div className="flex items-center gap-2 text-sm text-violet-700 font-semibold">
                  <Edit3 className="w-4 h-4 flex-shrink-0"/>
                  <span>Clique em qualquer <strong>valor</strong>, <strong>% entrada</strong> ou <strong>parcelas</strong> para editar.</span>
                </div>
                <button onClick={resetToBase} className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors ml-4 flex-shrink-0">
                  <RotateCcw className="w-3.5 h-3.5"/>Resetar
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-5 mb-7">
                {planEdits.map(plan=>{
                  const iv=calcParc(plan),ent=Math.round(plan.price*plan.downPayment/100),hl=plan.highlight;
                  return(
                    <div key={plan.key} className={`relative rounded-3xl p-7 flex flex-col transition-all ${hl?"bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-2xl scale-105 border-4 border-purple-300":"bg-white border-2 border-slate-200 hover:shadow-xl"}`}>
                      {plan.badge&&(
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-1.5 rounded-full text-sm font-black shadow-lg flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3"/>{plan.badge}
                          </div>
                        </div>
                      )}
                      <div className={`text-center mt-2 pb-4 mb-4 border-b ${hl?"border-white/20":"border-slate-100"}`}>
                        <h3 className={`text-2xl font-black mb-3 ${hl?"text-white":"text-slate-800"}`}>{plan.name}</h3>
                        <div className="flex items-baseline justify-center gap-1 mb-2">
                          <span className={`text-lg font-bold ${hl?"text-purple-200":"text-slate-400"}`}>R$</span>
                          <InlineNumber value={plan.price} onChange={v=>updatePlan(plan.key,"price",Math.round(v))} min={100} highlight={hl} large/>
                        </div>
                        <div className={`flex items-center justify-center gap-1 flex-wrap text-xs font-semibold mb-1 ${hl?"text-purple-100":"text-slate-500"}`}>
                          <span>Entrada</span>
                          <InlineNumber value={plan.downPayment} onChange={v=>updatePlan(plan.key,"downPayment",Math.min(100,Math.max(0,Math.round(v))))} min={0} max={100} suffix="%" highlight={hl}/>
                          <span>+</span>
                          <InlineNumber value={plan.installments} onChange={v=>updatePlan(plan.key,"installments",Math.min(60,Math.max(1,Math.round(v))))} min={1} max={60} suffix="x" highlight={hl}/>
                          <span>sem juros</span>
                        </div>
                        <div className={`text-xs mt-1 ${hl?"text-purple-200":"text-slate-400"}`}>
                          Entrada R$ {fmtBRLInt(ent)} + {plan.installments}x R$ {fmtBRL(iv)}
                        </div>
                      </div>
                      <p className={`text-center mb-4 text-xs font-medium ${hl?"text-purple-100":"text-slate-500"}`}>{plan.description}</p>
                      <div className="space-y-2 flex-1">
                        {plan.services.map((svc,si)=>(
                          <div key={si} className="flex items-start gap-2">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${hl?"bg-white/25":"bg-green-100"}`}>
                              <CheckCircle className={`w-3 h-3 ${hl?"text-white":"text-green-600"}`}/>
                            </div>
                            <span className={`text-xs font-medium ${hl?"text-white":"text-slate-600"}`}>{svc}</span>
                          </div>
                        ))}
                      </div>
                      <div className={`mt-4 pt-3 border-t text-center ${hl?"border-white/10":"border-slate-100"}`}>
                        <span className={`text-xs flex items-center justify-center gap-1 ${hl?"text-white/30":"text-slate-300"}`}>
                          <Edit3 className="w-3 h-3"/>Clique nos números para editar
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-white"/>
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 mb-1 text-sm">Importante</h4>
                    <p className="text-slate-600 font-medium leading-relaxed text-xs">{proposal.disclaimer}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button onClick={()=>setStep(2)} className="bg-white/80 border-2 border-slate-300 text-slate-700 py-4 px-8 rounded-2xl font-bold text-base hover:bg-slate-50 transition-all">Voltar</button>
              <button onClick={resetToBase} className="flex items-center gap-2 bg-white/80 border-2 border-violet-300 text-violet-700 py-4 px-6 rounded-2xl font-bold text-base hover:bg-violet-50 transition-all">
                <RotateCcw className="w-5 h-5"/>Resetar valores
              </button>
              <button onClick={downloadProposal} className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3">
                <Download className="w-5 h-5"/>Baixar Proposta HTML
              </button>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-7 border border-purple-100">
              <h3 className="font-black text-lg text-slate-800 mb-5">Resumo da Análise</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {label:"Área",           value:caseData.area,                                                              Icon:Target},
                  {label:"Seccional",      value:TABELAS_OAB[proposal.seccional].label+" 2025",                              Icon:MapPin},
                  {label:"Valor da Causa", value:proposal.valorCausa>0?"R$ "+fmtBRLInt(Math.round(proposal.valorCausa)):"Não informado", Icon:DollarSign},
                  {label:"Honorário Base", value:"R$ "+fmtBRLInt(proposal.baseValue),                                        Icon:Scale},
                  {label:"Complexidade",   value:analysis.complexity,                                                        Icon:Shield},
                  {label:"Duração",        value:proposal.estimatedDuration,                                                 Icon:Clock},
                ].map(({label,value,Icon})=>(
                  <div key={label} className="flex items-center gap-3 bg-gradient-to-r from-slate-50 to-purple-50 p-4 rounded-xl">
                    <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white"/>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{label}</div>
                      <div className="text-sm font-black text-slate-800 capitalize">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
