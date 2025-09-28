import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useCognitoAuth } from '../../contexts/CognitoAuthContext';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SSOOptions from './components/SSOOptions';
import SignupForm from './components/SignupForm';
import { signIn, fetchAuthSession, signOut } from "aws-amplify/auth";

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const location = useLocation();
  const { isAuthenticated } = useCognitoAuth();

  const handleLogin = async (formData) => {
    setMsg('');
    setIsLoading(true);
    const username = formData?.email ?? formData?.username;
    const password = formData?.password;
    if (!username || !password) {
      setMsg('Enter email and password');
      setIsLoading(false);
      return;
    }

    try {
      await signIn({ username: username.toLowerCase(), password });
      const session = await fetchAuthSession();
      // Persist minimal session
      try {
        localStorage.setItem('cognito-session', JSON.stringify({ tokens: session?.tokens ?? null, user: { email: username } }));
      } catch (_e) {}

      setMsg('Signed in ✅ (approved).');
      // Redirect to last visited path if present, otherwise dashboard.
      // Use a full location navigation so the auth context can detect the
      // newly established session immediately (avoids redirect loops where
      // client-side auth guard still reports unauthenticated until refresh).
      try {
        const lastPath = localStorage.getItem('lastPath');
        const target = lastPath && lastPath !== '/login' ? lastPath : '/dashboard-overview';
        window.location.href = target;
      } catch (e) {
        window.location.href = '/dashboard-overview';
      }
    } catch (e) {
      const m = String(e?.message || '');
      if (e?.name === 'UserLambdaValidationException' || m.includes('Account pending approval')) {
        setMsg('Your account is pending admin approval.');
      } else if (e?.name === 'UserNotConfirmedException') {
        setMsg('Please confirm your email before signing in.');
      } else if (e?.name === 'NotAuthorizedException') {
        setMsg('Invalid email or password.');
      } else {
        setMsg(m || 'Sign-in failed');
      }
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // If user is already authenticated and lands on /login, send them back to lastPath or dashboard
  useEffect(() => {
    if (isAuthenticated) {
      try {
        const lastPath = localStorage.getItem('lastPath');
        navigate(lastPath && lastPath !== '/login' ? lastPath : '/dashboard-overview', { replace: true });
      } catch (e) {
        navigate('/dashboard-overview', { replace: true });
      }
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Login Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          {/* Card with Tabs */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <LoginHeader />

            {/* Tabs */}
            <div className="mt-4 flex items-center gap-2 bg-gray-50 rounded-md p-1">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium ${mode === 'login' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}
                onClick={() => setMode('login')}
                aria-pressed={mode === 'login'}
              >
                Sign in
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium ${mode === 'signup' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}
                onClick={() => setMode('signup')}
                aria-pressed={mode === 'signup'}
              >
                Sign up
              </button>
            </div>

            <div className="mt-4">
              {mode === 'login' ? (
                <>
                  <LoginForm onSubmit={handleLogin} isLoading={isLoading} serverMessage={msg} />
                  <div className="mt-4">
                    <SSOOptions isLoading={isLoading} />
                  </div>
                </>
              ) : (
                <div className="mt-2">
                  <SignupForm />
                </div>
              )}
            </div>
          </div>

          {/* Footer Links */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <button className="hover:text-gray-700 transition-colors">Privacy Policy</button>
              <span>•</span>
              <button className="hover:text-gray-700 transition-colors">Terms of Service</button>
              <span>•</span>
              <button className="hover:text-gray-700 transition-colors">Support</button>
            </div>
            <div className="text-xs text-gray-400 text-center mt-2">© {new Date()?.getFullYear()} C3Ops Technologies Private Limited. All rights reserved.</div>
          </div>
        </div>
      </div>

      {/* Right Panel - Blue Gradient with Cloud Analytics Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#4F8EF5] to-[#2563eb] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full opacity-20"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full opacity-15"></div>
          <div className="absolute bottom-32 left-16 w-20 h-20 bg-white rounded-full opacity-25"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 bg-white rounded-full opacity-20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-16 text-center">
          {/* Cloud Analytics Illustration */}
          <div className="mb-8 space-y-6">
            {/* Main Dashboard Mockup */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 w-80 border border-white/30">
              <div className="flex items-center justify-between mb-4">
                <div className="h-3 bg-white/40 rounded w-24"></div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                </div>
              </div>

              {/* Chart Bars */}
              <div className="flex items-end space-x-2 mb-4">
                <div className="w-6 bg-white/50 rounded-sm" style={{height: '32px'}}></div>
                <div className="w-6 bg-white/70 rounded-sm" style={{height: '48px'}}></div>
                <div className="w-6 bg-white/60 rounded-sm" style={{height: '40px'}}></div>
                <div className="w-6 bg-white/80 rounded-sm" style={{height: '56px'}}></div>
                <div className="w-6 bg-white/50 rounded-sm" style={{height: '36px'}}></div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded p-2">
                  <div className="h-2 bg-white/40 rounded w-12 mb-1"></div>
                  <div className="h-1.5 bg-white/30 rounded w-16"></div>
                </div>
                <div className="bg-white/10 rounded p-2">
                  <div className="h-2 bg-white/40 rounded w-10 mb-1"></div>
                  <div className="h-1.5 bg-white/30 rounded w-14"></div>
                </div>
              </div>
            </div>

            {/* Cloud Icons */}
            <div className="flex justify-center space-x-8 opacity-80">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white/30 rounded-lg flex items-center justify-center mb-2">
                  <div className="w-6 h-4 bg-white/70 rounded"></div>
                </div>
                <div className="h-1 bg-white/40 rounded w-8"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white/30 rounded-lg flex items-center justify-center mb-2">
                  <div className="w-6 h-4 bg-white/70 rounded"></div>
                </div>
                <div className="h-1 bg-white/40 rounded w-10"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white/30 rounded-lg flex items-center justify-center mb-2">
                  <div className="w-6 h-4 bg-white/70 rounded"></div>
                </div>
                <div className="h-1 bg-white/40 rounded w-6"></div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold leading-tight">Cloud Cost Console</h2>
            <h4 className="text-1xl font-bold leading-tight">FinOps Culture</h4>
            {/* <p className="text-blue-100 text-lg max-w-md">Optimize costs across your multi-cloud infrastructure with AI-powered insights and automated recommendations.</p> */}

            {/* Features */}
            <div className="space-y-3 text-left max-w-sm">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-white/30 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-blue-100">AWS - Azure - GCP - SaaS - Ai and Custom</span>
              </div>
                        <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-white/30 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-blue-100">Single Souce Of Truth</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-white/30 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-blue-100">DevOps - Infrastruture Automation</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-white/30 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-blue-100">DevSecOps - Think Left</span>
              </div>
                            <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-white/30 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-blue-100">AI-powered optimization</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-white/30 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-blue-100">Real-time cost monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}