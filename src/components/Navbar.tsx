
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
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">Furnibles</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {userType === 'buyer' && (
            <>
              <Link to="/buyer">
                <Button variant="ghost" size="sm">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {t('nav.marketplace')}
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                {t('nav.profile')}
              </Button>
            </>
          )}
          
          {userType === 'seller' && (
            <>
              <Link to="/seller">
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  {t('nav.dashboard')}
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                {t('nav.profile')}
              </Button>
            </>
          )}
          
          {userType === 'admin' && (
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                {t('nav.adminPanel')}
              </Button>
            </Link>
          )}
          
          {!userType && (
            <>
              <Link to="/buyer">
                <Button variant="ghost" size="sm">
                  {t('nav.buyPlans')}
                </Button>
              </Link>
              <Link to="/seller">
                <Button variant="outline" size="sm">
                  {t('nav.sellPlans')}
                </Button>
              </Link>
            </>
          )}
          
          <Link to="/help">
            <Button variant="ghost" size="sm">
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
