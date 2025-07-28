// app/check-auth/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { checkUser } from "@/app/apiFunctions";
import { useUserStore } from "@/app/store";
export default function CheckAuth() {
  const { userId, isLoaded } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const setUser = useUserStore((state) => state.setUser);
  const setIsAdmin = useUserStore((state) => state.setIsAdmin);

  useEffect(() => {
    const verify = async () => {
      if (!isLoaded || !user) return; // Wait for Clerk to load
      if (!userId) return router.push("/");
      console.log("in check auth");
      console.log(userId);

      try {
        const res = await checkUser(userId);
        console.log("res", res);
        if (res) {
          setUser({
            userName: res.userName,
            fullName: res.fullName,
            avatar: res.avatar,
            currentUserId: res.userId,
            bio: res.bio,
          });
          const role = (user.publicMetadata?.role as string)
            ?.toLowerCase()
            .trim();

          if (role === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }

          console.log(res);
        }
        router.push(res ? "/home" : "/set-profile");
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setChecking(false);
      }
    };

    verify();
  }, [userId, isLoaded, router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Checking authentication...
      </div>
    );
  }

  return null; // nothing will render because you redirect anyway
}
