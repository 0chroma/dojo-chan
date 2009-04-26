dojo.provide("chan.url");

chan.url = {
    resolve: function(url){
        // get rid of hash
        var hashIndex = url.indexOf("#");
        if(hashIndex != -1)
            url = url.substring(hashIndex+1);
        // remove double slashes
        while(url.indexOf("//") != -1){
            url = url.replace("//", "/");
        }
        
        // if only a sinlge slash or blank, go to the homepage
        if(url == "" || url == "/")
            return chan.showHome();

        // now we actually parse for thread IDs and boards
        url = url.split("/");
        // remove blank strings from the array
        for(var i=0;i<url.length;i++){
            if(url[i] == "")
                url.splice(i, 1);
        }

        // if the url has more then one item, then it's for a board
        // otherwise, it's for a thread
        if(url.length == 1)
            chan.showBoard(url[0]);
        else
            chan.showThread(url[1], url[2] || null);
        
        // Go to top of page
        window.scrollTo(0,0);
    }
};
