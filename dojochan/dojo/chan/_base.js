dojo.provide("chan._base");

var chan = {
    config: {
        name: "DojoChan"
    },
    startup: function(){
        // start by resolving the current URL
        chan.url.resolve(window.location.hash);
    },
    wrapLink: function(elem){
        // wraps a link so the url class can resolve the page
        dojo.connect(elem, "onclick", function(){
            var url = this.href;
            chan.url.resolve(url.substring(url.indexOf("#")));
        });
    },
    showHome: function(){
        dojo.addClass("board", "hidden");
        dojo.addClass("notfound", "hidden");
        dojo.removeClass("index", "hidden");
        chan.changeTitle();
    },
    showBoard: function(board){
        dojo.addClass("index", "hidden");
        dojo.addClass("notfound", "hidden");
        dojox.data.PersevereStore.getStores().addCallback(dojo.hitch(this, function(stores){
        	var store = stores.Board;
            store.fetch({
                query: {url: board},
                onComplete: dojo.hitch(this, function(items){
                    if(items.length == 0)
                        return chan.show404();
                    chan.constructBoard(items[0]);
                })
            })
        }));

    },
    showThread: function(thread, postid){
        dojo.addClass("index", "hidden");
        dojo.addClass("notfound", "hidden");
        dojox.data.PersevereStore.getStores().addCallback(dojo.hitch(this, function(stores){
        	var store = stores.Thread;
            store.fetch({
                query: {id: thread},
                onComplete: dojo.hitch(this, function(items){
                    if(items.length == 0)
                        return chan.show404();
                    chan.constructBoard(items[0].board, items[0], postid);
                })
            })
        }));
    },
    show404: function(){
        dojo.addClass("index", "hidden");
        dojo.addClass("board", "hidden");
        dojo.removeClass("notfound", "hidden");
        chan.changeTitle("404 - Not Found");
    },
    constructBoard: function(board, thread, postid){
        var boardWidget = new chan.widget.Board({
            boardItem: board,
            threadItem: thread,
            postid: postid
        });
        // destroy any previous displayed board
        dojo.query("div[widgetid]", "board").forEach(function(node){
            var wid = dijit.byNode(node);
            if(wid.declaredClass == "chan.widget.Board")
                wid.destroy();
        });
        dojo.byId("board").appendChild(boardWidget.domNode);
        dojo.removeClass("board", "hidden");
    },
    changeTitle: function(title){
        // change the title of the window
        document.title = this.config.name + (title ? " - " + title : "");
    }
}

dojo.addOnLoad(dojo.hitch(chan, "startup"));
