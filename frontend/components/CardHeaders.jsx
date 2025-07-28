import { deletePost } from "@/app/apiFunctions";
import { Avatar, CardHeader } from "@heroui/react"
import Link from "next/link"
import { FiEdit, FiTrash } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const PublicCardHeader = ({ userName, avatar, userId }) => {
    return (
        <CardHeader>
            <Avatar src={avatar} />
            <Link href={`/profile/${userId}`} className="ml-2 text-sm sm:text-base text-gray-800 font-bold">{userName}</Link>
        </CardHeader>
    )
}

export const PrivateCardHeader = ({ userName, avatar, userId, postId }) => {
    console.log("in Card Header private:", userName, avatar, postId);

    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: () => deletePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
        },
        onError: (error) => {
            console.error(error);
        },
    })

    return (
        <CardHeader className="flex justify-between items-center">
            {/* Left section: Avatar + Username */}
            <div className="flex items-center">
                <Avatar src={avatar} />
                <Link
                    href={`/profile/${userId}`}
                    className="ml-2 text-sm sm:text-base text-gray-800 font-bold"
                >
                    {userName}
                </Link>
            </div>

            {/* Right section: Edit + Delete Icons */}
            <div className="flex gap-3 text-gray-600">
                {/* <button className="hover:text-black transition-colors"> */}
                <Link href={`/editpost/${postId}`}>
                    <FiEdit size={18} />
                </Link>
                {/* </button> */}
                <button className="hover:text-red-600 transition-colors">
                    <FiTrash size={18} onClick={mutate} />
                </button>
            </div>
        </CardHeader>
    );
};
