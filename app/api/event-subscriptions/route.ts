import { getDb } from "@/db";
import { eventSubscribers } from "@/db/schema";
import { env } from "cloudflare:workers";

const subject="Welcome to the K Aura community ✨";
const plainText=`Thank you for subscribing to K Aura Salon event updates.

We’re so glad you’re here.

K Aura is more than a beautiful place to work and gather—it’s a community created for connection, creativity, and growth. From open tour days and school visits to workshops, charity events, and special salon moments, you’ll be among the first to know what’s happening in our space.

We promise to keep our messages thoughtful and worthwhile. No clutter—just meaningful updates and invitations from our community to yours.

Welcome to K Aura. We look forward to sharing what’s next with you.

With warmth,
The K Aura Salon Team
Hurst, Texas`;
const html=`<!doctype html><html><body style="margin:0;background:#f5f0df;font-family:Arial,Helvetica,sans-serif;color:#0b2f24"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f0df;padding:32px 14px"><tr><td align="center"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#fffdf7;border:1px solid #d9d1b6"><tr><td style="background:#0b2f24;padding:34px 38px;text-align:center"><div style="font-family:Georgia,serif;font-size:30px;font-weight:bold;color:#fff">K <span style="color:#d4af37;font-weight:normal">Aura</span></div><div style="margin-top:10px;color:#e8dfbd;font-size:11px;letter-spacing:3px;text-transform:uppercase">Salon Events</div></td></tr><tr><td style="padding:44px 42px 20px"><div style="color:#9b781d;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase">Welcome to the community</div><h1 style="font-family:Georgia,serif;font-size:34px;line-height:1.15;font-weight:normal;margin:14px 0 22px;color:#0b2f24">We’re so glad<br>you’re here.</h1><p style="font-size:16px;line-height:1.75;margin:0 0 18px">Thank you for subscribing to updates about K Aura Salon events.</p><p style="font-size:16px;line-height:1.75;margin:0 0 18px">K Aura is more than a beautiful place to work and gather—it’s a community created for connection, creativity, and growth. From open tour days and school visits to workshops, charity events, and special salon moments, you’ll be among the first to know what’s happening in our space.</p><p style="font-size:16px;line-height:1.75;margin:0 0 18px">We promise to keep our messages thoughtful and worthwhile. No clutter—just meaningful updates and invitations from our community to yours.</p><p style="font-size:16px;line-height:1.75;margin:0">Welcome to K Aura. We look forward to sharing what’s next with you.</p></td></tr><tr><td style="padding:18px 42px 44px"><div style="border-top:1px solid #d9d1b6;padding-top:22px"><p style="font-family:Georgia,serif;font-size:19px;margin:0 0 5px;color:#0b2f24">With warmth,</p><p style="font-size:14px;font-weight:bold;margin:0;color:#9b781d">The K Aura Salon Team</p><p style="font-size:12px;margin:5px 0 0;color:#5f665f">Hurst, Texas</p></div></td></tr></table></td></tr></table></body></html>`;

async function sendWelcome(email:string){if(!env.RESEND_API_KEY)return false;const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{authorization:`Bearer ${env.RESEND_API_KEY}`,"content-type":"application/json"},body:JSON.stringify({from:env.RESEND_FROM_EMAIL||"K Aura Salon <events@kaurasalon.com>",to:[email],subject,html,text:plainText})});return response.ok}

export async function POST(request:Request){try{const body=await request.json() as {email?:string};const email=body.email?.trim().toLowerCase();if(!email||!/^\S+@\S+\.\S+$/.test(email))return Response.json({error:"Enter a valid email address."},{status:400});await getDb().insert(eventSubscribers).values({email,active:true,createdAt:new Date()}).onConflictDoUpdate({target:eventSubscribers.email,set:{active:true}});let welcomeSent=false;try{welcomeSent=await sendWelcome(email)}catch(error){console.error("K Aura welcome email failed",error)}return Response.json({ok:true,welcomeSent},{status:201})}catch{return Response.json({error:"Unable to subscribe right now."},{status:500})}}
