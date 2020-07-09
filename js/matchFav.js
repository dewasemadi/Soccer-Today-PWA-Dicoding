document.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var matchID = Number(urlParams.get("id"));
    var isFromSaved = urlParams.get("saved");

    var btnFav = document.getElementById("fabFavorite");

    if (isFromSaved) {
        btnFav.style.display = "none";
        getFavoriteById(matchID, "match");
    } else {
        var item = getMatchDetail(matchID);
    }

    btnFav.onclick = function () {
        item.then(function (match) {
            addToFavorite(match, "favorite_match");
        })
    }
});