import { SignedIn, SignedOut } from "@clerk/nextjs";
import ProfilePage from "@/components/ProfilePage";


export default function Page() {
    return (
        <>
            <SignedIn>
                <ProfilePage />
            </SignedIn>
            <SignedOut>
                <h1>Not signed in</h1>
            </SignedOut>
        </>
    )
}