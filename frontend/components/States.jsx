import Link from 'next/link';
import React from 'react';

export const NoPostsState = ({ heading = "No posts yet.", message = "", action = false }) => {
    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <div className="w-full flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-md max-w-md mx-auto">
                {/* Empty-state icon (Heroicons-inspired) */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 text-gray-900 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7h8M8 11h8M8 15h5m-7 4h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                </svg>

                <h2 className="text-2xl font-bold text-gray-900">{heading}</h2>
                <p className="mt-2 text-center text-gray-900">
                    {message}
                    {/* Looks like you haven’t created any posts. Start sharing your thoughts! */}
                </p>

                {
                    action && (
                        <Link
                            className="mt-6 px-5 py-2 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-700 transition"
                            href="/create"
                        >
                            Create Your First Post
                        </Link>
                    )
                }
            </div>
        </div>
    );
}
