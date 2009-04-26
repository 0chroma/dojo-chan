dojo.provide("chan.widget.BoardList");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dojox.data.PersevereStore");

dojo.declare("chan.widget.BoardList", [dijit._Widget, dijit._Templated], {
    templatePath: dojo.moduleUrl("chan.widget.templates", "BoardList.html"),
    postCreate: function(){
        dojox.data.PersevereStore.getStores().addCallback(dojo.hitch(this, function(stores){
        	this.groupStore = stores.BoardGroup;
            this.render();
        }));
    },
    render: function(){
        var store = this.groupStore;
        store.fetch({
            query: {id: "*"},
            onItem: dojo.hitch(this, "_addItem")
        });
    },
    _addItem: function(item){
        var store = this.groupStore;
        var li = this.containerNode.appendChild(dojo.create("li", {
            innerHTML: store.getValue(item, "name"),
            class: "boardGroupTitle"
        }));
        var ul = li.appendChild(dojo.create("ul"));
        dojo.forEach(store.getValues(item, "boards"), function(board){
            var li = dojo.create("li", {class: "boardTitle"});
            var link = li.appendChild(dojo.create("a", {
                href: ("#/%s/").replace("%s", store.getValue(board, "url")),
                innerHTML: store.getValue(board, "title")
            }));
            chan.wrapLink(link);
            ul.appendChild(li);
        });
    }
});

dojo.declare("chan.widget.CompactBoardList", chan.widget.BoardList, {
    templatePath: dojo.moduleUrl("chan.widget.templates", "CompactBoardList.html"),
    _addItem: function(item){
        var store = this.groupStore;
        var group = dojo.create("span", {});
        group.appendChild(dojo.create("span", {innerHTML: "[ "}));
        dojo.forEach(store.getValues(item, "boards"), function(board){
            var link = group.appendChild(dojo.create("a", {
                innerHTML: store.getValue(board, "url"),
                href: ("#/%s/").replace("%s", store.getValue(board, "url")),
                title: store.getValue(board, "title")
            }));
            chan.wrapLink(link);
            group.appendChild(dojo.create("span", {innerHTML: " / "}));
        });
        dojo.query("span:last-child", group)[0].innerHTML = " ] ";
        this.domNode.appendChild(group);
    }
});
