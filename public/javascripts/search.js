// After the API loads, call a function to enable the search box.
function handleAPILoaded() 
{
    $('#search-button').attr('disabled', false);
}

// Result array and counter variable. Counter variable is used in the next button
var orginialArtist = new Array();
var counter = 0;
var recommendedArtists = new Array();
var test = [];

// Search for a specified string.
function search()
{
    getrecommendedArtists($('#query').val());   
    getoriginalArtist($('#query').val());
    $('#next').html('<button>' + 'Next' + '</button>');
//   $('#playList').html('<iframe src="' + 'http://www.youtube.com/embed/'+orginialArtist[0].id.videoId+'?autoplay=1' + '"iv_load_policy=3 width=420 height=300>');
    console.log("the recommeded artist is " + test[0]);
}


//next button clicks shows the next song to play
function next()
{
    counter = counter + 1;
    $('#playList').html('<iframe src="' + 'http://www.youtube.com/embed/'+orginialArtist[counter].id.videoId+'?autoplay=1' + '"iv_load_policy=3 width=420 height=300>');
  
}

function getrecommendedArtists(Artist)
{
  //start of last fm
    var cache = new LastFMCache();
    // Create a LastFM object 
    console.log("The originial artist is " + Artist);
    var lastfm = new LastFM({
    apiKey    : 'b5a3df676ab109e2df13bbed93c62399',
    apiSecret : '03e4b00198305c51ad812369e4400255',
    cache     : cache
    });

    // Load some artist info. //
    lastfm.artist.getInfo({artist: Artist}, {success: function(data)
    {
      // Use data. //
    $.each(data, function(i, temp)
    {
      $.each(temp.similar.artist, function(j,temp1)
        {
          
          recommendedArtists[i] = temp1.name;          
       //   console.log(recommendedArtists[i]);
        })
    }) 
    },error: function(code, message){
      console.log("recommended Artists is not avaliable");
    }});
  
  
}

function getoriginalArtist(Artist)
{
var request = gapi.client.youtube.search.list({
    q: $('#query').val(),
    part: 'snippet',
    type: 'video',
    maxResults : 45,
    videoEmbeddable : 'true'
  });

    request.execute(function(response) {
    var str = JSON.stringify(response.result);
    //console.log(response.result.items);  
    $.each(response.result.items, function(i, temp)
    {
        orginialArtist[i] = temp;
      $('#playList').html('<pre>' + orginialArtist[i].snippet.title + '</pre>');
      testadd(orginialArtist[i].id.videoId);
    }) 
 //  $('#search-container').html('<pre>' + str + '</pre>');
  $('#next').html('<button>' + 'Next' + '</button>');
  $('#playList').html('<iframe src="' + 'http://www.youtube.com/embed/'+orginialArtist[0].id.videoId+'?autoplay=1' + '"iv_load_policy=3 width=420 height=300>');
  

  });
   
}



function testadd(videotag){
  test.push({videotag: videotag});
}

