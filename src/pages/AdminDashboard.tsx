
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  DollarSign, 
  Download, 
  AlertTriangle,
  TrendingUp,
  Search,
  MoreHorizontal,
  Ban,
  CheckCircle,
  XCircle,
  Settings
} from "lucide-react";

const AdminDashboard = () => {
  const platformStats = [
    { icon: Users, label: "Usuarios Totales", value: "12,450", change: "+15%" },
    { icon: DollarSign, label: "Revenue Total", value: "$85,420", change: "+22%" },
    { icon: Download, label: "Descargas Totales", value: "156,780", change: "+18%" },
    { icon: AlertTriangle, label: "Reportes Pendientes", value: "7", change: "-12%" },
  ];

  const recentUsers = [
    { id: "1", name: "Carlos Mendez", email: "carlos@email.com", type: "Buyer", status: "Activo", joined: "Hace 2 horas" },
    { id: "2", name: "Ana López", email: "ana@email.com", type: "Seller", status: "Activo", joined: "Hace 5 horas" },
    { id: "3", name: "Roberto Paz", email: "roberto@email.com", type: "Buyer", status: "Suspendido", joined: "Ayer" },
    { id: "4", name: "María García", email: "maria@email.com", type: "Seller", status: "Activo", joined: "Hace 2 días" },
  ];

  const topSellers = [
    { name: "Diseños Luna", sales: "$4,560", commission: "$456", products: 12, rating: 4.9 },
    { name: "Nordic Furniture", sales: "$3,890", commission: "$389", products: 8, rating: 4.8 },
    { name: "Comfort Designs", sales: "$3,240", commission: "$324", products: 6, rating: 4.9 },
    { name: "Classic Wood Works", sales: "$2,870", commission: "$287", products: 9, rating: 4.7 },
  ];

  const recentTransactions = [
    { id: "TXN001", buyer: "Carlos M.", seller: "Diseños Luna", product: "Mesa de Centro", amount: "$5.00", commission: "$0.50", date: "Hace 1 hora" },
    { id: "TXN002", buyer: "Ana L.", seller: "Nordic Furniture", product: "Estantería", amount: "$5.00", commission: "$0.50", date: "Hace 3 horas" },
    { id: "TXN003", buyer: "Roberto P.", seller: "Comfort Designs", product: "Cama King", amount: "$5.00", commission: "$0.50", date: "Hace 6 horas" },
    { id: "TXN004", buyer: "María G.", seller: "Classic Wood", product: "Mesa Comedor", amount: "$5.00", commission: "$0.50", date: "Ayer" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="admin" />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Panel de Administración
            </h1>
            <p className="text-gray-600">
              Gestiona usuarios, ventas y la salud de la plataforma
            </p>
          </div>
          
          <div className="flex space-x-2 mt-4 lg:mt-0">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700">
              Generar Reporte
            </Button>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {platformStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.label}
                </CardTitle>
                <stat.icon className="w-4 h-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change} vs mes anterior
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="sales">Ventas</TabsTrigger>
            <TabsTrigger value="sellers">Vendedores</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Gestión de Usuarios</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input placeholder="Buscar usuarios..." className="pl-10 w-64" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                          <Badge variant={user.type === 'Seller' ? 'default' : 'secondary'}>
                            {user.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-center">
                        <Badge 
                          variant={user.status === 'Activo' ? 'default' : 'destructive'}
                          className={user.status === 'Activo' ? 'bg-green-600' : ''}
                        >
                          {user.status}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{user.joined}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Settings className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Ban className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transacciones Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{transaction.product}</p>
                        <p className="text-sm text-gray-600">
                          {transaction.buyer} → {transaction.seller}
                        </p>
                        <p className="text-xs text-gray-500">{transaction.id}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{transaction.amount}</p>
                        <p className="text-sm text-green-600">Comisión: {transaction.commission}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sellers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Vendedores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topSellers.map((seller, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-amber-600">#{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{seller.name}</p>
                            <p className="text-sm text-gray-600">{seller.products} productos</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-900">{seller.sales}</p>
                        <p className="text-sm text-gray-600">Ventas totales</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-green-600">{seller.commission}</p>
                        <p className="text-sm text-gray-600">Nuestra comisión</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-900">⭐ {seller.rating}</p>
                        <Button variant="outline" size="sm" className="mt-1">
                          Pagar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Crecimiento de la Plataforma</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Gráfico de crecimiento</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Salud de la Plataforma</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tiempo de actividad</span>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-green-600">99.9%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Velocidad promedio</span>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-green-600">< 2s</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Errores 5xx</span>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-green-600">< 0.1%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Reportes sin resolver</span>
                      <div className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mr-1" />
                        <span className="text-yellow-600">7</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
