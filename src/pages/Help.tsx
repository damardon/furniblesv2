
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import { MessageCircle, Phone, Mail, Search, Send } from "lucide-react";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const faqData = [
    {
      question: "¿Cómo descargo los planos después de la compra?",
      answer: "Una vez completada la compra, recibirás un email con los enlaces de descarga. También puedes acceder a tus descargas desde tu perfil en la sección 'Mis Compras'."
    },
    {
      question: "¿Qué formatos de archivo están incluidos?",
      answer: "Cada plano incluye archivos en PDF con las instrucciones detalladas, lista de materiales, y archivos CAD (DWG) para medidas exactas."
    },
    {
      question: "¿Puedo modificar los planos según mis necesidades?",
      answer: "Sí, todos nuestros planos son editables. Te recomendamos tener conocimientos básicos de carpintería o consultar con un profesional para modificaciones estructurales."
    },
    {
      question: "¿Ofrecen garantía en los planos?",
      answer: "Sí, ofrecemos una garantía de satisfacción de 30 días. Si no estás satisfecho con tu compra, te devolvemos el dinero."
    },
    {
      question: "¿Cómo puedo contactar al diseñador de un plano?",
      answer: "Puedes enviar un mensaje directo al diseñador desde la página del producto o su perfil. También puedes dejar comentarios públicos en el plano."
    },
    {
      question: "¿Qué herramientas necesito para construir los muebles?",
      answer: "Cada plano incluye una lista detallada de herramientas necesarias. Generalmente incluye herramientas básicas de carpintería como sierra, taladro, lijadora, etc."
    },
    {
      question: "¿Puedo vender muebles hechos con estos planos?",
      answer: "Sí, puedes construir y vender muebles para uso comercial. Sin embargo, no puedes redistribuir o revender los planos digitales."
    },
    {
      question: "¿Cómo me convierto en vendedor en Furnibles?",
      answer: "Puedes registrarte como vendedor desde nuestra página principal. Necesitarás verificar tu identidad y subir algunos ejemplos de tu trabajo."
    }
  ];

  const filteredFaq = faqData.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWhatsAppContact = () => {
    const phoneNumber = "34666777888"; // Replace with actual WhatsApp number
    const message = "Hola, necesito ayuda con Furnibles";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would submit the form to your backend
    console.log("Submitting contact form:", contactForm);
    // Reset form
    setContactForm({ name: "", email: "", message: "" });
    alert("Mensaje enviado. Te responderemos pronto.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Centro de Ayuda</h1>
          <p className="text-gray-600">¿Necesitas ayuda? Estamos aquí para apoyarte</p>
        </div>

        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">WhatsApp</h3>
              <p className="text-sm text-gray-600 mb-3">Respuesta inmediata</p>
              <Button 
                onClick={handleWhatsAppContact}
                className="bg-green-600 hover:bg-green-700"
              >
                Contactar
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm text-gray-600 mb-3">Respuesta en 24h</p>
              <Button variant="outline">
                soporte@furnibles.com
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Phone className="w-8 h-8 text-amber-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Teléfono</h3>
              <p className="text-sm text-gray-600 mb-3">Lun-Vie 9:00-18:00</p>
              <Button variant="outline">
                +34 666 777 888
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <div>
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold text-gray-900">Preguntas Frecuentes</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Buscar en FAQ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaq.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold text-gray-900">Envía tu Consulta</h2>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitForm} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre
                    </label>
                    <Input
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      placeholder="tu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje
                    </label>
                    <Textarea
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      placeholder="Describe tu consulta..."
                      rows={4}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
