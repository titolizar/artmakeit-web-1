import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header, Footer, Pricing, Testimonials } from '../components/Shared';

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

const NumberCounter = ({ end, suffix = '', duration = 2 }: { end: number, suffix?: string, duration?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (!nodeRef.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: end,
      duration: duration,
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
  }, [end, suffix, duration]);

  return <span ref={nodeRef} style={{ fontSize: '3rem', fontWeight: 'bold' }}>0{suffix}</span>;
};

const SoftGreen = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero Parallax
    gsap.to(heroTextRef.current, {
      y: 200,
      opacity: 0,
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
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Background Image Parallax Placeholder */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '120%', 
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), var(--color-black)), url(https://images.unsplash.com/photo-1508514177221-188b1cc16e9d?q=80&w=2070&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: -1,
          opacity: 0.5
        }}></div>

        <div className="container" style={{ textAlign: 'center', zIndex: 1 }} ref={heroTextRef}>
          <h1 className="h1" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            Optimización <span className="organic-emphasis">Integral</span> y Sostenibilidad Empresarial.
          </h1>
          <p className="h3 organic-emphasis" style={{ marginTop: '2rem', color: '#ccc' }}>
            Hagamos las cosas mejor.
          </p>
        </div>
      </section>

      {/* MICRO-DASHBOARD (CRM & Energy) */}
      <section style={{ padding: '6rem 0', backgroundColor: '#0a0a0a', borderTop: '1px solid #222' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Instrument 1: Energy & Savings */}
          <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '4px solid var(--color-white)' }}>
            <div className="telemetry-data" style={{ color: '#888' }}>[SYS.01] Energía & Ahorro</div>
            <div>
              <NumberCounter end={459} suffix=" MWh" />
              <div className="telemetry-data" style={{ color: '#666' }}>Energía Generada</div>
            </div>
            <div style={{ marginTop: 'auto' }}>
              <NumberCounter end={312} suffix=" TON" duration={2.5} />
              <div className="telemetry-data" style={{ color: 'var(--color-red)' }}>CO2 Evitado</div>
            </div>
          </div>

          {/* Instrument 2: Client Pipeline */}
          <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '4px solid #444', height: '100%', minHeight: '250px' }}>
            <div className="telemetry-data" style={{ color: '#888' }}>[SYS.02] Pipeline de Clientes</div>
            <div style={{ backgroundColor: '#000', padding: '1.5rem', borderRadius: '8px', border: '1px solid #222', flex: 1, display: 'flex', alignItems: 'center' }}>
              <Typewriter messages={[
                "> Nuevo Lead: Empresa A (Sector Tech)",
                "> Cualificando base instalada...",
                "> Propuesta Solar enviada: 125kWp",
                "> Contrato firmado. Iniciando despliegue."
              ]} />
            </div>
          </div>

          {/* Instrument 3: System Optimization */}
          <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '4px solid var(--color-red)', position: 'relative', overflow: 'hidden' }}>
            <div className="telemetry-data" style={{ color: '#888' }}>[SYS.03] Estado de Red</div>
            
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ 
                width: '150px', height: '150px', 
                borderRadius: '50%', 
                border: '2px dashed #444', 
                position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <div style={{ 
                  width: '100px', height: '100px', 
                  borderRadius: '50%', backgroundColor: 'rgba(255,0,0,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <span className="telemetry-data" style={{ fontSize: '1.5rem', color: 'var(--color-white)', animation: 'pulse 2s infinite' }}>99.9%</span>
                </div>
                {/* Orbital dots */}
                <div style={{ position: 'absolute', top: '-6px', left: '50%', width: '12px', height: '12px', backgroundColor: 'var(--color-white)', borderRadius: '50%', transform: 'translateX(-50%)' }}></div>
              </div>
            </div>
            <style>{`
              @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
              @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
            `}</style>
          </div>
          
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section style={{ padding: '10rem 0', backgroundColor: '#111', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <h2 className="h2" style={{ color: '#666', transform: 'translateX(-2rem)' }}>
            <span style={{ color: 'var(--color-red)' }}>✕</span> Sostenibilidad no es solo ecología.
          </h2>
          <h2 className="h2" style={{ transform: 'translateX(2rem)' }}>
            <span style={{ color: 'var(--color-white)' }}>✓</span> Es eficiencia, datos <span className="organic-emphasis">+ crecimiento inteligente.</span>
          </h2>
        </div>
      </section>

      {/* STACKED CARDS PROTOCOL */}
      <section className="cards-container" ref={cardsRef} style={{ padding: '5rem 0 20rem 0', backgroundColor: 'var(--color-black)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
          
          <div className="stacked-card card" style={{ height: '70vh', backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="telemetry-data" style={{ color: 'var(--color-red)', marginBottom: '1rem' }}>Fase 01</div>
            <h2 className="h2" style={{ marginBottom: '2rem' }}>Integración CRM</h2>
            <p className="h4" style={{ maxWidth: '600px', fontWeight: 500 }}>Unificación de datos de clientes, ventas y proyecciones en un solo centro de mando de alta velocidad.</p>
          </div>
          
          <div className="stacked-card card" style={{ height: '70vh', backgroundColor: '#e0e0e0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="telemetry-data" style={{ color: 'var(--color-red)', marginBottom: '1rem' }}>Fase 02</div>
            <h2 className="h2" style={{ marginBottom: '2rem' }}>Telemetría de Red</h2>
            <p className="h4" style={{ maxWidth: '600px', fontWeight: 500 }}>Monitoreo en tiempo real del uso de energía y recursos de la empresa, identificando cuellos de botella instantáneamente.</p>
          </div>
          
          <div className="stacked-card card" style={{ height: '70vh', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 -10px 40px rgba(0,0,0,0.1)' }}>
            <div className="telemetry-data" style={{ color: 'var(--color-red)', marginBottom: '1rem' }}>Fase 03</div>
            <h2 className="h2" style={{ marginBottom: '2rem' }}>Dashboard Solar</h2>
            <p className="h4" style={{ maxWidth: '600px', fontWeight: 500 }}>Control visual total sobre la generación y el ahorro energético. Inteligencia de negocio combinada con impacto verde.</p>
          </div>
          
        </div>
      </section>

      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  );
};

export default SoftGreen;
