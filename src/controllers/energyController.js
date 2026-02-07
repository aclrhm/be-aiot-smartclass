const { db } = require('../../config/firebase');

exports.getEnergyStats = async (req, res) => {
  try {
    const snapshot = await db.collection('energy_stats').orderBy('date', 'asc').get();
    const data = snapshot.docs.map(doc => doc.data());
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};