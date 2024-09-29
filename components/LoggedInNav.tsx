import { useProfile } from "@/hooks/useProfile";
import api from "@/lib/api";
import { Profile, Res } from "@/lib/types";
import { useAppSelector } from "@/redux/hooks"
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoggedInNav() {
    const router = useRouter();
    const profile_id = useAppSelector(state => state.global.profile_id);
    const profile: Profile = useProfile(profile_id);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('username');
        window.location.href = '/';
    }

    const leaveGame = async () => {
        const res: Res = await api.profile.leaveGame(profile_id);

        if (res.success) {
            router.push('/');
        }
        else {
            console.error(res.errorMessage);
        }
    }

    return (
        <div>
            {profile.activeGame && (
                <button onClick={leaveGame}>Leave Game</button>
            )}
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}