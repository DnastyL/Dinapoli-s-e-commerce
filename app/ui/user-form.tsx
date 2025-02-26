"use client";

import {
  ArrowRightIcon,
  UserIcon,
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { UserState } from "../lib/actions";

type TypeUserForm = {
  handleOnSubmit: (
    prevState: UserState,
    formData: FormData
  ) => Promise<UserState>;
};

export const UserForm = ({ handleOnSubmit }: TypeUserForm) => {
  const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const callBackUrl = searchParams.get("callbackUrl") || "/";

  const initialState: UserState = {
    message: null,
    errors: {},
  };

  const [state, formAction, loading] = useFormState(
    handleOnSubmit,
    initialState
  );

  console.log(state);

  return (
    <form className="space-y-3" action={formAction}>
      <div className="flex-1 rounded-lg bg-black-50 px-6">
        <div className="w-full">
          {pathname === "/register" && (
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-black-medium"
                htmlFor="Username"
              >
                Username
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-black-medium placeholder:text-black-medium"
                  id="Username"
                  type="text"
                  name="Username"
                  placeholder="Insert your name"
                  required
                  minLength={2}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px]  -translate-y-1/2 text-black-medium peer-focus:text-black-medium" />
              </div>
            </div>
          )}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-black-medium"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-black-medium placeholder:text-black-medium"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px]  -translate-y-1/2 text-black-medium peer-focus:text-black-medium" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-black-medium"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-black-200 py-[9px] pl-10 text-sm outline-2 text-black-medium placeholder:text-black-medium"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                minLength={6}
                required
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-black-medium peer-focus:text-black-medium" />
            </div>
          </div>
        </div>
        {/* <input type="hidden" name="redirectTo" value={callBackUrl} /> */}
        <Button
          type="submit"
          className="mt-4 text-black-medium flex items-center"
          aria-disabled={loading}
        >
          {pathname === "/login" ? "Log in " : "Submit"}
          <ArrowRightIcon className="ml-auto h-5 w-5 text-black-medium" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.message && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{state.message}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
};
