import CreatePostForm from "@/components/CreatePostForm";
import SignInPage from "@/components/SignInPage";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function CreatePost() {
  return (
    <>
      <SignedIn>
        <CreatePostForm />;
      </SignedIn>
      <SignedOut>
        <SignInPage />
      </SignedOut>
    </>
  );
}
