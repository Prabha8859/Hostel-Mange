"use client";
// app/login/page.tsx

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function Login() {
  const router = useRouter();

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-80">
        <Card>
          <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h1>

          <input className="w-full border p-2 mb-3 rounded focus:outline-blue-500" placeholder="Email" type="email" />
          <input className="w-full border p-2 mb-6 rounded focus:outline-blue-500" placeholder="Password" type="password" />

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