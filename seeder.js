const { db, admin } = require('./config/firebase');

const seedRoom202 = async () => {
  try {
    console.log("Memulai proses seeding untuk Ruang 202...");

    // 1. Setup Data Ruangan - ID diubah menjadi "202"
    const roomId = "202";
    await db.collection('rooms').doc(roomId).set({
      roomName: "Ruang Kelas 202",
      currentTemp: 23,
      personCount: 15,
      lastUpdate: admin.firestore.FieldValue.serverTimestamp()
    });

    // 2. Setup Perangkat (Lampu & AC) - ID menggunakan prefix 202
    const devices = [
      { id: "202_Lamp_01", name: "Lampu Utama 202", status: "ON" },
      { id: "202_AC_01", name: "AC Split 202", status: "ON" }
    ];

    for (const dev of devices) {
      await db.collection('devices').doc(dev.id).set({
        roomId: roomId,
        deviceName: dev.name,
        status: dev.status,
        lastUpdate: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    // 3. Setup Log Aktivitas Awal
    const logs = [
      {
        deviceId: "202_Lamp_01",
        roomId: roomId,
        action: "ON",
        performedBy: "Budi Security",
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      },
      {
        deviceId: "202_AC_01",
        roomId: roomId,
        action: "ON",
        performedBy: "Admin Logistik",
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      }
    ];

    for (const log of logs) {
      await db.collection('activity_logs').add(log);
    }

    // 4. Setup Data Energi (7 hari terakhir)
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];

      await db.collection('energy_stats').add({
        date: dateString,
        kwh: parseFloat((Math.random() * (20 - 10) + 10).toFixed(2)),
        roomId: roomId
      });
    }

    console.log("✅ Seeding Berhasil! Ruang 202 siap digunakan.");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding Gagal:", error);
    process.exit(1);
  }
};

seedRoom202();