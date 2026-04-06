const User = require('../models/user.model');

exports.findMatches = async (userId) => {
  const user = await User.findById(userId);
  const users = await User.find({ _id: { $ne: userId } });

  const matches = users.map((u) => {
    const commonSkills = user.skills.filter((skill) =>
      u.skills.includes(skill)
    );

    let score = commonSkills.length * 2;

    if (user.experienceLevel === u.experienceLevel) {
      score += 3;
    }

    return { user: u, score };
  });

  return matches.sort((a, b) => b.score - a.score);
};