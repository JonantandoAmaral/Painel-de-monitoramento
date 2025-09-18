import { useState } from 'react';
import { useRoutes } from '@/contexts/RoutesContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AddRouteForm = () => {
  const { addRoute } = useRoutes();
  const { toast } = useToast();
  const [form, setForm] = useState({
    origem: '',
    destino: '',
    temperatura: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (form.origem && form.destino && form.temperatura) {
      addRoute({
        origem: form.origem,
        destino: form.destino,
        temperatura: Number(form.temperatura)
      });
      
      setForm({ origem: '', destino: '', temperatura: '' });
      
      toast({
        title: "Rota cadastrada com sucesso!",
        description: `Rota ${form.origem} → ${form.destino} foi adicionada.`,
      });
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Cadastrar Nova Rota
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="origem">Origem</Label>
              <Input
                id="origem"
                value={form.origem}
                onChange={(e) => setForm(prev => ({ ...prev, origem: e.target.value }))}
                placeholder="Ex: São Paulo"
                required
              />
            </div>
            <div>
              <Label htmlFor="destino">Destino</Label>
              <Input
                id="destino"
                value={form.destino}
                onChange={(e) => setForm(prev => ({ ...prev, destino: e.target.value }))}
                placeholder="Ex: Rio de Janeiro"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="temperatura">Temperatura Inicial da Carga (°C)</Label>
            <Input
              id="temperatura"
              type="number"
              value={form.temperatura}
              onChange={(e) => setForm(prev => ({ ...prev, temperatura: e.target.value }))}
              placeholder="Ex: 25"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Cadastrar Rota
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddRouteForm;