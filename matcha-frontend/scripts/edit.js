
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

function toDataURL(src, outputFormat) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    return(dataURL);
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
}


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
          url: '/user/update',
          type: "GET",
          data: {
              'name': $("#name").val(),
              'surname': $("#surname").val(),
              'username': $("#username").val(),
              'email': $("#email").val(),
              'password': $("#password").val(),
              'sexualPreference': sp,
              'interests': $("#interests").val(),
              'bio': $("#bio").val(),
              'gender': gender
          },
          success: function(data) {
            updateUserImages();
              console.log(data);
            },
            error: function(xhr) {
              console.log(xhr);
            }
        })
    }
}

function updateUserImages(){
  console.log($("#img-1").files[0]);
  if (verifyPass()){
    $.ajax({
        url: '/user/updateImages',
        type: "GET",
        data: {
            'image1': toDataURL($("#img-1").files[0],"base64"),
            'image2': toDataURL($("#img-2").files[0],"base64"),
            'image3': toDataURL($("#img-3").files[0],"base64"),
            'image4': toDataURL($("#img-4").files[0],"base64"),
            'image5': toDataURL($("#img-5").files[0],"base64")
        },
        success: function(data) {
            console.log(data);
            updateUserAddress();
          },
          error: function(xhr) {
            console.log(xhr);
          }
      })
  }
}
function updateUserAddress(){
  if (verifyPass()){
    $.ajax({
        url: '/user/updateAddress',
        type: "GET",
        data: {
            'address': $("#address").val(),
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