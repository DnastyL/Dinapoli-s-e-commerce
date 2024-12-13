"use client";

import {
  ArrowRightIcon,
  AtSymbolIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";

export const LoginForm = () => {
  return (
    <form className="space-y-3">
      <div className="flex-1 rounded-lg bg-black-50 px-6">
        <div className="w-full">
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
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-black-medium peer-focus:text-black-medium" />
            </div>
          </div>
        </div>
        <Button className="mt-4 text-black-medium flex items-center">
          Log in{" "}
          <ArrowRightIcon className="ml-auto h-5 w-5 text-black-medium" />
        </Button>
        {/* <div
        //   className="flex h-8 items-end space-x-1"
        //   id="password"
        //   aria-live="polite"
        //   aria-atomic="true"
        // >
        //   {errorMessage && (
        //     <>
        //       <ExclamationCircleIcon className='h-5 w-5 text-red-500'/>
        //       <p className="text-sm text-red-500">{errorMessage}</p>
        //     </>
        //   )}
        // </div>  */}
      </div>
    </form>
  );
};
