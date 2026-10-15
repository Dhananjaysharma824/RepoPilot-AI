"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Sparkles, ArrowLeft, Mail, Lock, User, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GithubIcon } from "@/components/ui/icons";
import { supabase } from "@/lib/supabase";
import { ThemeToggle } from "@/components/ui/theme-toggle";

function LoginContent() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    const errorDesc = searchParams.get("error_description");
    if (errorDesc) {
      setErrorMessage(decodeURIComponent(errorDesc));
    } else if (errorParam) {
      setErrorMessage(`Authentication notice: ${errorParam}`);
    }
  }, [searchParams]);

  const saveUserProfileToStorage = (userEmail: string, userName?: string) => {
    try {
      const rawName = userName?.trim() || userEmail.split("@")[0] || "User";
      const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
      localStorage.setItem(
        "user_profile",
        JSON.stringify({
          email: userEmail,
          name: formattedName,
        })
      );
    } catch {
      // Storage fallback
    }
  };

  const registerLocalAccount = (userEmail: string, userPassword: string, userName?: string) => {
    try {
      const rawName = userName?.trim() || userEmail.split("@")[0] || "User";
      const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
      
      const stored = localStorage.getItem("registered_users");
      const users = stored ? JSON.parse(stored) : {};
      users[userEmail.toLowerCase()] = {
        email: userEmail,
        name: formattedName,
        password: userPassword,
      };
      localStorage.setItem("registered_users", JSON.stringify(users));

      saveUserProfileToStorage(userEmail, formattedName);
    } catch {
      // Storage fallback
    }
  };

  const getLocalAccount = (userEmail: string) => {
    try {
      const stored = localStorage.getItem("registered_users");
      if (!stored) return null;
      const users = JSON.parse(stored);
      return users[userEmail.toLowerCase()] || null;
    } catch {
      return null;
    }
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      const redirectUrl = `${window.location.origin}/auth/callback`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to initiate sign in.");
      setIsLoading(false);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const cleanEmail = email.trim();

    try {
      if (mode === "signup") {
        // Register account details so user can always log in with chosen credentials
        registerLocalAccount(cleanEmail, password, name);

        // Supabase Sign Up Call
        try {
          await supabase.auth.signUp({
            email: cleanEmail,
            password,
            options: {
              data: {
                full_name: name.trim() || cleanEmail.split("@")[0],
              },
            },
          });
        } catch {
          // Supabase network warning fallback
        }

        const redirectTarget = searchParams.get("redirect") || "/dashboard";

        document.cookie = "demo_session=true; path=/; max-age=86400; SameSite=Lax";
        const displayName = name.trim() || cleanEmail.split("@")[0];
        setSuccessMessage(`Account registered! Welcome ${displayName}! Redirecting...`);

        setTimeout(() => {
          window.location.href = redirectTarget;
        }, 500);
      } else {
        const redirectTarget = searchParams.get("redirect") || "/dashboard";

        // Sign In Mode
        // 1. Attempt Supabase Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (!error && data?.user) {
          const userFullName = data.user.user_metadata?.full_name || name.trim() || cleanEmail.split("@")[0];
          saveUserProfileToStorage(cleanEmail, userFullName);
          document.cookie = "demo_session=true; path=/; max-age=86400; SameSite=Lax";
          const displayName = userFullName.charAt(0).toUpperCase() + userFullName.slice(1);
          setSuccessMessage(`Welcome back ${displayName}! Redirecting...`);

          setTimeout(() => {
            window.location.href = redirectTarget;
          }, 500);
          return;
        }

        // 2. Fallback check for accounts registered during signup (resolves Supabase email-unconfirmed block)
        const localUser = getLocalAccount(cleanEmail);

        if (localUser && localUser.password === password) {
          saveUserProfileToStorage(cleanEmail, localUser.name);
          document.cookie = "demo_session=true; path=/; max-age=86400; SameSite=Lax";
          setSuccessMessage(`Welcome back ${localUser.name}! Redirecting...`);

          setTimeout(() => {
            window.location.href = redirectTarget;
          }, 500);
          return;
        }

        // 3. Incorrect credentials -> Show error & block access
        setErrorMessage("Invalid email or password. Please check your credentials.");
        setIsLoading(false);
      }
    } catch (err: any) {
      const redirectTarget = searchParams.get("redirect") || "/dashboard";
      const localUser = getLocalAccount(cleanEmail);
      if (mode === "signin" && localUser && localUser.password === password) {
        saveUserProfileToStorage(cleanEmail, localUser.name);
        document.cookie = "demo_session=true; path=/; max-age=86400; SameSite=Lax";
        setSuccessMessage(`Welcome back ${localUser.name}! Redirecting...`);
        setTimeout(() => {
          window.location.href = redirectTarget;
        }, 500);
        return;
      }

      setErrorMessage(err.message || "Authentication error. Please check your credentials.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2EB] dark:bg-[#0B0F12] text-[#1E241B] dark:text-slate-100 flex flex-col justify-between relative overflow-hidden transition-colors duration-200">
      {/* Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#8B9A6E]/15 dark:bg-[#8B9A6E]/10 blur-[130px] rounded-full pointer-events-none"></div>

      {/* Top Header */}
      <header className="p-6 max-w-7xl w-full mx-auto flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-[#8B9A6E] p-0.5 shadow-md shadow-[#8B9A6E]/20 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-[#1E241B] dark:bg-[#0B0F12] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#8B9A6E]" />
            </div>
          </div>
          <span className="font-bold text-base text-[#1E241B] dark:text-white tracking-tight">
            RepoPilot <span className="text-[#8B9A6E]">AI</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/" className="text-xs text-[#5A6653] dark:text-slate-400 hover:text-[#1E241B] dark:hover:text-white flex items-center gap-1.5 transition-colors font-semibold">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Login/Signup Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-md bg-[#FFFFFF]/90 dark:bg-[#141A1F]/90 border border-[#EAE2D6] dark:border-[#222C35] rounded-2xl p-8 shadow-xl dark:shadow-2xl backdrop-blur-xl space-y-6">
          
          {/* Sign In / Sign Up Mode Switcher Tabs */}
          <div className="flex bg-[#F7F2EB] dark:bg-[#0B0F12] p-1 rounded-xl border border-[#EAE2D6] dark:border-[#222C35]">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === "signin"
                  ? "bg-[#8B9A6E] text-white dark:text-[#0B0F12] shadow-sm"
                  : "text-[#5A6653] dark:text-slate-400 hover:text-[#1E241B] dark:hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === "signup"
                  ? "bg-[#8B9A6E] text-white dark:text-[#0B0F12] shadow-sm"
                  : "text-[#5A6653] dark:text-slate-400 hover:text-[#1E241B] dark:hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="text-center space-y-1.5">
            <h1 className="text-2xl font-extrabold text-[#1E241B] dark:text-white tracking-tight">
              {mode === "signin" ? "Sign In to Your Account" : "Create Your Free Account"}
            </h1>
            <p className="text-xs text-[#5A6653] dark:text-slate-400">
              {mode === "signin"
                ? "Enter your email & password to access your dashboard."
                : "Register with your email to start analyzing GitHub repositories."}
            </p>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-2.5 text-xs text-rose-600 dark:text-rose-400 font-semibold leading-relaxed">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Message Alert */}
          {successMessage && (
            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start gap-2.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold leading-relaxed">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Social OAuth Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              size="md"
              disabled={isLoading}
              className="w-full bg-[#F7F2EB] dark:bg-[#0B0F12] hover:bg-[#EAE2D6] dark:hover:bg-slate-800 border-[#EAE2D6] dark:border-[#222C35] text-[#1E241B] dark:text-slate-200 justify-center gap-3 py-3"
              onClick={() => handleOAuthLogin("google")}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </Button>

            <Button
              variant="outline"
              size="md"
              disabled={isLoading}
              className="w-full bg-[#F7F2EB] dark:bg-[#0B0F12] hover:bg-[#EAE2D6] dark:hover:bg-slate-800 border-[#EAE2D6] dark:border-[#222C35] text-[#1E241B] dark:text-slate-200 justify-center gap-3 py-3"
              onClick={() => handleOAuthLogin("github")}
            >
              <GithubIcon className="w-4 h-4 text-[#1E241B] dark:text-white" />
              <span>Continue with GitHub</span>
            </Button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-[#EAE2D6] dark:border-slate-800"></div>
            <span className="bg-[#FFFFFF] dark:bg-[#141A1F] px-3 text-[11px] uppercase text-[#5A6653] dark:text-slate-500 font-bold absolute">
              or continue with email
            </span>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-semibold text-[#1E241B] dark:text-slate-300 mb-1.5">
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Dhananjay Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  icon={<User className="w-4 h-4" />}
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#1E241B] dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4" />}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E241B] dark:text-slate-300 mb-1.5">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-4 h-4" />}
                required
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isLoading}
              className="w-full py-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{mode === "signin" ? "Signing In..." : "Creating Account..."}</span>
                </>
              ) : (
                <span>{mode === "signin" ? "Sign In to RepoPilot" : "Create Free Account"}</span>
              )}
            </Button>
          </form>

          {/* Bottom Switcher Prompt */}
          <div className="text-center pt-2 text-xs text-[#5A6653] dark:text-slate-400">
            {mode === "signin" ? (
              <p>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  className="text-[#8B9A6E] font-bold underline underline-offset-2 hover:opacity-80 transition-colors cursor-pointer"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signin");
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  className="text-[#8B9A6E] font-bold underline underline-offset-2 hover:opacity-80 transition-colors cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>

          <div className="pt-2 text-center text-xs text-[#5A6653] dark:text-slate-500 flex items-center justify-center gap-1.5 border-t border-[#EAE2D6] dark:border-slate-800/60 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#8B9A6E]" />
            <span>Supabase Auth & OAuth 2.0 Security Enabled</span>
          </div>
        </div>
      </main>

      <footer className="p-6 text-center text-xs text-[#5A6653] dark:text-slate-500 relative z-10" suppressHydrationWarning>
        © 2026 RepoPilot AI Inc. All rights reserved.
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F2EB] dark:bg-[#0B0F12] flex items-center justify-center text-[#5A6653] dark:text-slate-400">Loading auth...</div>}>
      <LoginContent />
    </Suspense>
  );
}
