// No imports needed - Vite handles JSX transform automatically

const products = [
  { 
    id: 1, 
    title: 'Mesa de Dibujo A1', 
    condition: 'Buen Estado', 
    price: '$45', 
    category: 'Mobiliario', 
    image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 2, 
    title: 'Kit Arduino Mega', 
    condition: 'Casi Nuevo', 
    price: '$30', 
    category: 'Electrónica', 
    image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 3, 
    title: 'Set Cuchillas X-Acto Pro', 
    condition: 'Usado', 
    price: '$12', 
    category: 'Herramientas', 
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 4, 
    title: 'Filamento PETG Negro', 
    condition: '50% Restante', 
    price: '$8', 
    category: 'Material', 
    image: 'https://images.unsplash.com/photo-1628102491629-77858ab21512?auto=format&fit=crop&q=80&w=800' 
  }
];

export const StudentStore = () => {
  return (
    <section style={{ padding: '8rem 0', backgroundColor: 'var(--color-black)' }}>
      <div className="container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <div className="telemetry-data" style={{ color: 'var(--color-red)', marginBottom: '1rem' }}>[ MARKETPLACE ]</div>
            <h2 className="h2">
              Boutique <span className="organic-emphasis">Estudiantil</span>
            </h2>
          </div>
          <button className="mag-btn" style={{ padding: '1rem 2rem', border: '1px solid #333', fontSize: '0.875rem' }}>
            Ver Todo el Inventario
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {products.map(product => (
            <div key={product.id} className="card-dark" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {/* Image Container */}
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

              {/* Content */}
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 className="h4" style={{ margin: 0 }}>{product.title}</h3>
                  <span className="telemetry-data" style={{ fontSize: '1.25rem', color: 'var(--color-white)' }}>{product.price}</span>
                </div>
                
                <div className="telemetry-data" style={{ color: '#666', marginBottom: '2rem' }}>
                  Condición: {product.condition}
                </div>
                
                <button className="mag-btn accent-bg" style={{ marginTop: 'auto', width: '100%', padding: '1rem' }}>
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
