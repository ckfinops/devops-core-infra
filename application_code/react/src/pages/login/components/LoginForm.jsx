import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, isLoading, serverMessage }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [step, setStep] = useState(1); // 1 = email, 2 = password
  const [errors, setErrors] = useState({});

  const mockCredentials = {
    admin: { email: 'admin@finops.com', password: 'admin123' },
    manager: { email: 'manager@finops.com', password: 'manager123' },
    analyst: { email: 'analyst@finops.com', password: 'analyst123' }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (step === 1) {
      // validate email only
      if (!formData?.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData?.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    } else {
      // step 2: validate password
      if (!formData?.password) {
        newErrors.password = 'Password is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
  // Debug: log submit invocation (avoid logging event directly to prevent circular JSON errors)
  // eslint-disable-next-line no-console
  console.log('LoginForm: handleSubmit called', { step, email: formData?.email });
  e?.preventDefault();
    
    if (!validateForm()) return;
    
    // Two-step flow: if on step 1, advance to password step; if on step 2, submit
    if (step === 1) {
      // advance to password step
      setStep(2);
      return;
    }

    // step 2: submit credentials
    if (formData?.email && formData?.password) {
      // Provide safe-check and debug log
      // eslint-disable-next-line no-console
      console.log('LoginForm: submitting', formData);
      if (typeof onSubmit === 'function') onSubmit(formData);
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e?.target?.value
    }));
    
    // Clear errors when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: e?.target?.checked
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
  {(errors?.general || serverMessage) && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
    <p className="text-sm text-red-600">{errors?.general || serverMessage}</p>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {step === 1 && (
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData?.email}
              onChange={handleInputChange('email')}
              error={errors?.email}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4F8EF5] focus:border-[#4F8EF5]"
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData?.password}
              onChange={handleInputChange('password')}
              error={errors?.password}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4F8EF5] focus:border-[#4F8EF5]"
            />
          </div>
        )}
      </div>
      
      {step === 2 && (
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            checked={formData?.rememberMe}
            onChange={handleCheckboxChange}
            disabled={isLoading}
          />
          
          <button
            type="button"
            className="text-sm text-[#4F8EF5] hover:text-blue-700 font-medium transition-colors"
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </div>
      )}
      
      <div className="flex items-center space-x-2">
        {step === 2 && (
          <button
            type="button"
            className="text-sm text-gray-600 hover:text-gray-800"
            onClick={() => setStep(1)}
            disabled={isLoading}
          >
            Back
          </button>
        )}

        <Button
          type="button"
          fullWidth
          loading={isLoading}
          disabled={isLoading || (step === 1 ? !formData?.email : !formData?.password)}
          className="w-full bg-[#4F8EF5] hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4F8EF5]"
          onClick={handleSubmit}
        >
          {isLoading ? 'Signing in...' : step === 1 ? 'NEXT' : 'SIGN IN'}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;