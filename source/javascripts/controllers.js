// function CommentListCtrl($scope, $http) {
//   alert("hello");
//   $http.get('data.json').success(function(data) {
//     $scope.tree = data;
//     alert("goodbye")
//   });
// }

angular.module("myApp", []).
controller("TreeController", ['$scope', function($scope) {
$scope.tree = [{name: "Node", snorp: "crap", nodes: [ {name: "Nope", snorp: "crop", nodes: [{name:"Nape", snorp: "crip"}]} ]}];
}])