import { env } from "cloudflare:workers"; import { getChatGPTUser } from "@/app/chatgpt-auth";
export async function requireAdmin(){const user=await getChatGPTUser();const allowed=String(env.ADMIN_EMAILS||"").split(",").map(v=>v.trim().toLowerCase()).filter(Boolean);if(!user||!allowed.includes(user.email.toLowerCase()))return null;return user}
