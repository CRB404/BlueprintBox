(function($) {

  var APP_STATES = ['sHook','sContext','sAccept','sEmail'];
  var INITIAL_STATE_IDX = 0

  var currentState = null
  var currentIdx = null

  var variable = firebase.database().ref('emails');

  // Input Email Function
  // _____________________________________________________________________________

  function writeUserData() {
    variable.push({ val: document.getElementById("search").value })
      .then(function() {
        console.log('Synchronization succeeded');
      })
      .catch(function(error) {
        console.log('Synchronization failed');
      });
  }

  function hideAllStates() {
    $("[id^=s]").css({ "display": "none" })
  }

  function showState(state) {
    $("#" + state).css({ "display": "block" })
  }

  // Exposed
  function advanceState() {
    // hide the current view
    $("#" + currentState).css({ "display": "none" })
    // increment the index and set the new state
    currentIdx++;
    currentState = APP_STATES[currentIdx];
    showState(currentState);
  }

  function setState(state) {
    hideAllStates()
    showState(state)
  }

  function resetState() {
    currentIdx = INITIAL_STATE_IDX
    currentState = APP_STATES[INITIAL_STATE_IDX];
  }

  function complete() {
    // log to firebase
    // do some other stuff
    setTimeout(function() {
      console.log('I am done!')
      initializeApp()
    }, 3000)
  }

  // Internal init functions
  function initializeApp() {
    resetState()
    setState(currentState)
  }
  initializeApp()

  // explicitly place this on the window
  window.App = {
    advance: advanceState,
    complete: complete
  }

})(jQuery)
