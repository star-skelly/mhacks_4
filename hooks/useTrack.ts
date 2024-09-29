import api from "@/lib/api";
import constants from "@/lib/constants";
import { Track, Res } from "@/lib/types";
import { useEffect, useState } from "react";

export function useTrack(index: number): Track {
    const [track, setTrack] = useState<Track>(constants.EMPTY_TRACK);

    useEffect(() => {
        const fetchTrack = async () => {
            try {
                const res: Res = await api.spotify.getTrack(index);

                
                if (res.success) {
                    setTrack(res.data.track as Track);
                } else {
                    console.error(res.errorMessage);
                }
            } catch (error) {
                console.error("Failed to fetch song:", error);
            }
        };

        // Fetch the song initially
        fetchTrack();

        // Set up interval to refresh song data every 5 seconds
        const interval = setInterval(() => {
            fetchTrack();
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [index]);

    return track;
}