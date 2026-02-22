const Achievement =
require("../models/Achievement");

async function checkAchievements(user, gameStats){

  const achievements=[];

  if(gameStats.easySolved >=5)
    achievements.push("Easy Master");

  if(gameStats.hintsUsed===0)
    achievements.push("No Hint Winner");

  if(
    gameStats.difficulty==="extreme" &&
    gameStats.timeTaken<600
  )
    achievements.push("Extreme Speedster");

  if(user.streak>=7)
    achievements.push("7 Day Streak");

  for(const name of achievements){

    const exists =
    await Achievement.findOne({
      userId:user._id,
      achievementName:name
    });

    if(!exists){
      await Achievement.create({
        userId:user._id,
        achievementName:name
      });
    }
  }
}

module.exports={checkAchievements};
