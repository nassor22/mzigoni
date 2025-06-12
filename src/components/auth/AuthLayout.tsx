import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Package, Truck, Globe } from 'lucide-react';

const AuthLayout = () => {
  const navigate = useNavigate();
  const { role } = useParams<{ role: 'client' | 'driver' }>();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState('en');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const translations = {
    en: {
      client: 'Client',
      driver: 'Driver',
      login: 'Login',
      signup: 'Sign Up',
      welcome: 'Welcome Back',
      createAccount: 'Create Account',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      loginButton: 'Login',
      signupButton: 'Create Account',
      noAccount: "Don't have an account?",
      haveAccount: 'Already have an account?',
      signupLink: 'Sign up here',
      loginLink: 'Login here',
      forgotPassword: 'Forgot Password?'
    },
    sw: {
      client: 'Mteja',
      driver: 'Dereva',
      login: 'Ingia',
      signup: 'Jisajili',
      welcome: 'Karibu Tena',
      createAccount: 'Tengeneza Akaunti',
      fullName: 'Jina Kamili',
      email: 'Barua Pepe',
      phone: 'Nambari ya Simu',
      password: 'Nenosiri',
      confirmPassword: 'Thibitisha Nenosiri',
      loginButton: 'Ingia',
      signupButton: 'Tengeneza Akaunti',
      noAccount: 'Huna akaunti?',
      haveAccount: 'Una akaunti tayari?',
      signupLink: 'Jisajili hapa',
      loginLink: 'Ingia hapa',
      forgotPassword: 'Umesahau Nenosiri?'
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    if (role === 'client') {
      navigate('/client');
    } else {
      navigate('/driver');
    }
  };

  const roleIcon = role === 'client' ? Package : Truck;
  const roleColor = role === 'client' ? 'blue' : 'green';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Language Selector */}
      <div className="absolute top-6 right-6">
        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="sw">Kiswahili</option>
          </select>
          <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </button>
          
          <div className={`bg-${roleColor}-100 p-4 rounded-2xl mb-4 mx-auto w-fit`}>
            {React.createElement(roleIcon, { 
              className: `h-8 w-8 text-${roleColor}-600` 
            })}
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {isLogin ? t.welcome : t.createAccount}
          </h1>
          <p className="text-gray-600">
            {role === 'client' ? t.client : t.driver} {isLogin ? t.login : t.signup}
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.fullName}
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t.fullName}
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.email}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t.email}
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.phone}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+255 123 456 789"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.password}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t.password}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.confirmPassword}
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t.confirmPassword}
                  required={!isLogin}
                />
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-3 bg-${roleColor}-600 text-white rounded-lg hover:bg-${roleColor}-700 transition-colors font-semibold`}
            >
              {isLogin ? t.loginButton : t.signupButton}
            </button>
          </form>

          {isLogin && (
            <div className="text-center mt-4">
              <button className="text-blue-600 hover:text-blue-700 text-sm">
                {t.forgotPassword}
              </button>
            </div>
          )}

          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              {isLogin ? t.noAccount : t.haveAccount}
            </p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {isLogin ? t.signupLink : t.loginLink}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;