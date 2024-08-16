import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { signInAnonymously } from "firebase/auth";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>();

  const handleAnonymousLogin = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Error signing in anonymously:", error);
    }
    router.push("/");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    handleAnonymousLogin,
  };
};
