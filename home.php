<div class="container-fluid">

<script type="text/template" id="navigation-template">

<nav class="row navbar navbar-default remove-radius navbar-inverse" role="navigation">
  <div class="container-fluid">
    <ul class="nav navbar-nav">
        <li class="<%= activeLink == "home" ? "active" : "" %>">
            <a href="#home" class="backbone-route">Home</a>
        </li>
        <li class="<%= activeLink == "machines" ? "active" : "" %>">
            <a href="#machines" class="backbone-route">Machines</a>
        </li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
        <li>
            <h4 class="mh-5 mv-15 white"><%= HR.current_user.get("name") %></h4>
        </li>
        <li>
            <a href="#">
              <span class="badge pull-right">4</span>
              <div class="mh-5 pull-right">Notifications</div>
            </a>
        </li>
    </ul>
  </div>
</nav>

</script>

<script type="text/template" id="login-template">

<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">Login</h3>
  </div>
  <div class="panel-body">
    <form name="login-form" class="form-inline">
        <input class="form-control" name="user" type="text" placeholder="Username" />
        <input class="form-control" name="pass" type="password" placeholder="Password" />
        <button class="btn btn-primary" type="submit">Login</button>
    </form>
  </div>
</div>

</script>


<script type="text/template" id="home-template">

<div class="row ">

    <div class="jumbotron">
      <h1>Hello, world!</h1>
      <p>This is Task Manager Dashboard</p>
      <p><a href="#machines" class="btn btn-primary btn-lg backbone-route" role="button">View Machines</a></p>
    </div>

</div>

</script>

<script id="tasks-template" type="text/template">

    <div class="row">
        <div class="col-md-12 col-xs-12">

        <ul class="list-group">
          <a href="#config/system" class="list-group-item backbone-route">System Config
            <span class="badge">&gt;</span>
          </a>
          <a href="#config/apache" class="list-group-item backbone-route">Apache Config
            <span class="badge">&gt;</span>
          </a>
          <a href="#" class="list-group-item backbone-route">Build Rails App
            <span class="badge">&gt;</span>
          </a>
        </ul>

        </div>
    </div>

</script>

<script type="text/template" id="params-template">
<ol class="breadcrumb mv-10 ">
  <li><a href="#home">Home</a></li>
  <li><a href="#machines">Machines</a></li>
  <li class="active">Details</li>
</ol>

<div class="panel panel-default ">
    <div class="panel-heading">
        Server Info
    </div>
    <div class="panel-body">
        <div class="row">
            <div class="col-md-4 col-xs-4">
                <strong>Server: </strong>
                <%= machine.dns_name %>
            </div>
            <div class="col-md-2 col-xs-2 pull-right text-right">
                <% if(machine.status == "running"){ %>
                    <span class="text-success">Running</span>
                <% } else { %>
                    <span class="text-warning">Stopped</span>
                <% } %>
            </div>
        </div>
    </div>
    <table class="table">
        <tbody>
            <tr>
                <td class="col-md-2 col-xs-2 bg-light-grey">Tags</td>
                <%
                    tags = [];
                    _.each( machine.tags, function(tag){
                        if(tag[1] == "true")
                        {
                            tags.push(tag[0]);
                        }
                    } );
                %>
                <td><%= tags.join(", ") %></td>
            </tr>
            <tr>
                <td class="col-md-2 col-xs-2 bg-light-grey">Security Groups</td>
                <td><%= machine.security_groups.join(", ") %></td>
            </tr>
            <tr>
                <td class="col-md-2 col-xs-2 bg-light-grey">Public IP</td>
                <td><%= machine.public_ip %></td>
            </tr>
            <tr>
                <td class="col-md-2 col-xs-2 bg-light-grey">Private IP</td>
                <td><%= machine.private_ip %></td>
            </tr>

        </tbody>
    </table>
    <div class="panel-footer ph-5">
        <div class="row">
            <div class="col-md-2 col-xs-2">
                <div class="btn btn-group ph-5">
                    <button type="button" class="btn btn-primary <%= machine.status == "stopped" ? 'disabled' : '' %>"> Start </button>
                    <button type="button" class="btn-primary btn <%= machine.status == "running" ? 'disabled' : '' %>"> Stop </button>
                </div>
            </div>
            <div class="col-md-4 col-xs-4 pull-right">
                <div class="input-group" style="padding:7px;">
                  <span class="input-group-addon">Generate Credentials Link:</span>
                  <input type="text" class="form-control disabled" disabled="true" value="<%= machine.public_url || "Not Generated Yet" %>">
                  <a href="#" class="input-group-addon">Copy</a>
                </div>
            </div>
        </div>
    </div>
</div>
</script>

<div id="navPanel">

</div>
<div id="displayPanel">

</div>



<script type="text/template" id="machines-list-view">

    <ol class="breadcrumb mv-10 ">
      <li><a href="#home">Home</a></li>
      <li class="active">Machines</li>
    </ol>

    <div class="panel panel-default">
        <div class="panel-heading">
            Instances
        </div>
        <div class="panel-body">
            These are the instances currently available
        </div>
        <table class="table instance-info">
            <thead>
                <tr class="bg-light-grey">
                    <th>System</th>
                    <th>Status</th>
                    <th>Options</th>
                    <th>View Details</th>
                </tr>
            </thead>
            <tbody>
                <% _.each(machines, function(machine, i ){ %>
                <tr>
                    <td class="col-md-4 col-xs-4"><%= machine.dns_name || "Server " + (i+1) %></td>
                    <td class="col-md-2 col-xs-2"><%= machine.status %></td>
                    <td class="">
                        <div class="btn-group btn-group-small">
                            <button class="startBtn btn btn-default <%= machine.status == "stopped" ? 'disabled' : '' %> " data-machine= "<%= machine.id %>" >Start</button>
                            <button class="stopBtn btn btn-default <%= machine.status == "running"  ? 'disabled' : '' %>" data-machine= "<%= machine.id %>">Stop</button>
                            <button class="loginBtn btn btn-default <%= machine.status == "running" ? 'disabled' : '' %>" data-machine= "<%= machine.id %>">Login</button>
                        </div>
                    </td>
                    <td class="col-md-1 col-xs-1">
                        <a href="#machines/<%=machine.id %>/configure" class="backbone-route btn btn-default btn-small" >Details</a>
                    </td>
                </tr>
                <% }); %>
            </tbody>
        </table>
        <div class="panel-footer">
            <button type="button" class="btn btn-primary"> Start New Instance </button>
        </div>
    </div>

</script>

</div>