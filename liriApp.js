var axios = require("axios");

var dotenv = require("dotenv").config();

var Spotify = require("node-spotify-api");

var spotify = new Spotify({
    id: process.env.spotify_id,
    secret: process.env.spotify_secret_key
});

// var moment = require("moment");

// var dotenv = require("dotenv").config();

var inquirer = require("inquirer");

function inquirerConstChoices(message, choices, name) {
    this.type = "list";
    this.message = message;
    this.choices = choices;
    this.name = name;
};

function inquirerConstInput(message, name) {
    this.type = "input";
    this.message = message;
    this.name = name;
};

inquirer.prompt([

    initialSearch = new inquirerConstChoices("What would you like to search?", ["Spotify Music", "Movies", "Live Bands"], "selector")

]).then(function (inquirerResponse) {
    if (inquirerResponse.selector === "Spotify Music") {
        inquirer.prompt([

            musicSearch = new inquirerConstChoices("What type of music would you like to search by?", ["Band/Artist", "Album", "Song"], "selection")

        ]).then(function (response) {
            if (response.selection === "Band/Artist") {
                inquirer.prompt([

                    bandSearch = new inquirerConstInput("What band/artist would you like to search?", "band")

                ]).then(function (response) {

                    spotify.search({ type: "artist", query: response.band, limit: 3 }, function (err, data) {

                        if (err) {
                            return console.log("Error occured: " + err);
                        } else {
                            // console.log(data.artists.items[0].type);

                            for (var i = 0; i < 3; i++) {
                                console.log("\nArtist: " + data.artists.items[i].name + ".");
                                console.log("Following: " + data.artists.items[i].followers.total + ".");
                                console.log("Genre: " + data.artists.items[i].genres + "." );
                                console.log("Popularity: " + data.artists.items[i].popularity + ".\n");
                                console.log("*~~~~~~~~~~~~~~~~~~~~~*");
                            };

                        }

                    });

                })
            } else if (response.selection === "Album") {
                inquirer.prompt([

                    albumSearch = new inquirerConstInput("What album would you like to search?", "album")

                ]).then(function (response) {

                    spotify.search({ type: "album", query: response.album, limit: 3 }, function (err, data) {

                        if (err) {
                            return console.log("Error occured: " + err);
                        } else {

                            for (var i = 0; i < 3; i++) {
                                console.log("\nArtist: " + data.albums.items[i].artists[0].name + ".");
                                console.log("Album: " + data.albums.items[i].name + ".");
                                console.log("Album Type: " + data.albums.items[i].album_type + ".");
                                console.log("Release Date: " + data.albums.items[i].release_date + ".");
                                console.log("Total Tracks: " + data.albums.items[i].total_tracks + "." + "\n");
                                console.log("*~~~~~~~~~~~~~~~~~~~~~*");
                            };

                        }

                    });

                })
            } else if (response.selection === "Song") {
                inquirer.prompt([

                    songSearch = new inquirerConstInput("What song would you like to search?", "song")

                ]).then(function (response) {


                    spotify.search({ type: "track", query: response.song, limit: 5 }, function (err, data) {

                        if (err) {
                            return console.log("Error occured: " + err);
                        } else {
                            for (var i = 0; i < 5; i++) {
                                console.log("\nSong Title: " + data.tracks.items[i].name + ".");
                                console.log("Artist: " + data.tracks.items[i].album.artists[0].name + ".");
                                console.log("Album: " + data.tracks.items[i].album.name + ".");
                                console.log("Album Type: " + data.tracks.items[i].album.album_type + ".");
                                console.log("Release Date: " + data.tracks.items[i].album.release_date + ".");
                                console.log("Popularity: " + data.tracks.items[i].popularity + "." + "\n");
                                console.log("*~~~~~~~~~~~~~~~~~~~~~*");
                            };

                        }

                    });

                });
            }
        });
    } else if (inquirerResponse.selector === "Movies") {
        inquirer.prompt([

            movieSearch = new inquirerConstInput("What movie would you like to search?", "movie")

        ]).then(function (response) {
            var movieName = response.movie;
            // console.log(movieName);

            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=84b1aa11";

            axios.get(queryUrl).then(function (response) {
                console.log("\nTitle: " + response.data.Title + ".");
                console.log("Rated: " + response.data.Rated + ".");
                console.log("Release Date: " + response.data.Released + ".");
                console.log("Runtime: " + response.data.Runtime + ".");
                console.log("Genre: " + response.data.Genre + ".");
                console.log("Director: " + response.data.Director + ".");
                console.log("Cast: " + response.data.Actors + ".");
                console.log("Plot: " + response.data.Plot);
                console.log("IMDB Rating: " + response.data.imdbRating + ".");
                console.log("Awards: " + response.data.Awards);
                console.log("Production: " + response.data.Production + ".\n");
            })
        });
    } else if (inquirerResponse.selector === "Live Bands") {
        inquirer.prompt([

            liveBandSearch = new inquirerConstInput("What bands would you like to search concerts for?", "concert")

        ]).then(function (response) {
            console.log("I wish I could find a concert for " + response.concert + " but I can't figure out this API. insert sad face here.")
        });
    } else {
        console.log("Quitter!");
    }
})