"use client";
import SearchBar from "@/components/SearchBar";
import SignInPage from "@/components/SignInPage";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Test() {
  return (
    <>
      <SignedIn>
        <SearchBar />
      </SignedIn>
      <SignedOut>
        <SignInPage />
      </SignedOut>
    </>
  );
}
