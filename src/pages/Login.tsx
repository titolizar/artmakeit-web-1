import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Header, Footer } from '../components/Shared';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = isSignUp 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(error.message);
    } else {
      if (isSignUp) {
        alert("¡Registro exitoso! Revisa tu email para confirmar.");
      } else {
        navigate('/store');
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-black)', paddingTop: '5rem' }}>
        <div className="card-dark" style={{ width: '100%', maxWidth: '400px', padding: '3rem' }}>
          <div className="telemetry-data" style={{ color: 'var(--color-red)', marginBottom: '1rem' }}>
            [ PROTOCOLO DE ACCESO ]
          </div>
          <h2 className="h2" style={{ marginBottom: '3rem' }}>
            {isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </h2>

          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <label className="telemetry-data" style={{ display: 'block', marginBottom: '0.5rem', color: '#888' }}>Email</label>
              <input 
                type="email" required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '1rem', backgroundColor: '#111', border: '1px solid #333', color: 'white' }}
              />
            </div>

            <div>
              <label className="telemetry-data" style={{ display: 'block', marginBottom: '0.5rem', color: '#888' }}>Password</label>
              <input 
                type="password" required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '1rem', backgroundColor: '#111', border: '1px solid #333', color: 'white' }}
              />
            </div>

            <button type="submit" disabled={loading} className="mag-btn accent-bg" style={{ padding: '1.5rem', width: '100%' }}>
              {loading ? 'PROCESANDO...' : (isSignUp ? 'REGISTRARSE' : 'ENTRAR')}
            </button>
          </form>

          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ marginTop: '2rem', background: 'none', border: 'none', color: '#666', cursor: 'pointer', width: '100%' }}
          >
            {isSignUp ? '¿Ya tienes cuenta? Entra aquí' : '¿No tienes cuenta? Registrate'}
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Login;
