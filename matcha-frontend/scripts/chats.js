var allMessages = new Array();
$("#chatSubmit").click(function(){
  var message = $("#chatInput").val()
  $.ajax({
    url: '/message/send',
    data: { 
      "message": message
    },
    type: "GET",
    success: function(data) {
      updateMessages(1,2);
    },
    error: function(xhr) {
      console.log(xhr);
    }
  });
});
matchedUsers();
function matchedUsers(){
  $.ajax({
    method: 'POST',
    url: '/user/getAllUsers',
    contentType: "application/json;charset=UTF-8",
    dataType: "json",
    success: function(data) {
      data.forEach(row => {
        if (row.userid_1 == 1){
          getMatchedUser(row.userid_2);
        }
      });
    }
  });
}
function getMatchedUser(id){
  $.ajax({
    url: '/user/getMatchedUser',
    data: { 
      "userid": id
    },
    type: "GET",
    success: function(data) {
      addMatchedUser(data.userid,data.username,data.latestMessage);
    }
  });
}
function addMatchedUser(userid,username,latestMessage){
  var div = $("<div>", {"class": "chat", "id": "divid"+userid, "onclick": "updateMessages(1,"+userid+")"  });
  $("#matches").append(div);
  var h4 = $("<h4>", {"class": "username", "id": "user"+userid});
  h4.html(username);
  var p = $("<p>", {"class": "latestChat", "id": "chat"+userid});
  p.html(latestMessage);
  div.append(h4);
  div.append(p);
}
updateMessages(1,2);
function updateMessages(id1,id2){
  allMessages = new Array();
  $("#chatDisplay").empty();
  $.ajax({
    method: 'GET',
    url: '/message/getMessages',
    data: { 
      "userid_1": id1,
      "userid_2": id2
    },
    contentType: "application/json;charset=UTF-8",
    dataType: "json",
    success: function(data) {
      console.log(data);
      var sr = 0;
      data.forEach(msg => {
        var msgs = JSON.parse(msg);
        msgs.forEach(val => {
          var newVal = {
            "message": val.message,
            "date": val.time,
            "type": sr
          }
          allMessages.push(newVal);
        })
        sr++;
      });
      sortMessages();
    }
  });
}
async function sortMessages(){
  console.log(allMessages);
  await allMessages.sort(function(a, b){ 
       return new Date(a.date) - new Date(b.date);
      });
  allMessages.forEach(message => {
    if (message.type == 0){
      addSentMessage(message.message);
    } else {
      addReceivedMessage(message.message);
    }
  })
}
function addSentMessage(message){
  var div = $("<div>", {"class": "chat"});
  $("#chatDisplay").append(div);
  var p = $("<p>", {"class": "sent message"});
  p.html(message);
  div.append(p);
}
function custom_sort(a, b) {
  return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
}

function addReceivedMessage(message){
  var div = $("<div>", {"class": "chat"});
  $("#chatDisplay").append(div);
  var p = $("<p>", {"class": "received message"});
  p.html(message);
  div.append(p);
}