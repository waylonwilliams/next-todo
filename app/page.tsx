import Link from "next/link";
import AuthButton from "../components/AuthButton";
import { createClient } from "../utils/supabase/server";

export default async function Index() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <div className="absolute w-full">
        <AuthButton />
      </div>
      <div className="flex items-center justify-center h-screen">
        <div className="block justify-center items-center text-center">
          <div className="text-black font-bold text-7xl m-6">Home page</div>
          {user ? (
            <Link href={"/todo"} className="btn btn-primary btn-lg">
              Continue to your to-do
            </Link>
          ) : (
            <Link href={"/login"} className="btn btn-primary btn-lg">
              Get started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
