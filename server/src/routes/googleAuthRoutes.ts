import { Router } from 'express';
import passport from '../config/passport';
import { generateToken } from '../utils/jwt';
import { User } from '../generated/prisma/client';

const router = Router();
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Initialize passport
router.use(passport.initialize());

// Route to start Google OAuth flow
router.get(
    '/',
    passport.authenticate('google', {
        session: false,
        scope: ['profile', 'email'],
    })
);

// Callback route
router.get(
    '/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: `${FRONTEND_URL}/login?error=google_auth_failed`,
    }),
    (req, res) => {
        // User is authenticated and available in req.user
        const user = (req as any).user as unknown as User;

        if (!user) {
            return res.redirect(`${FRONTEND_URL}/login?error=auth_failed`);
        }

        // Generate JWT
        const token = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        // Set cookie
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: '/',
        });

        // Redirect to frontend dashboard or home
        res.redirect(`${FRONTEND_URL}/dashboard`);
    }
);

export default router;
