const matchService = require('../services/match.service');

exports.getMatches = async (req, res) => {
  try {
    const matches = await matchService.findMatches(req.params.id);
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};