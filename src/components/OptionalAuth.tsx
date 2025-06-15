
import { useAuth } from "@/hooks/useAuth";

interface OptionalAuthProps {
  children: React.ReactNode;
  authenticatedContent?: React.ReactNode;
}

const OptionalAuth = ({ children, authenticatedContent }: OptionalAuthProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-furnibles-orange"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si hay contenido específico para usuarios autenticados y el usuario está logueado
  if (user && authenticatedContent) {
    return <>{authenticatedContent}</>;
  }

  // Siempre mostrar el contenido por defecto (público)
  return <>{children}</>;
};

export default OptionalAuth;
