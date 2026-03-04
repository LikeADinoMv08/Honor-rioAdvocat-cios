import React, { useState } from "react";
import {
  Scale,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { USUARIOS } from "../utils/constants";
import { useNavigate } from "react-router-dom";

export default function Login({ setUsuario }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginSenha, setLoginSenha] = useState("");
  const [loginErro, setLoginErro] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  const fazerLogin = () => {
    const user = USUARIOS.find(
      (u) =>
        u.email.toLowerCase() === loginEmail.toLowerCase().trim() &&
        u.senha === loginSenha,
    );
    if (user) {
      setLoginErro("");
      setUsuario(user);
      navigate("/gerador");
    } else {
      setLoginErro("E-mail ou senha incorretos.");
    }
  };

  const preencherDemo = (u) => {
    setLoginEmail(u.email);
    setLoginSenha(u.senha);
    setLoginErro("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600 rounded-full opacity-10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.4) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Cabeçalho */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 pt-10 pb-14 text-center relative">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 130%,white,transparent 60%)",
              }}
            />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-4 shadow-xl ring-2 ring-white/30">
                <Scale className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-black text-white mb-1">
                Gerador de Propostas
              </h1>
              <p className="text-purple-200 text-sm">
                Sistema Jurídico · Tabela OAB 2025
              </p>
            </div>
          </div>

          {/* Corpo */}
          <div className="px-8 pb-10 pt-8">
            <p className="text-center text-slate-400 text-sm mb-7">
              Faça login para acessar o sistema
            </p>

            {/* E-mail */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && fazerLogin()}
                  placeholder="seu@escritorio.com.br"
                  className="w-full bg-white border border-slate-300 text-slate-900 placeholder-slate-400 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400/40 transition-all"
                />
              </div>
            </div>

            {/* Senha */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={mostrarSenha ? "text" : "password"}
                  value={loginSenha}
                  onChange={(e) => setLoginSenha(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && fazerLogin()}
                  placeholder="••••••••"
                  className="w-full bg-white border border-slate-300 text-slate-900 placeholder-slate-400 rounded-2xl pl-11 pr-12 py-3.5 text-sm font-medium outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400/40 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {mostrarSenha ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
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

            {/* Botão */}
            <button
              type="button"
              onClick={fazerLogin}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl font-bold text-base hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              Entrar no Sistema <ChevronRight className="w-5 h-5" />
            </button>

            {/* Usuários demo */}
            <div className="mt-8 border-t border-white/8 pt-6">
              <p className="text-center text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">
                Acesso de demonstração
              </p>
              <div className="space-y-2">
                {USUARIOS.map((u) => (
                  <button
                    key={u.email}
                    type="button"
                    onClick={() => preencherDemo(u)}
                    className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-black text-white flex-shrink-0">
                      {u.nome
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-300 truncate">
                        {u.nome}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {u.email}
                      </p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-slate-600 text-xs mt-5">
          Tabela OAB/SP e OAB/PR 2025 · Uso interno
        </p>
      </div>
    </div>
  );
}
