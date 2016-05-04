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

    var $column = $("#column");
    var $selecter = $("#selecter");

    var getCSSSelecter = function(tagName, className){
      if(className === ""){
        return tagName;
      }else{
        return tagName + "." + className;
      }
    };

    $("*", $content).click(function(event) {
      // console.log(event);
      // console.log($(this).text());
      // console.log($(this).selector);
      // $column.val($(this).text());
      // $selecter.val(getCSSSelecter($(this).prop("tagName"), $(this).prop("class").split(" ").join(".")));
      return false;
    });

    var Label = (function() {
      var Label = function($iframe, $target) {
        this.$target = $target;
        this.$el = $("<div></div>").addClass("label");
        // this.$close = $("<div></div>").addClass("label label-close");
        this.setProp();
        $(window).resize(function() {
          console.log("reszie");
          this.reset();
        }.bind(this));
        this.$iframe = $iframe;
        this.$el = this.$el.appendTo($iframe);
      }
      Label.prototype.setProp = function() {
        this.offset = this.$target.offset();
        this.size = {width: this.$target.width(), height: this.$target.height()};
        this.$el.css({
          "position": "absolute",
          "top": this.offset.top-1,
          "left": this.offset.left-1,
          // "padding-left": "20px",
          "width": this.size.width+2,
          "height": this.size.height+2,
          "background": "#50E3C2",
          "border-radius": "8px",
          "box-shadow": "0px 2px 4px 0px rgba(159,154,154,0.50), inset 0px 1px 3px 0px rgba(101,86,86,0.50)",
          "overflow": "hidden",
          "white-space": "nowrap",
          "text-overflow": "ellipsis",
          "cursor": "pointer",
          // "font-size": size.height-2+"px",
        });
        this.$el.text(this.$target.text());
        this.$el.click(function() {
          $(this).remove();
        }); 
      };
      Label.prototype.reset = function() {
        this.offset = this.$target.offset();
        this.size = {width: this.$target.width(), height: this.$target.height()};
        this.$el.css({
          "top": this.offset.top-1,
          "left": this.offset.left-1,
          // "padding-left": "20px",
          "width": this.size.width+2,
          "height": this.size.height+2,
        });
      };
      return Label;
    })();

    var targetTagList = "p, span, a, li, h1, h2, h3, h4, h5, h6, h7, cite";
    $(targetTagList, $content).hover(
      function() {
      },
      function() {

      }
    ).click(function(event) {
      console.log($(this));
      var label = new Label($content, $(this), true);
    });

    // var cache;
    // var tagName;
    // var className;
    // var $paerElement;
    // var isSearch = false;

    // $("p, span, a, li, h1, h2, h3, h4, h5, h6, h7, cite", $content).hover(
    //   function(event){
    //     if(isSearch) return;
    //     console.log($(this).length);
    //     var depthLimit = 10;
    //     var currentDepth = 0;
    //     var minPearTh = 3;
    //     CssCache = $(this).css("background");
    //     tagName = $(this)[0].tagName;
    //     className = ($(this)[0].className).split(" ").join(".");
    //     // console.log("tagName : " + tagName);
    //     // console.log("className : " + className);
    //     var $parentElement;
    //     do{
    //       $parentElement = $parentElement === undefined ? $(this)[0].parentElement : $parentElement.parentElement;
    //       console.log("-------------");
    //       console.log("search term : " + currentDepth);
    //       console.log(getCSSSelecter(tagName, className));
    //       console.log($parentElement);
    //       $paerElement = $(getCSSSelecter(tagName, className), $parentElement);
    //       console.log("pear count : " + $paerElement.length);
    //       console.log("-------------");
    //       currentDepth ++;
    //     }while(currentDepth <= depthLimit && ($paerElement && $paerElement.length <= minPearTh));
    //     $paerElement.css("background", "#6F00FF");
    //     isSearch = true;
    //     // console.log($paerElement);
    //   },
    //   function(event){
    //     $paerElement.css("background", CssCache);
    //     $paerElement = undefined;
    //     isSearch = false;
    //   }
    // );

    setTimeout(function() {
      $("#wrapper").toggleClass("toggled");
    }, 300);

  });
});
