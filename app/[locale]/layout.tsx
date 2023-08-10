import SessionProviders from "@/components/general/sessionProviders";
import SuppressHydrationWarning from "@/components/general/suppressHydrationWarning";
import { ThemeProvider } from "@/components/general/themeProvider";
import HeaderWithProvider from "@/components/main/header";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { useLocale } from "next-intl";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = { title: "Trial App" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();

  return (
    <html lang={locale}>
      <body className={poppins.className}>
        <SessionProviders>
          <SuppressHydrationWarning>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <HeaderWithProvider locale={locale} />
              {children}
              <Toaster />
            </ThemeProvider>
          </SuppressHydrationWarning>
        </SessionProviders>
      </body>
    </html>
  );
}
