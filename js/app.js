var photoURLs = [];
var camera, renderer, scene, controls, lights;
var shape, cubeMaterial, material, pivot, direction;
var cubeMats = shapeArr = sphereMats = [];

$(function() {


    $(".query").focus();




    function getPhotos() {
        return function(e) {
        var query = $(".query").val().replace(" ", "%20");
        var queryURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=38815213fc508bb6153557031aa15a40&text=' + query + '&format=json&nojsoncallback=1';
        $.get(queryURL, function(data) {
            $(".photosdiv").html("");
            photoURLs = [];
            if (data.photos.photo.length > 0) {
            for (var i = 0; i < 6; i++) {
                var farm = data.photos.photo[i].farm;
                var id = data.photos.photo[i].id;
                var server = data.photos.photo[i].server;
                var secret = data.photos.photo[i].secret;
                var photoURL = "https://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + ".jpg";
                // $(".photosdiv").append("<div class='col-xs-3'><img src='" + photoURL + "'' class='photo img-responsive inline-block img-rounded' alt='deez images'></div>");
                photoURLs.push(photoURL);
            }

            if (e.target.id == 1) {
            makeSphere();
        } else if (e.target.id == 2) {
            makeCube();
            }
        } else {alert("nothing found");
}
        }).fail(function(data) {
            console.log("ouch!");
        });
        $(".query").val("");

    };
};



    //on submit
    $(".spheresubmit").click(getPhotos());
    $(".cubesubmit").click(getPhotos());
    //on enter
    $(".query").keyup(function(e){
      if(e.keyCode === 13 && $(".query").val.length > 0) {

        getPhotos();

      }
      return
    });

    });
