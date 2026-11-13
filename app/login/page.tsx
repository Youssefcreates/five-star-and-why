import Link from "next/link";
import { login, signup } from "./actions";

type Params = { mode?: string; message?: string };

export default async function Login({ searchParams }: { searchParams: Promise<Params> }) {
  const p = await searchParams;
  const mode = p.mode === "signup" || p.mode === "check-email" ? p.mode : "signin";

  if (mode === "check-email") {
    return (
      <div className="form-wrap auth-done">
        <img src="/logo.svg" alt="" width={110} height={110} />
        <div className="eyebrow">Almost there</div>
        <h1>Check your email</h1>
        <p className="muted">
          We sent a confirmation link to your inbox. Click <b>Confirm my email</b> and you&apos;ll be signed in automatically.
        </p>
        <p className="muted small">Don&apos;t see it after a minute? Check your spam or promotions folder.</p>
        <div className="actions">
          <Link className="button secondary" href="/">Back to home</Link>
          <Link className="button secondary" href="/login?mode=signup">Use a different email</Link>
        </div>
      </div>
    );
  }

  const isSignup = mode === "signup";
  return (
    <div className="form-wrap">
      <div className="auth-tabs" role="tablist">
        <Link href="/login" role="tab" aria-selected={!isSignup} className={!isSignup ? "active" : ""}>Sign in</Link>
        <Link href="/login?mode=signup" role="tab" aria-selected={isSignup} className={isSignup ? "active" : ""}>Create account</Link>
      </div>

      <div className="eyebrow">{isSignup ? "Join the community" : "Welcome back"}</div>
      <h1>{isSignup ? "Create your account" : "Sign in"}</h1>
      {p.message && <div className="notice">{p.message}</div>}

      <form action={isSignup ? signup : login}>
        {isSignup && (
          <>
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" placeholder="Shown on your reviews" autoComplete="name" required />
          </>
        )}
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          minLength={8}
          autoComplete={isSignup ? "new-password" : "current-password"}
          placeholder={isSignup ? "At least 8 characters" : ""}
          required
        />
        <div className="actions">
          <button className="button" type="submit">{isSignup ? "Create account" : "Sign in"}</button>
        </div>
      </form>

      <p className="auth-switch muted">
        {isSignup ? (
          <>Already have an account? <Link href="/login">Sign in</Link></>
        ) : (
          <>New here? <Link href="/login?mode=signup">Create an account</Link></>
        )}
      </p>
    </div>
  );
}
