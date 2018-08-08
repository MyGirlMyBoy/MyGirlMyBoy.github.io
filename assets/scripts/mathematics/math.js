var amount = 60; // 题目数量
var seconds = amount * 10; // 总时长
var index = 0;
var score = 0; // 总分数
var finishAhead = false;

function timing() {
    seconds -= 1;
    setTimeout('timing()', 1000);
    return seconds;
}

function gen(max) {
    var x = Math.floor(Math.random() * max);
    var y = Math.floor(Math.random() * max);
    if (x >= y) {
        var answer = x - y;
        var opt = '-';
    } else {
        answer = x + y;
        opt = '+';
    }
    return '<b id="' + (index++)
        + '" data-answer="' + answer + '"><i>' + x + '</i> ' + opt + ' <i>' + y + '</i> = '
        + '<input class="inputs">' + ' <img src="../assets/images/mathematics/check.svg"></b>';
}

$(function () {
    var imported = document.createElement('script');
    imported.src = 'assets/scripts/jspdf.min.js';
    document.head.appendChild(imported);

    var bg = Math.floor(Math.random() * 30);
    $('body').attr('style', 'background: url("../assets/images/mathematics/bg/' + bg + '.jpg"); background-size:cover;');

    $(window).on('load', function () {
        var date = new Date();
        var datetime = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()
            .replace('T', ' ')
            .replace('Z', '');
        $('title').text('Vicky - ' + 'Mathematics_' + datetime);
        $('#datetime').text(datetime);
        for (var i = 0; i < amount; i++) {
            $('#title').prepend(gen(20));
        }
        $('.inputs:first').focus();

        var timer = setInterval(function () {
            $('p').html('倒计时：<span>' + (--seconds) + '</span> 秒');
            // 已最后一题的正确完成判断为提前结束
            var last = $('b:last');
            if (last.attr('data-answer') === $.trim(last.find('input').val().toString())) {
                finishAhead = true;
            }
            if (seconds === 0 || finishAhead) {
                clearInterval(timer);
                $('input').prop('disabled', true);
                $('b').each(function () {
                    var answer = $(this).attr('data-answer');
                    var vicky = $.trim($(this).find('input').val());
                    if (vicky === answer) {
                        $(this).find('img').attr('src', '../assets/images/mathematics/check.svg');
                        score += 100 / amount;
                    } else {
                        $(this).find('img').attr('src', '../assets/images/mathematics/cross.svg')
                    }
                    $(this).find('img').attr('style', 'display:inline');
                });
                score = Math.round(score);
                if (score === 100) {
                    $('#score').text('Vicky 得了满分！');
                    $('.circle').show();
                } else {
                    $('#score').text(score + ' 分');
                }
                for (var i = 0; i < Math.floor(score / 20); i++) {
                    $('<img src="../assets/images/mathematics/star.png">').appendTo($('#stars')).fadeIn(3000);
                }
            }
        }, 1000);
    });

    $(document).on('keypress', '.inputs', function (e) {
        var inputs = $('.inputs');
        if (e.which === 32) {
            var index = inputs.index(this) + 1;
            inputs.eq(index).focus();
            inputs.eq(index).val('');
        }
    });

    // function save() {

    // $.getScript( "assets/scripts/jspdf.min.js", function( data, textStatus, jqxhr ) {
    //     console.log( "Load was performed." );
    // var doc = new jsPDF();
    // var specialElementHandlers = {
    //     '#container': function (element, renderer) {
    //         return true;
    //     }
    // };

    // $('#test').click(function () {
    //     doc.fromHTML($('#container').html(), 15, 15, {
    //         'width': 1000,
    //         'elementHandlers': specialElementHandlers
    //     }, function () {
    //         doc.save('sample-file.pdf');
    //     });

    // doc.fromHTML(tinymceToJSPDFHTML, 0, 0, {
    //     'width': 100, // max width of content on PDF
    //     'elementHandlers': specialElementHandlers
    // }, function (bla) {
    //     doc.save('saveInCallback.pdf');
    // }, margin);

    // });
    // });

    // }
});

