
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailSignup, setEmailSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    window.location.href = "/";
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({
      email: emailSignup,
      password: passwordSignup,
      options: { emailRedirectTo: `${window.location.origin}/` }
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setMode("login");
    setError("Registro exitoso. Por favor revisa tu correo para confirmar.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-6">
        <CardContent>
          <h2 className="mb-6 text-xl font-bold text-gray-800 text-center">{mode === "login" ? "Iniciar sesión" : "Crear cuenta"}</h2>
          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
          <form onSubmit={mode === "login" ? handleLogin : handleSignup} className="space-y-3">
            {mode === "login" ? (
              <>
                <Input type="email" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} required />
                <Input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
              </>
            ) : (
              <>
                <Input type="email" placeholder="Correo electrónico" value={emailSignup} onChange={e => setEmailSignup(e.target.value)} required />
                <Input type="password" placeholder="Contraseña" value={passwordSignup} onChange={e => setPasswordSignup(e.target.value)} required />
              </>
            )}
            <Button disabled={loading} type="submit" className="w-full mt-2">{mode === "login" ? "Entrar" : "Registrarse"}</Button>
          </form>
          <div className="mt-4 text-center">
            {mode === "login" ? (
              <span>¿No tienes cuenta?{" "}
                <button className="underline text-blue-600" onClick={() => setMode("signup")}>Regístrate</button>
              </span>
            ) : (
              <span>¿Ya tienes cuenta?{" "}
                <button className="underline text-blue-600" onClick={() => setMode("login")}>Inicia sesión</button>
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
