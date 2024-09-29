import { useProfile } from "@/hooks/useProfile";
import { Profile } from "@/lib/types";
import { useRouter } from "next/router";
import Text from "./Text";

interface ProfileProps {
    profile_id: string;
}

export default function ProfileComponent({ profile_id }: ProfileProps) {
    const router = useRouter();
    const profile: Profile = useProfile(profile_id);

    if (profile.activeGame) {
        router.push('/game');
    }

    return (
        <div>
            <Text>Profile</Text>
            <Text>This is the profile component</Text>
            <Text>Username: {profile.username}</Text>
            <Text>Games: {profile.games}</Text>
        </div>
    )
}