

chrome.browserAction.onClicked.addListener(function(tab) {
	
	chrome.tabs.sendMessage(tab.id, {"text": "get_images"},{}, function handler(response){
	addImagesToGreatPics(tab.url, response.images);
  });
 
});

function addImagesToGreatPics(url,images){
   

    chrome.bookmarks.search('greatePics', function (treeNode){
        
	if ( !treeNode || treeNode.length == 0 ){
            chrome.bookmarks.create({'title': 'greatePics'}, function(bookmarkTreeNode){
            addPage(bookmarkTreeNode.id , url, images);
            });
        }else{
	    
            addPage(treeNode[0].id,url,images);
        }    
    }
    )
}
function addPage(parentId,url,images){
    chrome.bookmarks.search(url, function (treeNode){
        if (  !treeNode || treeNode.length == 0){
            chrome.bookmarks.create({"parentId": parentId , 'title': url}, function(bookmarkTreeNode){
            addPageImages(bookmarkTreeNode.id , url, images);
            });
        }else{
            addPageImages(treeNode[0].id,url, images);
        }    
    }
    )
}

function addPageImages(parentId,url, images){
    
    $.each(images,function(index, url){
        chrome.bookmarks.search(url, function (treeNode){
            if (  !treeNode || treeNode.length == 0){
                chrome.bookmarks.create({"parentId": parentId , 'title': url , 'url': url});
            }    
        });
    });    
}
