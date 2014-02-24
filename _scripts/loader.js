
sampleData = {

    servers: [{"id":"i-3312f51c", "dns_name":null, "security_groups":["tasks-allow-ssh", "tasks"], "tags":[["hrxtask-server", "true"], ["company-IS", "true"], ["Name", "hrxtask-IS"]], "public_ip":null, "private_ip":null, "status":"stopped"}, {"id":"i-b0eb0d9f", "dns_name":"ec2-54-80-90-248.compute-1.amazonaws.com", "security_groups":["tasks-allow-ssh", "tasks-allow-ping"], "tags":[["hrxtask-server", "true"], ["company-IS", "true"], ["Name", "hrxtask-IS"]], "public_ip":"54.80.90.248", "private_ip":"10.90.187.56", "status":"running"}, {"id":"i-fa86c6d4", "dns_name":"ec2-54-205-100-202.compute-1.amazonaws.com", "security_groups":["tasks"], "tags":[["Name", "task-master"], ["hrxtask-server", "true"]], "public_ip":"54.205.100.202", "private_ip":"10.7.22.147", "status":"running"}, {"id":"i-fb86c6d5", "dns_name":null, "security_groups":["tasks"], "tags":[["Name", "task-slave"], ["hrxcompany-123", null], ["hrxtask-server", "true"]], "public_ip":null, "private_ip":null, "status":"stopped"}]

};


$("document").ready(function(){

/*
 *   ===========Models==============
 */

HR = {}
window.HR = HR

HR.CredentialsModel = Backbone.Model.extend({
    intialize: function(){

    },
    url: "endpoint-recieve"
});

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
        console.log("Starting Machine: " + this.get("id"));
        // Right your code to trigger start machine here,
    },
    stopMachine: function(){
        console.log("Stopping Machine: " + this.get("id"));
        // Right your code to trigger start machine here,
    },
    loginMachine: function(user, pass){
        console.log("Log Into Machine: " + this.get("id"));
        // Right your code to trigger start machine here,
    }
});

