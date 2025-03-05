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
            throw new Error("Account created—awaiting admin approval"); // Redirect to /login with error
          }

          // Redirect Paddler/Boat to their dashboard
          const redirectPath = newRole === "paddler" ? "/dashboard/paddler" : "/dashboard/boat";
          return {
            id: result.insertedId.toString(),
            email,
            role: newRole,
            name: "New User",
            redirect: true,
            redirectUrl: redirectPath,
          };
        } else { // Login
          const user = await db.collection("users").findOne({ email });
          if (!user || user.password !== password) {
            throw new Error("Invalid email or password");
          }
          if (!user.approved) {
            throw new Error("Account not yet approved");
          }

          // Redirect to dashboard based on role
          const redirectPath = user.role === "paddler" ? "/dashboard/paddler" : user.role === "boat" ? "/dashboard/boat" : user.role === "event_organizer" ? "/dashboard/organizer" : "/dashboard/admin";
          return {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
            name: user.name,
            redirect: true,
            redirectUrl: redirectPath,
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
        if (user.redirect) {
          token.redirectUrl = user.redirectUrl; // Store redirect URL in token
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.id;
      if (token.redirectUrl) {
        return { ...session, redirectUrl: token.redirectUrl }; // Pass redirect URL to session
      }
      return session;
    },
  },
});