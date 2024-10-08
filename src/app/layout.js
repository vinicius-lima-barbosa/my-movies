import Footer from "../components/Footer";
import Header from "../components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Movies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col mx-auto min-h-screen">
          <Header />
          <div className="container mx-auto flex-1 p-4">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
