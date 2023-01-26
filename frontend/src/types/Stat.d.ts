type StatPerMode = {
    _id: string;
    players: { id: number; name: string; headshot: string; value: number }[];
    perMode: PerMode;
};

type PerModeId = 'tot' | 'pg' | 'p48' | 'all';
type PerMode = 'Per48' | 'PerGame' | 'Totals';

type Stat = {
    id: string;
    name: string;
    per48: StatPerMode;
    perGame: StatPerMode;
    total: StatPerMode;
};

type LimitedStat = {
    id: string;
    name: string;
};

export { PerMode, StatPerMode, PerModeId, Stat, LimitedStat };
