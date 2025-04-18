import { Link } from "react-router-dom";
import { SignedOut, UserButton } from "@clerk/clerk-react";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { LayoutDashboardIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { useAuthStore } from "@/stores/useAuthStore";

const Topbar = () => {
    const { isAdmin } = useAuthStore();
    console.log({ isAdmin });
    return (
        <div className="flex items-center justify-between p-4 sticky top-0 bgzinc900/75
            backdrop-blur-md z-10">
            <div className="flex gap-2 items-center">
                Spotify
            </div>
            <div className="flex items-center gap-4">
                {isAdmin && (
					<Link to={"/admin"} className={cn(buttonVariants({ variant: "outline" }))}>
						<LayoutDashboardIcon className='size-4  mr-2' />
						Admin Dashboard
					</Link>
				)}
                <SignedOut>
					<SignInOAuthButtons />
				</SignedOut>

				<UserButton />
            </div>
        </div>
    )
}

export default Topbar;