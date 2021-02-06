

if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        $.get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAAZk4JTpJ993tYeA1GQPTKTkiivuBym1s&latlng="+position.coords.latitude+","+position.coords.longitude+"&sensor=false", function (data) {
            console.log(data);
            $.ajax({
                url: '/user/updateLocation',
                data: { 
                  "area": data.results[0].address_components[2].long_name,
                  "ip": data.results[0].address_components[3].long_name,
                  "apiKey": "AIzaSyAAZk4JTpJ993tYeA1GQPTKTkiivuBym1s"
                },
                type: "GET",
                success: function(data) {
                },
                error: function(xhr) {
                  console.log(xhr);
                }
            });
        })
    })
}
function haversine_distance(mk1, mk2) {
  var R = 6371.0710; // Radius of the Earth in miles
  var rlat1 = mk1.location.lat * (Math.PI/180); // Convert degrees to radians
  var rlat2 = mk2.location.lat * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (mk2.location.lng-mk1.location.lng) * (Math.PI/180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  $("#personDistance").html("Distance: "+Math.round(d)+"Km");
}
async function getDistance(userid){
    $.ajax({
      url: '/user/getLocation',
      data: { 
        "userid": "logged"
      },
      type: "GET",
      success: function(data) {
        $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+data.area+"+"+data.ip+"&key=AIzaSyAAZk4JTpJ993tYeA1GQPTKTkiivuBym1s", function (data2) {
            console.log(data2);
            $.ajax({
              url: '/user/getLocation',
              data: { 
                "userid": userid
              },
              type: "GET",
              success: function(data3) {
                console.log(data3);
                $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+data3.area+"+"+data3.ip+"&key=AIzaSyAAZk4JTpJ993tYeA1GQPTKTkiivuBym1s", function (data4) {
                    console.log(data4);
                    haversine_distance(data2.results[0].geometry,data4.results[0].geometry)
                })
              },
              error: function(xhr) {
                console.log(xhr);
              }
            });
        })
      },
      error: function(xhr) {
        console.log(xhr);
      }
    });
}

function updateUser() {
    $.ajax({
        url: '/user/getRandomUser',
        type: "GET",
        success: function(data) {
          console.log(data);
          $("#personName").html("Name: "+data.name);
          $("#personSurname").html("Surname: "+data.surname);
          $("#personAge").html("Age: "+data.age);
          getDistance(data.userid);
          $("#personGender").html("Gender: "+getGender(data.gender));
          $("#personSP").html("Sexual Preference: "+getGender(data.sexualPreference));
          var intL = data.interests.split("#");
          var ints = intL[0]+", ";
          var c = 0;
          intL.forEach(int => {
            if (c > 0){
              ints += int+", ";
            }
            c++;
          })
          ints.slice(0,-2);
          $("#personInts").html("Interests: "+ints);
          $("#personBio").html("About Me: "+data.bio);
          updateLikeBtn(data.userid);
          updateFame(data.userid);
          getImages(data.userid);
        },
        error: function(xhr) {
          console.log(xhr);
        }
    });
}
updateUser();
function updateFame(userid) {
  $.ajax({
    url: '/user/getLikes',
    type: "GET",
    data: {
      "userid": userid
    },
    success: function(data) {
      console.log(data);
      $("#fame").html(data.likes)
    },
    error: function(xhr) {
      console.log(xhr);
    }
  });
}
function updateLikeBtn(userid){
  $("#likeBtn").remove();
  var a = $("<button>", {"class": "btn btn-primary","onclick": "addLike("+userid+")", "id": "likeBtn","type": "button"});
  $("#btnsDiv").prepend(a);
  var div = $("<i>", {"class": "fa fa-heart"});
  a.append(div);
}
function addLike(userid){
  $.ajax({
    url: '/user/addLikeYes',
    type: "GET",
    data: {
      "userid": userid
    },
    success: function(data) {
      if (data == "Success"){
        swal(
          'Liked!',
          'Successfully Liked, Good Luck!',
          'success'
        )
      } else if (data == "Exists") {
        swal(
          'Already Liked!',
          'Cheeky Bugger You Already Liked Them!',
          'error'
        )
      } else {
        swal(
          'Error!',
          'Error Adding Like!',
          'error'
        )
      }
      updateUser();
    },
    error: function(xhr) {
      console.log(xhr);
    }
  });
}
function getImages(userid){
  $.ajax({
    url: '/user/getUserImages',
    type: "GET",
    data: {
      "userid": userid
    },
    success: function(data) {
      console.log(data);
      if (data[0].image1){
        $("#img1").attr("src",data[0].image1);
      }else {
        $("#img1").attr("src","https://picsum.photos/500/700");
      }


      if (data[0].image2){
        $("#img2").attr("src",data[0].image2);
      }else {
        $("#img2").attr("src","https://picsum.photos/500/700");
      }


      if (data[0].image3){
        $("#img3").attr("src",data[0].image3);
      }else {
        $("#img3").attr("src","https://picsum.photos/500/700");
      }


      if (data[0].image4){
        $("#img4").attr("src",data[0].image4);
      }else {
        $("#img4").attr("src","https://picsum.photos/500/700");
      }


      if (data[0].image5){
        $("#img5").attr("src",data[0].image5);
      }else {
        $("#img5").attr("src","https://picsum.photos/500/700");
      }
    },
    error: function(xhr) {
      console.log(xhr);
    }
  });
}


function getGender(gender){
  switch (gender) {
    case 0:
      return ("Male");
      break;
    case 1:
      return ("Female");
      break;
    case 2:
      return ("Bisexual");
      break;
    case 1:
      
      break;
  
    default:
      break;
  }
}