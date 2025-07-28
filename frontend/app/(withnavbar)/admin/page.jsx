import Admin from "@/components/Admin";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignInPage from "@/components/SignInPage";

export default function AdminPage() {
    return (
        <>
            <SignedIn><Admin /></SignedIn>
            <SignedOut><SignInPage /></SignedOut>
        </>

    )
}
