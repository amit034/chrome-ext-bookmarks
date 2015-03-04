chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, {"text": "get_images"},{}, function handler(images){
	addImagesToGreatPics(tab.url,images);
  });
 
});
 
function addImagesToGreatPics(url,images){
    console.log("search great Pic");

    chrome.bookmarks.search('greatePics', function (treeNode){
        console.log("great Pic found");
	if ( !treeNode){
            chrome.bookmarks.create({'title': 'greatePics'}, function(bookmarkTreeNode){
            addPage(bookmarkTreeNode.index , url, images);
            });
        }else{
	    console.log("great Pic not found");
            addPage(treeNode.index,url,images);
        }    
    }
    )
}
function addPage(parentId,url,images){
    chrome.bookmarks.search(url, function (treeNode){
        if ( !treeNode){
            chrome.bookmarks.create({'title': url}, function(bookmarkTreeNode){
            addPageImages(bookmarkTreeNode.index , url, images);
            });
        }else{
            addPageImages(treeNode.index,url, images);
        }    
    }
    )
}

function addPageImages(parentId,url, images){
    
    $.each(images,function(index, url){
        chrome.bookmarks.search(url, function (treeNode){
            if ( !treeNode){
                chrome.bookmarks.create({'title': url , 'url': url});
            }    
        });
    });    
}
