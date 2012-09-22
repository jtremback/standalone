function CommentListCtrl($scope, $http) {
  alert("hello");
  $http.get('data.json').success(function(data) {
    $scope.tree = data;
    alert("goodbye")
  });
}