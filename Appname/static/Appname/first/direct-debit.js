 jQuery(document).ready(function($){

     $(".dd-label-port").on('click', function() {
         $(".dd-label-port").removeClass('active');
         $(this).addClass('active');
         checkDDPort()
     });

     function checkDDPort() {
         if($('#dd-wallet').hasClass('active')) {
             $('.select2').addClass('deactive')
         } else {
             $('.select2').removeClass('deactive')
         }
     }
     checkDDPort()

     // Close Modal
     $('.dd-close-modal').click(function(){
         $(".dd-modal").removeClass('active');
         $("body").removeClass('overflow-hidden');
         $(".overlay-light").fadeOut();
     })

     // Select2
     function formatState (state) {
         if (!state.id) { return state.text; }
         var $state = $(
             '<span><img src="' + $(state.element).attr('data-src') + '" class="img-flag" /> ' + state.text + '</span>'
         );
         return $state;
     };

     // $('select.default-select').select2({
     //     minimumResultsForSearch: Infinity,
     //     templateResult: formatState,
     //     templateSelection: formatState
     // });


     // Validation
     const payForm = document.getElementById('advanced-public-pay-form');
     if (payForm != undefined) {

         const payErrorElement = document.getElementById('pay-error');

         const phoneNumber = /^(\+98|0)?9\d{9}$/;
         const nameValidation = /^[\u0600-\u06FF\s]+$/;
         const justNumber = /^[0-9]+$/;

         payForm.addEventListener('submit', (e) => {
         const payMod = $('input[name=dd-port]:checked', '#advanced-public-pay-form').val();
         if (payMod == 'casual'){
             let messages = []

             if ($('#public-pay-input').val() === '' || $('#public-pay-input').val() == null) {
                 messages.push('<span class="notice notice-error">مبلغ مورد نظر خود را وارد کنید</span>')
             } else if (!justNumber.test($('#public-pay-input').val().replaceAll(',', ''))) {
                 messages.push('<span class="notice notice-error">مقدار مبلغ مورد نظر صحیح نیست!</span>')
             }

             if ($('#shenaseh').val() !== '' && ($('#shenaseh').val().length !== 8 && $('#shenaseh').val().length !== 9 && $('#shenaseh').val().length !== 10)) {
                 messages.push('<span class="notice notice-error">شناسه هشت یا نه رقم است</span>');
             } else if ($('#shenaseh').val() !== '' && !justNumber.test($("#shenaseh").val())) {
                 messages.push('<span class="notice notice-error">شناسه باید فقط از اعداد باشد</span>')
             }

             if ($('#pay-phone-number').val() === '' || $('#pay-phone-number').val() == null) {
                 // messages.push('<span class="notice notice-error">شماره تلفن وارد نشده است</span>');
             } else if (!phoneNumber.test($("#pay-phone-number").val())) {
                 messages.push('<span class="notice notice-error">شماره تلفن استاندارد نیست</span>')
             }

             if (messages.length > 0) {
                 e.preventDefault();
                 payErrorElement.innerHTML = messages.join('<br>');
             }

         } else {
             e.preventDefault();
             loginstatus = document.getElementById("login-status");
             if (loginstatus.classList.contains("login-required")){
                     $(".dd-modal").addClass('active');
                     $("body").addClass('overflow-hidden');
                     $(".overlay-light").fadeIn();
                 // window.location.href = '/my-account/?callbackpage=pay-membership';
             }else{
                 window.location.href = '/dd-shortcode-intro';
             }
         }})
     }
});

