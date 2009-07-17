dojo.provide("chan.widget.Thread");
dojo.provide("chan.widget.Post");

dojo.declare("chan.widget.Thread", [dijit._Widget, dijit._Templated, dijit._Container, dijit._Contained], { 
    templateUrl: dojo.moduleUrl("chan.widget.templates", "Thread.html"),
    threadItem: null,
    postCreate: function(){
        
    }
});

dojo.declare("chan.widget.Post", [dijit._Widget, dijit._Templated, dijit._Contained], {
    templateUrl: dojo.moduleUrl("chan.widget.templates", "Post.html"),
    postItem: null,
    postCreate: function(){

    }
});
