"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoSrc from "@/public/image/logoMenu.png";
import {
  Bell,
  Key,
  LogOut,
  Menu as MenuIcon,
  Settings,
  User as UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface UserInfo {
  name: string;
  email: string;
  avatarUrl?: string;
}

interface HeaderProps {
  onToggleSidebar: () => void;
  onLogout?: () => void;
  user?: UserInfo;
}

const Header: FC<HeaderProps> = ({
  onToggleSidebar,
  onLogout,
  // user,
}) => {
  const user = {
    name: "João Silva",
    email: "joao.silva@email.com",
    avatarUrl:
      "https://ui-avatars.com/api/?name=Joao+Silva&background=0D8ABC&color=fff",
    nameEmpresa: "Jovitech Sistemas",
    filialEmpresa: "Empresa 1 Jaraguá",
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 bg-[#00264d] shadow-md flex items-center px-4 md:px-6 cursor-pointer">
      <div className="flex items-center gap-3">
        <button
          aria-label="Abrir menu"
          onClick={onToggleSidebar}
          className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
        >
          <MenuIcon size={24} className="text-white" />
        </button>

        {logoSrc ? (
          <Image
            src={logoSrc}
            alt="Logo"
            width={120}
            height={32}
            className="hidden sm:block"
          />
        ) : (
          <span className="text-white font-semibold text-lg tracking-wide select-none">
            CRHUB
          </span>
        )}
      </div>

      <div className="flex-1" />

      <nav className="hidden md:flex items-center gap-4 mr-1">
        <Link
          href="/configuracoes"
          aria-label="Configurações"
          className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <Settings size={22} className="text-white" />
        </Link>
        <Link
          href="/perfil"
          aria-label="Perfil"
          className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <UserIcon size={22} className="text-white" />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              aria-label="Notificações"
              className="relative p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <Bell size={22} className="text-white" />
              <span className="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-semibold text-white">
                3
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-80 p-4 rounded-xl shadow-lg space-y-4"
          >
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">
                Notificações
              </p>

              {/* Lista de notificações */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <div className="p-2 rounded-md bg-muted hover:bg-muted/80 cursor-pointer">
                  <p className="text-sm font-medium">
                    Você tem uma nova mensagem
                  </p>
                  <p className="text-xs text-muted-foreground">há 2 minutos</p>
                </div>
                <div className="p-2 rounded-md bg-muted hover:bg-muted/80 cursor-pointer">
                  <p className="text-sm font-medium">Atualização disponível</p>
                  <p className="text-xs text-muted-foreground">há 1 hora</p>
                </div>
                {/* ...adicione mais notificações aqui */}
              </div>
            </div>

            <DropdownMenuSeparator />

            <div className="text-right">
              <Link
                href="/notifications"
                className="text-sm text-blue-600 hover:underline"
              >
                Ver todas
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            aria-label="Abrir menu do usuário"
            className="ml-5 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
          >
            <Avatar className="h-9 w-9 border-2 border-white/40">
              {user?.avatarUrl && (
                <AvatarImage src={user.avatarUrl} alt={user.name} />
              )}
              <AvatarFallback className="bg-white text-[#00264d] font-semibold uppercase">
                {user?.name?.[0] ?? "U"}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60">
          {user && (
            <>
              <div className="space-y-1 ml-1.5 mt-2">
                <p className="text-sm font-semibold text-foreground">
                  {user.name}
                </p>

                <p className="text-xs text-muted-foreground truncate">
                  Empresa: {user.nameEmpresa}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  Filial: {user.filialEmpresa}
                </p>
              </div>
            </>
          )}

          <DropdownMenuSeparator />

          <div className="space-y-2">
            <DropdownMenuItem asChild>
              <Link
                href="/change-password"
                className="w-full text-sm text-blue-600 hover:underline"
              >
                <Key size={16} className="mr-2" />
                Alterar senha
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={onLogout}
              className="w-full text-sm text-red-600 hover:text-red-700"
            >
              <LogOut size={16} className="mr-2" />
              Sair
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
