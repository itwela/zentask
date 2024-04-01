'use client';

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col place-items-center place-content-center p-24">
        <Link href="/home">
        <span className="text-2xl p-4 bg-green-200 rounded-lg">Launch</span>
        </Link>
    </main>
  );
}
