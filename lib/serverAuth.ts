import { adminAuth, adminDb } from './firebaseAdmin';

export interface AuthContext {
  uid: string;
  email?: string;
  role: string;
}

/**
 * Verifies the Firebase Bearer token from the request headers and checks against allowed roles.
 * @param req The incoming Next.js Request object.
 * @param allowedRoles Array of roles that are allowed to access this endpoint (e.g., ['admin', 'scanner']).
 * @returns AuthContext if successful.
 * @throws Error if authentication or authorization fails.
 */
export async function verifyAuthRole(req: Request, allowedRoles: string[]): Promise<AuthContext> {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or invalid Authorization header');
  }

  const token = authHeader.split('Bearer ')[1];
  
  let decodedToken;
  try {
    decodedToken = await adminAuth.verifyIdToken(token);
  } catch (error) {
    throw new Error('Invalid or expired authentication token');
  }

  const { uid, email } = decodedToken;

  // Fetch the role from the 'roles' collection
  const roleDoc = await adminDb.collection('roles').doc(uid).get();
  
  if (!roleDoc.exists) {
    throw new Error('Account has no assigned role');
  }

  const userRole = roleDoc.data()?.role;

  if (!allowedRoles.includes(userRole)) {
    throw new Error(`Access denied: role '${userRole}' is not authorized for this action.`);
  }

  return {
    uid,
    email,
    role: userRole
  };
}
