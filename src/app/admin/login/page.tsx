"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent){
    e.preventDefault();
    setLoading(true); setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setLoading(false);
    if(res.ok){
      router.push("/admin");
    }else{
      const j = await res.json();
      setError(j.error || "Login failed");
    }
  }

  return (
    <div className="container max-w-md mt-16">
      <form onSubmit={onSubmit} className="card p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div>
          <div className="label">Username</div>
          <input className="input" value={username} onChange={e=>setUsername(e.target.value)} />
        </div>
        <div>
          <div className="label">Password</div>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button className="btn" disabled={loading}>{loading? "Signing in..." : "Sign In"}</button>
      </form>
    </div>
  );
}
