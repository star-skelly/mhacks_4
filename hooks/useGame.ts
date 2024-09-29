import api from "@/lib/api";
import constants from "@/lib/constants";
import { Game, Res } from "@/lib/types";
import { useEffect, useState } from "react";

export function useGame(game_id: string): Game {
    const [game, setGame] = useState<Game>(constants.EMPTY_GAME);

    useEffect(() => {
        const fetchGame = async () => {
            if (!game_id) {
                return;
            }
            try {
                const res: Res = await api.game.read(game_id);

                if (res.success) {
                    setGame(res.data.game as Game);
                } else {
                    console.error(res.errorMessage);
                }
            } catch (error) {
                console.error("Failed to fetch game:", error);
            }
        };

        // Fetch the game initially
        fetchGame();

        // Set up interval to refresh game data every 5 seconds
        const interval = setInterval(() => {
            fetchGame();
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [game_id]);

    return game;
}