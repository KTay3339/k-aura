import { env } from "cloudflare:workers";
import { getDb } from "@/db";
import { applications } from "@/db/schema";

const text = (form: FormData, key: string) => String(form.get(key) ?? "").trim();
const safeFile = (value: FormDataEntryValue | null) => value instanceof File && value.size > 0 ? value : null;

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const isStudent = text(form, "isStudent") === "yes";
    const rentalType = text(form, "rentalType");
    const profile = safeFile(form.get("profilePhoto"));
    const license = safeFile(form.get("license"));
    const idFront = safeFile(form.get("idFront"));
    const idBack = safeFile(form.get("idBack"));
    if (!text(form,"fullName") || !text(form,"email") || !text(form,"phone") || !text(form,"profession") || !text(form,"services") || !profile) return Response.json({error:"Please complete every required field."},{status:400});
    if (!isStudent && !license) return Response.json({error:"A current professional license is required."},{status:400});
    if (isStudent && (!idFront || !idBack)) return Response.json({error:"Students must upload both sides of their ID."},{status:400});
    if (!env.BUCKET) throw new Error("Upload storage is unavailable");
    const upload = async (file: File, label: string) => { const key=`private/applications/${crypto.randomUUID()}-${label}`; await env.BUCKET.put(key, await file.arrayBuffer(), {httpMetadata:{contentType:file.type || "application/octet-stream"}}); return key; };
    const [profileImageKey, licenseKey, idFrontKey, idBackKey] = await Promise.all([upload(profile,"profile"), license ? upload(license,"license") : null, idFront ? upload(idFront,"id-front") : null, idBack ? upload(idBack,"id-back") : null]);
    const [row] = await getDb().insert(applications).values({fullName:text(form,"fullName"),email:text(form,"email"),phone:text(form,"phone"),rentalType,isStudent,schoolName:isStudent?text(form,"schoolName"):null,profession:text(form,"profession"),businessName:text(form,"businessName"),bio:text(form,"bio"),services:text(form,"services"),wantsClientLink:false,bookingUrl:null,profileImageKey,licenseKey,idFrontKey,idBackKey,eligibleHours:isStudent?"Weekends after 5:00 PM":"Standard rental hours",createdAt:new Date()}).returning({id:applications.id});
    return Response.json({ok:true,id:row.id},{status:201});
  } catch (error) { return Response.json({error:error instanceof Error?error.message:"Unable to submit application."},{status:500}); }
}
