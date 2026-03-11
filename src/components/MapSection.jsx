import React, { useContext } from 'react'
import KazakhOrnament from './KazakhOrnament'
import { LangContext } from '../App'

export default function MapSection() {
  const { t } = useContext(LangContext)
  return (
    <section id="map" style={{ padding:'80px 20px', background:'var(--ivory)', position:'relative' }}>
      <div style={{ maxWidth:'900px', margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'48px' }}>
          <KazakhOrnament type="divider" color="var(--gold)" />
          <p style={{ letterSpacing:'5px', fontSize:'11px', textTransform:'uppercase', color:'var(--gold)', marginBottom:'12px', marginTop:'32px' }}>{t.map.label}</p>
          <h2 style={{ fontSize:'clamp(28px,5vw,48px)', fontWeight:300, fontStyle:'italic', color:'var(--text-dark)', marginBottom:'12px' }}>{t.map.title}</h2>
          <p style={{ fontSize:'15px', color:'var(--text-light)' }}>{t.map.sub}</p>
        </div>
        <div style={{ borderRadius:'8px', overflow:'hidden', border:'1px solid var(--border)', boxShadow:'0 8px 40px rgba(201,168,76,0.12)' }}>
          <div style={{ height:'4px', background:'linear-gradient(to right, var(--gold), var(--rose-light), var(--gold))' }} />
          <iframe src="https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A43.305975%2C%22lon%22%3A77.04876%2C%22zoom%22%3A16%7D%2C%22opt%22%3A%7B%22city%22%3A%22almaty%22%7D%2C%22org%22%3A%2270000001054095105%22%7D"
            width="100%" height="450" style={{ border:'none', display:'block' }} title="Той орны" allowFullScreen />
        </div>
        <div style={{ marginTop:'24px', display:'flex', flexWrap:'wrap', gap:'16px', justifyContent:'center' }}>
          <a href="https://2gis.kz/almaty/firm/70000001054095105/77.04876,43.305975" target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'14px 32px', background:'linear-gradient(135deg,var(--gold),var(--gold-light))', color:'white', textDecoration:'none', borderRadius:'4px', fontFamily:"'Raleway',sans-serif", fontSize:'13px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:500, boxShadow:'0 4px 16px rgba(201,168,76,0.3)', transition:'all 0.3s ease' }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 8px 24px rgba(201,168,76,0.4)'}}
            onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 4px 16px rgba(201,168,76,0.3)'}}
          >{t.map.open2gis}</a>
          <a href="https://maps.google.com/?q=43.305975,77.04876" target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'14px 32px', background:'var(--white)', border:'1px solid var(--border)', color:'var(--text-mid)', textDecoration:'none', borderRadius:'4px', fontFamily:"'Raleway',sans-serif", fontSize:'13px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:500, transition:'all 0.3s ease' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold)';e.currentTarget.style.color='var(--gold)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--text-mid)'}}
          >{t.map.openGoogle}</a>
        </div>
      </div>
    </section>
  )
}