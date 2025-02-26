import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnCartPage = nextUrl.pathname.startsWith("/checkout");
      if (isOnCartPage) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/", nextUrl));
      } else if (isLoggedIn) {
        return true;
      }
      return true;
    },
  },
  providers: [],
  secret: process.env.NEXT_PUBLIC_SECRET,
} satisfies NextAuthConfig;
