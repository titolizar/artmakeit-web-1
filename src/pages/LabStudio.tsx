import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Header, Footer, Pricing, Testimonials } from '../components/Shared';
import heroImage from '../assets/hero-lab.jpg';

gsap.registerPlugin(ScrollTrigger);

const Typewriter = ({ messages }: { messages: string[] }) => {
  const [text, setText] = useState('');
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    let currentText = '';
    const fullText = messages[msgIndex];
    let i = 0;
    
    const interval = setInterval(() => {
      currentText += fullText.charAt(i);
      setText(currentText);
      i++;
      if (i === fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          setMsgIndex((prev) => (prev + 1) % messages.length);
        }, 2000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [msgIndex, messages]);

  return <div className="telemetry-data">{text}<span style={{ animation: 'blink 1s infinite' }}>_</span></div>;
};

const NumberCounter = ({ end, suffix = '' }: { end: number, suffix?: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (!nodeRef.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: end,
      duration: 2,
      scrollTrigger: {
        trigger: nodeRef.current,
        start: 'top 80%',
      },
      onUpdate: () => {
        if (nodeRef.current) {
          nodeRef.current.innerText = Math.floor(obj.val).toString() + suffix;
        }
      }
    });
  }, [end, suffix]);

  return <span ref={nodeRef} style={{ fontSize: '3rem', fontWeight: 'bold' }}>0{suffix}</span>;
};

