import { useRoutes } from '@/contexts/RoutesContext';
import { Button } from '@/components/ui/button';
import RouteTable from '@/components/RouteTable';
import TemperatureChart from '@/components/TemperatureChart';
import AddRouteForm from '@/components/AddRouteForm';
import { Battery, BarChart3, Filter, AlertTriangle, Thermometer, Truck, RefreshCw } from 'lucide-react';

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
      <div className="container mx-auto space-y-8">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 dashboard-card">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-lg bg-gradient-primary">
                <Battery className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-primary">Monitoramento de Baterias</h1>
            </div>
            <p className="text-muted-foreground">Sistema de Monitoramento de Logística e Riscos de Baterias</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center p-3 rounded-lg bg-secondary/50">
              <BarChart3 className="h-6 w-6 text-primary mb-1" />
              <span className="text-sm font-medium">Rotas Ativas</span>
              <span className="text-2xl font-bold">24</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg bg-secondary/50">
              <AlertTriangle className="h-6 w-6 text-status-warning mb-1" />
              <span className="text-sm font-medium">Alertas</span>
              <span className="text-2xl font-bold">3</span>
            </div>
          </div>
        </header>

        <div className="dashboard-card">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Filtrar por Status:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={statusFilter === filter.value ? 'default' : 'outline'}
                  onClick={() => setStatusFilter(filter.value)}
                  size="sm"
                  className={statusFilter === filter.value ? 'bg-primary text-white' : 'hover:bg-secondary/50'}
                >
                  {filter.label}
                </Button>
              ))}
              <Button size="sm" variant="outline" className="ml-2">
                <RefreshCw className="h-4 w-4 mr-1" /> Atualizar
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 dashboard-grid">
            <div className="dashboard-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Temperatura das Baterias</h2>
                <Thermometer className="h-5 w-5 text-primary" />
              </div>
              <TemperatureChart />
            </div>
            
            <div className="dashboard-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Adicionar Nova Rota</h2>
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <AddRouteForm />
            </div>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Rotas Monitoradas</h2>
            <span className="status-badge status-normal">
              <span className="h-2 w-2 rounded-full bg-status-normal"></span>
              Sistema Operacional
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;