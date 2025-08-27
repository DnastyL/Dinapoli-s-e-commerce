import type { NextAuthConfig } from "next-auth";
import { redirect } from "next/navigation";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log(isLoggedIn);
      console.log(nextUrl.pathname);
      const isOnCartPage = nextUrl.pathname == "/success" || nextUrl.pathname == "/cancel";
      if (isOnCartPage) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return true;
      }
      return true;
    },
  },
  providers: [],
  secret: process.env.NEXT_PUBLIC_SECRET,
} satisfies NextAuthConfig;
