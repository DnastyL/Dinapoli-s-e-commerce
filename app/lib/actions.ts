"use server";

import { z } from "zod";
import { neon } from "@neondatabase/serverless";
import { v4 as uuidv4 } from "uuid";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";

export type UserState = {
  errors?: {
    userName?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

const sql = neon(`${process.env.DATABASE_URL}`);
const FormSchema = z.object({
  id: z.string(),
  userName: z.string(),
  email: z
    .string({
      required_error: "Please type your email.",
    })
    .email(),
  password: z
    .string({
      required_error: "Please enter your password.",
    })
    .min(6),
});

const RegisterUser = FormSchema.omit({ id: true });

export async function registerUser(
  prevState: UserState,
  formData: FormData
): Promise<UserState> {
  const validatedFields = RegisterUser.safeParse({
    userName: formData.get("Username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success && validatedFields.error) {
    const { email, password, userName } =
      validatedFields.error.flatten().fieldErrors;

    return {
      errors: validatedFields.error?.flatten().fieldErrors,
      message: `${
        email?.toString() || password?.toString() || userName?.toString()
      }. Failed to Register User`,
    };
  }

  const { email, password, userName } = validatedFields.data;
  const userId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
          INSERT INTO users(id, name, email, password)
          VALUES(${userId}, ${userName}, ${email}, ${hashedPassword})
      `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Register user",
    };
  }

  await authenticate({}, formData);
  return {};
}

export async function logout() {
  await signOut({ redirectTo: "/login" });
}
export async function authenticate(
  prevState: UserState,
  formData: FormData
): Promise<UserState> {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "invalid credentials." };
        default:
          return { message: "Something went wrong." };
      }
    }
    throw error;
  }
  return {};
}
