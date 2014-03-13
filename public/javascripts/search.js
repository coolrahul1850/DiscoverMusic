// After the API loads, call a function to enable the search box.
function handleAPILoaded() 
{
    $('#search-button').attr('disabled', false);
}

// Result array and counter variable. Counter variable is used in the next button
var Result = new Array();
var counter = 1;


// Search for a specified string.
function search()
{
    //start of last fm
    var cache = new LastFMCache();
    /* Create a LastFM object */
    var lastfm = new LastFM({
    apiKey    : 'b5a3df676ab109e2df13bbed93c62399',
    apiSecret : '03e4b00198305c51ad812369e4400255',
    cache     : cache
    });

    /* Load some artist info. */
    lastfm.artist.getInfo({artist: 'Iron Maiden'}, {success: function(data)
    {
      /* Use data. */
  //    console.log(data.artist);
    },error: function(code, message){
  /* Show error message. */
      }});

  // end of lastfm

  //youtube api starts  
    var q = $('#query').val();
    var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });

    request.execute(function(response) {
    var str = JSON.stringify(response.result);
      
    $.each(response.result.items, function(i, temp)
    {
        Result[i] = temp;
   
        $('#playList').html('<pre>' + Result[i].snippet.title + '</pre>');
    }) 
   $('#search-container').html('<pre>' + str + '</pre>');
   $('#next').html('<button>' + 'Next' + '</button>');
   $('#playList').html('<iframe src="' + 'http://www.youtube.com/embed/'+Result[1].id.videoId+'?autoplay=true' + '"width=420 height=300>');
  
  console.log('https://www.youtube.com/embed/='+Result[1].id.videoId);
  });
}

//next button clicks shows the next song to play
function next()
{
    counter = counter + 1;
    $('#playList').html('<iframe src="' + 'http://www.youtube.com/embed/'+Result[counter].id.videoId+'?autoplay=true' + '"width=420 height=300>');
    
}