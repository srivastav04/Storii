"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import EditPostForm from "@/components/EditPostForm";
import { fetchPost } from "@/app/apiFunctions";
import { PostFormLoadingState } from "@/components/LoadingStates";
import { SignedIn, SignedOut } from "@clerk/nextjs";


export default function EditPost() {

    const params = useParams();
    const id = params.id;
    const { data, isLoading } = useQuery({
        queryKey: ["editPost", id],
        queryFn: () => fetchPost(id),
        enabled: !!id
    });

    if (isLoading) return <PostFormLoadingState />

    return (
        <>
            <SignedIn>
                <div className="h-screen w-screen bg-zinc-300 flex items-center justify-center">
                    {data && <EditPostForm post={data} />}
                </div>
            </SignedIn>
            <SignedOut><SignInPage /></SignedOut>
        </>
    );
}