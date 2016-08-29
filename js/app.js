var variable = firebase.database().ref('query');
var lossVal = firebase.database().ref();

// Graph Array

// var graphs = [
//   'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
//   'q','r','s','t','u','v','w','x','y','z',
//
//   'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',
//   'Q','R','S','T','U','V','W','X','Y'
// ]

var graphs = [
  'Y','X','W','V','U','T','S','R','Q','P','O','N','M','L','K','J',
  'I','H','G','F','E','D','C','B','A',

  'z','y','x','w','v','u','t','s','r','q','p','o','n','m','l','k',
  'j','i','h','g','f','e','d','c','b','a',' '
]

// Bounty and Graph Function
// _____________________________________________________________________________

// OnLoad Update Bounty and Graph

lossVal.once("value")
  .then(function(snapshot) {
    var name = snapshot.child('penalty').val(); // {loss value}

    var graphsDisplay = name - 1;

    var circles = graphs[graphsDisplay]

    document.getElementById("lossValue").innerHTML=circles;
  });

// Auto-Update Bounty and Graph

lossVal.on('child_changed', function(data) {
  // var lossName = data.child("/val").val();
  console.log("New Value " + data.val());

  // working with zero index so subtract one
  var graphsDisplay = data.val() - 1;

  var circles = graphs[graphsDisplay]

  document.getElementById("lossValue").innerHTML=circles;

  // lossName.onChange = function() {
  //   document.getElementById("lossValue").innerHTML=lossName;
  //   console.log(lossName);
  // }
});


// function writeUp() {
//   lossVal.set( + 1)
//     .then(function() {
//       console.log('Synchronization succeeded');
//     })
//     .catch(function(error) {
//       console.log('Synchronization failed');
//     });
// }
//


// Search Function
// _____________________________________________________________________________

function writeUserData() {
  variable.set({ val: document.getElementById("search").value })
    .then(function() {
      console.log('Synchronization succeeded');
    })
    .catch(function(error) {
      console.log('Synchronization failed');
    });
}


// window.onload = function() {
//   firebase.database().ref('query/val').once('value').then(function(snapshot) {
//     var Value = snapshot.val();
//     document.getElementById("qry").innerHTML=Value;
//     // ...
//   });
//        //when the document is finished loading, replace everything
//        //between the <a ...> </a> tags with the value of splitText
//
// }
