$(document).ready(function() {
    let blocks = [];
    let cont = true;
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''];
    let steps = 0;
    let size = 90;
    let timer, time, pause;

    // run game
    generate();
    startTimer();

    // to make blocks behind our main blocks
    function backgroundBlocks() {
        for (let row = 0; row <= 3; row++) {
            for (let col = 0; col <= 3; col++) {
                $('#blocks').append(`<div class="block_behind bl-${row}-${col}"></div>`);
                $(`.bl-${row}-${col}`).css('height', `${size}px`).css('width', `${size}px`);
                $(`.bl-${row}-${col}`).css('top', `${row*size}px`);
                $(`.bl-${row}-${col}`).css('left', `${col*size}px`);
            }
        }
    }

    // to generate blocks with numbers and check if its need to be win combination or random
    function generate(winComb = 'false') {
        let arrNums = [];
        stepCount(0);
        arrNums = arr.map(function(el) {
            return el;
        });
        if (winComb != 'true') {
            arrNums.sort(function(a, b) {
                if (Math.random() > 0.5) {
                    return 1
                } else {
                    return -1
                }
            });
        }

        $('#blocks').html('');
        backgroundBlocks();

        let index = 0;
        for (let row = 0; row <= 3; row++) {
            for (let col = 0; col <= 3; col++) {

                $('#blocks').append(`<div id="block-${row}-${col}"></div>`);
                blocks[index] = $(`#block-${row}-${col}`);

                if (arrNums[index] === '') {
                    blocks[index].addClass('empty');
                } else {
                    blocks[index].addClass('block').html(`${arrNums[index]}`);
                }

                blocks[index].css('height', `${size}px`).css('width', `${size}px`);
                blocks[index].css('top', `${row*size}px`);
                blocks[index].css('left', `${col*size}px`);
                index++
            }
        }
        checkWin();
    }

    $('#blocks').delegate("div", "click", function() {
        let emptyId = $(`.empty`).attr('id');
        let clickedValue = $(`#${this.id}`).html();
        let tempParam = {
            top: $(`#${this.id}`).css('top'),
            left: $(`#${this.id}`).css('left')
        }

        if (cont === true) {
            if (parseInt(tempParam.top) === parseInt($('.empty').css("top")) - size && parseInt($(`#${this.id}`).css("left")) === parseInt($('.empty').css("left"))) {
                swapBlock(this.id, clickedValue, emptyId, tempParam, {
                    top: `+=${size}`
                });
            } else if (parseInt(tempParam.top) === parseInt($('.empty').css("top")) + size && parseInt($(`#${this.id}`).css("left")) === parseInt($('.empty').css("left"))) {

                swapBlock(this.id, clickedValue, emptyId, tempParam, {
                    top: `-=${size}`
                });
            } else if (parseInt(tempParam.left) === parseInt($('.empty').css("left")) - size && parseInt($(`#${this.id}`).css("top")) === parseInt($('.empty').css("top"))) {
                swapBlock(this.id, clickedValue, emptyId, tempParam, {
                    left: `+=${size}`
                });
            } else if (parseInt(tempParam.left) === parseInt($('.empty').css("left")) + size && parseInt($(`#${this.id}`).css("top")) === parseInt($('.empty').css("top"))) {
                swapBlock(this.id, clickedValue, emptyId, tempParam, {
                    left: `-=${size}`
                });
            }
            checkWin();
        }
    });


    function stepCount(value) {
        $('.steps_counter').html(value);
    }

    function swapBlock(clicked, clickedValue, empty, originalValue, obj) {
        cont = false;
        pause = true;
        ++steps;
        stepCount(steps);
        $(`#${clicked}`).addClass('anim');
        $(`#${clicked}`).animate(obj, 350, function() {
            $(`#${empty}`).attr('class', 'block').html(`${clickedValue}`);
            $(`#${clicked}`).attr('class', 'empty').html('');
            $(`#${clicked}`).css('top', `${originalValue.top}`);
            $(`#${clicked}`).css('left', `${originalValue.left}`);
            cont = true;
            pause = false;
        });
    }

    function timerFunc() {
        time = '00:00';
        let m = '00';
        let s = 0;
        return function() {
            if (s >= 59) {
                s = 0;
                ++m;
                if (m < 10) m = "0" + m;
            } else {
                s++;
            }
            if (s < 10) s = "0" + s;
            time = `${m}:${s}`;
            $('.timer').html(time);
        };
    }

    function startTimer() {
        timer = setInterval(timerFunc(), 1000);
    }

    function stopTimer() {
        steps = 0;
        $('.timer').html(`00:00`);
        clearTimeout(timer);
    }

    function checkWin() {
        let win = true;
        for (let i = 0; i < arr.length; i++) {
            if (blocks[i].html() != arr[i]) {
                win = false;
            }
        }

        if (win === true) {
            cont = false;
            $('.timer').html(time);
            $('#blocks').append(`<div class="win_block"><div>CONGRATULATIONS! YOU HAVE WON!</div><div>Time: ${time}</div> <div>Steps:${steps}</div></div>`);
            stopTimer();
            $('.win_block').append('<div class="win_close"></div>').click(function() {
                $('.win_block').remove();
            });
        }
    }

    $('.win').click(function() {
        if (pause !== true) {
            generate('true');
        }
    });

    $('.new_game').click(function() {
        if (pause !== true) {
            cont = true;
            stopTimer();
            generate('false');
            startTimer();
        }
    });
});