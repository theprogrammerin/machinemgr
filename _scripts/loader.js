

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

machineview = new HR.MachineView()
machineview.render();



});