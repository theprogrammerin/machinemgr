
sampleData = {

    servers: [{
        id: 1,
        name: "Server 1",
        status: "Running",
        status_code: 1,
    },{
        id: 2,
        name: "Server 2",
        status: "Stopped",
        status_code: 0,
    },{
        id: 3,
        name: "Server 3",
        status: "Configuring",
        status_code: -1,
    },{
        id: 4,
        name: "Server 4",
        status: "Offline",
        status_code: 2,
    }],
    params: [{
        id: 12,
        type: "type1",
        name: "Param 1",
        value: "Value 1"
    },{
        id: 13,
        type: "type2",
        name: "Param 2",
        value: "Value 2"
    },{
        id: 14,
        type: "type1",
        name: "Param 3",
        value: "Value 3"
    },{
        id: 15,
        type: "type1",
        name: "Param 4",
        value: "Value 4"
    }]

};


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

    },
    startMachine: function(){

    },
    stopMachine: function(){

    },
    loginMachine: function(user, pass){

    }
});

HR.UserModel = Backbone.Model.extend({

    initialize: function(){

    },

    url: "/user",

    checkLogin: function(user, pass){
        that = this;
        $.ajax({
            url: this.url,
            type: "POST",
            data: {
                user: user,
                password: pass,
            },
            success: function(resp, xhr){
                // if(resp && resp.status)
                // {
                //     that.set(resp.model)
                // }
                that.set({
                    user: "admin",
                    password: "pass",
                    id: 2,
                    name: "Admin"
                })
            },

        })
    },

});

HR.ConfigModel = Backbone.Model.extend({

    initialize: function(options){
        this.machine_id = options.machine_id;
    },

    url: function(){
        if(this.isNew())
            return "endpoint/" + this.machine_id + "/config/"
        else
            return "endpoint/" + this.machine_id + "/config/" + this.get("id")
    }
})


/*
 *   ===========Collections==============
 */

HR.MachineCollection = Backbone.Collection.extend({

    initialize: function(data, options){
        this.constructor.__super__.initialize.apply(this);
    },
    url: "endpoint/",

})

HR.ConfigCollection = Backbone.Collection.extend({

    initialize: function(data, options){
        this.machine_id = options.machine_id;
        this.constructor.__super__.initialize.apply(this);
    },
    url: "endpoint/" + this.machine_id + "/config",

})



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

        this.constructor.__super__.initialize.apply(this);
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
    events: {
        "click .startBtn" : "startMachine",
        "click .stopBtn" : "stopMachine",
        "click .loginBtn" : "loginMachine",
    },
    render: function(){
        html = _.template($("#machines-list-view").html(), { machines: this.collection.toJSON() });
        this.$el.html(html);

        return this;
    },

    startMachine: function(e){
        if( $(e.target).hasClass("disabled") )
            return;
        machine_id = $(e.target).data("machine");
        console.log("Starting ", machine_id);
    },
    stopMachine: function(e){
        if( $(e.target).hasClass("disabled") )
            return;
        machine_id = $(e.target).data("machine");
        console.log("Stopping ", machine_id);
    },
    loginMachine: function(e){
        if( $(e.target).hasClass("disabled") )
            return;
        machine_id = $(e.target).data("machine");
        console.log("Login ", machine_id);
    }
});

HR.ConfigView = Backbone.View.extend({
    el: "#displayPanel",
    intialize: function(options){

        this._super( 'intialize', options);
    },
    render: function(){
        console.log(this.collection);
        html = _.template($("#params-template").html(), { params: this.collection.toJSON() });
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
        "tasks" : "tasks",
        "machines" : "machines",
        "config/:type" : "configure",
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
    },

    machines: function(){

        machineCollection = new HR.MachineCollection(sampleData.servers);
        machinesView = new HR.MachineView({
            collection: machineCollection
        });
        machinesView.render();

    },

    configure: function(type){
        if(!type){
            type = "type1"
        }
        configCollection = new HR.ConfigCollection(sampleData.params, {
            type: type,
        })
        configView = new HR.ConfigView({
            collection: configCollection
        });
        configView.render();
    }


});

HR.router = new HRTaskRouter();
Backbone.history.start({pushState: false, root: window.location.pathname});

// HR.router.navigate("home", true)

$("a.backbone-route").on("click", function(e){
    e.preventDefault();
    HR.router.navigate( $(e.target).attr("href"), true);
});

});