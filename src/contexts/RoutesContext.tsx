import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Route {
  id: string;
  origem: string;
  destino: string;
  temperatura: number;
  status: 'Normal' | 'Risco moderado' | 'Superaquecimento';
}

interface RoutesContextType {
  routes: Route[];
  addRoute: (route: Omit<Route, 'id' | 'status'>) => void;
  updateRoute: (id: string, route: Partial<Route>) => void;
  deleteRoute: (id: string) => void;
  filteredRoutes: Route[];
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

const RoutesContext = createContext<RoutesContextType | undefined>(undefined);

const getStatusFromTemperature = (temperatura: number): Route['status'] => {
  if (temperatura < 40) return 'Normal';
  if (temperatura < 55) return 'Risco moderado';
  return 'Superaquecimento';
};

const initialRoutes: Route[] = [
  {
    id: '1',
    origem: 'São Paulo',
    destino: 'Rio de Janeiro',
    temperatura: 35,
    status: 'Normal'
  },
  {
    id: '2',
    origem: 'Belo Horizonte',
    destino: 'Salvador',
    temperatura: 47,
    status: 'Risco moderado'
  },
  {
    id: '3',
    origem: 'Curitiba',
    destino: 'Porto Alegre',
    temperatura: 60,
    status: 'Superaquecimento'
  }
];

export const RoutesProvider = ({ children }: { children: ReactNode }) => {
  const [routes, setRoutes] = useState<Route[]>(initialRoutes);
  const [statusFilter, setStatusFilter] = useState('');

  const addRoute = (routeData: Omit<Route, 'id' | 'status'>) => {
    const newRoute: Route = {
      ...routeData,
      id: Date.now().toString(),
      status: getStatusFromTemperature(routeData.temperatura)
    };
    setRoutes(prev => [newRoute, ...prev]);
  };

  const updateRoute = (id: string, routeData: Partial<Route>) => {
    setRoutes(prev => prev.map(route => {
      if (route.id === id) {
        const updated = { ...route, ...routeData };
        if (routeData.temperatura !== undefined) {
          updated.status = getStatusFromTemperature(routeData.temperatura);
        }
        return updated;
      }
      return route;
    }));
  };

  const deleteRoute = (id: string) => {
    setRoutes(prev => prev.filter(route => route.id !== id));
  };

  const filteredRoutes = statusFilter 
    ? routes.filter(route => route.status === statusFilter)
    : routes;

  return (
    <RoutesContext.Provider value={{
      routes,
      addRoute,
      updateRoute,
      deleteRoute,
      filteredRoutes,
      statusFilter,
      setStatusFilter
    }}>
      {children}
    </RoutesContext.Provider>
  );
};

export const useRoutes = () => {
  const context = useContext(RoutesContext);
  if (context === undefined) {
    throw new Error('useRoutes must be used within a RoutesProvider');
  }
  return context;
};