chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    /* If the received message has the expected format... */

  
  if (request.text && (request.text == "get_images")) {
 
   var images = $('img , image').filter(function(){
          return ($(this).width() > 150) ||  ($(this).height() > 150)
   });
   
   var imageUrls = [];
   $.each(images,function(index,image){
      imageUrls.push(image.src);
   });
   sendResponse(window.location.href, imageUrls);
  }
});

