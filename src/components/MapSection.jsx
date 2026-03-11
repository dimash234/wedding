import React, { useContext } from 'react'
import { LangContext } from '../App'
export default function MapSection() {
  const { t } = useContext(LangContext)
  return (
    <section id="map" style={{padding:'80px 20px',background:'var(--ivory)'}}>
      <div style={{maxWidth:'860px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'40px'}}>
          <p style={{fontSize:'9px',letterSpacing:'5px',textTransform:'lowercase',color:'var(--text-light)',marginBottom:'14px',display:'flex',alignItems:'center',justifyContent:'center',gap:'12px'}}>
            <span style={{display:'inline-block',width:'24px',height:'1px',background:'var(--line)'}}/>
            {t.map.label}
            <span style={{display:'inline-block',width:'24px',height:'1px',background:'var(--line)'}}/>
          </p>
          <h2 className="display-font" style={{fontSize:'clamp(22px,4vw,34px)',fontWeight:300,color:'var(--text-dark)',letterSpacing:'3px',textTransform:'lowercase',marginBottom:'8px'}}>{t.map.title}</h2>
          <p style={{fontSize:'11px',letterSpacing:'2px',color:'var(--text-light)'}}>{t.map.sub}</p>
        </div>
        <div style={{overflow:'hidden',border:'1px solid var(--border)'}}>
          <iframe src="https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A43.305975%2C%22lon%22%3A77.04876%2C%22zoom%22%3A16%7D%2C%22opt%22%3A%7B%22city%22%3A%22almaty%22%7D%2C%22org%22%3A%2270000001054095105%22%7D"
            width="100%" height="400" style={{border:'none',display:'block'}} title="map" allowFullScreen />
        </div>
        <div style={{marginTop:'20px',display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
          {[
            {href:'https://2gis.kz/almaty/firm/70000001054095105/77.04876,43.305975',label:t.map.open2gis,dark:true},
            {href:'https://maps.google.com/?q=43.305975,77.04876',label:t.map.openGoogle,dark:false},
          ].map((btn,i)=>(
            <a key={i} href={btn.href} target="_blank" rel="noopener noreferrer" style={{
              display:'inline-block', padding:'12px 28px',
              background: btn.dark ? 'var(--text-dark)' : 'transparent',
              border:`1px solid ${btn.dark?'var(--text-dark)':'var(--line)'}`,
              color: btn.dark ? 'var(--white)' : 'var(--text-mid)',
              textDecoration:'none', fontSize:'10px', letterSpacing:'3px',
              textTransform:'lowercase', transition:'all 0.3s'
            }}
            onMouseEnter={e=>{e.currentTarget.style.opacity='0.75'}}
            onMouseLeave={e=>{e.currentTarget.style.opacity='1'}}
            >{btn.label}</a>
          ))}
        </div>
      </div>
    </section>
  )
}