import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Header, Footer, Pricing, Testimonials } from '../components/Shared';
import heroImage from '../assets/hero-lab.jpg';
import heroVideo from '../assets/hero-video.mp4';
import maquetaImage from '../assets/maqueta.jpg';
import iotImage from '../assets/iot.jpg';

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

const NumberCounter = ({ end, suffix = '', incrementRate = 0 }: { end: number, suffix?: string, incrementRate?: number }) => {
  const [displayValue, setDisplayValue] = useState(end);
  const nodeRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (!nodeRef.current) return;
    
    // Initial Animation
    const obj = { val: 0 };
    gsap.to(obj, {
      val: end,
      duration: 2,
      scrollTrigger: {
        trigger: nodeRef.current,
        start: 'top 80%',
      },
      onUpdate: () => {
        setDisplayValue(Math.floor(obj.val));
      }
    });

    // Real-time increment if rate provided
    if (incrementRate > 0) {
      const interval = setInterval(() => {
        setDisplayValue(prev => prev + 1);
      }, (7 * 24 * 60 * 60 * 1000) / incrementRate); // ms per project
      return () => clearInterval(interval);
    }
  }, [end, incrementRate]);

  return <span ref={nodeRef} style={{ fontSize: '3rem', fontWeight: 'bold' }}>{displayValue}{suffix}</span>;
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
    <div ref={containerRef} style={{ backgroundColor: 'var(--color-black)', color: 'white' }}>
      <Header />
      
      {/* FULL SCREEN HERO SECTION */}
      <section style={{ 
        height: '100vh', width: '100%', position: 'relative', overflow: 'hidden', 
        display: 'flex', alignItems: 'center', justifyContent: 'center' 
      }}>
        {/* Immersive Background Image */}
        <div 
          ref={heroRef}
          style={{
            position: 'absolute', top: '-10%', left: '-10%', width: '120%', height: '120%', 
            zIndex: 1, backgroundColor: '#000'
          }}
        >
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            poster={heroImage}
            style={{ 
              width: '100%', height: '100%', objectFit: 'cover', 
              opacity: 0.7, filter: 'grayscale(20%) brightness(0.6) contrast(1.1)' 
            }} 
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          
          {/* Active Scanner Line (Full Screen) */}
          <div 
            ref={scannerRef}
            style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '3px',
              background: 'linear-gradient(90deg, transparent, var(--color-red), transparent)',
              boxShadow: '0 0 20px var(--color-red)',
              zIndex: 5, opacity: 0.8
            }}
          />

          {/* Technical Blueprint Grid Overlay */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '100px 100px', pointerEvents: 'none', zIndex: 2
          }} />
        </div>

        {/* Content Overlay */}
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <div className="telemetry-data" style={{ color: 'var(--color-red)', letterSpacing: '0.4em', marginBottom: '2rem', fontSize: '0.75rem' }}>
            [ ARTMAKEIT / ECOSYSTEM-LAB_V4.0 ]
          </div>
          
          <h1 className="h1" style={{ 
            fontSize: 'clamp(5rem, 15vw, 14rem)', 
            lineHeight: 0.8, 
            letterSpacing: '-0.04em',
            margin: '0 0 4rem 0'
          }}>
            CREATIVIDAD<br/>
            <span className="outline-text" style={{ WebkitTextStroke: '2px white' }}>PRECISA</span>
          </h1>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', alignItems: 'flex-start' }}>
            <p className="telemetry-data" style={{ maxWidth: '300px', textAlign: 'left', lineHeight: 1.8, fontSize: '0.65rem', opacity: 0.6 }}>
              LA UNIÓN ENTRE LA IDEA ARQUITECTÓNICA Y LA EJECUCCIÓN FÍSICA A TRAVÉS DE FABRICACIÓN DIGITAL.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
              <button className="mag-btn accent-bg" style={{ padding: '1.5rem 3rem' }}>EXPLORAR PROYECTOS</button>
              <button className="mag-btn" style={{ padding: '1.5rem 3rem', border: '1px solid white' }}>EQUIPAMIENTO</button>
            </div>
            <p className="telemetry-data" style={{ maxWidth: '300px', textAlign: 'right', lineHeight: 1.8, fontSize: '0.65rem', opacity: 0.6 }}>
              COORDINATES: 0.45N / 78.50W<br/>
              STATUS: CORE_SYSTEM_STABLE<br/>
              RENDERING_ENGINE: GSAP_PRO
            </p>
          </div>
        </div>

        {/* Floating Screen Data Points */}
        <div className="telemetry-data" style={{ position: 'absolute', bottom: '5%', left: '5%', zIndex: 20, opacity: 0.4 }}>
          [01] DESIGN_PHASE: ALPHA<br/>
          [02] FAB_PROTOCOL: ACTIVE
        </div>
        <div className="telemetry-data" style={{ position: 'absolute', bottom: '5%', right: '5%', zIndex: 20, opacity: 0.4 }}>
          EST. 2026<br/>
          AMIT-DSG-004
        </div>
      </section>

      {/* MICRO-DASHBOARD (Digital Instruments) */}
      <section style={{ padding: '6rem 0', backgroundColor: '#0a0a0a', borderTop: '1px solid #222' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Instrument 1: Projects & Budget */}
          <div 
            className="card-dark instrument-card" 
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '4px solid var(--color-white)', transition: 'all 0.4s ease' }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { scale: 1.05, borderColor: 'var(--color-red)', duration: 0.3 });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { scale: 1, borderColor: 'white', duration: 0.3 });
            }}
          >
            <div className="telemetry-data" style={{ color: '#888' }}>[ 2026 ] Proyectos & Material</div>
            <div>
              <NumberCounter end={2485} incrementRate={40} />
              <div className="telemetry-data" style={{ color: '#666' }}>Proyectos Fabricados</div>
            </div>
            <div style={{ marginTop: 'auto' }}>
              <NumberCounter end={142.4} suffix=" TON" />
              <div className="telemetry-data" style={{ color: 'var(--color-red)' }}>Material Ahorrado</div>
            </div>
          </div>

          {/* Instrument 2: Fabrication Pipeline */}
          <div 
            className="card-dark instrument-card" 
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '4px solid #444', height: '100%', minHeight: '250px', transition: 'all 0.4s ease' }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { scale: 1.05, borderColor: 'var(--color-red)', duration: 0.3 });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { scale: 1, borderColor: '#444', duration: 0.3 });
            }}
          >
            <div className="telemetry-data" style={{ color: '#888' }}>[ SYS.02 ] Pipeline de Fabricación</div>
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
          <div 
            className="card-dark instrument-card" 
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '4px solid var(--color-red)', position: 'relative', overflow: 'hidden', transition: 'all 0.4s ease' }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { scale: 1.05, boxShadow: '0 0 40px rgba(255,0,0,0.15)', duration: 0.3 });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { scale: 1, boxShadow: 'none', duration: 0.3 });
            }}
          >
            <div className="telemetry-data" style={{ color: '#888' }}>[ SYS.03 ] Calendario de Entregas</div>
            
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
          
          <div className="stacked-card card" style={{ 
            height: '70vh', backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column', 
            justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: 0 
          }}>
            {/* Background Image with Overlay */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
              <img 
                src={maquetaImage} 
                alt="Maqueta Arquitectónica" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <div style={{ 
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                background: 'linear-gradient(90deg, rgba(255,255,255,0.95) 30%, rgba(255,255,255,0.4) 60%, transparent 100%)' 
              }} />
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
              <div className="telemetry-data" style={{ color: 'var(--color-red)', marginBottom: '1rem' }}>Fase 01</div>
              <h2 className="h2" style={{ marginBottom: '2rem', color: '#000' }}>Escaneo & Precisión 3D</h2>
              <p className="h4" style={{ maxWidth: '600px', fontWeight: 500, color: '#333' }}>Digitalización milimétrica de espacios y maquetas para asegurar una fabricación sin margen de error.</p>
            </div>
          </div>
          
          <div className="stacked-card card" style={{ 
            height: '70vh', backgroundColor: '#e0e0e0', display: 'flex', flexDirection: 'column', 
            justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: 0 
          }}>
            {/* Background Image with Overlay */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
              <img 
                src={iotImage} 
                alt="Infraestructura IoT" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <div style={{ 
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                background: 'linear-gradient(90deg, rgba(255,255,255,0.95) 30%, rgba(255,255,255,0.4) 60%, transparent 100%)' 
              }} />
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
              <div className="telemetry-data" style={{ color: 'var(--color-red)', marginBottom: '1rem' }}>Fase 02</div>
              <h2 className="h2" style={{ marginBottom: '2rem', color: '#000' }}>Interconexión IoT</h2>
              <p className="h4" style={{ maxWidth: '600px', fontWeight: 500, color: '#333' }}>Equipos de fabricación conectados a la nube transmitiendo telemetría en tiempo real a tu estudio.</p>
            </div>
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
