'use client';

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col place-items-center place-content-center p-24">
        <div className="flex gap-2">
          <Link href="/sign-in">
            <span className="text-2xl p-4 bg-white text-black rounded-lg">Sign-in</span>
          </Link>
          <Link href="/sign-up">
            <span className="text-2xl p-4 bg-lime-200 rounded-lg">Sign-up</span>
          </Link>
        </div>
    </main>
  );
}
