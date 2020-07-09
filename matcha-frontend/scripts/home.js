function updateUser() {
  $.ajax({
    url: '/user/getRandomUser',
    type: "GET",
    success: function(data) {
      console.log(data);
      $("#personName").html("Name: "+data.name);
      $("#personSurname").html("Surname: "+data.surname);
      $("#personAge").html("Age: "+data.age);
      $("#personDistance").html("Adress: ");
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
      getImages();
    },
    error: function(xhr) {
      console.log(xhr);
    }
  });
}
updateUser();

function getImages(){
  $.ajax({
    url: '/user/getUserImages',
    type: "GET",
    success: function(data) {
      console.log(data);
      $("#img1").attr("src",data[0].image1);
      $("#img2").attr("src",data[0].image2);
      $("#img3").attr("src",data[0].image3);
      $("#img4").attr("src",data[0].image4);
      $("#img5").attr("src",data[0].image5);
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