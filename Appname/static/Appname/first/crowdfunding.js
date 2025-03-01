//Days Percentage
$(document).ready(function() {

	if( $(window).width() < 768 ) {
		$('video.crowd-video').insertAfter('.crowd-mahak-logo');
	}
	
  $('.questionn').on('click', function(e) {

    $(this).next('.answerr').stop().slideToggle();
    $(this).toggleClass('active');

  })

  if ($(".flex-crowd-des").length > 0  ) {



    //Days Percentage
		var percentageDays = ($(".p-size").text() / 360).toFixed(1);
		var  strokeDashOffsetValueDays = 100 - (percentageDays * 100);
		//var  progressBarDays = $(".js-progress-crowd");
//		progressBarDays.css("stroke-dashoffset", strokeDashOffsetValueDays);

		const  oTop = document.getElementById('crowd-result').offsetTop;
		const hl = document.getElementById('hl');

		hl.addEventListener('scroll', scrollPage1);
    is_scrollPage = 0;


		function scrollPage1() {

      if ( is_scrollPage == 0 )
      {


			if(!(oTop - hl.scrollTop > window.innerHeight/2)) {
          is_scrollPage = 1;
			  //	progressBarDays.css("stroke-dashoffset", strokeDashOffsetValueDays);


        $(".js-progress-crowd").each(function(){
            var per = Number ($(this).attr("per")) ;
            $(this).css("stroke-dashoffset", per);
       });


			}
		}
  }
  }


  if (  $(".flex-crowd-price").length > 0 ) {

    const percentageDays = ($(".p-size2").attr("per") / 100).toFixed(1);
    const strokeDashOffsetValueDays = 100 - (percentageDays * 100);
    const progressBarDays = $(".js-progress-crowd2");

    const pTop = document.getElementById('flex-crowd-pie').offsetTop;
    const hl = document.getElementById('hl');

    hl.addEventListener('scroll', scrollPage);

    is_scrollPage = 0;

    function scrollPage() {

      if ( is_scrollPage == 0 )
      {

        if(!(pTop - hl.scrollTop > window.innerHeight/2)) {
          is_scrollPage = 1;
          progressBarDays.css("stroke-dashoffset", strokeDashOffsetValueDays);

          $('.p-size2').each(function () {
            $(this).prop('Counter',0).animate({
              Counter: $(this).attr("per")
            }, {
              duration: 1000,
              easing: 'swing',
              step: function (now) {
                $(this).text(Math.ceil(now));
              }
            });
          });

        }

      }
    }


    const crowdForm = document.getElementById('crowd-form-pay');
    const justNumber = /^(\$|)([1-9]\d{0,2}(\,\d{3})*|([1-9]\d*))(\.\d{2})?$/;
    const phoneNumber = /^(\+98|0)?9\d{9}$/;
    const email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const errorBlock = document.getElementById('error-block');

    $('.crowd-radio').on('click',function(e){
      e.preventDefault();
      const corwdPrice = $(this).children('input').val();
      $('#crowd-price-input').val(corwdPrice);
      $('#crowd-price-input').trigger('change');
    })

    crowdForm.addEventListener('submit', (e) => {

      let messages = [];

      if ( $('#crowd-price-input').val() === '' || $('#crowd-price-input').val() == null ) {
        messages.push('<span class="notice notice-error">مبلغ را وارد کنید</span>')
      } else if ( !justNumber.test($('#crowd-price-input').val()) ) {
        messages.push('<span class="notice notice-error">مقدار مبلغ صحیح نیست!</span>')
      }

//      if ( $('#crowd-phone').val() === '' || $('#crowd-phone').val() == null ) {
//        messages.push('<span class="notice notice-error">شماره تلفن همراه وارد نشده است</span>');
//      } else if ( !phoneNumber.test($("#crowd-phone").val()) ) {
//        messages.push('<span class="notice notice-error">فرمت شماره تلفن همراه صحیح نیست!</span>')
//      }
//
//      if ( $('#crowd-email').val() === '' || $('#crowd-email').val() == null ) {
//        messages.push('<span class="notice notice-error">پست الکترونیک وارد نشده است</span>');
//      } else if ( !email.test($("#crowd-email").val()) ) {
//        messages.push('<span class="notice notice-error">لطفا ایمیل را به درستی وارد کنید!</span>')
//      }

      if (messages.length > 0) {
        e.preventDefault();
        errorBlock.className = 'error-padding';
        errorBlock.innerHTML = messages.join('<br>');

      } else {
        //e.preventDefault();
        errorBlock.innerHTML = '';
        errorBlock.classList.remove('error-padding');
      }



  });


   }


if ($(".flex-crowd-des").length > 0 ||  $(".flex-crowd-price").length > 0 ) {






    $('.crowd-radio').on('click', function(){
      $('.crowd-radio').removeClass('active');
      $(this).addClass('active');
    })

    function updateTextView(_obj){
      let num = getNumber(_obj.val());
      if(num==0){
      _obj.val('');
      }else{
      _obj.val(num.toLocaleString());
      }
    }
    function getNumber(_str){
      let arr = _str.split('');
      let out = new Array();
      for(let cnt=0;cnt<arr.length;cnt++){
      if(isNaN(arr[cnt])==false){
        out.push(arr[cnt]);
      }
      }
      return Number(out.join(''));
    }

      $('.digits').on('keyup',function(){
      updateTextView($(this));
      });










}


// payment back
if ($("#crowd-form").length > 0) {


  $( ".copy-icon" ).click(function() {
    copyText= $(this).attr("data-l");
	 copyToClipboard(copyText) ;
   var tooltip = $("#myTooltip");
   tooltip.html ( "کپی شد : " + copyText);
 });

 $(".copy-icon").mouseout(function(){
	 var tooltip = $("#myTooltip");
   tooltip.innerHTML = "برای کپی لینک کلیک کنید ";
 });

 function copyToClipboard(text) {
     var selected = false;
     var el = document.createElement('textarea');
     el.value = text;
     el.setAttribute('readonly', '');
     el.style.position = 'absolute';
     el.style.left = '-9999px';
     document.body.appendChild(el);
     if (document.getSelection().rangeCount > 0) {
         selected = document.getSelection().getRangeAt(0)
     }
     el.select();
     document.execCommand('copy');
     document.body.removeChild(el);
     if (selected) {
         document.getSelection().removeAllRanges();
         document.getSelection().addRange(selected);
     }
 };



			//Pop Up
			$('.davat').on('click', function() {
			  $('.hamdeli-ok').fadeIn();
			})
			$('.remove-pop-up').on('click', function() {
			  $('.hamdeli-ok').fadeOut();
			})

			if ($(window).width() < 767) {
			   $(".gp-block").insertAfter('.crowd-mahak-logo');
			}
			else {
			   $(".t-block").insertAfter('.gp-block');
			}




		const crowdForm = document.getElementById('crowd-form');
		const crowdPopForm = document.getElementById('crowd-pop-form');
		const email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		const nameValidation = /^[\u0600-\u06FF\s]+$/;
		const errorBlock = document.getElementById('error-block');
		const errorBlock2 = document.getElementById('error-block2');

		$('#crowd-textarea').on('keyup',function(){
			if( $(this).val().length > 3 ) {
				$('.crowd-tashakor-submit').removeClass('disactive');
			} else {
				$('.crowd-tashakor-submit').addClass('disactive');
			}
		})
		crowdForm.addEventListener('submit', (e) => {
			let messages = [];
			if ( $("#crowd-ti").val() !== '' && !nameValidation.test($("#crowd-ti").val()) ) {
				messages.push('<span class="notice notice-error">لطفا نام و نام خانوادگی را با كيبورد فارسی وارد کنید</span>')
			}
			if ( $("#crowd-textarea").val() !== '' && !nameValidation.test($("#crowd-textarea").val()) ) {
				messages.push('<span class="notice notice-error">لطفا پیغام را با كيبورد فارسی وارد کنید</span>')
			}
			if ( $('.crowd-tashakor-submit').hasClass('disactive') ) {
				e.preventDefault();
			}

			if (messages.length > 0) {
				e.preventDefault();
				errorBlock2.className = 'error-padding';
				errorBlock2.innerHTML = messages.join('<br>');

			} else {
				e.preventDefault();
				errorBlock2.innerHTML = '';
				errorBlock2.classList.remove('error-padding');

          sendcommentbyajax() ;
			}

		});

		$('#crowd-email1').on('keyup',function(){
			if( email.test($("#crowd-email1").val()) ) {
				$('.crowd-pay-button').removeClass('disactive');
			} else {
				$('.crowd-pay-button').addClass('disactive');
			}
		})

		crowdPopForm.addEventListener('submit', (e) => {

			let messages = [];

			if( $('.ci-email').val() == '' ) {
				e.preventDefault();
			}

			if ( $("#crowd-email2").val() !== '' && !email.test($("#crowd-email2").val()) ) {
				messages.push('<span class="notice notice-error">لطفا ایمیل دوم را به درستی وارد کنید!</span>')
			}

			if ( $("#crowd-email3").val() !== '' && !email.test($("#crowd-email3").val()) ) {
				messages.push('<span class="notice notice-error">لطفا ایمیل سوم را به درستی وارد کنید!</span>')
			}

			if (messages.length > 0) {
				e.preventDefault();
				errorBlock.className = 'error-padding';
				errorBlock.innerHTML = messages.join('<br>');

			} else {
        e.preventDefault();
				errorBlock.innerHTML = '';
				errorBlock.classList.remove('error-padding');
        sendemailsbyajax() ;
			}

		});

		$('.cpe-close').on('click',function(){
			$('.crowd-pop-email').fadeOut();
		})

		$('.hamdeli-download-link.envelope-icon').on('click',function(){
			$('.crowd-pop-email').fadeIn();
			$('.hamdeli-ok').fadeOut();
		}) ;

    function sendcommentbyajax() {

      var iditem=$("#iditem").val() ;
      var userflname=$("#crowd-ti").val() ;
      var comment = $("#crowd-textarea").val() ;

      if (comment && userflname) {



       if( $(".crowd-tashakor-submit").text()=="با موفقیت ثبت شد ") {alert("شما قبلا پیام خود را ثبت کرده اید ") ; return true;  }

       $(".crowd-tashakor-submit").text("درحال ذخیره ...") ;


      var data = {
          action: 'crowdfunding_update',
          id:iditem,
          userflname:userflname,
          comment:comment

      };
      $.post(the_in_url.in_url, data, function(response) {
          var res = $.parseJSON(response);

          if (res.status==201) {alert(res.error)}
              if (res.status==200)
              {
                $(".crowd-tashakor-submit").text("با موفقیت ثبت شد ") ;
                  alert("پیام شما با موفقیت ارسال شد ")  ;
              }


       });

}

    }

    function sendemailsbyajax() {
      var crowd_email3=$("#crowd-email3").val() ;
      var crowd_email2=$("#crowd-email2").val() ;
      var crowd_email1=$("#crowd-email1").val() ;

      if (crowd_email1 || crowd_email2 || crowd_email3 ) {




      if( $(".crowd-pay-button").text()=="با موفقیت ثبت شد ") {alert("شما قبلا ایمیل ها را ارسال کردید ") ; return true;  }

      $(".crowd-pay-button").text("درحال ذخیره ...") ;
     var iditem=$("#iditem").val() ;
     var crowd_email3=$("#crowd-email3").val() ;
     var crowd_email2=$("#crowd-email2").val() ;
     var crowd_email1=$("#crowd-email1").val() ;

     var data = {
         action: 'crowdfunding_send_emails',
         id:iditem,
         email3:crowd_email3,
         email2:crowd_email2,
         email1:crowd_email1

     };
     $.post(the_in_url.in_url, data, function(response) {
         var res = $.parseJSON(response);

         if (res.status==201) {alert(res.error)}
             if (res.status==200)
             {
               $(".crowd-pay-button").text("با موفقیت ثبت شد ") ;
                 alert("ایمیل ها با موفقیت ارسال شد ")  ;
             }


      });

    }
  }

  }
// end


//Pop Up
      $('#join-to-donate').on('click', function() {
        $('.hamdeli-ok,.overlay').fadeIn();
      })
      $('.remove-pop-up').on('click', function() {
        $('.hamdeli-ok,.overlay').fadeOut();
      })

      
  });
