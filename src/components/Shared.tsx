import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const Header = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check for demo session first
    const demoUser = localStorage.getItem('demo_session');
    if (demoUser) {
      setUser(JSON.parse(demoUser));
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('demo_session');
    await supabase.auth.signOut();
    setUser(null);
    window.location.reload();
  };

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, width: '100%', padding: '2rem', zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-white)', textDecoration: 'none', letterSpacing: '-0.05em' }}>
        artmakeit<span className="accent-text">.</span>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
        <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Link to="/store" style={{ color: 'inherit', textDecoration: 'none' }}>Store</Link>
          <span>Work</span>
          <span>Contact</span>
        </nav>
        
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '4px 12px', border: '1px solid #333', borderRadius: '4px' }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: '#0f0', borderRadius: '50%' }}></div>
            <span className="telemetry-data">{user.email?.split('@')[0]}</span>
            <button 
              onClick={handleLogout}
              style={{ background: 'none', border: 'none', color: 'var(--color-red)', cursor: 'pointer', fontSize: '1.5rem', padding: '0 4px' }}
            >
              ×
            </button>
          </div>
        ) : (
          <Link to="/login" className="mag-btn" style={{ padding: '0.5rem 1.5rem', border: '1px solid white' }}>LOGIN</Link>
        )}
      </div>
    </header>
  );
};

export const Testimonials = () => (
  <section className="container" style={{ padding: '8rem 5%' }}>
    <h2 className="h2" style={{ marginBottom: '4rem' }}>Resultados medibles.</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
      <div className="card-dark">
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>"La integración con nuestro CRM automatizó el 80% del pipeline de ventas solares."</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#333' }}></div>
          <div>
            <div style={{ fontWeight: 700 }}>Elena V.</div>
            <div className="telemetry-data" style={{ color: '#888' }}>Tech Lead, Empresa A</div>
          </div>
        </div>
      </div>
      <div className="card-dark">
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>"Redujimos el desperdicio de fabricación en un 40% gracias al escaneo 3D preciso."</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#333' }}></div>
          <div>
            <div style={{ fontWeight: 700 }}>Marcos R.</div>
            <div className="telemetry-data" style={{ color: '#888' }}>Estudio de Arquitectura</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const Pricing = () => (
  <section className="container" style={{ padding: '4rem 5%', paddingBottom: '8rem' }}>
    <h2 className="h2" style={{ marginBottom: '4rem', textAlign: 'center' }}>Planes diseñados para escalar.</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', alignItems: 'center' }}>
      <div className="card" style={{ backgroundColor: '#111', color: 'white', border: '1px solid #333' }}>
        <h3 className="h3">Starter</h3>
        <p className="telemetry-data" style={{ margin: '2rem 0', fontSize: '2rem' }}>$0</p>
        <button className="mag-btn" style={{ width: '100%', padding: '1rem', border: '1px solid white' }}>Elegir Plan</button>
      </div>
      
      <div className="card" style={{ backgroundColor: 'var(--color-black)', border: '1px solid var(--color-white)', transform: 'scale(1.05)', position: 'relative', zIndex: 10 }}>
        <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--color-red)', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Recomendado</div>
        <h3 className="h3">Pro</h3>
        <p className="telemetry-data" style={{ margin: '2rem 0', fontSize: '3rem' }}>$49</p>
        <button className="mag-btn accent-bg" style={{ width: '100%', padding: '1.25rem' }}>Empezar Ahora</button>
      </div>
      
      <div className="card" style={{ backgroundColor: '#111', color: 'white', border: '1px solid #333' }}>
        <h3 className="h3">Enterprise</h3>
        <p className="telemetry-data" style={{ margin: '2rem 0', fontSize: '2rem' }}>Custom</p>
        <button className="mag-btn" style={{ width: '100%', padding: '1rem', border: '1px solid white' }}>Contactar</button>
      </div>
    </div>
  </section>
);

export const Footer = () => (
  <footer style={{ backgroundColor: '#111', borderTopLeftRadius: '2rem', borderTopRightRadius: '2rem', padding: '4rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', minHeight: '300px' }}>
    <div>
      <h2 className="h2" style={{ marginBottom: '1rem' }}>artmakeit.</h2>
      <p style={{ color: '#888', maxWidth: '300px' }}>Ecosistema de precisión creativa, fabricación digital y sostenibilidad empresarial.</p>
    </div>
    
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-red)', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
      <span className="telemetry-data" style={{ color: '#888' }}>Sistema Activo</span>
    </div>

    <style>{`
      @keyframes pulse {
        0% { opacity: 1; box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7); }
        70% { opacity: 0.5; box-shadow: 0 0 0 10px rgba(255, 0, 0, 0); }
        100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255, 0, 0, 0); }
      }
    `}</style>
  </footer>
);
