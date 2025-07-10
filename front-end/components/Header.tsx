"use client";

import { FC } from "react";
import Link from "next/link";
import {
  Menu as MenuIcon,
  LogOut,
  Settings,
  Bell,
  User as UserIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logoSrc from "@/public/image/logoMenu.png"
import Image from "next/image";

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
  avatarUrl: "https://ui-avatars.com/api/?name=Joao+Silva&background=0D8ABC&color=fff",
};


  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 bg-[#10a3d7] shadow-md flex items-center px-4 md:px-6">
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

      <nav className="hidden md:flex items-center gap-4 mr-2">
        <Link
          href="/settings"
          aria-label="Configurações"
          className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <Settings size={22} className="text-white" />
        </Link>
        <Link
          href="/profile"
          aria-label="Perfil"
          className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <UserIcon size={22} className="text-white" />
        </Link>
        <Link
          href="/notifications"
          aria-label="Notificações"
          className="relative p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <Bell size={22} className="text-white" />
          <span className="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-semibold text-white">
            3
          </span>
        </Link>
      </nav>

      <nav className="md:hidden flex items-center gap-2 mr-2">
        <Link
          href="/notifications"
          aria-label="Notificações"
          className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <Bell size={22} className="text-white" />
        </Link>
      </nav>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            aria-label="Abrir menu do usuário"
            className="ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <Avatar className="h-9 w-9 border-2 border-white/40">
              {user?.avatarUrl && (
                <AvatarImage src={user.avatarUrl} alt={user.name} />
              )}
              <AvatarFallback className="bg-white text-[#10a3d7] font-semibold uppercase">
                {user?.name?.[0] ?? "U"}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {user && (
            <>
              <DropdownMenuLabel className="flex flex-col">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground truncate">
                  {user.email}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Meu Perfil</Link>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuContent align="end" className="w-72 p-4 rounded-xl shadow-lg space-y-3">
            {user && (
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            )}

            <DropdownMenuSeparator />

            <div className="space-y-2">
              <DropdownMenuItem asChild>
                <Link
                  href="/change-password"
                  className="w-full text-sm text-blue-600 hover:underline"
                >
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
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
