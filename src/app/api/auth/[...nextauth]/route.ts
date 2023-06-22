import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
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

        console.log(user);
        return {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          token: user.token,
        };
      },
    }),
  ],

  pages: {
    error: '/auth/login',
    signIn: '/auth/login'
  },
});

export { handler as GET, handler as POST };
