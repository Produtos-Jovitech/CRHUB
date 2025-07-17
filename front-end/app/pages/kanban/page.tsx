"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";

import {
  CalendarArrowDown,
  CalendarArrowUp,
  ListChecks,
  Plus,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Cor = "blue" | "orange" | "gray" | "green";

const cores: Record<Cor, string> = {
  blue: "bg-blue-500",
  orange: "bg-orange-500",
  gray: "bg-gray-500",
  green: "bg-green-500",
};

type FunilID = number;

interface Funil {
  id: FunilID;
  nome: string;
  cor: Cor;
}

const funisIniciais: Funil[] = [
  { id: 1, nome: "Vendas", cor: "blue" },
  { id: 2, nome: "Agendamentos", cor: "orange" },
  { id: 3, nome: "Contratos", cor: "gray" },
  { id: 4, nome: "Conclusão", cor: "green" },
];

interface Card {
  id: number;
  titulo: string;
  origem: string;
  abertura: string;
  termino: string;
  descricao: string;
  tarefas: number;
  agendamentos: number;
  usuario: {
    nome: string;
    avatarUrl: string;
  };
}

interface Etapa {
  name: string;
  cards: Card[];
}

const mockCards: Card[] = [
  {
    id: 1,
    titulo: "Alexandre Santos",
    origem: "Site",
    abertura: "2025-07-01",
    termino: "2025-07-15",
    descricao: "Solicitou demonstração do produto.",
    tarefas: 3,
    agendamentos: 2,
    usuario: {
      nome: "João Silva",
      avatarUrl: "https://ui-avatars.com/api/?name=Joao+Silva",
    },
  },
];

export default function KanbanPage() {
  const [funis, setFunis] = useState<Funil[]>(funisIniciais);
  const [funilSelecionado, setFunilSelecionado] = useState<FunilID>(
    funisIniciais[0].id
  );
  const [etapas, setEtapas] = useState<Etapa[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalConfiguracaoEtapa, setModalConfiguracaoEtapa] = useState(false);
  const [novoNomeFunil, setNovoNomeFunil] = useState("");
  const [novaCorFunil, setNovaCorFunil] = useState<Cor>("blue");

  useEffect(() => {
    // Carregar etapas do localStorage ou iniciar
    const local = localStorage.getItem(`etapas-funil-${funilSelecionado}`);
    if (local) {
      setEtapas(JSON.parse(local));
    } else {
      if (funilSelecionado === 1) {
        setEtapas([
          { name: "Prospecção", cards: mockCards },
          { name: "Negociação", cards: [] },
          { name: "Fechado", cards: [] },
        ]);
      } else {
        setEtapas([
          { name: "Etapa 1", cards: [] },
          { name: "Etapa 2", cards: [] },
        ]);
      }
    }
  }, [funilSelecionado]);

  useEffect(() => {
    localStorage.setItem(
      `etapas-funil-${funilSelecionado}`,
      JSON.stringify(etapas)
    );
  }, [etapas, funilSelecionado]);

  // Adiciona novo funil
  function adicionarFunil() {
    if (!novoNomeFunil.trim()) return alert("Digite o nome do funil");
    const novo: Funil = {
      id: Date.now(),
      nome: novoNomeFunil.trim(),
      cor: novaCorFunil,
    };
    setFunis((f) => [...f, novo]);
    setFunilSelecionado(novo.id);
    setModalAberto(false);
    setNovoNomeFunil("");
    setNovaCorFunil("blue");
    setEtapas([{ name: "Etapa 1", cards: [] }]);
  }

  // Renomear etapa
  const renomearEtapa = (index: number, novoNome: string) => {
    const atualizadas = [...etapas];
    atualizadas[index].name = novoNome;
    setEtapas(atualizadas);
  };

  // Mover card entre etapas
  const moverCard = (cardId: number, destinoEtapa: string) => {
    let cardMovido: Card | null = null;
    const novasEtapas = etapas.map((etapa) => {
      const novosCards = etapa.cards.filter((card) => {
        if (card.id === cardId) {
          cardMovido = card;
          return false;
        }
        return true;
      });
      return { ...etapa, cards: novosCards };
    });

    if (cardMovido) {
      const etapaDestino = novasEtapas.find((e) => e.name === destinoEtapa);
      if (etapaDestino) etapaDestino.cards.push(cardMovido);
    }
    setEtapas(novasEtapas);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const cardId = Number(active.id);
    const etapaDestino = over.id.toString();
    moverCard(cardId, etapaDestino);
  };

  const funilAtual = funis.find((f) => f.id === funilSelecionado);

  return (
    <div className="px-[5px] py-6">
      {/* Filtro funis + botão novo */}
      <div className="flex flex-wrap gap-3 mb-4 px-2 items-center">
        {funis.map((funil) => (
          <button
            key={funil.id}
            onClick={() => setFunilSelecionado(funil.id)}
            className={`px-4 py-1 rounded border whitespace-nowrap ${
              funilSelecionado === funil.id
                ? `${cores[funil.cor]} text-white`
                : "bg-white text-gray-800"
            }`}
          >
            {funil.nome}
          </button>
        ))}

        <Button variant="outline" onClick={() => setModalAberto(true)}>
          + Novo Funil
        </Button>
      </div>

      <Dialog
        open={modalConfiguracaoEtapa}
        onOpenChange={setModalConfiguracaoEtapa}
      >
        <DialogContent className="sm:max-w-[425px] sm:max-h[500px]">
          <DialogHeader>
            <DialogTitle>Configurações da Etapa</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-end gap-2 cursor-pointer">
              <Button
                variant="outline"
                onClick={() => setModalConfiguracaoEtapa(false)}
              >
                Cancelar
              </Button>
              <Button onClick={adicionarFunil}>Adicionar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Novo Funil</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label htmlFor="nomeFunil" className="block font-medium mb-1">
                Nome do Funil
              </label>
              <input
                id="nomeFunil"
                type="text"
                className="w-full rounded border border-gray-300 px-3 py-2"
                value={novoNomeFunil}
                onChange={(e) => setNovoNomeFunil(e.target.value)}
                autoFocus
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Cor do Header</label>
              <RadioGroup
                onValueChange={(value) => setNovaCorFunil(value as Cor)}
                value={novaCorFunil}
                className="flex gap-4"
              >
                {(["blue", "orange", "gray", "green"] as Cor[]).map((cor) => (
                  <div key={cor} className="flex items-center gap-2">
                    <RadioGroupItem value={cor} id={`cor-${cor}`} />
                    <label
                      htmlFor={`cor-${cor}`}
                      className={`cursor-pointer ${cores[cor]} w-6 h-6 rounded-full`}
                    />
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setModalAberto(false)}>
                Cancelar
              </Button>
              <Button onClick={adicionarFunil}>Adicionar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Kanban com DnD */}
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <div
          className="
            flex flex-nowrap gap-4 px-2
            overflow-x-auto no-scrollbar
          "
          style={{ WebkitOverflowScrolling: "touch" }} // para scroll suave em iOS
        >
          {etapas.map((etapa, index) => (
            <SortableContext
              key={etapa.name}
              items={etapa.cards.map((card) => card.id)}
              strategy={verticalListSortingStrategy}
            >
              <div
                id={etapa.name}
                className="
                  bg-gray-100 rounded-lg shadow p-0 pt-0 space-y-2
                  h-[600px]
                  min-w-[280px] max-w-[320px]
                  flex-shrink-0
                  flex flex-col
                "
              >
                <div
                  className={`w-full px-4 py-2 rounded-t-md border-b border-blue-200 flex items-center justify-between ${
                    funilAtual ? cores[funilAtual.cor] : "bg-blue-500"
                  } text-white font-bold`}
                >
                  <AlterarNomeEtapa
                    initialValue={etapa.name}
                    onChange={(novoNome) => renomearEtapa(index, novoNome)}
                  />
                  <button
                    className="hover:text-gray-200 p-1 rounded cursor-pointer"
                    onClick={() => setModalConfiguracaoEtapa(true)}
                    title={`Configurar etapa: ${etapa.name}`}
                  >
                    <Settings size={20} />
                  </button>
                </div>

                <div className="p-4 space-y-4 overflow-y-auto max-h-[520px]">
                  {etapa.cards.length > 0 ? (
                    etapa.cards.map((card) => (
                      <CardItem key={card.id} card={card} />
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Sem cards</p>
                  )}
                </div>
              </div>
            </SortableContext>
          ))}

          <button
            onClick={() =>
              setEtapas((prev) => [...prev, { name: "Nova Etapa", cards: [] }])
            }
            className="
              flex items-center cursor-pointer justify-center
              bg-blue-100 hover:bg-blue-200 text-blue-600
              font-semibold rounded-lg p-4 min-h-[120px] shadow
              min-w-[280px] max-w-[320px]
              flex-shrink-0
            "
          >
            <Plus className="mr-2" size={20} />
            Nova etapa
          </button>
        </div>
      </DndContext>
    </div>
  );
}

function CardItem({ card }: { card: Card }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: card.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const hoje = new Date();
  const abertura = new Date(card.abertura);
  const termino = new Date(card.termino);
  const diffDias = Math.floor(
    (hoje.getTime() - abertura.getTime()) / (1000 * 60 * 60 * 24)
  );
  const diasParaFim = Math.floor(
    (termino.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24)
  );
  const formatarData = (data: string) =>
    new Date(data).toLocaleDateString("pt-BR");

  let corId = "bg-blue-500";
  if (diasParaFim <= 0) corId = "bg-red-500";
  else if (diasParaFim <= 2) corId = "bg-yellow-400";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-md p-4 shadow space-y-2 border border-gray-200"
    >
      <div className="flex items-center gap-2">
        <div className={`text-white text-xs px-2 py-1 rounded ${corId}`}>
          {card.id}
        </div>
        <div className="text-sm font-bold text-gray-800">{card.titulo}</div>
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        <div>Origem: {card.origem}</div>
        <div className="flex items-center gap-1">
          {diffDias} dia(s) na etapa
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <CalendarArrowUp size={14} />
          {formatarData(card.abertura)}
        </div>
        <div className="flex items-center gap-1">
          <CalendarArrowDown size={14} />
          {formatarData(card.termino)}
        </div>
      </div>

      <div className="flex justify-between items-center mt-3 text-gray-600 text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <ListChecks size={16} />
            {card.tarefas} tarefa(s)
          </div>
          <div className="flex items-center gap-1">
            <CalendarArrowDown size={16} />
            {card.agendamentos ?? 0} agendamento(s)
          </div>
        </div>

        <Avatar className="h-6 w-6">
          <AvatarImage src={card.usuario.avatarUrl} />
          <AvatarFallback>{card.usuario.nome[0]}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

function AlterarNomeEtapa({
  initialValue,
  onChange,
}: {
  initialValue: string;
  onChange: (value: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleBlur = () => {
    setEditing(false);
    onChange(value.trim() === "" ? initialValue : value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return editing ? (
    <input
      autoFocus
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleBlur();
      }}
      className="w-full font-bold text-lg bg-white border border-gray-300 rounded px-2 py-1 text-center"
    />
  ) : (
    <h2
      className="font-bold text-lg cursor-pointer flex-grow text-center"
      onDoubleClick={() => setEditing(true)}
      title="Clique duas vezes para editar"
      style={{ userSelect: "none" }}
    >
      {value}
    </h2>
  );
}
