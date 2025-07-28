"use client"

import { useQuery } from '@tanstack/react-query';
import { getPost } from "../../../../app/apiFunctions";
import { useParams } from 'next/navigation';
import { LoadingCard } from '@/components/LoadingStates';
import PostCard from '@/components/PostCard';
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function Post() {
    const params = useParams();
    const id = params.id;
    console.log(id);



    const { data, isLoading } = useQuery({
        queryKey: ["user-post", id],
        queryFn: () => getPost(id),
        enabled: !!id
    });

    console.log("data", data);

    if (isLoading) return (
        <div className='bg-zinc-300 h-screen w-full flex items-center justify-center'>
            <div className="max-w-xl w-full mx-auto">
                <LoadingCard />
            </div>
        </div>
    )

    return (
        <>
            <SignedIn>
                <div className='bg-zinc-300 h-screen w-full flex items-center justify-center'>
                    <div className="max-w-xl w-full mx-auto">
                        <PostCard {...data} isPrivateView={false} />
                    </div>

                </div>
            </SignedIn>
            <SignedOut>
                <h1>Not signed in</h1>
            </SignedOut>
        </>
    );

}


