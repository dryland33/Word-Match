let correctCards = 0;
$( init );

function init(){

  // Create the card pile 
  let numbers = [ 1, 2, 3, 4 ];

  for ( let i=0; i<4; i++ ) {
    $('<div>' + numbers[i] + '</div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
  }

  // Create the card slots
  let words = [ 'one', 'two', 'three', 'four' ];
  for ( let i=1; i<=4; i++ ) {
    $('<div>' + words[i-1] + '</div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }

}

function handleCardDrop(event, ui) {
  
  //Grab the slot number and card number
  var slotNumber = $(this).data('number');
  var cardNumber = ui.draggable.data('number');
    
  //If the cards was dropped to the correct slot,
  //position it directly on top of the slot 
  //and prevent it being dragged again
  if (slotNumber === cardNumber) {
    ui.draggable.draggable('disable');
    $(this).droppable('disable');
    ui.draggable.position({
      of: $(this), my: 'left top', at: 'left top'
    });
    //This prevents the card from being
    //pulled back to its initial position
    //once it has been dropped
    ui.draggable.draggable('option', 'revert', false);
    correctCards++; //increment keep track correct cards
  }
    
  //If all the cards have been placed correctly then
  //display a message 
  if (correctCards === 4) {
    $('#cardPile').html('SUCCESS!!!');
  }
     
}