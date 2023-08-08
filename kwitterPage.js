var firebaseConfig = { apiKey: "AIzaSyD-4rJhhVJWTCzZyh6e1OWiRxLm3FE1VHU", authDomain: "pedro-3bb87.firebaseapp.com", databaseURL: "https://pedro-3bb87-default-rtdb.firebaseio.com", projectId: "pedro-3bb87", storageBucket: "pedro-3bb87.appspot.com", messagingSenderId: "677570597325", appId: "1:677570597325:web:30242a742cf5dadec03484", measurementId: "G-2M9FES4RSD" };

    firebase.initializeApp(firebaseConfig);
      userName = localStorage.getItem("userName");
      roomName = localStorage.getItem("roomName");
  
function send()
{
msg = document.getElementById("msg").value;
firebase.database().ref(roomName).push({
 name:userName,
 message:msg,
 like:0
});

 document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot) { document.getElementById("output").innerHTML = "";
 snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       childData = childSnapshot.val(); if(childKey != "purpose") {
         firebaseMessageId = childKey;
         messageData = childData;
//Início do código
          console.log(firebaseMessageId);
          console.log(messageData);
          name = messageData['name'];
          message = messageData['message'];
          like = messageData['like'];
          nameWhitTag = "<h4>"+ name +" ✅</h4>";
          messageWhitTag="<h4 class='message_h4'>"+message+"</h4>";
          likeButton ="<button class='btn btn-warning'id="+firebaseMessageId+"value="+like+"onclick='updateLike(this.id)'>";
          spanWhithTag = "<span class='glyphicon glyphicon-thumbs-up'>like: "+like+"</span></button><hr>";

          row = nameWhitTag + messageWhitTag +likeButton+ spanWhithTag;
          document.getElementById("output").innerHTML += row;
//Fim do código
      } });  }); }
getData();

function updateLike(messageId)
{
  console.log("clicked on like button - "+messageId);
  buttonid = messageId;
  likes = document.getElementById(buttonid).value;
  updatelikes = Number(likes) +1;

    firebase.database().ref(roomName).child(messageId).update({
      like: updatelikes
    });
}

function logout ()
{
localStorage.removeItem("userName");
localStorage.removeItem("roomName");
window.location.replace("index.html")
}