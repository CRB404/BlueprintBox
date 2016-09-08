(function($) {

  var APP_STATES = ['sHook','sContext','sAccept','sMap','sAlert1','sEmail'];
  var INITIAL_STATE_IDX = 0

  var currentState = null
  var currentIdx = null

  var capture = firebase.database().ref('emails');

// Input Email Function
// _____________________________________________________________________________

  function writeUserData() {
    capture.push({ val: document.getElementById("search").value })
      .then(function() {
        console.log('Synchronization succeeded');
      })
      .catch(function(error) {
        console.log('Synchronization failed');
      });
  }

// Div Id Renderer | "Page Routing"
// _____________________________________________________________________________

  // App helpers and initializers
  function hideAllStates() {
    $("[id^=s]").css({ "display": "none" })
  }

  function showState(state) {
    $("#" + state).css({ "display": "block" })
  }

  function hideState(state) {
    $("#" + state).css({ "display": "none" })
  }

  function setState(state) {
    hideAllStates()
    showState(state)
  }

  function resetState() {
    currentIdx = INITIAL_STATE_IDX
    currentState = APP_STATES[INITIAL_STATE_IDX];
  }

  function initializeApp() {
    resetState()
    setState(currentState)
  }

  function runTimedModal() {
    setTimeout(function() {
      console.log('Modal is running')
      $('#sAlert1').modal('show');
      setTimeout(function() {
        console.log('Modal closes')
        $('#sAlert1').modal('hide');
      }, 6000)
    }, 10000)
  }

  // APIs
  function advanceState() {
    hideState(currentState)
    currentIdx++;
    currentState = APP_STATES[currentIdx];
    showState(currentState);
  }

  function advanceToTransitState() {
    hideState(currentState)
    currentIdx++;
    currentState = APP_STATES[currentIdx];
    showState(currentState);
    runTimedModal();
  }

  function complete() {
    // log to firebase
    // do some other stuff
    setTimeout(function() {
      console.log('I am done!')
      initializeApp()
    }, 3000)
  }

  // Expose the APIs
  window.App = {
    advance: advanceState,
    advanceToTrasit: advanceToTransitState,
    complete: complete
  }

  // Init the app
  initializeApp()

})(jQuery)
