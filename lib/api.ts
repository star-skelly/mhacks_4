// This is where I will define the routes

import axios from 'axios'
import { Attribute, Profile, Res } from './types'
import constants from './constants';

async function handleRequest(route: string, type: string, data?: any): Promise<Res> {
    const response: Res = constants.EMPTY_RES;

    try {

        const formData = new FormData()

        if (data) {
            for (const key in data) {
                formData.append(key, data[key])
            }
        }

        const headers: any = {}
        if (data) {
            headers['Content-Type'] = 'multipart/form-data'
        }

        let serverResponse = null;
        if (type === 'POST') {
            serverResponse = await axios.post(`${constants.SERVER_URL}/${route}`, formData, {
                responseType: 'json',
                headers,
            });
        }

        if (!serverResponse) {
            throw new Error('No response from the server');
        }
        if (serverResponse.status !== 200) {
            throw new Error(serverResponse.data.errorMessage);
        }

        response.data = serverResponse.data;

        response.status = 200;
        response.success = true;
        response.errorMessage = '';
    } catch (error: any) {
        response.status = error.response.status;
        response.success = false;
        response.errorMessage = error?.response?.data?.errorMessage || error?.message || 'An error occured during the API request';

        console.error(error);
    }

    return response;
}

export default {
    profile: {
        authenticate: async (username: string): Promise<Res> => await handleRequest('api/profile/authenticate', 'POST', { username }),
        read: async (profile_id: string): Promise<Res> => await handleRequest('api/profile/read', 'POST', { profile_id }),
        factoryReset: async (): Promise<Res> => await handleRequest('api/profile/factoryReset', 'POST', {}),
        leaveGame: async (profile_id: string): Promise<Res> => await handleRequest('api/profile/leaveGame', 'POST', { profile_id }),
        joinGame: async (profile_id: string, name: string): Promise<Res> => await handleRequest('api/profile/joinGame', 'POST', { profile_id, name }),
    },
    game: {
        create: async (name: string, profile: string): Promise<Res> => await handleRequest('api/game/create', 'POST', { name, profile }),
        read: async (game_id: string): Promise<Res> => await handleRequest('api/game/read', 'POST', { game_id }),
        remove: async (game_id: string): Promise<Res> => await handleRequest('api/game/remove', 'POST', { game_id }),
        move: async (game_id: string, profile_id: string, moveName: Attribute, moveValue: number): Promise<Res> => await handleRequest('api/game/move', 'POST', { game_id, profile_id, moveName, moveValue }),
    },
    spotify: {
        getTrack: async (index: number): Promise<Res> => await handleRequest('api/spotify/getTrack', 'POST', { index }),
        getProgress: async (game_id: string, profile_id: string): Promise<Res> => await handleRequest('api/spotify/getProgress', 'POST', { game_id, profile_id }),
    }
}