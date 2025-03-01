jQuery(document).ready(function($) {
    'use strict';
    $("input[name=type_pay]:radio").click(function() {
        if ($('input[name=type_pay]:checked').val() == "public") {
            $('.online-help-span').slideDown()
        } else {
            $('.online-help-span').slideUp()
        }
    });
    $('a[href="https://mahak-charity.org/category/about/about-about/"],a[href="https://mahak-charity.org/category/about/"],a[href="#"],.remove-link > a').removeAttr('href');
    if ($(window).width() < 991) {
        $('.nav ul').find('li:has(ul)').children('a').removeAttr('href');
        $(".nav > div > ul > li:has(ul) > a").on('click', function() {
            $('.nav > div > ul > li:has(ul) > a').not(this).next('ul').slideUp();
            $(this).next('ul').stop().slideToggle();
        });
        $(".nav ul ul li:has(ul) a").on('click', function() {
            $('.nav ul ul li:has(ul) a').not(this).next('ul').slideUp();
            $(this).next('ul').stop().slideToggle();
        });
        $(".other-links").on('click', function() {
            $(this).toggleClass('active');
        });
        $(document).on('click', function(event) {
            if (!$(event.target).closest('.other-links').length && $('.other-links').hasClass("active")) {
                $(".other-links").removeClass("active");
            }
        });
    }
    $(".bar").on('click', function() {
        $(".nav").toggleClass("active");
        $("body").addClass("overflow-hidden");
        $(".overlay").fadeIn();
    });
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.nav , .bar').length && $('.nav').hasClass("active")) {
            $(".nav").removeClass("active");
            $(".overlay").fadeOut();
            setTimeout(function() {
                $("body").removeClass('overflow-hidden');
            }, 400);
        }
    });
    $(".alert-modal").on('click', function() {
        $(this).addClass("active2");
        $('.overlay').fadeOut();
        $("body").removeClass('overflow-hidden');
        setTimeout(function() {
            $(".alert-modal").removeClass('active active2');
        }, 400);
    });
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.alert-modal').length && $('.alert-modal').hasClass("active")) {
            $(".alert-modal").addClass("active2");
            $(".overlay").fadeOut();
            $("body").removeClass('overflow-hidden');
            setTimeout(function() {
                $(".alert-modal").removeClass('active active2');
            }, 400);
        }
    });
    $(".search-icon").on('click', function() {
        $(".search-box").stop().slideToggle();
        document.getElementById("input").focus();
    });
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.search-box , .search-icon').length && $('.search-box').is(':visible')) {
            $(".search-box").slideUp();
        }
    });
    var footer = $('.footer-lightslider').lightSlider({
        item: 3,
        pager: false,
        controls: false,
        loop: true,
        auto: true,
        rtl: true,
        centerSlide: true,
        pause: 4000,
        pauseOnHover: true,
        responsive: [{
            breakpoint: 1200,
            settings: {
                item: 3,
            }
        }, {
            breakpoint: 768,
            settings: {
                item: 3,
            }
        }, {
            breakpoint: 500,
            settings: {
                item: 2,
            }
        }]
    });
    $('.prev-button').on('click', function() {
        footer.goToPrevSlide();
    });
    $('.next-button').on('click', function() {
        footer.goToNextSlide();
    });
    $(window).scroll(function() {
        if ($(window).scrollTop() > 400) {
            $('header.header').addClass('fixed-header');
            $('.single').addClass('fixed-single');
        } else {
            $('header.header').removeClass('fixed-header');
            $('.single').removeClass('fixed-single');
        }
    });
    $(".office-title").on('click', function() {
        $(this).toggleClass('active').next('.office-content').stop().slideToggle();
    });
    $(".inner-office-title").on('click', function() {
        $('.inner-office-title').next('.inner-office-block').slideUp();
        $('.inner-office-title').not(this).removeClass('active');
        $(this).toggleClass('active').next('.inner-office-block').stop().slideToggle();
    });
    $(document).ready(function() {
        $(".product-slider").lightSlider({
            item: 1,
            rtl: true,
            controls: false,
            pager: true,
            loop: true,
            auto: true,
            pause: 4000,
            pauseOnHover: true,
        });
    });
    $('.sa-ul li a').each(function() {
        if ($(this).parent('li').children('ul').length > 0) {
            $(this).addClass('has-ul');
        }
    });
    $(".sa-box-content input.list").on('click', function() {
        $(".inner-shop-section").addClass('show-list');
    });
    $(".sa-box-content input.tile").on('click', function() {
        $(".inner-shop-section").removeClass('show-list');
    });
    $(".aside-button").on('click', function() {
        $(".shop-aside").toggleClass("active");
        $("body").addClass("overflow-hidden");
        $(".overlay").fadeIn();
    });
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.aside-button').length && $('.shop-aside').hasClass("active")) {
            $(".shop-aside").removeClass("active");
            $(".overlay").fadeOut();
            setTimeout(function() {
                $("body").removeClass('overflow-hidden');
            }, 400);
        }
    });
	
	
