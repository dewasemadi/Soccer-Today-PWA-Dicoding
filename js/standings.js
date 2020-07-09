function getResultStandingsJSON(data) {
    var tableStandingsHtml = "";

    data.standings.forEach(function (standing) {
        var tableDataStanding = "";

        standing.table.forEach(function (team) {
            team = JSON.parse(JSON.stringify(team).replace(/^http:\/\//i, 'https://'));

            tableDataStanding += `
                <tr>
                    <td class="center-align">${team.position}</td>
                    <td class="center-align">
                        <a href="./teamDetails.html?id=${team.team.id}">${team.team.name}</a>
                    </td>
                    <td class="center-align">${team.playedGames}</td>
                    <td class="center-align">${team.won}</td>
                    <td class="center-align">${team.draw}</td>
                    <td class="center-align">${team.lost}</td>
                    <td class="center-align">${team.goalDifference}</td>
                    <td class="center-align">${team.goalsFor}</td>
                    <td class="center-align">${team.goalsAgainst}</td>
                    <td class="center-align">${team.points}</td>
                </tr>
            `;
        })

        tableStandingsHtml += `
            <div class="card">
                <div class = "card-content">
                    <table class="responsive-table striped centered">
                        <thead>
                            <tr>
                                <th class="center-align">#</th>
                                <th class="center-align">Team</th>
                                <th class="center-align">Play</th>
                                <th class="center-align">Won</th>
                                <th class="center-align">Draw</th>
                                <th class="center-align">Lost</th>
                                <th class="center-align">GD</th>
                                <th class="center-align">GF</th>
                                <th class="center-align">GA</th>
                                <th class="center-align">Pts</th>
                            </tr>
                        </thead>

                        <tbody>
                            ` + tableDataStanding + `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    });

    document.getElementById("standings").innerHTML = tableStandingsHtml;
}

class lastUpdate extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({
            mode: "open"
        });
    }

    set date(date) {
        this._date = date;
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
        <h6 class="header"> Last Updated: "${convertDate(new Date(data.competition.lastUpdated))}</h6>
        `;
    }
}

customElements.define("last-update", lastUpdate);