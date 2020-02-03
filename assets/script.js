$(document).ready(function() {

    $("textarea").each(function(i) {
        $(this).addClass("future");
    });

    checkTime();

   // code to store tasks in localStorage
   $("button").on("click", function(event) {
    var currentTimeSlot = $(this).attr("index");
    var currentTextarea = $("#"+currentTimeSlot).val();

    if (!currentTextarea) {
        $(this).find("i").attr("class", "far fa-save");
    } else {
        $(this).find("i").attr("class", "fas fa-save");
        saveToLocalStorage(currentTimeSlot,currentTextarea); // saves to the storage if the user presses the save button
    };
   });

});

function checkTime() { // checks the time every second to be able to disable the inputs without refreshing the page
    setInterval( function() {
        var now = moment(); // gets the current date and time
        var formattedDate = now.format("dddd[,] MMMM Do gggg"); // formats the current date and time
        var currentHour = now.format("HH"); // gets the hour in 24 hour time
    
        $("#todaysDate").text(formattedDate);
        
        // disables the textarea input for past hours
        $("textarea").each(function(i) {
            var timeSlot = $(this).attr("id"); 
            if(currentHour > timeSlot) {       
                $(this).prop('disabled', true);
            } else if (currentHour == timeSlot) {
                $(this).removeClass("future");
                $(this).addClass("present");
            } else {
                $(this).addClass("future");
            };
        });
    
        // disables the button for past hours
        $("button").each(function( i ) {
            var currentBtn = $(this).attr("index"); 
            if(currentHour > currentBtn) {       
                $(this).prop('disabled', true);
            };
        });
    },1000);
};

// checks for values in local storage and displays them on the page
$(window).on("load", function() { 
    var timeSlots = ["09","10","11","12","13","14","15","16","17"];
    getFromLocalStorage(timeSlots); 
});

function saveToLocalStorage(cts,cta) {
    if (cta !== '') {
        localStorage.setItem(cts,cta);
    };
};

function getFromLocalStorage(t) {
    if (localStorage) {
        for (var i = 0; i < t.length; i++) {
            var taskKey = t[i];
            var task = localStorage.getItem(taskKey);
            if (task) {
                $("#"+taskKey).val(task);
            }
        };
    };
};