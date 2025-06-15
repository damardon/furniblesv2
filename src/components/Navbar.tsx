
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, User, ShoppingCart, Settings, MessageCircle } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavbarProps {
  userType?: 'buyer' | 'seller' | 'admin';
}

const Navbar = ({ userType }: NavbarProps) => {
  const { t } = useLanguage();

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
          {userType === 'buyer' && (
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
          
          {userType === 'seller' && (
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
          
          {userType === 'admin' && (
            <Link to="/admin">
              <Button variant="ghost" size="sm" className="text-furnibles-gray-700 hover:text-furnibles-gray-900 hover:bg-furnibles-gray-100">
                <Settings className="w-4 h-4 mr-2" />
                {t('nav.adminPanel')}
              </Button>
            </Link>
          )}
          
          {!userType && (
            <>
              <Link to="/buyer">
                <Button variant="ghost" size="sm" className="text-furnibles-gray-700 hover:text-furnibles-gray-900 hover:bg-furnibles-gray-100">
                  {t('nav.buyPlans')}
                </Button>
              </Link>
              <Link to="/seller">
                <Button className="bg-furnibles-orange hover:bg-furnibles-orange-dark text-white">
                  {t('nav.sellPlans')}
                </Button>
              </Link>
            </>
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
