var config = {
    apiKey: "AIzaSyD3KbtttInL67l5FuC6WhIXxA-bwm3Fz-s",
    authDomain: "fir-project-188a3.firebaseapp.com",
    databaseURL: "https://fir-project-188a3.firebaseio.com",
    storageBucket: "fir-homework-188a3",
    messagingSenderId: "820750302472"
};

firebase.initializeApp(config);

$("#train-information-form").on("submit", function(event) {
    event.preventDefault();
    var trainName = $("#mySearch").val()
    console.log(trainName);
/*    var destination =
    var firstTrainTime =
    var frequency =*/
});

