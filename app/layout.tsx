import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
// import { Header } from "@radix-ui/react-accordion";

export const metadata: Metadata = {
  title: "9Rain",
  description: "9Rain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* <Header /> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
