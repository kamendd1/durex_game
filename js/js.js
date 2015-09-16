/**
 * Created by Kamen on 15.9.2015 ã..
 */
var memory_array = ['pics/red.jpg','pics/red.jpg',
    'pics/blue.jpg','pics/blue.jpg',
    'pics/black.jpg','pics/black.jpg',
    'pics/grey.jpg', 'pics/grey.jpg',
    'pics/orange.jpg', 'pics/orange.jpg',
    'pics/pink.jpg','pics/pink.jpg',
    'pics/purple.jpg','pics/purple.jpg',
    'pics/yellow.jpg','pics/yellow.jpg',
    'pics/light-blue.jpg','pics/light-blue.jpg',
    'pics/love.jpg', 'pics/love.jpg'];

var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
};
function newBoard(){
    tiles_flipped = 0;
    var output = '';
    memory_array.memory_tile_shuffle();
    for(var i = 0; i < memory_array.length; i++){
        output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
    }
    $('#memory_board').html(output);
}
function memoryFlipTile(tile,val){
    if(tile.innerHTML == "" && memory_values.length < 2){
        tile.style.background = '#FFF';
        tile.innerHTML ='<img src="'+val+'" />';
        if(memory_values.length == 0){
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
        } else if(memory_values.length == 1){
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
            if(memory_values[0] == memory_values[1]){
                tiles_flipped += 2;
                // Clear both arrays
                memory_values = [];
                memory_tile_ids = [];
                // Check to see if the whole board is cleared
                if(tiles_flipped == memory_array.length){
                    toastr.success("Congratulations! You've won!");
                    $('#countdown').html('GOOD JOB!')
                        .addClass('hidden');
                    $('#memory_board').html('');
                    $('#winGame').removeClass('hidden');
                    newBoard();
                }
            } else {
                function flip2Back(){
                    // Flip the 2 tiles back over
                    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);
                    tile_1.style.background = 'url(pics/kapak.jpg) no-repeat';
                    tile_1.innerHTML = "";
                    tile_2.style.background = 'url(pics/kapak.jpg) no-repeat';
                    tile_2.innerHTML = "";
                    // Clear both arrays
                    memory_values = [];
                    memory_tile_ids = [];
                }
                setTimeout(flip2Back, 700);
            }
        }
    }
}

var seconds = 180;
function secondPassed() {
    var minutes = Math.round((seconds - 30)/60);
    var remainingSeconds = seconds % 60;
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }
    $('#countdown').html(minutes + ":" + remainingSeconds);
    if (seconds == 0) {
        clearInterval(countdownTimer);
        $('#countdown').html("Buzz Buzz");
        $('#loseGame').removeClass('hidden');
    } else {
        seconds--;
    }
}

var countdownTimer = setInterval('secondPassed()', 1000);