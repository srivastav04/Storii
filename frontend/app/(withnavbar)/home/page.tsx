import PostGrid from "@/components/PostGrid";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <SignedIn>
        <div className="h-auto w-full bg-zinc-300">
          <PostGrid />
        </div>
      </SignedIn>
      <SignedOut>
        <h1>Not signed in</h1>
      </SignedOut>
    </>
  );
}
