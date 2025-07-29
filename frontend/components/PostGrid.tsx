"use client";
import PostCard from "./PostCard";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/app/apiFunctions";
import { useUserStore } from "@/app/store";
import { HomeSkeleton } from "./LoadingStates";
import { NoPostsState } from "./States";

export default function PostGrid() {
  const {
    userName: currentUserName,
    bio: currentBio,
    avatar: currentAvatar,
    currentUserId,
    isAdmin,
  } = useUserStore();
  console.log(
    "In post Grid",
    currentUserId,
    currentUserName,
    currentAvatar,
    currentBio,
    isAdmin
  );

  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) return <HomeSkeleton />;
  if (data && data.length === 0) return <NoPostsState />;
  return (
    <div className="py-4 sm:px-2  grid gap-1 grid-cols-1 sm:grid-cols-2">
      {data?.map((post: any, idx: number) => {
        return <PostCard key={idx} {...post} isPrivateView={false} />;
      })}
    </div>
  );
}
