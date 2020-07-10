var allMessages = new Array();
function submitBtnFn(id2){
  var message = $("#inputMessage").val()
  $.ajax({
    url: '/message/send',
    data: { 
      "message": message,
      "userid2": id2
    },
    type: "GET",
    success: function(data) {
      updateMessages(1,id2);
    },
    error: function(xhr) {
      console.log(xhr);
    }
  });
}
$.LoadingOverlaySetup({
  background      : "rgba(0, 0, 0, 0.5)",
  image           : "",
  fontawesome     : "fa fa-cog fa-spin"
});
matchedUsers();
function matchedUsers(){
  $("#matchedUsers").empty();
  $("#matchedUsers").LoadingOverlay("show");
  $.ajax({
    method: 'POST',
    url: '/user/getAllUsers',
    contentType: "application/json;charset=UTF-8",
    dataType: "json",
    success: function(data) {
      console.log(data);
      data.forEach(row => {
          getMatchedUser(row);
      });
      $("#matchedUsers").LoadingOverlay("hide", true);
    }
  });
}
function getMatchedUser(id){
  console.log(id);
  $.ajax({
    url: '/user/getMatchedUser',
    data: { 
      "userid": id
    },
    type: "GET",
    success: function(data) {
      console.log(data);
      addMatchedUser(data.userid,data.username,data.latestMessage);
    }
  });
}
//- a(class="list-group-item list-group-item-action active text-white rounded-0")
//-     div(class="media")
//-         img(src="https://i.pinimg.com/736x/5a/e2/a5/5ae2a545eb7bd167984c1dfc792e2776.jpg" alt="user" width="50" class="rounded-circle")
//-         div(class="media-body ml-4")
//-             div(class="d-flex align-items-center justify-content-between mb-1")
//-                 h6(class="mb-0") Neko
//-                 small(class="small font-weight-bold") 25 Dec
//-             p(class="font-italic mb-0 text-small") Just some bull
function addMatchedUser(userid,username,latestMessage){
  var a = $("<a>", {"class": "list-group-item list-group-item-action active text-white rounded-0","onclick": "updateMessages(1,"+userid+")"});
  $("#matchedUsers").append(a);
  var div = $("<div>", {"class": "media"});
  a.append(div);
  var img = $("<img>", {"src": "https://i.pinimg.com/736x/5a/e2/a5/5ae2a545eb7bd167984c1dfc792e2776.jpg", "alt": "user", "width": "50", "class": "rounded-circle"});
  div.append(img);
  var div2 = $("<div>", {"class": "media-body ml-4"});
  div.append(div2);
  var div3 = $("<div>", {"class": "d-flex align-items-center justify-content-between mb-1"});
  div2.append(div3);
  var h6 = $("<h4>", {"class": "mb-0", "id": "user"+userid});
  h6.html(username);
  div3.append(h6);
  var small = $("<small>", {"class": "small font-weight-bold"});
  small.html(username);
  div3.append(small);
  var p = $("<p>", {"class": "font-italic mb-0 text-small", "id": "chat"+userid});
  p.html(latestMessage);
  div2.append(p);
}
function updateMessages(id1,id2){
  allMessages = new Array();
  $("#chatDisplay").LoadingOverlay("show");
  $("#chatDisplay").empty();
  $("#submitArea").empty();
  addSubmitbtn(id2);
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
      addSentMessage(message);
    } else {
      addReceivedMessage(message);
    }
  })
  $("#chatDisplay").LoadingOverlay("hide", true);
}


function addSentMessage(message){
  var div = $("<div>", {"class": "media ml-auto w-50 mb-3"});
  $("#chatDisplay").append(div);
  var div2 = $("<div>", {"class": "media-body"});
  div.append(div2);
  var div3 = $("<div>", {"class": "bg-primary rounded py-2 px-3 mb-2"});
  div2.append(div3);
  var p = $("<p>", {"class": "text-small mb-0 text-white"});
  p.html(message.message);
  div3.append(p);
  var p2 = $("<p>", {"class": "small text-muted"});
  p2.html(message.date.slice(0,24));
  div2.append(p2);
}
function custom_sort(a, b) {
  return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
}

function addSubmitbtn(id){
    var div = $("<button>", {"class": "btn btn-link", "id": "button-addon2", "type": "submit", "onclick": "submitBtnFn("+id+")"});
    $("#submitArea").append(div);
    var img = $("<i>", {"class": "fa fa-paper-plane"});
    div.append(img);                                  
}

function addReceivedMessage(message){
  var div = $("<div>", {"class": "media w-50 mb-3"});
  $("#chatDisplay").append(div);
  var img = $("<img>", {"src": "https://i.pinimg.com/736x/5a/e2/a5/5ae2a545eb7bd167984c1dfc792e2776.jpg", "alt": "user", "width": "50", "class": "rounded-circle"});
  div.append(img);
  var div2 = $("<div>", {"class": "media ml-3"});
  div.append(div2);
  var div3 = $("<div>", {"class": "bg-light rounded py-2 px-3 mb-2"});
  div2.append(div3);
  var p = $("<p>", {"class": "text-small mb-0 text-muted"});
  p.html(message.message);
  div3.append(p);
  var p2 = $("<p>", {"class": "small text-muted"});
  p2.html(message.date.slice(0,24));
  div2.append(p2);
}