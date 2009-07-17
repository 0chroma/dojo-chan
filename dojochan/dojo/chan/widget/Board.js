dojo.provide("chan.widget.Board");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Container");
dojo.require("dojox.data.PersevereStore");

dojo.declare("chan.widget.Board", [dijit._Widget, dijit._Templated, dijit._Container], {
    templatePath: dojo.moduleUrl("chan.widget.templates", "Board.html"),
    widgetsInTemplate: true,
    boardItem: null,
    threadItem: null,
    postid: null,
    postCreate: function(){
        dojox.data.PersevereStore.getStores().addCallback(dojo.hitch(this, function(stores){
        	var store = stores.Board;
            this.stores = stores;
            this.titleNode.innerHTML = store.getValue(this.boardItem, "title");
            this.descriptionNode.innerHTML = store.getValue(this.boardItem, "description");
            chan.changeTitle("/"+store.getValue(this.boardItem, "url")+"/ - "+store.getValue(this.boardItem, "title"));
            this.render();
        }));
    },
    render: function(){
        var store = this.stores.Board;
        // only do a fetch if its for more then one thread
        if(this.threadItem)
            this._addThread(this.threadItem);
        else
            this.page(1);
    },
    page: function(num){
        this.destroyDescendants();
        var store = this.stores.Thread;
        store.fetch({
            query: {board: this.boardItem},
            start: ((num-1)*10),
            count: 9,
            onItem: dojo.hitch(this, "_addThread")
        })
    },
    _addThread: function(item){
        var store = this.stores.Thread;
        
        console.log(item)
    }
});
