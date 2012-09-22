app = angular.module("myApp", ["filters"])

###
Truncate Filter
@Param text
@Param length, default is 10
@Param end, default is "..."
@return string
###
angular.module("filters", []).filter "truncate", ->
  (text, length, end) ->
    length = text.length if isNaN(length)
    end = "..."  if end is `undefined`
    if text.length <= length or text.length - end.length <= length
      text
    else
      String(text).substring(0, length - end.length) + end

###
Usage

var myText = "This is an example.";

{{myText|Truncate}}
{{myText|Truncate:5}}
{{myText|Truncate:25:" ->"}}
Output
"This is..."
"Th..."
"This is an e ->"
###

#Templating for list
app.directive 'list', ($compile) -> {

restrict: 'E',
scope: {
  node: "="
  parent: "="
}

link : (scope, elem, attrs) ->
  elem.append ($compile listHtml) scope
}

listHtml =
  """
<div id="stream">
  <ul class="annotator-widget annotator-listing">
      <div anno="exp" class="tile" ng-repeat="child in node.children" node="child" parent="node"></div>
  </ul>
</div>
  """

#Templating for annotations
app.directive 'anno', ($compile) -> {

scope: {
  node: "="
  parent: "="
}

link : (scope, elem, attrs) ->
  elem.append ($compile annoHtml) scope
}


#   <div class="metadata"><a>JordanLikesCoffee</a></div>
# <div class="control">
#   <a class="goto"><div class="inner">To Annotation</div></a>
# </div>
# <div class="control">
#   <a class="fave"><div class="inner">Favorite</div></a>
# </div>

# <div class="control">
#   <a class="goto"><div class="inner">To Annotation</div></a>
# </div>
# <div class="control">
#   <a class="fave"><div class="inner">Favorite</div></a>
# </div>

annoHtml =
  """
<ul class="annotator-widget annotator-listing">
  <div>
    <a href="{{node.link}}">{{node.page|truncate:60}}</a>
    <div class="domain">{{node.domain}}<img class="favicon" ng-src="http://{{node.domain}}/favicon.ico"/></div>
    <li class="hyp-annotation hyp-paper hyp-detail hyp-excerpt leftside" ng-click="showHide=!showHide">   
      <blockquote>
        {{node.excerpt}}
      </blockquote>
    </li>
    <li class="hyp-annotation hyp-paper hyp-detail rightside">
      <div class="topbar">
        <div class="hyp-user">{{node.username}}</div>
        <div class="hyp-time">{{node.time}}</div>
      </div>    
      <div class="hyp-content">{{node.text|truncate:200}}</div>
      <div class="hyp-content">{{node.text}}</div>
      <div class="replies-counter">{{node.children.length}} replies</div>
      <div class="hyp-thread">
        <ul class="annotator-listing" ng-show="showHide">

        <li tree="exp" class="hyp-annotation hyp-detail" ng-repeat="child in node.children" node="child" parent="node"></li>

        </ul>
      </div>
    </li>
  </div>
</ul>


  """

  # <li class="rightsidepanel">
  #   <div class="biggoto"></div>
  #   <div class="label">To Annotation</div>
  # </li>


# Templating for replies tree
app.directive 'tree', ($compile) -> {

  replace: true,
  scope: {
    node: "="
    parent: "="
  }

  link : (scope, elem, attrs) ->
    elem.append ($compile treeHtml) scope
}

treeHtml =
  """
<a class="hyp-threadexp" href="#collapse"></a>
<div class="topbar">
  <div class="hyp-user">{{node.username}}</div>
  <di  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;v class="hyp-time">{{node.time}}</div>
</div>
<div class="hyp-content">{{node.text}}</div>
<div class="hyp-thread">
  <ul class="annotator-listing"> 

      <li tree="exp" class="hyp-annotation hyp-detail" ng-repeat="child in node.children" node="child" parent="node"></li>

  </ul>
</div>

  """
  # <div class="annotator-controls">
  #  <a href="#reply" class="hyp-write">Reply</a>
  # </div>







# $scope.countAll = function() {
#   var count = 1;
#   angular.forEach($scope.tree, function(todo) {
#     if (todo.done)
#       count += 0;
#     else
#       count += 1;
#   });
#   return count;
# };

# $scope.number_of_children = function() {
#   var count = 1;
#   angular.forEach($scope.tree, function(e) {
#     count += e.number_of_children;
#   });
#   return count;
# };


# def self.number_of_children(tree)
#   sum = 1
#   tree.children.for_each { |e| 
#     sum += e.number_of_children
#   }
#   sum
# end

# if (todo.done)
#   count += 0;
# else
#   count += 1;

# result = (condition) ? 'something' : 'somethingelse';


# if (condition)
#   result = 'something';
# else
#   result = 'somethingelse';


# The ternary operator shortens this if/else statement into a single statement.
