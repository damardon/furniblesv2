
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'es' | 'en' | 'it' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations = {
  es: {
    // Navigation
    'nav.marketplace': 'Marketplace',
    'nav.profile': 'Perfil',
    'nav.dashboard': 'Dashboard',
    'nav.adminPanel': 'Panel Admin',
    'nav.buyPlans': 'Comprar Planos',
    'nav.sellPlans': 'Vender Planos',
    
    // Home page
    'home.title': 'El Marketplace de Planos de Muebles',
    'home.titleHighlight': 'Más Grande del Mundo',
    'home.subtitle': 'Descubre, compra y vende planos de muebles únicos. Todos los planos a $5. Conectamos diseñadores talentosos con personas que buscan crear muebles increíbles.',
    'home.explorePlans': 'Explorar Planos',
    'home.sellDesigns': 'Vender tus Diseños',
    'home.stats.downloaded': 'Planos Descargados',
    'home.stats.designers': 'Diseñadores Activos',
    'home.stats.sales': 'Ventas Totales',
    'home.stats.rating': 'Calificación Promedio',
    'home.categories.title': 'Explora por Categorías',
    'home.categories.livingRoom': 'Sala de estar',
    'home.categories.bedroom': 'Dormitorio',
    'home.categories.kitchen': 'Cocina',
    'home.categories.office': 'Oficina',
    'home.featured.title': 'Planos Destacados',
    'home.featured.viewAll': 'Ver Todos',
    'home.featured.downloads': 'descargas',
    'home.cta.title': '¿Listo para comenzar tu próximo proyecto?',
    'home.cta.subtitle': 'Únete a miles de makers que ya están creando muebles increíbles con nuestros planos.',
    'home.cta.buy': 'Comprar Planos',
    'home.cta.sell': 'Vender Diseños',
    
    // Buyer Dashboard
    'buyer.title': 'Descubre Planos Increíbles',
    'buyer.subtitle': 'planos disponibles • Todos a $5.00',
    'buyer.filters.all': 'Todos',
    'buyer.filters.featured': 'Destacados',
    'buyer.filters.mostDownloaded': 'Más Descargados',
    'buyer.filters.bestRated': 'Mejor Valorados',
    'buyer.filters.new': 'Nuevos',
    'buyer.loadMore': 'Cargar Más Planos',
    
    // Admin Dashboard
    'admin.title': 'Panel de Administración',
    'admin.subtitle': 'Gestiona usuarios, ventas y la salud de la plataforma',
    'admin.settings': 'Configuración',
    'admin.generateReport': 'Generar Reporte',
    'admin.stats.totalUsers': 'Usuarios Totales',
    'admin.stats.totalRevenue': 'Revenue Total',
    'admin.stats.totalDownloads': 'Descargas Totales',
    'admin.stats.pendingReports': 'Reportes Pendientes',
    'admin.tabs.users': 'Usuarios',
    'admin.tabs.sales': 'Ventas',
    'admin.tabs.sellers': 'Vendedores',
    'admin.tabs.analytics': 'Analytics',
    
    // Footer
    'footer.description': 'El marketplace líder en planos de muebles descargables.',
    'footer.marketplace': 'Marketplace',
    'footer.explorePlans': 'Explorar Planos',
    'footer.categories': 'Categorías',
    'footer.topSellers': 'Vendedores Top',
    'footer.newDesigns': 'Nuevos Diseños',
    'footer.sellers': 'Vendedores',
    'footer.startSelling': 'Comenzar a Vender',
    'footer.designGuides': 'Guías de Diseño',
    'footer.resources': 'Recursos',
    'footer.support': 'Soporte',
    'footer.company': 'Empresa',
    'footer.about': 'Acerca de',
    'footer.blog': 'Blog',
    'footer.terms': 'Términos',
    'footer.privacy': 'Privacidad',
    'footer.copyright': '© 2024 Furnibles. Todos los derechos reservados.',
  },
  
  en: {
    // Navigation
    'nav.marketplace': 'Marketplace',
    'nav.profile': 'Profile',
    'nav.dashboard': 'Dashboard',
    'nav.adminPanel': 'Admin Panel',
    'nav.buyPlans': 'Buy Plans',
    'nav.sellPlans': 'Sell Plans',
    
    // Home page
    'home.title': 'The World\'s Largest',
    'home.titleHighlight': 'Furniture Plans Marketplace',
    'home.subtitle': 'Discover, buy and sell unique furniture plans. All plans at $5. We connect talented designers with people looking to create incredible furniture.',
    'home.explorePlans': 'Explore Plans',
    'home.sellDesigns': 'Sell Your Designs',
    'home.stats.downloaded': 'Plans Downloaded',
    'home.stats.designers': 'Active Designers',
    'home.stats.sales': 'Total Sales',
    'home.stats.rating': 'Average Rating',
    'home.categories.title': 'Browse by Categories',
    'home.categories.livingRoom': 'Living Room',
    'home.categories.bedroom': 'Bedroom',
    'home.categories.kitchen': 'Kitchen',
    'home.categories.office': 'Office',
    'home.featured.title': 'Featured Plans',
    'home.featured.viewAll': 'View All',
    'home.featured.downloads': 'downloads',
    'home.cta.title': 'Ready to start your next project?',
    'home.cta.subtitle': 'Join thousands of makers who are already creating incredible furniture with our plans.',
    'home.cta.buy': 'Buy Plans',
    'home.cta.sell': 'Sell Designs',
    
    // Buyer Dashboard
    'buyer.title': 'Discover Amazing Plans',
    'buyer.subtitle': 'plans available • All at $5.00',
    'buyer.filters.all': 'All',
    'buyer.filters.featured': 'Featured',
    'buyer.filters.mostDownloaded': 'Most Downloaded',
    'buyer.filters.bestRated': 'Best Rated',
    'buyer.filters.new': 'New',
    'buyer.loadMore': 'Load More Plans',
    
    // Admin Dashboard
    'admin.title': 'Administration Panel',
    'admin.subtitle': 'Manage users, sales and platform health',
    'admin.settings': 'Settings',
    'admin.generateReport': 'Generate Report',
    'admin.stats.totalUsers': 'Total Users',
    'admin.stats.totalRevenue': 'Total Revenue',
    'admin.stats.totalDownloads': 'Total Downloads',
    'admin.stats.pendingReports': 'Pending Reports',
    'admin.tabs.users': 'Users',
    'admin.tabs.sales': 'Sales',
    'admin.tabs.sellers': 'Sellers',
    'admin.tabs.analytics': 'Analytics',
    
    // Footer
    'footer.description': 'The leading marketplace for downloadable furniture plans.',
    'footer.marketplace': 'Marketplace',
    'footer.explorePlans': 'Explore Plans',
    'footer.categories': 'Categories',
    'footer.topSellers': 'Top Sellers',
    'footer.newDesigns': 'New Designs',
    'footer.sellers': 'Sellers',
    'footer.startSelling': 'Start Selling',
    'footer.designGuides': 'Design Guides',
    'footer.resources': 'Resources',
    'footer.support': 'Support',
    'footer.company': 'Company',
    'footer.about': 'About',
    'footer.blog': 'Blog',
    'footer.terms': 'Terms',
    'footer.privacy': 'Privacy',
    'footer.copyright': '© 2024 Furnibles. All rights reserved.',
  },
  
  it: {
    // Navigation
    'nav.marketplace': 'Marketplace',
    'nav.profile': 'Profilo',
    'nav.dashboard': 'Dashboard',
    'nav.adminPanel': 'Pannello Admin',
    'nav.buyPlans': 'Acquista Piani',
    'nav.sellPlans': 'Vendi Piani',
    
    // Home page
    'home.title': 'Il Più Grande Marketplace',
    'home.titleHighlight': 'di Piani Mobili al Mondo',
    'home.subtitle': 'Scopri, acquista e vendi piani mobili unici. Tutti i piani a $5. Colleghiamo designer di talento con persone che vogliono creare mobili incredibili.',
    'home.explorePlans': 'Esplora Piani',
    'home.sellDesigns': 'Vendi i Tuoi Design',
    'home.stats.downloaded': 'Piani Scaricati',
    'home.stats.designers': 'Designer Attivi',
    'home.stats.sales': 'Vendite Totali',
    'home.stats.rating': 'Valutazione Media',
    'home.categories.title': 'Esplora per Categorie',
    'home.categories.livingRoom': 'Soggiorno',
    'home.categories.bedroom': 'Camera da Letto',
    'home.categories.kitchen': 'Cucina',
    'home.categories.office': 'Ufficio',
    'home.featured.title': 'Piani in Evidenza',
    'home.featured.viewAll': 'Vedi Tutti',
    'home.featured.downloads': 'download',
    'home.cta.title': 'Pronto per iniziare il tuo prossimo progetto?',
    'home.cta.subtitle': 'Unisciti a migliaia di maker che stanno già creando mobili incredibili con i nostri piani.',
    'home.cta.buy': 'Acquista Piani',
    'home.cta.sell': 'Vendi Design',
    
    // Buyer Dashboard
    'buyer.title': 'Scopri Piani Incredibili',
    'buyer.subtitle': 'piani disponibili • Tutti a $5.00',
    'buyer.filters.all': 'Tutti',
    'buyer.filters.featured': 'In Evidenza',
    'buyer.filters.mostDownloaded': 'Più Scaricati',
    'buyer.filters.bestRated': 'Meglio Valutati',
    'buyer.filters.new': 'Nuovi',
    'buyer.loadMore': 'Carica Altri Piani',
    
    // Admin Dashboard
    'admin.title': 'Pannello di Amministrazione',
    'admin.subtitle': 'Gestisci utenti, vendite e salute della piattaforma',
    'admin.settings': 'Impostazioni',
    'admin.generateReport': 'Genera Report',
    'admin.stats.totalUsers': 'Utenti Totali',
    'admin.stats.totalRevenue': 'Ricavi Totali',
    'admin.stats.totalDownloads': 'Download Totali',
    'admin.stats.pendingReports': 'Report Pendenti',
    'admin.tabs.users': 'Utenti',
    'admin.tabs.sales': 'Vendite',
    'admin.tabs.sellers': 'Venditori',
    'admin.tabs.analytics': 'Analytics',
    
    // Footer
    'footer.description': 'Il marketplace leader per piani mobili scaricabili.',
    'footer.marketplace': 'Marketplace',
    'footer.explorePlans': 'Esplora Piani',
    'footer.categories': 'Categorie',
    'footer.topSellers': 'Top Venditori',
    'footer.newDesigns': 'Nuovi Design',
    'footer.sellers': 'Venditori',
    'footer.startSelling': 'Inizia a Vendere',
    'footer.designGuides': 'Guide Design',
    'footer.resources': 'Risorse',
    'footer.support': 'Supporto',
    'footer.company': 'Azienda',
    'footer.about': 'Chi Siamo',
    'footer.blog': 'Blog',
    'footer.terms': 'Termini',
    'footer.privacy': 'Privacy',
    'footer.copyright': '© 2024 Furnibles. Tutti i diritti riservati.',
  },
  
  fr: {
    // Navigation
    'nav.marketplace': 'Marketplace',
    'nav.profile': 'Profil',
    'nav.dashboard': 'Tableau de Bord',
    'nav.adminPanel': 'Panneau Admin',
    'nav.buyPlans': 'Acheter Plans',
    'nav.sellPlans': 'Vendre Plans',
    
    // Home page
    'home.title': 'Le Plus Grand Marketplace',
    'home.titleHighlight': 'de Plans de Meubles au Monde',
    'home.subtitle': 'Découvrez, achetez et vendez des plans de meubles uniques. Tous les plans à 5$. Nous connectons des designers talentueux avec des personnes qui cherchent à créer des meubles incroyables.',
    'home.explorePlans': 'Explorer Plans',
    'home.sellDesigns': 'Vendre vos Designs',
    'home.stats.downloaded': 'Plans Téléchargés',
    'home.stats.designers': 'Designers Actifs',
    'home.stats.sales': 'Ventes Totales',
    'home.stats.rating': 'Note Moyenne',
    'home.categories.title': 'Explorer par Catégories',
    'home.categories.livingRoom': 'Salon',
    'home.categories.bedroom': 'Chambre',
    'home.categories.kitchen': 'Cuisine',
    'home.categories.office': 'Bureau',
    'home.featured.title': 'Plans en Vedette',
    'home.featured.viewAll': 'Voir Tout',
    'home.featured.downloads': 'téléchargements',
    'home.cta.title': 'Prêt à commencer votre prochain projet?',
    'home.cta.subtitle': 'Rejoignez des milliers de makers qui créent déjà des meubles incroyables avec nos plans.',
    'home.cta.buy': 'Acheter Plans',
    'home.cta.sell': 'Vendre Designs',
    
    // Buyer Dashboard
    'buyer.title': 'Découvrez des Plans Incroyables',
    'buyer.subtitle': 'plans disponibles • Tous à 5,00$',
    'buyer.filters.all': 'Tous',
    'buyer.filters.featured': 'En Vedette',
    'buyer.filters.mostDownloaded': 'Plus Téléchargés',
    'buyer.filters.bestRated': 'Mieux Notés',
    'buyer.filters.new': 'Nouveaux',
    'buyer.loadMore': 'Charger Plus de Plans',
    
    // Admin Dashboard
    'admin.title': 'Panneau d\'Administration',
    'admin.subtitle': 'Gérez les utilisateurs, les ventes et la santé de la plateforme',
    'admin.settings': 'Paramètres',
    'admin.generateReport': 'Générer Rapport',
    'admin.stats.totalUsers': 'Utilisateurs Totaux',
    'admin.stats.totalRevenue': 'Revenus Totaux',
    'admin.stats.totalDownloads': 'Téléchargements Totaux',
    'admin.stats.pendingReports': 'Rapports Pendants',
    'admin.tabs.users': 'Utilisateurs',
    'admin.tabs.sales': 'Ventes',
    'admin.tabs.sellers': 'Vendeurs',
    'admin.tabs.analytics': 'Analytics',
    
    // Footer
    'footer.description': 'Le marketplace leader pour les plans de meubles téléchargeables.',
    'footer.marketplace': 'Marketplace',
    'footer.explorePlans': 'Explorer Plans',
    'footer.categories': 'Catégories',
    'footer.topSellers': 'Top Vendeurs',
    'footer.newDesigns': 'Nouveaux Designs',
    'footer.sellers': 'Vendeurs',
    'footer.startSelling': 'Commencer à Vendre',
    'footer.designGuides': 'Guides Design',
    'footer.resources': 'Ressources',
    'footer.support': 'Support',
    'footer.company': 'Entreprise',
    'footer.about': 'À Propos',
    'footer.blog': 'Blog',
    'footer.terms': 'Conditions',
    'footer.privacy': 'Confidentialité',
    'footer.copyright': '© 2024 Furnibles. Tous droits réservés.',
  }
};
