<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>test</title>

    <!-- Bootstrap -->
    <link href="css/app.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="container">
      <h1>web2json</h1>
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <form method="post" action="/v1">
            <div class="input-group">
              <span class="input-group-addon">URL</span>
              <input class="form-control input-lg" type="url" name="url" id="url" placeholder="http://">
              <input type="hidden" name="_token" value="{{ csrf_token() }}">
            </div>
          </form>
        </div>
      </div>
    </div>
    <script src="js/app.js"></script>
    <script type="text/javascript">
      $(function(){
        var $input = $("#url");
        var $form = $("form");
        $input.keypress(function(event) {
          if (event.which == 13) {
            $form.submit();
          }
        });
      })
    </script>
  </body>
</html>
