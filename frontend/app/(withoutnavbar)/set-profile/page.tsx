import SetProfileForm from "@/components/SetProfileForm";
import SignInPage from "@/components/SignInPage";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function SetProfile() {
  return (
    <>
      <SignedIn>
        <div className="h-screen w-screen bg-zinc-300 flex items-center justify-center">
          <SetProfileForm />
        </div>
      </SignedIn>
      <SignedOut>
        <SignInPage />
      </SignedOut>
    </>
  );
}
