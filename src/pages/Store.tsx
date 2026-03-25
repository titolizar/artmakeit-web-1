import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Header, Footer } from '../components/Shared';

const Store = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Todo');
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Mobiliario',
    condition: 'Bueno',
    description: ''
  });

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  const fetchProducts = async () => {
    setLoading(true);
    let query = supabase
      .from('student_products')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter !== 'Todo') {
      query = query.eq('category', filter);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    // Check for demo session or real session
    const demoUserStr = localStorage.getItem('demo_session');
    const { data: { session } } = await supabase.auth.getSession();
    
    const currentUser = session?.user || (demoUserStr ? JSON.parse(demoUserStr) : null);
    
    if (!currentUser) {
      alert("Debes iniciar sesión para publicar.");
      setUploading(false);
      return;
    }

    const { error } = await supabase
      .from('student_products')
      .insert([
        { 
          name: formData.name,
          price: parseFloat(formData.price),
          category: formData.category,
          condition: formData.condition,
          description: formData.description,
          seller_id: currentUser.id === '00000000-0000-0000-0000-000000000000' ? null : currentUser.id,
          status: 'available'
        }
      ]);

    if (error) {
      alert("Error al subir: " + error.message);
    } else {
      alert("¡Artículo publicado con éxito!");
      setShowModal(false);
      fetchProducts();
    }
    setUploading(false);
  };

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
            {loading ? (
              <div className="telemetry-data" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: '#666' }}>
                [ CARGANDO ECOSISTEMA... ]
              </div>
            ) : products.length === 0 ? (
              <div className="telemetry-data" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: '#666' }}>
                [ NO HAY ARTÍCULOS DISPONIBLES EN ESTA CATEGORÍA ]
              </div>
            ) : (
              products.map(product => (
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
                      src={product.image_url || 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=800'} 
                      alt={product.name} 
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
                      <h3 className="h4" style={{ margin: 0 }}>{product.name}</h3>
                      <span className="telemetry-data" style={{ fontSize: '1.25rem', color: 'var(--color-white)' }}>${product.price}</span>
                    </div>
                    
                    <div className="telemetry-data" style={{ color: '#666', marginBottom: '2rem' }}>
                      Condición: {product.condition || 'No especificada'}
                    </div>
                    
                    <button className="mag-btn" style={{ marginTop: 'auto', width: '100%', padding: '1rem', border: '1px solid #333' }}>
                      Contactar Vendedor
                    </button>
                  </div>
                </div>
              ))
            )}
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
            
            <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label className="telemetry-data" style={{ display: 'block', marginBottom: '0.5rem', color: '#888' }}>Título del Equipo/Material</label>
                <input 
                  type="text" required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{ width: '100%', padding: '1rem', backgroundColor: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px' }} 
                  placeholder="Ej. Mesa de Dibujo A0..." 
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="telemetry-data" style={{ display: 'block', marginBottom: '0.5rem', color: '#888' }}>Precio</label>
                  <input 
                    type="number" required 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    style={{ width: '100%', padding: '1rem', backgroundColor: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px' }} 
                    placeholder="0.00" 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="telemetry-data" style={{ display: 'block', marginBottom: '0.5rem', color: '#888' }}>Categoría</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    style={{ width: '100%', padding: '1rem', backgroundColor: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px' }}
                  >
                    <option>Mobiliario</option>
                    <option>Electrónica</option>
                    <option>Herramientas</option>
                    <option>Material</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="telemetry-data" style={{ display: 'block', marginBottom: '0.5rem', color: '#888' }}>Condición</label>
                <select 
                  value={formData.condition}
                  onChange={(e) => setFormData({...formData, condition: e.target.value})}
                  style={{ width: '100%', padding: '1rem', backgroundColor: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px' }}
                >
                  <option>Nuevo</option>
                  <option>Como Nuevo</option>
                  <option>Buen Estado</option>
                  <option>Usado</option>
                </select>
              </div>

              <button type="submit" disabled={uploading} className="mag-btn accent-bg" style={{ padding: '1.5rem', width: '100%', marginTop: '1rem', opacity: uploading ? 0.5 : 1 }}>
                {uploading ? 'PUBLICANDO...' : 'SUBIR AL ECOSISTEMA'}
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
