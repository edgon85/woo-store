import { NextAuthOptions, User, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import { JWT } from 'next-auth/jwt';

interface ExtendedUser extends User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  authType: string;
  profileImage: string;
  token: string;
}

interface ExtendedSession extends Session {
  user: ExtendedUser;
}

interface ExtendedToken extends JWT {
  user: ExtendedUser;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Correo',
          type: 'email',
          placeholder: 'correo@google.com',
        },
        password: {
          label: 'Contraseña',
          type: 'password',
          placeholder: 'Contraseña',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Email y contraseña son requeridos');
        }

        try {
          const response = await fetch(
            `${process.env.API_BASE_URL}/auth/login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!response.ok) {
            throw new Error('Credenciales inválidas');
          }

          const user = await response.json();
          return user as ExtendedUser;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 2628000, // 730 horas
    updateAge: 2541600, // 706 horas
  },

  callbacks: {
    async jwt({ token, account, user }): Promise<ExtendedToken> {
      if (account) {
        token.accessToken = account.access_token;

        if (account.type === 'oauth') {
          const customData = {
            ...token,
            provider: account.provider,
          };

          try {
            const response = await fetch(
              `${process.env.API_BASE_URL}/auth/next-auth`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  data: customData,
                }),
              }
            );

            if (!response.ok) {
              throw new Error('Error en la autenticación OAuth');
            }

            const data = await response.json();
            token.user = data.user;
          } catch (error) {
            console.error('OAuth error:', error);
            token.user = undefined;
          }
        } else if (account.type === 'credentials') {
          token.user = user as ExtendedUser;
        }
      }
      return token as ExtendedToken;
    },

    async session({ session, token }): Promise<ExtendedSession> {
      return {
        ...session,
        user: (token as ExtendedToken).user,
      };
    },
  },
};
