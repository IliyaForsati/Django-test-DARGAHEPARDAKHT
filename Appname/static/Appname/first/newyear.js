$(document).ready(function() {

    $('#eyd-share').on('click', () => {
        if (navigator.share) {
            // var file = new File(["blob"], "./../images/eyd/card-full.jpg", {type: 'image/jpeg'});
            // var filesArray = [file];
            navigator.share({
                title: 'با هم بهار شویم',
                // files: filesArray,
                text: 'اگه دوس داری مثل من سلامتی رو به کودکان محک هدیه بدی الان وقتشه ...',
                url: 'https://mahak-charity.org/newyear',
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            console.log('Share not supported on this browser, do it the old way.');
        }
    });

    let copyText = document.querySelector(".block-eyd-copy");
    if (typeof(copyText) != 'undefined' && copyText != null){
        copyText.querySelector("#eyd-copy").addEventListener("click", function () {
            let input = copyText.querySelector("#eyd-input-copy");
            input.select();
            document.execCommand("copy");
            copyText.querySelector("#eyd-copy").innerText = 'کپی شد!';
            window.getSelection().removeAllRanges();
            setTimeout(function () {
                copyText.querySelector("#eyd-copy").innerText = 'کپی';
            }, 2500);
        });

    }

    $('.question').on('click', function(e) {
        $(this).next('.answer').stop().slideToggle();
        $(this).toggleClass('active');
    })

    if ($(window).width() < 767) {
        $(".gp-block").insertAfter('.crowd-mahak-logo');
    }
    else {
        $(".t-block").insertAfter('.gp-block');
    }


    // if($("#dl-eyd-image-back").length){
    //     var node = document.getElementById('postal-card');
    //     scale=2;
    //     domtoimage.toPng(node, {
    //         width: node.clientWidth * scale,
    //         height: node.clientHeight * scale,
    //         style: {
    //             transform: 'scale('+scale+')',
    //             transformOrigin: 'top left'
    //         }}).then(function (dataUrl) {
    //         $('#dl-eyd-image-back').attr('href',dataUrl);
    //     })
    //         .catch(function (error) {
    //             console.error('oops, something went wrong!', error);
    //         });
    // };

    $("#dl-eyd-image-back").on('click', function (e){
        e.preventDefault();
        Swal.fire({
            title: 'صبر کنید...',
            html: 'در حال تهیه ی تصویر کارت تبریک',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });
        var node = document.getElementById('#postal-card');

        html2canvas(document.querySelector("#postal-card")).then(canvas => {



            var link = document.createElement("a");
                link.setAttribute('download', "happy-new-year");
                link.href = canvas.toDataURL();
                debugger;
                document.body.appendChild(link);
                link.click();
                link.remove();
                swal.close();
        }).catch(function (error) {
                    console.error('oops, something went wrong!', error);
                });;

        // domtoimage.toPng(node).then(function (dataUrl) {
        //     $('#dl-eyd-image-back').attr('href',dataUrl);
        //     var link = document.createElement("a");
        //     link.setAttribute('download', "happy-new-year");
        //     link.href = dataUrl;
        //     document.body.appendChild(link);
        //     link.click();
        //     link.remove();
        //     swal.close();
        // })
        //     .catch(function (error) {
        //         console.error('oops, something went wrong!', error);
        //     });
    });

    $('.giver-choise').on('click', function(e) {
        $('input[name="to_me"]').val(e.target.dataset.meto);
        $('input[name="gifter_name"]').val('');
        $('input[name="gifter_phone"]').val('');
        $('input[name="giver_name"]').val('');
        $('input[name="wish"]').val('');
    })

    $('input[name="gifter_name"]').on('keyup' , function () {
        $('#el-title').html($('input[name="giver_name"]').val());
    })
    $('input[name="giver_name"]').on('keyup' , function () {
        $('#el-end').html($('input[name="gifter_name"]').val());
    })
    $('textarea[name="wish"]').on('keyup' ,function(event) {
        if ($('textarea[name="wish"]').val().length > 250) {
            event.preventDefault();
            alert("تعداد کاراکترهای آرزوی شما نباید بیشتر از 250 حرف باشد");
        }else {
            $('#wish').html($('textarea[name="wish"]').val());
        }
    })

    $("#newyear-days").on('keyup change',function (e) {
        $("#newyear-price").val(e.target.value*1);
        $("#newyear-price").click();
        $("#newyear-price").css('padding-left','62px');
    })

    $('.question').on('click', function(e) {
        $(this).next('.answer').stop().slideToggle();
        $(this).toggleClass('active');
    })

    $('.close-eyd-preview').on('click', function(e) {
        $('.blur-overlay').fadeOut();
        $('.eyd-preview').removeClass('active');
    })

    $('.el-preview').on('click', function(e) {
        $('.blur-overlay').fadeIn();
        $('.eyd-preview').addClass('active');
    })

    $("#e-name").keyup(function(){
        let content = $(this).val();
        $('#el-end').html(content);
    });

    $("#el-m").keyup(function(){
        let content = $(this).val();
        $('#el-text').html(content);
    });

    $("#er-name").keyup(function(){
        let content = $(this).val();
        $('#el-title').html(content);
    });

    $(".le-button").on('click', function() {

        $(".le-button").removeClass('active');
        $(this).addClass('active');

        $(".le-content").slideDown();

        if( $(".le-button.two").hasClass('active') ) {
            $('.lec-title').html('هدیه دادن به دیگران');
            $('.req-eyd').slideDown();
            $('.p-button').fadeIn(0);
        } else if( $(".le-button.one").hasClass('active') ) {
            $('.lec-title').html('هدیه دادن به خودم');
            $('.req-eyd').slideUp();
            $('.p-button').fadeOut(0);
        }

    });



});
//Days Percentage
const percentageDays = ($(".p-size").text() / 360).toFixed(1);
const strokeDashOffsetValueDays = 100 - (percentageDays * 100);
const progressBarDays = $(".js-progress-crowd");
//		progressBarDays.css("stroke-dashoffset", strokeDashOffsetValueDays);
if(document.getElementById('crowd-result')){
    const oTop = document.getElementById('crowd-result').offsetTop;
}else{
    const oTop = 0;
}
if(document.getElementById('MahakHubPage')){
    if (window.matchMedia('(max-width: 991px)').matches) {
        $('.grid-hub a.mahakhub-no-link').on('click', function() {
            $(this).toggleClass('active')
        })
    }
}

const hl = document.getElementById('hl');
if (hl != undefined){
    hl.addEventListener('scroll', scrollPage);
}
if ($('#hl').length > 0) {
    hl.addEventListener('scroll', scrollPage);
}

function scrollPage() {
    if(!(oTop - hl.scrollTop > window.innerHeight/2)) {
        progressBarDays.css("stroke-dashoffset", strokeDashOffsetValueDays);
    } else if(!(oTop - hl.scrollTop > window.innerHeight/1.25)) {
        progressBarDays.css("stroke-dashoffset", strokeDashOffsetValueDays);
        $('.ed-cloud-block').addClass('active');
        $('.ed-flower.tak').addClass('active');
        setTimeout(() => {
            $('.edfh1').addClass('active');
        }, "200")
        setTimeout(() => {
            $('.edfh2').addClass('active');
        }, "300")
        setTimeout(() => {
            $('.edfh3').addClass('active');
        }, "400")
        setTimeout(() => {
            $('.edfh4').addClass('active');
        }, "500")
    }
}

// Form
$("#click-forgot-shenaseh").on('click', function() {
    $(".shenaseh-block").stop().slideToggle().toggleClass('active');
});

const payForm = document.getElementById('public-pay-form');
const payErrorElement = document.getElementById('pay-error');

const phoneNumber = /^(\+98|0)?9\d{9}$/;
const nameValidation = /^[\u0600-\u06FF\s]+$/;
const justNumber = /^[0-9]+$/;
if(payForm){
    payForm.addEventListener('submit', (e) => {

        let messages = []

        if ( $(".le-button.two").hasClass('active') ) {
            if ( $('#e-name').val() === '' || $('#e-name').val() == null ) {
                messages.push('<span class="notice notice-error">نام فرد عیدی دهنده نشده است</span>');
            } else if ( !nameValidation.test($("#e-name").val()) ) {
                messages.push('<span class="notice notice-error">نام فرد عیدی دهنده استاندارد نیست</span>')
            }

            if ( $('#er-name').val() === '' || $('#er-name').val() == null ) {
                messages.push('<span class="notice notice-error">نام فرد عیدی گیرنده وارد نشده است</span>');
            } else if ( !nameValidation.test($("#er-name").val()) ) {
                messages.push('<span class="notice notice-error">نام فرد عیدی گیرنده استاندارد نیست</span>')
            }

            if ( $('#el-m').val() === '' || $('#el-m').val() == null ) {
                messages.push('<span class="notice notice-error">پیام و آرزو وارد نشده است</span>');
            }

        }

        if ( $('#public-pay-input').val() === '' || $('#public-pay-input').val() == null ) {
            messages.push('<span class="notice notice-error">مبلغ مورد نظر خود را وارد کنید</span>')
        } else if ( !justNumber.test($('#public-pay-input').val()) ) {
            messages.push('<span class="notice notice-error">مقدار مبلغ مورد نظر صحیح نیست!</span>')
        }

        if ( $('#shenaseh').val() !== '' && ($('#shenaseh').val().length !== 8 && $('#shenaseh').val().length !== 9 && $('#shenaseh').val().length !== 10) ) {
            messages.push('<span class="notice notice-error">شناسه هشت تا ده رقم است</span>');
        } else if ( $('#shenaseh').val() !== '' && !justNumber.test($("#shenaseh").val()) ) {
            messages.push('<span class="notice notice-error">شناسه باید فقط از اعداد باشد</span>')
        }

        if ( $('#pay-phone-number').val() === '' || $('#pay-phone-number').val() == null ) {
            messages.push('<span class="notice notice-error">شماره تلفن وارد نشده است</span>');
        } else if ( !phoneNumber.test($("#pay-phone-number").val()) ) {
            messages.push('<span class="notice notice-error">شماره تلفن استاندارد نیست</span>')
        }

        if ( $(".shenaseh-block").hasClass('active') ) {
            if ( $('#login-name').val() === '' || $('#login-name').val() == null ) {
                messages.push('<span class="notice notice-error">نام وارد نشده است</span>');
            } else if ( !nameValidation.test($("#login-name").val()) ) {
                messages.push('<span class="notice notice-error">نام استاندارد نیست</span>')
            }

            if ( $('#login-last-name').val() === '' || $('#login-last-name').val() == null ) {
                messages.push('<span class="notice notice-error">نام خانوادگی وارد نشده است</span>');
            } else if ( !nameValidation.test($("#login-last-name").val()) ) {
                messages.push('<span class="notice notice-error">نام خانوادگی استاندارد نیست</span>')
            }

        }

        if (messages.length > 0) {
            e.preventDefault();
            payErrorElement.innerHTML = messages.join('<br>');
        } else {
            e.preventDefault();

            setTimeout((e) => {
                e.currentTarget.submit();
            }, "5000")
        }


    })


}


