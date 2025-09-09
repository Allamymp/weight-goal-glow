import { MetricCard } from "@/components/MetricCard";
import { ProgressBar } from "@/components/ProgressBar";
import { CaloriesLineChart, MacronutrientPieChart, ProteinBarChart } from "@/components/WeightLossChart";
import { Activity, Target, TrendingDown, Zap, Apple, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  // Dados mock para demonstração
  const todayData = {
    caloriasIngeridas: 1850,
    caloriasQueimadas: 2200,
    caloriasLiquidas: -350,
    metaCalorias: 2000,
    proteinasConsumidas: 145,
    metaProteinas: 150,
    saldoCalorias: 150,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Dashboard de Perda de Peso
              </h1>
              <p className="text-muted-foreground mt-1">
                Monitore seu progresso diário e alcance suas metas
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Hoje</p>
              <p className="text-lg font-semibold">
                {new Date().toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long' 
                })}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Métricas Principais */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Resumo do Dia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <MetricCard
              title="Calorias Ingeridas"
              value={`${todayData.caloriasIngeridas.toLocaleString()}`}
              subtitle="kcal consumidas hoje"
              icon={<Apple className="h-8 w-8" />}
              variant="info"
              trend={{ value: "5% menos que ontem", isPositive: true }}
            />
            
            <MetricCard
              title="Calorias Queimadas"
              value={`${todayData.caloriasQueimadas.toLocaleString()}`}
              subtitle="kcal eliminadas hoje"
              icon={<Zap className="h-8 w-8" />}
              variant="success"
              trend={{ value: "12% mais que ontem", isPositive: true }}
            />
            
            <MetricCard
              title="Saldo Líquido"
              value={`${todayData.caloriasLiquidas > 0 ? '+' : ''}${todayData.caloriasLiquidas}`}
              subtitle="déficit calórico"
              icon={<TrendingDown className="h-8 w-8" />}
              variant={todayData.caloriasLiquidas < 0 ? "success" : "warning"}
              trend={{ value: "Excelente progresso!", isPositive: todayData.caloriasLiquidas < 0 }}
            />
            
            <MetricCard
              title="Proteínas"
              value={`${todayData.proteinasConsumidas}g`}
              subtitle={`de ${todayData.metaProteinas}g meta`}
              icon={<Target className="h-8 w-8" />}
              variant={todayData.proteinasConsumidas >= todayData.metaProteinas ? "success" : "warning"}
            />
          </div>
        </section>

        {/* Barras de Progresso */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Progresso das Metas</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg shadow-card">
              <ProgressBar
                title="Meta de Calorias Diárias"
                current={todayData.caloriasIngeridas}
                target={todayData.metaCalorias}
                unit="kcal"
                variant="info"
              />
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-card">
              <ProgressBar
                title="Meta de Proteínas Diárias"
                current={todayData.proteinasConsumidas}
                target={todayData.metaProteinas}
                unit="g"
                variant="success"
              />
            </div>
          </div>
        </section>

        {/* Gráficos */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold">Análise Detalhada</h2>
          
          {/* Gráfico de Linha - Balanço Calórico */}
          <CaloriesLineChart />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gráfico de Pizza - Macronutrientes */}
            <MacronutrientPieChart />
            
            {/* Gráfico de Barras - Proteínas */}
            <ProteinBarChart />
          </div>
        </section>

        {/* Footer com Insights */}
        <section className="mt-12 p-6 bg-gradient-primary rounded-lg text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="h-6 w-6" />
            <h3 className="text-xl font-semibold">Insights do Dia</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="font-medium mb-1">🎯 Meta Calórica</p>
              <p className="opacity-90">
                Você está {todayData.saldoCalorias}kcal acima da meta ideal. 
                Considere uma caminhada de 30 minutos.
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="font-medium mb-1">💪 Proteínas</p>
              <p className="opacity-90">
                Faltam apenas {todayData.metaProteinas - todayData.proteinasConsumidas}g 
                para atingir sua meta diária!
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="font-medium mb-1">🔥 Déficit</p>
              <p className="opacity-90">
                Déficit de {Math.abs(todayData.caloriasLiquidas)}kcal hoje! 
                Mantendo esse ritmo, você perderá peso consistentemente.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
