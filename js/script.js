
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
     var $street = $('#street').val();
     var $city = $('#city').val();
     var $streetStrUrl = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" +$street + ', '+ $city;
     //console.log($streetStrUrl);
     $greeting.text('So, you want to live at ' + $street + ', ' + $city +'?');
   $body.append('<img class="bgimg" src="' +$streetStrUrl + '">');
    // YOUR CODE GOES HERE!
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
                     url += '?' + $.param({
                          'api-key': "e793007378284677af0010ef1b01929b",
                          'q': $city,
                          'sort': "newest"
                        });
    $.ajax({
           url: url,
           method: 'GET',
          }).done(function(result) {
                // console.log(result);
                $nytHeaderElem.text('New York Times Articles About ' + $city);
              for(var i=0;i<result.response.docs.length;i++)
              {
                  $nytElem.append('<li class="articles"><a href="' +result.response.docs[i].web_url + '">"'+result.response.docs[i].headline.main + '</a>' +
                    '<p>' + result.response.docs[i].snippet + '</p>'
                   + '</li>');

              }

             }).fail(function(err) {
                $nytHeaderElem.text('New York Times Articles About ' + $city +' could not be loaded');
          });

var wikiTimeout = setTimeout(function(){
  $wikiElem.setText("failed to get wikipedia Resources");
},8000);


  var wikiUrlApi ="https://en.wikipedia.org/w/api.php?action=opensearch&search="+ $city +"&format=json&callback=wikiCallback";

 $.ajax({
   url: wikiUrlApi,
   dataType: "jsonp"
 }).done(function(data){
  // console.log(data);
  for(var i=0;i<data[1].length;i++)
  {
    var url =data[3][i];
    //console.log(url);
    $wikiElem.append('<li><a href="'+ url +'" target="_blank">'+ data[1][i] +'</a></li>');
  }
  clearTimeout(wikiTimeout);
 });



    return false;
};

$('#form-container').submit(loadData);
