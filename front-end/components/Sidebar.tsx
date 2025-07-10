"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";
import { FC } from "react";
import Image from "next/image";
import logoSrc from "@/public/image/logoMenu.png"

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ open, onClose }) => {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href
      ? "bg-white/20 font-semibold"
      : "hover:bg-white/10";

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
        className={`fixed top-0 left-0 h-full w-64 bg-[#10a3d7] text-white transition-transform duration-300 z-50 ${
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
          {/* Prioridade: Dashboard e Kanban */}
          <div className="space-y-1">
            <Link
              href="/home"
              className={`block py-2 px-3 rounded ${isActive("/home")}`}
            >
              Dashboard
            </Link>
            <Link
              href="/kanban"
              className={`block py-2 px-3 rounded ${isActive("/kanban")}`}
            >
              Kanban
            </Link>
          </div>

         <div>
            <h3 className="text-xs uppercase font-semibold text-white/70 mb-2 px-3">
              Leads
            </h3>
            <Link
              href="/tasks"
              className={`block py-2 px-3 rounded ${isActive("/tasks")}`}
            >
              Importação de Leads
            </Link>
            <Link
              href="/tasks/new"
              className={`block py-2 px-3 rounded ${isActive("/tasks/new")}`}
            >
              Visualizar Leads
            </Link>
          </div>
          {/* Tarefas */}
          <div>
            <h3 className="text-xs uppercase font-semibold text-white/70 mb-2 px-3">
              Tarefas
            </h3>
            <Link
              href="/tasks"
              className={`block py-2 px-3 rounded ${isActive("/tasks")}`}
            >
              Visualizar Tarefas
            </Link>
            <Link
              href="/tasks/new"
              className={`block py-2 px-3 rounded ${isActive("/tasks/new")}`}
            >
              Nova Tarefa
            </Link>
          </div>

          {/* Agendamentos */}
          <div>
            <h3 className="text-xs uppercase font-semibold text-white/70 mb-2 px-3">
              Agendamentos
            </h3>
            <Link
              href="/appointments"
              className={`block py-2 px-3 rounded ${isActive("/appointments")}`}
            >
              Agendamentos
            </Link>
            <Link
              href="/appointments/new"
              className={`block py-2 px-3 rounded ${isActive("/appointments/new")}`}
            >
              Novo Agendamento
            </Link>
          </div>

           <div>
            <h3 className="text-xs uppercase font-semibold text-white/70 mb-2 px-3">
              Metas
            </h3>
            <Link
              href="/whatsapp"
              className={`block py-2 px-3 rounded ${isActive("/whatsapp")}`}
            >
              Visualizar Metas
            </Link>
          </div>

          {/* Conexões */}
          <div>
            <h3 className="text-xs uppercase font-semibold text-white/70 mb-2 px-3">
              Conexões
            </h3>
            <Link
              href="/whatsapp"
              className={`block py-2 px-3 rounded ${isActive("/whatsapp")}`}
            >
              Conectar WhatsApp
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
