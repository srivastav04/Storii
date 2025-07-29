import { SignedIn, SignedOut } from "@clerk/nextjs";
import UserProfile from "@/components/UserProfile";
import SignInPage from "@/components/SignInPage";

export default function Page() {
  return (
    <>
      <SignedIn>
        <UserProfile />
      </SignedIn>
      <SignedOut><SignInPage /></SignedOut>
    </>
  )
}