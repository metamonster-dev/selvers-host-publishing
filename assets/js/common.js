$(function () {
    /* lnb01 */
    /* $('.lnb01 .depth01').on('click', function () {
        $(this).toggleClass('active')

        if ($(this).hasClass('active')) {
            $(this).closest('li').find('.depth02_list').addClass('active')
        } else {
            $(this).closest('li').find('.depth02_list').removeClass('active')
        }
    }) */
    /* $('.lnb01 .depth02').on('click', function () {
        $('.lnb01 .depth02').removeClass('active')
        $(this).addClass('active')
    }) */

    /* lnb02 */
    $('.lnb02 .depth01').on('click', function () {
        $('.lnb02 .depth01').removeClass('active');
        $('.lnb02 .depth02_list').removeClass('active');
        $(this).addClass('active')

        if ($(this).hasClass('active')) {
            $(this).closest('li').find('.depth02_list').addClass('active')
        } else {
            $(this).closest('li').find('.depth02_list').removeClass('active')
        }
    })
    $('.lnb02 .depth02').on('click', function () {
        $('.lnb02 .depth02').removeClass('active')
        $(this).addClass('active')
    })

    /* 큰사이즈 date input */
    $('.date_inp_wrap input[type="date"]').on('change', function () {
        $(this).siblings('input[type="text"]').val($(this).val())
    })

    /* 큰사이즈 checkbox 필수 여부 선택 */
    $('.required_toggle_btn').on('click', function () {
        let required = $(this).closest('.checkbox02').find('input').attr('required')
        $(this).closest('.checkbox02').find('input').attr('required', !required)
    })

    /* 큰사이즈 num input */
    $('.num_inp_wrap .increase, .num_inp_wrap .decrease').on('click', function(){
        let input = $(this).siblings('input')
        let val = input.val()
        if($(this).hasClass('increase')){
            input.val( input.val()*1 + 1 )
        }
        if($(this).hasClass('decrease') && val > 0){
            input.val( input.val()*1 - 1 )
        }
    })


    // 이벤트 버블링 차단
    $('.checkbox').on('click', function(event){
        event.stopPropagation()
    })


});

let timer;
let action_pop = {
    alert : function(option){
        let {title, callback} = option;
        let alertUi = `
            <div class="modal_wrap alert">
                <div class="dim_layer"></div>
                <div class="modal_inner">
                    <button class="modal_close"></button>
                    <div class="modal_body">
                        <div class="modal_tit">${title}</div>
                    </div>
                    <div class="modal_btn">
                        <button class="confirm_btn">확인</button>
                    </div>
                </div>
            </div>
        `;
        $("body").append(alertUi)

        $(document).on("click", ".alert .modal_close", function () {
            $('.modal_wrap.alert').remove();
        })
        $(document).on("click", ".alert .close_btn", function () {
            $('.modal_wrap.alert').remove();
        })
        $(document).on("click", ".alert .confirm_btn", function () {
            callback(true);
            $('.modal_wrap.alert').remove();
        })
    },
    confirm : function(option){
        let {title, callback} = option;
        let confirmUi = `
            <div class="modal_wrap confirm">
                <div class="dim_layer"></div>
                <div class="modal_inner">
                    <button class="modal_close"></button>
                    <div class="modal_body">
                        <div class="modal_tit">${title}</div>
                    </div>
                    <div class="modal_btn">
                        <button class="confirm_btn">확인</button>
                        <button class="close_btn">취소</button>
                    </div>
                </div>
            </div>
        `;
        $("body").append(confirmUi)

        $(document).on("click", ".confirm .modal_close", function () {
            $(this).unbind("click");
            $('.modal_wrap.confirm').remove();
        })
        $(document).on("click", ".confirm .close_btn", function () {
            $(this).unbind("click");
            $('.modal_wrap.confirm').remove();
        })
        $(document).on("click", ".confirm .confirm_btn", function () {
            $(this).unbind("click");
            callback(true);
            $('.modal_wrap.confirm').remove();
        })

    },
    toast : function(title){
        if(timer){
            clearTimeout(timer)
        }
        let toastUi = `
            <div class="toast_pop">${title}</div>
        `
        $("body").append(toastUi)

        timer = setTimeout(function(){
            $('.toast_pop').remove()
        }, 3000)
    }
}