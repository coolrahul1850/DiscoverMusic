// After the API loads, call a function to enable the search box.
function handleAPILoaded() 
{
    $('#search-button').attr('disabled', false);
}

// Result array and counter variable. Counter variable is used in the next button

var counter = 0;
var orginialArtist = [];
var recommendedArtists = [];
var firsttime = 0;
var recommended_sw = 0;

function addorginialArtist(videotag, track, artist){
  orginialArtist.push({videotag: videotag, track : track, artist : artist});
}



// Search for a specified string.
function search()
{
    firsttime = 0;
    orginialArtist = [];
    recommendedArtists = [];
    recommended_sw = 0;
    getrecommendedArtists($('#query').val());   
    getoriginalArtist($('#query').val());
    $('#next').html('<button>' + 'Next' + '</button>');
    
}


//next button clicks shows the next song to play
function next()
{
  if (recommended_sw === 1)
  {
  counter = counter + 1;
  $('#playList').html('<iframe src="' + 'http://www.youtube.com/embed/'+orginialArtist[counter].videotag+'?autoplay=1' + '"iv_load_policy=3 width=420 height=300>');  
  } 
  else if (recommended_sw === 0)
  {
    console.log("found recommendedArtists");
    var random = 30 * Math.floor(Math.random() * 6);
    var randomtrack = random + Math.floor(Math.random () * 30);
   // console.log("the random track is " + " " + randomtrack + " " + orginialArtist[randomtrack].artist + orginialArtist[randomtrack].track);
    $('#playList').html('<iframe src="' + 'http://www.youtube.com/embed/'+orginialArtist[randomtrack].videotag+'?autoplay=1' + '"iv_load_policy=3 width=420 height=300>'); 
   
  } 
   
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
          getoriginalArtist(temp1.name);        
          console.log(temp1.name);
        })
    }) 
    },error: function(code, message){
      recommended_sw = 1;
      console.log("recommended Artists is not avaliable");
    }});
  
  
}

function getoriginalArtist(Artist)
{
var request = gapi.client.youtube.search.list({
    q: Artist,
    part: 'snippet',
    type: 'video',
    maxResults : 30,
    videoEmbeddable : 'true',
 //   videoDuration : 'medium' + ',' + 'short'

  });

    request.execute(function(response) {
    var str = JSON.stringify(response.result);
    $.each(response.result.items, function(i, temp)
    {
      //addorginialArtist(temp.id.videoId, temp.snippet.title);
      addorginialArtist(temp.id.videoId, temp.snippet.title, Artist);
    }) 
 
  if (firsttime === 0)
  {
     firsttime = 1;
     $('#playList').html('<iframe src="' + 'http://www.youtube.com/embed/'+orginialArtist[0].videotag+'?autoplay=1' + '"iv_load_policy=3 width=420 height=300>');
  }
  
  });
   
}



