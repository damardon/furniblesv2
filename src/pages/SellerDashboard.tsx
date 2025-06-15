
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  Download, 
  Eye, 
  Plus, 
  TrendingUp,
  FileText,
  Star,
  Edit,
  Trash2
} from "lucide-react";

const SellerDashboard = () => {
  const stats = [
    { icon: DollarSign, label: "Ganancias Totales", value: "$1,890", change: "+12%" },
    { icon: Download, label: "Descargas Totales", value: "542", change: "+8%" },
    { icon: Eye, label: "Vistas del Perfil", value: "1,230", change: "+15%" },
    { icon: Star, label: "Calificación Promedio", value: "4.8/5", change: "+0.2" },
  ];

  const recentSales = [
    { id: "1", product: "Mesa de Centro Moderna", buyer: "Carlos M.", date: "Hace 2 horas", amount: "$4.50" },
    { id: "2", product: "Estantería Modular", buyer: "Ana L.", date: "Hace 5 horas", amount: "$4.50" },
    { id: "3", product: "Cama King Size", buyer: "Roberto P.", date: "Ayer", amount: "$4.50" },
    { id: "4", product: "Mesa de Comedor", buyer: "María G.", date: "Hace 2 días", amount: "$4.50" },
  ];

  const myProducts = [
    {
      id: "1",
      title: "Mesa de Centro Moderna Minimalista",
      status: "Activo",
      downloads: 1250,
      revenue: "$562.50",
      rating: 4.9,
      image: "/placeholder.svg"
    },
    {
      id: "2",
      title: "Estantería Modular Escandinava",
      status: "Activo", 
      downloads: 980,
      revenue: "$441.00",
      rating: 4.8,
      image: "/placeholder.svg"
    },
    {
      id: "3",
      title: "Cama King Size con Almacenamiento",
      status: "En Revisión",
      downloads: 0,
      revenue: "$0.00",
      rating: 0,
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="seller" />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard del Vendedor
            </h1>
            <p className="text-gray-600">
              Gestiona tus planos y ve tu rendimiento
            </p>
          </div>
          
          <Button className="bg-amber-600 hover:bg-amber-700 mt-4 lg:mt-0">
            <Plus className="w-4 h-4 mr-2" />
            Subir Nuevo Plano
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="products">Mis Planos</TabsTrigger>
            <TabsTrigger value="sales">Ventas</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Sales */}
              <Card>
                <CardHeader>
                  <CardTitle>Ventas Recientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSales.map((sale) => (
                      <div key={sale.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{sale.product}</p>
                          <p className="text-sm text-gray-600">Comprado por {sale.buyer}</p>
                          <p className="text-xs text-gray-500">{sale.date}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold text-green-600">{sale.amount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Rendimiento Mensual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Gráfico de rendimiento</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {myProducts.map((product) => (
                <Card key={product.id}>
                  <CardHeader className="p-0">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge 
                        variant={product.status === 'Activo' ? 'default' : 'secondary'}
                        className={product.status === 'Activo' ? 'bg-green-600' : ''}
                      >
                        {product.status}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{product.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    
                    <div className="space-y-1 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Descargas:</span>
                        <span className="font-medium">{product.downloads}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Ingresos:</span>
                        <span className="font-medium text-green-600">{product.revenue}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Trash2 className="w-3 h-3 mr-1" />
                        Eliminar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Ventas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSales.map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{sale.product}</p>
                        <p className="text-sm text-gray-600">Comprador: {sale.buyer}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">{sale.date}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-green-600">{sale.amount}</span>
                        <p className="text-xs text-gray-500">Comisión: $0.50</p>
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
                  <CardTitle>Analytics de Productos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Gráficos de analytics próximamente</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Tendencias de Mercado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Datos de tendencias próximamente</p>
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

export default SellerDashboard;
