import { Game } from "@/lib/types";
import TrackCard from "./TrackCard";
import Text from "./Text";

interface WaitingForGameProps {
    game: Game;
}

export default function WaitingForGame({ game }: WaitingForGameProps) {


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        }}>
            <Text>Waiting for an opponent...</Text>
        </div>
    )
}