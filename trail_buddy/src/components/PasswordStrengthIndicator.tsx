import React from 'react';
import { validatePassword, getPasswordStrengthColor, getPasswordStrengthBg } from '../utils/passwordValidation';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
  showRequirements?: boolean;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ 
  password, 
  showRequirements = true 
}) => {
  const validation = validatePassword(password);
  
  const requirements = [
    { text: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
    { text: 'One uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { text: 'One lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
    { text: 'One number', test: (pwd: string) => /\d/.test(pwd) },
    { text: 'One special character', test: (pwd: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd) }
  ];

  if (!password) return null;

  return (
    <div className="mt-3">
      {/* Strength Indicator */}
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-sm font-medium text-gray-700">Password strength:</span>
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthBg(validation.strength)}`}
            style={{ 
              width: validation.strength === 'weak' ? '33%' : 
                     validation.strength === 'medium' ? '66%' : '100%' 
            }}
          ></div>
        </div>
        <span className={`text-sm font-medium capitalize ${getPasswordStrengthColor(validation.strength)}`}>
          {validation.strength}
        </span>
      </div>

      {/* Requirements List */}
      {showRequirements && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Password requirements:</p>
          <div className="grid grid-cols-1 gap-1">
            {requirements.map((req, index) => {
              const isValid = req.test(password);
              return (
                <div key={index} className="flex items-center space-x-2">
                  {isValid ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400" />
                  )}
                  <span className={`text-sm ${isValid ? 'text-green-700' : 'text-gray-600'}`}>
                    {req.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Error Messages */}
      {validation.errors.length > 0 && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              {validation.errors.map((error, index) => (
                <p key={index} className="text-sm text-red-700">{error}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;