// Screen for when you are actively in a game
// this is the bulk of the project

import Navbar from "@/components/Navbar";
import TrackCard from "@/components/TrackCard";
import WaitingForGame from "@/components/WaitingForGame";
import { useGame } from "@/hooks/useGame";
import { useProfile } from "@/hooks/useProfile";
import { useTrack } from "@/hooks/useTrack";
import api from "@/lib/api";
import { Attribute, Game, Profile, Res, Track } from "@/lib/types";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import Dropdown from "@/components/Dropdown";
import Backdrop from "@/components/Backdrop";
import Text from "@/components/Text";
import { ChevronLeft, ChevronRight } from "lucide-react";
import OpponentComponent from "@/components/OpponentComponent";

// List of categories: Danceability, Energy, Key, Loudness, Mode, Speechiness, Acousticness, Instrumentalness, Liveness, Valence, Tempo, Time Signature, Popularity
// Danceability, Energy, Loudness, Speechiness, Acousticness, Instrumentalness, Liveness, Valence

// Danceability, Valence (happiness), Loudness, Acousticness


export default function GameScreen() {
    const router = useRouter();
    const profile_id = useAppSelector(state => state.global.profile_id);
    const [loading, setLoading] = useState(true);
    const [attribute, setAttribute] = useState<Attribute>('Danceability');
    const [progress, setProgress] = useState(0);
    // If the user is not logged in then send them to the home page
    useEffect(() => {
        const interval = setInterval(() => {
            if (!profile_id) {
                router.push('/');
            }
            else {
                setLoading(false);
            }
        }, 10);

        return () => {
            clearInterval(interval);
        };
    }, [])
    const { activeGame }: Profile = useProfile(profile_id);
    const game: Game = useGame(activeGame);

    let current_track_index = 0;
    if (profile_id === game.profile1) {
        current_track_index = game.profile1Path[game.profile1Path.length - 1];
    }
    else if (profile_id === game.profile2) {
        current_track_index = game.profile2Path[game.profile2Path.length - 1];
    }

    if (!current_track_index || !game.startTrack || !game.endTrack || loading) {
        return <Text>Loading...</Text>;
    }

    // if (!game.profile1 || !game.profile2) {
    //     return <WaitingForGame game={game} />;
    // }

    const handleIncrease = async () => {
        const response: Res = await api.game.move(game._id, profile_id, attribute, 1);

        const res: Res = await api.spotify.getProgress(game._id, profile_id);
        if (res.success) {
            setProgress(res.data.progress);
        }

        console.log(response.data);
    }

    const handleDecrease = async () => {
        const response: Res = await api.game.move(game._id, profile_id, attribute, 0);

        const res: Res = await api.spotify.getProgress(game._id, profile_id);
        if (res.success) {
            setProgress(res.data.progress);
        }

        console.log(response.data);
    }

    const handleChangeAttribute = (attribute: Attribute): void => {
        setAttribute(attribute);
    }

    return (
        <>
            <Backdrop />
            <Navbar />

            {game.name && <Text>{game.name}</Text>}

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '1200px',
                    minWidth: '1024px',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <TrackCard track_index={game.startTrack} size='medium' />
                        <TrackCard track_index={current_track_index} size='large' />
                        <TrackCard track_index={game.endTrack} size='medium' />
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        maxWidth: '512px',
                        margin: '16px',
                    }}>
                        <button onClick={handleDecrease} style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: '4px 10px',
                            borderBottomLeftRadius: '8px',
                            borderTopLeftRadius: '8px',
                        }}>
                            <ChevronLeft /> Less
                        </button>
                        <Dropdown attribute={attribute} onChangeAttribute={handleChangeAttribute} />
                        <button onClick={handleIncrease} style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: '4px 10px',
                            borderTopRightRadius: '8px',
                            borderBottomRightRadius: '8px',
                        }}>
                            More <ChevronRight />
                        </button>
                    </div>
                    <ProgressBar style={{
                        width: '512px',
                    }} now={progress} label={`${Math.round(progress * 100) / 100}%`} />
                </div>

                {game.profile1 && game.profile2 ? (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '256px',
                        width: '100%',
                    }}>
                        <OpponentComponent game={game} profile_id={game.profile1 === profile_id ? game.profile2 : game.profile1} />
                    </div>
                ) : (
                    <WaitingForGame game={game} />
                )}
            </div>
        </>
    )
}