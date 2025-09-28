  // Update Cognito user attributes
  const updateCognitoAttributes = async (attributes) => {
    return new Promise((resolve, reject) => {
      const currentUser = userPool.getCurrentUser();
      if (!currentUser) {
        reject(new Error('No current user'));
        return;
      }
      const attributeList = Object.keys(attributes).map(key =>
        new CognitoUserAttribute({ Name: key, Value: attributes[key] })
      );
      currentUser.updateAttributes(attributeList, (err, result) => {
        if (err) {
          setAuthError(err.message);
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  };
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { dynamoDBService } from '../utils/dynamoDBService';

const poolData = {
  UserPoolId: 'us-east-1_oNkz8iV12',
  ClientId: '2ov88v081o7g6lgl0t1epq1gj2'
};

const userPool = new CognitoUserPool(poolData);

const CognitoAuthContext = createContext({});

export const useCognitoAuth = () => {
  const context = useContext(CognitoAuthContext);
  if (!context) {
    throw new Error('useCognitoAuth must be used within CognitoAuthProvider');
  }
  return context;
};

export const CognitoAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Initialize auth state
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const currentUser = userPool?.getCurrentUser();
      if (currentUser) {
        currentUser?.getSession((err, session) => {
          if (err) {
            setLoading(false);
            return;
          }
          if (session?.isValid()) {
            setUser(currentUser);
            loadUserProfile(currentUser?.username);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Auth state check error:', error);
      setLoading(false);
    }
  };

  const loadUserProfile = async (username) => {
    try {
      const profile = await dynamoDBService?.getUserProfile(username);
      setUserProfile(profile);
    } catch (error) {
      console.error('Profile loading error:', error);
    }
  };

  const signIn = async (username, password) => {
    setAuthError(null);
    
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: username,
        Pool: userPool
      });

      const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password
      });

      user.authenticateUser(authDetails, {
        onSuccess: async (session) => {
          setUser(user);
          await loadUserProfile(username);
          resolve({ success: true, user, session });
        },
        onFailure: (err) => {
          setAuthError(err.message);
          reject(err);
        },
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          // Handle new password requirement
          resolve({ 
            success: false, 
            newPasswordRequired: true, 
            user,
            userAttributes,
            requiredAttributes 
          });
        }
      });
    });
  };

  const signUp = async (username, password, email, attributes = {}) => {
    setAuthError(null);

    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      })
    ];

    // Add additional attributes
    Object.keys(attributes)?.forEach(key => {
      attributeList?.push(new CognitoUserAttribute({
        Name: key,
        Value: attributes[key]
      }));
    });

    return new Promise((resolve, reject) => {
      userPool.signUp(username, password, attributeList, null, async (err, result) => {
        if (err) {
          setAuthError(err.message);
          reject(err);
          return;
        }

        // Create user profile in DynamoDB
        try {
          await dynamoDBService.createUserProfile({
            username,
            email,
            ...attributes,
            cognitoSub: result.userSub,
            status: 'pending_verification'
          });
        } catch (dbError) {
          console.error('Profile creation error:', dbError);
        }

        resolve({ 
          success: true, 
          user: result.user,
          userSub: result.userSub 
        });
      });
    });
  };

  const signOut = async () => {
    try {
      const currentUser = userPool?.getCurrentUser();
      if (currentUser) {
        currentUser?.signOut();
      }
      setUser(null);
      setUserProfile(null);
      setAuthError(null);
      return { success: true };
    } catch (error) {
      setAuthError('Sign out failed');
      return { success: false, error };
    }
  };

  const confirmRegistration = async (username, confirmationCode) => {
    setAuthError(null);

    const user = new CognitoUser({
      Username: username,
      Pool: userPool
    });

    return new Promise((resolve, reject) => {
      user.confirmRegistration(confirmationCode, true, async (err, result) => {
        if (err) {
          setAuthError(err.message);
          reject(err);
          return;
        }

        // Update user profile status
        try {
          await dynamoDBService.updateUserProfile(username, {
            status: 'active',
            verifiedAt: new Date().toISOString()
          });
        } catch (dbError) {
          console.error('Profile update error:', dbError);
        }

        resolve({ success: true, result });
      });
    });
  };

  const resendConfirmationCode = async (username) => {
    const user = new CognitoUser({
      Username: username,
      Pool: userPool
    });

    return new Promise((resolve, reject) => {
      user.resendConfirmationCode((err, result) => {
        if (err) {
          setAuthError(err.message);
          reject(err);
          return;
        }
        resolve({ success: true, result });
      });
    });
  };

  const getCurrentSession = () => {
    return new Promise((resolve, reject) => {
      const currentUser = userPool.getCurrentUser();
      if (!currentUser) {
        reject(new Error('No current user'));
        return;
      }

      currentUser.getSession((err, session) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(session);
      });
    });
  };

  // Add missing role-based authorization functions
  const canManageClients = () => {
    if (!userProfile) return false;
    const role = userProfile?.role?.toLowerCase();
    return ['admin', 'c3ops', 'executive']?.includes(role);
  };

  const isC3OpsUser = () => {
    if (!userProfile) return false;
    const role = userProfile?.role?.toLowerCase();
    return ['admin', 'c3ops']?.includes(role);
  };

  const hasRole = (requiredRole) => {
    if (!userProfile) return false;
    const userRole = userProfile?.role?.toLowerCase();
    const required = requiredRole?.toLowerCase();
    return userRole === required || userRole === 'admin';
  };

  const hasAnyRole = (roles) => {
    if (!userProfile || !Array.isArray(roles)) return false;
    const userRole = userProfile?.role?.toLowerCase();
    return roles?.some(role => role?.toLowerCase() === userRole) || userRole === 'admin';
  };

  const value = {
    user,
    userProfile,
    loading,
    authError,
    signIn,
    signUp,
    signOut,
    confirmRegistration,
    resendConfirmationCode,
    getCurrentSession,
    isAuthenticated: !!user,
    clearError: () => setAuthError(null),
    // Add role-based functions
    canManageClients,
    isC3OpsUser,
    hasRole,
    hasAnyRole,
    updateCognitoAttributes,
    setUserProfile
  };

  return (
    <CognitoAuthContext.Provider value={value}>
      {children}
    </CognitoAuthContext.Provider>
  );
};

export default CognitoAuthProvider;