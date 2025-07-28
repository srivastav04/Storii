"use client";

import { useUserStore } from "@/app/store";
import { Button, Form, Input, Spinner } from "@heroui/react";
import { Textarea } from "@heroui/input";
import { Avatar } from "@heroui/avatar";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { editProfile, uploadToImageKit } from "@/app/apiFunctions";
import { SetProfileFomLoadingState } from "./LoadingStates";
import { FaEdit } from "react-icons/fa";
export default function SetProfileForm() {
    console.log("hello");

    const setUser = useUserStore((state) => state.setUser);
    const { userName: currentUserName, bio: currentBio, avatar: currentAvatar, currentUserId } = useUserStore();
    const [userInfo, setUserInfo] = useState({
        userName: "",
        bio: "",
        avatar: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    // update local state when Zustand store updates
    useEffect(() => {
        if (currentUserName || currentBio || currentAvatar) {
            setUserInfo({ userName: currentUserName, bio: currentBio, avatar: currentAvatar });
        }
    }, [currentUserName, currentBio, currentAvatar]);
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const { isPending, mutate } = useMutation({
        mutationFn: editProfile,
        onSuccess: (data) => {
            console.log(data);
            setUser({
                userName: data.userName,
                bio: data.bio,
                avatar: data.avatar,
                currentUserId: data.userId,
            });
            setIsLoading(false);
            router.push("/userprofile");
        },
        onError: (error) => {
            switch ((error).status) {
                case 400:
                    setErrors((error).message.errors);
                    break;
                case 403:
                    console.log("in 403");
                    alert(error.message);
                    return
                default:
                    alert(error.message);
                    return
            }
        },
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleInputChange = (
        e
    ) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ Image input change
    const onImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleChangePictureClick = () => {
        fileInputRef.current?.click();
    };

    const onSubmit = async (e) => {

        if (!userInfo.userName) {
            alert("Enter Username.");
            return;
        }
        if (!userInfo.bio) {
            alert("Enter Bio.");
            return;
        }
        e.preventDefault();
        setIsLoading(true);
        let url = currentAvatar

        if (imageFile) {
            url = await uploadToImageKit(imageFile);
            setIsLoading(false);
        }

        const data = {
            userId: currentUserId,
            userName: userInfo.userName,
            bio: userInfo.bio,
            avatar: url,
        }
        mutate(data);

    };



    return (
        <div className="w-full max-w-3xl mx-auto mt-8 px-4">
            <Form
                className="w-full max-w-3xl space-y-4 bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md"
                validationErrors={errors}
                onSubmit={onSubmit}
            >
                {/* Avatar + Change Button */}
                <div className="flex flex-col items-center gap-2 w-full justify-center">
                    <div className="relative flex-shrink-0">
                        <Avatar
                            className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover "
                            src={imagePreview ?? userInfo.avatar}
                            alt="Profile Avatar"
                        />
                        <div className="absolute bottom-0 right-4 bg-gray-500 text-white rounded-full p-2 cursor-pointer hover:bg-indigo-700 transition-colors">
                            <FaEdit
                                className="w-4 h-4 lg:w-6 lg:h-6"
                                onClick={handleChangePictureClick}
                                isDisabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Hidden File Input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        name="profileImage"
                        className="hidden"
                        onChange={onImageChange}
                        disabled={isLoading}
                    />
                </div>

                {/* Username */}
                <Input
                    value={userInfo.userName}
                    onChange={handleInputChange}
                    isDisabled={isLoading}
                    label="Username"
                    labelPlacement="inside"
                    name="userName"
                    placeholder="Enter your username"
                />

                {/* Bio */}
                <Textarea
                    maxLength={200}
                    value={userInfo.bio}
                    onChange={handleInputChange}
                    isDisabled={isLoading}
                    label="Bio"
                    labelPlacement="inside"
                    name="bio"
                    placeholder="Enter your description"
                />

                {/* Submit */}
                <Button
                    isLoading={isLoading}
                    type="submit"
                    className="border border-gray-900 bg-zinc-300 font-bold text-gray-900 hover:bg-gray-950 hover:text-zinc-300"
                >
                    Submit
                </Button>
            </Form>
        </div>
    );
}
