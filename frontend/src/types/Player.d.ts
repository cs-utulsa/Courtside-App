export type Player = {
    /** the player's id */
    id: string;
    /** the player's name */
    name: string;
    /** the player's age in the form <number> years */
    age: string;
    /** the country the player is from */
    country: string;
    draft: string;
    /** how many years of experience the player has */
    experience: string;
    /** link to a headshot of the player */
    headshot: string;
    /** the height of the player */
    height: string;
    /** the player's number i.e., their jersey number */
    number: number;
    /** position the player plays */
    position: string;
    /** the team the player is on */
    team: string;
    /** the weight of the player in pounds */
    weight: string;
    //stats
    pts: int;
    reb: int;
    stl: int;
    tov: int;
    ast: int;
    blk: int;
   // dreb: int;
//blcka who needs block assists
//blcka: int; // just in case
    fg3_pct: float;
   // fg3a: int;
   // fg3m: int;

    fg_pct: float;
 //   fga: int;
 //   fgm: int;

    ft_pct: float;
   // fta: int;
    //ftm: int;

    games_played: int;
    plus_minus: int;
    //pf and pfd and oreb? ask rylee...

    //nhl this is going to be JANK
    pos_name: string;




};

// type representing just the players headshot (used for team selection)
export type playerIcon = {
    /** the players id */
    id: string;
    /** link to the players headshot */
    headshot: string;
    name: string;
};
