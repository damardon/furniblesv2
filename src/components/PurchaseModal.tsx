
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CreditCard, 
  Download, 
  Shield, 
  CheckCircle, 
  Mail,
  User,
  MapPin
} from "lucide-react";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    title: string;
    price: number;
    image: string;
    seller: string;
  };
}

const PurchaseModal = ({ isOpen, onClose, product }: PurchaseModalProps) => {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    agreeTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProceedToPayment = () => {
    if (formData.email && formData.name && formData.agreeTerms) {
      setStep('payment');
    }
  };

  const handleCompletePurchase = () => {
    setStep('success');
  };

  const resetAndClose = () => {
    setStep('details');
    setFormData({
      email: '',
      name: '',
      address: '',
      city: '',
      zipCode: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      agreeTerms: false
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-furnibles-gray-900">
            {step === 'details' && 'Información de Compra'}
            {step === 'payment' && 'Método de Pago'}
            {step === 'success' && '¡Compra Exitosa!'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Summary */}
          <div className="flex items-center space-x-4 p-4 bg-furnibles-gray-50 rounded-lg">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-furnibles-gray-900 text-sm">
                {product.title}
              </h3>
              <p className="text-xs text-furnibles-gray-600">Por {product.seller}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-bold text-furnibles-orange">
                  ${product.price}
                </span>
                <Badge className="bg-furnibles-orange text-white">
                  Descarga Digital
                </Badge>
              </div>
            </div>
          </div>

          {step === 'details' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-furnibles-gray-700">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="name" className="text-furnibles-gray-700">
                  Nombre Completo *
                </Label>
                <Input
                  id="name"
                  placeholder="Tu nombre completo"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
                />
                <Label htmlFor="terms" className="text-sm text-furnibles-gray-600">
                  Acepto los términos y condiciones
                </Label>
              </div>

              <Button 
                onClick={handleProceedToPayment}
                disabled={!formData.email || !formData.name || !formData.agreeTerms}
                className="w-full bg-furnibles-orange hover:bg-furnibles-orange-dark"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Continuar al Pago
              </Button>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber" className="text-furnibles-gray-700">
                  Número de Tarjeta
                </Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate" className="text-furnibles-gray-700">
                    Fecha de Vencimiento
                  </Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/AA"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv" className="text-furnibles-gray-700">
                    CVV
                  </Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="text-furnibles-gray-600">Total:</span>
                <span className="text-xl font-bold text-furnibles-orange">
                  ${product.price}
                </span>
              </div>

              <div className="flex items-center justify-center text-sm text-furnibles-gray-600">
                <Shield className="w-4 h-4 mr-1" />
                Pago seguro con encriptación SSL
              </div>

              <Button 
                onClick={handleCompletePurchase}
                className="w-full bg-furnibles-orange hover:bg-furnibles-orange-dark"
              >
                <Download className="w-4 h-4 mr-2" />
                Completar Compra - ${product.price}
              </Button>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-furnibles-gray-900 mb-2">
                  ¡Compra realizada con éxito!
                </h3>
                <p className="text-furnibles-gray-600 text-sm">
                  Recibirás un email con el enlace de descarga en los próximos minutos.
                </p>
              </div>

              <div className="bg-furnibles-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-center space-x-2 text-sm text-furnibles-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>Enviado a: {formData.email}</span>
                </div>
              </div>

              <Button 
                onClick={resetAndClose}
                className="w-full bg-furnibles-orange hover:bg-furnibles-orange-dark"
              >
                Cerrar
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseModal;
