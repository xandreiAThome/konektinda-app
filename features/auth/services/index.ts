import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';

/**
 * Firebase Authentication Service
 * Handles login, signup, and logout operations
 */

interface AuthResult {
  success: boolean;
  error?: string;
  user?: any;
}

/**
 * Login with email and password
 */
export async function loginWithEmail(email: string, password: string): Promise<AuthResult> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: userCredential.user,
    };
  } catch (error: any) {
    return {
      success: false,
      error: mapFirebaseError(error.code),
    };
  }
}

/**
 * Sign up with email and password
 */
export async function signupWithEmail(email: string, password: string): Promise<AuthResult> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: userCredential.user,
    };
  } catch (error: any) {
    return {
      success: false,
      error: mapFirebaseError(error.code),
    };
  }
}

/**
 * Logout current user
 */
export async function logout(): Promise<AuthResult> {
  try {
    await signOut(auth);
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: mapFirebaseError(error.code),
    };
  }
}

/**
 * Get current user
 */
export function getCurrentUser() {
  return auth.currentUser;
}

/**
 * Map Firebase error codes to user-friendly messages
 */
function mapFirebaseError(code: string): string {
  const errorMap: { [key: string]: string } = {
    'auth/invalid-email': 'The email address is invalid.',
    'auth/user-disabled': 'This user account has been disabled.',
    'auth/user-not-found': 'No account found with this email address.',
    'auth/wrong-password': 'The password is incorrect.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'The password is too weak. Please use a stronger password.',
    'auth/operation-not-allowed': 'Email/password sign-in is not enabled.',
    'auth/too-many-requests': 'Too many login attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
  };

  return errorMap[code] || 'An unexpected error occurred. Please try again.';
}
