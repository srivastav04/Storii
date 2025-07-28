import SetProfileForm from "@/components/SetProfileForm";
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
        <h1>Not signed in</h1>
      </SignedOut>
    </>
  );
}
