import { useTrack } from "@/hooks/useTrack";
import { isURL } from "@/lib/helper";
import { Track } from "@/lib/types"
import { useEffect, useState } from "react";
import Text from "./Text";

interface TrackCardProps {
    track_index: number;
    size?: 'small' | 'medium' | 'large';
}

export default function TrackCard({ track_index, size }: TrackCardProps) {
    const {
        name,
        image,
        preview,
    }: Track = useTrack(track_index);

    const [hideMusic, setHideMusic] = useState(true);

    useEffect(() => {
        const showButton = async () => {
            setHideMusic(true);
            await new Promise(r => setTimeout(r, 10));
            setHideMusic(false);
        }

        showButton();
    }, [preview])

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {isURL(image) ? (
                <img
                    style={{
                        borderRadius: '8px',
                    }}
                    src={image}
                    width={size === 'small' ? 64 : size === 'medium' ? 200 : 300}
                />
            ) : (
                <img
                    style={{
                        borderRadius: '8px',
                    }}
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAADKCAMAAAC7SK2iAAAAA1BMVEVHSUiLE5txAAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeDMYOAAEnHI17AAAAAElFTkSuQmCC"
                    width={size === 'small' ? 64 : size === 'medium' ? 200 : 300}
                />
            )}

            <Text style={{
                fontSize: size === 'small' ? 12 : size === 'medium' ? 18 : 24,
                textAlign: 'center',
                padding: '0 10px',
                maxWidth: size === 'small' ? 100 : size === 'medium' ? 200 : 300,
            }}>{name}</Text>


            {!hideMusic && preview && (
                <audio controls style={{
                    width: size === 'small' ? 100 : size === 'medium' ? 200 : 300,
                    marginTop: 10,
                }}>
                    <source src={preview} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>)}
        </div>
    );
};