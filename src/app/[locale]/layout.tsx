import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";


import Providers from "../providers";
import Header from "../components/Header";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Rentora",
  description: "Find rentals easily",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;


  const isRTL = locale === "ar";



  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} className={`${inter.variable} ${poppins.variable}`}>
      <meta name="google-site-verification" content="fOr9peFwgeTwzGtSLbZDYQf3PAmTmyA5OkA0NIfYs2I" />
      <body>
        <NextIntlClientProvider>

        <Providers>
          <Header />

          {children}

          <Toaster />

        </Providers>
        
        </NextIntlClientProvider>


      </body>
    </html>
  );
}
