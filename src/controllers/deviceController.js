const { db, admin } = require('../../config/firebase');

exports.toggleDevice = async (req, res) => {
  const { deviceId, status, userId, userName, roomId } = req.body;
  try {
    await db.collection('devices').doc(deviceId).update({
      status,
      lastUpdate: admin.firestore.FieldValue.serverTimestamp()
    });

    await db.collection('activity_logs').add({
      deviceId,
      roomId,
      action: status,
      performedBy: userName,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    res.json({ message: `Perangkat ${deviceId} diubah ke ${status}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};