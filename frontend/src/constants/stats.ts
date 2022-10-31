const shootingStats = [
    {
        title: 'Shooting',
        data: [
            'Points',
            'Points per Game',
            'Field Goal Percent',
            'Free Throw Percent',
            '2PT FG Percent',
            '3PT FG Percent',
            'Effective FG Percent',
            'True Shooting Pct',
            'Field Goals',
            'Field Goal Attempts',
            'Free Throws',
            'Free Throw Attempts',
            '2PT Field Goals',
            '2PT FG Attempts',
            '3PT Field Goals',
            '3PT FG Attempts',
        ],
    },
];

const reboundStats = [
    {
        title: 'Rebounding',
        data: [
            'Total Rebounds',
            'Rebounds Per Game',
            'Offensive Rebounds',
            'Defensive Rebounds',
            'Total Rebound Percentage',
            'Offensive Rebound Percentage',
            'Defensive Rebound Percentage',
        ],
    },
];

const passingStats = [
    {
        title: 'Passing',
        data: ['Assists', 'Assists Per Game', 'Assist Percentage'],
    },
];

const defenseStats = [
    {
        title: 'Defense',
        data: [
            'Steals',
            'Steals Per Game',
            'Blocks',
            'Blocks Per Game',
            'Steal Percentage',
            'Block Percentage',
        ],
    },
];

const playerValueStats = [
    {
        title: 'Player Value',
        data: [
            'Player Efficiency Rating',
            'Box +/-',
            'Offensive Box +/-',
            'Defensive Box +/-',
            'Win Shares',
            'Offensive Win Shares',
            'Defensive Win Shares',
            'Win Shares Per 48 Minutes',
            'Value Over Replacement',
            'Offensive Rating',
            'Defensive Rating',
            'Usage Percentage',
        ],
    },
];

export const STATS = [
    ...shootingStats,
    ...reboundStats,
    ...passingStats,
    ...defenseStats,
    ...playerValueStats,
];
