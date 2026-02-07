const { db, admin } = require('../../config/firebase');

exports.updateSensorData = async (req, res) => {
  const { roomId, personCount, currentTemp } = req.body;
  try {
    await db.collection('rooms').doc(roomId).update({
      personCount,
      currentTemp,
      lastUpdate: admin.firestore.FieldValue.serverTimestamp()
    });

    // Kirim Notifikasi jika orang kosong
    if (personCount === 0) {
      const message = {
        notification: {
          title: `Ruang ${roomId} Kosong!`,
          body: `Sudah tidak ada orang. Harap cek AC dan Lampu.`
        },
        topic: 'security'
      };
      await admin.messaging().send(message);
    }
    res.json({ success: true, message: "Data sensor diperbarui" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};