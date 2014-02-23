

$("document").ready(function(){

/*
 *   ===========Models==============
 */

HR = {}
window.HR = HR

HR.MachineModel = Backbone.Model.extend({

    intialize: function(){

    },
    url: function(){
        if(this.isNew())
            return "endpoint/"
        else
            return "endpoint/" + this.get("id");

    }
});



/*
 *   ===========Collections==============
 */



/*
 *   ===========Views==============
 */

HR.HomeView = Backbone.View.extend({
    el: "#displayPanel",
    intialize: function(options){

        this._super( 'intialize', options);
    },
    render: function(){
        html = _.template($("#home-template").html(), window);
        this.$el.html(html);

        return this;
    }
});

HR.TasksView = Backbone.View.extend({
    el: "#displayPanel",
    intialize: function(options){

        this._super( 'intialize', options);
    },
    render: function(){
        html = _.template($("#tasks-template").html(), window);
        this.$el.html(html);

        return this;
    }
});

HR.MachineView = Backbone.View.extend({
    el: "#displayPanel",
    intialize: function(options){

        this._super( 'intialize', options);
    },
    render: function(){
        html = _.template($("#machines-list-view").html(), window);
        this.$el.html(html);

        return this;
    }
});



/*
 *   ===========Router==============
 */

HRTaskRouter = Backbone.Router.extend({

    routes: {
        "home" : "home",
        "tasks" : "tasks"
    },

    initialize: function(options){

    },

    home: function(){
        console.log("Home fxn");
        homeView = new HR.HomeView();
        homeView.render();

    },
    tasks: function(){
        tasksView = new HR.TasksView();
        tasksView.render();
    }


});

HR.router = new HRTaskRouter();
Backbone.history.start({pushState: false, root: "/is/machinemgr/"});

HR.router.navigate("home", true)

$("a.backbone-route").on("click", function(e){
    e.preventDefault();
    HR.router.navigate( $(e.target).attr("href"), true);
});

});