export const runtime = "nodejs";

import Link from "next/link";
import Image from "next/image";

const navItems = [
  { title: "Home", href: "/" },
  { title: "Latest Jobs", href: "/jobs" },
  { title: "Results", href: "/results" },
  { title: "Admit Card", href: "/admit-cards" },
  { title: "Answer Key", href: "/answer-keys" },
  { title: "Syllabus", href: "/syllabus" },
  { title: "Admission", href: "/admissions" },
];

export default function Header() {
  return (
    <header className="bg-[#ded9c9] shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-4 sm:mb-0">
          <div className="rounded-lg">
            <Image
            className="rounded-2xl"
              src="/sarkariresult.jpg"
              alt="Sarkari Result"
              width={60}
              height={60}
              priority
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-blue-800 tracking-wider">
              Sarkari Result
            </h1>
            <p className="text-sm text-gray-600">
              sarkariresult27.com
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}