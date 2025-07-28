import { SignedIn, SignedOut } from "@clerk/nextjs";
import UserProfile from "@/components/UserProfile";

export default function Page() {
  return (
    <>
      <SignedIn>
        <UserProfile />
      </SignedIn>
      <SignedOut>
        <h1>Not signed in</h1>
      </SignedOut>
    </>
  )
}