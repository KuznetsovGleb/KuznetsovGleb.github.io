$(function() {

    /* Animation events */

    var male = $('.maleButton');
    var female = $('.femaleButton');
    var nextPage = $('.submitButton');
    var checkbox = $('.checkbox');

    male.eq(0).click(function(e) {
        e.preventDefault();
        female.eq(0).removeClass('active femaleButtonWhite')
        $(this).addClass('active maleButtonWhite');
        $('#banner').addClass('eclipsed');
        $('.malePercent').css('display', 'block');;
        $('.femalePercent').css('display', 'none');;
        nextPage.eq(0).css({ "display": "block", "background-color": "#fcc150" });
        return false;
    });

    female.eq(0).click(function(e) {
        e.preventDefault();
        male.eq(0).removeClass('active maleButtonWhite')
        $(this).addClass('active femaleButtonWhite');
        $('#banner').addClass('eclipsed');
        $('.femalePercent').css('display', 'block');;
        $('.malePercent').css('display', 'none');;
        nextPage.eq(0).css("display", "block");
        return false;

    })

    nextPage.eq(0).click(function(e) {
        e.preventDefault();


        male.eq(0).removeClass('active maleButtonWhite')
        female.eq(0).removeClass('active femaleButtonWhite')
        $('#banner').removeClass('eclipsed');
        $('.malePercent').css('display', 'none');
        $('.femalePercent').css('display', 'none');
        nextPage.eq(0).toggle();

        $("html, body").animate({ scrollTop: $(document).height() }, 1500);

        return false;
    })

    male.eq(1).click(function(e) {
        e.preventDefault();
        female.eq(1).removeClass('activeBlue femaleButtonWhite')
        $(this).addClass('activeBlue maleButtonWhite');

        validateForm();
    })

    female.eq(1).click(function(e) {
        e.preventDefault();
        male.eq(1).removeClass('activeBlue maleButtonWhite')
        $(this).addClass('activeBlue femaleButtonWhite');

        validateForm();
    })



    /*  Less height for second page form  */

    if ($('.secondPage').height() < 740) {
        $('.secondPage .rightSection').css('padding-top', '6%');
        $('.secondPage .submitButton').css('padding', '5px 40px');
        $('.dataInput').height(35);
        $('.secondPage button').height(45);
    }

    /* Validation Form */


    var nFlag;
    var eFlag;
    var pFlag;

    function validateForm() {
        if ((nFlag & eFlag & pFlag) && (male.eq(1).hasClass("activeBlue") || female.eq(1).hasClass("activeBlue")) && (checkbox.prop('checked')) ) {
            nextPage.eq(1).css({ 'color': '#fff', 'background-color': '#1da7c0' });
        } else {
            nextPage.eq(1).css({ 'color': '#aaa9a9', 'background-color': '#fff' });
        };
    }

    $('#name, #email, #password').unbind().blur(function() {

        var id = $(this).attr('id');
        var val = $(this).val();

        switch (id) {

            case 'name':
                var rv_name = /^[a-zA-Zа-яА-Я]+$/;

                if (val.length > 2 && val != '' && rv_name.test(val)) {
                    $(this).addClass('notError');
                    nFlag = true;
                } else {
                    nFlag = false;
                    $(this).removeClass('notError');
                    $(this).val('')
                        .attr("placeholder", "Введите свое имя")
                        .css("border-color", "red");
                }
                break;

            case 'email':
                var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;

                if (val != '' && rv_email.test(val)) {
                    $(this).addClass('notError');
                    eFlag = true;
                } else {
                    eFlag = false;
                    $(this).removeClass('notError');
                    $(this).val('')
                        .attr("placeholder", "Неверный формат email")
                        .css("border-color", "red");
                }
                break;

            case 'password':
                var rv_password = /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{5,}/; /*(?=.*[A-Z])*/

                if (val != '' && rv_password.test(val)) {
                    $(this).addClass('notError');
                    pFlag = true;
                } else {
                    pFlag = false;
                    $(this).removeClass('notError');
                    $(this).val('')
                        .attr("placeholder", "Придумайте новый пароль")
                        .css("border-color", "red");
                };
                break;
        };
        validateForm();
    });

    $('#name, #email, #password').focus(function() {
        $(this).css("border-color", "#d3d3d3").attr("placeholder", "")
    });

    checkbox.click(function() {
        validateForm();
    });

    $('#registration-form').submit(function(e) {
        var id = $('#name, #email, #password');
              
        if (!validateForm()) {
            id.css('border-color', 'red');
            id.eq(0).attr("placeholder", "Введите свое имя");
            id.eq(1).attr("placeholder", "Неверный формат email");
            id.eq(2).attr("placeholder", "Придумайте новый пароль");
        }
        e.preventDefault();
    });


});