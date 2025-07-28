"use client";
import React, { useEffect, useState } from "react";
import { useUserStore } from "@/app/store";
import {
    Card,
    CardHeader,
    CardBody,
    Avatar,
    Textarea,
    AvatarGroup,
    CardFooter,
    Button,
} from "@heroui/react";
import { FaComment, FaHeart } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { createPost, uploadToImageKit } from "@/app/apiFunctions";
import { useRouter } from "next/navigation";
import { PostFormLoadingState } from "./LoadingStates";

export default function Create() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [userInfo, setUserInfo] = useState({
        userId: "",
        userName: "",
        avatar: "",
        bio: "",
        email: "",
        mediaType: "image",
    });
    const { userName, avatar, bio } = useUserStore();
    const [media, setMedia] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { isLoaded, user } = useUser();
    const { mutate, isPending } = useMutation({
        mutationFn: createPost,
        onSuccess: (data) => {
            console.log(data);

            queryClient.invalidateQueries(["posts"]);
            setIsLoading(false);
            setTimeout(() => {
                router.push("/home");
            }, 1500);
        },
        onError: (error) => {
            setIsLoading(false);
            alert(error)
            console.error(error);
        },
    });

    useEffect(() => {
        if (isLoaded && user)
            setUserInfo((prev) => ({
                ...prev,
                userId: user.id,
                email: user.emailAddresses[0]?.emailAddress,
                avatar: user.imageUrl,
            }));
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    if (!isLoaded || !user) return <PostFormLoadingState />;

    const handleMediaChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const isVideo = file.type.startsWith("video/");
        setUserInfo((prev) => ({
            ...prev,
            mediaType: isVideo ? "video" : "image",
        }));
        const previewURL = URL.createObjectURL(file);

        if (isVideo) {
            const video = document.createElement("video");
            video.preload = "metadata";

            video.onloadedmetadata = () => {
                if (video.duration > 60) {
                    alert("Video must be less than or equal to 60 seconds.");
                    e.target.value = ""; // reset input
                    URL.revokeObjectURL(previewURL); // manually revoke invalid one
                } else {
                    setMedia(file);
                    setPreviewUrl(previewURL); // will be revoked later by useEffect
                }
            };

            video.src = previewURL;
        } else {
            setMedia(file);
            setPreviewUrl(previewURL);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        let url = "";
        if (!media) {
            alert("Upload an image or video.");
            setIsLoading(false)
            return;
        }

        if (!userInfo.bio.trim()) {
            alert("Enter Bio.");
            setIsLoading(false)
            return;
        }
        const formData = new FormData();
        if (media) {
            try {
                url = await uploadToImageKit(media);
                formData.append("mediaUrl", url);
                console.log(url);
            } catch (error) {
                console.log(error);
                alert(error);
                setIsLoading(false);
                return;
            }
        }
        const data = {
            userId: userInfo.userId,
            bio: userInfo.bio,
            mediaUrl: url,
            mediaType: userInfo.mediaType,
        };
        console.log(url);

        mutate(data);
    };

    return (
        <div className="h-auto w-screen bg-zinc-300 flex items-center justify-center">
            <Card className="my-2 sm:m-4 rounded-none w-[500px] sm:rounded-xl">
                <CardHeader>
                    <Avatar src={avatar} />
                    <span className="ml-2 text-sm sm:text-base text-gray-800 font-bold">
                        {userName}
                    </span>
                </CardHeader>

                <CardBody className="overflow-visible p-0">
                    <div className="px-3">
                        <label
                            htmlFor="media-upload"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Upload Image/Video
                        </label>
                        <div className={previewUrl ? "relative" : "relative h-[350px]"}>
                            <input
                                required
                                disabled={isLoading}
                                id="media-upload"
                                type="file"
                                accept="image/*,video/*"
                                onChange={handleMediaChange}
                                className="block w-full text-sm text-gray-700
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm file:font-semibold
        file:bg-gray-900 file:text-white
        hover:file:bg-gray-800
        cursor-pointer
      "
                            />
                        </div>
                    </div>
                    {/* Media Preview */}
                    {previewUrl && (
                        <div className="w-full">
                            {media?.type.startsWith("video") ? (
                                <video
                                    src={previewUrl}
                                    controls
                                    className="w-full h-[350px] object-cover"
                                />
                            ) : (
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-[350px] object-cover"
                                />
                            )}
                        </div>
                    )}

                    {/* Like & Comment Icons */}
                    <div className="p-3 flex justify-between items-center">
                        <div className="flex items-center">
                            <button className="mr-2">
                                <FaHeart className="text-2xl hover:text-red-500 transition" />
                            </button>
                            <FaComment className="text-2xl hover:text-gray-500 transition" />
                        </div>
                        <AvatarGroup isBordered max={3} size="sm">
                            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                            <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                        </AvatarGroup>
                    </div>

                    {/* Textarea & File Upload */}
                    <div className="py-4 px-2 space-y-4">
                        <Textarea
                            isDisabled={isLoading}
                            isRequired={true}
                            value={userInfo.bio}
                            onChange={(e) =>
                                setUserInfo({ ...userInfo, bio: e.target.value })
                            }
                            maxLength={400}
                            placeholder="What's on your mind?"
                        />
                    </div>
                </CardBody>

                {/* Submit Button */}
                <CardFooter className="p-3 flex justify-end">
                    <Button
                        isLoading={isLoading}
                        className="bg-gray-900 text-zinc-300 font-bold hover:bg-zinc-300 hover:text-gray-900"
                        onPress={handleSubmit}
                    >
                        Post
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
