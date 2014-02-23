<div class="container-fluid">

<nav class="row navbar navbar-default remove-radius navbar-inverse" role="navigation">
  <div class="container-fluid">
    <ul class="nav navbar-nav">
        <li class="active">
            <a href="home" class="backbone-route">Home</a>
        </li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
        <li>
            <a href="#">
              <span class="badge pull-right">4</span>
              <div class="mh-5 pull-right">Notifications</div>
            </a>
        </li>
    </ul>
  </div>
</nav>

<script type="text/template" id="home-template">

<div class="row ">

    <div class="jumbotron">
      <h1>Hello, world!</h1>
      <p>...</p>
      <p><a href="#tasks" class="btn btn-primary btn-lg backbone-route" role="button">Learn more</a></p>
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
          <a href="#" class="list-group-item">System Log
            <span class="badge">&gt;</span>
          </a>
          <a href="#" class="list-group-item">Apache Config
            <span class="badge">&gt;</span>
          </a>
          <a href="#" class="list-group-item">Build Rails App
            <span class="badge">&gt;</span>
          </a>
        </ul>

        </div>
    </div>

</script>

<div class="panel panel-default ">
    <div class="panel-heading">
        Config
    </div>
    <div class="panel-body">
        Here YOu can provide config options
    </div>
    <table class="table">
        <tbody>
            <tr>
                <td class="col-md-2 col-xs-2 bg-light-grey">Param 1</td>
                <td>Value</td>
            </tr>
            <tr>
                <td class="col-md-2 col-xs-2 bg-light-grey">Param 2</td>
                <td>Value</td>
            </tr>
            <tr>
                <td class="col-md-2 col-xs-2 bg-light-grey">Param 3</td>
                <td>Value</td>
            </tr>
        </tbody>
    </table>
</div>

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
                <tr>
                    <td class="col-md-2 col-xs-2">System 1</td>
                    <td class="col-md-2 col-xs-2">Offline</td>
                    <td class="">
                        <div class="btn-group btn-group-small">
                            <button class="btn btn-default">Start</button>
                            <button class="btn btn-default disabled">Stop</button>
                            <button class="btn btn-default">Login</button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="col-md-2 col-xs-2">System 2</td>
                    <td class="col-md-2 col-xs-2">Running</td>
                    <td class="">
                        <div class="btn-group btn-group-small">
                            <button class="btn btn-default disabled">Start</button>
                            <button class="btn btn-default">Stop</button>
                            <button class="btn btn-default">Login</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</script>

</div>