const LabStudio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax hero elements
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;
      
      gsap.to('.hero-visual-container', {
        x: xPos,
        y: yPos,
        duration: 1.5,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Scanner Line Animation
    gsap.to(scannerRef.current, {
      top: '100%',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Hero Scroll Parallax
    gsap.to(heroRef.current, {
      y: 150,
      opacity: 0.5,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Stacked Cards Protocol
    const cards = document.querySelectorAll('.stacked-card');
    
    cards.forEach((card, i) => {
      gsap.to(card, {
        scale: 0.9 + (i * 0.05),
        y: -50 * (cards.length - i),
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top " + (100 + i * 40) + "px",
          end: "bottom top",
          endTrigger: ".cards-container",
          pin: true,
          pinSpacing: false,
          scrub: true,
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef}>
      <Header />
      
      {/* HERO SECTION */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--color-black)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) 1fr', gap: '4rem', alignItems: 'center', zIndex: 10 }}>
          
          <div className="hero-content" ref={heroRef}>
            <div className="telemetry-data" style={{ color: 'var(--color-red)', marginBottom: '1.5rem' }}>
              [ LAB_SYSTEM_ONLINE / V.0.4 ]
            </div>
            <h1 className="h1" style={{ fontSize: 'clamp(4rem, 8vw, 9rem)', lineHeight: 0.85, marginBottom: '2rem' }}>
              CREATIVIDAD <br/>
              <span className="outline-text">CON PRECISIÓN</span>
            </h1>
            <p className="p-large" style={{ maxWidth: '500px', marginBottom: '3rem', opacity: 0.8 }}>
              Materializamos las ideas más complejas a través de fabricación digital y tecnología de vanguardia.
            </p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <button className="mag-btn accent-bg">VER PROYECTOS</button>
              <button className="mag-btn">EXPLORAR LAB</button>
            </div>
          </div>

          <div className="hero-visual-container" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              position: 'relative', width: '100%', aspectRatio: '16/9', 
              border: '1px solid #333', overflow: 'hidden',
              boxShadow: '0 30px 100px rgba(0,0,0,0.5)'
            }}>
              <img 
                src={heroImage} 
                alt="Architectural Precision" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              {/* Scanner Overlay */}
              <div 
                ref={scannerRef}
                style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '2px',
                  backgroundColor: 'var(--color-red)', boxShadow: '0 0 15px var(--color-red)',
                  zIndex: 2
                }}
              />
              {/* Technical Grid Overlay */}
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '20px 20px', pointerEvents: 'none'
              }} />
            </div>

            {/* Floating Telemetry Points */}
            <div className="telemetry-data" style={{ 
              position: 'absolute', top: '-10%', right: '5%', 
              backgroundColor: 'rgba(0,0,0,0.8)', padding: '1rem', borderLeft: '2px solid var(--color-red)'
            }}>
              MOD_Z: 4.85mm<br/>REF: BLUEPRINT_01
            </div>
            <div className="telemetry-data" style={{ 
              position: 'absolute', bottom: '10%', left: '-10%', 
              backgroundColor: 'rgba(0,0,0,0.8)', padding: '1rem', borderRight: '2px solid var(--color-red)'
            }}>
              SCALE: 1:1<br/>STATUS: RENDERING...
            </div>
          </div>

        </div>
      </section>

      {/* MICRO-DASHBOARD (Digital Instruments) */}
      <section style={{ padding: '6rem 0', backgroundColor: '#0a0a0a', borderTop: '1px solid #222' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Instrument 1: Projects & Budget */}
          <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '4px solid var(--color-white)' }}>
            <div className="telemetry-data" style={{ color: '#888' }}>[SYS.01] Proyectos & Material</div>
            <div>
              <NumberCounter end={342} />
              <div className="telemetry-data" style={{ color: '#666' }}>Proyectos Fabricados</div>
            </div>
            <div style={{ marginTop: 'auto' }}>
              <NumberCounter end={12.4} suffix=" TON" />
              <div className="telemetry-data" style={{ color: 'var(--color-red)' }}>Material Ahorrado</div>
            </div>
          </div>

          {/* Instrument 2: Fabrication Pipeline */}
          <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '4px solid #444', height: '100%', minHeight: '250px' }}>
            <div className="telemetry-data" style={{ color: '#888' }}>[SYS.02] Pipeline de Fabricación</div>
            <div style={{ backgroundColor: '#000', padding: '1.5rem', borderRadius: '8px', border: '1px solid #222', flex: 1, display: 'flex', alignItems: 'center' }}>
              <Typewriter messages={[
                "> Corte láser en curso: 78% completado...",
                "> Impresión 3D brazo robótico: Iniciando...",
                "> Calibrando extrusor a 210°C...",
                "> Ensamblaje módulo C finalizado."
              ]} />
            </div>
          </div>

          {/* Instrument 3: Delivery Calendar */}
          <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '4px solid var(--color-red)', position: 'relative', overflow: 'hidden' }}>
            <div className="telemetry-data" style={{ color: '#888' }}>[SYS.03] Calendario de Entregas</div>
            
            {/* Grid background to represent calendar */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', margin: '1rem 0' }}>
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} style={{ backgroundColor: i === 7 ? 'rgba(255,0,0,0.2)' : '#222', borderRadius: '4px', height: '30px' }}></div>
              ))}
            </div>
            
            {/* Automated SVG Cursor */}
            <svg 
              width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-white)" 
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ position: 'absolute', top: '50%', left: '50%', animation: 'moveCursor 4s infinite ease-in-out' }}
            >
              <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
              <path d="M13 13l6 6" />
            </svg>
            <style>{`
              @keyframes moveCursor {
                0% { transform: translate(0, 0); }
                30% { transform: translate(40px, -20px); }
                60% { transform: translate(-20px, 30px); }
                100% { transform: translate(0, 0); }
              }
              @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            `}</style>
          </div>
          
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section style={{ padding: '10rem 0', backgroundColor: '#111', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <h2 className="h2" style={{ color: '#666', transform: 'translateX(-2rem)' }}>
            <span style={{ color: 'var(--color-red)' }}>✕</span> artmakeit no es solo fabricar.
          </h2>
          <h2 className="h2" style={{ transform: 'translateX(2rem)' }}>
            <span style={{ color: 'var(--color-white)' }}>✓</span> Es un ecosistema de precisión creativa <span className="organic-emphasis">+ tecnología.</span>
          </h2>
        </div>
      </section>

      {/* STACKED CARDS PROTOCOL */}
      <section className="cards-container" ref={cardsRef} style={{ padding: '5rem 0 20rem 0', backgroundColor: 'var(--color-black)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
          
          <div className="stacked-card card" style={{ height: '70vh', backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="telemetry-data" style={{ color: 'var(--color-red)', marginBottom: '1rem' }}>Fase 01</div>
            <h2 className="h2" style={{ marginBottom: '2rem' }}>Escaneo & Precisión 3D</h2>
            <p className="h4" style={{ maxWidth: '600px', fontWeight: 500 }}>Digitalización milimétrica de espacios y maquetas para asegurar una fabricación sin margen de error.</p>
          </div>
          
          <div className="stacked-card card" style={{ height: '70vh', backgroundColor: '#e0e0e0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="telemetry-data" style={{ color: 'var(--color-red)', marginBottom: '1rem' }}>Fase 02</div>
            <h2 className="h2" style={{ marginBottom: '2rem' }}>Interconexión IoT</h2>
            <p className="h4" style={{ maxWidth: '600px', fontWeight: 500 }}>Equipos de fabricación conectados a la nube transmitiendo telemetría en tiempo real a tu estudio.</p>
          </div>
          
          <div className="stacked-card card" style={{ height: '70vh', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 -10px 40px rgba(0,0,0,0.1)' }}>
            <div className="telemetry-data" style={{ color: 'var(--color-red)', marginBottom: '1rem' }}>Fase 03</div>
            <h2 className="h2" style={{ marginBottom: '2rem' }}>Materialización</h2>
            <p className="h4" style={{ maxWidth: '600px', fontWeight: 500 }}>Corte láser, impresión 3D avanzada y ensamblaje robótico. Lo físico alcanza la perfección de lo digital.</p>
          </div>
          
        </div>
      </section>

      {/* STUDENT MARKETPLACE TEASER */}
      <section style={{ padding: '8rem 0', backgroundColor: 'var(--color-black)', borderTop: '1px solid #222' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="telemetry-data" style={{ color: 'var(--color-red)', marginBottom: '1rem' }}>[ MARKETPLACE ESTUDIANTIL ]</div>
          <h2 className="h2" style={{ marginBottom: '2rem' }}>Equipamiento de <span className="organic-emphasis">Segunda Mano</span></h2>
          <p className="h4" style={{ color: '#888', maxWidth: '600px', margin: '0 auto 4rem auto' }}>Encuentra mesas de dibujo, electrónica y materiales a precios accesibles de otros estudiantes del ecosistema.</p>
          
          <Link to="/store" className="mag-btn" style={{ 
            padding: '2rem 4rem', 
            backgroundColor: 'var(--color-white)', 
            color: 'var(--color-black)',
            fontSize: '1.25rem',
            border: '2px solid var(--color-white)'
          }}>
            ENTRAR AL MARKETPLACE
          </Link>
        </div>
      </section>

      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  );
};

export default LabStudio;
