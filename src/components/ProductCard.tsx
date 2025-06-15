
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
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-furnibles-gray-200 bg-white">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={image || "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80"} 
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {featured && (
            <Badge className="absolute top-3 left-3 bg-furnibles-orange text-white hover:bg-furnibles-orange-dark">
              Destacado
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-furnibles-gray-600 hover:text-furnibles-gray-800"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs bg-furnibles-gray-100 text-furnibles-gray-700 hover:bg-furnibles-gray-200">
            {category}
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 fill-furnibles-orange text-furnibles-orange" />
            <span className="text-xs text-furnibles-gray-600">{rating}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-furnibles-gray-900 mb-1 line-clamp-2 text-sm">
          {title}
        </h3>
        
        <Link 
          to={`/seller/${getSellerSlug(seller)}`}
          className="text-sm text-furnibles-gray-600 hover:text-furnibles-gray-800 mb-2 inline-flex items-center"
        >
          <User className="w-3 h-3 mr-1" />
          Por {seller}
        </Link>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Download className="w-3 h-3 text-furnibles-gray-500" />
            <span className="text-xs text-furnibles-gray-500">{downloads} descargas</span>
          </div>
          <span className="font-bold text-lg text-furnibles-orange">${price}</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Link to={`/product/${id}`} className="w-full">
          <Button className="w-full bg-furnibles-orange hover:bg-furnibles-orange-dark text-white">
            Ver Detalles
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
