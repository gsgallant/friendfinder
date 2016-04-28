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
		userScores=req.body.scores;
		
		
		compatibilityArray =[];
		
		for(friendNum=0;friendNum<friendsData.length-2;++friendNum){
			var compatibilityScore=0;
			var scoreDiff=0;
			for(i=0;i<userScores.length-1;++i){
				scoreDiff=Math.abs(userScores[i]-friendsData[friendNum].scores[i]);
				compatibilityScore = compatibilityScore + scoreDiff;
			}

			// console.log("Friend# "+ friendNum+ " score: "+ compatibilityScore);
			compatibilityArray.push(compatibilityScore);
		}
		// console.log(compatibilityArray);
		//find the best friend match.
		var bestFriendIndex = 0;
		var bestFriendScore = compatibilityArray[bestFriendIndex];
		for(i=1;i<compatibilityArray.length-1;++i){
			if(compatibilityArray[i]<bestFriendScore){
				bestFriendIndex = i;
				bestFriendScore = compatibilityArray[i];
			}
		}
		var bestFriendName = friendsData[bestFriendIndex].name;
		var bestFriendPhotoLink = friendsData[bestFriendIndex].photo;
		
		// console.log(compatibilityArray);
		// console.log("bestFriendIndex: "+bestFriendIndex);
		// console.log("bestFriendScore: "+bestFriendScore);
		// console.log("Name:%s",bestFriendName);
		// console.log("PhotoLink: ",bestFriendPhotoLink);
		// console.log(data);
		
		res.json({
			'name':bestFriendName,
			'photo':bestFriendPhotoLink
		});

	});

}