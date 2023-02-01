import { Player } from './Player';

// type representing just the team's icon (used for team selection)
type TeamIcon = {
    /** the team's id */
    id: string;
    /** link to the team's icon */
    icon: string;
};

type Team = {
    /** the team's id */
    id: string;
    /** the three letter code representing the team */
    abbr: string;
    /** the team's name */
    name: string;
    /** a shortened version of the team's name (or nickname) */
    short: string;
    /** the city the team is based in */
    city: string;
    /** link to an image fo the team's icon */
    icon: string;
    /** list of players on the team */
    players: Player[];
};

export { TeamIcon, Team };
