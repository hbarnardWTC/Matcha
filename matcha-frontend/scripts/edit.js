
function verifyPass(){
  $("#pwconfirm").attr("style", "border: 1px solid #ced4da;");
  var pass = $("#password").val();
  var cPass = $("#pwconfirm").val();
  var i = 0;
  var confirmed = 0;
  if (pass.length == cPass.length){
    while (cPass[i] && pass[i]){
      if (cPass.substr(0,i) != pass.substr(0,i)){
        $("#pwconfirm").attr("style", "border: 1px solid red;");
        confirmed++;
        return false;
      }
      i++;
    }
  } else {
    $("#pwconfirm").attr("style", "border: 1px solid red;");
    return false;
  }
  $("#pwconfirm").attr("style", "border: 1px solid green;");
  return true;
}

setTimeout(() => {
  $.ajax({
    url: '/user/getLikes',
    type: "GET",
    success: function(data) {
      console.log(data);
      data.users.forEach(user => {
        $.ajax({
          url: '/user/getUserById',
          type: "GET",
          data: {
            "userid": user.userid_1
          },
          success: function(data2) {
            console.log(data2);
            $("dropDiv").empty();
            var p = $("<p>", {"class": "dropdown-item size break"});
            p.html(user.username+"Liked You!");
            $("dropDiv").prepend(p);
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
}, 3000);


function getUserDetails(){
      $.ajax({
        url: '/user/getCurrentUser',
        type: "GET",
        success: function(data) {
          console.log(data);
          $("#name").attr("placeholder",data.name);
          $("#surname").attr("placeholder",data.surname);
          $("#username").attr("placeholder",data.username);
          $("#email").attr("placeholder",data.email);
          $("#password").attr("placeholder",data.password);
          getUserAdress();
          $("#sp option[value="+data.sexualPreference+"]").attr("selected", "selected");
          getUserImages();
          $("#interest").attr("placeholder",data.interests);
          $("#bio").attr("placeholder",data.bio);
          $("#gender option[value="+data.gender+"]").attr("selected", "selected");
        },
        error: function(xhr) {
          console.log(xhr);
        }
      });
  }

function getUserAdress(){
    $.ajax({
      url: '/user/getLocation',
      type: "GET",
      data: {
        "userid": "logged"
      },
      success: function(data) {
        console.log(data);
        $("#address").attr("placeholder",data.area+", "+data.ip);
      },
      error: function(xhr) {
        console.log(xhr);
      }
    });
}
function getUserImages(){
  $.ajax({
    url: '/user/getUserImages',
    type: "GET",
    data: {
      "userid": "logged"
    },
    success: function(data) {
      console.log(data);
    },
    error: function(xhr) {
      console.log(xhr);
    }
  });
}

function updateUserInfo(){
    var sp = $("#sp").children("option:selected").val();
    var gender = $("#gender").children("option:selected").val();
    if (verifyPass()){
      $.ajax({
          url: '/',
          type: "GET",
          data: {
              'name': $("#name").val(),
              'surname': $("#surname").val(),
              'username': $("#username").val(),
              'email': $("#email").val(),
              'password': $("#password").val(),
              // 'name': $("#address").val(),
              'sexualPreference': sp,
              'interests': $("#interests").val(),
              'bio': $("#bio").val(),
              // image section
              'gender': gender
          },
          success: function(data) {
              console.log(data);
            },
            error: function(xhr) {
              console.log(xhr);
            }
        })
    }
}

getUserDetails();