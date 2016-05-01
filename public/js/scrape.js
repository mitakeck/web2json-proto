$(function() {

  $(".menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

  var url = $("#viewport").attr("data-url").replace(/\/$/, "");
  var domain = url.match(/^https?:\/\/[^/]+/);
  var isAbsPath = /^https?.*|^\/\/.*|^data:image\/.*/gi;
  var isRelativePath = /^\.\/.*/gi;
  var isStartWithSlash = /^\/.*/;

  var iframe = $("#viewport")[0];
  var adjustIframeHeight = function() {
    var iframeHeight = $(window).innerHeight() - $(".container").height();
    $(iframe).css("height", iframeHeight+"px");
  };
  $(window).on("load resize", function() {
    adjustIframeHeight();
  });
  adjustIframeHeight();

  var replaceRelativePath = function(path) {
    var join = function(prefix, path) {
      if (path.match(isStartWithSlash)) {
        return prefix + path;
      }else{
        return prefix + "/" + path;
      }
    };
    if (path){
      if (path.match(isAbsPath)) {
        return path;
      }else if (path.match(isRelativePath)) {
        return join(domain, path);
      }else{
        return join(url, path);
      }
    }
    return "#";
  };

  $(iframe.contentDocument.documentElement).html("<p>Loading...</p>");

  $.get(url, function(data){
    if (data.responseText === "") {
      alert("no content");
      return;
    }
    var $content = $(data.responseText);
    $content.each(function(index, element) {
      switch ($(this).prop("tagName")) {
        case "LINK":
          $(this).attr("href", replaceRelativePath($(this).attr("href")));
          break;
        case "IMG":
          console.log("img");
          $(this).attr("src", replaceRelativePath($(this).attr("src")));
          break;
        default:
          // nothing.
          break;
      }
    });
    $(iframe.contentDocument.documentElement).html($content);
    setTimeout(function() {
      $("#wrapper").toggleClass("toggled");
    }, 300);

  });
});
