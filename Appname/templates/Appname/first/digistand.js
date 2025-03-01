// Copy Link
let copyText = document.querySelector(".flex-copy-link");
if(copyText) {
    copyText.querySelector(".copy-it").addEventListener("click", function () {
        let input = copyText.querySelector(".copy-link-input");
        input.select();
        document.execCommand("copy");
        copyText.querySelector(".copy-it").innerText = 'لینک کپی شد!';
        window.getSelection().removeAllRanges();
        setTimeout(function () {
            copyText.querySelector(".copy-it").innerText = 'کپی لینک';
        }, 2500);
    });
}

jQuery(document).ready(function($) {
// Slider
    var randomDelay = Math.floor(Math.random() * (6000 - 3500 + 1)) + 3500;

    $('.yadbood-owl').each(function() {

        $(this).owlCarousel({
            loop: true,
            nav: false,
            rtl: true,
            autoplay: true,
            dots: false,
            items: 1,
            margin: 0, // space between items
            stagePadding: 0, // padding inside the stage
            autoplayTimeout: randomDelay, // Time between slides in milliseconds (3 seconds)
            autoplayHoverPause: true, // Pause autoplay on hover
            smartSpeed: 3000, // Speed of transitions in milliseconds
            animateIn: 'fadeIn', // Fade-in effect when a slide enters
            animateOut: 'fadeOut', // Fade-out effect when a slide leaves
        });
    })

    $('.digitalstand-share').on('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'صفحه ی یادبود عزیز درگذشته',
                text: $('.y-name').html() ,
                url: window.location.href,
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            console.log('Share not supported on this browser, do it the old way.');
        }
    });

    // Copy Link
    let copyText = document.querySelector(".digitalstand-share-box.copy");
    if(copyText) {
        copyText.addEventListener("click", function () {
            let input = copyText.querySelector(".nhmdli-copy-link-input");
            input.select();
            document.execCommand("copy");
            copyText.querySelector(".nhmdli-copy-it").innerText = 'لینک کپی شد!';
            window.getSelection().removeAllRanges();
            setTimeout(function () {
                copyText.querySelector(".nhmdli-copy-it").innerText = 'کپی لینک';
            }, 2500);
        });
    }


    $(document).ready(function() {
        $(".owl-carousel").owlCarousel({
            items: 5, // Display 5 items at a time
            margin: 10, // Space between items
            autoplay: true, // Enable auto-scrolling
            autoplayTimeout: 3000, // Interval time for auto-scroll (3 seconds)
            autoplayHoverPause: true, // Pause auto-scrolling on hover
            loop: true, // Infinite loop
            nav: false, // Show next/prev buttons
            dots: false, // Disable pagination dots
            smartSpeed: 3000, // Smooth transition speed (adjust for desired smoothness)
            responsive: {
                0: {
                    items: 1 // Show 1 item on mobile devices
                },
                600: {
                    items: 3 // Show 3 items on tablet-sized screens
                },
                1000: {
                    items: 5 // Show 5 items on larger screens
                }
            }
        });
    });



})