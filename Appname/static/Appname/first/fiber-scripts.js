document.addEventListener('DOMContentLoaded', function() {


    let url = new URL(window.location.href);
    let segments = url.pathname.split('/').filter(segment => segment.length > 0);
    let canvasText1, canvasText2, canvasText3, watermark; // References to the Fabric.js text objects

    var canvasPortrate = new fabric.Canvas('canvas-portrate', {
        isDrawingMode: false,  // Disable drawing mode for touch
        selection: true,       // Enable selection of objects
    });
    var canvasSqare = new fabric.Canvas('canvas-sqare', {
        isDrawingMode: false,  // Disable drawing mode for touch
        selection: true,       // Enable selection of objects
    });
    var canvasLandscape = new fabric.Canvas('canvas-landscape', {
        isDrawingMode: false,  // Disable drawing mode for touch
        selection: true,       // Enable selection of objects
    });



    // Extend fabric.Image to include the 'src' and filters in the JSON output
    fabric.Image.prototype.toObject = (function(toObject) {
        return function(propertiesToInclude) {
            return fabric.util.object.extend(toObject.call(this, propertiesToInclude), {
                card_id: this.card_id || '',
                src: this.src || '',
                angle: this.angle,
                scaleX: this.scaleX,
                scaleY: this.scaleY,
                color: this.color,
                size: this.size,
                visibility: this.visibility,
                filters: this.filters.map(filter => filter && filter.toObject ? filter.toObject() : null)
            });
        };
    })(fabric.Image.prototype.toObject);


    // Ensure font is loaded before adding text
    document.fonts.load('10pt "YekanBakh"').then(function() {
        console.log('Font loaded');
    });


    if (segments[0] == 'empathy-step-3') {
        let params = new URLSearchParams(url.search);
        specificParam = params.get('pack-id');
        initPackCard(specificParam);
    }

    if (segments[0] == 'empathy-step-4') {
        var canvas = new fabric.Canvas('canvas');
        loadTheCanvasFromDB(canvas,JSON.parse($('#savedData').val()));
    }
    if (segments[0] == 'empathy-callback') {
        var canvas = new fabric.Canvas('canvas');
        loadTheCanvasFromDB(canvas,JSON.parse($('#savedData').val()));
    }
    if (segments[0] == 'empathy-download') {
        var canvas = new fabric.Canvas('canvas');
        loadTheCanvasFromDB(canvas,JSON.parse($('#savedData').val()));
    }

    function TextFeatures(size, color, posX, posY , visibility) {
        this.size = size
        this.color = color
        this.posX = posX
        this.posY = posY
        this.visibility = visibility
    }

    function createTextActivationStatus(text1,text2,text3){
        let txtStatus = text1 +text2 +text3
        return txtStatus
    }

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
            $("#outerTextBox2").attr('readonly','true')
            $("#outerTextBox2").css('color','#ffdbdb')
            $("#outerTextBox2").placeholder = "این متن برای این کارت فعال نیست";
            $("#outerTextBox2").val("این متن برای این کارت فعال نیست") ;

        }else {
            $("#outerTextBox2").removeAttr('readonly');
            $("#outerTextBox2").css('color','#1e1e1e')
            $("#outerTextBox2").attr("placeholder", "مثال : آقای فرمانفرما");
            $("#outerTextBox2").val("مثال : آقای فرمانفرما") ;

        }
        if (!parseInt(textboxStatuses[2])) {
            $("#outerTextBox3").attr('disabled','true')
            $("#outerTextBox3").css('color','#ffdbdb')
            $("#outerTextBox3").placeholder = "این متن برای این کارت فعال نیست";
            $("#outerTextBox3").val("این متن برای این کارت فعال نیست") ;

        }else {
            $("#outerTextBox3").removeAttr('disabled');
            $("#outerTextBox3").css('color','#1e1e1e')
            $("#outerTextBox3").attr("placeholder", "مثال : آقای فرمانفرما");
            $("#outerTextBox3").val("مثال : آقای فرمانفرما") ;

        }
    }


    function initPackCard(pack_id) {

        $.ajax({
            url: ajax_object.ajax_url, // AJAX URL from localized script
            type: 'POST',
            data: {
                action: 'getPackCards',
                pack_id :  pack_id,
                nonce: ajax_object.nonce, // Security nonce
            } ,
            success:  function(response) {
                response.data.forEach(async function (item) {
                    switch (item.card_scale) {
                        case ("1"): {
                            await loadImageInCavas(canvasPortrate,item.card_address,item.id);
                            //addImageWatermark(canvasPortrate);
                            $("li[data-ratio='portrate']").data('txtstatus',createTextActivationStatus(item.text1_status,item.text2_status,item.text3_status))
                            setOuterTextBoxesStatus(item.text1_status+item.text2_status+item.text3_status);

                            addRTLTextBoxes(canvasPortrate, {
                                text1 : new TextFeatures(item.text1_size, item.text1_color, item.text1_posX, item.text1_posY, item.text1_status),
                                text2 : new TextFeatures(item.text2_size, item.text2_color, item.text2_posX, item.text2_posY, item.text2_status),
                                text3 : new TextFeatures(item.text3_size, item.text3_color, item.text3_posX, item.text3_posY, item.text3_status)
                            });

                            syncText(canvasPortrate);
                            saveTheCanvas(canvasPortrate,"canvasPortrateData");
                            break;
                        }
                        case ("2"): {
                            await loadImageInCavas(canvasSqare,item.card_address,item.id);
                            //addImageWatermark(canvasSqare);
                            $("li[data-ratio='sqare']").data('txtstatus',createTextActivationStatus(item.text1_status,item.text2_status,item.text3_status))

                            addRTLTextBoxes(canvasSqare, {
                                text1 : new TextFeatures(item.text1_size, item.text1_color, item.text1_posX, item.text1_posY, item.text1_status),
                                text2 : new TextFeatures(item.text2_size, item.text2_color, item.text2_posX, item.text2_posY, item.text2_status),
                                text3 : new TextFeatures(item.text3_size, item.text3_color, item.text3_posX, item.text3_posY, item.text3_status)
                            });
                            syncText(canvasSqare);
                            saveTheCanvas(canvasSqare,"canvasSqareData");
                            break;

                        }
                        case ("3"): {
                            await loadImageInCavas(canvasLandscape,item.card_address,item.id);
                            //addImageWatermark(canvasLandscape);
                            $("li[data-ratio='landscape']").data('txtstatus',createTextActivationStatus(item.text1_status,item.text2_status,item.text3_status))

                            addRTLTextBoxes(canvasLandscape, {
                                text1 : new TextFeatures(item.text1_size, item.text1_color, item.text1_posX, item.text1_posY, item.text1_status),
                                text2 : new TextFeatures(item.text2_size, item.text2_color, item.text2_posX, item.text2_posY, item.text2_status),
                                text3 : new TextFeatures(item.text3_size, item.text3_color, item.text3_posX, item.text3_posY, item.text3_status)
                            });
                            syncText(canvasLandscape);
                            saveTheCanvas(canvasLandscape,"canvasLandscapeData");
                            break;

                        }
                    }
                })
            },
            error: function(xhr, status, error) {
            }
        });
    }




    function loadImageInCavas(canvas,imageUrl,additional_data) {
        fabric.Image.fromURL(imageUrl, function(img) {
            const canvasAspect = canvas.width / canvas.height;
            const imgAspect = img.width / img.height;

            if (imgAspect > canvasAspect) {
                img.scaleToWidth(canvas.width);
            } else {
                img.scaleToHeight(canvas.height);
            }

            img.set({
                left: canvas.width / 2 - img.getScaledWidth() / 2,
                top: canvas.height / 2 - img.getScaledHeight() / 2,
                selectable: false,
                evented: false,
                id: 'mainImage'
            });


            // Add a hue-rotate filter to the image
            img.filters.push(new fabric.Image.filters.HueRotation({ rotation: 0 })); // Initial rotation: 0
            img.applyFilters();

            img.src = imageUrl; // Ensure this matches the actual image path
            img.card_id = additional_data; // Ensure this matches the actual image path

            canvas.add(img);
            img.sendToBack();

        });
    }

    const hues = document.querySelectorAll('.hue-saturation');

    hues.forEach(el => el.addEventListener('click', event => {
        hueValue = event.target.getAttribute("data-hue");
        updateHueRotation(canvasPortrate,hueValue);
        updateHueRotation(canvasSqare,hueValue);
        updateHueRotation(canvasLandscape,hueValue);
    }));

    // Function to update hue rotation
    function updateHueRotation(canvas, value) {
        // Find the main image on the canvas
        const mainImage = canvas.getObjects().find(obj => obj.id === 'mainImage');
        if (mainImage) {
            // Check if the image already has a HueRotation filter
            let hueFilter = mainImage.filters.find(filter => filter.type === 'HueRotation');

            if (!hueFilter) {
                // Add the HueRotation filter if not present
                hueFilter = new fabric.Image.filters.HueRotation({ rotation: 0 });
                mainImage.filters.push(hueFilter);
            }

            // Update the rotation value
            hueFilter.rotation = (value * Math.PI) / 180; // Convert degrees to radians

            // Apply the filter and re-render the canvas
            mainImage.applyFilters();
            canvas.renderAll();
        } else {
            console.warn('Main image not found on the canvas.');
        }

    }

    // Add watermark text
    function addWatermark(canvas) {
        if (watermark) return; // Prevent multiple watermarks

        watermark = new fabric.Text('Watermark', {
            left: canvas.width - 150,
            top: canvas.height - 50,
            fontSize: 20,
            fill: 'rgba(255, 255, 255, 0.5)',  // Semi-transparent white
            fontFamily: 'Vazir',
            selectable: false,   // Make watermark unselectable
            evented: false       // Prevent events on watermark
        });

        canvas.add(watermark);
        canvas.renderAll();
    }
    function addImageWatermark(canvas) {
        if (watermark) return; // Prevent multiple watermarks

        fabric.Image.fromURL('text.png', function(img) {
            img.set({
                left: 0,  // Adjust as needed
                top: 0,
                scaleX: 1,  // Scale down if needed
                scaleY: 1,
                opacity: 0.5,  // Set transparency for watermark
                selectable: false,
                evented: false
            });

            watermark = img; // Reference the watermark image
            canvas.add(watermark);
            canvas.renderAll();
        });
    }




    // Function to add three draggable, editable RTL text boxes with Persian font
    function addRTLTextBoxes(canvas,features) {
        // if (canvasText1 || canvasText2 || canvasText3) return; // Prevent adding multiple sets

        canvasText1 = new fabric.Textbox('مثال: آقای دکتر مودت', {
            right: Number(features.text1.posX) ?? 30,
            visible: features.text1.visibility === "1",
            top: Number(features.text1.posY) ?? 100,
            fontSize: Number(features.text1.size) ?? 20,
            fill: features.text1.color ?? '#050505',
            fontFamily: 'YekanBakh',
            textAlign: 'right',
            editable: true,
            width: 200,
            angle: 0, // Initial rotation
            scaleX: 1, // Initial scaleX
            scaleY: 1,  // Initial scaleY
            selectable: true,
            evented: true
        });


        canvasText2 = new fabric.Textbox('مثال: ونیک  توتونچیان', {
            right:  Number(features.text2.posX) ?? 30,
            visible: features.text2.visibility === "1",
            top:  Number(features.text2.posY) ?? 370,
            fontSize:  Number(features.text2.size) ?? 20,
            fill:  features.text2.color ?? '#000000',
            fontFamily: 'YekanBakh',
            textAlign: 'right',
            editable: true,
            width: 200,
            angle: 0, // Initial rotation
            scaleX: 1, // Initial scaleX
            scaleY: 1,  // Initial scaleY
            selectable: true,
            evented: true
        });


        canvasText3 = new fabric.Textbox('لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.', {
            right:  Number(features.text3.posX) ?? 30,
            visible: features.text3.visibility === "1",
            top:  Number(features.text3.posY) ?? 200,
            fontSize:  Number(features.text3.size) ?? 20,
            fill:  features.text3.color ?? '#000000',
            fontFamily: 'YekanBakh',
            textAlign: 'right',
            editable: true,
            width: 300,
            angle: 0, // Initial rotation
            scaleX: 1, // Initial scaleX
            scaleY: 1,  // Initial scaleY
            selectable: true,
            evented: true
        });

        // Add text boxes to the canvas
        canvas.add(canvasText1, canvasText2, canvasText3);

        canvas.renderAll();

        canvasText1.bringToFront();
        canvasText2.bringToFront();
        canvasText3.bringToFront();
        canvas.renderAll();

        // Sync initial values with outer text boxes
        document.getElementById('outerTextBox1').value = canvasText1.text;
        document.getElementById('outerTextBox2').value = canvasText2.text;
        document.getElementById('outerTextBox3').value = canvasText3.text;

        // Sync changes on the canvas with the outer text boxes
        syncText(canvasText1, 'outerTextBox1', canvas);
        syncText(canvasText2, 'outerTextBox2', canvas);
        syncText(canvasText3, 'outerTextBox3', canvas);


    }


    // Function to sync a canvas text box with an outer text box
    function syncText(canvasText, outerTextBoxId , canvas) {
        const outerTextBox = document.getElementById(outerTextBoxId);

        // Update outer text box when editing is done on canvas
        canvasText.on('editing:exited', function() {
            outerTextBox.value = canvasText.text;
            canvas.renderAll();
        });

        // Update canvas text when the outer text box changes
        if (outerTextBox != null && typeof outerTextBox != "undefined") {
            outerTextBox.addEventListener('input', function() {
                canvasText.text = this.value;
                canvas.renderAll();
            });
        }
    }


    // Save text box properties as JSON
    function saveTheCanvas(canvas,nameInLocalStorage) {
        const jsonData = JSON.stringify(canvas.toJSON(['left', 'top', 'text', 'fontSize', 'fill', 'width', 'height', 'id', 'fontFamily', 'textAlign', 'src', 'filters','angle', 'scaleX', 'scaleY']));
        localStorage.setItem(nameInLocalStorage, jsonData);
        console.log('Text box positions and properties saved!');
    };

    // Save text box properties as JSON
    function getTheCanvas(canvas) {
        return  JSON.stringify(canvas.toJSON(['left', 'top', 'text', 'fontSize', 'fill', 'width', 'height', 'id', 'fontFamily', 'textAlign', 'src', 'filters','angle', 'scaleX', 'scaleY']));
    };

    // Load the saved text box properties from JSON and make the main image unselectable again
    function loadTheCanvas(canvas,nameInLocalStorage) {
        const savedData = localStorage.getItem(nameInLocalStorage);
        if (savedData) {
            canvas.loadFromJSON(savedData, function() {
                const objects = canvas.getObjects();
                objects.forEach(obj => {
                    if (obj.id === 'mainImage' && obj.src) {
                        img.set({
                            left: obj.left,
                            top: obj.top,
                            scaleX: obj.scaleX,
                            scaleY: obj.scaleY,
                            selectable: obj.selectable,
                            evented: obj.evented,
                            id: obj.id
                        });
                        // Restore filters
                        if (obj.filters) {
                            const restoredFilters = obj.filters.map(filterData => {
                                if (filterData && filterData.type === 'HueRotation') {
                                    return new fabric.Image.filters.HueRotation(filterData);
                                }
                                return null;
                            }).filter(f => f !== null);
                            img.filters = restoredFilters;
                            img.applyFilters();
                        }
                        canvas.remove(obj); // Remove the old object
                        canvas.add(img); // Add the recreated image
                        canvas.renderAll();

                    } else if (obj.type === 'textbox') {
                        if (!canvasText1) canvasText1 = obj;
                        else if (!canvasText2) canvasText2 = obj;
                        else if (!canvasText3) canvasText3 = obj;
                    }
                });

                // Sync loaded text with outer text boxes
                document.getElementById('outerTextBox1').value = canvasText1.text;
                document.getElementById('outerTextBox2').value = canvasText2.text;
                document.getElementById('outerTextBox3').value = canvasText3.text;

                syncText(canvasText1, 'outerTextBox1');
                syncText(canvasText2, 'outerTextBox2');
                syncText(canvasText3, 'outerTextBox3');

                canvas.renderAll();
            });
            console.log('Text boxes loaded successfully!');
        } else {
            console.log('No saved data found.');
        }
    };


    // Load the saved text box properties from JSON and make the main image unselectable again
    function loadTheCanvasFromDB(canvas,savedData) {
        if (savedData) {
            canvas.loadFromJSON(savedData, function() {
                const objects = canvas.getObjects();
                objects.forEach(obj => {
                    if (obj.id === 'mainImage' && obj.src) {
                        obj.set({
                            left: obj.left,
                            top: obj.top,
                            scaleX: obj.scaleX,
                            scaleY: obj.scaleY,
                            selectable: false, //obj.selectable,
                            evented: false, //obj.evented,
                            hasControls : false, //obj.evented,
                            id: obj.id
                        });
                        // Restore filters
                        if (obj.filters) {
                            const restoredFilters = obj.filters.map(filterData => {
                                if (filterData && filterData.type === 'HueRotation') {
                                    return new fabric.Image.filters.HueRotation(filterData);
                                }
                                return null;
                            }).filter(f => f !== null);
                            obj.filters = restoredFilters;
                            obj.applyFilters();
                        }

                    } else if (obj.type === 'textbox') {
                        obj.selectable = false;
                        obj.evented = false;
                        obj.hasControls = false;
                        obj.lockMovementX = true;
                        obj.lockMovementY = true;
                        if (!canvasText1) {
                            canvasText1 = obj;
                            canvas.selection = false; // Disable group selection
                        }
                        else if (!canvasText2) {
                            canvasText2 = obj;
                            canvas.selection = false; // Disable group selection
                        }
                        else if (!canvasText3) {
                            canvasText3 = obj;
                            canvas.selection = false; // Disable group selection
                        }
                    }
                    canvas.remove(obj); // Remove the old object
                    canvas.add(obj); // Add the recreated image
                    canvas.selection = false; // Disable group selection
                    canvas.on('object:selected', function(e) {
                        if (!e.target.evented) {
                            canvas.discardActiveObject(); // Deselect the object
                        }
                    });
                    canvas.forEachObject(function(obj) {
                        obj.lockMovementX = true;  // Prevent horizontal movement
                        obj.lockMovementY = true;  // Prevent vertical movement
                    });
                    canvas.renderAll();
                });

                // Sync loaded text with outer text boxes
                document.getElementById('outerTextBox1').value = canvasText1.text;
                document.getElementById('outerTextBox2').value = canvasText2.text;
                document.getElementById('outerTextBox3').value = canvasText3.text;

                syncText(canvasText1, 'outerTextBox1');
                syncText(canvasText2, 'outerTextBox2');
                syncText(canvasText3, 'outerTextBox3');

                canvas.renderAll();
            });
            console.log('Text boxes loaded successfully!');
        } else {
            console.log('No saved data found.');
        }
    };

    const downloadBtn = document.getElementById('empathy-download')
    if(downloadBtn) {
        downloadBtn.addEventListener('click', function () {
            theCanvas = document.getElementById('canvas')
            donwLoadCanvas(theCanvas);
        })
    }


   function donwLoadCanvas(canvas) {
        const dataURL = canvas.toDataURL({
            format: 'png',
            quality: 1
        });

        const link = document.createElement('a');
        link.download = 'image-with-text.png';
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };




    $('#empathy-register-request').on('submit', function (e) {
        e.preventDefault();
        // var formData = $(this).serialize();

        var formData = JSON.stringify($(this).serializeArray())
        const fieldsObject = JSON.parse(formData).reduce((obj,item)=>{obj[item.name] = item.value; return obj},{})

        // // Convert FormData to a plain object (optional)
        // const formDataObject = {};
        // formData.forEach((value, key) => {
        //     formDataObject[key] = value;
        // });


        var ratio = $(".ratio li.active").data('ratio');
        var hue = $(".hue-saturation.active img").data('data-hue');
        switch (ratio) {
            case ("portrate") : {
                var img = canvasPortrate.getObjects()[0].src;
                var card_id = canvasPortrate.getObjects()[0].card_id;
                saveTheCanvas(canvasPortrate , 'canvasPortrate');
                var canvas = getTheCanvas(canvasPortrate);
                break;
            }
            case ("landscape") : {
                var img = canvasLandscape.getObjects()[0].src;
                var card_id = canvasLandscape.getObjects()[0].card_id;
                saveTheCanvas(canvasLandscape , 'canvasLandscape');
                var canvas = getTheCanvas(canvasLandscape);
                break;
            }
            case ("sqare") : {
                var img = canvasSqare.getObjects()[0].src;
                var card_id = canvasSqare.getObjects()[0].card_id;
                saveTheCanvas(canvasSqare, 'canvasSqare');
                var canvas = getTheCanvas(canvasSqare);
                break;
            }
        }

        $.ajax({
            url: ajax_object.ajax_url, // AJAX URL from localized script
            type: 'POST',
            data: {
                contentType: "application/json",
                action: 'setEmpathyRequest',
                receiver_name : fieldsObject?.giver,
                sender_name : fieldsObject?.sender,
                message : fieldsObject?.message,
                ratio : ratio,
                hue : hue,
                img : img,
                card_id : card_id,
                canvas : canvas,
                nonce: ajax_object.nonce, // Security nonce
            } ,
            success:  function(response) {
                if(response.success) {
                    // location.replace('/empathy-step-4?id=' + response.data);
                    window.location.href = "/empathy-step-4?id=" + response.data;
                }
            },
            error: function(xhr, status, error) {
            }
        });


    })




});