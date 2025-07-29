import { SignedIn, SignedOut } from "@clerk/nextjs";
import EditProfileForm from "../../../components/EditProfileForm";
import SignInPage from "@/components/SignInPage";


export default function EditProfile() {
    return (
        <>
            <SignedIn>
                <div className="h-screen w-screen bg-zinc-300 flex items-center justify-center">
                    <EditProfileForm />
                </div>
            </SignedIn>
            <SignedOut><SignInPage /></SignedOut>
        </>
    );
}