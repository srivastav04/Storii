"use client";

import Link from "next/link";

export default function SignInPage() {
    return (
        <div className="min-h-screen bg-zinc-100 flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Sign in to continue
            </h1>
            <p className="text-zinc-600 mb-6 max-w-md">
                You must be signed in to access this page. Please sign in from the home page.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-800 transition-colors"
            >
                Go to Home
            </Link>
        </div>
    );
}
