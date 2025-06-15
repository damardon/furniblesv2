
import Navbar from "@/components/Navbar";
import SearchFilters from "@/components/SearchFilters";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Grid, List, Filter } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const BuyerDashboard = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { t } = useLanguage();
  
  const products = [
    {
      id: "1",
      title: "Mesa de Centro Moderna Minimalista con Almacenamiento",
      category: "Sala de estar",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80",
      seller: "Diseños Luna",
      rating: 4.9,
      downloads: 1250,
      price: 5,
      featured: true
    },
    {
      id: "2",
      title: "Estantería Modular Escandinava de 5 Niveles",
      category: "Storage",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      seller: "Nordic Furniture Co.",
      rating: 4.8,
      downloads: 980,
      price: 5
    },
    {
      id: "3",
      title: "Cama King Size con Cabecera y Cajones",
      category: "Dormitorio", 
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
      seller: "Comfort Designs",
      rating: 4.9,
      downloads: 1100,
      price: 5,
      featured: true
    },
    {
      id: "4",
      title: "Mesa de Comedor Extensible para 8 Personas",
      category: "Comedor",
      image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=800&q=80",
      seller: "Classic Wood Works",
      rating: 4.7,
      downloads: 750,
      price: 5
    },
    {
      id: "5",
      title: "Escritorio Ejecutivo con Cajones Laterales",
      category: "Oficina",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      seller: "Office Solutions",
      rating: 4.6,
      downloads: 650,
      price: 5
    },
    {
      id: "6",
      title: "Armario Empotrado de 3 Puertas",
      category: "Dormitorio",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      seller: "Storage Masters",
      rating: 4.8,
      downloads: 890,
      price: 5
    },
    {
      id: "7",
      title: "Banco de Cocina con Respaldo Alto",
      category: "Cocina",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      seller: "Kitchen Craft",
      rating: 4.5,
      downloads: 420,
      price: 5
    },
    {
      id: "8",
      title: "Sillón Reclinable de Cuero Vintage",
      category: "Sala de estar",
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
      seller: "Vintage Vibes",
      rating: 4.9,
      downloads: 1300,
      price: 5,
      featured: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="buyer" />
      <SearchFilters />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('buyer.title')}
            </h1>
            <p className="text-gray-600">
              {products.length} {t('buyer.subtitle')}
            </p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 lg:mt-0">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="default" className="bg-furnibles-orange hover:bg-furnibles-orange-dark">
            {t('buyer.filters.all')}
          </Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">
            {t('buyer.filters.featured')}
          </Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">
            {t('buyer.filters.mostDownloaded')}
          </Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">
            {t('buyer.filters.bestRated')}
          </Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">
            {t('buyer.filters.new')}
          </Badge>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            {t('buyer.loadMore')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
