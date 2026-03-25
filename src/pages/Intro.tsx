import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const LightStreaks = () => {
  const streaksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const streaks = streaksRef.current?.children;
    if (!streaks) return;

    Array.from(streaks).forEach((streak) => {
      const animate = () => {
        const duration = 3 + Math.random() * 5;
        const delay = Math.random() * 5;
        
        gsap.set(streak, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          opacity: 0,
          scaleX: 0.1 + Math.random() * 0.5,
          rotation: Math.random() * 360,
        });

        gsap.to(streak, {
          opacity: 0.1,
          duration: duration * 0.5,
          delay: delay,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 1,
          onComplete: animate
        });

        gsap.to(streak, {
          x: "+=" + (Math.random() * 200 - 100),
          y: "+=" + (Math.random() * 200 - 100),
          duration: duration + delay,
          ease: "none",
        });
      };
      animate();
    });
  }, []);

  return (
    <div ref={streaksRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} style={{ 
          position: 'absolute', 
          width: '2px', 
          height: '150px', 
          backgroundColor: 'var(--color-white)', 
          filter: 'blur(4px)',
          opacity: 0 
        }} />
      ))}
    </div>
  );
};

const Intro = () => {
  const navigate = useNavigate();
  const studentBtnRef = useRef<HTMLButtonElement>(null);
  const companyBtnRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Initial entrance animation
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    
    // Floating island effect
    gsap.to(studentBtnRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    
    gsap.to(companyBtnRef.current, {
      y: -12,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, []);

  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btn, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  const navigateTo = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    // Exit animation
    gsap.to([titleRef.current, studentBtnRef.current, companyBtnRef.current], {
      opacity: 0,
      y: -100,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => navigate(path)
    });
  };

  return (
    <div style={{ position: 'relative', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--bg-color)', overflow: 'hidden' }}>
      <LightStreaks />
      <h1 ref={titleRef} className="h1" style={{ marginBottom: '6rem', zIndex: 10 }}>¿Quién eres?</h1>
      
      <div style={{ display: 'flex', gap: '3rem', zIndex: 10 }}>
        <button 
          ref={studentBtnRef}
          onClick={(e) => navigateTo('/lab', e)}
          onMouseMove={handleMagneticMove}
          onMouseLeave={handleMagneticLeave}
          className="mag-btn" 
          style={{ 
            padding: '2.5rem 5rem', 
            border: '2px solid var(--color-white)', 
            color: 'var(--color-black)', 
            backgroundColor: 'var(--color-white)',
            fontSize: '1.25rem',
            position: 'relative',
            boxShadow: '0 20px 40px rgba(255,255,255,0.05)'
          }}
        >
          SOY ESTUDIANTE
        </button>
        <button 
          ref={companyBtnRef}
          onClick={(e) => navigateTo('/green', e)}
          onMouseMove={handleMagneticMove}
          onMouseLeave={handleMagneticLeave}
          className="mag-btn" 
          style={{ 
            padding: '2.5rem 5rem', 
            border: '2px solid var(--color-white)', 
            color: 'var(--color-white)',
            backgroundColor: 'transparent',
            fontSize: '1.25rem',
            position: 'relative',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}
        >
          SOY Empresa
        </button>
      </div>
    </div>
  );
};

export default Intro;
