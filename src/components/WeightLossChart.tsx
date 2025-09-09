import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

// Dados mock para demonstração
const weeklyCaloriesData = [
  { day: "Seg", ingeridas: 1800, queimadas: 2200, meta: 2000 },
  { day: "Ter", ingeridas: 1900, queimadas: 2100, meta: 2000 },
  { day: "Qua", ingeridas: 1750, queimadas: 2300, meta: 2000 },
  { day: "Qui", ingeridas: 2000, queimadas: 2000, meta: 2000 },
  { day: "Sex", ingeridas: 1850, queimadas: 2250, meta: 2000 },
  { day: "Sáb", ingeridas: 2100, queimadas: 1900, meta: 2000 },
  { day: "Dom", ingeridas: 1950, queimadas: 2150, meta: 2000 },
];

const macronutrientData = [
  { name: "Proteínas", value: 30, color: "#10b981" },
  { name: "Carboidratos", value: 45, color: "#3b82f6" },
  { name: "Gorduras", value: 25, color: "#f59e0b" },
];

const proteinProgressData = [
  { day: "Seg", consumido: 120, meta: 150 },
  { day: "Ter", consumido: 140, meta: 150 },
  { day: "Qua", consumido: 155, meta: 150 },
  { day: "Qui", consumido: 130, meta: 150 },
  { day: "Sex", consumido: 145, meta: 150 },
  { day: "Sáb", consumido: 110, meta: 150 },
  { day: "Dom", consumido: 165, meta: 150 },
];

interface ChartProps {
  className?: string;
}

export function CaloriesLineChart({ className }: ChartProps) {
  return (
    <Card className={cn("p-6 shadow-card", className)}>
      <h3 className="text-lg font-semibold mb-4">Balanço Calórico Semanal</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={weeklyCaloriesData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="day" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="ingeridas"
            stroke="hsl(var(--info))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--info))", strokeWidth: 2 }}
            name="Calorias Ingeridas"
          />
          <Line
            type="monotone"
            dataKey="queimadas"
            stroke="hsl(var(--success))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--success))", strokeWidth: 2 }}
            name="Calorias Queimadas"
          />
          <Line
            type="monotone"
            dataKey="meta"
            stroke="hsl(var(--warning))"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: "hsl(var(--warning))", strokeWidth: 2 }}
            name="Meta"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function MacronutrientPieChart({ className }: ChartProps) {
  return (
    <Card className={cn("p-6 shadow-card", className)}>
      <h3 className="text-lg font-semibold mb-4">Distribuição de Macronutrientes</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={macronutrientData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {macronutrientData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center space-x-6 mt-4">
        {macronutrientData.map((item) => (
          <div key={item.name} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-muted-foreground">
              {item.name} ({item.value}%)
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function ProteinBarChart({ className }: ChartProps) {
  return (
    <Card className={cn("p-6 shadow-card", className)}>
      <h3 className="text-lg font-semibold mb-4">Consumo de Proteínas vs Meta</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={proteinProgressData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="day" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Bar 
            dataKey="meta" 
            fill="hsl(var(--muted))" 
            name="Meta"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="consumido" 
            fill="hsl(var(--primary))" 
            name="Consumido"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}