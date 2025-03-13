"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/Components/atoms/Input";
import Button from "@/Components/atoms/Button";
import Navbar from "@/Components/organisms/Navbar";

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      await login(email, password);
      router.push("/call-fabric");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="bg-white p-12 rounded-lg shadow-lg w-[500px] border border-gray-200 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
            Login
          </h1>
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <div className="space-y-6 w-full">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-8 w-full">
            <Button
              label="Login"
              onClick={handleLogin}
              variant="primary"
              className="w-full py-3 text-lg"
            />
          </div>

          <p className="text-sm text-center text-gray-600 mt-6">
            Need an account?{" "}
            <Link
              href="/register"
              className="text-blue-700 hover:text-blue-800 font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
