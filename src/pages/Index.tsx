
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { 
  Download, 
  Users, 
  DollarSign, 
  Star, 
  ArrowRight,
  Sofa,
  Bed,
  ChefHat,
  Briefcase
} from "lucide-react";

const Index = () => {
  const stats = [
    { icon: Download, label: "Planos Descargados", value: "50,000+" },
    { icon: Users, label: "Diseñadores Activos", value: "2,500+" },
    { icon: DollarSign, label: "Ventas Totales", value: "$250,000+" },
    { icon: Star, label: "Calificación Promedio", value: "4.8/5" },
  ];

  const categories = [
    { icon: Sofa, name: "Sala de estar", count: "1,200+ planos" },
    { icon: Bed, name: "Dormitorio", count: "800+ planos" },
    { icon: ChefHat, name: "Cocina", count: "600+ planos" },
    { icon: Briefcase, name: "Oficina", count: "400+ planos" },
  ];

  const featuredProducts = [
    {
      id: "1",
      title: "Mesa de Centro Moderna Minimalista",
      image: "/placeholder.svg",
      seller: "Diseños Luna",
      rating: 4.9,
      downloads: 1250
    },
    {
      id: "2", 
      title: "Estantería Modular Escandinava",
      image: "/placeholder.svg",
      seller: "Nordic Furniture",
      rating: 4.8,
      downloads: 980
    },
    {
      id: "3",
      title: "Cama King Size con Almacenamiento",
      image: "/placeholder.svg",
      seller: "Comfort Designs",
      rating: 4.9,
      downloads: 1100
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            El Marketplace de Planos de Muebles
            <span className="text-amber-600"> Más Grande del Mundo</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Descubre, compra y vende planos de muebles únicos. Todos los planos a $5. 
            Conectamos diseñadores talentosos con personas que buscan crear muebles increíbles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/buyer">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-lg px-8">
                Explorar Planos
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/seller">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Vender tus Diseños
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Explora por Categorías
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <category.icon className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Planos Destacados</h2>
            <Link to="/buyer">
              <Button variant="outline">
                Ver Todos
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-amber-600">Destacado</Badge>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{product.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">Por {product.seller}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{product.downloads} descargas</span>
                      <span className="font-bold text-amber-600">$5.00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            ¿Listo para comenzar tu próximo proyecto?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Únete a miles de makers que ya están creando muebles increíbles con nuestros planos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/buyer">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Comprar Planos
              </Button>
            </Link>
            <Link to="/seller">
              <Button size="lg" variant="outline" className="text-lg px-8 text-white border-white hover:bg-white hover:text-amber-600">
                Vender Diseños
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-2xl font-bold">Furnibles</span>
              </div>
              <p className="text-gray-400">
                El marketplace líder en planos de muebles descargables.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Marketplace</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Explorar Planos</li>
                <li>Categorías</li>
                <li>Vendedores Top</li>
                <li>Nuevos Diseños</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Vendedores</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Comenzar a Vender</li>
                <li>Guías de Diseño</li>
                <li>Recursos</li>
                <li>Soporte</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Acerca de</li>
                <li>Blog</li>
                <li>Términos</li>
                <li>Privacidad</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Furnibles. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
