import CreatePostForm from "@/components/CreatePostForm";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function CreatePost() {
  return (
    <>
      <SignedIn>
        <CreatePostForm />;
      </SignedIn>
      <SignedOut>
        <h1>Not signed in</h1>
      </SignedOut>
    </>
  );
}
