
import prisma from "@/libs/db";
import { currentUser } from "@clerk/nextjs";
import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";
import { ZenMenuS } from "../dashComponents/menu_S";
// Server Component


export default function Landing() {

  return (
    <>
          <div className="flex text-black w-screen h-screen justify-between">
              <div>
                  Landing
              </div>
          </div>
    </>
  );
};

