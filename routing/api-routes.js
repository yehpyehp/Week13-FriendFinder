var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');


var friendsData = require('../data/friends.js');
var userData = require('../data/user.js');
var matchData = require('../data/match.js');



module.exports = function(app){

app.get('/api/friends', function(req, res){
	res.json(friendsData);
})

app.get('/api/match', function(req, res){
	res.json(matchData);
})

app.post('/api/friends', function(req, res){

	clearMatch();

	var newfriend = req.body;
	var result;

	console.log(newfriend);

	userData.push(newfriend);

	res.json(newfriend);


	var friendScores;
	var totalDiff;
	var results = [];
	var ratingArray = [];
	var counter = 0;
	var lowest;

	function getSum(total, num) {
    		return total + num;
	};

	function clearMatch() {
		matchData = [];
	}


	for (var i = 0; i < friendsData.length; i++) {

		friendScores = friendsData[i].scores;
		
		for (var j = 0; j < newfriend.scores.length; j++) {
		results.push(Math.abs(newfriend.scores[j] - friendScores[j]));
		}

		totalDiff = results.reduce(getSum);
		friendsData[i].rating = totalDiff;
		console.log(friendsData[i].rating);
		counter++;

		results = [];

		ratingArray.push(friendsData[i].rating);
	}
	
	if (counter === friendsData.length) {
		Math.max.apply(null, ratingArray);
		lowest = Math.min.apply(null, ratingArray);
		console.log(lowest);
	}

	for (var i = 0; i < friendsData.length; i++) {
		if (friendsData[i].rating == lowest) {
			matchData.push(friendsData[i]);		
		};

		friendsData[i].rating = 0;
	}

	console.log(matchData);

	friendsData.push(newfriend);

	userData = [];

})

}