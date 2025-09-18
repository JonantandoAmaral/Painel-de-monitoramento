import { useRoutes } from '@/contexts/RoutesContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TemperatureChart = () => {
  const { routes } = useRoutes();

  const chartData = routes.map((route, index) => ({
    name: `${route.origem.slice(0, 3)}-${route.destino.slice(0, 3)}`,
    temperatura: route.temperatura,
    fill: route.temperatura < 40 
      ? 'hsl(var(--chart-normal))' 
      : route.temperatura < 55 
      ? 'hsl(var(--chart-warning))' 
      : 'hsl(var(--chart-danger))'
  }));

  return (
    <div className="bg-card rounded-lg p-6 shadow-card">
      <h3 className="text-lg font-semibold mb-4">Temperatura das Cargas por Rota</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            label={{ value: 'Temperatura (°C)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: 'var(--radius)',
              color: 'hsl(var(--popover-foreground))'
            }}
            formatter={(value: number) => [`${value}°C`, 'Temperatura']}
          />
          <Bar 
            dataKey="temperatura" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;