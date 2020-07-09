function cekDatabase(idb) {
    var dbPromised = idb.open("soccer-today-v1", 1, function (upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains(storeNameTeam)) {
            var teamsObjectStore = upgradeDb.createObjectStore(storeNameTeam, {
                keypath: "id"
            });

            teamsObjectStore.createIndex("team_name", "name", {
                unique: false
            });
        }

        if (!upgradeDb.objectStoreNames.contains(storeNameMatch)) {
            var matchObjectStore = upgradeDb.createObjectStore(storeNameMatch, {
                keypath: "id"
            });

            matchObjectStore.createIndex("home_team", "match.homeTeam.name", {
                unique: false
            });

            matchObjectStore.createIndex("away_team", "match.awayTeam.name", {
                unique: false
            });
        }

        if (!upgradeDb.objectStoreNames.contains(storeNamePlayer)) {
            var playerObjectStore = upgradeDb.createObjectStore(storeNamePlayer, {
                keypath: "id"
            });

            playerObjectStore.createIndex("player_name", "name", {
                unique: false
            });
        }
    });

    return dbPromised;
}

// add to favorite
function addToFavorite(data, storeName) {
    var dataPrimaryKey;
    if (storeName == storeNameTeam) {
        dataPrimaryKey = data.id;
    } else if (storeName == storeNameMatch) {
        dataPrimaryKey = data.match.id;
    } else if (storeName == storeNamePlayer) {
        dataPrimaryKey = data.id;
    }



    cekDatabase(idb)
        .then(function (db) {
            var tx = db.transaction(storeName, "readwrite");
            var store = tx.objectStore(storeName);

            store.put(data, dataPrimaryKey);

            return tx.complete;
        })
        .then(function () {
            // cek data already in favorite or not
            if (document.getElementById('fav-icon').innerText === 'favorite') {
                Swal.fire(
                    'Ups..',
                    'Item has been favorited',
                    'error'
                )

            } else {
                Swal.fire(
                    'Good job!',
                    'Successfully added to favorites',
                    'success'
                )
                document.getElementById("fav-icon").innerText = "favorite";
                console.log("successfully added to favorites");
            }
        })
}

// remove function with sweet alert
function removeFromFavorites(ID, storeName) {
    console.log(ID + " " + storeName);
    cekDatabase(idb)
        .then(function (db) {
            // sweet alert
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    // alert
                    Swal.fire(
                        'Deleted!',
                        'Your favorites item has been deleted.',
                        'success',
                    )
                    var tx = db.transaction(storeName, "readwrite");
                    var store = tx.objectStore(storeName);
                    store.delete(ID);
                    location.reload();
                    console.log("favorite data has been deleted");
                    return tx.complete;
                } else {
                    Swal.fire(
                        'Cancelled',
                        'Your favorites item is safe',
                        'error'
                    )
                    console.log("your data is safe");
                }
            }).catch(err => {
                console.log('Error: ', err);
            })
        })
}

function getAllFavorites(storeName) {
    return new Promise(function (resolve, reject) {
        cekDatabase(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);

                return store.getAll();
            })
            .then(function (data) {
                resolve(data);
            });
    });
}

function getById(ID, storeName) {
    return new Promise(function (resolve, reject) {
        cekDatabase(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);

                return store.get(ID);
            })
            .then(function (data) {
                resolve(data);
            });
    });
}