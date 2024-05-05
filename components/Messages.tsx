"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default async function Messages() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const [messages, setMessages] = useState<any[] | null>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("random").select();
      console.log(data);
      setMessages(data);
    };
    fetchData();
  });

  return <></>;
}
