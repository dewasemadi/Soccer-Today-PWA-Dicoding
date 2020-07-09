document.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var playerID = Number(urlParams.get("id"));
    var isFromSaved = urlParams.get("saved");

    var btnFav = document.getElementById("fabFavorite");

    if (isFromSaved) {
        btnFav.style.display = "none";
        getFavoriteById(playerID, "player");
    } else {
        var item = getPlayerDetail(playerID);
    }

    btnFav.onclick = function () {
        item.then(function (player) {
            addToFavorite(player, "favorite_player");
        });
    }
});