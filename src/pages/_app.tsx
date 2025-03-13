import type { AppProps } from "next/app";
import "../styles/globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CallProvider } from "@/contexts/CallContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CallProvider>
        <Component {...pageProps} />
      </CallProvider>
    </AuthProvider>
  );
}
