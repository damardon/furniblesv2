
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, User, ShoppingCart, Settings } from "lucide-react";

interface NavbarProps {
  userType?: 'buyer' | 'seller' | 'admin';
}

const Navbar = ({ userType }: NavbarProps) => {
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
                  Marketplace
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                Perfil
              </Button>
            </>
          )}
          
          {userType === 'seller' && (
            <>
              <Link to="/seller">
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                Perfil
              </Button>
            </>
          )}
          
          {userType === 'admin' && (
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Admin Panel
              </Button>
            </Link>
          )}
          
          {!userType && (
            <>
              <Link to="/buyer">
                <Button variant="ghost" size="sm">
                  Comprar Planos
                </Button>
              </Link>
              <Link to="/seller">
                <Button variant="outline" size="sm">
                  Vender Planos
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
