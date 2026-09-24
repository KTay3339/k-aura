import { ArrowUpRight, CalendarDays, Check, MapPin } from "lucide-react";
import { and, asc, eq, gte } from "drizzle-orm";
import { getDb } from "@/db";
import { salonEvents } from "@/db/schema";
import RentalCard from "./rental-card";
import EventSubscribeForm from "./event-subscribe-form";

const bookingUrl = "https://kaura.as.me/schedule/63571021";

const rentals = [
  { name: "Open Booth", eyebrow: "Your chair, your schedule", price: "$35–$45", description: "A polished, professional station for independent beauty artists who want flexibility without a long-term lease.", icon: "booth" as const, image: "https://cdn-s.acuityscheduling.com/appointmentType-93613743.jpeg?1785723656", features: ["12-hour reservation", "Monday–Sunday availability", "Pay securely through Acuity"] },
  { name: "Larger Suite", eyebrow: "More room, same freedom", price: "$55–$65", description: "A larger room built for focused appointments and a comfortable, private client experience on your terms.", icon: "suite" as const, image: "https://cdn-s.acuityscheduling.com/appointmentType-93614008.jpeg?1785723853", features: ["12-hour reservation", "Table and large trash can", "Broom, dustpan, towels and rags"] },
];

const pricing = [["Monday – Wednesday", "$35", "$55"], ["Thursday – Friday", "$45", "$65"], ["Saturday", "$45", "$65"], ["Sunday", "$35", "$55"]];

