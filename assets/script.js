$(document).ready(function(){
    
    var now = moment().format("dddd[,] MMMM Do gggg");
    //console.log(now);
   $("#todaysDate").text(now);

   $("button").on("click", function(event) {

    var currentTimeSlot = $(this).attr("index");
       console.log(currentTimeSlot);
   })


  });