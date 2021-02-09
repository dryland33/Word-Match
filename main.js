let correctCards = 0;
$( init );

function init(){

  // Create the card pile
  let pictures = [ 
    {'pic': '<img src="images/bat.png" />', 'num': 0}, 
    {'pic': '<img src="images/bit.png" />', 'num': 1}, 
    {'pic': '<img src="images/bot.jpg" />', 'num': 2}, 
    {'pic': '<img src="images/butt.gif"/>', 'num': 3} ]; 
  
  // Randomize pictures   
  for(let i = pictures.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * i);
    const temp = pictures[i];
    pictures[i] = pictures[j];
    pictures[j] = temp;
  }

  for ( let i=0; i<4; i++ ) {
    $('<div>' + pictures[i].pic + '</div>').data( 'number', pictures[i].num ).attr( 'id', 'card'+i ).appendTo( '#cardPile' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
  }

  // Create the card slots
  let words = [ 'bat', 'bits', 'bot', 'butt' ];
  
  for ( let i=0; i<4; i++ ) {
    $('<div>' + words[i] + '</div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
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
    $('#cardPile').html('<div style="width: 100%"><img src="images/minions.gif"></div>');
  }
     
}