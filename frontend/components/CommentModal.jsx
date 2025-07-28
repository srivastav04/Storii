"use client";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegComment, FaPaperPlane } from "react-icons/fa";
import { Button } from "@heroui/button";
import { useMutation } from "@tanstack/react-query";
import { addComment } from "@/app/apiFunctions";
import { Avatar, User } from "@heroui/react";
import { useUserStore } from "@/app/store";
import Link from "next/link";

export default function MobileCommentModal({ comments, postId, userName, avatar, userId }) {
    const { userName: currentUser, avatar: currentAvatar, currentUserId } = useUserStore();

    const [isOpen, setIsOpen] = useState(false);
    const [postComments, setPostComments] = useState(comments);
    const [draft, setDraft] = useState("");
    const endRef = useRef(null);
    const inputRef = useRef(null);
    const { mutate, isPending } = useMutation({
        mutationFn: addComment,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        }
    })

    console.log(postComments);

    const handleSend = () => {
        if (!draft.trim()) return;
        setPostComments((prev) => [...prev, { username: currentUser, text: draft, avatar: currentAvatar }]);
        setDraft("");
        setTimeout(() => {
            endRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);

        mutate({ comment: draft, postId, userId: currentUserId, username: currentUser, avatar: currentAvatar });
    };

    return (
        <>
            {/* Trigger Button */}
            <>
                <button onClick={() => setIsOpen(true)} className="p-1">
                    <FaRegComment className="text-2xl text-gray-600 hover:text-blue-500" />
                </button>
                <p className="font-bold">{postComments?.length}</p>
            </>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-transparent bg-opacity-60 flex items-end justify-center md:items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Modal Panel */}
                        <motion.div
                            className="w-full max-w-md h-[90vh] bg-white rounded-t-2xl overflow-hidden flex flex-col"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {/* Header */}
                            <div className="p-4  text-center font-semibold text-lg relative">
                                Comments
                                <button
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
                                    onClick={() => setIsOpen(false)}
                                >
                                    ✕
                                </button>
                            </div>
                            {
                                postComments?.length === 0 && (
                                    <div className="flex-1 flex justify-center items-center bg-zinc-300">
                                        <p className="text-medium text-gray-900 font-bold">No comments yet</p>
                                    </div>
                                )
                            }

                            {/* Comments Body */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm bg-zinc-300">
                                {postComments?.map((c, i) => (
                                    <motion.div
                                        className="bg-white p-2 rounded-md"
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link href={`/profile/${c.userId}`}>
                                            <div>
                                                <div className="flex"><Avatar className="w-6 h-6 text-tiny mr-2" src={c.avatar} /> <p className="font-bold text-medium">{c.username}</p></div>
                                                <p className="mt-2 text-medium">{c.text}</p>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                                <div ref={endRef} />
                            </div>

                            {/* Input Bar */}
                            <div className=" p-3 flex items-center">
                                <input
                                    type="text"
                                    value={draft}
                                    onChange={(e) => setDraft(e.target.value)}
                                    onFocus={() =>
                                        setTimeout(() =>
                                            inputRef.current?.scrollIntoView({
                                                behavior: "smooth",
                                                block: "center",
                                            })
                                            , 200)
                                    }
                                    ref={inputRef}
                                    placeholder="Add a comment..."
                                    className="flex-1 px-3 py-2 border rounded-xl text-sm focus:outline-none w-[100px]"
                                />
                                <Button
                                    isIconOnly
                                    isDisabled={isPending}
                                    onPress={handleSend}
                                    className="ml-2 text-blue-500 text-xl"
                                >
                                    <FaPaperPlane />
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
