"use client";

import logoSrc from "@/public/image/logoMenu.png";
import { ChevronDown, ChevronUp, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ open, onClose }) => {
  const pathname = usePathname();

  const [cadastroOpen, setCadastroOpen] = useState(false);
  const [importacoesOpen, setImportacoesOpen] = useState(false);
  const [tarefasOpen, setTarefasOpen] = useState(false);
  const [agendamentoOpen, setAgendamentoOpen] = useState(false);
  const [conexoesOpen, setConexoesOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href ? "bg-white/20 font-semibold" : "hover:bg-white/10";

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-0" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#00264d] text-white transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Topbar */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-white/20">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt="Logo"
              width={120}
              height={32}
              className="hidden sm:block"
              priority
            />
          ) : (
            <span className="font-semibold text-lg">Menu</span>
          )}
          <button
            aria-label="Fechar menu"
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Navegação */}
        <nav className="p-4 space-y-6">
          {/* Dashboard e Kanban */}
          <div className="space-y-1">
            <Link
              href="/inicio"
              className={`block py-2 px-3 rounded ${isActive("/inicio")}`}
            >
              Dashboard
            </Link>
            <Link
              href="/kanban"
              className={`block py-2 px-3 rounded ${isActive("/kanban")}`}
            >
              Funis (Kanbans)
            </Link>
          </div>

          {/* Cadastro/Consulta */}
          <div>
            <button
              onClick={() => setCadastroOpen(!cadastroOpen)}
              className="w-full flex justify-between items-center text-left py-2 px-3 rounded hover:bg-white/10"
            >
              <span className="text-xs uppercase font-semibold text-white/70">
                Cadastros gerais
              </span>
              {cadastroOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
            {cadastroOpen && (
              <div className="mt-1 space-y-1 pl-4">
                <Link
                  href="/importacaoLeads"
                  className={`block py-2 px-3 rounded ${isActive(
                    "/importacaoLeads"
                  )}`}
                >
                  Cadastro de Clientes
                </Link>
                <Link
                  href="/tasks/new"
                  className={`block py-2 px-3 rounded ${isActive(
                    "/tasks/new"
                  )}`}
                >
                  Consultar Clientes
                </Link>
              </div>
            )}
          </div>

          {/* Importações */}
          <div>
            <button
              onClick={() => setImportacoesOpen(!importacoesOpen)}
              className="w-full flex justify-between items-center text-left py-2 px-3 rounded hover:bg-white/10"
            >
              <span className="text-xs uppercase font-semibold text-white/70">
                Importações
              </span>
              {importacoesOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
            {importacoesOpen && (
              <div className="mt-1 space-y-1 pl-4">
                <Link
                  href="/importacaoLeads"
                  className={`block py-2 px-3 rounded ${isActive(
                    "/importacaoLeads"
                  )}`}
                >
                  Importação de Leads
                </Link>
                <Link
                  href="/tasks/new"
                  className={`block py-2 px-3 rounded ${isActive(
                    "/tasks/new"
                  )}`}
                >
                  Visualizar Leads
                </Link>
              </div>
            )}
          </div>

          {/* Módulo de Tarefas */}
          <div>
            <button
              onClick={() => setTarefasOpen(!tarefasOpen)}
              className="w-full flex justify-between items-center text-left py-2 px-3 rounded hover:bg-white/10"
            >
              <span className="text-xs uppercase font-semibold text-white/70">
                Módulo de Tarefas
              </span>
              {tarefasOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
            {tarefasOpen && (
              <div className="mt-1 space-y-1 pl-4">
                <Link
                  href="/tasks"
                  className={`block py-2 px-3 rounded ${isActive("/tasks")}`}
                >
                  Visualizar Tarefas
                </Link>
                <Link
                  href="/tasks/new"
                  className={`block py-2 px-3 rounded ${isActive(
                    "/tasks/new"
                  )}`}
                >
                  Nova Tarefa
                </Link>
              </div>
            )}
          </div>

          {/* Módulo de Agendamento */}
          <div>
            <button
              onClick={() => setAgendamentoOpen(!agendamentoOpen)}
              className="w-full flex justify-between items-center text-left py-2 px-3 rounded hover:bg-white/10"
            >
              <span className="text-xs uppercase font-semibold text-white/70">
                Módulo de Agendamento
              </span>
              {agendamentoOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
            {agendamentoOpen && (
              <div className="mt-1 space-y-1 pl-4">
                <Link
                  href="/appointments"
                  className={`block py-2 px-3 rounded ${isActive(
                    "/appointments"
                  )}`}
                >
                  Agendamentos
                </Link>
                <Link
                  href="/appointments/new"
                  className={`block py-2 px-3 rounded ${isActive(
                    "/appointments/new"
                  )}`}
                >
                  Novo Agendamento
                </Link>
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
