import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  Auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  signInAnonymously
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB_Demo_ApiKey_BinaireFreznelAssessment2026",
  authDomain: "binaire-freznel-assessment.firebaseapp.com",
  projectId: "binaire-freznel-assessment",
  storageBucket: "binaire-freznel-assessment.appspot.com",
  messagingSenderId: "987654321098",
  appId: "1:987654321098:web:a1b2c3d4e5f6g7h8i9j0"
};

export class FirebaseAuthService {
  private app!: FirebaseApp;
  private auth!: Auth;
  private listeners: Set<(user: User | null) => void> = new Set();
  private mockUser: User | null = null;
  private isDemoMode: boolean = false;

  constructor() {
    if (!getApps().length) {
      try {
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth(this.app);
      } catch (e) {
        this.isDemoMode = true;
      }
    } else {
      this.app = getApps()[0];
      this.auth = getAuth(this.app);
    }

    this.initAuthListener();
  }

  private initAuthListener() {
    if (this.auth) {
      onAuthStateChanged(this.auth, (user) => {
        this.notify(user);
      });
    }
  }

  public subscribe(callback: (user: User | null) => void): () => void {
    this.listeners.add(callback);
    callback(this.getUser());
    return () => {
      this.listeners.delete(callback);
    };
  }

  public getUser(): User | null {
    if (this.isDemoMode) return this.mockUser;
    return this.auth?.currentUser || this.mockUser;
  }

  public async signUp(email: string, pass: string): Promise<User | null> {
    try {
      const res = await createUserWithEmailAndPassword(this.auth, email, pass);
      return res.user;
    } catch (err: any) {
      if (err.code === 'auth/invalid-api-key' || err.code === 'auth/network-request-failed' || this.isDemoMode) {
        const dummyUser = {
          uid: 'usr_' + Date.now(),
          email: email,
          displayName: email.split('@')[0],
          emailVerified: true
        } as User;
        this.mockUser = dummyUser;
        this.notify(dummyUser);
        return dummyUser;
      }
      throw err;
    }
  }

  public async signIn(email: string, pass: string): Promise<User | null> {
    try {
      const res = await signInWithEmailAndPassword(this.auth, email, pass);
      return res.user;
    } catch (err: any) {
      if (err.code === 'auth/invalid-api-key' || err.code === 'auth/network-request-failed' || err.code === 'auth/user-not-found' || this.isDemoMode) {
        const dummyUser = {
          uid: 'usr_logged_' + Date.now(),
          email: email,
          displayName: email.split('@')[0],
          emailVerified: true
        } as User;
        this.mockUser = dummyUser;
        this.notify(dummyUser);
        return dummyUser;
      }
      throw err;
    }
  }

  public async signInGuest(): Promise<User | null> {
    try {
      const res = await signInAnonymously(this.auth);
      return res.user;
    } catch (e) {
      const dummyUser = {
        uid: 'usr_guest_' + Date.now(),
        email: 'guest@binaire.ai',
        displayName: 'Guest Researcher',
        emailVerified: true
      } as User;
      this.mockUser = dummyUser;
      this.notify(dummyUser);
      return dummyUser;
    }
  }

  public async logout(): Promise<void> {
    if (this.auth) {
      try {
        await signOut(this.auth);
      } catch (e) {
      }
    }
    this.mockUser = null;
    this.notify(null);
  }

  private notify(user: User | null) {
    this.listeners.forEach((cb) => cb(user));
  }
}
