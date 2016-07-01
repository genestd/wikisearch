var searchRequest = "";
var searchString = "";

$(document).ready(function(){
  console.log("starting...");
  $("#searchicon").on("click", function(){
    $(this).toggleClass("si_clicked");
    $(".searchbox").toggleClass("searchbox-open");
    $(".btn-go").toggleClass("btn-go-vis");
  });
  $("#randomicon").on("click", function(){
    $(this).toggleClass("rnd_clicked");
  });
  $("#searchtext").keyup(function(event){
      if(event.keyCode == 13){
          $("#searchBtn").click();
      }
  });
  $("#searchBtn").on("click", function(){
    searchRequest = document.getElementById("searchtext").value;
    cleanRequest();
  });
});

/* Clean up the search string
 - Remove non-alphanumeric chars
*/
function cleanRequest(  ){
  $("#message").html("");
  console.log(searchRequest);
  searchString = searchRequest.replace( /[^\w ]/g, "");
  console.log(searchString);
  if (searchString.length == 0){
    $("#message").html("Invalid search (must be alpha-numeric)");
  } else if (searchString !== searchRequest){
    $("#message").html("Special characters not allowed...searching: " + searchString);
  } else {
    searchString = encodeURI(searchString);
    clearResults();
    search();
  }
}
/* If the searchString is valid, this function will call
the Wiki API for results.
*/
function search(){
  var wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+searchString;
  //getWikiResults();
  console.log( wikiURL );

  $.ajax(
    { url: wikiURL
      dataType: json
    })
    .done( function(data){
      displayResults(data);
      //clear text box
      //clear searching message if necessary
      //toggle search icon/input
    })
    .fail( function(err){
      console.log(err);
    });
}

function displayResults(response){
  console.log(response);
  var myHTML = [];
  var content;
  myHTML[0] = "<div class='module resHdr'><h2>" +
            titleCase(response[0]) +
            "</h2></div>";
  console.log(myHTML);
  for (var i=0;i<response[1].length;i++){
    content = "<div class='module resPage'>" +
    "<a href='" + response[3][i] + "' target='_blank'><b>" +
              response[1][i] +
              ": </b></a>";
    content += response[2][i];
    content += "</div>";
     myHTML.push(content);
      }


  console.log(myHTML);
  $("#results").html(myHTML);
}

function clearResults(){
  $(".resHdr").remove();
  $(".resPage").remove();
}

function titleCase(str) {
  var sentence= str.split( " ");
  var newSentence = [];

  for (i=0; i<sentence.length; i++){
    var word = sentence[i][0].toUpperCase();
    newSentence[i] = word.concat( sentence[i].substr(1, sentence[i].length-1).toLowerCase());

  }
  return newSentence.join(" ");
}
/*
var results={
[
  "baseball",["Baseball"
             ,"Baseball PEI"
             ,"Baseball Writers' Association of America"
             ,"Baseball Hall of Fame balloting, 2012"
             ,"Baseball rules"
             ,"Baseball Hall of Fame balloting, 1939"
             ,"Baseball America College Coach of the Year"
             ,"Baseball card"
             ,"Baseball at the 1992 Summer Olympics"
             ,"Baseball at the 1967 Pan American Games"
             ]
            ,["Baseball is a bat-and-ball game played between two teams of nine players each, who take turns batting and fielding."
             ,"Baseball PEI is the provincial governing body for baseball in Prince Edward Island. Baseball PEI is a member of Baseball Canada and Baseball Atlantic."
             ,"The Baseball Writers' Association of America (BBWAA) is a professional association for baseball journalists writing for daily newspapers, magazines and qualifying Web sites."
             ,"Elections to the Baseball Hall of Fame for 2012 proceeded according to rules most recently revised in July 2010. As in the past, the Baseball Writers' Association of America voted by mail to select from a ballot of recently retired players, with results announced on January 9, 2012. The Golden Era Committee, the second of three new era committees established by the July 2010 rules change, replacing the Veterans Committee, convened early in December 2011 to select from a Golden Era ballot of retired players and non-playing personnel who made their greatest contributions to the sport between 1947 and 1972, called the \"Golden Era\" by the Hall of Fame."
             ,"The rules of baseball differ slightly from league to league, but in general share the same basic gameplay."
             ,"The 1939 elections to select inductees to the Baseball Hall of Fame were the last ones conducted prior to the Hall's opening that year."
             ,"The Baseball America College Coach of the Year Award is an award given by Baseball America to the best college baseball coach of the year."
             ,"A baseball card is a type of trading card relating to baseball, usually printed on some type of paper stock or card stock."
             ,"Baseball had its debut as an official medal sport at the 1992 Summer Olympics in Barcelona. Eight nations competed, with the preliminary phase consisting of each team playing every other team."
             ,""
             ]
            ,["https://en.wikipedia.org/wiki/Baseball"
             ,"https://en.wikipedia.org/wiki/Baseball_PEI"
             ,"https://en.wikipedia.org/wiki/Baseball_Writers%27_Association_of_America"
             ,"https://en.wikipedia.org/wiki/Baseball_Hall_of_Fame_balloting,_2012"
             ,"https://en.wikipedia.org/wiki/Baseball_rules"
             ,"https://en.wikipedia.org/wiki/Baseball_Hall_of_Fame_balloting,_1939"
             ,"https://en.wikipedia.org/wiki/Baseball_America_College_Coach_of_the_Year"
             ,"https://en.wikipedia.org/wiki/Baseball_card"
             ,"https://en.wikipedia.org/wiki/Baseball_at_the_1992_Summer_Olympics"
             ,"https://en.wikipedia.org/wiki/Baseball_at_the_1967_Pan_American_Games"
             ]
 ]
}*/