export default async function Home() {
  let events:typeof salonEvents.$inferSelect[]=[];
  try{events=await getDb().select().from(salonEvents).where(and(eq(salonEvents.public,true),gte(salonEvents.startsAt,new Date(Date.now()-86400000)))).orderBy(asc(salonEvents.startsAt)).limit(8)}catch{}
  return <main>
    <header className="nav-shell">
      <a className="brand" href="#top" aria-label="K Aura home">K <span>Aura</span></a>
      <nav aria-label="Main navigation"><a href="#spaces">Spaces</a><a href="#events">Events</a><a href="/apply">Apply</a><a href="#rates">Rates</a></nav>
      <a className="nav-cta" href={bookingUrl} target="_blank" rel="noreferrer">Reserve a space <ArrowUpRight size={16} /></a>
    </header>

    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-copy">
        <p className="kicker"><MapPin size={15} /> Hurst, Texas</p>
        <h1>Your talent.<br /><em>Your space.</em><br />Your terms.</h1>
        <p className="hero-lede">Professional salon space only when you need it. No lease. No commission. No slow-week overhead.</p>
        <div className="hero-actions"><a className="primary-button" href={bookingUrl} target="_blank" rel="noreferrer">Book your day <ArrowUpRight size={18} /></a><a className="text-link" href="#rates">View daily rates</a></div>
        <div className="trust-row" aria-label="Rental benefits"><span><Check size={15} /> 12-hour access</span><span><Check size={15} /> Zero lease</span><span><Check size={15} /> Instant booking</span></div>
      </div>
      <div className="hero-visual">
        <div className="image-frame"><img src="https://cdn-s.acuityscheduling.com/appointmentType-93613921.jpeg?1785723823" alt="K Aura salon rental space" /></div>
        <div className="availability-card"><CalendarDays size={22} /><div><strong>Open 7 days</strong><span>Book the day that works for you</span></div></div>
        <span className="vertical-word">CREATE • SERVE • GROW</span>
      </div>
    </section>

    <section className="marquee" aria-label="No lease, no commission, full-day freedom, your clients, your business">
      <div className="marquee-track" aria-hidden="true">
        <div className="marquee-copy">NO LEASE <i>✦</i> NO COMMISSION <i>✦</i> FULL-DAY FREEDOM <i>✦</i> YOUR CLIENTS, YOUR BUSINESS <i>✦</i></div>
        <div className="marquee-copy">NO LEASE <i>✦</i> NO COMMISSION <i>✦</i> FULL-DAY FREEDOM <i>✦</i> YOUR CLIENTS, YOUR BUSINESS <i>✦</i></div>
      </div>
    </section>

    <section className="section spaces-section" id="spaces">
      <div className="section-heading"><div><p className="kicker">Choose your setting</p><h2>Space that works<br />as hard as you do.</h2></div><p>Whether you need an open station or a room of your own, K Aura gives you a professional home base—without locking you in.</p></div>
      <div className="space-grid">{rentals.map((rental,index)=><RentalCard key={rental.name} rental={rental} delay={index*500} bookingUrl={bookingUrl}/>)}</div>
    </section>

    <section className="events-section" id="events">
      <div className="events-heading"><p className="kicker">Salon Event Calendar</p><h2>What’s happening<br/><em>at K Aura.</em></h2><p>School visits, charity events, open tour days and other salon announcements—all in one place.</p></div>
      <div className="events-content"><div className="event-list">{events.length?events.map(event=><article className="event-card" key={event.id}><time dateTime={event.startsAt.toISOString()}><strong>{event.startsAt.toLocaleDateString("en-US",{day:"2-digit",timeZone:"America/Chicago"})}</strong><span>{event.startsAt.toLocaleDateString("en-US",{month:"short",timeZone:"America/Chicago"})}</span></time><div><p>{event.eventType}</p><h3>{event.title}</h3>{event.description&&<span>{event.description}</span>}<small>{event.startsAt.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",timeZone:"America/Chicago"})} · {event.location}</small></div></article>):<div className="events-empty"><CalendarDays/><h3>No events announced yet.</h3><p>Subscribe below and we’ll let you know when the next K Aura event is posted.</p></div>}</div><EventSubscribeForm/></div>
    </section>

    <section className="rates-section" id="rates">
      <div className="rates-intro"><p className="kicker">Straightforward daily rates</p><h2>Pay for the day.<br /><em>Keep the freedom.</em></h2><p>Each reservation holds the space exclusively for you. Pick your day, choose your setup, and get to work.</p></div>
      <div className="rate-table" role="table" aria-label="K Aura daily rental rates"><div className="rate-row rate-head" role="row"><span role="columnheader">Day</span><span role="columnheader">Open booth</span><span role="columnheader">Larger suite</span></div>
        {pricing.map(([day, booth, suite]) => <div className="rate-row" role="row" key={day}><strong role="cell">{day}</strong><span role="cell">{booth}<small>/day</small></span><span role="cell">{suite}<small>/day</small></span></div>)}
        <a className="table-cta" href={bookingUrl} target="_blank" rel="noreferrer">Check available dates <ArrowUpRight size={18} /></a>
      </div>
    </section>

    <section className="section details-section" id="details">
      <div className="section-heading compact"><div><p className="kicker">Simple by design</p><h2>Booked in minutes.</h2></div></div>
      <div className="steps"><article><span>01</span><h3>Choose your space</h3><p>Select an open booth or private suite based on the experience you want to create.</p></article><article><span>02</span><h3>Choose your day</h3><p>Review live availability and reserve the date that fits your client schedule.</p></article><article><span>03</span><h3>Show up & shine</h3><p>Your reserved space is yours for the day—serve clients, create content, and grow.</p></article></div>
    </section>

    <section className="final-cta"><p className="kicker">Your chair is waiting</p><h2>Make room for<br /><em>your next move.</em></h2><a className="primary-button light" href={bookingUrl} target="_blank" rel="noreferrer">Reserve at K Aura <ArrowUpRight size={18} /></a></section>
    <footer><a className="brand" href="#top">K <span>Aura</span></a><p>Flexible salon rentals in Hurst, Texas.</p><a href={bookingUrl} target="_blank" rel="noreferrer">Booking & policies <ArrowUpRight size={14} /></a></footer>
  </main>;
}