// get data page



 // get values page

 // Open Select Day
 $('.dd-select-day-input').click(function(){
     $(".dd-select-day").toggleClass('active');
 })

 // Select Day
 $('.grid-dd-select-day div').click(function(){
     $('.grid-dd-select-day div').removeClass('active');
     $(this).addClass('active');
     const selectDay = $(this).text();
     $('#dd-choose-day').text(selectDay);
     $(".dd-select-day").removeClass('active');
 })

 // Select2
 $('.select-calendar').select2({
     minimumResultsForSearch: Infinity,
     dir: "rtl",
 });







 //-------------------otp code------------------------

 // Send Code
 $(".code-input").keyup(function () {
     if (this.value.length == this.maxLength) {
         $(this).addClass('active').next('.code-input').focus();
     } else {
         $(this).removeClass('active').prev('.code-input').focus();
     }
 });

 // Data Time
 const timeRequired = 1;
 const showTime = document.getElementById('show-time');
 const resendCode = document.querySelector('.resend-code');
 if(showTime) {
     let s = $(resendCode).data('time');
     let m = timeRequired - 1 < 0 ? 'e' : timeRequired - 1;
     s = s < 10 ? '0' + s : s;
     m = m < 10 ? '0' + m : m;
     showTime.innerHTML = `${m}:${s}`;
     let timeInterval = setInterval(timer,1000);
     if ( m == 'e' ) {
         clear();
         showTime.innerHTML = 'Error';
     }
     function timer(){
         if( s > 0 ) {
             s--;
             s = s < 10 ? '0' + s : s;
         } else if( s == 00 ) {
             s = 59;
             m--;
             m = m < 10 ? '0' + m : m;
         }
         showTime.innerHTML = `${m}:${s}`;
         if( m == 00 && s == 0 ) {
             resendCode.innerHTML = `<a onclick="$.redirect('?resendcode=resend', {'request_action': $(resendCode).data('action')});">ارسال مجدد کد</a>`;
             clear()
         }
     }
     function clear(){
         clearInterval(timeInterval)
     }
 }


// --------- active-deactive-progile----------

 // Open Modal
 $('.cancle-dd').on('click', function(e){
     let paymanid = $(e.target).data('paymanid');
     $(".dd-modal-cancel-"+paymanid).addClass('active');
     $("body").addClass('overflow-hidden');
     $(".overlay-light").fadeIn();
 })

 // Open Modal
 $('.edit-dd').on('click', function(e){
     let paymanid = $(e.target).data('paymanid');
     $(".dd-modal-edit-"+paymanid).addClass('active');
     $("body").addClass('overflow-hidden');
     $(".overlay-light").fadeIn();
 })


 // Close Modal
 $('.dd-close-modal, .close-modal-button').on('click', function(){
     $(".dd-modal").removeClass('active');
     $("body").removeClass('overflow-hidden');
     $(".overlay-light").fadeOut();
 })

 // Close Modal
 $('.cancle-avtive-deavtivation').on('click', function(){
     $("input[type='checkbox']").prop("checked", !$("input[type='checkbox']").prop('checked'));
     //window.location.reload();
 })

 // Switch
 $(".dd-switch").on( "change", function(e) {
     let paymanid = $(e.target).data('paymanid');;
     let text = $(".dd-switch-text-"+paymanid);
     if (text.text() == "فعال") {
         $(".dd-switch-text-"+paymanid).text('غیر فعال');
         $(".change-text-modal-"+paymanid).text('غیر فعال کردن');
         $(".dd-modal-change-state-"+paymanid +' #avtiveation-status').text('غیر فعال');
         $(".dd-modal-change-state-"+paymanid).addClass('active');
         $(".dd-modal-change-state-"+paymanid+" input[name='request_action']").val('inactive');
         $("body").addClass('overflow-hidden');
         $(".overlay-light").fadeIn();
     } else {
         $(".dd-switch-text-"+paymanid).text('فعال');
         $(".change-text-modal-"+paymanid).text('فعال کردن');
         $(".dd-modal-change-state-"+paymanid +' #avtiveation-status').text('فعال');
         $(".dd-modal-change-state-"+paymanid).addClass('active');
         $(".dd-modal-change-state-"+paymanid+" input[name='request_action']").val('active');
         $("body").addClass('overflow-hidden');
         $(".overlay-light").fadeIn();
     }
 });

