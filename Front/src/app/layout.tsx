"use client"
import Layout from "@/components/Layout";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body>
        {!isLoginPage ? (
          <AuthProvider>
            <Layout>{children}</Layout>
          </AuthProvider>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
