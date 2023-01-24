/** 
//player type
//- position
//- player name
//- player image
type player = {
    fname: string;
    lname: string;
 //   playerimage: String;
}
//team type
//- team name
//- team image
//- players list 
type team = {
    name: string;
  //  logo: File;
    players: player[];

}
const giannis: player = {
    fname:"giannis",
    lname: "antetokpumpo"
 //   playerimage: "C:\Users\rjp\Documents\GitHub\Courtside-App\frontend\\src\\assets\\dummy";
}
const middleton: player = {
    fname:"chris",
    lname: "middelton"
 //   playerimage: "C:\Users\rjp\Documents\GitHub\Courtside-App\frontend\\src\\assets\\dummy";
}
const bucks: team = {
    name: "bucks",
    players: [giannis, middleton]
}

const nets: team = {
    name:"nets",
    players: [giannis, middleton]
}

const roster: team[] = [nets, bucks,nets,bucks,nets,bucks,nets];

*/
