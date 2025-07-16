"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/contexts/MobileContext";
import { useState } from "react";

const fullMenuItems = [
  "Automações Funis",
  "Automações Etapas",
  "Campos Personalizáveis",
  "Whatsapp Conectado",
  "Tema do Sistema",
];

const mobileMenuMap: Record<string, string | null> = {
  "Automações Funis": "Funis",
  "Automações Etapas": "Etapas",
  "Campos Personalizáveis": "Campos",
  "Whatsapp Conectado": null, // remover
  "Tema do Sistema": "Tema",
};

export default function ConfiguracoesPage() {
  const { isMobile } = useIsMobile();
  const menuItems = isMobile
    ? fullMenuItems
        .map((item) => mobileMenuMap[item])
        .filter((item): item is string => item !== null)
    : fullMenuItems;

  const [selected, setSelected] = useState(menuItems[0]);

  return (
    <div className="px-[5px] py-6 min-h-screen">
      <div className="flex flex-col sm:flex-row h-[80vh] max-w-full mx-auto border rounded-lg overflow-hidden shadow-sm bg-white">
        {/* Sidebar */}
        <nav className="w-full sm:w-64 bg-gray-50 border-b sm:border-b-0 sm:border-r overflow-auto">
          <ul className="flex sm:flex-col">
            {menuItems.map((item) => {
              // No mobile, o texto já vem ajustado (pelo map)
              const displayText = item;
              const isSelected = selected === item;

              return (
                <li key={item} className="flex-1 sm:flex-none">
                  <button
                    className={`
                      w-full text-center sm:text-left px-4 py-3 border-b sm:border-b border-gray-200 hover:bg-gray-100 transition-colors
                      ${
                        isSelected
                          ? "sm:bg-white sm:font-semibold sm:border-l-4 sm:border-blue-500 bg-blue-100 font-semibold text-blue-700"
                          : "text-gray-600"
                      }
                    `}
                    onClick={() => setSelected(item)}
                  >
                    {displayText}
                  </button>
                </li>
              );
            })}
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
