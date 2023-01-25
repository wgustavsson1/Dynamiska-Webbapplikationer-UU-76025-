import {getSoccerData} from './soccer.js';

class Match {
    constructor(game_number,team_a,team_b,outcome) {
        this.game_number = game_number;
        this.team_a = team_a;
        this.team_b = team_b;
        this.outcome = outcome;
    }
}

function load_matches()
{
   getSoccerData("https://stryk.herokuapp.com/strycket2022").then(display_data);
}

function display_data(data)
{
    for(const key in data.playedGames)
    {
        const m = data.playedGames[key];
        var teams = m.teams;
        var team_a = [teams[1].name,teams[1].homepage];
        var team_b = [teams[2].name,teams[2].homepage];
        const match = new Match(m.gameNumber,team_a,team_b,m.outcome);
        render_match_data(match);
    }
}

function render_match_data(match)
{
    var table = document.getElementById("table")
    var new_row = document.createElement("tr");

    var td_number = document.createElement("td");
    td_number.innerHTML = match.game_number;
    new_row.appendChild(td_number);

    var td_teams = document.createElement("td");
    td_teams.innerHTML = match.team_a[0] + "-" + match.team_b[0];
    new_row.appendChild(td_teams);

    table.appendChild(new_row)

    if(match.outcome == 'X')
    {
        var td_empty = document.createElement("td");
        new_row.appendChild(td_empty);
    }
    else if(match.outcome == '2')
    {
        var td_empty_first = document.createElement("td");
        var td_empty_second = document.createElement("td");
        new_row.appendChild(td_empty_first);
        new_row.appendChild(td_empty_second);
    }
    var td = document.createElement("td");
    var span = document.createElement("span");
    span.className = "checkmark";

    var div_stem = document.createElement("div");
    div_stem.className = "stem";

    var div_kick = document.createElement("div");
    div_kick.className = "kick";
    span.appendChild(div_stem);
    span.appendChild(div_kick);
    td.appendChild(span);

    new_row.appendChild(td);
}

load_matches();
