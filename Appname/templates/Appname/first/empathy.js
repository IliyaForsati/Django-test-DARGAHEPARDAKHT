$(function() {

    // Edit text
    $(".nhmdli-edit-text").on('click', function () {
        $(this).slideUp(0);
        $('.nhmdli-input textarea').removeAttr('readonly');
    })

    // Select Frame
    $(".frame-ul li").on('click', function () {
        const src = $(this).attr('data-src');
        $(".data-src").attr('src', src);
        $(".frame-ul li").removeClass('active');
        $(this).addClass('active');
    })

    // Select Ratio
        $(".ratio li").on('click', function () {
        $(".ratio li").removeClass('active');
        $(this).addClass('active');
        let ratio = $(this).data('ratio');

        switch (ratio) {
            case ("portrate") : {
                $('#canvas-container.portrate').removeClass('none-visible');
                $('#canvas-container.landscape').addClass('none-visible');
                $('#canvas-container.sqare').addClass('none-visible');
                textboxStatuses = $(this).data('txtstatus')
                setOuterTextBoxesStatus(textboxStatuses);
                break;
            }
            case ("landscape") : {
                $('#canvas-container.portrate').addClass('none-visible');
                $('#canvas-container.landscape').removeClass('none-visible');
                $('#canvas-container.sqare').addClass('none-visible');
                textboxStatuses = $(this).data('txtstatus')
                setOuterTextBoxesStatus(textboxStatuses);
                break;
            }
            case ("sqare") : {
                $('#canvas-container.portrate').addClass('none-visible');
                $('#canvas-container.landscape').addClass('none-visible');
                $('#canvas-container.sqare').removeClass('none-visible');
                textboxStatuses = $(this).data('txtstatus')
                setOuterTextBoxesStatus(textboxStatuses);
                break;
            }
        }
    })


    function setOuterTextBoxesStatus(textboxStatuses){
        if (!parseInt(textboxStatuses[0])) {
            $("#outerTextBox1").attr('disabled','true')
            $("#outerTextBox1").css('color','#ffdbdb')
            $("#outerTextBox1").placeholder = "این متن برای این کارت فعال نیست";
            $("#outerTextBox1").val("این متن برای این کارت فعال نیست") ;
        }else {
            $("#outerTextBox1").removeAttr('disabled');
            $("#outerTextBox1").css('color','#1e1e1e')
            $("#outerTextBox1").attr("placeholder", "مثال : آقای فرمانفرما");
            $("#outerTextBox1").val("مثال : آقای فرمانفرما") ;

        }
        if (!parseInt(textboxStatuses[1])) {
            $("#outerTextBox2").attr('disabled','true')
            $("#outerTextBox2").css('color','#ffdbdb')
            $("#outerTextBox2").placeholder = "این متن برای این کارت فعال نیست";
            $("#outerTextBox2").val("این متن برای این کارت فعال نیست") ;

        }else {
            $("#outerTextBox2").removeAttr('disabled');
            $("#outerTextBox2").css('color','#1e1e1e')
            $("#outerTextBox2").attr("placeholder", "مثال : آقای فرمانفرما");
            $("#outerTextBox2").val("مثال : آقای فرمانفرما") ;

        }
        if (!parseInt(textboxStatuses[2])) {
            $("#outerTextBox3").attr('readonly','true')
            $("#outerTextBox3").css('color','#ffdbdb')
            $("#outerTextBox3").placeholder = "این متن برای این کارت فعال نیست";
            $("#outerTextBox3").val("این متن برای این کارت فعال نیست") ;

        }else {
            $("#outerTextBox3").removeAttr('readonly');
            $("#outerTextBox3").css('color','#1e1e1e')
            $("#outerTextBox3").attr("placeholder", "مثال : آقای فرمانفرما");
            $("#outerTextBox3").val("مثال : آقای فرمانفرما") ;

        }
    }

    // Copy Link
    let copyText = document.querySelector(".nhmdli-copy-link");
    if (copyText) {
        copyText.querySelector(".nhmdli-copy-it").addEventListener("click", function () {
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

    function fadeOut(element) {
        let opacity = 1;
        let timer = setInterval(() => {
            if (opacity <= 0) {
                clearInterval(timer);
                element.style.رهس = "none"; // Hide after fade out
            }
            element.style.opacity = opacity;
            opacity -= 0.1;
        }, 50);
    }

    function fadeIn(element) {
        let opacity = 0;
        element.style.display = "block"; // Show before fade in
        let timer = setInterval(() => {
            if (opacity >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = opacity;
            opacity += 0.1;
        }, 50);
    }

    let box = document.getElementById("box");
    document.querySelector("button").addEventListener("click", () => {
        if (box.style.opacity == 1) {
            fadeOut(box);
        } else {
            fadeIn(box);
        }
    });

    const sms_checkbox = document.getElementById("sms-checkbox")
    if (sms_checkbox) {
        sms_checkbox.addEventListener('change', function (event) {
            let sms_target = document.getElementsByClassName('sms-target-container');
            if (this.checked) {
                for (let target of sms_target) {
                    target.style.visibility = 'visible';
                    fadeIn(target);
                }
            } else {
                for (let target of sms_target) {
                    fadeOut(target);
                }
            }
        })
    }


        const phoneInput = document.getElementById("sms-target");
        const phoneIcon = document.getElementById("phone-icon");
        const phoneStep = document.querySelector(".phone-step");
        const messageStep = document.querySelector(".message-step");
        const backButton = document.getElementById("amend-button");
        const submitMessageButton = document.getElementById("submit-message");
        const message = document.getElementById("message");
        const editMessage = document.getElementById("edit-message");
        const messageControllers = document.getElementsByClassName("message-step-controllers");

        let phoneValid = false;

        // Phone number validation (10 digits, starts with 09)
        phoneInput.addEventListener("input", function() {
            const phonePattern = /^09\d{9}$/;
            if (phonePattern.test(phoneInput.value)) {
                phoneValid = true;
                phoneIcon.style.display = "block"; // Show the arrow icon
            } else {
                phoneValid = false;
                phoneIcon.style.display = "none"; // Hide the arrow icon if phone number is invalid
            }
        });

        // Handle the arrow icon click
        phoneIcon.addEventListener("click", function() {
            if (phoneValid) {
                // Slide out the phone step and slide in the message step
                phoneStep.classList.add("slide-out");
                setTimeout(function() {
                    phoneStep.style.display = "none"; // Hide the phone step after animation
                    messageStep.style.display = "block"; // Show the message step
                    messageStep.classList.add("slide-in");
                    message.focus();
                }, 500); // After the slide-out animation finishes
            }
        });


        // Handle the back button to go to the phone input step
        backButton.addEventListener("click", function(event) {
            event.preventDefault()
            messageStep.classList.remove("slide-in");
            messageStep.style.display = "none";
            phoneStep.style.display = "block";
            phoneStep.classList.remove("slide-out");
        });

        // Handle form submission
        submitMessageButton.addEventListener("click", function(event) {
            event.preventDefault()
            messageControllers[0].style.display = "none";
            message.setAttribute('readonly','readonly')
            message.style.borderColor = '#01aa9d'
            message.style.color = '#19776b'
            editMessage.style.display = 'block'
            message.blur();
        });

        // Handle form re-edit Message
        editMessage.addEventListener("click", function(event) {
            event.preventDefault()
            messageControllers[0].style.display = "block"
            message.removeAttribute('readonly')
            message.style.borderColor = '#e3e3e3';
            message.style.color = '#000000';
            this.style.display = 'none'
        });





})