// 	$(".calendar").removeAttr("href");
	
	
	
	//Hamdeli
	$('.edit-hamdeli').on('click', function() {
			  $('.hamdeli-message-textarea').prop("disabled", false);
			})
			
			$('.add-hamdeli-input').on('click', function() {
				let hamdeli = $('.fw-append').length;
				if( hamdeli < 4 ){
					$(`<div class="flex-whatsapp fw-append">
							<div>
								<input type="text" class="hamdeli-input-simple"  name="emails[]">
							</div>
							<div>
								<input type="text" class="hamdeli-input-simple"  name="emails[]">
							</div>
						</div>`).insertAfter(".fw-append-head");
					console.log(hamdeli);
				}
				hamdeli++
				if( hamdeli == 5 ){
				   $('.add-hamdeli-input').addClass('disabled');
				}
			})
			
			$('.hamdeli-ok-ul').on('click', function() {
			  $('.hamdeli-ok').fadeOut();
			  $('#hamdeli-form,.header,.flex-hamdeli-create-account').removeClass('blur');
			})
			
			$('.hamdeli-message-submit').on('click', function(event) {
				
				 event.preventDefault();
				
			  $('.hamdeli-ok').fadeIn();
			  $('#hamdeli-form,.header,.flex-hamdeli-create-account').addClass('blur');
			  
			});
			
			$('#sform').on('click', function(event) {
				
				$("#hamdeli-form").submit();
			  
			})
			
			$('.send-email').on('click', function() {
			  $(".email-input").prop('disabled', function(i, v) { return !v; });
			})
			
			$('.send-sms').on('click', function() {
			  $(".sms-input").prop('disabled', function(i, v) { return !v; });
			})
	
	
	
	
	
	
	
	
    $('.product-tab li').on('click', function() {
        let tab_id = $(this).attr('data-tab');
        $('.product-tab li').removeClass('active');
        $('.tab-content').removeClass('active');
        $(this).addClass('active');
        $("#" + tab_id).addClass('active');
    })
    $('.product-gallery').lightSlider({
        gallery: true,
        item: 1,
        loop: true,
        rtl: true,
        thumbItem: 4,
        slideMargin: 0,
        enableDrag: true,
        currentPagerPosition: 'middle',
        onSliderLoad: function(el) {
            el.lightGallery({
                selector: '.product-gallery .lslide'
            });
        }
    });
    $('.money,.flex-input-item input[name="price"]').on('keyup click change paste input', function(event) {
        $(this).val(function(index, value) {
            if (value != "") {
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
                    return components.join('.');
                else
                    return '';
            }
        });
    });
    footer
    $('.flex-campaign > label').on('click', function() {
        $('.flex-campaign > label').removeClass('active');
        $(this).addClass('active');
    })
    $('.campaign-money').on('click', function() {
        $('.flex-campaign > label').removeClass('active');
        $(".flex-campaign > label input").prop("checked", false);
    })
	
	
	
	
	
	//Fetrieh
	$( ".pay-fetrieh" ).on('click',function() {
		$(".fetrieh-first").slideUp();
		$(".fetrieh-second").slideDown();
	});
	
	$( ".pay-kafareh" ).on('click',function() {
		$(".fetrieh-first,.fetrieh-second").slideUp();
		$(".fetrieh-third").slideDown();
	});
	
	$( ".fetrieh-back" ).on('click',function() {
		$(".fetrieh-first").slideDown();
		$(".fetrieh-second,.fetrieh-third").slideUp();
		setTimeout(function(){
			$(".fetrieh-change").closest('form').slideDown().next('form').slideUp();
		}, 400)
	});
	
	$( ".fetrieh-change" ).on('click',function() {
		$(this).closest('form').slideUp().next('form').slideDown();
	});

    $(".select-date").pDatepicker({
        initialValueType: "gregorian",
        format: "YYYY/MM/DD",
        onSelect: "year",
        initialValue: false,
		minDate: new persianDate().add('day', 3).valueOf(),
//        minDate: new Date('2020-3-20')
    });
    
    $(".select-date-stand input").pDatepicker({
        initialValueType: "gregorian",
        format: "YYYY/MM/DD",
        onSelect: "year",
        initialValue: false,
        minDate: new persianDate().add('day', 3).valueOf(),
        checkDate: function(unix){
            return  ( new persianDate(unix).format('M-D') != '۱۲-۲۹') &&
                    ( new persianDate(unix).format('M-D') != '۱-۱۲') &&
                    ( new persianDate(unix).format('M-D') != '۱-۱۳') &&
                    ( new persianDate(unix).format('M-D') != '۱-۱') &&
                    ( new persianDate(unix).format('M-D') != '۱-۲') &&
                    ( new persianDate(unix).format('M-D') != '۱-۳') &&
                    ( new persianDate(unix).format('M-D') != '۱-۴') ;

            //return new persianDate(unix).day() != 4;
        }
    });
    $(".hour-selector input,#talar-start-time,#talar-end-time").pDatepicker({
        format: "hh:mm a",
        onlyTimePicker: true,
        initialValue: false,
        formatDate: "hh:mm",
    });
    $(window).on('load scroll', function() {
        $("p:contains('(+۰)')").each(function() {
            var str = $(this).text();
            $(this).text(str.replace(/\(\+۰\)/g, ""));
        });
    });
	
	
	
	
	
	
	
	
	$('.question').on('click', function(e) {
			$(this).next('.answer').stop().slideToggle();
			$(this).toggleClass('active');
		})
        $('.hamdeli-landing-button').on('click', function(e) {
			$(".hl-modal").fadeIn();
			$(".hamdeli-landing").addClass('blur');
		})
        $('.hl-close').on('click', function(e) {
			$(".hl-modal").fadeOut();
			$(".hamdeli-landing").removeClass('blur');
		})
		
		$('.flex-level').lightSlider({
			item:4,
			loop:true,
			slideMove:2,
			easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
			speed:600,
			controls: false,
			pager: false,
			slideMargin: 50,
			enableTouch: false,
			enableDrag: false,
			responsive : [
				{
					breakpoint:800,
					settings: {
						item:2,
						slideMove:1,
						slideMargin:6,
						pager: true,
						enableTouch: true,
						enableDrag: true,
					  }
				},
				{
					breakpoint:480,
					settings: {
						item:2,
						slideMove:1,
						pager: true,
						enableTouch: true,
						enableDrag: true,
					  }
				}
			]
		});
		
		$('.flex-mazaya').lightSlider({
			item:3,
			loop:true,
			slideMove:2,
			easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
			speed:600,
			controls: false,
			pager: false,
			slideMargin: 50,
			enableTouch: false,
			enableDrag: false,
			responsive : [
				{
					breakpoint:800,
					settings: {
						item:2,
						slideMove:1,
						slideMargin:6,
						pager: true,
						enableTouch: true,
						enableDrag: true,
					  }
				},
				{
					breakpoint:480,
					settings: {
						item:2,
						slideMove:1,
						pager: true,
						enableTouch: true,
						enableDrag: true,
					  }
				}
			]
		});
		
		
		
		
		
		let regal = $('.hl-comment-box-block').lightSlider({
			item:1,
			loop:true,
			slideMove:2,
			easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
			speed:600,
			pager: true,
			controls: false,
			slideMargin: 50,
		});
		
		
		$('#prev-comment').on('click', function () {
			regal.goToPrevSlide();
		});
		$('#next-comment').on('click', function () {
			regal.goToNextSlide();
		});
	
	
	
	
	
	
	
    $('<div class="calling">جهت ارسال سفارش، در سریع‌ترین زمان ممکن با شما تماس می‌گیریم</div>').insertBefore('.woocommerce-checkout-payment');
    $(".select-date-stand input").attr("readonly", "true");
    $('<div class="woo-sidebar-button"><span></span><span></span><span></span></div>').insertAfter('.woocommerce-MyAccount-navigation');
    $('<div class="update-button">بعد از افزایش تعداد محصول، برای اعمال آن دکمه بروز رسانی را بزنید</div>').insertAfter('.shop_table.shop_table_responsive.cart.woocommerce-cart-form__contents');
    $(`<div class="login-banner">
	  <span class='lb-title'>نیکوکار گرامى</span><span>
با ایجاد حساب كاربرى در وب‌سایت محک، می‌توانید تاريخچه كمك‌های خود برای تأمین هزینه دارو و درمان کودکان مبتلا به سرطان تحت حمايت محك را مشاهده کنید. پرداخت‌هایی شامل عضویت، درمانیاری و کمک آنلاین و همچنین سفارش قلک در این حساب قابل پیگیری است. با داشتن حساب كاربرى می‌توانید سهم خود در نجات جان قهرمان‌های کوچک محک و جزئیات آن را ثبت، ذخيره و پيشينه نيكوكارى تان را دنبال كنيد.</span><img src="https://mahak-charity.org/wp-content/themes/kalhors-mahak/images/register.jpg" alt="ورود"></div>`).insertBefore('.woocommerce-form.woocommerce-form-login.login');
    $(".woo-sidebar-button").on('click', function() {
        $(".woocommerce-MyAccount-navigation").toggleClass("active");
        $("body").addClass("overflow-hidden");
        $(".overlay").fadeIn();
    });
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.woo-sidebar-button').length && $('.woocommerce-MyAccount-navigation').hasClass("active")) {
            $(".woocommerce-MyAccount-navigation").removeClass("active");
            $(".overlay").fadeOut();
            setTimeout(function() {
                $("body").removeClass('overflow-hidden');
            }, 400);
        }
    });
});
(function(win, doc) {
    'use strict';
    if (!doc.querySelector || !win.addEventListener || !doc.documentElement.classList) {
        return;
    }
    var Spinner = function(rootElement) {
        var addButtonSelector = '.js_spin-add';
        var removeButtonSelector = '.js_spin-remove';
        var numberInputSelector = '.js_spin-input';
        var addButtonMarkup = '<button type="button" class="FormUnit-quantity FormUnit-quantity--add js_spin-add Icon Icon--isClosed">+</button>';
        var removeButtonMarkup = '<button type="button" class="FormUnit-quantity FormUnit-quantity--remove js_spin-remove Icon Icon--remove">-</button>';
        var container;
        var markup;
        var numberInput;
        var addButton;
        var removeButton;
        var maxValue;
        var minValue;
        var step;
        var newValue;
        var i;
        this.init = function() {
            container = rootElement;
            markup = container.innerHTML;
            markup += removeButtonMarkup;
            markup += addButtonMarkup;
            container.innerHTML = markup;
            addButton = rootElement.querySelector(addButtonSelector);
            removeButton = rootElement.querySelector(removeButtonSelector);
            numberInput = rootElement.querySelector(numberInputSelector);
            if (numberInput.hasAttribute('max')) {
                maxValue = parseInt(numberInput.getAttribute('max'), 10);
            } else {
                maxValue = 99999;
            }
            if (numberInput.hasAttribute('min')) {
                minValue = parseInt(numberInput.getAttribute('min'), 10);
            } else {
                minValue = 0;
            }
            if (numberInput.hasAttribute('step')) {
                step = parseInt(numberInput.getAttribute('step'), 10);
            } else {
                step = 1;
            }
            numberInput.setAttribute('type', 'text');
            addButton.addEventListener('click', add, false);
            removeButton.addEventListener('click', remove, false);
        };
        this.setAddButtonMarkup = function(markup) {
            addButtonMarkup = markup;
        };
        this.setRemoveButtonMarkup = function(markup) {
            removeButtonMarkup = markup;
        };
        this.setAddButtonSelector = function(selector) {
            addButtonSelector = selector;
        };
        this.setRemoveSelector = function(selector) {
            removeButtonSelector = selector;
        };
        this.setNumberInputSelector = function(selector) {
            numberInputSelector = selector;
        };
        var add = function(ev) {
            newValue = parseInt(numberInput.value, 10) + step;
            if (newValue <= maxValue) {
                numberInput.value = newValue;
                $(numberInput).trigger('change');
                removeButton.disabled = false;
            }
            if (numberInput.value == maxValue || newValue > maxValue) {
                addButton.disabled = true;
            }
            ev.preventDefault();
        };
        var remove = function(ev) {
            newValue = parseInt(numberInput.value, 10) - step;
            if (newValue >= minValue) {
                numberInput.value = newValue;
                $(numberInput).trigger('change');
                addButton.disabled = false;
            }
            if (numberInput.value == minValue || newValue < minValue) {
                removeButton.disabled = true;
            }
            ev.preventDefault();
        };
    };
    var spins = doc.querySelectorAll('.js_spin');
    var spinsTotal = spins.length;
    var spin;
    var i;
    for (i = 0; i < spinsTotal; i = i + 1) {
        spin = new Spinner(spins[i]);
        spin.init();
    }
}(this, this.document));


$('.shop_table .quantity input').off('change').on('change' , function(){
    $( ':input[name="update_cart"]').click();
})

