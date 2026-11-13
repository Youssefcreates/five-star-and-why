"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    const msg = error.message.toLowerCase().includes("email not confirmed")
      ? "Please confirm your email first. Check your inbox (and spam folder) for the link we sent."
      : "That email and password don't match. Try again, or create an account.";
    redirect(`/login?message=${encodeURIComponent(msg)}`);
  }
  redirect("/profile");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const display_name = String(formData.get("name") ?? "").trim();
  const { error } = await supabase.auth.signUp({ email, password, options: { data: { display_name } } });
  if (error) redirect(`/login?mode=signup&message=${encodeURIComponent(error.message)}`);
  redirect("/login?mode=check-email");
}
