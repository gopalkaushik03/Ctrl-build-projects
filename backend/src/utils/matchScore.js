exports.calculateScore = (user, otherUser) => {
  let score = 0;

  const commonSkills = user.skills.filter((skill) =>
    otherUser.skills.includes(skill)
  );

  score += commonSkills.length * 2;

  if (user.experienceLevel === otherUser.experienceLevel) {
    score += 3;
  }

  return score;
};