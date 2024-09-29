import constants from "@/lib/constants";
import { useAppSelector } from "@/redux/hooks"
import { useEffect } from "react";

export default function LoggedOutNav() {
    const handleLogin = () => {
        const client_id = constants.SPOTIFY_CONFIG.clientId;
        const redirect_uri = constants.SPOTIFY_CONFIG.redirectUri;
        const scopes = constants.SPOTIFY_CONFIG.scope;
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scopes}`;
    };

    return (
        <button onClick={handleLogin}>Log in with Spotify</button>
    )
}