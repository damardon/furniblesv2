
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, User, ShoppingCart, Settings, MessageCircle, LogOut } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";

interface NavbarProps {
  userType?: 'buyer' | 'seller' | 'admin';
}

const Navbar = ({ userType }: NavbarProps) => {
  const { t } = useLanguage();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-white border-b border-furnibles-gray-200 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/44f756be-9257-429e-ba48-ee56b40d5992.png" 
            alt="Furnibles Logo" 
            className="w-10 h-10"
          />
          <span className="text-2xl font-bold text-furnibles-gray-900 tracking-tight">FURNIBLES</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {/* Si el usuario está autenticado, mostrar navegación específica por rol */}
          {user && userType === 'buyer' && (
            <>
              <Link to="/buyer">
                <Button variant="ghost" size="sm" className="text-furnibles-gray-700 hover:text-furnibles-gray-900 hover:bg-furnibles-gray-100">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {t('nav.marketplace')}
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="border-furnibles-gray-300 text-furnibles-gray-700 hover:bg-furnibles-gray-50">
                <User className="w-4 h-4 mr-2" />
                {t('nav.profile')}
              </Button>
            </>
          )}
          
          {user && userType === 'seller' && (
            <>
              <Link to="/seller">
                <Button variant="ghost" size="sm" className="text-furnibles-gray-700 hover:text-furnibles-gray-900 hover:bg-furnibles-gray-100">
                  <Settings className="w-4 h-4 mr-2" />
                  {t('nav.dashboard')}
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="border-furnibles-gray-300 text-furnibles-gray-700 hover:bg-furnibles-gray-50">
                <User className="w-4 h-4 mr-2" />
                {t('nav.profile')}
              </Button>
            </>
          )}
          
          {user && userType === 'admin' && (
            <Link to="/admin">
              <Button variant="ghost" size="sm" className="text-furnibles-gray-700 hover:text-furnibles-gray-900 hover:bg-furnibles-gray-100">
                <Settings className="w-4 h-4 mr-2" />
                {t('nav.adminPanel')}
              </Button>
            </Link>
          )}
          
          {/* Si el usuario NO está autenticado, mostrar opciones de login/registro */}
          {!user && (
            <>
              <Link to="/buyer">
                <Button variant="ghost" size="sm" className="text-furnibles-gray-700 hover:text-furnibles-gray-900 hover:bg-furnibles-gray-100">
                  {t('nav.buyPlans')}
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="sm" className="border-furnibles-gray-300 text-furnibles-gray-700 hover:bg-furnibles-gray-50">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/seller">
                <Button className="bg-furnibles-orange hover:bg-furnibles-orange-dark text-white">
                  {t('nav.sellPlans')}
                </Button>
              </Link>
            </>
          )}
          
          {/* Si el usuario está autenticado, mostrar botón de logout */}
          {user && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSignOut}
              className="border-furnibles-gray-300 text-furnibles-gray-700 hover:bg-furnibles-gray-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          )}
          
          <Link to="/help">
            <Button variant="ghost" size="sm" className="text-furnibles-gray-700 hover:text-furnibles-gray-900 hover:bg-furnibles-gray-100">
              <MessageCircle className="w-4 h-4 mr-2" />
              Ayuda
            </Button>
          </Link>
          
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
