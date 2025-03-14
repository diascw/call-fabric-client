import type { AppProps } from "next/app";
import "../styles/globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CallProvider } from "@/contexts/CallContext";
import { useState, useEffect } from "react";

const auth = [
  process.env.NEXT_PUBLIC_SIGNALWIRE_FABRIC_API_URL,
  process.env.NEXT_PUBLIC_SIGNALWIRE_PROJECT_KEY,
  process.env.NEXT_PUBLIC_SIGNALWIRE_TOKEN,
];

export default function MyApp({ Component, pageProps }: AppProps) {
  const [envValid, setEnvValid] = useState(true);

  useEffect(() => {
    const missingVars = auth.filter((key) => !key);
    if (missingVars.length > 0) {
      console.error(`${missingVars.join("env undefined")}`);
      setEnvValid(false);
    }
  }, []);

  if (!envValid) {
    return <></>;
  }

  return (
    <AuthProvider>
      <CallProvider>
        <Component {...pageProps} />
      </CallProvider>
    </AuthProvider>
  );
}
