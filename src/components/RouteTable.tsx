import { useState } from 'react';
import { useRoutes } from '@/contexts/RoutesContext';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RouteTable = () => {
  const { filteredRoutes, updateRoute, deleteRoute } = useRoutes();
  const [editingRoute, setEditingRoute] = useState<any>(null);
  const [editForm, setEditForm] = useState({ origem: '', destino: '', temperatura: 0 });
  const navigate = useNavigate();

  const handleEdit = (route: any) => {
    setEditingRoute(route);
    setEditForm({
      origem: route.origem,
      destino: route.destino,
      temperatura: route.temperatura
    });
  };

  const handleSaveEdit = () => {
    if (editingRoute) {
      updateRoute(editingRoute.id, editForm);
      setEditingRoute(null);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta rota?')) {
      deleteRoute(id);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Normal': return 'normal';
      case 'Risco moderado': return 'warning';
      case 'Superaquecimento': return 'danger';
      default: return 'normal';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Normal': return '✅';
      case 'Risco moderado': return '⚠️';
      case 'Superaquecimento': return '🔥';
      default: return '✅';
    }
  };

  return (
    <div className="rounded-lg border bg-card shadow-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Origem</TableHead>
            <TableHead>Destino</TableHead>
            <TableHead>Temperatura da Carga</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRoutes.map((route) => (
            <TableRow key={route.id}>
              <TableCell className="font-medium">{route.origem}</TableCell>
              <TableCell>{route.destino}</TableCell>
              <TableCell>{route.temperatura}°C</TableCell>
              <TableCell>
                <StatusBadge variant={getStatusVariant(route.status)}>
                  {getStatusIcon(route.status)} {route.status}
                </StatusBadge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/route/${route.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(route)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Rota</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="edit-origem">Origem</Label>
                          <Input
                            id="edit-origem"
                            value={editForm.origem}
                            onChange={(e) => setEditForm(prev => ({ ...prev, origem: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-destino">Destino</Label>
                          <Input
                            id="edit-destino"
                            value={editForm.destino}
                            onChange={(e) => setEditForm(prev => ({ ...prev, destino: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-temperatura">Temperatura (°C)</Label>
                          <Input
                            id="edit-temperatura"
                            type="number"
                            value={editForm.temperatura}
                            onChange={(e) => setEditForm(prev => ({ ...prev, temperatura: Number(e.target.value) }))}
                          />
                        </div>
                        <Button onClick={handleSaveEdit} className="w-full">
                          Salvar Alterações
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(route.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RouteTable;