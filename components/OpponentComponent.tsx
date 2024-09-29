import { Game, Profile, Res } from "@/lib/types";
import TrackCard from "./TrackCard";
import Text from "./Text";
import { useProfile } from "@/hooks/useProfile";
import { ProgressBar } from "react-bootstrap";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function OpponentComponent({ game, profile_id }: { game: Game, profile_id: string }) {
    const number = game.profile1 === profile_id ? 2 : 1;
    const profile: Profile = useProfile(profile_id);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let isMounted = true;

        const code = setInterval(async () => {
            try {
                const response: Res = await api.spotify.getProgress(game._id, profile_id);
                if (isMounted && response.success) {
                    setProgress(response.data.progress);
                }
            } catch (error) {
                console.error("Error fetching progress", error);
            }
        }, 1000);

        return () => {
            isMounted = false;
            clearInterval(code);
        };
    }, [game._id, profile_id]);


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        }}>
            <Text>Opponent: {profile.username}</Text>
            <TrackCard track_index={game[`profile${number}Path`][game[`profile${number}Path`].length - 1]} size="medium" />
            <ProgressBar now={progress} label={`${Math.round((progress / 100) * 100)}%`} style={{
                width: '256px',
                marginTop: '1rem',
            }} />
        </div>
    );
}