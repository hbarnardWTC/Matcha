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
        // $("#password").attr("placeholder",data.password);
        // $("#pwconfirm").attr("placeholder",data.password);
        // $("#address").attr("placeholder",data.address);
        $("#sp option[value="+data.sexualPreference+"]").attr("selected", "selected");
        // image section
        $("#interest").attr("placeholder",data.interests);
        $("#bio").attr("placeholder",data.bio);
        $("#gender option[value="+data.gender+"]").attr("selected", "selected");
      },
      error: function(xhr) {
        console.log(xhr);
      }
    });
  }

function updateUserInfo(){
    var sp = $("#sp").children("option:selected").val();
    var gender = $("#gender").children("option:selected").val();
    $.ajax({
        url: '/',
        type: "GET",
        data: {
            'name': $("#name").val(),
            'surname': $("#surname").val(),
            'username': $("#username").val(),
            'email': $("#email").val(),
            'password': $("#password").val(),
            'pconfirm': $("#pwconfirm").val(),
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

getUserDetails();