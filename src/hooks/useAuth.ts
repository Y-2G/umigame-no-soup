import { useEffect, useState } from "react";
import { auth } from "#/firebaseConfig";
import { signInAnonymously, updateProfile } from "firebase/auth";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const useAuth = () => {
  const router = useRouter();
  const methods = useForm<User>()
  const {watch, setValue} = methods
  const [user, setUser] = useState<User | null>();

  const handleAnonymousLogin = async (data: User) => {
    try {
      await signInAnonymously(auth);
      setValue("displayName", data.displayName)
      setValue("photoURL", data.photoURL)
      console.log('test')
      router.push("/");
    } catch (error) {
      console.error("Error signing in anonymously:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const displayName = watch("displayName")
        const photoURL = watch("photoURL")
        setUser(currentUser);
        updateProfile(currentUser, {displayName, photoURL})
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [router, watch]);

  return {
    user,
    methods,
    handleAnonymousLogin,
  };
};
