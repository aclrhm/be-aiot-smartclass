const { auth, db, admin, WEB_API_KEY } = require('../../config/firebase');
const axios = require('axios');

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Jalur verifikasi password ke Google
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${WEB_API_KEY}`;
    
    const response = await axios.post(url, {
      email,
      password,
      returnSecureToken: true
    });

    const { localId, idToken } = response.data;

    // Ambil data tambahan (Role) dari Firestore
    const userDoc = await db.collection('users').doc(localId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "Data user tidak ditemukan di database" });
    }

    res.status(200).json({
      message: "Login Berhasil",
      token: idToken,
      user: {
        uid: localId,
        ...userDoc.data()
      }
    });
  } catch (error) {
    // Jika password salah atau email tidak terdaftar
    res.status(401).json({ error: "Email atau Password salah" });
  }
};

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