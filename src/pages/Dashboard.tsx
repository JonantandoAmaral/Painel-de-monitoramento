import { useRoutes } from '@/contexts/RoutesContext';
import { Button } from '@/components/ui/button';
import RouteTable from '@/components/RouteTable';
import TemperatureChart from '@/components/TemperatureChart';
import AddRouteForm from '@/components/AddRouteForm';
import { Battery, BarChart3, Filter } from 'lucide-react';

const Dashboard = () => {
  const { statusFilter, setStatusFilter } = useRoutes();

  const filters = [
    { label: 'Todos', value: '' },
    { label: 'Normal', value: 'Normal' },
    { label: 'Risco moderado', value: 'Risco moderado' },
    { label: 'Superaquecimento', value: 'Superaquecimento' }
  ];

  return (
    <div className="min-h-screen bg-gradient-dashboard p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Battery className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold">Gráficos Dashboard Geral</h1>
            </div>
            <p className="text-muted-foreground">Monitoramento de Logística e Riscos de Baterias</p>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Rotas Ativas</span>
          </div>
        </header>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filtros:</span>
          </div>
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={statusFilter === filter.value ? 'default' : 'filter'}
              onClick={() => setStatusFilter(filter.value)}
              size="sm"
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <RouteTable />

        <TemperatureChart />

        <AddRouteForm />
      </div>
    </div>
  );
};

export default Dashboard;