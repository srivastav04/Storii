import { SignedIn, SignedOut } from "@clerk/nextjs";
import EditProfileForm from "../../../components/EditProfileForm";


export default function EditProfile() {
    return (
        <>
            <SignedIn>
                <div className="h-screen w-screen bg-zinc-300 flex items-center justify-center">
                    <EditProfileForm />
                </div>
            </SignedIn>
            <SignedOut>
                <h1>Not signed in</h1>
            </SignedOut>
        </>
    );
}