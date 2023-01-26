type Stat = {
    _id: string;
    player_id: string[];
    player_names: string[];
    value: number[];
    name: string;
};

type StatPerMode = {
    _id: string;
    players: { id: number; name: string; headshot: string };
    value: number[];
    perMode: PerMode;
};

type PerModeId = 'tot' | 'pg' | 'p48' | 'all';
type PerMode = 'Per48' | 'PerGame' | 'Totals';

type NewStat = {
    id: string;
    name: string;
    modes: StatPerMode[];
};

type LimitedStat = {
    id: string;
    name: string;
};

export { Stat, PerMode, StatPerMode, PerModeId, NewStat, LimitedStat };
