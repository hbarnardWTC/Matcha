
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
          $("#name").val(data.name);
          $("#surname").attr("placeholder",data.surname);
          $("#surname").val(data.surname);
          $("#username").attr("placeholder",data.username);
          $("#username").val(data.username);
          $("#email").attr("placeholder",data.email);
          $("#email").val(data.email);
          $("#password").attr("placeholder",data.password);
          $("#password").val(data.password);
          getUserAdress();
          $("#sp option[value="+data.sexualPreference+"]").attr("selected", "selected");
          getUserImages();
          $("#interest").attr("placeholder",data.interests);
          $("#interest").val(data.interests);
          $("#bio").attr("placeholder",data.bio);
          $("#bio").val(data.bio);
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
        $("#address").val(data.area+", "+data.ip);
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


File.prototype.convertToBase64 = function(callback){
  var reader = new FileReader();
  reader.onloadend = function (e) {
      callback(e.target.result, e.target.error);
  };   
  reader.readAsDataURL(this);
};

var img1;
var img2;
var img3;
var img4;
var img5;

function getimagedata() {
  console.log("getting data");
  return new Promise(data => {
    if ($("#img-1").get(0).files[0]){
      $("#img-1").get(0).files[0].convertToBase64(function(base64){
        // const byteCharacters = atob(base64);
        // const byteNumbers = new Array(byteCharacters.length);
        // for (let i = 0; i < byteCharacters.length; i++) {
        //     byteNumbers[i] = byteCharacters.charCodeAt(i);
        // }
        // const byteArray = new Uint8Array(byteNumbers);
        // const blob = new Blob([byteArray], {type: contentType});
        // img1 = blob;
        fetch(base64)
        .then(res => res.blob())
        .then(async (blob) => {
          console.log(blob);
          img1 = await new Response(blob).text();
          console.log(await new Response(blob).text());
        data(new Promise(data2 => {
          if ($("#img-2").get(0).files[0]){
            $("#img-2").get(0).files[0].convertToBase64(function(base64){
              img2 = base64;
              data2(new Promise(data3 => {
                if ($("#img-3").get(0).files[0]){
                  $("#img-3").get(0).files[0].convertToBase64(function(base64){
                    img3 = base64;
                    data3(new Promise(data4 => {
                      if ($("#img-4").get(0).files[0]){
                        $("#img-4").get(0).files[0].convertToBase64(function(base64){
                          img4 = base64;
                          data4(new Promise(data5 => {
                            if ($("#img-5").get(0).files[0]){
                              $("#img-5").get(0).files[0].convertToBase64(function(base64){
                                img5 = base64;
                                console.log("got data");
                                data5("Success");
                              })
                            } else {
                              img5 = "none";
                              data5("Success");
                            }
                          }))
                        })
                      } else {
                        img4 = "none";
                        img5 = "none";
                        data4("Success");
                      }
                    }))
                  })
                } else {
                  img3 = "none";
                  img4 = "none";
                  img5 = "none";
                  data3("Success");
                }
              }))
            })
          } else {
            img2 = "none";
            img3 = "none";
            img4 = "none";
            img5 = "none";
            data2("Success");
          }
        }))
        }); // fetch
      })
    } else {
      img1 = "none";
      img2 = "none";
      img3 = "none";
      img4 = "none";
      img5 = "none";
      data("Success");
    }
  })
}
function updateUserImages(){
  console.log("go data");
  getimagedata().then(val => {
    console.log("go logs");
    if (verifyPass()){
      console.log("logging");
      console.log(img1);
      console.log(img2);
      console.log(img3);
      console.log(img4);
      console.log(img5);
      console.log("ajax start");
      $.ajax({
          url: '/user/updateImages',
          type: "GET",
          data: {
              'img1': img1,
              'img2': img2,
              'img3': img3,
              'img4': img4,
              'img5': img5
          },
          success: function(data) {
              console.log("updated Images");
              console.log(data);
              updateUserAddress();
            },
            error: function(xhr) {
              console.log(xhr);
            }
        })
    }
  })
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