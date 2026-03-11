import React, { useContext } from 'react'
import { LangContext } from '../App'
export default function Calendar({ weddingDate }) {
  const { t } = useContext(LangContext)
  const year=2026, month=5
  const firstDay=new Date(year,month,1).getDay()
  const startDay=firstDay===0?6:firstDay-1
  const daysInMonth=new Date(year,month+1,0).getDate()
  const cells=[]
  for(let i=0;i<startDay;i++) cells.push(null)
  for(let d=1;d<=daysInMonth;d++) cells.push(d)
  while(cells.length%7!==0) cells.push(null)
  const today=new Date()
  const isT=d=>d===today.getDate()&&month===today.getMonth()&&year===today.getFullYear()
  return (
    <div style={{background:'var(--white)',border:'1px solid var(--border)',padding:'28px',maxWidth:'420px',margin:'0 auto'}}>
      <p className="display-font" style={{textAlign:'center',fontSize:'18px',fontWeight:300,color:'var(--text-dark)',letterSpacing:'3px',marginBottom:'24px',textTransform:'lowercase'}}>
        {t.calendar.months[month]} {year}
      </p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:'2px',marginBottom:'6px'}}>
        {t.calendar.days.map(d=>(
          <div key={d} style={{textAlign:'center',padding:'4px 0',fontSize:'9px',letterSpacing:'1px',textTransform:'lowercase',color:'var(--text-light)'}}>{d}</div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:'2px'}}>
        {cells.map((day,i)=>{
          const wed=day===28, tod=isT(day)
          return (
            <div key={i} style={{
              textAlign:'center', padding:'7px 2px',
              background: wed ? 'var(--text-dark)' : tod ? 'var(--gold-faint)' : 'transparent',
              position:'relative'
            }}>
              <span style={{fontSize:'12px',fontWeight:wed?400:300,color:wed?'var(--white)':day?'var(--text-dark)':'transparent'}}>
                {day||''}
              </span>
              {wed&&<span style={{fontSize:'6px',display:'block',color:'rgba(255,255,255,0.7)',marginTop:'1px'}}>✦</span>}
            </div>
          )
        })}
      </div>
      <div style={{marginTop:'20px',paddingTop:'16px',borderTop:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px'}}>
        <div style={{width:'10px',height:'10px',background:'var(--text-dark)'}} />
        <span style={{fontSize:'10px',letterSpacing:'2px',color:'var(--text-light)',textTransform:'lowercase'}}>{t.calendar.legend}</span>
      </div>
    </div>
  )
}