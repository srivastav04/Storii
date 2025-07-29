import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import { useState } from 'react';
import { Avatar, AvatarGroup, User } from "@heroui/react";
import Link from "next/link";

export default function LikeModal({ likedUsers }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = useState("md");

    const handleOpen = (size) => {
        setSize(size);
        onOpen();
    };
    console.log("likedUsers", likedUsers);

    return (
        <>
            <AvatarGroup isBordered max={3} size='sm' onClick={() => handleOpen(size)}>
                {
                    likedUsers?.map((like) => (
                        <Avatar src={like.avatar} />
                    ))
                }
            </AvatarGroup>
            <Modal isOpen={isOpen} size={size} onClose={onClose} className="bg-zinc-300" placement="center" scrollBehavior="inside">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 ">Likes</ModalHeader>
                            <ModalBody>
                                {
                                    likedUsers?.map((like) => (
                                        <Link href={`/profile/${like.userId}`}>
                                            <User
                                                className='p-2 flex justify-start bg-white'
                                                avatarProps={{
                                                    src: like.avatar,
                                                }}
                                                description={`@${like.fullName}`}
                                                name={like.username}
                                            />
                                        </Link>
                                    ))
                                }


                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}