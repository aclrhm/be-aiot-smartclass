const { db } = require('../../config/firebase');

// exports.getRoomDetail = async (req, res) => {
//   const { roomId } = req.params;
//   try {
//     const roomDoc = await db.collection('rooms').doc(roomId).get();
    
//     // Ambil perangkat di ruangan ini
//     const devicesSnapshot = await db.collection('devices').where('roomId', '==', roomId).get();
//     const devices = devicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

//     // Ambil 5 log terakhir ruangan ini
//     const logsSnapshot = await db.collection('activity_logs')
//       .where('roomId', '==', roomId)
//       .orderBy('timestamp', 'desc').limit(5).get();
//     const logs = logsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

//     res.json({
//       info: roomDoc.exists ? roomDoc.data() : { message: "Room not found" },
//       devices,
//       recentLogs: logs
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const { db } = require('../config/firebase');

exports.getRoomById = async (req, res) => {
  const { id } = req.params; // Ambil ID ruangan (misal: 202)

  try {
    // Cuma ambil data dari koleksi 'rooms'
    const roomDoc = await db.collection('rooms').doc(id).get();

    if (!roomDoc.exists) {
      return res.status(404).json({ 
        error: `Ruangan dengan ID ${id} tidak ditemukan` 
      });
    }

    // Kirim data ruangan saja, tanpa log aktivitas
    res.status(200).json({
      id: roomDoc.id,
      ...roomDoc.data()
    });

  } catch (error) {
    console.error("Error Get Room:", error);
    res.status(500).json({ error: "Gagal mengambil data ruangan" });
  }
};