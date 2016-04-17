var Twit = require('twit');
var Canvas = require('canvas');
var Image = Canvas.Image;

var T = new Twit({
    consumer_key:         ''
  , consumer_secret:      ''
  , access_token:         ''
  , access_token_secret:  ''
});

//Generate the canvas
var canvas = new Canvas(800, 800);
var context = canvas.getContext('2d');


function tweet() {

//Generate a random colour
var r = Math.floor((Math.random() * 256));
var g = Math.floor((Math.random() * 256));
var b = Math.floor((Math.random() * 256));
var color = "rgb("+r+","+g+","+b+")";
	
//Now convert to Hex
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
var hexcolor = ( rgbToHex(r, g, b) );

//Set the status
var twitstatus = color + " / " + hexcolor;

// draw box
context.beginPath();
context.moveTo(0, 00);
context.lineTo(0, 800);
context.lineTo(800, 800);
context.lineTo(800, 0);
context.closePath();
context.lineWidth = 5;
context.fillStyle = color;
context.fill();
    
var fs = require('fs')
  ,  out = fs.createWriteStream(__dirname + '/text.png')   
  , stream = canvas.pngStream();
var dataUrl = canvas.pngStream().pipe(out);
var b64content = canvas.toBuffer();
	
// first we must post the media to Twitter
T.post('media/upload', { media_data: canvas.toBuffer().toString('base64') }, function (err, data, response) {

// now we can reference the media and post a tweet (media will attach to the tweet)
var mediaIdStr = data.media_id_string
var params = { status: twitstatus, media_ids: [mediaIdStr] };

T.post('statuses/update', params, function (err, data, response) {
    console.log(data)
  })
})

}
//tweet a colour every 39.5 minutes
setInterval(tweet, 60000 * 39.5);