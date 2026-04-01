"use client";
// app/login/page.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

export default function Login() {
  const router = useRouter();
  // Set the default values here
  const [email, setEmail] = useState("admin@hostel.com");
  const [password, setPassword] = useState("admin123");

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-80">
        <Card>
          <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h1>

          <input 
            className="w-full border p-2 mb-3 rounded focus:outline-blue-500" 
            placeholder="Email" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            className="w-full border p-2 mb-6 rounded focus:outline-blue-500" 
            placeholder="Password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            onClick={() => router.push("/dashboard")}
            className="w-full"
          >
            Login
          </Button>
        </Card>
      </div>
    </div>
  );
}