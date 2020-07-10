setInterval(() => {
    $.ajax({
      url: '/user/getNotifications',
      type: "GET",
      data: {
        "userid": "logged"
      },
      success: function(data) {
        console.log(data);
        $("#dropDiv12").empty();
        data.forEach(note => {
              var p = $("<p>", {"class": "dropdown-item size break"});
              p.html(note.user+note.action);
              $("#dropDiv12").append(p);
        })
      },
      error: function(xhr) {
        console.log(xhr);
      }
    });
  }, 10000);
  
  $.ajax({
    url: '/user/getNotifications',
    type: "GET",
    data: {
      "userid": "logged"
    },
    success: function(data) {
      console.log(data);
      data.forEach(note => {
        $("#dropDiv12").empty();
            var p = $("<p>", {"class": "dropdown-item size break"});
            p.html(note.user+note.action);
            $("#dropDiv12").append(p);
      })
    },
    error: function(xhr) {
      console.log(xhr);
    }
  });