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
  $(iframe.contentDocument.documentElement).html("<p>Loading...</p>");
  $.get(url, function(data){
    if (data.responseText === "") {
      alert("no content");
      return;
    }
    var el = document.createElement( 'html' );
    el.innerHTML = data.responseText;
    var $content = $(el);
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
