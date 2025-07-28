"use client";
import SearchBar from "@/components/SearchBar";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Test() {
  return (
    <>
      <SignedIn>
        <SearchBar />
      </SignedIn>
      <SignedOut>
        <h1>Not signed in</h1>
      </SignedOut>
    </>
  );
}
