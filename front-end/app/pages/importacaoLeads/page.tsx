"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Download, UploadCloud } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ImportacaoLeadsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile?.type === "text/csv") {
      setFile(droppedFile);
      toast.success("Arquivo CSV carregado com sucesso.");
    } else {
      toast.error("Por favor, envie um arquivo .csv válido.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected?.type === "text/csv") {
      setFile(selected);
      toast.success("Arquivo CSV carregado com sucesso.");
    } else {
      toast.error("Por favor, envie um arquivo .csv válido.");
    }
  };

  const handleImport = () => {
    if (!file) {
      toast.error("Selecione um arquivo CSV antes de importar.");
      return;
    }

    setTimeout(() => {
      toast.success(`Arquivo ${file.name} importado com sucesso!`);
      setFile(null);
    }, 1000);
  };

  const handleDownloadModelo = () => {
    const csvContent = "Nome,Email,Telefone\nJoão,joao@email.com,11999999999";
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "modelo-importacao.csv";
    link.click();
  };

  return (
    <div
      className="
        min-h-screen          
        flex flex-col         
        items-center justify-center
        px-4 py-6            
        bg-gray-50
      "
    >
      <Card className="w-full max-w-md sm:max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle>Importação de Leads</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Área de upload */}
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={cn(
              "flex flex-col items-center justify-center border-2 border-dashed rounded-lg px-6 py-12 text-center cursor-pointer transition",
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            )}
          >
            <UploadCloud className="w-10 h-10 mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Arraste um arquivo <strong>.csv</strong> aqui ou clique para
              selecionar
            </p>
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Nome do arquivo carregado */}
          {file && (
            <div className="text-sm text-center text-green-700">
              Arquivo selecionado: <strong>{file.name}</strong>
            </div>
          )}

          {/* Botões */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="w-full sm:w-48"
              onClick={handleDownloadModelo}
            >
              <Download className="mr-2 h-4 w-4" />
              Baixar modelo
            </Button>
            <Button className="w-full sm:w-48" onClick={handleImport}>
              Importar Leads
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
