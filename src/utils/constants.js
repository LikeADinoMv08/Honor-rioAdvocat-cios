// ─── CREDENCIAIS ──────────────────────────────────────────────────────────────
export const USUARIOS = [
  {
    email: "adv@escritorio.com.br",
    senha: "oab2025",
    nome: "Dr. Carlos Mendes",
    cargo: "Advogado Sênior",
  },
  {
    email: "admin@escritorio.com.br",
    senha: "admin123",
    nome: "Dra. Ana Paula Souza",
    cargo: "Sócia-Administradora",
  },
];

// ─── TABELAS OAB 2025 ─────────────────────────────────────────────────────────
export const TABELAS_OAB = {
  SP: {
    label: "OAB/SP",
    horaIntelectual: 832.25,
    areas: {
      "Direito Trabalhista": { minBase: 6600, percentual: 0.2 },
      "Direito Cível": { minBase: 5992, percentual: 0.2 },
      "Direito Tributário": { minBase: 9987, percentual: 0.2 },
      "Direito Criminal": { minBase: 9500, percentual: 0.2 },
      "Direito de Família": { minBase: 6658, percentual: 0.2 },
      "Direito Empresarial": { minBase: 8322, percentual: 0.2 },
      "Direito Imobiliário": { minBase: 5826, percentual: 0.2 },
      "Direito do Consumidor": { minBase: 4161, percentual: 0.2 },
      "Direito Previdenciário": { minBase: 4994, percentual: 0.2 },
      "Direito Administrativo": { minBase: 9987, percentual: 0.2 },
    },
  },
  PR: {
    label: "OAB/PR",
    horaIntelectual: 720.0,
    areas: {
      "Direito Trabalhista": { minBase: 5800, percentual: 0.2 },
      "Direito Cível": { minBase: 5200, percentual: 0.2 },
      "Direito Tributário": { minBase: 8700, percentual: 0.2 },
      "Direito Criminal": { minBase: 8200, percentual: 0.2 },
      "Direito de Família": { minBase: 5800, percentual: 0.2 },
      "Direito Empresarial": { minBase: 7200, percentual: 0.2 },
      "Direito Imobiliário": { minBase: 5000, percentual: 0.2 },
      "Direito do Consumidor": { minBase: 3600, percentual: 0.2 },
      "Direito Previdenciário": { minBase: 4300, percentual: 0.2 },
      "Direito Administrativo": { minBase: 8700, percentual: 0.2 },
    },
  },
};
