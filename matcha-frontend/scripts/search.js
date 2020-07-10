

var interests = new Array();
$.LoadingOverlaySetup({
    background      : "rgba(0, 0, 0, 0.5)",
    image           : "img/custom.svg",
    imageAnimation  : "1.5s fadein",
    imageColor      : "#ffcc00"
});
function applyFilters(){
    $.LoadingOverlay("show");
    $("body").css({"overflow": "hidden"});
    console.log("get matched users");
    var sort = "AgeUp";
    var sp = $("#sP").children("option:selected").val();
    var minLikes = $("#minPop").val();
    var maxAgeRange = $("#ageDiff").val();
    var maxDist = $("#DistanceDiff").val();
    $.ajax({
        url: '/user/getMatchingUsers',
        type: "GET",
        data: {
          "sort": sort,
          "sp": sp,
          "minLikes": minLikes,
          "maxAgeRange": maxAgeRange,
          "maxDist": maxDist,
          "interests": interests
        },
        success: function(data) {
          updateUsers(data);
        },
        error: function(xhr) {
          console.log(xhr);
        }
      });
}
function updateInts(){
    var ints = $("#contentInt").html().toLocaleLowerCase();
    var i = 0;
    console.log(ints);
    while (ints[i]){
        if (ints[i] == "," && i > 0){
            interests.push(convAN(ints.substr(0,i).toLocaleLowerCase()));
            console.log("yes");
            $("#contentInt").html("");
        }
        i++;
    }
    validatedInts();
}
function convAN(str) {
    var code, i, len, nstr = str;
    for (i = 0, len = str.length; i < len; i++) {
        code = str.charCodeAt(i);
        if (!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123)) { // lower alpha (a-z)
            nstr = str.substr(0,i)+str.substr(i+1,str.length);
        }
    }
    return (nstr);
  };
function validatedInts(){
    $(".verifiedInt").remove();
    var inc = 0;
    console.log(interests);
    interests.forEach(int => {
        var div = $("<span>", {"class": "verifiedInt", "id": "int"+inc});
        div.html(int);
        $("#userInterests").prepend(div);
        var btn = $("<button>", {"class": "verifiedIntClose", "onclick": "removeid("+inc+")"});
        div.append(btn);
        var i = $("<i>", {"class": "fa fa-close"});
        btn.append(i);
        inc++;
    })
}
function clearp(){
    $("#contentInt").html("");
}
function removeid(id){
    $("#int"+id).remove();
    if (id == 0){
        interests.shift();
    } else {
        interests.splice(id,id);
    }
    validatedInts();
}


function updateUsers(data){
    $("#matchesList").empty();
    var i = 0;
    data.users.forEach(user => {
        generateUserDiv(user.userid,user.name,user.age,data.dist[i],user.bio);
        i++;
    })
    $.LoadingOverlay("hide");
    $("body").css({"overflow": "scroll"});
}

function generateUserDiv(userid,name,age,distance,bio){
    var div1 = $("<div>", {"class": "col-lg-4"});
    $("#matchesList").append(div1);
    var img = $("<img>", {"class": "d-block search-image","src": "https://pbs.twimg.com/media/DNkyKjSW4AAdPpW.jpg", "alt": "First Image"});
    div1.append(img);
    var div2 = $("<div>", {"class": "container text-center", "id": "profileDetails"});
    div1.append(div2);
    var div3 = $("<div>", {"class": "cl-white margin-zero drop-panties", "id": "btnsDiv"});
    div2.append(div3);
    var a = $("<button>", {"class": "btn btn-primary","onclick": "addLike("+userid+")", "id": "likeBtn","type": "button"});
    div3.append(a);
    var div = $("<i>", {"class": "fa fa-heart"});
    a.append(div);
    var a2 = $("<button>", {"class": "btn btn-warning", "id": "fame","type": "button"});
    div3.append(a2);
    a2.html("0");
    var a3 = $("<button>", {"class": "btn btn-light", "id": "dislikeBtn","type": "button"});
    div3.append(a3);
    var div33 = $("<i>", {"class": "fa fa-thumbs-down"});
    a3.append(div33);
    var a4 = $("<button>", {"class": "btn btn-danger", "id": "likeBtn","type": "button"});
    div3.append(a4);
    var div4 = $("<i>", {"class": "fa fa-ban"});
    a4.append(div4);
    var p1 = $("<p>", {"class": "cl-white text-center margin-zero"});
    p1.html("Name: "+name);
    div1.append(p1);
    var p1 = $("<p>", {"class": "cl-white text-center margin-zero"});
    p1.html("Age: "+ age);
    div1.append(p1);
    var p1 = $("<p>", {"class": "cl-white text-center margin-zero"});
    p1.html("Distance: "+distance);
    div1.append(p1);
    var p1 = $("<p>", {"class": "cl-white text-center margin-zero"});
    p1.html("About me: "+bio);
    div1.append(p1);
}
function addLike(userid){
    $.ajax({
      url: '/user/createMatch',
      type: "GET",
      data: {
        "userid": userid
      },
      success: function(data) {
        swal(
            'Matched!',
            'Successfully Liked, Go Send Them A Message!',
            'success'
        )
      },
      error: function(xhr) {
        console.log(xhr);
      }
    });
  }