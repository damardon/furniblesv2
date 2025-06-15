
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, SlidersHorizontal, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SearchFilters = () => {
  const categories = [
    "Sala de estar", "Dormitorio", "Cocina", "Baño", "Oficina", 
    "Comedor", "Exterior", "Infantil", "Storage"
  ];

  const designers = [
    "Diseños Luna", "Nordic Furniture Co.", "Comfort Designs", 
    "Classic Wood Works", "Office Solutions", "Storage Masters",
    "Kitchen Craft", "Vintage Vibes"
  ];

  return (
    <div className="bg-white border-b border-gray-200 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Buscar planos de muebles..." 
              className="pl-10"
            />
          </div>
          
          <Select>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full lg:w-48">
              <User className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Diseñador" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los diseñadores</SelectItem>
              {designers.map((designer) => (
                <SelectItem key={designer} value={designer.toLowerCase()}>
                  {designer}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Más recientes</SelectItem>
              <SelectItem value="popular">Más populares</SelectItem>
              <SelectItem value="rating">Mejor valorados</SelectItem>
              <SelectItem value="downloads">Más descargados</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="lg:w-auto">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">
            Gratis
          </Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">
            Premium
          </Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">
            Nuevos
          </Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">
            Populares
          </Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">
            Top Diseñadores
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
