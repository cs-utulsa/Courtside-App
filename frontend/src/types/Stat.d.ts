type Stat = {
    _id: string;
    player_id: string[];
    value: number[];
    name: string;
};

type StatPerMode = {
    _id: string;
    player_id: string[];
    value: number[];
    per_mode: PerMode;
};

type PerModeId = 'tot' | 'pg' | 'p48' | 'all';
type PerMode = 'Per48' | 'PerGame' | 'Totals';

type NewStat = {
    _id: string;
    name: string;
    modes: StatPerMode[];
};

type LimitedStat = {
    id: string;
    name: string;
};

export { Stat, PerMode, StatPerMode, PerModeId, NewStat, LimitedStat };
