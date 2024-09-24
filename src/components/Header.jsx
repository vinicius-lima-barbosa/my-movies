import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground p-4">
      <nav className="container mx-auto flex justify-between">
        <Link className="text-2xl font-bold" href={"/"}>
          Meus Filmes e Series
        </Link>
      </nav>
    </header>
  );
}
