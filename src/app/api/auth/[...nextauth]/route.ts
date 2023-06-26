import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signIn } from 'next-auth/react';

export const handler = NextAuth({
  providers: [
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
          'http://localhost:5000/api/auth/login',
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
    maxAge: 7200, // dos horas
    updateAge: 86400, // cada día
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case 'oauth':
            token.user = {};
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

/* export const authOptions: AuthOptions = {
              providers: [
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
            
                  async authorize(credentials, req) {
                    const authResponse = await fetch(
                      'http://localhost:5000/api/auth/login',
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
            
                    console.log(user);
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
                
              },
            
              secret: process.env.NEXTAUTH_SECRET,
            
            
            };
            
            const handler = NextAuth(authOptions);
            
            export { handler as GET, handler as POST }; */
