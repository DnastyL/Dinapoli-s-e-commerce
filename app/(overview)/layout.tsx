import { UserGroupIcon, HomeIcon } from "@heroicons/react/24/outline";
import { CartIcon } from "../ui/cart-icon";
import { CategoriesIcon } from "../ui/categories-icon";
import { SearchProduct } from "../ui/dashboard/SearchProduct";
import { ModalRoot } from "../ui/dashboard/modal/ModalRoot";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";

export default async function RootDashboard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <>
      <header className="fixed top-0 z-[999px] min-w-full h-24 bg-[#131921] flex flex-col justify-around">
        <div className="flex justify-evenly sm:items-center sm:h-full">
          <div className="flex flex-row items-center p-2 h-full">
            <Link
              href="/"
              className="flex items-center hover:cursor-pointer"
            >
              <p className="md:text-[26px] text-[16px]">Di Napoli</p>
              <Image
                src="/italy.svg"
                alt="dinapoli-logo"
                width={30}
                height={25}
                className="w-[30px] h-[25px]"
              />
            </Link>
            <div className="sm:block hidden h-[60%]">
              <CategoriesIcon width={30} height={25} />
            </div>
          </div>
          <div className="lgg:w-[850px] lg:w-[650px] w-96 hidden sm:flex">
            <SearchProduct />
          </div>
          {!!session ? (
            <div className="sm:flex sm:items-center gap-4  hidden">
              <h2 className="text-white text-sm w-[75px]">
                Welcome, <br />
                {session.user?.name}
              </h2>
              <CartIcon width={40} height={30} />
            </div>
          ) : (
            <div className="sm:flex sm:items-center hidden">
              <Link href={"/login"} className="flex items-center w-[75px]">
                <p>Log In</p>
                <UserGroupIcon width={40} height={30} />
              </Link>
              <CartIcon width={40} height={30} />
            </div>
          )}
        </div>
        <div className="w-full sm:hidden flex items-center  pl-2 h-full">
          <SearchProduct />
        </div>
      </header>

      <div
        id="dashboard"
        className="h-screen pt-[96px] sm:overflow-auto overflow-hidden"
      >
        {children}
        <ModalRoot session={session} />
        <footer className="sm:hidden flex items-center justify-around bg-[#131921] w-full">
          <Link
            href="/"
            className="flex items-center gap-1 w-[50px] flex-col hover:bg-black/25 hover:cursor-pointer focus-visible:bg-black/25"
          >
            <HomeIcon width={30} height={20} />
            <p>Home</p>
          </Link>
          <CategoriesIcon width={30} height={20} />
          <div className="flex gap-1 items-center flex-col hover:bg-black/25 focus-visible:bg-black/25 hover:cursor-pointer">
            <button aria-label="Log In" type="button">
              <UserGroupIcon width={35} height={20} />
            </button>
            <p>Account</p>
          </div>
          <CartIcon width={35} height={20} />
        </footer>
      </div>
    </>
  );
}
