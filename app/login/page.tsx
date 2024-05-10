import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "../../components/SubmitButton";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/todo");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <>
      <Link href="/" className="btn btn-secondary m-2 absolute top-0 left-0">
        Back
      </Link>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-base-200 w-1/4 h-2/5 rounded-xl flex items-center justify-center shadow-xl">
          <form>
            <div>
              <input
                name="email"
                placeholder="Email"
                required
                className="input mb-3 input-lg text-base w-full"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="input input-lg text-base w-full"
              />
            </div>
            <div className="flex justify-between">
              <SubmitButton
                formAction={signIn}
                pendingText="Signing In..."
                className="btn btn-secondary mt-5"
              >
                Sign In
              </SubmitButton>
              <SubmitButton
                formAction={signUp}
                pendingText="Signing Up..."
                className="btn btn-primary mt-5"
              >
                Sign Up
              </SubmitButton>
            </div>
            <div>{searchParams?.message && <p>{searchParams.message}</p>}</div>
          </form>
        </div>
      </div>
    </>
  );
}
