console.log( 'js' );
let events=[];
const weekday = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] //assign weekday values to use for getDay()

//onready function for when page loads
$( document ).ready( function(){
  console.log( 'JQ' );
  // fetch('/api/tweets/1',
  //             { method: 'GET',
  //               mode: 'no-cors',
  //                               }
  //             ).then( response => response.json()

  //             ).then(data=> {
  //                 console.log('tweet ids:',data);

  //                 for(let i=0;i<data.length;i++){
  //                     console.log('tweet id', data[i].tweet_id);
                      
  //                     fetch('/api/tweets/1/' + data[i].tweet_id,
  //                     { method: 'GET',
  //                     mode: 'no-cors',
  //                                     }

  //                     ).then(response=> response.text()
                      
  //                     ).then(html => {console.log('this is the tweet html', html)
                                      
  //                         let tweetContainer = document.getElementById('viewTweets');
  //                         console.log(tweetContainer);

  //                         let tweetDiv = document.createElement('div');
  //                         console.log(html);

  //                         tweetDiv.innerHTML = html;
  //                         // console.log(tweetLi);
  //                         tweetContainer.append(tweetDiv);

  //                     })

  //                 }}
  //                     ).catch((error) => {console.error('Error fetching embed html', error);}

  //             ).catch( error => console.error('Error fetching tweet ID', error) )

}); // end doc ready


//handler for add and transfer buttons
function setupClickListeners() {
    $( '#addButton' ).on( 'click', function(){
      console.log( 'in addButton on click' );
      // get user input and put in an object
      // using a test object
      let eventToSend = {
        day: 'testName',
        date: 'testName',
        time: 'testName',
        name: 'testName',
        notes: 'testName',
        complete: 'testName',
      };
      // call saveEvent with the new obejct
      saveEvent( eventToSend );
    }); 
  
    $( '#viewEvents' ).on( 'click', '.editEventButton', editEvent );
    $( '#viewEvents' ).on( 'click', '.deleteEventButton', deleteEvent );  
  }

  //function to get events and display on the DOM
function getEvents(){
    console.log( 'in getEvents' );
    // ajax call to server to get events
    $.ajax({
      type: 'GET',
      url: '/events'
  }).then( function( response ){
      console.log( 'back from GET:', response );
      let el = $( '#viewEvents' );
      el.empty();
      events = response;
      for (let i = 0; i < response.length; i++) {
        // in our button we are using "data-id" to hold the id of each event
        //append complete button to new/incomplete events
        if(response[i].complete=='N'){
        el.append(`<tr class = "incomplete">
                  <th>${response[i].day}</th>
                  <th>${response[i].date.split("T")[0].split("-",3)[1]}/${response[i].date.split("T")[0].split("-",3)[2]}/${response[i].date.split("T")[0].split("-",3)[0]}</th>
                  <th>${response[i].time.split(":",3)[0]}:${response[i].time.split(":",3)[1]}</th>
                  <th>${response[i].name}</th>
                  <th>${response[i].notes}</th>
                  <th>
                  <button class="editEventButton" data-index=${ i }>Mark Complete</button>
                  </th>
                  <th>
                  <button class="deleteEventButton" data-id=${response[i].id}>Delete</button>
                  </th>
                  </tr>`)
      }else{
        el.append(`<tr class="thead-dark">
                  <th><s>${response[i].day}</s></th>
                  <th><s>${response[i].date.split("T")[0].split("-",3)[1]}/${response[i].date.split("T")[0].split("-",3)[2]}/${response[i].date.split("T")[0].split("-",3)[0]}</s></th>
                  <th><s>${response[i].time.split(":",3)[0]}:${response[i].time.split(":",3)[1]}</s></th>
                  <th><s>${response[i].name}</s></th>
                  <th><s>${response[i].notes}</s></th>
                  <th><span>&#10003;</span></th>
                  <th>                  
                   <button class="deleteEventButton" data-id=${response[i].id}>Delete</button>
                  </th>
                  </tr>`)
  
      }
    }
})
}

//function to add new Event
function saveEvent (newEvent){
    console.log( 'in saveEvent ', newEvent );
    
    //exit function if name input is blank
    if($( '#nameIn' ).val()===''){
      alert('no worky');
      return false;
    }
    //add user inputs for new event. use getDay() to get day of the week
    const eventToSend = {
      day:  weekday[new Date($( '#dateIn' ).val()).getDay()],
      date: $( '#dateIn' ).val(),
      time: $( '#timeIn' ).val(),
      name: $( '#nameIn' ).val(),
      notes: $( '#notesIn' ).val(),
      complete: 'N'
    //   complete: $( '#completeIn' ).val()
  }
  //clear inputs
  $( '#dayIn' ).val('')
  $( '#dateIn' ).val('')
  $( '#timeIn' ).val('')
  $( '#nameIn' ).val('')
  $( '#notesIn' ).val('')
//   $( '#completeIn' ).val('')

  console.log( 'sending:', eventToSend );
  // send the data to the server via POST
  $.ajax({
      type: 'POST',
      url: '/events',
      data: eventToSend
  }).then( function( response ){
      console.log( 'back from POST:', response );
      getEvents();
  }).catch( function( err ){
      console.log( err );
      alert( 'no worky' );
  }) // end AJAX
  
  }//end saveEvent
  
  //function for editiing transfer event data
  function editEvent(){
    console.log( 'in editEvent:', $( this ).data( 'index' ) );
    const editEvent = events[ $( this ).data( 'index' ) ];
    console.log( 'the event u want is:', editEvent  );
  
      // get user input and place in an object to send
    $( '#complete' ).val( editEvent.complete );
    editId = editEvent.id;
    console.log( 'in saveEvent' );
  
    //change transfer to "Y"
    let dataToSend = {new_complete: 'Y'}
    
    $.ajax({
        type: 'PUT',
        url: '/events/' + editId,
        data: dataToSend
    }).then( function( response ){
        console.log( 'back from PUT with:', response );
        getEvents();
    }).catch( function( err ){
        console.log( err );
        alert( 'nope...' );
    })
      }//end editEvent


function deleteEvent() {
    console.log( 'in deleteEvent:', $( this ).data( 'id' ) );
    // send this to server via a delete request
    $.ajax({
        type: "DELETE",
        url: '/events/' + $( this ).data( 'id' )
    }).then( function( response ){
        console.log( 'back from delete with:', response );
        getEvents();
    }).catch( function( err ){
        console.log( err );
        alert( 'problem!' );
    })
}
