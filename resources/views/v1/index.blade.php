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
                <div class="form-group">
                  <input type="text" class="form-control" id="column" placeholder="カラム名">
                  <input type="text" class="form-control" id="selecter" placeholder="CSS セレクタ">
                  <input type="submit" class="form-control" value="保存">
                </div>
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
    <script src="js/scrape.js"></script>
  </body>
</html>
