type Game = {
    /** the arena the game will take place in */
    arena: string;
    /** the date of the game */
    game_date: string;
    /** the time the game will occur */
    game_time: string;
    /** the 3 letter code for the home team */
    home_code: string;
    /** the name of the home team */
    home_name: string;
    /** the link to the icon of the home team */
    home_link: string;
    /** the three letter code for the away team */
    away_code: string;
    /** the name of the away team */
    away_name: string;
    /** the link to the icon image for the away team */
    away_link: string;
};

type ScorePrediction = Record<
    string,
    { score: number; stdev: number; win_pct: number }
>;

export { Game, ScorePrediction };
