import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground p-4">
      <nav className="container mx-auto flex justify-between">
        <Link className="text-2xl font-bold" href={"/"}>
          My Movies
        </Link>
      </nav>
    </header>
  );
}
