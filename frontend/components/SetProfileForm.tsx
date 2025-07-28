"use client";

import { Button, Form, Input, Spinner } from "@heroui/react";
import { Textarea } from "@heroui/input";
import { Avatar } from "@heroui/avatar";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { setProfile } from "@/app/apiFunctions";
import { FaEdit } from "react-icons/fa";
import { SetProfileFomLoadingState } from "./LoadingStates";
import { useUserStore } from "@/app/store";
export default function SetProfileForm() {
  const setUser = useUserStore((state) => state.setUser);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const { isPending, mutate } = useMutation({
    mutationFn: setProfile,
    onSuccess: (data) => {
      console.log(data);
      setUser({
        userName: data.message.userName,
        fullName: data.message.fullName,
        avatar: data.message.avatar,
        currentUserId: user?.id ?? "",
        bio: data.message.bio,
      });
      router.replace("/home");
    },
    onError: (error) => {
      console.log("Mutation error:", error);
      switch ((error as any).status) {
        case 400:
          setErrors((error as any).message.errors);
          break;
        case 403:
          console.log("in 403");
          alert("Email is already in use.");
          return;
      }
    },
  });

  const [userInfo, setUserInfo] = useState({
    userName: "",
    avatar: "",
    bio: "",
    email: "",
    fullName: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const DEFAULT_AVATAR =
    "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp";

  // ✅ Set initial values from Clerk user
  useEffect(() => {
    if (isLoaded && user) {
      setUserInfo({
        userName: user.fullName || "Undefined",
        avatar: user.imageUrl || DEFAULT_AVATAR,
        bio: "I am too lazy to write a bio right now.",
        email: user.emailAddresses[0]?.emailAddress || "Undefined",
        fullName: user.fullName || "Undefined",
      });
    }
  }, [isLoaded, user]);

  // ✅ Controlled input handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Image input change
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleChangePictureClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInfo.userName) {
      alert("Enter Username.");
      return;
    }
    if (!userInfo.bio) {
      alert("Enter Bio.");
      return;
    }
    const formData = new FormData();
    formData.append("userName", userInfo.userName);
    formData.append("fullName", userInfo.fullName);
    formData.append("email", userInfo.email);
    formData.append("bio", userInfo.bio);
    formData.append("userId", user?.id ?? "");

    if (imageFile) {
      formData.append("avatar", imageFile);
    } else {
      formData.append("avatar", userInfo.avatar);
    }
    mutate(formData);
  };

  if (!isLoaded || !user) return <SetProfileFomLoadingState />;

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
            disabled={isPending}
          />
        </div>

        {/* Username */}
        <Input
          value={userInfo.userName}
          onChange={handleInputChange}
          isDisabled={isPending}
          label="Username"
          labelPlacement="inside"
          name="userName"
          placeholder="Enter your username"
        />

        {/* Bio */}
        <Textarea
          maxLength={100}
          value={userInfo.bio}
          onChange={handleInputChange}
          isDisabled={isPending}
          label="Bio"
          labelPlacement="inside"
          name="bio"
          placeholder="Enter your description"
        />

        {/* Submit */}
        <Button
          isLoading={isPending}
          type="submit"
          className="border border-gray-900 bg-zinc-300 font-bold text-gray-900 hover:bg-gray-950 hover:text-zinc-300"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
