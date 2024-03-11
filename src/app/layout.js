import { Inter } from "next/font/google";
import "./global.scss";
import { Header } from "@/components/Header/Header";
import s from "./RootLayout.module.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "test app",
  description: "test app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={s.rootLayout}>
          <Header />
          <div className={s.content}>{children}</div>
      </body>
    </html>
  );
}
