type Stat = {
    _id: string;
    player_names: string[];
    value: number[];
    name: string;
};

type StatPerMode = {
    _id: string;
    player_names: string[];
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

export { Stat, PerMode, StatPerMode, PerModeId, NewStat };
