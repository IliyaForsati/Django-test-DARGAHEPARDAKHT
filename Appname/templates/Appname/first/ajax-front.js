document.addEventListener('DOMContentLoaded',function(){let url=new URL(window.location.href);let segments=url.pathname.split('/').filter(segment=>segment.length>0);let canvasText1,canvasText2,canvasText3,watermark;$('#digitalstand-register-request').on('submit',function(e){e.preventDefault();var formData=JSON.stringify($(this).serializeArray())
$.ajax({url:ajax_object.ajax_url,type:'POST',data:{contentType:"application/json",action:'ajaxSetDigitalStandRequest',receiver_name:JSON.parse(formData)[0].value,sender_name:JSON.parse(formData)[1].value,message:JSON.parse(formData)[2].value,ratio:ratio,hue:hue,img:img,card_id:card_id,canvas:canvas,nonce:ajax_object.nonce,},success:function(response){if(response.success){location.replace('/empathy-step-4?id='+response.data);}},error:function(xhr,status,error){}});})});