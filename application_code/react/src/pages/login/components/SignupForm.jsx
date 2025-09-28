import React, { useState } from 'react';
import { useCognitoAuth } from '../../../contexts/CognitoAuthContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

export default function SignupForm() {
  const [fname, setF] = useState('');
  const [lname, setL] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPwd] = useState('');
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const { signUp: contextSignUp, confirmRegistration, resendConfirmationCode } = useCognitoAuth();

  async function doSignup() {
    setMsg('');
    if (!email || !password) return setMsg('Enter email & password.');
    try {
  await contextSignUp(email.toLowerCase(), password, email.toLowerCase(), { given_name: fname, family_name: lname });
  setMsg('Signup submitted. Check your email for the confirmation code.');
  setShowConfirm(true);
    } catch (e) {
      setMsg(e?.message || 'Signup failed');
      console.error(e);
    }
  }

  async function doConfirm() {
    setMsg('');
    if (!email || !code) return setMsg('Enter email & code.');
    try {
      await confirmRegistration(email.toLowerCase(), code.trim());
  setMsg('Email confirmed ✅. Your account is now pending admin approval.');
  setShowConfirm(false);
    } catch (e) {
      setMsg(e?.message || 'Confirmation failed');
      console.error(e);
    }
  }

  async function doResend() {
    setMsg('');
    if (!email) return setMsg('Enter your email first.');
    try {
      await resendConfirmationCode(email.toLowerCase());
      setMsg('A new confirmation code was sent to your email.');
    } catch (e) {
      setMsg(e?.message || 'Could not resend code');
      console.error(e);
    }
  }

  return (
    <form className="space-y-6" onSubmit={e => { e.preventDefault(); doSignup(); }}>
      {msg && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Check" size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-green-700">{msg}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
          <Input value={fname} onChange={e => setF(e.target.value)} placeholder="First name" className="w-full px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
          <Input value={lname} onChange={e => setL(e.target.value)} placeholder="Last name" className="w-full px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <Input type="password" value={password} onChange={e => setPwd(e.target.value)} placeholder="Choose a strong password" className="w-full px-3 py-2" />
        </div>
      </div>

      <div>
        <Button type="submit" fullWidth className="w-full bg-[#4F8EF5] hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md" disabled={!email || !password}>
          Sign up
        </Button>
      </div>

      {showConfirm && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirmation code</label>
          <Input value={code} onChange={e => setCode(e.target.value)} placeholder="Enter code from email" inputMode="numeric" autoComplete="one-time-code" className="w-full px-3 py-2 mb-2" />
          <div className="flex gap-2">
            <Button className="bg-green-600 text-white" onClick={doConfirm} disabled={!email || !code}>Confirm</Button>
            <Button className="bg-gray-200 text-gray-700" onClick={doResend} disabled={!email}>Resend</Button>
          </div>
        </div>
      )}
    </form>
  );
}
