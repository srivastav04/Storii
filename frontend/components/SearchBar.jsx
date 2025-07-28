"use client";

import { searchUsers } from "@/app/apiFunctions";
import { Input } from "@heroui/input";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Avatar, Button, Skeleton, User } from "@heroui/react";
import Link from "next/link";

export const SearchIcon = ({ size = 24, ...props }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

export default function SearchBar() {
    const [value, setValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const debounceRef = useRef(null);
    const lastLoggedLength = useRef(0);

    const {
        data,
        refetch,
    } = useQuery({
        queryKey: ["searchUsers", value],
        queryFn: ({ queryKey }) => searchUsers(queryKey[1]),
        enabled: false,
    });

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            const length = value.length;
            if (length >= 2 && length % 2 === 0 && length !== lastLoggedLength.current) {
                lastLoggedLength.current = length;
                setIsLoading(true);
                refetch().finally(() => setIsLoading(false));
            }
        }, 0); // slight delay for debounce UX

        return () => clearTimeout(debounceRef.current);
    }, [value]);

    const handleManualSearch = () => {
        setIsLoading(true);
        refetch().finally(() => setIsLoading(false));
    };

    return (
        <div className="w-auto pt-4 bg-zinc-100 min-h-screen p-4 ">
            <div className="w-full h-14 flex items-center gap-2 bg-zinc-100">
                <Input
                    label="Search User"
                    type="username"
                    variant="bordered"
                    className="w-full rounded-none"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button
                    size="lg"
                    isIconOnly
                    aria-label="Search"
                    color="default"
                    onPress={handleManualSearch}
                    className="h-full"
                >
                    <SearchIcon />
                </Button>
            </div>

            {isLoading && (
                <div className="mt-6 space-y-3 w-full h-screen ">
                    {[1, 2, 31, 1, 1, 11, 1, 1].map((i) => (
                        <div className="max-w-[300px] w-full flex items-center gap-3 p-2">
                            <div>
                                <Skeleton className="flex rounded-full w-12 h-12" />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <Skeleton className="h-3 w-4/5 rounded-lg" />
                                <Skeleton className="h-3 w-3/5 rounded-lg" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {data && data.users.length > 0 && !isLoading && (
                <div className="mt-4 space-y-3 bg-zinc-50 p-4 rounded-xl shadow-sm border border-zinc-200">
                    {data.users.map((user) => (
                        <Link href={`/profile/${user.userId}`} key={user.userId}>
                            <User
                                avatarProps={{
                                    src: user.avatar,
                                    className: "w-12 h-12",
                                }}
                                description={`@${user.fullName}`}
                                name={user.userName}
                            />
                        </Link>
                    ))}
                </div>
            )}

            {data && data.users.length === 0 && !isLoading && (
                <div className="mt-4 text-center text-black">No users found.</div>
            )}
        </div>
    );
}
