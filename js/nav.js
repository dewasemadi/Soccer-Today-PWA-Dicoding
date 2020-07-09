document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status !== 200) return;

                document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
                    elm.addEventListener("click", function (event) {
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };

        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    var page = window.location.hash.substr(1);
    loadPage(getPage(page));

    var favoriteType = "";

    function getPage(page) {
        if (page == "" || page == "#") {
            page = "home";
        } else if (page == "matches") {
            page = "matches";
        } else if (page == "favorites" || page == "team-favorite") {
            page = "favorites";
            favoriteType = "team";
        } else if (page == "match-favorite") {
            page = "favorites";
            favoriteType = "match";
        } else if (page == "player-favorite") {
            page = "favorites";
            favoriteType = "player";
        }

        return page;
    }

    function loadPage(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            var content = document.querySelector("#body-content");



            if (this.readyState === 4) {
                switch (page) {
                    case "home":
                        getStandings();
                        break;
                    case "matches":
                        getMatches();
                        break;
                    case "favorites":
                        tabFavorite(favoriteType);
                        break;
                }

                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;

                    // slider effect on
                    const elems = document.querySelectorAll('.slider');

                    M.Slider.init(elems);


                } else if (this.status === 404) {
                    content.innerHTML = "<p>Page not found.</p>";
                } else {
                    content.innerHTML = "<p>Page cannot be accessed</p>";
                }
            }
        };

        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
});