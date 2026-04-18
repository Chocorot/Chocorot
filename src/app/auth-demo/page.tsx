"use client";

import { useState, useEffect } from "react";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  limit, 
  serverTimestamp 
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/components/Firebase/AuthContext";

export default function AuthDemoPage() {
  const { user, loading, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [testData, setTestData] = useState<any[]>([]);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const addTestData = async () => {
    if (!user) return;
    try {
      await addDoc(collection(db, "test-collection"), {
        text: "Hello from Firebase!",
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
      fetchTestData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchTestData = async () => {
    if (!user) return;
    try {
      const q = query(
        collection(db, "test-collection"),
        where("userId", "==", user.uid),
        limit(5)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTestData(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTestData();
    } else {
      setTestData([]);
    }
  }, [user]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Firebase Backend Demo</h1>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded mb-6">
          {error}
        </div>
      )}

      {!user ? (
        <div className="bg-white/5 p-8 rounded-xl border border-white/10 shadow-2xl">
          <h2 className="text-xl font-semibold mb-6">
            {isSignUp ? "Create Account" : "Sign In"}
          </h2>
          
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded p-2 focus:border-primary-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded p-2 focus:border-primary-500 outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black font-bold py-2 rounded hover:bg-white/90 transition-colors"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-gray-400 hover:text-white underline"
            >
              {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
            </button>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-gray-400">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full border border-white/10 py-2 rounded flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Signed in as</p>
              <p className="font-bold">{user.email || user.displayName}</p>
            </div>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 border border-white/10 rounded hover:bg-white/5 transition-colors"
            >
              Sign Out
            </button>
          </div>

          <div className="bg-white/5 p-8 rounded-xl border border-white/10">
            <h2 className="text-xl font-semibold mb-6 text-primary-400">Firestore Test</h2>
            <button
              onClick={addTestData}
              className="bg-primary-600 text-white font-bold px-6 py-2 rounded hover:bg-primary-500 transition-colors mb-6"
            >
              Add Document to Firestore
            </button>

            <div className="space-y-4">
              <h3 className="text-sm font-uppercase text-gray-500 tracking-wider">Recent Documents</h3>
              {testData.length === 0 ? (
                <p className="text-gray-500 italic">No documents found.</p>
              ) : (
                testData.map((doc) => (
                  <div key={doc.id} className="bg-black/20 p-4 rounded border border-white/5 text-sm">
                    <pre className="whitespace-pre-wrap">{JSON.stringify(doc, null, 2)}</pre>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
