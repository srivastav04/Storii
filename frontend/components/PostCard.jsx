"use client"
import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import LikeModal from "./LikeModal"
import { FormatDate, ToogleText } from "./ToogleText"
import CommentModal from "./CommentModal"
import { Card, CardBody, Image, Avatar } from "@heroui/react";
import { useMutation } from '@tanstack/react-query';
import { likePost } from '../app/apiFunctions'
import { useUserStore } from '@/app/store';
import { PrivateCardHeader, PublicCardHeader } from "./CardHeaders"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
} from "@heroui/react";
import Link from 'next/link';

export default function PostCard({ mediaUrl, mediaType, bio, user, userId, id, comments, likes, isPrivateView, createdAt, updatedAt }) {
    const userName = user.userName;
    const avatar = user.avatar;
    const { userName: currentUser, avatar: currentAvatar, currentUserId, fullName } = useUserStore();
    const [likedUsers, setLikedUsers] = useState(likes || []);
    const [isLiked, setIsLiked] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isAdmin } = useUserStore();

    // Check if current user has already liked the post
    useEffect(() => {
        const liked = likedUsers?.some((like) => like.userId === currentUserId);
        setIsLiked(liked);
    }, [likedUsers, userId]);
    const { mutate, isLoading } = useMutation({
        mutationFn: () => likePost(id, currentUserId, currentUser, currentAvatar, fullName),
        onSuccess: (res) => {
            if (res.liked) {

                setLikedUsers(prev => [...prev, { userId: currentUserId, username: currentUser, avatar: currentAvatar, fullName }]);
                setIsLiked(true);
            } else {
                setLikedUsers(prev => prev.filter(user => user.userId !== currentUserId));
                setIsLiked(false);
            }
        }
        ,
        onError: (error) => {
            console.error(error);
        },
    });


    return (
        <>
            <Card className="rounded-none md:rounded-xl">
                {(isPrivateView || isAdmin) ? <PrivateCardHeader userName={userName} fullName={fullName} avatar={avatar} userId={userId} postId={id} />
                    : <PublicCardHeader userName={userName} fullName={fullName} avatar={avatar} userId={userId} />}
                <CardBody className="p-0">
                    <div className="w-full cursor-pointer">
                        {mediaType === "video" ? (
                            <video
                                controls
                                className="w-full max-h-[400px] object-cover"
                                src={mediaUrl}
                            />
                        ) : (
                            <img
                                onClick={onOpen}
                                src={mediaUrl}
                                alt="Post media"
                                className="w-full max-h-[400px] object-cover"
                            />
                        )}
                    </div>
                    <div className="p-3 flex justify-between items-center">
                        <div className='flex items-center'>
                            <div className='mr-2 flex items-center'>
                                <button
                                    onClick={mutate}
                                    disabled={isLoading}
                                    className="hover:scale-105 transition"
                                >
                                    <FaHeart
                                        className={`mr-1 text-2xl transition ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
                                    />
                                </button>
                                <p className="font-bold">{likedUsers.length}</p>
                            </div>
                            <CommentModal comments={comments} postId={id} userName={userName} userId={userId} avatar={avatar} />
                        </div>
                        <LikeModal likedUsers={likedUsers} />
                    </div>
                    <div className="py-4 px-3">
                        <ToogleText bio={bio} />
                    </div>
                    <FormatDate data={createdAt} />
                </CardBody>
            </Card>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent className='w-full'>
                    {(onClose) => (
                        <>
                            <ModalHeader />
                            <ModalBody className='p-0 bg-amber-950'>
                                <Image
                                    alt="Card background"
                                    className="object-center rounded-none w-[100%]"
                                    src={mediaUrl}
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
