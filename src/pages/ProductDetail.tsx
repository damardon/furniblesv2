
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Comments from "@/components/Comments";
import { useParams, Link } from "react-router-dom";
import { 
  Download, 
  Heart, 
  Share2, 
  Star, 
  User,
  Calendar,
  Ruler,
  FileText,
  Shield,
  ArrowLeft
} from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  
  // Mock product data - in real app this would come from API
  const product = {
    id: id,
    title: "Mesa de Centro Moderna Minimalista con Almacenamiento",
    description: "Una elegante mesa de centro con diseño minimalista que incluye compartimientos de almacenamiento ocultos. Perfecta para espacios modernos que buscan funcionalidad sin sacrificar el estilo.",
    category: "Sala de estar",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    seller: {
      name: "Diseños Luna",
      rating: 4.9,
      sales: 1250,
      avatar: "/placeholder.svg",
      slug: "disenos-luna"
    },
    rating: 4.9,
    reviews: 127,
    downloads: 1250,
    price: 5,
    featured: true,
    specifications: {
      dimensions: "120cm x 60cm x 45cm",
      materials: "Madera de roble, MDF",
      difficulty: "Intermedio",
      tools: "Sierra circular, taladro, lijadora",
      time: "6-8 horas"
    },
    features: [
      "Planos detallados con medidas exactas",
      "Lista de materiales incluida",
      "Instrucciones paso a paso",
      "Diferentes vistas y cortes",
      "Tips de construcción profesionales"
    ],
    files: [
      "Planos principales (PDF)",
      "Lista de materiales (PDF)", 
      "Instrucciones de construcción (PDF)",
      "Archivo CAD (DWG)"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="buyer" />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6">
          <Link to="/buyer" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver al marketplace
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-white border">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((img, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden bg-white border cursor-pointer hover:border-amber-300">
                  <img 
                    src={img} 
                    alt={`Vista ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-amber-600">
                  {product.category}
                </Badge>
                {product.featured && (
                  <Badge variant="secondary">
                    Destacado
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-gray-600 ml-1">({product.reviews} reseñas)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Download className="w-4 h-4 mr-1" />
                  <span>{product.downloads} descargas</span>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price and Actions */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-3xl font-bold text-amber-600">${product.price}.00</span>
                    <p className="text-sm text-gray-600">Descarga instantánea</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-lg py-6">
                  <Download className="w-5 h-5 mr-2" />
                  Comprar y Descargar Ahora
                </Button>
                
                <div className="flex items-center justify-center mt-4 text-sm text-gray-600">
                  <Shield className="w-4 h-4 mr-1" />
                  Garantía de satisfacción 30 días
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src={product.seller.avatar} 
                    alt={product.seller.name}
                    className="w-12 h-12 rounded-full bg-gray-200"
                  />
                  <div className="flex-1">
                    <Link 
                      to={`/seller/${product.seller.slug}`}
                      className="font-semibold text-gray-900 hover:text-amber-600"
                    >
                      {product.seller.name}
                    </Link>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{product.seller.rating}</span>
                      <span>•</span>
                      <span>{product.seller.sales} ventas</span>
                    </div>
                  </div>
                  <Link to={`/seller/${product.seller.slug}`}>
                    <Button variant="outline">
                      Ver Perfil
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Specifications */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Especificaciones</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dimensiones:</span>
                  <span className="font-medium">{product.specifications.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Materiales:</span>
                  <span className="font-medium">{product.specifications.materials}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dificultad:</span>
                  <span className="font-medium">{product.specifications.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Herramientas:</span>
                  <span className="font-medium">{product.specifications.tools}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tiempo estimado:</span>
                  <span className="font-medium">{product.specifications.time}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Included */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">¿Qué incluye?</h2>
              <div className="space-y-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="font-semibold text-gray-900 mb-3">Archivos incluidos:</h3>
              <div className="space-y-2">
                {product.files.map((file, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{file}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comments Section */}
        <Comments productId={product.id || "1"} />
      </div>
    </div>
  );
};

export default ProductDetail;
