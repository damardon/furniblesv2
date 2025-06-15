
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Download, Star } from "lucide-react";
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
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {featured && (
            <Badge className="absolute top-3 left-3 bg-amber-600">
              Destacado
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-white/80 hover:bg-white"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600">{rating}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-2">Por {seller}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Download className="w-3 h-3 text-gray-500" />
            <span className="text-xs text-gray-500">{downloads} descargas</span>
          </div>
          <span className="font-bold text-lg text-amber-600">${price}</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Link to={`/product/${id}`} className="w-full">
          <Button className="w-full bg-amber-600 hover:bg-amber-700">
            Ver Detalles
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
