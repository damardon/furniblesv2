
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Star, ArrowLeft, MapPin, Calendar, Award, MessageCircle } from "lucide-react";

const SellerProfile = () => {
  const { sellerId } = useParams();
  
  // Mock seller data - in real app this would come from API
  const seller = {
    id: sellerId,
    name: "Diseños Luna",
    rating: 4.9,
    reviews: 127,
    sales: 1250,
    avatar: "/placeholder.svg",
    banner: "/placeholder.svg",
    location: "Madrid, España",
    joinedDate: "Enero 2022",
    description: "Especialista en diseño de muebles modernos y minimalistas. Con más de 8 años de experiencia en carpintería y diseño de interiores, me apasiona crear piezas funcionales y elegantes que transformen los espacios.",
    specialties: ["Minimalista", "Moderno", "Escandinavo", "Industrial"],
    achievements: [
      "Top Seller 2023",
      "Más de 1000 ventas",
      "Calificación 4.9+",
      "Diseñador Verificado"
    ]
  };

  const sellerProducts = [
    {
      id: "1",
      title: "Mesa de Centro Moderna Minimalista con Almacenamiento",
      category: "Sala de estar",
      image: "/placeholder.svg",
      seller: "Diseños Luna",
      rating: 4.9,
      downloads: 1250,
      price: 5,
      featured: true
    },
    {
      id: "3",
      title: "Cama King Size con Cabecera y Cajones",
      category: "Dormitorio", 
      image: "/placeholder.svg",
      seller: "Diseños Luna",
      rating: 4.9,
      downloads: 1100,
      price: 5,
      featured: true
    },
    {
      id: "9",
      title: "Estantería Flotante Minimalista",
      category: "Storage",
      image: "/placeholder.svg",
      seller: "Diseños Luna",
      rating: 4.8,
      downloads: 890,
      price: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="buyer" />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6">
          <Link to="/buyer" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver al marketplace
          </Link>
        </div>

        {/* Seller Header */}
        <Card className="mb-8 border-gray-200">
          <div className="h-32 bg-gradient-to-r from-gray-700 to-gray-800 rounded-t-lg"></div>
          <CardContent className="p-6 -mt-16 relative">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
              <img 
                src={seller.avatar} 
                alt={seller.name}
                className="w-24 h-24 rounded-full border-4 border-white bg-gray-200"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{seller.name}</h1>
                  <Badge className="bg-gray-800 text-white hover:bg-gray-700">Verificado</Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-gray-400 text-gray-400 mr-1" />
                    <span className="font-semibold">{seller.rating}</span>
                    <span className="ml-1">({seller.reviews} reseñas)</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{seller.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Miembro desde {seller.joinedDate}</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{seller.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {seller.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button className="bg-gray-800 hover:bg-gray-700 text-white">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contactar
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Products */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Planos de {seller.name} ({sellerProducts.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sellerProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="border-gray-200">
              <CardHeader>
                <h3 className="font-semibold text-gray-900">Estadísticas</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total de ventas:</span>
                  <span className="font-semibold text-gray-900">{seller.sales}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Planos activos:</span>
                  <span className="font-semibold text-gray-900">{sellerProducts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Calificación promedio:</span>
                  <span className="font-semibold text-gray-900">{seller.rating}/5.0</span>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-gray-200">
              <CardHeader>
                <h3 className="font-semibold text-gray-900">Logros</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {seller.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">{achievement}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
