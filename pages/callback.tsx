import constants from "@/lib/constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import querystring from "querystring";
import axios from "axios";
import api from "@/lib/api";
import { Res } from "@/lib/types";
import Text from "@/components/Text";

export default function Callback() {
    const router = useRouter();
    const [code, setCode] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [error, setError] = useState('');

    const exchangeCodeForTokens = async (code: string) => {
        try {
            // Exchange authorization code for access and refresh tokens
            const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: constants.SPOTIFY_CONFIG.redirectUri,
                client_id: constants.SPOTIFY_CONFIG.clientId,
                client_secret: constants.SPOTIFY_CONFIG.clientSecret,
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const { access_token, refresh_token } = tokenResponse.data;

            // Store tokens in state and local storage
            setAccessToken(access_token);
            setRefreshToken(refresh_token);
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);

            // Get your spotify username
            const response = await axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            // Get the username from the User Data
            const username = response.data.id;
            localStorage.setItem('username', username);

            // Authenticate on the back-end
            const res: Res = await api.profile.authenticate(username);

            if (res.success) {
                router.push('/');
            } else {
                console.error(res.errorMessage);
                setError('Failed to authenticate on the back-end');
            }
        } catch (error) {
            console.error('Error exchanging code for tokens:', error);
            setError('Failed to exchange code for tokens. Please try again.');
        }
    }

    useEffect(() => {
        const { code } = router.query;
        if (code) {
            exchangeCodeForTokens(code as string);
        }
    }, [router.query])

    return (
        <div>
            <Text>Callback</Text>
            <Text>This is the callback page</Text>
            {accessToken && <Text>Access token: {accessToken}</Text>}
            {refreshToken && <Text>Refresh token: {refreshToken}</Text>}
            {error && <Text>{error}</Text>}
        </div>
    )
}