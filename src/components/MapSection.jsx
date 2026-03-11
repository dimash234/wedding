import React, { useContext } from 'react'
import { LangContext } from '../App'

// Inline Reveal for this component (no cross-import needed)
function Reveal({ children, delay = 0, y = 24 }) {
  const [ref, setRef] = React.useState(null)
  const [visible, setVisible] = React.useState(false)
  React.useEffect(() => {
    if (!ref) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(ref)
    return () => obs.disconnect()
  }, [ref])
  return (
    <div ref={setRef} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity 0.85s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.85s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  )
}

export default function MapSection() {
  const { t } = useContext(LangContext)
  return (
    <section id="map" style={{ padding: 'clamp(56px,9vh,88px) 20px', background: 'var(--off)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'14px', fontSize:'8.5px', letterSpacing:'5px', textTransform:'lowercase', color:'var(--soft)', marginBottom:'18px', fontWeight:300 }}>
              <span style={{ display:'inline-block', width:'32px', height:'1px', background:'linear-gradient(to right,transparent,var(--gold2),transparent)' }} />
              {t.map.label}
              <span style={{ display:'inline-block', width:'32px', height:'1px', background:'linear-gradient(to right,transparent,var(--gold2),transparent)' }} />
            </p>
            <h2 style={{ fontFamily:"'Bodoni Moda','Cormorant Garamond',serif", fontSize:'clamp(22px,4vw,36px)', fontWeight:300, fontStyle:'italic', color:'var(--ink)', letterSpacing:'2px', marginBottom:'6px' }}>{t.map.title}</h2>
            <p style={{ fontSize:'11px', letterSpacing:'2px', color:'var(--soft)', fontWeight:300 }}>{t.map.sub}</p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div style={{ overflow:'hidden', border:'1px solid var(--border)' }}>
            <div style={{ height:'3px', background:'linear-gradient(to right, var(--gold), var(--gold2), var(--gold))' }} />
            <iframe
              src="https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A43.305975%2C%22lon%22%3A77.04876%2C%22zoom%22%3A16%7D%2C%22opt%22%3A%7B%22city%22%3A%22almaty%22%7D%2C%22org%22%3A%2270000001054095105%22%7D"
              width="100%" height="400" style={{ border:'none', display:'block' }} title="map" allowFullScreen
            />
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div style={{ marginTop:'20px', display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
            {[
              { href:'https://2gis.kz/almaty/firm/70000001054095105/77.04876,43.305975', label:t.map.btn2gis, dark:true },
              { href:'https://maps.google.com/?q=43.305975,77.04876', label:t.map.btnGoogle, dark:false },
            ].map((btn, i) => (
              <a key={i} href={btn.href} target="_blank" rel="noopener noreferrer" style={{
                display:'inline-block', padding:'12px 32px',
                background: btn.dark ? 'var(--ink)' : 'transparent',
                border:`1px solid ${btn.dark ? 'var(--ink)' : 'var(--border)'}`,
                color: btn.dark ? 'white' : 'var(--mid)',
                textDecoration:'none', fontSize:'9.5px', letterSpacing:'3px',
                textTransform:'lowercase', fontWeight:300, transition:'opacity 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >{btn.label}</a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}