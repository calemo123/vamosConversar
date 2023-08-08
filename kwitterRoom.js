var firebaseConfig = { apiKey: "AIzaSyD-4rJhhVJWTCzZyh6e1OWiRxLm3FE1VHU", authDomain: "pedro-3bb87.firebaseapp.com", databaseURL: "https://pedro-3bb87-default-rtdb.firebaseio.com", projectId: "pedro-3bb87", storageBucket: "pedro-3bb87.appspot.com", messagingSenderId: "677570597325", appId: "1:677570597325:web:30242a742cf5dadec03484", measurementId: "G-2M9FES4RSD" };
firebase.initializeApp(firebaseConfig);
  userName = localStorage.getItem("userName");

document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";

function addRoom()
{
  roomName = document.getElementById("roomName").value;

  firebase.database().ref("/").child(roomName).update({
    purpose : "adicionar nome de sala"
  });

    localStorage.setItem("roomName", roomName);
    
    window.location = "kwitterPage.html";
}

function getData() 
{
    firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = "";
 snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       roomNames = childKey;
       console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("roomName", name);
    window.location = "kwitterPage.html";
}

function logout() {
localStorage.removeItem("userName");
localStorage.removeItem("roomName");
    window.location = "index.html";
}
