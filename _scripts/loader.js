
sampleData = {

    servers: [{"id":"i-3312f51c", "dns_name":null, "security_groups":["tasks-allow-ssh", "tasks"], "tags":[["hrxtask-server", "true"], ["company-IS", "true"], ["Name", "hrxtask-IS"]], "public_ip":null, "private_ip":null, "status":"stopped"}, {"id":"i-b0eb0d9f", "dns_name":"ec2-54-80-90-248.compute-1.amazonaws.com", "security_groups":["tasks-allow-ssh", "tasks-allow-ping"], "tags":[["hrxtask-server", "true"], ["company-IS", "true"], ["Name", "hrxtask-IS"]], "public_ip":"54.80.90.248", "private_ip":"10.90.187.56", "status":"running"}, {"id":"i-fa86c6d4", "dns_name":"ec2-54-205-100-202.compute-1.amazonaws.com", "security_groups":["tasks"], "tags":[["Name", "task-master"], ["hrxtask-server", "true"]], "public_ip":"54.205.100.202", "private_ip":"10.7.22.147", "status":"running"}, {"id":"i-fb86c6d5", "dns_name":null, "security_groups":["tasks"], "tags":[["Name", "task-slave"], ["hrxcompany-123", null], ["hrxtask-server", "true"]], "public_ip":null, "private_ip":null, "status":"stopped"}]

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

        this._super( 'intialize', options);
    },
    render: function(){
        html = _.template($("#navigation-template").html(), window);
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
        this.model = options.model
        this._super( 'intialize', options);
    },
    render: function(){
        console.log(this.collection);
        html = _.template($("#params-template").html(), { machine: this.model.toJSON() });
        this.$el.html(html);

        return this;
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
        "*path"                     : "default"
    },

    initialize: function(options){
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
        loginView.render();
    },
    home: function(){
        if(!this.checkLogin()) return;
        console.log("Home fxn");

        if(!HR.navView){
            HR.navView = new HR.NavView();
            HR.navView.render();
        }

        homeView = new HR.HomeView();
        homeView.render();

    },
    tasks: function(){
        if(!this.checkLogin()) return;
        tasksView = new HR.TasksView();
        tasksView.render();
    },

    machines: function(){
        if(!this.checkLogin()) return;
        if(!HR.machines)
        {
            HR.machines = new HR.MachineCollection(sampleData.servers);
        }
        machinesView = new HR.MachineView({
            collection: HR.machines
        });
        machinesView.render();

    },

    configure: function(id){
        if(!this.checkLogin()) return;
        if(!HR.machines)
        {
            HR.machines = new HR.MachineCollection(sampleData.servers);
        }
        machineModel = HR.machines.where( { "id" : id})[0];
        configView = new HR.ConfigView({
            model: machineModel
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