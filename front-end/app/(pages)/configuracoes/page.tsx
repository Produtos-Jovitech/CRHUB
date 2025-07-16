"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const menuItems = [
  "Automações Funis",
  "Automações Etapas",
  "Campos Personalizáveis",
  "Whatsapp Conectado",
  "Tema do Sistema",
];

export default function ConfiguracoesPage() {
  const [selected, setSelected] = useState(menuItems[0]);

  return (
    <div className="px-[5px] py-6 h-screen">
      <div className="flex h-[80vh] max-w-full mx-auto border rounded-lg overflow-hidden shadow-sm bg-white">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-50 border-r">
          <ul className="flex flex-col h-full">
            {menuItems.map((item) => (
              <li key={item}>
                <button
                  className={`w-full text-left px-4 py-3 border-b hover:bg-gray-100 transition-colors
                    ${
                      selected === item
                        ? "bg-white font-semibold border-l-4 border-blue-500"
                        : "text-gray-600"
                    }
                  `}
                  onClick={() => setSelected(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          <Card className="h-full">
            <CardContent className="flex items-center justify-center h-full text-lg font-medium text-gray-700">
              Seção: {selected}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
