(function() {
  var annoHtml, app, listHtml, treeHtml;

  app = angular.module("myApp", ["filters"]);

  /*
  Truncate Filter
  @Param text
  @Param length, default is 10
  @Param end, default is "..."
  @return string
  */


  angular.module("filters", []).filter("truncate", function() {
    return function(text, length, end) {
      if (isNaN(length)) {
        length = text.length;
      }
      if (end === undefined) {
        end = "...";
      }
      if (text.length <= length || text.length - end.length <= length) {
        return text;
      } else {
        return String(text).substring(0, length - end.length) + end;
      }
    };
  });

  /*
  Usage
  
  var myText = "This is an example.";
  
  {{myText|Truncate}}
  {{myText|Truncate:5}}
  {{myText|Truncate:25:" ->"}}
  Output
  "This is..."
  "Th..."
  "This is an e ->"
  */


  app.directive('list', function($compile) {
    return {
      restrict: 'E',
      scope: {
        node: "=",
        parent: "="
      },
      link: function(scope, elem, attrs) {
        return elem.append(($compile(listHtml))(scope));
      }
    };
  });

  listHtml = "<div id=\"stream\">\n  <ul class=\"annotator-widget annotator-listing\">\n      <div anno=\"exp\" class=\"tile\" ng-repeat=\"child in node.children\" node=\"child\" parent=\"node\"></div>\n  </ul>\n</div>";

  app.directive('anno', function($compile) {
    return {
      scope: {
        node: "=",
        parent: "="
      },
      link: function(scope, elem, attrs) {
        return elem.append(($compile(annoHtml))(scope));
      }
    };
  });

  annoHtml = "<ul class=\"annotator-widget annotator-listing\">\n  <div>\n    <a href=\"{{node.link}}\">{{node.page|truncate:60}}</a>\n    <div class=\"domain\">{{node.domain}}<img class=\"favicon\" ng-src=\"http://{{node.domain}}/favicon.ico\"/></div>\n    <li class=\"hyp-annotation hyp-paper hyp-detail hyp-excerpt leftside\" ng-click=\"showHide=!showHide\">   \n      <blockquote>\n        {{node.excerpt}}\n      </blockquote>\n    </li>\n    <li class=\"hyp-annotation hyp-paper hyp-detail rightside\">\n      <div class=\"topbar\">\n        <div class=\"hyp-user\">{{node.username}}</div>\n        <div class=\"hyp-time\">{{node.time}}</div>\n      </div>    \n      <div class=\"hyp-content\">{{node.text|truncate:200}}</div>\n      <div class=\"hyp-content\">{{node.text}}</div>\n      <div class=\"replies-counter\">{{node.children.length}} replies</div>\n      <div class=\"hyp-thread\">\n        <ul class=\"annotator-listing\" ng-show=\"showHide\">\n\n        <li tree=\"exp\" class=\"hyp-annotation hyp-detail\" ng-repeat=\"child in node.children\" node=\"child\" parent=\"node\"></li>\n\n        </ul>\n      </div>\n    </li>\n  </div>\n</ul>\n\n";

  app.directive('tree', function($compile) {
    return {
      replace: true,
      scope: {
        node: "=",
        parent: "="
      },
      link: function(scope, elem, attrs) {
        return elem.append(($compile(treeHtml))(scope));
      }
    };
  });

  treeHtml = "<a class=\"hyp-threadexp\" href=\"#collapse\"></a>\n<div class=\"topbar\">\n  <div class=\"hyp-user\">{{node.username}}</div>\n  <di  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 100% 100%;v class=\"hyp-time\">{{node.time}}</div>\n</div>\n<div class=\"hyp-content\">{{node.text}}</div>\n<div class=\"hyp-thread\">\n  <ul class=\"annotator-listing\"> \n\n      <li tree=\"exp\" class=\"hyp-annotation hyp-detail\" ng-repeat=\"child in node.children\" node=\"child\" parent=\"node\"></li>\n\n  </ul>\n</div>\n";

}).call(this);
