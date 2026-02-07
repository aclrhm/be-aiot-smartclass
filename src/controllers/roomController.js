const { db } = require('../../config/firebase');

exports.getRoomDetail = async (req, res) => {
  const { roomId } = req.params;
  try {
    const roomDoc = await db.collection('rooms').doc(roomId).get();
    
    // Ambil perangkat di ruangan ini
    const devicesSnapshot = await db.collection('devices').where('roomId', '==', roomId).get();
    const devices = devicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Ambil 5 log terakhir ruangan ini
    const logsSnapshot = await db.collection('activity_logs')
      .where('roomId', '==', roomId)
      .orderBy('timestamp', 'desc').limit(5).get();
    const logs = logsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.json({
      info: roomDoc.exists ? roomDoc.data() : { message: "Room not found" },
      devices,
      recentLogs: logs
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};