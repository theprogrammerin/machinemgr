<div class="container-fluid">

<nav class="row navbar navbar-default remove-radius navbar-inverse" role="navigation">
  <div class="container-fluid">
    <ul class="nav navbar-nav">
        <li class="active">
            <a href="#home" class="backbone-route">Home</a>
        </li>
        <li class="">
            <a href="#machines" class="backbone-route">Machines</a>
        </li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
        <li>
            <h4 class="mh-5 mv-15 white">Admin</h4>
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

<script type="text/template">


</script>

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


<script type="text/template" id="home-template">

<div class="row ">

    <div class="jumbotron">
      <h1>Hello, world!</h1>
      <p>This is Task Manager Dashboard</p>
      <p><a href="#tasks" class="btn btn-primary btn-lg backbone-route" role="button">View Available Tasks</a></p>
    </div>

</div>

</script>




<ol class="breadcrumb mv-10 ">
  <li><a href="#">Home</a></li>
  <li class="active">Tasks List</li>
</ol>

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
<div class="panel panel-default ">
    <div class="panel-heading">
        Config
    </div>
    <div class="panel-body">
        Here YOu can provide config options
    </div>
    <table class="table">
        <tbody>
            <% _.each(params, function(param){ %>
            <tr>
                <td class="col-md-2 col-xs-2 bg-light-grey"><%= param.name %></td>
                <td><%= param.value %></td>
            </tr>
            <% }); %>
        </tbody>
    </table>
</div>
</script>

<div id="displayPanel">

</div>

<script type="text/template" id="machines-list-view">

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
                </tr>
            </thead>
            <tbody>
                <% _.each(machines, function(machine){ %>
                <tr>
                    <td class="col-md-2 col-xs-2"><%= machine.name %></td>
                    <td class="col-md-2 col-xs-2"><%= machine.status %></td>
                    <td class="">
                        <div class="btn-group btn-group-small">
                            <button class="startBtn btn btn-default <%= [1,-1].indexOf(machine.status_code) > -1 ? 'disabled' : '' %> " data-machine= "<%= machine.id %>" >Start</button>
                            <button class="stopBtn btn btn-default <%= [0,-1,2].indexOf(machine.status_code) > -1 ? 'disabled' : '' %>" data-machine= "<%= machine.id %>">Stop</button>
                            <button class="loginBtn btn btn-default <%= [0,-1,2].indexOf(machine.status_code) > -1 ? 'disabled' : '' %>" data-machine= "<%= machine.id %>">Login</button>
                        </div>
                    </td>
                </tr>
                <% }); %>
            </tbody>
        </table>
    </div>

</script>

</div>