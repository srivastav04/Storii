"use client";

import { ToogleText } from "./ToogleText";
import { FaEdit } from 'react-icons/fa';
import Link from 'next/link';
import { useUserStore } from "@/app/store";

export default function ProfileCard({ user, posts, userId = "" }) {

  const { currentUserId, isAdmin } = useUserStore();
  return (
    <div className=" mx-auto bg-zinc-300 shadow-xl overflow-hidden flex flex-col lg:flex-row items-center p-8">
      {/* Avatar Section */}
      <div className="relative flex-shrink-0">
        <img
          src={user?.avatar}
          alt="Profile avatar"
          className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover border-2 border-indigo-600"
        />
        {
          (currentUserId === userId || isAdmin) && (
            <Link href={`/editProfile`}>
              <div className="absolute bottom-0 right-4 bg-indigo-600 text-white rounded-full p-2 cursor-pointer hover:bg-indigo-700 transition-colors">

                <FaEdit className="w-4 h-4 lg:w-6 lg:h-6" />
              </div>
            </Link>
          )
        }
      </div>

      {/* User Info Section */}
      <div className="mt-6 lg:mt-0 lg:ml-10 flex-1 w-full">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{user?.userName}</h2>
        <p className="mt-1 text-lg text-gray-600">@{user?.fullName}</p>

        {/* Stats */}
        <div className="mt-4 flex space-x-8">
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-gray-800">{posts}</span>
            <span className="text-sm uppercase text-gray-500">{posts === 1 ? "Post" : "Posts"}</span>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6 text-gray-700 prose">
          <ToogleText bio={user?.bio} />
        </div>
      </div>
    </div>
  );
}

