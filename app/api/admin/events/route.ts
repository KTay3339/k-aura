import { getDb } from "@/db";
import { salonEvents } from "@/db/schema";
import { requireAdmin } from "@/lib/admin";
const text=(form:FormData,key:string)=>String(form.get(key)||"").trim();
export async function POST(request:Request){if(!await requireAdmin())return Response.json({error:"Unauthorized"},{status:401});try{const form=await request.formData();const title=text(form,"title"),eventType=text(form,"eventType"),startsAt=new Date(text(form,"startsAt")),endsRaw=text(form,"endsAt"),location=text(form,"location");if(!title||!eventType||!location||Number.isNaN(startsAt.getTime()))return Response.json({error:"Complete all required event details."},{status:400});await getDb().insert(salonEvents).values({title,eventType,startsAt,endsAt:endsRaw?new Date(endsRaw):null,location,description:text(form,"description")||null,public:true,createdAt:new Date()});return Response.json({ok:true},{status:201})}catch{return Response.json({error:"Unable to publish this event."},{status:500})}}
