import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useCognitoAuth } from '../contexts/CognitoAuthContext';

const RequireAuth = ({ children }) => {
  const { isAuthenticated, loading } = useCognitoAuth();
  const location = useLocation();

  // While auth is being determined, avoid redirecting (prevents flicker)
  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If children provided, render them, otherwise render nested routes
  return children ? children : <Outlet />;
};

export default RequireAuth;
