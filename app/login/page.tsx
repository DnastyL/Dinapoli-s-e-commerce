import Link from "next/link";
import { UserForm } from "../ui/user-form";

import { Poppins } from "next/font/google";
import { authenticate } from "../lib/actions";
import { Suspense } from "react";
import { ProductSliderSkeleton } from "../ui/skeletons";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poppins",
});

export default function Login() {
  return (
    <div className="flex md:h-screen w-full items-center justify-center mx-auto">
      <div className="flex flex-col items-center gap-5 w-[420px] h-[400px] mt-10 md:mb-14 md:mt-0 ">
        <h2
          className={`${poppins.variable} text-black-medium font-semibold text-2xl`}
        >
          Please log in to continue
        </h2>
        <Suspense fallback={<ProductSliderSkeleton />}>
          <UserForm handleOnSubmit={authenticate} />
        </Suspense>
        <p className="text-black-medium text-sm">
          {`Don't have an account? `}
          <Link
            href="/register"
            className="text-white font-bold drop-shadow-sm"
          >
            Click Here
          </Link>
        </p>
      </div>
    </div>
  );
}
