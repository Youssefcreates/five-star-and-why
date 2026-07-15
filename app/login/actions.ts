"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
export async function login(formData:FormData){const supabase=await createClient();const email=String(formData.get("email"));const password=String(formData.get("password"));const {error}=await supabase.auth.signInWithPassword({email,password});if(error)redirect(`/login?message=${encodeURIComponent(error.message)}`);redirect("/profile")}
export async function signup(formData:FormData){const supabase=await createClient();const email=String(formData.get("email"));const password=String(formData.get("password"));const display_name=String(formData.get("name"));const {error}=await supabase.auth.signUp({email,password,options:{data:{display_name}}});if(error)redirect(`/login?message=${encodeURIComponent(error.message)}`);redirect("/login?message=Check your email to confirm your account")}
