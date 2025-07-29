"use client"
import { FaHeart, FaRegComment } from 'react-icons/fa';
import LikeModal from "./LikeModal"
import { ToogleText } from "./ToogleText"
import CommentModal from "./CommentModal"
import { Card, CardHeader, CardBody, Image, Avatar, } from "@heroui/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
} from "@heroui/react";

export default function PostCard({ mediaType = 'image' }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Card className="">
                <CardHeader className=" ">
                    <Avatar src="" />
                    <span className="ml-2 text-sm sm:text-base text-gray-800 font-bold">User</span>
                </CardHeader>
                <CardBody className="p-0">
                    {/* 🔁 Conditional Media */}
                    <div className="w-full cursor-pointer" onClick={onOpen}>
                        {mediaType === "video" ? (
                            <video
                                controls
                                className="w-full max-h-[400px] object-cover"
                                src='https://heroui.com/images/hero-card-complete.jpeg'
                            />
                        ) : (
                            <img
                                src='https://heroui.com/images/hero-card-complete.jpeg'
                                alt="Post media"
                                className="w-full max-h-[400px] object-cover"
                            />
                        )}
                    </div>
                    <div className="p-3 flex justify-between items-center">
                        <div className='flex justify-between items-center'>
                            <button className='mr-2'>
                                <FaHeart className="text-2xl hover:text-red-500 transition" />
                            </button>
                            <CommentModal />

                        </div>
                        <LikeModal />
                    </div>
                    <div className="py-4 px-3">
                        <ToogleText bio="hellllo" />
                    </div>
                </CardBody>
            </Card>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                            <ModalBody className='p-0'>
                                <Image
                                    alt="Card background"
                                    className="object-cover rounded-none"
                                    src='https://heroui.com/images/hero-card-complete.jpeg'

                                />

                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}


