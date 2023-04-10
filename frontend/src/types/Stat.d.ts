type StatPerMode = {
    /** id of the stat */
    _id: string;
    /** list of players sorted by highest stat value to lowest stat value */
    players: { id: number; name: string; headshot: string; value: number }[];
    /** which mode this stat is in */
    perMode: PerMode;
};

type PerModeId = 'tot' | 'pg' | 'p48' | 'all';
type PerMode = 'Per48' | 'PerGame' | 'Totals';

// full stat information
type Stat = {
    /** the id of the stat */
    id: string;
    /** the name of the stat */
    name: string;
    /** the leaderboard of the stat per 48 minutes of game time */
    per48?: StatPerMode;
    /** the leaderboard of the stat per game */
    perGame?: StatPerMode;
    /** the leaderbaord of the stat for the whole season */
    total: StatPerMode;
};

// partial stat information (used for updating stats)
type LimitedStat = {
    /** the id of the stat */
    id: string;
    /** the name of the stat */
    name: string;
};

export { PerMode, StatPerMode, PerModeId, Stat, LimitedStat };
