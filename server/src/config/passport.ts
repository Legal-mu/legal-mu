import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import prisma from '../db/prisma';
import { UserRole } from '../generated/prisma/enums';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const API_URL = process.env.API_URL || 'http://localhost:5001';

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    console.warn('Missing Google OAuth credentials. Google Auth will not work.');
}

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID || 'missing-client-id',
            clientSecret: GOOGLE_CLIENT_SECRET || 'missing-client-secret',
            callbackURL: `${API_URL}/api/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                const googleId = profile.id;
                const firstName = profile.name?.givenName || 'Google';
                const lastName = profile.name?.familyName || 'User';
                const avatar = profile.photos?.[0]?.value;

                if (!email) {
                    return done(new Error('No email found in Google profile'));
                }

                // Check if user exists
                let user = await prisma.user.findFirst({
                    where: {
                        OR: [{ googleId }, { email: email.toLowerCase() }],
                    },
                });

                if (user) {
                    // If user exists but no googleId (registered via email), link account
                    if (!user.googleId) {
                        user = await prisma.user.update({
                            where: { id: user.id },
                            data: { googleId, avatar: avatar || user.avatar },
                        });
                    }
                    return done(null, user as any);
                }

                // Create new user
                user = await prisma.user.create({
                    data: {
                        email: email.toLowerCase(),
                        firstName,
                        lastName,
                        googleId,
                        avatar,
                        role: UserRole.CLIENT,
                        isActive: true,
                    },
                });

                return done(null, user as any);
            } catch (error) {
                return done(error as Error);
            }
        }
    )
);

export default passport;
