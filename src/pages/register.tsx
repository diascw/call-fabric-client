"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/Components/atoms/Input";
import Button from "@/Components/atoms/Button";
import Navbar from "@/Components/organisms/Navbar";

const RegisterPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const validateFields = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Name is required.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!email.trim()) {
      setEmailError("Email is required.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleRegister = async () => {
    if (!validateFields()) return;

    try {
      const usersDb = JSON.parse(localStorage.getItem("users") || "[]");

      if (usersDb.some((user: any) => user.email === email)) {
        setError("Email is already registered.");
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        token: `token-${Math.random().toString(36).substr(2)}`,
      };

      usersDb.push(newUser);
      localStorage.setItem("users", JSON.stringify(usersDb));

      router.push("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="bg-white p-12 rounded-lg shadow-lg w-[500px] border border-gray-200 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
            Register
          </h1>
          <div className="space-y-6 w-full">
            <Input
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}

          <div className="mt-8 w-full">
            <Button
              label="Sign Up"
              onClick={handleRegister}
              variant="primary"
              className="w-full py-3 text-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
