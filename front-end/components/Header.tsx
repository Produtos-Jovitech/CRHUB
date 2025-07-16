"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { FC, useState } from "react";
import { Button } from "./ui/button";

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

  const [openModalnotificacao, setOpenModalnotificacao] = useState(false);

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            color="white"
            fill="currentColor"
            // class="bi bi-whatsapp"
            viewBox="0 0 16 16"
          >
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
          </svg>
        </Link>

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
              className="relative p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
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
              <button
                // href="/notifications"
                onClick={() => setOpenModalnotificacao(true)}
                className="text-sm text-blue-600 hover:underline cursor-pointer"
              >
                Ver todas
              </button>
            </div>

            <Dialog
              open={openModalnotificacao}
              onOpenChange={setOpenModalnotificacao}
            >
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Todas Notificações</DialogTitle>
                </DialogHeader>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  <div className="p-2 rounded-md bg-muted hover:bg-muted/80 cursor-pointer">
                    <p className="text-sm font-medium">
                      Você tem uma nova mensagem
                    </p>
                    <p className="text-xs text-muted-foreground">
                      há 2 minutos
                    </p>
                  </div>
                  <div className="p-2 rounded-md bg-muted hover:bg-muted/80 cursor-pointer">
                    <p className="text-sm font-medium">
                      Atualização disponível
                    </p>
                    <p className="text-xs text-muted-foreground">há 1 hora</p>
                  </div>
                  {/* ...adicione mais notificações aqui */}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => setOpenModalnotificacao(false)}
                    >
                      Cancelar
                    </Button>
                    <Button className="cursor-pointer">
                      Limpar Notificações
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
