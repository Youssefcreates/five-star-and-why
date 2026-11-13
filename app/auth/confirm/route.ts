import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Handles the link in Supabase auth emails (sign-up confirmation, password reset, email change).
// Email templates link here as: {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/profile
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const nextParam = searchParams.get("next") ?? "/profile";
  // Only allow redirects within this site.
  const next = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/profile";

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) redirect(next);
  }

  redirect(`/login?message=${encodeURIComponent("That link is invalid or has expired. Try signing in, or create your account again.")}`);
}
