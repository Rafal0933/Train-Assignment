var config = {
    apiKey: "AIzaSyD3KbtttInL67l5FuC6WhIXxA-bwm3Fz-s",
    authDomain: "fir-project-188a3.firebaseapp.com",
    databaseURL: "https://fir-project-188a3.firebaseio.com",
    storageBucket: "fir-homework-188a3",
    messagingSenderId: "820750302472"
};

firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var trainStart = 0;
var frequency = 0;

$("#train-information-form").on("submit", function(event) {
    event.preventDefault();

    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var trainStart = $("#traintimeInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();
    console.log(trainName);
    console.log(destination);
    console.log(trainStart);
    console.log(frequency);

    database.ref().push({

        Destination: destination,
        Frequency: frequency,
        Name: trainName,
        Start: trainStart,
    });
});

