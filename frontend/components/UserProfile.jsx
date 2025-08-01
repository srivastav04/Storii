"use client";
import { useState } from "react";
import ProfileCard from "./ProfileCard";
import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "@/app/apiFunctions";
import PostCard from "./PostCard";
import Link from "next/link";
import { useUserStore } from "@/app/store";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { NoPostsState } from "./States";
import { ProfileLoadingState } from "./LoadingStates";


export default function Profile() {
    const { currentUserId } = useUserStore();
    const [activeTab, setActiveTab] = useState("posts"); // default tab

    const { data, isLoading } = useQuery({
        queryKey: ["myposts"],
        queryFn: () => getUserPosts(currentUserId),
        enabled: !!currentUserId,
    });

    if (isLoading || !data) return <ProfileLoadingState />


    return (
        <div className="h-auto w-auto bg-zinc-300 py-8">
            <ProfileCard user={data?.user} posts={data?.posts.length} />
            {
                data?.posts.length === 0 ? <NoPostsState message="Looks like you haven’t created any posts. Start sharing your stories!" action={true} /> : (

                    <>
                        <div className="flex overflow-hidden w-full shadow-md">
                            <button
                                className={`w-1/2 flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base font-semibold transition-all duration-300 
      ${activeTab === "posts"
                                        ? " text-gray-900  bg-zinc-300"
                                        : "bg-zinc-300 text-white hover:bg-zinc-200"}`}
                                onClick={() => setActiveTab("posts")}
                            >
                                <BsGrid3X3GapFill className="text-xl" />

                            </button>
                            <button
                                className={`w-1/2 flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base font-semibold transition-all duration-300 
      ${activeTab === "saved"
                                        ? " text-gray-900  bg-zinc-300"
                                        : "bg-zinc-300 text-white hover:bg-zinc-200"}`}
                                onClick={() => setActiveTab("saved")}
                            >
                                <FaListUl className="text-xl" />

                            </button>
                        </div>
                        {/* Conditional Rendering */}
                        {activeTab === "posts" ? (
                            <div className="mt-8 grid grid-cols-3">
                                {data?.posts.map((post, idx) => (
                                    <Link href={`/post/${post.id}`} key={idx}>
                                        <div className="flex items-center justify-center h-[180px] sm:h-[150px] md:h-[300px] lg:h-[420px] bg-white">
                                            {post.mediaType === "image" ? (
                                                <img
                                                    src={post.mediaUrl}
                                                    alt={`Post ${post.id}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <video
                                                    className="w-full h-full object-cover"
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                    controls
                                                >
                                                    <source src={post.mediaUrl} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="pt-4 sm:px-2  grid gap-1 grid-cols-1 sm:grid-cols-2">
                                {data?.posts.map((post, idx) => {
                                    return <PostCard key={idx} {...post} isPrivateView={true} postId={post.id} />;
                                })}
                            </div>
                        )}
                    </>)}
        </div>
    );
}

