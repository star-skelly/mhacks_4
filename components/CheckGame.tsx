import { useProfile } from "@/hooks/useProfile";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/router";

export default function CheckGame() {
    const router = useRouter();
    const profile_id = useAppSelector(state => state.global.profile_id);
    const profile = useProfile(profile_id);

    if (profile.activeGame) {
        router.push('/game');
    }

    return (
        null
    );
}