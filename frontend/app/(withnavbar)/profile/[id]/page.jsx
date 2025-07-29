import { SignedIn, SignedOut } from "@clerk/nextjs";
import ProfilePage from "@/components/ProfilePage";
import SignInPage from "@/components/SignInPage";


export default function Page() {
    return (
        <>
            <SignedIn>
                <ProfilePage />
            </SignedIn>
            <SignedOut><SignInPage /></SignedOut>
        </>
    )
}