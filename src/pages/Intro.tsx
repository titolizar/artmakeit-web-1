import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

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
      delay: 0.2,
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
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--bg-color)', overflow: 'hidden' }}>
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
