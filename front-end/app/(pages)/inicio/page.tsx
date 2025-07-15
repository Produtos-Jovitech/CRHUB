"use client";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const leadData = [
  { name: "Google Ads", value: 400 },
  { name: "Facebook", value: 300 },
  { name: "Instagram", value: 300 },
  { name: "Indicação", value: 200 },
];

const taskData = [
  { name: "Concluídas", tasks: 70 },
  { name: "Pendentes", tasks: 30 },
];

const agendamentosSemana = [
  { dia: "Segunda", cliente: "Carlos Silva", hora: "10:00" },
  { dia: "Terça", cliente: "Ana Paula", hora: "14:00" },
  { dia: "Quarta", cliente: "João Souza", hora: "09:30" },
  { dia: "Quinta", cliente: "Mariana Costa", hora: "16:00" },
  { dia: "Sexta", cliente: "Lucas Lima", hora: "11:00" },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Cards principais */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Clientes</h2>
          <p className="mt-2 text-3xl font-bold">1.245</p>
          <p className="text-sm text-gray-500">Clientes cadastrados</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Agendamentos</h2>
          <p className="mt-2 text-3xl font-bold">182</p>
          <p className="text-sm text-gray-500">Agendamentos para este mês</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Tarefas</h2>
          <p className="mt-2 text-3xl font-bold">45</p>
          <p className="text-sm text-gray-500">Tarefas pendentes</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gráfico de Leads */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Captura de Leads
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={leadData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {leadData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Tarefas */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Tarefas Concluídas x Pendentes
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={taskData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasks" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Agenda da semana */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Agendamentos da Semana
        </h3>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2 border-b">Dia</th>
              <th className="text-left p-2 border-b">Cliente</th>
              <th className="text-left p-2 border-b">Hora</th>
            </tr>
          </thead>
          <tbody>
            {agendamentosSemana.map(({ dia, cliente, hora }) => (
              <tr key={`${dia}-${cliente}`} className="hover:bg-gray-50">
                <td className="p-2 border-b">{dia}</td>
                <td className="p-2 border-b">{cliente}</td>
                <td className="p-2 border-b">{hora}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
