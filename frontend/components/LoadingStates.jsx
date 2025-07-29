"use client"

import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";


export const LoadingCard = () => {
    return (
        <Card className="w-full h-[400px] space-y-5 p-4 rounded-none md:rounded-xl">
            <div className="max-w-[300px] w-full flex items-center gap-3">
                <div>
                    <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
            </div>
            <Skeleton className="rounded-lg ">
                <div className="h-[400px] rounded-lg bg-default-300" />
            </Skeleton>
            <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                </Skeleton>
            </div>
        </Card>
    )
}
export const HomeSkeleton = () => {
    return (
        <div className="h-screen w-auto pt-4 sm:px-2  grid gap-1 grid-cols-1 sm:grid-cols-2">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
        </div>
    )
}

export const SetProfileFomLoadingState = () => {
    return (
        <div className="w-full max-w-3xl mx-auto mt-8 px-4">
            <div className="w-full max-w-3xl space-y-4 bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md"
            >
                <div className="flex flex-col items-center gap-2 w-full justify-center">
                    <div className="relative flex-shrink-0">
                        <Skeleton className="flex w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full" />
                    </div>
                </div>
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-20 w-full rounded-lg" />
                <Skeleton className="h-9 w-1/5 rounded-lg" />
            </div>
        </div>
    )
}

export const ProfileLoadingState = () => {
    return (
        <>
            <div className="mx-auto bg-white shadow-xl overflow-hidden flex flex-col lg:flex-row items-center p-8 transition-transform transform hover:scale-[1.01]">
                <div className="relative flex-shrink-0">
                    <Skeleton className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full" />
                </div>
                <div className="mt-6 lg:mt-0 lg:ml-10 flex-1 w-full">
                    <Skeleton className="h-3 w-2/5 rounded-lg mb-2" />
                    <Skeleton className="h-3 w-1/5 rounded-lg" />

                    <div className="mt-4 flex space-x-8">
                        <div className="flex flex-col">
                            <Skeleton className="h-2 w-1/5 rounded-lg" />
                        </div>
                        <div className="flex flex-col">
                            <Skeleton className="h-2 w-1/5 rounded-lg" />
                            <Skeleton className="h-2 w-1/5 rounded-lg" />
                        </div>
                    </div>

                    <div className="mt-6 text-gray-700 prose">
                        <Skeleton className="h-5 w-1/5 rounded-lg" />
                    </div>
                </div>
            </div>
            <div className="h-screen mt-8 grid grid-cols-3">
                <Skeleton className="w-full h-full" />
                <Skeleton className="w-full h-full" />
                <Skeleton className="w-full h-full" />
                <Skeleton className="w-full h-full" />
                <Skeleton className="w-full h-full" />
                <Skeleton className="w-full h-full" />
            </div>
        </>
    );
}

export const PostFormLoadingState = () => {
    return (
        <div className="h-auto w-screen bg-zinc-300 flex items-center justify-center">
            <Card className="my-2 sm:m-4 rounded-none w-[500px] sm:rounded-xl">
                <CardHeader>
                    <Skeleton className="mr-2 flex rounded-full w-12 h-12" />
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                </CardHeader>
                <CardBody className="overflow-visible px-3">
                    <div className="mb-2">
                        <Skeleton className="h-5 w-3/5 rounded-lg" />
                    </div>
                    <Skeleton className="mb-3 h-[350px] w-full rounded-lg" />
                    <Skeleton className="mb-3 h-10 w-full rounded-lg" />
                    <Skeleton className="mb-3 h-20 w-full rounded-lg" />
                    <div className="w-full flex justify-end">
                        <Skeleton className="mb-3 h-7 w-1/5 rounded-lg" />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export const AdminLoadingState = () => {
    return (
        <main className="min-h-screen bg-zinc-100 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full justify-center">
                {/* Users Card */}

                <Skeleton className="rounded-lg">
                    <div className="h-30 rounded-lg bg-default-900" />
                </Skeleton>

                {/* Posts Card */}
                <Skeleton className="rounded-lg">
                    <div className="h-30 rounded-lg bg-default-300" />
                </Skeleton>
            </div>
            <div>
                <div className=" bg-zinc-100 flex pt-6">
                    <div className="w-full max-w-md bg-white rounded-xl shadow p-4">
                        <Skeleton className="w-4/5 rounded-lg mb-2">
                            <div className="h-5 w-4/5 rounded-lg bg-default-200" />
                        </Skeleton>

                        {/* Scrollable area */}
                        <Skeleton className="rounded-lg">
                            <div className="h-60 rounded-lg bg-default-300" />
                        </Skeleton>
                    </div>
                </div>
            </div>
        </main>

    )
}

