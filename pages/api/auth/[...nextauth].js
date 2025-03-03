import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../src/lib/mongodb";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials, req) {
        const { email, password, role } = credentials;
        const client = await clientPromise;
        const db = client.db("paddleCommunity");

        if (req.body?.role) { // Signup
          const existingUser = await db.collection("users").findOne({ email });
          if (existingUser) {
            throw new Error("Email already taken");
          }
          const newUser = {
            email,
            password, // Plain text for now—hash later with bcrypt
            role: role || "paddler",
            name: "New User", // Placeholder, editable later
            createdAt: new Date(),
          };
          const result = await db.collection("users").insertOne(newUser);
          return {
            id: result.insertedId.toString(),
            email,
            role: newUser.role,
            name: newUser.name,
          };
        } else { // Login
          const user = await db.collection("users").findOne({ email });
          if (!user || user.password !== password) {
            throw new Error("Invalid email or password");
          }
          return {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
            name: user.name,
          };
        }
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.id;
      return session;
    },
  },
});