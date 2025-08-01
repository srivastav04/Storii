"use client";

import Link from "next/link";
import { FaUsers, FaRegNewspaper } from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getAllData } from "@/app/apiFunctions";
import { PostFormLoadingState } from "./LoadingStates";
import { User } from "@heroui/react";
import { useUserStore } from "@/app/store";
import { FiTrash } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import { AdminLoadingState } from "./LoadingStates";

export default function Admin() {

    const { isAdmin } = useUserStore();
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["adminposts"],
        queryFn: getAllData,
    })

    const { mutate, isPending } = useMutation({
        mutationFn: (id) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["posts", "user-posts", "adminposts"]);
            alert("User deleted successfully.");
        },
    });

    if (!data || isLoading || isPending) return <AdminLoadingState />

    return (
        <>
            {isAdmin && (
                <main className="min-h-screen bg-zinc-100 p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full justify-center">
                        {/* Users Card */}

                        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition cursor-pointer">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Total Users</h2>
                                <FaUsers className="text-zinc-600 text-3xl" />
                            </div>
                            <p className="mt-4 text-4xl font-bold text-gray-900">{data.users.length}</p>
                            <p className="text-sm text-zinc-500">Click to manage users</p>
                        </div>

                        {/* Posts Card */}
                        <div className="bg-white rounded-2xl p-6 shadow h-auto">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Total Posts</h2>
                                <FaRegNewspaper className="text-zinc-600 text-3xl" />
                            </div>
                            <p className="mt-4 text-4xl font-bold text-gray-900">{data.posts.length}</p>
                            <p className="text-sm text-zinc-500">Total published posts</p>
                        </div>
                    </div>
                    <div>
                        <div className=" bg-zinc-100 flex pt-6">
                            <div className="w-full max-w-md bg-white rounded-xl shadow p-4">
                                <h2 className="text-xl font-semibold mb-4 text-gray-900">Total Users</h2>

                                {/* Scrollable area */}
                                <div className="max-h-64 overflow-y-auto space-y-2 border border-zinc-200 rounded p-2">
                                    {data.users.map((user, i) => (
                                        <div className="p-2 shadow-md rounded-xl flex justify-between w-full" key={i}>
                                            <Link href={`/profile/${user.userId}`}>
                                                <User
                                                    avatarProps={{
                                                        src: user.avatar,
                                                    }}
                                                    description={`@${user.fullName}`}
                                                    name={user.userName}
                                                />
                                            </Link>
                                            <div className="flex gap-3 text-gray-600">
                                                {/* </button> */}
                                                <button className="hover:text-red-600 transition-colors">
                                                    <FiTrash size={18} onClick={() => mutate(user.userId)} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </>
    );



}




