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
    roster: string[];
};

export { LimitedTeam, Team };
