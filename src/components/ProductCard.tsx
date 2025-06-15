
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Download, Star, User } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
  seller: string;
  rating: number;
  downloads: number;
  price: number;
  featured?: boolean;
}

const ProductCard = ({ id, title, category, image, seller, rating, downloads, price, featured }: ProductCardProps) => {
  const getSellerSlug = (sellerName: string) => {
    return sellerName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  };

  return (
    <Card className="group hover:shadow-md transition-all duration-300 hover:-translate-y-1 border-gray-200 bg-white">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {featured && (
            <Badge className="absolute top-3 left-3 bg-gray-800 text-white hover:bg-gray-700">
              Destacado
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-800"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200">
            {category}
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 fill-gray-400 text-gray-400" />
            <span className="text-xs text-gray-600">{rating}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm">
          {title}
        </h3>
        
        <Link 
          to={`/seller/${getSellerSlug(seller)}`}
          className="text-sm text-gray-600 hover:text-gray-800 mb-2 inline-flex items-center"
        >
          <User className="w-3 h-3 mr-1" />
          Por {seller}
        </Link>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Download className="w-3 h-3 text-gray-500" />
            <span className="text-xs text-gray-500">{downloads} descargas</span>
          </div>
          <span className="font-bold text-lg text-gray-800">${price}</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Link to={`/product/${id}`} className="w-full">
          <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white">
            Ver Detalles
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
