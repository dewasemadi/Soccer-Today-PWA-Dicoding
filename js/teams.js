function getResultTeamInfoJSON(data) {
    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

    var tableOverviewHtml = "";
    var tableSquadHtml = "";

    tableOverviewHtml += `
        <tr>
            <td style="font-weight: bold;" class="left-align">Name</td>
            <td class="left-align">${data.name}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;" class="left-align">Short Name</td>
            <td class="left-align">${data.shortName}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;" class="left-align">Founded</td>
            <td class="left-align">${data.founded}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;" class="left-align">Three Letter Abbreviation</td>
            <td class="left-align">${data.tla}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;" class="left-align">Address</td>
            <td class="left-align">${data.address}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;" class="left-align">Phone</td>
            <td class="left-align">${data.phone}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;" class="left-align">Website</td>
            <td class="left-align"><a href="${data.website}" target="_blank">${data.website}</a></td>
        </tr>
        <tr>
            <td style="font-weight: bold;" class="left-align">Email</td>
            <td class="left-align"><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr>
            <td style="font-weight: bold;" class="left-align">Club Colors</td>
            <td class="left-align">${data.clubColors}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;" class="left-align">Venue</td>
            <td class="left-align">${data.venue}</td>
        </tr>
    `;

    let number = 1;
    data.squad.forEach(function (squad) {
        tableSquadHtml += `
        <style>
            .no-left{
                text-align: center !important;
            }
        </style>
        <style>
            .margin{
                padding:unset;
            }
        </style>
            <tr>
                <td class="center-align no-left">${number}</td>
                <td class="center-align no-left">${squad.name}</td>
                <td class="center-align no-left">${squad.position}</td>
                <td class="center-align no-left">
                    <a href="./playerDetails.html?id=${squad.id}">
                        <i class="material-icons margin">search</i>
                    </a>
                </td>
            </tr>
        `;
        number++;
    });


    document.getElementById("crestUrl").src = data.crestUrl;
    document.getElementById("preloader").innerHTML = "";
    document.getElementById("nameHeader").innerHTML = data.name;
    document.getElementById("tableOverview").innerHTML = tableOverviewHtml;
    document.getElementById("tableSquad").innerHTML = tableSquadHtml;
}

function getResultPlayerDetailJSON(data) {
    var tablePlayerDetailHtml = "";

    tablePlayerDetailHtml += `
    <style>
    </style>
        <table class="striped">
            <thead></thead>
            <tbody>
                <tr>
                    <td style="font-weight: bold;">Name</td>
                    <td>${data.name}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">First Name</td>
                    <td>${data.firstName}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Last Name</td>
                    <td>${data.lastName}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Country of Birth</td>
                    <td>${data.countryOfBirth}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Date of Birth</td>
                    <td>${data.dateOfBirth}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Nationality</td>
                    <td>${data.nationality}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Position</td>
                    <td>${data.position}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Shirt Number</td>
                    <td>${data.shirtNumber}</td>
                </tr>
                <tr>
                    <div class="center-align favorite-color" style="font-size: 15px; padding: 15px 0px;">Last Updated: ${convertDate(new Date(data.lastUpdated).toLocaleDateString())}</div>
                </tr>
            </tbody>
        </table>

    `;
    document.getElementById("preloader").innerHTML = "";
    document.getElementById("tablePlayerDetail").innerHTML = tablePlayerDetailHtml;
}

function getResultTeamFavoritesJSON(data) {
    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

    var tableTeamFavoriteHtml = "";
    let number = 1;

    tableTeamFavoriteHtml += `
        <table class="striped centered no-shadow">
            <thead>
                <tr>
                    <th>Num</th>
                    <th>Team Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(function (team) {
        tableTeamFavoriteHtml += `
            <tr>
                <td>${number}</td>
                <td><a href="./teamDetails.html?id=${team.id}&saved=true">${team.name}</a></td>
                <td>
                <span onclick = "removeFromFavorites(${team.id}, 'favorite_team')" >
                    <a class = "waves-effect waves-light btn-small red delete no-shadow">
                        <i class="large material-icons  white-text">delete</i>
                    </a>
                <span>
                </td>
            </tr>
        `;

        number++;
    });

    tableTeamFavoriteHtml += `
            </tbody>
        </table>
    `;

    document.getElementById("favorite-item").innerHTML = tableTeamFavoriteHtml;
}

function getResultPlayerFavoritesJSON(data) {
    var tablePlayerFavoriteHtml = "";
    let number = 1;

    tablePlayerFavoriteHtml += `
        <table class="striped centered no-shadow">
            <thead>
                <tr>
                    <th>Num</th>
                    <th>Player Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(function (player) {
        tablePlayerFavoriteHtml += `
            <tr>
                <td>${number}</td>
                <td><a href="./playerDetails.html?id=${player.id}&saved=true">${player.name}</a></td>
                <td>
                 <span span onclick = "removeFromFavorites(${player.id}, 'favorite_player')" >
                    <a class="waves-effect waves-light btn-small red no-shadow">
                        <i class="large material-icons white-text">delete</i>
                    </a>
                </span>
                </td>
            </tr>
        `;

        number++;
    });

    tablePlayerFavoriteHtml += `
            </tbody>
        </table>
    `;

    document.getElementById("favorite-item").innerHTML = tablePlayerFavoriteHtml;
}