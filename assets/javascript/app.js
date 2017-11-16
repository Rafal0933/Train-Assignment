
var config = {
    apiKey: "AIzaSyD3KbtttInL67l5FuC6WhIXxA-bwm3Fz-s",
    authDomain: "fir-project-188a3.firebaseapp.com",
    databaseURL: "https://fir-project-188a3.firebaseio.com",
    storageBucket: "fir-homework-188a3",
    messagingSenderId: "820750302472"
};

// Initizliaing firebase //
firebase.initializeApp(config);

// Create a variable to hold the firebase function //
var database = firebase.database();

// Create a variable to hold train name //
var trainName = "";
var destination = "";
var trainTime = "";


$("#train-information-form").on("submit", function(event) {
    event.preventDefault();

    // Take the value from train name form and trim to get rid of empty spaces //
    var trainName = $("#trainNameInput").val().trim();

    // Take the value from destination in form and trim to get rid of empty spaces //
    var destination = $("#destinationInput").val().trim();

    // Take value entered into train start time and trim to get rid of empty spaces //
    var trainStart = $("#traintimeInput").val().trim();

    // Take value entered into frequency and trim to get rid of empty spaces //
    var frequency = $("#frequencyInput").val().trim();

    // Format first train from military time into standard 12 hour //
    var firstTime = moment(trainStart,"HHmm").format("hh:mm a");

    // Moves time a year behind to make sure that it isn't ahead of the real time //
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

    // Takes the difference in time between first time and now into minutes//
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Takes the difference in time and divides the remainder by frequency //
    var nextTrainTime = diffTime % frequency;

    // Subtracts the frequency from the next train time //
    var tMinutesTillTrain = frequency - nextTrainTime;

    // Adds the time remaining to current time and changes the format to hours and minutes //
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("h:mm A");

    // Format the current time into standard //
    var currentTime = moment().format("hh:mm a");

    // Subtract first time from current time and formats it to standard //
    var minutesAway = moment.utc(moment(firstTime,"HH:mm a").diff(moment(currentTime,"HH:mm a"))).format("HH:mm a");

    // Convert minutes away into hour and minute format //
    var minuteConversion = moment(minutesAway, "h:mm").format("h mm");


// Push referenced variables into Firebase //
    database.ref().push({

        // Enter train name value stored in trainName variable into Firebase //
        Name: trainName,

        // Enter destination name value stored in destination variable value into Firebase //
        Destination: destination,

        // Enter the frequency value stored in variable into Firebase //
        Frequency: frequency,

        // Enter the value stored in nextTrain variable into Firebase //
        NextArrival: nextTrain,

        // Enter the amount of time stored in tMinutesTillTrain variable into Firebase
        MinutesAway: tMinutesTillTrain
    });
});

// When values (children) are added into Firebase, run function //
database.ref().on("child_added", function(childSnapshot){

    // Set variable to hold the value of Name in Firefox //
    trainNameOutput = childSnapshot.val().Name;
    // Set variable to hold the value of Destination in Firefox //
    destinationOutput = childSnapshot.val().Destination;
    // Set variable to hold the value of Frequency in Firefox //
    frequencyOutput = childSnapshot.val().Frequency;
    // Set variable to hold the value of NextArrival in Firefox //
    nextTrainTimeOutput = childSnapshot.val().NextArrival;
    // Set variable to hold the value of MinutesAway in Firefox //
    tMinutesTillTrainOutput = childSnapshot.val().MinutesAway;

    //Append values into table //
    $("#current-schedule").append("<tr>" + "<td>" + trainNameOutput + "</td>" + "<td>" + destinationOutput + "</td>"+ "<td>" + frequencyOutput + " Minutes" + "</td>" + "<td>" + nextTrainTimeOutput + "</td>" + "<td>" + tMinutesTillTrainOutput + "</tr>");
});

