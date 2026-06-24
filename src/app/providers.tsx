"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import SubscribeModal from "@/components/auth/SubscribeModal";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <AuthModal />
      <SubscribeModal />
    </AuthProvider>
  );
}
