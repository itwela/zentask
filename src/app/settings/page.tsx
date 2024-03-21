
import prisma from "@/libs/db";
import { currentUser } from "@clerk/nextjs";
import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";
import { ZenMenuS } from "../dashComponents/menu_S";
// Server Component


export default async function Settings() {

  return (
    <>
          <div className="flex text-black w-screen h-screen justify-between">
                <ZenMenuS/>
              <div>
                  Settings
              </div>
          </div>
    </>
  );
};

