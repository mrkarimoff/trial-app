import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/general/themeProvider";
import Header from "@/components/main/header";
import { useLocale } from "next-intl";
import SuppressHydrationWarning from "@/components/general/suppressHydrationWarning";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = { title: "Trial application" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();

  return (
    <html lang={locale}>
      <body className={poppins.className}>
        <SuppressHydrationWarning>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header locale={locale} />
            {children}
          </ThemeProvider>
        </SuppressHydrationWarning>
      </body>
    </html>
  );
}
