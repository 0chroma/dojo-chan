dojo.provide("chan.widget.Thread");
dojo.require("dijit._Templated");
dojo.require("dijit._Container");
dojo.require("dijit._Contained");

dojo.declare("chan.widget.Thread", [dijit._Widget, dijit._Templated, dijit._Container, dijit._Contained], { 
    templatePath: dojo.moduleUrl("chan.widget.templates", "Thread.html"),
    threadItem: null,
    store: null,
    postStore: null,
    fileStore: null,
    postCreate: function(){
        var posts = this.store.getValues(this.threadItem, "posts");
        dojo.forEach(posts, function(item){
            var post = new chan.widget.Post({
                store: this.postStore,
                fileStore: this.fileStore,
                postItem: item
            });
            this.addChild(post);
            post.startup();
        }, this);
    }
});

dojo.declare("chan.widget.Post", [dijit._Widget, dijit._Templated, dijit._Contained], {
    templatePath: dojo.moduleUrl("chan.widget.templates", "Post.html"),
    postItem: null,
    store: null,
    fileStore: null,
    postCreate: function(){
        this.injectImage(this.postItem);
        var store = this.store;
        var item = this.postItem;
        var mn = this.messageNode;
        //insert details
        var message = store.getValue(item, "message");
        mn[typeof mn.textContent != "undefined" ? "textContent" : "innerText"] = message;
    },
    injectImage: function(item){
        var store = this.store;
        var file = store.getValue(item, "file");
        this.imageNode.src = "/File/"+this.fileStore.getValue(item, "id");
    }
});
