import React, { useState } from 'react';
import { Header, Footer } from '../components/Shared';

const DUMMY_PRODUCTS = [
  { id: 1, title: 'Mesa de Dibujo A1', condition: 'Buen Estado', price: '$45', category: 'Mobiliario', image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Kit Arduino Mega', condition: 'Casi Nuevo', price: '$30', category: 'Electrónica', image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Set Cuchillas X-Acto Pro', condition: 'Usado', price: '$12', category: 'Herramientas', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Filamento PETG Negro', condition: '50% Restante', price: '$8', category: 'Material', image: 'https://images.unsplash.com/photo-1628102491629-77858ab21512?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'Regletas LED para maquetas', condition: 'Nuevo', price: '$15', category: 'Electrónica', image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'Lote Cartón Batería', condition: 'Usado', price: '$5', category: 'Material', image: 'https://images.unsplash.com/photo-1621820692736-2bf9b6574f26?auto=format&fit=crop&q=80&w=800' }
];

const Store = () => {
  const [filter, setFilter] = useState('Todo');
  const [showModal, setShowModal] = useState(false);

  const filteredProducts = filter === 'Todo' ? DUMMY_PRODUCTS : DUMMY_PRODUCTS.filter(p => p.category === filter);

  return (
    <>
      <Header />
      <section style={{ minHeight: '100vh', paddingTop: '10rem', backgroundColor: 'var(--color-black)' }}>
        <div className="container">
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <div className="telemetry-data" style={{ color: 'var(--color-red)', marginBottom: '1rem' }}>[ MARKETPLACE GLOBAL ]</div>
              <h1 className="h1">
                Boutique <span className="organic-emphasis">Estudiantil</span>
              </h1>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => setShowModal(true)}
                className="mag-btn" 
                style={{ padding: '1rem 2rem', border: '1px solid var(--color-red)', backgroundColor: 'var(--color-red)', color: 'white' }}
              >
                + Publicar Artículo
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
            {['Todo', 'Mobiliario', 'Electrónica', 'Herramientas', 'Material'].map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                style={{ 
                  padding: '0.5rem 1.5rem', 
                  borderRadius: '999px',
                  border: '1px solid',
                  borderColor: filter === cat ? 'white' : '#333',
                  backgroundColor: filter === cat ? 'white' : 'transparent',
                  color: filter === cat ? 'black' : 'white',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', paddingBottom: '8rem' }}>
            {filteredProducts.map(product => (
              <div key={product.id} className="card-dark" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute', top: '1rem', left: '1rem', zIndex: 10,
                    backgroundColor: 'var(--color-black)', color: 'var(--color-white)',
                    padding: '4px 8px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase'
                  }}>
                    {product.category}
                  </div>
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    style={{ 
                      width: '100%', height: '100%', objectFit: 'cover', 
                      filter: 'grayscale(100%) contrast(1.2)',
                      transition: 'transform var(--transition-smooth)'
                    }} 
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>

                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h3 className="h4" style={{ margin: 0 }}>{product.title}</h3>
                    <span className="telemetry-data" style={{ fontSize: '1.25rem', color: 'var(--color-white)' }}>{product.price}</span>
                  </div>
                  
                  <div className="telemetry-data" style={{ color: '#666', marginBottom: '2rem' }}>
                    Condición: {product.condition}
                  </div>
                  
                  <button className="mag-btn" style={{ marginTop: 'auto', width: '100%', padding: '1rem', border: '1px solid #333' }}>
                    Contactar Vendedor
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* UPLOAD MODAL */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card-dark" style={{ width: '90%', maxWidth: '500px', backgroundColor: '#111', border: '1px solid #333' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 className="h3">Subir Artículo al Sistema</h3>
              <button onClick={() => setShowModal(false)} style={{ color: '#888', fontSize: '1.5rem', cursor: 'pointer', background: 'none', border: 'none' }}>✕</button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); alert("En conexión real, este artículo iría a Supabase."); setShowModal(false); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label className="telemetry-data" style={{ display: 'block', marginBottom: '0.5rem', color: '#888' }}>Título del Equipo/Material</label>
                <input type="text" required style={{ width: '100%', padding: '1rem', backgroundColor: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px' }} placeholder="Ej. Mesa de Dibujo A0..." />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="telemetry-data" style={{ display: 'block', marginBottom: '0.5rem', color: '#888' }}>Precio</label>
                  <input type="text" required style={{ width: '100%', padding: '1rem', backgroundColor: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px' }} placeholder="$0.00" />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="telemetry-data" style={{ display: 'block', marginBottom: '0.5rem', color: '#888' }}>Categoría</label>
                  <select style={{ width: '100%', padding: '1rem', backgroundColor: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px' }}>
                    <option>Mobiliario</option>
                    <option>Electrónica</option>
                    <option>Herramientas</option>
                    <option>Material</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="telemetry-data" style={{ display: 'block', marginBottom: '0.5rem', color: '#888' }}>Arrastra la foto aquí</label>
                <div style={{ border: '2px dashed #444', padding: '2rem', textAlign: 'center', color: '#666', borderRadius: '4px', cursor: 'pointer' }}>
                  Click para seleccionar imagen
                </div>
              </div>

              <button type="submit" className="mag-btn accent-bg" style={{ padding: '1.5rem', width: '100%', marginTop: '1rem' }}>
                SUBIR AL ECOSISTEMA
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Store;
