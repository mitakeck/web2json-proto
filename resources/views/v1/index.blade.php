<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Select Scraping Data</title>
    <link href="css/app.css" rel="stylesheet">
    <style media="screen">
    .ellipis {
        overflow: hidden;
        -ms-text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        display: block;
        white-space: nowrap;
    }
    #wrapper {
        padding-right: 0;
        -webkit-transition: all 0.5s ease;
        -moz-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
        transition: all 0.5s ease;
    }

    #wrapper.toggled {
        padding-right: 250px;
    }

    #sidebar-wrapper {
        z-index: 1000;
        position: fixed;
        right: 250px;
        top: 100px;
        width: 50px;
        height: 50px;
        margin-right: -250px;
        overflow-y: auto;
        background: #000;
        -webkit-transition: all 0.5s ease;
        -moz-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
        transition: all 0.5s ease;
    }

    #wrapper.toggled #sidebar-wrapper {
        width: 250px;
        height: 100%;
    }

    #page-content-wrapper {
        width: 100%;
        position: absolute;
        padding: 15px;
    }

    #wrapper.toggled #page-content-wrapper {
        position: absolute;
        margin-left: -250px;
    }
    .sidebar-nav {
      position: absolute;
      top: 0;
      width: 250px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .sidebar-nav li {
        text-indent: 20px;
        line-height: 40px;
    }

    .sidebar-nav li a {
        display: block;
        text-decoration: none;
        color: #999999;
    }

    .sidebar-nav li a:hover {
        text-decoration: none;
        color: #fff;
        background: rgba(255,255,255,0.2);
    }

    .sidebar-nav li a:active,
    .sidebar-nav li a:focus {
        text-decoration: none;
    }

    .sidebar-nav > .sidebar-brand {
        height: 65px;
        font-size: 18px;
        line-height: 60px;
    }

    .sidebar-nav > .sidebar-brand a {
        color: #999999;
    }

    .sidebar-nav > .sidebar-brand a:hover {
        color: #fff;
        background: none;
    }
    </style>
  </head>
  <body>
    <div id="wrapper">
      <!-- Sidebar -->
      <div id="sidebar-wrapper">
          <ul class="sidebar-nav">
              <li class="sidebar-brand">
                  <a href="#" class="menu-toggle">
                      Scraping Menu
                  </a>
              </li>
              <li>
                  <a href="#">Dashboard</a>
              </li>
              <li>
                  <a href="#">Shortcuts</a>
              </li>
              <li>
                  <a href="#">Overview</a>
              </li>
              <li>
                  <a href="#">Events</a>
              </li>
              <li>
                  <a href="#">About</a>
              </li>
              <li>
                  <a href="#">Services</a>
              </li>
              <li>
                  <a href="#">Contact</a>
              </li>
          </ul>
      </div>
    </div>
    <div class="container">
      <h1>Select Scraping Data</h1>
      <!-- <div class="" id=menu-toggle>
        menu
      </div> -->
      <p class="ellipis">
        Data from : <a href="<?php echo $content; ?>"><?php echo $content; ?></a>
      </p>
    </div>

    <iframe id="viewport" data-url="<?php echo $content; ?>" height="100%" width="100%"></iframe>

    <script src="js/app.js"></script>
    <script type="text/javascript">
    $(function() {

      $(".menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
      });

      var url = $("#viewport").attr("data-url");
      var domain = url.match(/^https?:\/\/[^/]+/);
      console.log(url)
      // var relativePath = /([^/][^\":]+)/;
      var relativePath = /^\/?[^\/].*/;
      var isAbsPath = /^https?.*|^\/\/.*|^data:image\/.*/;
      var isStartWithSlash = /^\/.*/;
      var iframe = $("#viewport")[0];
      var iframeHeight = $(window).innerHeight() - $(".container").height();
      $(iframe).css("height", iframeHeight+"px");
      $.get(url, function(data){
        if (data.responseText === "") {
          alert("no content");
          return;
        }
        var $content = $(data.responseText);
        $("img", $content).each(function() {
          var path = $(this).attr("src");
          // console.log(path);
          if (path && !path.match(isAbsPath)) {
            if (path.match(isStartWithSlash)) {
              $(this).attr("src", domain + path);
            }else{
              $(this).attr("src", domain + "/" + path);
            }
            // console.log("replate : " + $(this).attr("src"));
          }
        });
        $("link", $content).each(function() {
          var path = $(this).attr("href");
          console.log(path);
          if (path && !path.match(isAbsPath)) {
            if (path.match(isStartWithSlash)) {
              $(this).attr("href", domain + path);
            }else{
              $(this).attr("href", domain + "/" + path);
            }
            console.log("replate : " + $(this).attr("href"));
          }
        });
        // var $content = $(data.responseText);
        // $content.each(function(index, element) {
        //   var path = $(this).attr("href");
        //   if (path && path.match(relativePath)) {
        //     $(this).attr("href", domain + path);
        //   }
        //   var path = $(this).attr("src");
        //   if (path && path.match(relativePath)) {
        //     $(this).attr("src", domain + path);
        //   }
        // });
        $(iframe.contentDocument.documentElement).html($content);

        setTimeout(function() {
          $("#wrapper").toggleClass("toggled");
        }, 300);
      });
    });
    </script>

    </script>
  </body>
</html>
