import Link from "next/link";
import BrandLogo from "../../../components/ui/BrandLogo";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function Navbar() {
   return (
      <header className="py-6 shadow-xl fixed top-0 w-full z-10 bg-background/95">
         <nav
            className={`flex justify-between items-center gap-10 px-6 font-semibold`}
         >
            <div>
               <Link href="/" className="mr-auto">
                  <BrandLogo />
               </Link>
            </div>
            <div className="flex gap-10">
               <Link className="text-lg" href="#">
                  Features
               </Link>
               <Link className="text-lg" href="/#pricing">
                  Pricing
               </Link>
               <Link className="text-lg" href="#">
                  About
               </Link>
               <span className="text-lg">
                  <SignedIn>
                     <Link href="/dashboard">Dashboard</Link>
                  </SignedIn>
                  <SignedOut>
                     <SignInButton>Login</SignInButton>
                  </SignedOut>
               </span>
            </div>
         </nav>
      </header>
   );
}
