(function($) {

  var APP_STATES = ['sHook','sContext','sAccept','sMap','sArrive','sSoWhat','sEmail'];
  var INITIAL_STATE_IDX = 0

  var currentState = null
  var currentIdx = null

  var emailCapture = firebase.database().ref('emails/strawberries');


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

  function runTimedModals() {
    setTimeout(function() {
      console.log('Modal 1 is running')
      $('#Alert1').modal('show');

      setTimeout(function() {
        console.log('Modal 1 closes')
        $('#Alert1').modal('hide');

        setTimeout(function() {
          console.log('Modal 2 is running')
          $('#Alert2').modal('show');

          setTimeout(function() {
            console.log('Modal 2 closes')
            $('#Alert2').modal('hide');

          }, 5000)
        }, 5000)
      }, 5000)
    }, 7000)
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
    runTimedModals();
  }

  function emergencyExit() {
    location.reload();
  }

  function complete() {
    // Capture email
    emailCapture.push({ val: document.getElementById("emailInput").value })
      .then(function() {
        console.log('Synchronization succeeded');
      })
      .catch(function(error) {
        console.log('Synchronization failed');
      });

    // Increment to track position

    setTimeout(function() {
      console.log('I am done!')
      initializeApp()
    }, 2000)
  }

  // Expose the APIs
  window.App = {
    advance: advanceState,
    advanceToTrasit: advanceToTransitState,
    quit:emergencyExit,
    complete: complete
  }

  // Init the app
  initializeApp()

})(jQuery)
