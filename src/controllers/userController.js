const { auth, db, admin } = require('../../config/firebase');

exports.registerUser = async (req, res) => {
  const { email, password, fullName, role } = req.body;
  try {
    const userRecord = await auth.createUser({ email, password, displayName: fullName });
    await db.collection('users').doc(userRecord.uid).set({
      name: fullName,
      email,
      role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).json({ message: "User berhasil dibuat", uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data user" });
  }
};


exports.updateUser = async (req, res) => {
  const { id } = req.params; // UID user
  const { fullName, role } = req.body;
  try {
    await db.collection('users').doc(id).update({
      name: fullName,
      role: role,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  
    await auth.updateUser(id, { displayName: fullName });
    
    res.json({ message: "User berhasil diupdate" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 4. HAPUS USER
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await auth.deleteUser(id);

    await db.collection('users').doc(id).delete();
    
    res.json({ message: "User telah dihapus dari sistem" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};