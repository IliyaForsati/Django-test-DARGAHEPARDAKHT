jQuery(document).ready(function($) {


 var ctime=60; 
 var xsetInterval ; 


 if ($("#sendpass").length >0 ) 
 {

    setTimeout(function() { window.location = "/my-account";}, 3000);

 }

  if ($(".woocommerce-form-login").length >0 ) 
 {

    $(".woocommerce-form-login").append('<div class="register-link">پروفایل نیکوکاری ندارید؟ <a href="/register">همینک بسازید</a></div>');

 }


 function time_sms(){

   xsetInterval = setInterval(function() {

  ctime--;
  if (ctime <= 0) 
  {
       document.getElementById("counter").innerHTML = 0;
       document.getElementById("acounter").classList.remove("not-active");
        clearInterval(xsetInterval);
  }
    
    document.getElementById("counter").innerHTML = ctime;
}, 1000);
}


if ($(".timer").length > 0 ) 
{
    time_sms();
}



function digits(price){ 
    return  price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ; 
    
}

if ($("#quantity2").length > 0) 
{
    $(".forquantity2 .js_spin-add").attr("disabled",false) ; 
    $(".forquantity2 .js_spin-remove").attr("disabled",false) ; 
}

$("#forquantity2").click(function () {

    var ischeck = $(this).is(":checked"); 

    if (ischeck==true) 
    {
      $(".forquantity2 .js_spin-add").attr("disabled",false) ; 
       $(".forquantity2 .js_spin-remove").attr("disabled",false) ; 
     $("#quantity2").attr("disabled",false) ;
    }

    if (ischeck==false) 
    {
      $(".forquantity2 .js_spin-add").attr("disabled",true) ; 
       $(".forquantity2 .js_spin-remove").attr("disabled",true) ;
       $("#quantity2").attr("disabled",true) ;
       $("#quantity2").val("1");   
    }
})

$("#forquantity1").click(function () {

    var ischeck = $(this).is(":checked"); 

    if (ischeck==true) 
    {
      $(".forquantity1 .js_spin-add").attr("disabled",false) ; 
      $(".forquantity1 .js_spin-remove").attr("disabled",false) ; 
       $("#quantity1").attr("disabled",false) ;  
    }

    if (ischeck==false) 
    {
      $(".forquantity1 .js_spin-add").attr("disabled",true) ; 
       $(".forquantity1 .js_spin-remove").attr("disabled",true) ;
       $("#quantity1").attr("disabled",true) ;
      $("#quantity1").val("1");   
    }
})
 

 $("#pricef").change(function () {

  var pricef = $(this).val(); 
  
  var p = Number(pricef)/10;
  
      $("#id-price-toman-3").html(digits(""+(p) ) ) ; 

  $("#pricef-out").text(pricef.toPersianLetter()) ; 



  });

 $("#peicek").on('change paste',function () {

  var peicek = $(this).val(); 
    var p = Number(peicek)/10;

     $("#id-price-toman-4").html(digits(""+(p) ) ) ; 

  $("#peicek-out").text(peicek.toPersianLetter()) ; 
   $(this).val(digits(""+(peicek) ) ) ;
   
  });
  
  $('#pricef').on('change paste',function(){
    var pricef = $(this).val().replaceAll(",","");
    $(this).val(digits(""+(pricef) ) ) ;
  })

$(".fqty").on('change keyup paste', function() {

   cal_f_to_prsion(); 



  });


$("#kclickbtn button").click(function () {

   cal_k_to_prsion(); 

}) ; 

$("#fclickbtn button").click(function () {

   cal_f_to_prsion(); 

}) ; 

$(".kqty").on('change keyup paste', function() {


   cal_k_to_prsion(); 



  });

 if ($(".fqty").length > 0 ) 
 {
  cal_f_to_prsion() ; 
 }

 if ($(".kqty").length > 0 ) 
 {
  cal_k_to_prsion() ; 
 }

$(".fcal").click(function () {



   cal_f_to_prsion(); 

}) ; 

$(".kcal").click(function () {

   cal_k_to_prsion(); 

}) ; 


function cal_f_to_prsion()
{

   var price_base= Number( $('.fcal:checked').attr("data-price"));
   var qty = Number( $(".fqty").val()); 
    var p  = price_base * qty ; 
    $("#id-price-toman-1").text(digits(""+(p/10) ) ) ; 

  
   $(".fprice-out-w").text((p/10).toPersianLetter()) ; 
   $(".fprice-out-n").text(digits(""+p)) ;

}


function cal_k_to_prsion()
{

   var price_base= Number( $('.kcal:checked').attr("data-price"));
   var qty = Number( $(".kqty").val()); 
    var p  = price_base * qty ; 
        $("#id-price-toman-2").text(digits(""+(p/10) ) ) ; 

   $(".kprice-out-w").text((p/10).toPersianLetter()) ; 
   $(".kprice-out-n").text(digits(""+p)) ;

}
 

$("#id_priv").change(function () {

	var id_priv =parseInt( $(this).val()) ;

	if (id_priv==2 || id_priv==3) 
	{
		$(".date-offfer").show();
	}

	if (id_priv > 3 ) 
	{
		$(".date-offfer").hide();
	}
    if (id_priv==1) 
    {
        $(".date-offfer").hide();
    }

	var data = {
            action: 'get_city_by_id',
            id_priv: id_priv,
          
        };
        $.post(the_in_url.in_url, data, function(response) {
            var res = $.parseJSON(response);
            var citys = res.citys;
            var htmls="" ; 

                if (citys.length > 0) 
                	{

                		 for (var i = 0; i < citys.length; i++) 
                		 {
                        htmls+='<option value="'+citys[i].id_city+'">'+citys[i].name+'</option>';

                		 }

                	 }$("#id_city").html(htmls);

                  if ($("#is_stand").length > 0 )
                                     {
                                          get_city_region();
                                     }

        }); 



//id_city

}) ;



$(".numbert").on('change keyup paste', function() {

   var num = parseInt($(this).val()) ; 
   var price = parseFloat($(this).attr("data-price")) ;

   $(".result-money").html("هزینه: <span>"+digits(""+num*price)+"</span> ریال"); 



 }) ;

$(".campaign").click(function () {
   var  val =digits( $(this).val() );
   $(".campaign-money").val(val);
   $(".campaign-money").trigger('change');
})

/*
$("#regmahak").click(function () {

        var mobile= $("#mobile").val() ; 
        var password= $("#password").val() ; 
        var password_confrim= $("#password-confrim").val() ; 
        var firstname= $("#firstname").val() ; 
        var lastname= $("#lastname").val() ; 
        var email= $("#email").val() ; 
        var isemail= $("#isemail").val() ; 



        var data = {
            action: 'new_user',
            mobile: mobile,
            password:password,
            password_confrim:password_confrim,
            firstname:firstname,
            lastname:lastname,
            email:email,
            isemail:isemail
          
        };
        $.post(the_in_url.in_url, data, function(response) {
            var res = $.parseJSON(response);

            if (res.status==201) {alert(res.error)}
                if (res.status==200) 
                {

                    $("#acounter").attr("href",res.href)
                    $("#verify").show() ; 
                    $("#registermahak").hide() ; 
                    time_sms() ; 
                }


         });




}); 

*/

$("#code-verify").click(function () {

        var code= $("#code").val() ; 
       



        var data = {
            action: 'user_code_verify',
            code:code          
        };
        $.post(the_in_url.in_url, data, function(response) {
            var res = $.parseJSON(response);

            if (res.status==201) {alert(res.error)}
                if (res.status==200) 
                {
                   
                      window.location = res.url;


                    //$("#verify").show() ; 
                    //$("#registermahak").hide() ; 
                }


         });




}); 



	$(".screenshot").on("click", function(e) { 

	  var id = $(".pic-frame").attr("data-id") ; 
	  var hrefurl =  $(this).attr("href");
	  $(this).html('<span class="elspinner"></span>');
	 e.preventDefault();

		html2canvas(document.querySelector(".pic-frame")).then(canvas => {


			var dataURL = canvas.toDataURL();

			 var data = {
                 action: 'upload_hamdeli',
                 image:dataURL  ,
                 dataType: 'json',
                 id:id
				};
				$.post(the_in_url.in_url, data, function(response) {
					var res = $.parseJSON(response);

					if (res.status==201) {alert(res.error)}
						if (res.status==200) 
						{

							  window.location = hrefurl;


							//$("#verify").show() ; 
							//$("#registermahak").hide() ; 
						}


				 });


		   // document.querySelector("article").appendChild(canvas)


		});

	});


  $(".dec-inc .ka-minus").on("click", function(e) {
      let val = parseInt($(".flex-wizard-price .num-text span").html().replaceAll(',',''));
      if (val-500000 >= parseInt($(this).data('minval')))
         $(".flex-wizard-price .num-text span").text((val-500000).toLocaleString());
      else {
          $(".dec-inc.dec").addClass('active')
      }
  });
  $(".dec-inc .ka-plus").on("click", function(e) {
      let text = $(".flex-wizard-price .num-text span").html().replaceAll(',','');
      $(".flex-wizard-price .num-text span").text((parseInt(text)+500000).toLocaleString());
      $(".dec-inc.dec").removeClass('active')
  });


	
	var maxchars = 600;
	$('.hamdeli-message-textarea').keyup(function () {
		var tlength = $(this).val().length;
		$(this).val($(this).val().substring(0, maxchars));
		var tlength = $(this).val().length;
	});



  if ($(".golhak").length > 0 ) 
  {

    let postalCheck = false;
    
      $('#id_priv2').on('change',function() {

        if(this.value != 2) {
          $('#gholak-province').addClass('active');
          $('#gholak-postal-code').addClass('active');
          postalCheck = true;
        } else {
          $('#gholak-province').removeClass('active');
          $('#gholak-postal-code').removeClass('active');
          postalCheck = false;
        }
      })
      
      if( $(window).width() < 991 ) {
        $("#pig-logo").insertBefore('.blgh-first');
        $("#pig-tashakor-logo").insertBefore('.blgh-tashakor');
      }
      
      //Pop Up
      $('#pig-davat').on('click', function() {
        $('.hamdeli-ok,.overlay').fadeIn();
      })
      $('.remove-pop-up').on('click', function() {
        $('.hamdeli-ok,.overlay').fadeOut();
      })
      
  
    
    const copyButton = document.getElementById('pig-pop-up-button');
    
    copyButton.addEventListener('click', () => {
      copyButton.innerHTML = 'کپی شد!';
      setTimeout(function(){ copyButton.innerHTML = 'لینک دعوت را کپی کنید'; }, 2000);

      CopyToClipboard("pig-input-copy") ; 
    });

    function CopyToClipboard(id)
    {
      let r = document.createRange();
      r.selectNode(document.getElementById(id));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(r);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
    }
    
    const formPig = document.getElementById('pig-form');
    const pigErrorElement = document.getElementById('pig-error');
    const pigTashakor = document.getElementById('pig-error');
    
    const phoneNumber = /^(\+98|0)?9\d{9}$/;
    const nameValidation = /^[\u0600-\u06FF\s]+$/;
    const postalCode = /^\d{10}$/;

    formPig.addEventListener('submit', (e) => {



      let messages = []
      
      if ( $('#pig-name').val() === '' || $('#pig-name').val() == null ) {
        messages.push('<span class="notice notice-error">نام و نام خانوادگی وارد نشده است</span>');
      } else if ( !nameValidation.test($("#pig-name").val()) ) {
        messages.push('<span class="notice notice-error">نام و نام خانوادگی استاندارد نیست</span>')
      }
      
      if ( $('#pig-phone').val() === '' || $('#pig-phone').val() == null ) {
        messages.push('<span class="notice notice-error">شماره تلفن همراه وارد نشده است</span>');
      } else if ( !phoneNumber.test($('#pig-phone').val()) ) {
        messages.push('<span class="notice notice-error">شماره تلفن صحیح نیست و تنها اعداد انگلیسی مجاز است</span>')
      }
      
      if ( $("#id_priv2").val() === 'استان' ) {
        messages.push('<span class="notice notice-error">استان را انتخاب کنید</span>');
      }
      
      if ( postalCheck == true ) {
        if ( $('#pig-postal-code').val() === '' || $('#pig-postal-code').val() == null ) {
          messages.push('<span class="notice notice-error">لطفا کد پستی را وارد کنید</span>');
        } else if ( !postalCode.test($('#pig-postal-code').val()) ) {
          messages.push('<span class="notice notice-error">کد پستی معتبر وارد کنید</span>')
        }
      }
      
      if ( $('#pig-address').val() === '' || $('#pig-address').val() == null ) {
        messages.push('<span class="notice notice-error">آدرس را وارد کنید</span>');
      }
      
      if ( !$("#pig-check1").prop('checked') && !$("#pig-check2").prop('checked') && !$("#pig-check3").prop('checked') ) {
        messages.push('<span class="notice notice-error">نوع قلک را انتخاب کنید</span>');
      }

      if (messages.length > 0) {
        e.preventDefault();
        pigErrorElement.innerHTML = messages.join('<br>');
      } else {
        e.preventDefault();
        send_data_to_server( ) ; 
      }
      

    })

    function send_data_to_server () 

    {

      var id_priv = $("#id_priv2").val() ; 
      var pig_name = $("#pig-name").val() ;
      var pig_phone = $ ("#pig-phone").val() ; 
      var pig_address = $("#pig-address").val() ; 
      var pigempty= $("#pigempty").val() ; 
      var pigfill = $("#pigfill").val() ; 
      var pigfrind= $("#pigfrind").val() ; 
      var pig_postal_code = $("#pig-postal-code").val() ; 
       var pig_check3 = 0  ;
       var pig_check2 = 0  ;
       var pig_check1 = 0  ;

        if( $("#pig-check3").is(':checked') ) { pig_check3=1 ; } 
       if( $("#pig-check2").is(':checked') ) { pig_check2=1 ; } 
       if( $("#pig-check1").is(':checked') ) {  pig_check1 = 1; } 


       var data = {
          action  : 'save_pig' , 
          id_priv :  id_priv, 
          flname  :  pig_name,
          mobile  :  pig_phone ,
          address :  pig_address,
          pigempty: pigempty, 
          pigfill : pigfill, 
          pigfrind: pigfrind,
          pig_postal_code:pig_postal_code , 
          pig_check3:pig_check3 , 
          pig_check2:pig_check2 , 
          pig_check1:pig_check1 

        };
        $("#pig-error").html(""); 
        $.post(the_in_url.in_url, data, function(response) {
          var res = $.parseJSON(response);

          if (res.status==201) {$("#pig-error").html(res.error)}
            if (res.status==200) 
            {

               $('#pig-tashakor').fadeIn();
            }


         });

      //
    }


  }



//   regiser new user 


if ($("#yes-shenaseh").length > 0 ) 

{


$("#yes-shenaseh").on('click', function() {
      if ( $(this).prop('checked') ) {
        $(".shenaseh-block").slideDown();
      }
    });

    $("#no-shenaseh").on('click', function() {
      if ( $(this).prop('checked') ) {
        $(".shenaseh-block").slideUp();
      }
    });
    
    $("#login-email-check").on('click', function() {
      if ( $(this).prop('checked') ) {
        $("#login-email").slideDown();
      } else {
        $("#login-email").slideUp();
      }
    });
    
    const loginForm = document.getElementById('registermahak');
    const pigErrorElement = document.getElementById('pig-error');
    const pigTashakor = document.getElementById('pig-error');
    
    const phoneNumber = /^(\+98|0)?9\d{9}$/;
    const nameValidation = /^[\u0600-\u06FF\s]+$/;
    const email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    loginForm.addEventListener('submit', (e) => {

      let messages = []
      
      if ( $('#login-username').val() === '' || $('#login-username').val() == null ) {
        messages.push('<span class="notice notice-error">نام کاربری وارد نشده است</span>');
      } else if ( !phoneNumber.test($("#login-username").val()) ) {
        messages.push('<span class="notice notice-error">نام کاربری استاندارد نیست</span>')
      }
      
      if ( $('#pass').val() === '' || $('#pass').val() == null ) {
        messages.push('<span class="notice notice-error">رمز عبور وارد نشده است</span>');
      } else if ( $('#repass').val() !== $('#pass').val() ) {
        messages.push('<span class="notice notice-error">رمز عبور مطابقت ندارد</span>')
      }
      
      if ( $("#yes-shenaseh").prop('checked') ) {
        
        if ( $('#shenaseh').val() === '' || $('#shenaseh').val() == null ) {
          if( $('#login-name').val() === '' && $('#login-last-name').val() === '' ) {
            messages.push('<span class="notice notice-error">شناسه را وارد کنید</span>');
          }
        } else if ( $('#shenaseh').val().length !== 8 && $('#shenaseh').val().length !== 9 && $('#shenaseh').val().length !== 10) {
          messages.push('<span class="notice notice-error">شناسه هشت تا ده رقم می‌باشد</span>')
        }
        
        if($("#login-name").val() !== ''){
          if ( !nameValidation.test($("#login-name").val()) ) {
            messages.push('<span class="notice notice-error">نام استاندارد نیست</span>')
          } else {
            if ( $('#login-last-name').val() === '' || $('#login-last-name').val() == null && $('#shenaseh').val() === '' ) {
              messages.push('<span class="notice notice-error">نام خانوادگی وارد نشده است</span>');
            } else if ( !nameValidation.test($("#login-last-name").val()) ) {
              messages.push('<span class="notice notice-error">نام خانوادگی استاندارد نیست</span>')
            }
          }
        }
        
        if($("#login-last-name").val() !== ''){
          if ( !nameValidation.test($("#login-last-name").val()) ) {
            messages.push('<span class="notice notice-error">نام خانوادگی استاندارد نیست</span>')
          } else {
            if ( $('#login-name').val() === '' || $('#login-name').val() == null && $('#shenaseh').val() === '' ) {
              messages.push('<span class="notice notice-error">نام وارد نشده است</span>');
            } else if ( !nameValidation.test($("#login-last-name").val()) ) {
              messages.push('<span class="notice notice-error">نام استاندارد نیست</span>')
            }
          }
        }
        
      }
      
      if ( $("#login-email-check").prop('checked') ) {
        if ( $('#login-email').val() === '' || $('#login-email').val() == null ) {
          messages.push('<span class="notice notice-error">پست الکترونیک وارد نشده است</span>');
        } else if ( !email.test($("#login-email").val()) ) {
          messages.push('<span class="notice notice-error">لطفا ایمیل را به درستی وارد کنید!</span>')
        }
      }
      
        

      if (messages.length > 0) {
         
        e.preventDefault();
        pigErrorElement.innerHTML = messages.join('<br>');
      } else {
e.preventDefault();
        register_new_user() ; 
      }

    })


}

function register_new_user() 
{


        var mobile= $("#login-username").val() ; 
        var password= $("#pass").val() ; 
        var password_confrim= $("#repass").val() ; 
        var firstname= $("#login-name").val() ; 
        var lastname= $("#login-last-name").val() ; 
        var email= $("#login-email").val() ; 
        var isemail= $("#login-email-check").val() ; 
        var shenaseh = $("#shenaseh").val() ; 
        var code_meli = $("#code_meli").val() ; 
        var shenasehcheck = $(".shenasehcheck:checked").val();


        var data = {
            action: 'new_user',
            mobile: mobile,
            password:password,
            password_confrim:password_confrim,
            firstname:firstname,
            lastname:lastname,
            email:email,
            isemail:isemail,
            shenaseh:shenaseh ,
            code_meli:code_meli , 
            shenasehcheck:shenasehcheck

          
        };
        $.post(the_in_url.in_url, data, function(response) {
            var res = $.parseJSON(response);

            if (res.status==201) {alert(res.error)}
                if (res.status==200) 
                {

                    $("#acounter").attr("href",res.href)
                    $("#verify").show() ; 
                    $("#registermahak").hide() ; 
                    time_sms() ; 
                }


         });


}
// end register



// help online

if ($("#online-help-form").length >0 ) 
 {

  $("#click-forgot-shenaseh").on('click', function() {
      $(".shenaseh-block").stop().slideToggle().toggleClass('active');
    });

  

  $(".type-pay").on('click', function() {

    forgot_shenaseh_block() ; 
  
    });


     forgot_shenaseh_block() ;
     function forgot_shenaseh_block()
     {
         var v = $(".type-pay:checked").val();
         if (v=="public") {$("#forgot-shenaseh-block").hide() ; }
         if (v!="public") {$("#forgot-shenaseh-block").show() ; }
         if (v!="treatment") {
             $("#public-pay-input").removeClass('treatementpays') ;
             $("#public-pay-input").attr("placeholder", "مبلغ مورد نظر خود را وارد کنید (ریال) *");
             $("#public-pay-input").prop('readonly', false);
             $("#treatment-days").addClass('hidden-context') ;
             $("#public-pay-input").val('');
         }else {
             // $("#help-online-price-container").prepend('<span class="treatmentspan">انتخاب کنید یا مبلغ مورد نظر خود را ویرایش نمایید</span>') ;
             $("#help-online-price-container").css('display','flex') ;
             $("#public-pay-input").addClass('treatementpays') ;
             $("#public-pay-input").attr("placeholder", "مبلغ درمانیاری");
             $("#public-pay-input").prop('readonly', false);
             $("#treatment-days").removeClass('hidden-context');
             $("#public-pay-input").val( $("#treatment-days").val()*2450000).change();
         }
         $("#public-pay-input.treatementpays").on('focus',function () {
             $("#public-pay-input").removeClass('treatementpays');
             $("#treatment-days").addClass('hidden-context') ;
         });

     }

     $("#treatment-days").on('keyup change',function (e) {
         $("#public-pay-input").val(e.target.value*2450000).change();
         $("#public-pay-input").click();
     })



    
    const payForm = document.getElementById('online-help-form');
    const payErrorElement = document.getElementById('pay-error');
    
    const phoneNumber = /^(\+98|0)?9\d{9}$/;
    const nameValidation = /^[\u0600-\u06FF\s]+$/;
    const justNumber = /^[0-9]+$/;

    payForm.addEventListener('submit', (e) => {
      let messages = []

      var v = $(".type-pay:checked").val();
      
      if ( $('#public-pay-input').val() === '' || $('#public-pay-input').val() == null ) {
        messages.push('<span class="notice notice-error">مبلغ مورد نظر خود را وارد کنید</span>')
      } else if ( Number($('#public-pay-input').val().replace(",","")) < 1000  ) {
        messages.push('<span class="notice notice-error">مقدار مبلغ مورد نظر صحیح نیست!</span>')
      }
      
      if ( $('#shenaseh').val() !== '' && ($('#shenaseh').val().length !== 8 && $('#shenaseh').val().length !== 9 && $('#shenaseh').val().length !== 10) ) {
        messages.push('<span class="notice notice-error">شناسه هشت تا ده رقم است</span>');
      } else if ( $('#shenaseh').val() !== '' && !justNumber.test($("#shenaseh").val()) ) {
        messages.push('<span class="notice notice-error">شناسه باید فقط از اعداد باشد</span>')
      }

      if (v!="public") {
      
      if ( $('#pay-phone-number').val() === '' || $('#pay-phone-number').val() == null ) {
        messages.push('<span class="notice notice-error">شماره تلفن وارد نشده است</span>');
      } else if ( !phoneNumber.test($("#pay-phone-number").val()) ) {
        messages.push('<span class="notice notice-error">شماره تلفن استاندارد نیست</span>')
      }
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
      }

    })


 }


 //   wooc

 if ($("#billing_city").length > 0 ) 

 {

 //billing_city() ; 


  
$(document).on('change', '#billing_city', function() {  

  
  billing_city() ; 
});





 function billing_city() 

 {
   
   var billing_city = $("#billing_city").val() ;
   
if (billing_city) {
        
     var data = {
            action: 'billing_city_checkout',
            billing_city:billing_city          
        };
        $.post(the_in_url.in_url, data, function(response) {
            var res = $.parseJSON(response);

                if (res.status==200) 
                {

                if (res.hide==200) 
                {

                  var attr_class=  $("#billing_postcode_field").attr("data-o_class") ; 
                  attr_class.replace("validate-required","") ; 
                  attr_class.replace("validate-postcode","") ; 
                  $("#billing_postcode_field").attr("data-o_class" ,attr_class) ;

                  $("#billing_postcode_field").removeClass("validate-required") ; 
                  $("#billing_postcode_field").removeClass("validate-postcode") ; 
                  $("#billing_postcode_field").hide() ;
                  $(".woocommerce-additional-fields").hide() ;
                  $("#ship-to-different-address").hide() ; 
                  $(".calling").show();
                  
                }

                 if (res.hide==201) 
                {

                  $("#billing_postcode_field").addClass("validate-required") ; 
                  $("#billing_postcode_field").addClass("validate-postcode") ; 
                  $("#billing_postcode_field").show() ; 
                  $(".woocommerce-additional-fields").show() ;
                  $("#ship-to-different-address").show() ;

                  $(".calling").hide(); 
                }
                   
                     
                }


         });




   }

 }


 }

// qrode

 if ($("#qrcode-form").length > 0 ) 

 {



const qrcodeButton = document.getElementById('qrcode-button');
		const qrcodeSubmit = document.getElementById('qrcode-submit');
		const payErrorElement = document.getElementById('pay-error');
		const payErrorElement2 = document.getElementById('pay-error2');
		
		const justNumber = /^[0-9]+$/;
		const justNumberNine = /^[0-9]{9}$/;
		qrcodeButton.addEventListener('click', (e) => {

			let messages = []
			
			if ( $('#public-pay-input').val() === '' || $('#public-pay-input').val() == null ) {
				messages.push('<span class="notice notice-error">مبلغ مورد نظر خود را وارد کنید</span>')
			} else if (   Number($('#public-pay-input').val().replace(",","")) < 1000   ) {
				messages.push('<span class="notice notice-error">مقدار مبلغ مورد نظر صحیح نیست!</span>')
			}

			if (messages.length > 0) {
				e.preventDefault();
				payErrorElement.innerHTML = messages.join('<br>');
			} else {
				$('#qrcode-button').addClass('active')
			}

		});
		
		qrcodeSubmit.addEventListener('click', (e) => {

			let messages = []
			
			if ( $('#qrcode-number').val() === '' || $('#qrcode-number').val() == null ) {
				messages.push('<span class="notice notice-error">شماره قلک را وارد کنید</span>')
			} else if ( !justNumberNine.test($('#qrcode-number').val()) ) {
				messages.push('<span class="notice notice-error">شماره قلک صحیح نیست!</span>')
			}

			if (messages.length > 0) {
				e.preventDefault();
				payErrorElement2.innerHTML = messages.join('<br>');
			}

		});
		
		$('body').on('click', '#qrcode-button.active',function(){
			$('.hamdeli-ok,.overlay').fadeIn();
		})
		$('.remove-pop-up').on('click', function() {
		  $('.hamdeli-ok,.overlay').fadeOut();
		});


$('.FormUnit-quantity--add').on('click', function() {


var s= 0 ; 


$("input.qrcode-step").each(function(){
 var input = $(this);
  var  val = Number( input.val());
  var n = Number( input.attr("data-n")) ;
  s+= val * n ; 

});

 $("#public-pay-input").val(digits(""+s)); 

});

  


$('.FormUnit-quantity--remove').on('click', function() {

  var s= 0 ; 


$("input.qrcode-step").each(function(){
 var input = $(this);
  var  val = Number( input.val());
  var n = Number( input.attr("data-n")) ;
  s+= val * n ; 

});

 $("#public-pay-input").val(digits(""+s)); 
 


    });

  


   
 }


$("#save_mobile").click(function () {

    var value_back= $("#value_back").val() ;
    var id_payment = $("#id_payment").val() ; 
    var button = $(this);

    button.attr('disabled','disabled');
    button.text("درحال بررسی ....") ; 
        var data = {
            action: 'save_mobile',
            value_back: value_back, 
            id_payment:id_payment
          
        };
        $.post(the_in_url.in_url, data, function(response) {
            var res = $.parseJSON(response);


            if (res.status==201) {
              $(".notice-error").show() ; 
              $(".notice-error").text(res.error) ; 
               button.text("ثبت") ; 
               button.removeAttr('disabled');

            }
                if (res.status==200) 
                {
                  $(".h-eli-h").remove(); 
                  $("#fromqrcode").append('<ul class="message-code"><li>با موفقیت ثبت شد  </li></ul>');
 
                }


         });




}); 


$('.will-convert-to-tomen').on('keyup change' , function () {
  if ( $(this).val() === '' || $(this).val() == null ) {
      $('#tomanContainer').slideUp();
      messages.push('<span class="notice notice-error">مبلغ مورد نظر خود را وارد کنید</span>')
  } else {
      let price = Number($(this).val().replace(/[ ]*,[ ]*|[ ]+/g,""));
      if ( price > 10  ){
          let value = Math.floor(price/10).toString();
          var decimalCount;
          value.match(/\./g) === null ? decimalCount = 0 : decimalCount = value.match(/\./g);
          if (decimalCount.length > 1) {
              value = value.slice(0, -1);
          }
          var components = value.toString().split(".");
          if (components.length === 1)
              components[0] = value;
          components[0] = components[0].replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          if (components.length === 2) {
              components[1] = components[1].replace(/\D/g, '').replace(/^\d{3}$/, '');
          }
          if (components.join('.') != '')
              price = components.join('.');
          else
              price = '';


          $('#tomanContainer').slideDown().html('معادل ' + price + 'تومان ')
      }

  }
})

//   1401 update




// $( 'button[name=update_cart]' ).remove();

if (!document.body.classList.contains('logged-in')) {

if ($("#downloadable").length > 0 ) {
 $(".wc-forward").text("ورود به حساب کاربری ");
  $(".wc-forward").attr("href" , $("#downloadable").attr("href")) ;
}
}

if ($("#is_stand_chekout").length > 0 )
{
  $("#place_order").text("پرداخت ") ;

$(".woocommerce-billing-fields h3").text("اطلاعات نیکوکار") ;
}

if ($("#is_stand").length > 0 )
{
  var product_price_text  =  $(".new-price").text() ;


$(".product-add-to-cart").text("افزودن سفارش به سبد خرید") ;


$(".product-add-to-cart").click(function (e){

  error = 0 ;
  var errors= '';

  var stand_name = $("#stand_name").val();
  var start_date = $("#start_date").val();
  var start_hour =  $("#start_hour").val();
  var end_date = $("#end_date").val();
  var end_hour = $("#end_hour").val();
  var user_to = $("#user_to").val();
  var user_from = $("#user_from").val();
  var privsstand = $("#id_priv").val();
  var citys = $("#citys").val();
  var full_address = $("#full_address").val();
  var location_install = $("#location_install").val();
  var id_city_region = $("#id_city_region").val();

  if (!stand_name)
  {
    error = 1 ;
    errors+=' <span class="notice notice-error">نام و نام خانوادگی وارد نشده است</span><br>';
  }
  if (!start_date)
  {
    error = 1 ;
    errors+=' <span class="notice notice-error">تاریخ شروع  انتخاب نشده </span><br>';
  }
  if (!start_hour)
  {
    error = 1 ;
    errors+=' <span class="notice notice-error">ساعت  شروع  انتخاب نشده </span><br>';
  }
   if (!end_date)
  {
    error = 1 ;
    errors+=' <span class="notice notice-error">تاریخ پایان    انتخاب نشده </span><br>';
  }
  if (!end_hour)
  {
    error = 1 ;
    errors+=' <span class="notice notice-error">ساعت پایان    انتخاب نشده </span><br>';
  }
  if (!user_to)
  {
    error = 1 ;
    errors+=' <span class="notice notice-error">فیلد  '+$("#textinputuser_to").text()+' الزامی می باشد </span><br>';
  }
  if (!user_from)
  {
    error = 1 ;
    errors+=' <span class="notice notice-error">فیلد  از طرف  به الزامی می باشد </span><br>';
  }
   if (privsstand=="-1")
  {
    error = 1 ;
    errors+=' <span class="notice notice-error">استان انتخاب نشده است </span><br>';
  }
  if (citys=="-1")
  {
    error = 1 ;
    errors+=' <span class="notice notice-error">شهر انتخاب نشده است </span><br>';
  }

  if (!id_city_region)
  {
    error = 1 ;
    errors+=' <span class="notice notice-error">محله  انتخاب نشده است </span><br>';
  }
  if (!full_address)
  {
    error = 1 ;
    errors+=' <span class="notice notice-error"> فیلد ادرس الزامی می باشد  </span><br>';
  }
  if (!location_install)
  {
    error = 1 ;
    errors+=' <span class="notice notice-error"> فیلد  موقعیت  نصب  الزامی می باشد  </span><br>';
  }




  var date_start = $("#start_date").val();
  var time_start =  $("#start_hour").val();
  var date_end = $("#end_date").val();
  var time_end = $("#end_hour").val();


var dif_days = get_between_two_date (start_date , end_date) ;

if (dif_days < 0 )
{
   error = 1 ;
    errors+=' <span class="notice notice-error"> تاریخ شروع باید کمتر از  تاریخ پایان باشد  </span><br>';
}


  var elinput = $("#is_stand");
  var current_date = elinput.attr("current_date") ;
  var current_date_h = Number( elinput.attr("current_date_h") )  ;

  var cdate = elinput.attr("cdate") ;
      cdate= cdate.replace("ق.ظ",'ق ظ');
      cdate= cdate.replace("ب.ظ",'ب ظ');

  var diff_hour= get_between_two_time (start_hour , cdate) ;

//  var sum_hour = current_date_h + diff_hour;

  if (toEnglishDigits(start_date) ==current_date )
  {

    if (current_date_h > 16 )
    {

    error = 1 ;
    errors+=' <span class="notice notice-error">نیکوکار گرامی برای تاریخ شروع از امروز فقط قبل از ساعت 16 مجاز می باشد لطفا تاریخ شروع را تغییر دهید  </span><br>';
    }

     if (diff_hour < 4 )
    {

    error = 1 ;
    errors+=' <span class="notice notice-error">نیکوکار گرامی برای امروز از ساعت شروع تا همین لحظه حداقل باید 4 ساعت فاصله باشد لطفا ساعت شروع را تغییر دهید</span><br>';
    }




  }



  if (error==1)
  {

   $("#pig-error").html(errors) ;
    $('html, body').animate({
                    scrollTop: $("#pig-error").offset().top
                }, 20);

  }


calculate_price_stand() ;

if (error == 0 )
{

 $("#overlaystand").show() ;
 $("#modalstand").show() ;

}

  e.preventDefault();

})



}

$("#countinue_shoping").click(function() {

 $("#overlaystand").hide() ;
 $("#modalstand").hide() ;

 $("#redir").val("cart");

 $("form.cart").submit() ;

}) ;

$("#gotocheckout").click(function() {

 $("#overlaystand").hide() ;
 $("#modalstand").hide() ;
 $("form.cart").submit() ;

}) ;



$("#id_city").on("change", function() {

  get_city_region()

});

function get_city_region()
{
  var id_city =parseInt( $("#id_city").val()) ;

$(".elspinner").show() ;
  var data = {
            action: 'get_region_by_id',
            id_city: id_city,

        };
        $.post(the_in_url.in_url, data, function(response) {
            var res = $.parseJSON(response);
            var region = res.region;
            var htmls="" ;

                if (region.length > 0)
                  {

                     for (var i = 0; i < region.length; i++)
                     {
                        htmls+='<option value="'+region[i].id_city_region+'">'+region[i].name_region+'</option>';

                     }

                   }
                   $("#id_city_region").html(htmls);
                   $(".elspinner").hide() ;

        });




}




function calculate_price_stand(){

  var price = $("#is_stand").attr("price");




  var date_start = $("#start_date").val();
  var time_start =  $("#start_hour").val();
  var date_end = $("#end_date").val();
  var time_end = $("#end_hour").val();


var diff_hour= get_between_two_time (time_start , time_end) ;
var dif_days = get_between_two_date (date_start , date_end) ;


 if (dif_days >= 1)
 {
      $(".new-price").text ( digits( price) + "ریال " );
      $("#is_stand").val("regular_price");

 }

 if (dif_days ==0)
 {

  if (diff_hour >= 4 )
  {

      $(".new-price").text ( price + "ریال " );
      $("#is_stand").val("regular_price");
  }

  if (diff_hour < 4 )
  {
    $(".new-price").text(product_price_text) ;
    $("#is_stand").val("sale_price");

  }

 }


}


function get_between_two_date(date1 , date2)
{
 if (!date1 || !date2 ) { return -1  ; }

  var date1_to_en= toEnglishDigits(date1) ;
  var date2_to_en= toEnglishDigits(date2) ;

  var date_1_date = date1_to_en.split("/") ;
  var date_2_date = date2_to_en.split("/") ;

  var date1_days = Number(date_1_date[0])*360+Number(date_1_date[1])*30+Number(date_1_date[2]) ;
  var date2_days = Number(date_2_date[0])*360+Number(date_2_date[1])*30+Number(date_2_date[2]) ;
  var difference = date2_days - date1_days;

  return  difference;


}



function get_between_two_time(time1 , time2 )
{

  if (!time1 || !time2 ) { return -1  ; }

  var time1_to_en= toEnglishDigits(time1) ;
  var time2_to_en= toEnglishDigits(time2) ;
   var substring = " ب ظ";
   var substring2 = " ق ظ";

  if (time1_to_en.indexOf(substring) !== -1)

  {

    var time_1_time= time1_to_en.replace(substring,'');
    time_1_time = time_1_time.split(":") ;
    time_1_time = Number(time_1_time[0])+ 12 + ":"+time_1_time[1] ;



  }

   if (time1_to_en.indexOf(substring2) !== -1)

  {

    var time_1_time= time1_to_en.replace(substring2,'');

  }

  if (time2_to_en.indexOf(substring) !== -1)

  {


      var time_2_time= time2_to_en.replace(substring,'');
    time_2_time = time_2_time.split(":") ;
    time_2_time = Number(time_2_time[0])+ 12 + ":"+time_2_time[1] ;

  }



  if (time2_to_en.indexOf(substring2) !== -1)

  {

    var time_2_time= time2_to_en.replace(substring2,'');

  }


var timeStart = new Date("01/01/2007 " + time_1_time);
         var timeEnd = new Date("01/01/2007 " + time_2_time);

         var difference = timeEnd - timeStart;

         difference = difference / 60 / 60 / 1000;


  return Math.abs( difference);


}

function toEnglishDigits(str) {

    // convert persian digits [۰۱۲۳۴۵۶۷۸۹]
    var e = '۰'.charCodeAt(0);
    str = str.replace(/[۰-۹]/g, function(t) {
        return t.charCodeAt(0) - e;
    });

    // convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
    e = '٠'.charCodeAt(0);
    str = str.replace(/[٠-٩]/g, function(t) {
        return t.charCodeAt(0) - e;
    });
    return str;
}


// fundrasing new 


// Success Projects
  $('.sp-tabs li').click(function(){
    let tab_id = $(this).attr('data-tab');

    $('.sp-tabs li').removeClass('active');
    $('.sp-tab-content').removeClass('active');

    $(this).addClass('active');
    $("#"+tab_id).addClass('active');
  })
  
  // FAQ
  $('.c-faq-block').click(function(){
  
    $(this).toggleClass('active');
    $(this).children('.c-faq-answer').stop().slideToggle();
  })
  
  // Show More
  $(".oc-show-more").on('click', function(){
    $(this).fadeOut();
    $('.grid-cards.campaign-cards').addClass('active');
  });


if ($("#fundraising-new-single").length > 0 ) {
  // Add Amount
  const inc = 1000000;
  const dec = 500000;
  const desiredAmount = $('#desired-amount');
  $("#inc").on('click', function(){
    const value = Number( desiredAmount.val().replaceAll(',',''));
    const plus =  parseInt(value)+parseInt(inc);
    desiredAmount.val(plus);
  })
  $("#dec").on('click', function(){
    const value = Number(desiredAmount.val().replaceAll(',',''));
    const plus =  parseInt(value)+parseInt(dec);
    if(plus < 0) {
      desiredAmount.val(0);
    } else {
      desiredAmount.val(plus);
    }
  }); 

}



// new hamdli 


  
  // Hamdeli Product Tab
  $('.new-product-tab li').on('click', function(){
    let tab_id = $(this).attr('data-tab');
    
    $('.new-product-tab li').removeClass('active');
    $('.flex-new-product').removeClass('active');
    
    $(this).addClass('active');
    $("#"+tab_id).addClass('active');

    if (tab_id == 'flp-tab-2') {
        $('#producthamdeli .new-section-h3').text('نماد همدلی تبریک ').show(400);
        $('#producthamdeli .new-section-h3-sub').text('حس خوب حمایت از کودکان محک در کنار شادمانی شما').show(400);
    }else {
        $('#producthamdeli .new-section-h3').text('نماد همدلی تسلیت ').show(400);
        $('#producthamdeli .new-section-h3-sub').text('پیوند تسلی عزیزان شما با بهبودی کودکان مبتلا به سرطان').show(400);

    }
  })
  
  // CSR Profile Slider
  $(".owl-product").owlCarousel({
    margin:10,
    loop:true,
    items:1,
    rtl: true,
    nav: false,
  });
  
  // Info
  $('.flex-header').on('click', function(){
    $(this).toggleClass('active').next('.content').stop().slideToggle();
  })
  
  // Pop-Up
  $('.new-hamdeli-popup-button').on('click', function(){
    $('.overlay').fadeIn();
    $('.hamdeli-pop-up').addClass('active');
    $('.hamdeli-pop-up .close').addClass('active');
  })
  $('.hamdeli-pop-up .close').on('click', function(){
    $('.overlay').fadeOut();
    $('.hamdeli-pop-up').removeClass('active');
  })
  
  // Edit Wizard
  $('.edit-wizard-text').on('click', function(){
    $(this).addClass('active');
    $('.show-save').addClass('active');
    $('.wizard-textarea').attr("contenteditable","true");
  })
  $('.show-save .cancel').on('click', function(){
    $('.show-save').removeClass('active');
    $('.wizard-textarea').attr("contenteditable","false");
    $('.edit-wizard-text').removeClass('active');
  })
  $('.show-save .save').on('click', function(){
    $('.show-save').removeClass('active');
    $('.wizard-textarea').attr("contenteditable","false");
    $('.edit-wizard-text').removeClass('active');

     $("#messageinimage").val($('.wizard-textarea').text()); 
  })
  
  // Checkbox
  $('#lablecontainer').on('click', function(e){
    e.preventDefault();
    $(this).parent().toggleClass('active');
    $('.fwd-checked').stop().slideToggle();
  })

  
  // Slider
  function sliderWidth() {
    let bodyWidth = $('body').width();
    let containerWidth = $('.container').width();
    let sliderOffset = (bodyWidth - containerWidth) / 2;
    $('.offset').css('width',`${sliderOffset+1}px`);
  }
  sliderWidth()
  
  $(window).on('resize',function(){
    sliderWidth()
  })



  // end new hamdli 



});
