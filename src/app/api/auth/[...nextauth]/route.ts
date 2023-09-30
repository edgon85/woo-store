import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';

export const handler = NextAuth({
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
      id: 'credentials',
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
      async authorize(credentials): Promise<any> {
        const authResponse = await fetch(
          `${process.env.API_BASE_URL}/auth/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        if (!authResponse.ok) {
          return null;
        }
        const user = await authResponse.json();

        return user;
      },
    }),
  ],

  pages: {
    error: '/auth/login',
    signIn: '/auth/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 86400, // 24 horas
    updateAge: 82800, // 23 horas
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        // console.log(account.type);

        switch (account.type) {
          case 'oauth':
            const customData = {
              ...token,
              provider: account.provider,
            };

            const authResponse = await fetch(
              `${process.env.API_BASE_URL}/auth/next-auth`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  data: customData,
                }),
              }
            );

            if (!authResponse.ok) {
              token.user = undefined;
              break;
            }

            const currentUser = await authResponse.json();

            token.user = currentUser.user;

            break;

          case 'credentials':
            token.user = user;
            break;
        }
      }

      return token;
    },

    async session({ session, token, user }) {
      session.user = token.user!;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
