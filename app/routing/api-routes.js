// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources. 
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData 	= require('../data/friends.js');
var path 			= require('path');

var compatibilityArray =[];


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){


	app.post('/api/survey', function(req, res){
		
		friendsData.push(req.body);
		// jsonFriendsData = JSON.stringify(friendsData);
		userScores = req.body.scores;
		console.log("friendsData.length= %s",friendsData.length);
		//console.log("userScores: "+userScores);
		compatibilityArray = [];
		//-1 to eliminate the user's data because the user was just pushed into friendsData Array
		for(friendNum=0;friendNum<friendsData.length-1;++friendNum){
			var compatibilityScore=0;
			var scoreDiff=0;
			
			for(i=0;i<userScores.length;++i){
				// console.log("userScores[i]: " + userScores[i]);
				// console.log("friendsData.score[i]:"+friendsData[friendNum].scores[i]);
				scoreDiff=Math.abs(userScores[i]-friendsData[friendNum].scores[i]);
				// console.log("scoreDiff="+scoreDiff);
				compatibilityScore = compatibilityScore + scoreDiff;
				// console.log("compatibilityScore="+compatibilityScore);
			}
			//this array represents the score and also the position of the best friend in the friendsData array.
			console.log("friendNum=",friendNum);
			compatibilityArray.push(compatibilityScore);
		}
		
		console.log("compatibility array: "+compatibilityArray);
		//find the best friend match.
		var bestFriendIndex = 0;
		var bestFriendScore = compatibilityArray[0];
		console.log("compatibilityArray.length=%s",compatibilityArray.length);
		for(i=1;i<compatibilityArray.length;++i){
			console.log("compatibilityArray["+i+"]="+compatibilityArray[i]);
			if(compatibilityArray[i]<bestFriendScore){
				bestFriendIndex = i;
				bestFriendScore = compatibilityArray[i];
			}
		}
		
		console.log("friendsData stringify'd: "+JSON.stringify(friendsData));
		var bestFriendName = friendsData[bestFriendIndex].friendName;
		var bestFriendPhotoLink = friendsData[bestFriendIndex].friendPhoto;
		if(bestFriendIndex==friendsData.length-1){
			bestFriendName = "You are your own best friend!";
		}
		//console.log(compatibilityArray);
		console.log("bestFriendIndex: "+ bestFriendIndex);
		console.log("bestFriendScore: "+ bestFriendScore);
		console.log("Name:%s",bestFriendName);
		console.log("PhotoLink: ",bestFriendPhotoLink);
		
		res.json({
			'name':bestFriendName,
			'photo':bestFriendPhotoLink
		});

	});

}