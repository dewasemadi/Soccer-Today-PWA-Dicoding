document.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var teamID = Number(urlParams.get("id"));
    var isFromSaved = urlParams.get("saved");

    var btnFav = document.getElementById("fabFavorite");

    if (isFromSaved) {
        btnFav.style.display = "none";
        getFavoriteById(teamID, "team");
    } else {
        var item = getTeamDetail(teamID);
    }

    btnFav.onclick = function () {
        item.then(function (team) {
            addToFavorite(team, "favorite_team");
        });
    };
});