import { FullPlayer } from './Player';

type LimitedTeam = {
    id: string;
    name: string;
    icon: string;
    code: string;
};

type Team = {
    id: string;
    abbr: string;
    name: string;
    short: string;
    city: string;
    icon?: string;
    players: FullPlayer[];
};

export { LimitedTeam, Team };
