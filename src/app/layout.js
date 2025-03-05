import "./globals.css";
import { Poppins } from "next/font/google";
import AuthProvider from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Paddle Community App",
  description: "Connecting Hawaii’s canoe paddling community",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}