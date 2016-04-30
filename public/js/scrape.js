$(function() {

  $(".menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

  var url = $("#viewport").attr("data-url");
  var domain = url.match(/^https?:\/\/[^/]+/);
  var relativePath = /^\/?[^\/].*/;
  var isAbsPath = /^https?.*|^\/\/.*|^data:image\/.*/;
  var iframe = $("#viewport")[0];
  var iframeHeight = $(window).innerHeight() - $(".container").height();
  $(iframe).css("height", iframeHeight+"px");

  var replaceReadingPath = function(domain, path) {
    var isStartWithSlash = /^\/.*/;
    if (path.match(isStartWithSlash)) {
      return domain + path;
    }else{
      return domain + "/" + path;
    }
  };

  $(iframe.contentDocument.documentElement).html("<p>Loading...</p>");

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
        $(this).attr("src", replaceReadingPath(domain, path));
      }
    });
    $("link", $content).each(function() {
      var path = $(this).attr("href");
      if (path && !path.match(isAbsPath)) {
        $(this).attr("href", replaceReadingPath(domain, path));
      }
    });

    $(iframe.contentDocument.documentElement).html($content);

    setTimeout(function() {
      $("#wrapper").toggleClass("toggled");
    }, 300);

  });
});
