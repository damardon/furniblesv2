
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
    <div className="bg-white border-b border-furnibles-gray-200 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-furnibles-gray-400" />
            <Input 
              placeholder="Buscar planos de muebles..." 
              className="pl-10 border-furnibles-gray-300 focus:border-furnibles-orange focus:ring-furnibles-orange"
            />
          </div>
          
          <Select>
            <SelectTrigger className="w-full lg:w-48 border-furnibles-gray-300">
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
            <SelectTrigger className="w-full lg:w-48 border-furnibles-gray-300">
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
            <SelectTrigger className="w-full lg:w-48 border-furnibles-gray-300">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Más recientes</SelectItem>
              <SelectItem value="popular">Más populares</SelectItem>
              <SelectItem value="rating">Mejor valorados</SelectItem>
              <SelectItem value="downloads">Más descargados</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="lg:w-auto border-furnibles-gray-300 text-furnibles-gray-700 hover:bg-furnibles-gray-50">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="cursor-pointer hover:bg-furnibles-gray-200 bg-furnibles-gray-100 text-furnibles-gray-700">
            Gratis
          </Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-furnibles-orange-light bg-furnibles-orange text-white">
            Premium
          </Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-furnibles-gray-200 bg-furnibles-gray-100 text-furnibles-gray-700">
            Nuevos
          </Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-furnibles-gray-200 bg-furnibles-gray-100 text-furnibles-gray-700">
            Populares
          </Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-furnibles-gray-200 bg-furnibles-gray-100 text-furnibles-gray-700">
            Top Diseñadores
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
