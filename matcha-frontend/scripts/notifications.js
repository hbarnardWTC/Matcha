setInterval(() => {
    $.ajax({
      url: '/user/getLikes',
      type: "GET",
      data: {
        "userid": "logged"
      },
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
              $("#dropDiv12").empty();
              var p = $("<p>", {"class": "dropdown-item size break"});
              p.html(data2.username+" Liked You!");
              $("#dropDiv12").append(p);
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
  }, 10000);
  
  $.ajax({
    url: '/user/getLikes',
    type: "GET",
    data: {
      "userid": "logged"
    },
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
            $("#dropDiv12").empty();
            var p = $("<p>", {"class": "dropdown-item size break"});
            p.html(data2.username+" Liked You!");
            $("#dropDiv12").append(p);
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