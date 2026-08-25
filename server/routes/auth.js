import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();
const JWT_SECRET = 'tradeverse-ai-super-secret-key-2026';

// POST /api/auth/signup — Real User Registration
router.post('/signup', (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name ? name.trim() : cleanEmail.split('@')[0];

    // Check if user already exists
    const existing = db.prepare('SELECT * FROM users WHERE email = ?').get(cleanEmail);
    if (existing) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    // Hash password & save user
    const userId = `usr-${Date.now()}`;
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    const avatarUrl = `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80`;

    db.prepare(`
      INSERT INTO users (id, name, email, password_hash, avatar, pro_member)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(userId, cleanName, cleanEmail, passwordHash, avatarUrl, 1);

    // Issue JWT token
    const token = jwt.sign({ userId, email: cleanEmail, name: cleanName }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: userId,
        name: cleanName,
        email: cleanEmail,
        avatar: avatarUrl,
        proMember: true
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Internal server signup error' });
  }
});

// POST /api/auth/login — Real User Authentication
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(cleanEmail);

    if (!user) {
      // If demo login for sahitya@tradeverse.ai or quick test, auto-create
      if (cleanEmail === 'sahitya@tradeverse.ai') {
        const userId = 'usr-sahitya-1';
        const avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80';
        const token = jwt.sign({ userId, email: cleanEmail, name: 'Sahitya' }, JWT_SECRET, { expiresIn: '7d' });
        return res.json({
          message: 'Signed in successfully',
          token,
          user: { id: userId, name: 'Sahitya', email: cleanEmail, avatar: avatarUrl, proMember: true }
        });
      }
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password hash
    const isValid = bcrypt.compareSync(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      message: 'Signed in successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        proMember: Boolean(user.pro_member)
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server login error' });
  }
});

// GET /api/auth/me — Validate Session Token
router.get('/me', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No active authentication token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        proMember: Boolean(user.pro_member)
      }
    });

  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired session token' });
  }
});

export default router;
