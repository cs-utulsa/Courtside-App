// const shootingStats = [
//     {
//         title: 'Shooting',
//         data: [
//             'Points',
//             'Points per Game',
//             'Field Goal Percent',
//             'Free Throw Percent',
//             '2PT FG Percent',
//             '3PT FG Percent',
//             'Effective FG Percent',
//             'True Shooting Pct',
//             'Field Goals',
//             'Field Goal Attempts',
//             'Free Throws',
//             'Free Throw Attempts',
//             '2PT Field Goals',
//             '2PT FG Attempts',
//             '3PT Field Goals',
//             '3PT FG Attempts',
//         ],
//     },
// ];

const shootingStats = [
    {
        title: 'Shooting',
        data: [
            { id: 'pts', name: 'Points' },
            { id: 'pts_per_g', name: 'Points per Game' },
            { id: 'fg_pct', name: 'Field Goal Percent' },
            { id: 'ft_pct', name: 'Field Throw Percent' },
            { id: 'fg2_pct', name: '2PT FG Percent' },
            { id: 'fg3_pct', name: '3PT FG Percent' },
            { id: 'efg_pct', name: 'Effective FG Percent' },
            { id: 'ts_pct', name: 'True Shooting Pct' },
            { id: 'fg', name: 'Field Goals' },
            { id: 'fga', name: 'Field Goal Attempts' },
            { id: 'fg2', name: '2PT Field Goals' },
            { id: 'fg2a', name: '2PT FG Attempts' },
            { id: 'fg3', name: '3PT Field Goals' },
            { id: 'fg3a', name: '3PT FG Attempts' },
            { id: 'ft', name: 'Field Throws' },
            { id: 'fta', name: 'Field Throw Attempts' },
        ],
    },
];

const reboundStats = [
    {
        title: 'Rebounds',
        data: [
            { id: 'trb', name: 'Total Rebounds' },
            { id: 'trb_per_g', name: 'Rebounds per Game' },
            { id: 'orb', name: 'Offensive Rebounds' },
            { id: 'drb', name: 'Defensive Rebounds' },
            { id: 'drb_pct', name: 'Defensive Rebound Percentage' },
            { id: 'trb_pct', name: 'Total Rebound Percentage' },
        ],
    },
];

// const reboundStats = [
//     {
//         title: 'Rebounding',
//         data: [
//             'Total Rebounds',
//             'Rebounds Per Game',
//             'Offensive Rebounds',
//             'Defensive Rebounds',
//             'Total Rebound Percentage',
//             'Offensive Rebound Percentage',
//             'Defensive Rebound Percentage',
//         ],
//     },
// ];

// const passingStats = [
//     {
//         title: 'Passing',
//         data: ['Assists', 'Assists Per Game', 'Assist Percentage'],
//     },
// ];

const passingStats = [
    {
        title: 'Passing',
        data: [
            { id: 'ast', name: 'Assists' },
            { id: 'ast_per_g', name: 'Assists per Game' },
            { id: 'ast_pct', name: 'Assist Percentage' },
        ],
    },
];

// const defenseStats = [
//     {
//         title: 'Defense',
//         data: [
//             'Steals',
//             'Steals Per Game',
//             'Blocks',
//             'Blocks Per Game',
//             'Steal Percentage',
//             'Block Percentage',
//         ],
//     },
// ];

const defenseStats = [
    {
        title: 'Defense',
        data: [
            { id: 'stl', name: 'Steals' },
            { id: 'stl_per_g', name: 'Steals per Game' },
            { id: 'blk', name: 'Blocks' },
            { id: 'blk_per_g', name: 'Blocks per Game' },
            { id: 'blk_pct', name: 'Block Percentage' },
            { id: 'tov', name: 'Turnovers' },
            { id: 'tov_pct', name: 'Turnover Percentage' },
            { id: 'stl_pct', name: 'Steal Percentage' },
        ],
    },
];

// const playerValueStats = [
//     {
//         title: 'Player Value',
//         data: [
//             'Player Efficiency Rating',
//             'Box +/-',
//             'Offensive Box +/-',
//             'Defensive Box +/-',
//             'Win Shares',
//             'Offensive Win Shares',
//             'Defensive Win Shares',
//             'Win Shares Per 48 Minutes',
//             'Value Over Replacement',
//             'Offensive Rating',
//             'Defensive Rating',
//             'Usage Percentage',
//         ],
//     },
// ];

const playerValueStats = [
    {
        title: 'Player Value',
        data: [
            { id: 'mp', name: 'Minutes Played' },
            { id: 'mp_per_g', name: 'Minutes Played per Game' },
            { id: 'bpm', name: 'Box +/-' },
            { id: 'dbpm', name: 'Defensive Box +/-' },
            { id: 'def_rtg', name: 'Defensive Rating' },
            { id: 'dws', name: 'Defensive Win Shares' },
            { id: 'obpm', name: 'Offensive Box +/-' },
            { id: 'off_rtg', name: 'Offensive Rating' },
            { id: 'ows', name: 'Offensive Win Shares' },
            { id: 'per', name: 'Player Efficiency Rating' },
            { id: 'usg_pct', name: 'Usage Percentage' },
            { id: 'vorp', name: 'Value Over Replacement Player' },
            { id: 'ws', name: 'Win Shares' },
            { id: 'ws_per_48', name: 'Win Shares Per 48 Min' },
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

export const ALL_STATS = [
    ...shootingStats[0].data,
    ...reboundStats[0].data,
    ...passingStats[0].data,
    ...defenseStats[0].data,
    ...playerValueStats[0].data,
];

export const NEW_STATS = [
    { id: 'GP', name: 'Games Played' },
    { id: 'MIN', name: 'Minutes' },
    { id: 'FGM', name: 'Field Goals Made' },
    { id: 'FGA', name: 'Field Goals Attempted' },
    { id: 'FG_PCT', name: 'Field Goal %' },
    { id: 'FG3M', name: '3 Point Shots Made' },
    { id: 'FG3A', name: '3 Point Shots Attempted' },
    { id: 'FG3_PCT', name: '3 Point Shot %' },
    { id: 'FTM', name: 'Free Throws Made' },
    { id: 'FTA', name: 'Free Throws Attempted' },
    { id: 'FT_PCT', name: 'Free Throw %' },
    { id: 'OREB', name: 'Offensive Rebounds' },
    { id: 'DREB', name: 'Defensive Rebounds' },
    { id: 'REB', name: 'Rebounds' },
    { id: 'AST', name: 'Assists' },
    { id: 'STL', name: 'Steals' },
    { id: 'BLK', name: 'Blocks' },
    { id: 'TOV', name: 'Turnovers' },
    { id: 'PTS', name: 'Points' },
    { id: 'EFF', name: 'Efficiency' },
];
