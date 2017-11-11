var state = [
    {
        trainName: "Trenton Express",
        destination: "Trenton",
        frequency: 25
    },
    {
        trainName: "Oregon Trail",
        destination: "Salem",
        frequency: 3600
    },
    {
        trainName: "Midnight Carriage",
        destination: "Philadelphia",
        frequency: 12
    },
    {
        trainName: "Sing Sing Caravan",
        destination: "Atlanta",
        frequency: 45
    },
    {
        trainName: "Boston Bus",
        destination: "Boston",
        frequency: 65
    },
    {
        trainName: "California Caravan",
        destination: "San Francisco",
        frequency: 6000
    },
    {
        trainName: "Analben's Train",
        destination: "San Florida",
        frequency: 25
    },
];


minutesAway = [];
nextArrival = [];

function frequencyConversion() {

    state.forEach(function(element) {
var timeFrequency = (element.frequency);
var firstTime = "03:00";
var firstTimeConverted = moment(firstTime, "hh:mm");
var currentTime = moment().format("hh:mm");
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
var timeRemainer = diffTime % timeFrequency;
var tMinutesTillTrain = timeFrequency - timeRemainer;
var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
    minutesAway.push(tMinutesTillTrain);
    nextArrival.push(nextTrain);
    console.log(nextTrain);

    })
};

frequencyConversion();


function renderTable () {
    $("tbody").empty();
    state.forEach(function(element) {
        var tableRow = `
                        <tr>
                        <td>${element.trainName}</td>
                        <td>${element.destination}</td>
                        <td>${element.frequency}</td>
                        <td>${nextArrival++}</td>
                        <td></td>
                        </tr>
                        `
    $("tbody").append(tableRow);
    })
};
renderTable();

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

    database.ref().push({

        Destination: destination,
        Frequency: frequency,
        Name: trainName,
        Start: trainStart,
    });
});

database.ref().on("child_added", function(childSnapshot){

    destinationOutput = childSnapshot.val().Destination;
    frequencyOutput = childSnapshot.val().Frequency;
    trainNameOutput = childSnapshot.val().Name;
    trainStartOutput = childSnapshot.val().Start;

    $("#current-schedule").append("<tr>" + "<td>" + trainNameOutput + "</td>" + "<td>" + destinationOutput + "</td>"+ "<td>" + frequencyOutput + "</td>" + "<td>" + frequencyOutput + "</td>" + "<td>" + frequencyOutput + "</tr>");
});