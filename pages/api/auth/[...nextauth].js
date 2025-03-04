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

          const validRoles = ["paddler", "boat", "event_organizer"];
          const newRole = validRoles.includes(role) ? role : "paddler";
          const approved = newRole === "event_organizer" ? false : true; // Organizers need approval

          const newUser = {
            email,
            password, // Plain text—hash later
            role: newRole,
            approved,
            name: "New User",
            createdAt: new Date(),
          };
          const result = await db.collection("users").insertOne(newUser);

          if (!approved) {
            return null; // NextAuth will redirect with error
          }

          return {
            id: result.insertedId.toString(),
            email,
            role: newRole,
            name: "New User",
          };
        } else { // Login
          const user = await db.collection("users").findOne({ email });
          if (!user || user.password !== password) {
            throw new Error("Invalid email or password");
          }
          if (!user.approved) {
            throw new Error("Account not yet approved");
          }
          return {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
            name: user.name,
          };
        }
      },
      // Add custom error messages for CredentialsSignin
      async error(credentials, req) {
        if (credentials.role === "event_organizer" && !req.body.role) {
          return "Account created—awaiting admin approval";
        }
        return "Invalid credentials";
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