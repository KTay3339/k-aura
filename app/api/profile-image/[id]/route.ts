import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { providers } from "@/db/schema";
export async function GET(_request:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params;const [provider]=await getDb().select({key:providers.profileImageKey}).from(providers).where(eq(providers.id,Number(id))).limit(1);if(!provider||!env.BUCKET)return new Response("Not found",{status:404});const object=await env.BUCKET.get(provider.key);if(!object)return new Response("Not found",{status:404});return new Response(object.body,{headers:{"content-type":object.httpMetadata?.contentType||"image/jpeg","cache-control":"public, max-age=3600"}})}
