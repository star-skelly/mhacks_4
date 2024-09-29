import api from "@/lib/api";
import constants from "@/lib/constants";
import { Profile, Res } from "@/lib/types";
import { useEffect, useState } from "react";

export function useProfile(profile_id: string): Profile {
    const [profile, setProfile] = useState<Profile>(constants.EMPTY_PROFILE);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!profile_id) {
                return;
            }
            try {
                const res: Res = await api.profile.read(profile_id);
                if (res.success) {
                    setProfile(res.data.profile as Profile);
                } else {
                    console.error(res.errorMessage);
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        };

        // Fetch the profile initially
        fetchProfile();

        // Set up interval to refresh profile data every 5 seconds
        const interval = setInterval(() => {
            fetchProfile();
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [profile_id]);

    return profile;
}