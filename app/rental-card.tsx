"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, Check, DoorOpen, Sparkles } from "lucide-react";

type Rental = { name:string; eyebrow:string; price:string; description:string; icon:"booth"|"suite"; image:string; features:string[] };

export default function RentalCard({ rental, delay=0, bookingUrl }:{ rental:Rental; delay?:number; bookingUrl:string }) {
  const [flipped,setFlipped]=useState(false);
  const [paused,setPaused]=useState(false);
  useEffect(()=>{if(paused)return;const first=window.setTimeout(()=>setFlipped(true),1800+delay);const loop=window.setInterval(()=>setFlipped(v=>!v),4200);return()=>{window.clearTimeout(first);window.clearInterval(loop)}},[delay,paused]);
  const Icon=rental.icon==="booth"?Sparkles:DoorOpen;
  return <article className={`space-card ${flipped?"is-flipped":""}`} tabIndex={0} aria-label={`${rental.name} rental details`} onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocus={()=>setPaused(true)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setPaused(false)}} onClick={()=>{setPaused(true);setFlipped(v=>!v)}}>
    <div className="space-card-inner">
      <div className="space-card-face space-card-front"><img src={rental.image} alt={`${rental.name} at K Aura`}/><div className="front-label"><Icon size={19}/><div><span>{rental.eyebrow}</span><h3>{rental.name}</h3></div></div><small>Tap to see rates &amp; availability</small></div>
      <div className="space-card-face space-card-back"><p className="eyebrow">Flexible daily rental</p><h3>{rental.name}</h3><p>{rental.description}</p><ul>{rental.features.map(feature=><li key={feature}><Check size={16}/>{feature}</li>)}</ul><div className="flip-rate"><span>Daily rent</span><strong>{rental.price}</strong></div><div className="booking-facts"><span><CalendarDays size={16}/>12-hour booking</span><span>Live availability in Acuity</span></div><a href={bookingUrl} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} onPointerDown={e=>e.stopPropagation()}>Book &amp; pay in Acuity <ArrowUpRight size={17}/></a></div>
    </div>
  </article>
}
