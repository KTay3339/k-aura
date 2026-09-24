"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ApplicationForm(){
  const [student,setStudent]=useState(false); const [state,setState]=useState<"idle"|"sending"|"done"|"error">("idle"); const [message,setMessage]=useState("");
  async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setState("sending");const response=await fetch("/api/applications",{method:"POST",body:new FormData(e.currentTarget)});const data=await response.json();if(response.ok){setState("done");e.currentTarget.reset()}else{setState("error");setMessage(data.error||"Please try again.")}}
  if(state==="done") return <div className="form-success"><CheckCircle2 size={42}/><h2>Application received.</h2><p>Bre’s team will review your information and contact you about the next step. Nothing you uploaded is displayed publicly unless your profile is approved.</p><a href="/">Return home</a></div>;
  return <form className="application-form" onSubmit={submit}>
    <div className="form-section"><span>01</span><div><h2>Rental request</h2><p>Tell us what kind of space you need.</p></div></div>
    <fieldset><legend>What are you booking?</legend><div className="option-grid"><label><input required type="radio" name="rentalType" value="chair"/> Booth <small>For licensed cosmetologists, barbers and hair professionals</small></label><label><input required type="radio" name="rentalType" value="suite"/> Larger suite <small>Roomier space with a table for beauty professionals</small></label></div></fieldset>
    <fieldset><legend>Are you still in school?</legend><div className="radio-row"><label><input required type="radio" name="isStudent" value="yes" onChange={()=>setStudent(true)}/> Yes</label><label><input required type="radio" name="isStudent" value="no" onChange={()=>setStudent(false)}/> No</label></div><p className="field-note">Student reservations are available on weekends after 5:00 PM.</p></fieldset>
    {student&&<label>School name<input required name="schoolName" placeholder="Name of your program or school"/></label>}
    <div className="form-section"><span>02</span><div><h2>Professional details</h2><p>Used by Bre’s team to verify and build your profile.</p></div></div>
    <div className="two-col"><label>Full legal name<input required name="fullName" autoComplete="name"/></label><label>Business name <small>(optional)</small><input name="businessName"/></label><label>Email<input required type="email" name="email" autoComplete="email"/></label><label>Phone<input required type="tel" name="phone" autoComplete="tel"/></label></div>
    <label>Profession<select required name="profession" defaultValue=""><option value="" disabled>Select one</option><option>Cosmetologist</option><option>Hair stylist</option><option>Barber</option><option>Esthetician</option><option>Nail technician</option><option>Other beauty professional</option></select></label>
    <label>Services you offer<textarea required name="services" rows={3} placeholder="Example: silk presses, braids, facials, waxing"/></label><label>Short professional bio <small>(optional)</small><textarea name="bio" rows={4}/></label>
    <div className="form-section"><span>03</span><div><h2>Verification</h2><p>Your credentials are reviewed privately.</p></div></div>
    <div className="privacy-note"><ShieldCheck/><div><strong>Private document handling</strong><p>Licenses and IDs are visible only to Bre’s authorized admin team. Public profiles display a verification badge—not the document, number, or student status.</p></div></div>
    <label>Professional profile photo<input required type="file" name="profilePhoto" accept="image/jpeg,image/png,image/webp"/></label>
    {!student?<label>Current professional license<input required type="file" name="license" accept="image/jpeg,image/png,image/webp,application/pdf"/></label>:<div className="two-col"><label>Photo ID — front<input required type="file" name="idFront" accept="image/jpeg,image/png,image/webp"/></label><label>Photo ID — back<input required type="file" name="idBack" accept="image/jpeg,image/png,image/webp"/></label></div>}
    <label className="consent"><input required type="checkbox"/> I confirm this information is accurate and authorize K Aura to privately review my credentials.</label>
    {state==="error"&&<p className="form-error">{message}</p>}<button className="submit-button" disabled={state==="sending"}>{state==="sending"?"Submitting…":"Submit for review"}<ArrowRight size={18}/></button>
  </form>
}
