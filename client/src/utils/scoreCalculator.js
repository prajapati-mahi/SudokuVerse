export function calculateFinalScore(difficulty, timeElapsed, mistakes, hintsUsed) {
  let baseScore = 0;

  if (difficulty === "beginner") baseScore = 200;
  else if (difficulty === "easy") baseScore = 400;
  else if (difficulty === "medium") baseScore = 600;
  else if (difficulty === "hard") baseScore = 800;
  else if (difficulty === "expert") baseScore = 1000;
  else if (difficulty === "extreme") baseScore = 1200;

  // Time bonus
  const timeBonus = Math.max(0, 500 - Math.floor(timeElapsed / 2));

  // Penalties
  const hintPenalty = hintsUsed * 50;
  const mistakePenalty = mistakes * 30;

  const finalScore = baseScore + timeBonus - hintPenalty - mistakePenalty;

  return finalScore;
}
