// Log in with spotify button (if not authenticated)
// Log out button (if authenticated)

import { useProfile } from "@/hooks/useProfile";
import constants from "@/lib/constants";
import { Profile } from "@/lib/types";
import { useAppSelector } from "@/redux/hooks";
import { useContext } from "react";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";

// Generative UI factors:
// Backdrop color
// Button color

export default function Navbar() {
    const profile_id = useAppSelector(state => state.global.profile_id);

    if (profile_id) {
        return (
            <LoggedInNav />
        )
    }
    else {
        return (
            <LoggedOutNav />
        )
    }
}