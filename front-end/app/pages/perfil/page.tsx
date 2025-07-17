"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const defaultUserData = {
  nome: "João da Silva",
  email: "joao@empresa.com.br",
  avatarUrl: "https://ui-avatars.com/api/?name=Joao+Silva",
  infos: [
    { label: "Setor", valor: "Desenvolvimento" },
    { label: "Perfil", valor: "Administrador" },
    { label: "Cargo", valor: "Desenvolvedor Full Stack" },
    { label: "Última Atividade", valor: "16/07/2025 ás 17:40" },
  ],
};

const empresaData = [
  { label: "Nome da Empresa", valor: "Jovitech Soluções" },
  { label: "Filial", valor: "Unidade São Paulo" },
  {
    label: "Endereço",
    valor: "Rua das Inovações, 123 - Centro, São Paulo - SP, 01000-000",
    fullWidth: true,
  },
];

export default function ProfilePage() {
  const [userData, setUserData] = useState(defaultUserData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: userData.nome,
    email: userData.email,
  });

  const handleSave = () => {
    setUserData((prev) => ({ ...prev, ...formData }));
    setIsDialogOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Informações do Usuário */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Informações do Usuário</CardTitle>
          <Button
            size="sm"
            className="cursor-pointer"
            variant="outline"
            onClick={() => setIsDialogOpen(true)}
          >
            Alterar senha
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={userData.avatarUrl} />
              <AvatarFallback>{userData.nome[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{userData.nome}</p>
              <p className="text-sm text-muted-foreground">{userData.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {userData.infos.map((info) => (
              <div key={info.label}>
                <p className="text-sm text-muted-foreground">{info.label}</p>
                <p className="font-medium">{info.valor}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Informações da Empresa */}
      <Card>
        <CardHeader>
          <CardTitle>Informações da Empresa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {empresaData.map((info) => (
              <div
                key={info.label}
                className={info.fullWidth ? "col-span-2" : undefined}
              >
                <p className="text-sm text-muted-foreground">{info.label}</p>
                <p className="font-medium">{info.valor}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog para editar informações */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar senha</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium" htmlFor="nome">
                Senha Atual
              </label>
              <Input id="senhaAtual" type="password" />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="email">
                Nova Senha
              </label>
              <Input id="senhaNova" type="password" />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button className="cursor-pointer" onClick={handleSave}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
