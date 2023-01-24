import { Player } from './Player';

type TeamIcon = {
    id: string;
    icon: string;
};

type Team = {
    id: string;
    abbr: string;
    name: string;
    short: string;
    city: string;
    icon: string;
    players: Player[];
};

export { TeamIcon, Team };
