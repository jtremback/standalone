'use strict';

/* Controllers */

function PhoneListCtrl($scope) {
  $scope.tree = [{name: "Node", snorp: "crap", nodes: [ {name: "Nope", snorp: "crop", nodes: [{name:"Nape", snorp: "crip", nodes: []}]} ]}];
}