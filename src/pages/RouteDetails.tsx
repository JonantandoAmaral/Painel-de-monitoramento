import { useParams, useNavigate } from 'react-router-dom';
import { useRoutes } from '@/contexts/RoutesContext';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MapPin, Thermometer, AlertTriangle } from 'lucide-react';

const RouteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { routes } = useRoutes();

  const route = routes.find(r => r.id === id);

  if (!route) {
    return (
      <div className="min-h-screen bg-gradient-dashboard flex items-center justify-center p-6">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">Rota não encontrada</h2>
            <p className="text-muted-foreground mb-4">A rota solicitada não existe ou foi removida.</p>
            <Button onClick={() => navigate('/dashboard')}>
              Voltar ao Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Normal': return 'normal';
      case 'Risco moderado': return 'warning';
      case 'Superaquecimento': return 'danger';
      default: return 'normal';
    }
  };

  const getRecommendations = (status: string) => {
    switch (status) {
      case 'Normal':
        return [
          'Monitorar temperatura regularmente',
          'Manter ventilação adequada'
        ];
      case 'Risco moderado':
        return [
          'Verificar sistema de refrigeração',
          'Evitar horários de pico de calor'
        ];
      case 'Superaquecimento':
        return [
          'Verificar sistema de refrigeração do veículo',
          'Reduzir velocidade para evitar aquecimento adicional',
          'Considerar parada técnica para inspeção'
        ];
      default:
        return [];
    }
  };

  const recommendations = getRecommendations(route.status);

  return (
    <div className="min-h-screen bg-gradient-dashboard p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Dashboard
          </Button>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-primary" />
              Detalhes da Rota
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Origem</label>
                <p className="text-lg font-semibold">{route.origem}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Destino</label>
                <p className="text-lg font-semibold">{route.destino}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Temperatura da Carga</label>
                <div className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-primary" />
                  <p className="text-lg font-semibold">{route.temperatura}°C</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <StatusBadge variant={getStatusVariant(route.status)}>
                  {route.status}
                </StatusBadge>
              </div>
            </div>

            {recommendations.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-status-warning" />
                  <h3 className="text-lg font-semibold">Recomendações</h3>
                </div>
                <ul className="space-y-2">
                  {recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RouteDetails;