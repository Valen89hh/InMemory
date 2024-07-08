import {create} from 'zustand';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, createUser, getUser, updateUser } from '../firebase';
import { User } from '../models/user-model';
import { isCompleteAdressUser } from '@/utils/verfication';


interface AuthState {
  user: User | null;
  loading: boolean;
  completeAdress: boolean;
  googleSignIn: () => void;
  logOut: () => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  updateUserProfile: (profile: User) => Promise<{
                                      success: string;
                                      error?: undefined;
                                  } | {
                                      error: string;
                                      success?: undefined;
                                  }>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true, // Inicialmente en carga
  completeAdress: false,
  googleSignIn: () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  },
  logOut: () => {
    signOut(auth);
  },
  setUser: (user) => set({ user, loading: false }), // Actualiza el estado de carga cuando se establece el usuario
  setLoading: (loading) => set({ loading }),
  updateUserProfile: async (user: User) => {
    const res = await updateUser(user)
    if(res.success){
      set({user, completeAdress: isCompleteAdressUser(user)})
    }

    return res
  },
}));

// Initialize auth state listener
const initializeAuthListener = () => {
  if (typeof window !== 'undefined') {
    onAuthStateChanged(auth, async(currentUser) => {
      if (currentUser) {
        const user = await getUser(currentUser.uid)
        if(user) {
          useAuthStore.getState().setUser(user);
          useAuthStore.getState().completeAdress = isCompleteAdressUser(user)
        }
        else{
          const newUser: User = {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            phone: null,
            country: null,
            state: null,
            province: null,
            district: null,
            address: null,
            appellidoMaterno: null,
            appellidoPaterno: null,
            dni: null,
            role: "user"
          }
          await createUser(newUser)
          useAuthStore.getState().completeAdress = false
          useAuthStore.getState().setUser(newUser);

        }
      } else {
        useAuthStore.getState().setUser(null);
      }
    });
  }
};

initializeAuthListener();
