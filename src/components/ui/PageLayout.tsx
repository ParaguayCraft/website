import { ReactNode } from "react";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-[88px]">{children}</main>
      <Footer />
    </>
  );
}