HR.UserModel = Backbone.Model.extend({

    initialize: function(){

    },

    url: "/user",

    checkLogin: function(user, pass, callback){
        that = this;
        that.set({
            user: "admin",
            password: "pass",
            id: 2,
            name: "Admin"
        });
        return;
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


/*
 *   ===========Collections==============
 */

HR.MachineCollection = Backbone.Collection.extend({

    model: HR.MachineModel,

    initialize: function(data, options){
        this.constructor.__super__.initialize.apply(this);
    },

    url: "endpoint/",

})



/*
 *   ===========Views==============
 */

HR.LoginView = Backbone.View.extend({

    el: "#displayPanel",
    intialize: function(options){

        this.model = options.model;
    },
    render: function(){
        html = _.template($("#login-template").html(), window);
        this.$el.html(html);

        return this;
    },
    events: {
        "submit form[name=login-form]" : "loginUser"
    },

    loginUser: function(event){
        event.preventDefault();
        user = this.$el.find("input[name=user]").val();
        pass = this.$el.find("input[name=pass]").val();

        this.model.on("change", this.checkStatus);
        this.model.checkLogin(user, pass);

    },
    checkStatus: function(){
        if( HR.current_user.get("name") ){
            HR.router.navigate("home", true);
        }
    }
})

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

HR.NavView = Backbone.View.extend({
    el: "#navPanel",
    intialize: function(options){
        this.activeLink = "home";
        this._super( 'intialize', options);
    },
    setActive: function(activeLink){
        this.activeLink = activeLink;
        return this;
    },
    render: function(){
        html = _.template($("#navigation-template").html(), {
            activeLink: this.activeLink
        });
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
        this.collection = options.collection;
        this._super( 'intialize', options);
    },
    events: {
        "click .startBtn" : "startMachine",
        "click .stopBtn" : "stopMachine",
        "click .loginBtn" : "loginMachine",
    },
    render: function(){
        $("#displayPanel").empty();
        html = _.template($("#machines-list-view").html(), { machines: this.collection.toJSON() });
        this.$el.html(html);

        return this;
    },

    startMachine: function(e){
        if( $(e.target).hasClass("disabled") )
            return;
        machine_id = $(e.target).data("machine");
        machineModel = this.collection.where({ id: machine_id })[0];
        machineModel.startMachine();
    },
    stopMachine: function(e){
        if( $(e.target).hasClass("disabled") )
            return;
        machine_id = $(e.target).data("machine");
        machineModel = this.collection.where({ id: machine_id })[0];
        machineModel.stopMachine();
    },
    loginMachine: function(e){
        if( $(e.target).hasClass("disabled") )
            return;
        machine_id = $(e.target).data("machine");
        machineModel = this.collection.where({ id: machine_id })[0];
        machineModel.startMachine();
    }
});

HR.ConfigView = Backbone.View.extend({
    el: "#displayPanel",
    intialize: function(options){
        this.model = options.model
        this._super( 'intialize', options);
    },
    events: {
        "click .start"  : "startMachine",
        "click .stop"   : "stopMachine",
    },
    render: function(){
        console.log(this.collection);
        html = _.template($("#params-template").html(), { machine: this.model.toJSON() });
        this.$el.html(html);

        return this;
    },
    startMachine: function(e){
        this.model.startMachine();
    },
    stopMachine: function(e){
        this.model.stopMachine();
    },
});

HR.CredentialsView = Backbone.View.extend({

    el: "#appView",
    initialize: function(options){
        this.model = options.model;

    },
    render: function(){
        html = _.template($("#credentials-template").html(), { model: this.model.toJSON() });
        this.$el.html(html);
        return this;
    }

});

HR.AppView = Backbone.View.extend({

    el: "#appView",
    initialize: function(options){

        this.appView = null;
    },
    renderSubView: function(newView){

        if(this.appView){
            this.appView.undelegateEvents();
            // this.$el.find("#displayPanel").remove();
            // this.$el.append("<div id='displayPanel'></div> ");
        }
        newView.el = "#displayPanel";
        this.appView = newView;
        newView.render();
    }

});

/*
 *   ===========Router==============
 */

HRTaskRouter = Backbone.Router.extend({

    routes: {
        "login"                     : "login",
        "home"                      : "home",
        "tasks"                     : "tasks",
        "machines"                  : "machines",
        "machines/:id/configure"    : "configure",
        "getlogin/:id"              : "credentials",
        "*path"                     : "default"
    },

    initialize: function(options){
    },

    credentials: function(id){

        credentialsModel = new HR.CredentialsModel({
            id: id
        });
        credentialsView = new HR.CredentialsView({
            model: credentialsModel
        });
        HR.appView.renderSubView(credentialsView)
        // credentialsModel.fetch({
        //     success: function(model){
                // credentialsView = new HR.CredentialsView({
                //     model: model
                // });
        //         HR.appView.renderSubView(credentialsView)
        //     }
        // });

    },

    checkLogin: function( route, option ){

        if(HR && HR.current_user && HR.current_user.get("id")){
            console.log("test");
            return true;
        }
        else{
            this.navigate( "login", true );
            return false;
        }
    },

    default: function(){
        this.navigate("login", true);
    },

    login: function(){

        userModel = new HR.UserModel();
        HR.current_user = userModel;
        loginView = new HR.LoginView({
            model: userModel
        });
        HR.appView.renderSubView(loginView);
    },
    home: function(){
        if(!this.checkLogin()) return;
        console.log("Home fxn");

        if(!HR.navView){
            HR.navView = new HR.NavView();
        }
        HR.navView.setActive("home").render();
        HR.appView.renderSubView(new HR.HomeView());

    },
    tasks: function(){
        if(!this.checkLogin()) return;
        tasksView = new HR.TasksView();
        tasksView.render();
    },

    machines: function(){
        if(!this.checkLogin()) return;
        HR.navView.setActive("machines").render();
        if(!HR.machines)
        {
            HR.machines = new HR.MachineCollection(sampleData.servers);
        }
        machinesView = new HR.MachineView({
            collection: HR.machines
        });
        HR.appView.renderSubView(machinesView);

    },

    configure: function(id){
        if(!this.checkLogin()) return;
        HR.navView.setActive("configure").render();
        if(!HR.machines)
        {
            HR.machines = new HR.MachineCollection(sampleData.servers);
        }
        machineModel = HR.machines.where( { "id" : id})[0];
        configView = new HR.ConfigView({
            model: machineModel
        });
        HR.appView.renderSubView(configView);
    }


});

HR.router = new HRTaskRouter();
HR.appView = new HR.AppView();
Backbone.history.start({pushState: false, root: window.location.pathname});

// HR.router.navigate("home", true)

$("a.backbone-route").on("click", function(e){
    e.preventDefault();
    HR.router.navigate( $(e.target).attr("href"), true);
});

});