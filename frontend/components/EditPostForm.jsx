"use client";
import { useState } from "react";
import { useUserStore } from "@/app/store";
import { updatePost } from "@/app/apiFunctions"
import {
    Card,
    CardHeader,
    CardBody,
    Avatar,
    Textarea,
    AvatarGroup,
    CardFooter,
    Button
} from "@heroui/react";
import { FaComment, FaHeart } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadToImageKit } from "@/app/apiFunctions";
import { useRouter } from "next/navigation";

export default function EditPostForm({ post }) {

    const queryClient = useQueryClient();
    const { userName, avatar } = useUserStore();
    const { id: originalId, userId: originalUserId, mediaUrl: originalMediaUrl, mediaType: originalMediaType, bio: originalBio } = post;
    const [userInfo, setUserInfo] = useState({ id: originalId, userId: originalUserId, userName, avatar, bio: originalBio, mediaType: originalMediaType, mediaUrl: originalMediaUrl });
    const [media, setMedia] = useState(originalMediaUrl);
    const [previewUrl, setPreviewUrl] = useState(originalMediaUrl);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    console.log(media);


    const { mutate, isPending } = useMutation({
        mutationFn: updatePost,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["posts"]);
            setTimeout(() => {
                router.replace("/userprofile");
            }, 1500);
            console.log(data);
        },
        onError: (error) => {
            setIsLoading(false);
            console.error(error);
            alert(error);
            return;
        },
    });

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
                setIsLoading(false)
                return;
            }
        }
        const data = {
            postId: originalId,
            userId: userInfo.userId,
            bio: userInfo.bio,
            mediaUrl: url,
            mediaType: userInfo.mediaType,
        };
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
                        <div className="relative" >
                            <input
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

                    <div className="w-full">
                        {userInfo.mediaType === "video" ? (
                            <video
                                src={previewUrl}
                                controls
                                className="w-full  h-[300px] object-cover"
                            />
                        ) : (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full  h-[300px] object-cover"
                            />
                        )}
                    </div>


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

};