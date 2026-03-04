import { TABELAS_OAB } from "./constants";

export function calcularHonorarioBase(area, valorCausa, seccional) {
  const tabela = TABELAS_OAB[seccional] || TABELAS_OAB.SP;
  const config = tabela.areas[area] || { minBase: 6000, percentual: 0.2 };
  const porPercentual = valorCausa > 0 ? valorCausa * config.percentual : 0;
  let base = Math.max(config.minBase, porPercentual);
  if (valorCausa > 5000000) base = Math.max(base, valorCausa * 0.08);
  else if (valorCausa > 2000000) base = Math.max(base, valorCausa * 0.1);
  else if (valorCausa > 1000000) base = Math.max(base, valorCausa * 0.12);
  else if (valorCausa > 500000) base = Math.max(base, valorCausa * 0.15);
  else if (valorCausa > 200000) base = Math.max(base, valorCausa * 0.18);
  return base;
}

export const fmtBRL = (v) =>
  Number(v).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const fmtBRLInt = (v) => Math.round(v).toLocaleString("pt-BR");

export const parseStr = (s) => {
  const n = parseFloat(
    String(s || "")
      .replace(/[^\d,.]/g, "")
      .replace(",", "."),
  );
  return isNaN(n) ? 0 : n;
};
