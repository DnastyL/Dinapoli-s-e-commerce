import { UserForm } from "../ui/user-form";

import { Poppins } from "next/font/google";
import { registerUser } from "../lib/actions";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poppins",
});

export default function RegisterUser() {
  return (
    <div className="flex md:h-screen w-full items-center justify-center mx-auto">
      <div className="flex flex-col items-center gap-5 w-[420px] h-[400px] mt-10 md:mb-14 md:mt-0 ">
        <h2
          className={`${poppins.variable} text-black-medium font-semibold text-2xl`}
        >
          Create your account
        </h2>
        <UserForm handleOnSubmit={registerUser} />
      </div>
    </div>
  );
}
