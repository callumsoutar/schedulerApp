import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface VoucherInputProps {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
}

const VoucherInput: React.FC<VoucherInputProps> = ({ value, onChange }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);

  const checkVoucher = async (voucherNumber: string) => {
    if (!voucherNumber) {
      setIsValid(false);
      setShowCheckmark(false);
      onChange(voucherNumber, false);
      return;
    }

    setIsChecking(true);
    try {
      const { data, error } = await supabase
        .from('vouchers')
        .select('*')
        .eq('voucher_number', voucherNumber)
        .eq('status', 'active')
        .maybeSingle();

      if (error) throw error;

      const valid = !!data;
      setIsValid(valid);
      setShowCheckmark(valid);
      onChange(voucherNumber, valid);

    } catch (error) {
      console.error('Error checking voucher:', error);
      setIsValid(false);
      setShowCheckmark(false);
      onChange(voucherNumber, false);
    } finally {
      setIsChecking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      checkVoucher(value);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        className={`w-full rounded-lg border-gray-300 pr-10 shadow-sm 
          focus:border-blue-500 focus:ring-blue-500
          ${isValid ? 'border-green-500' : ''}`}
        value={value}
        onChange={(e) => {
          onChange(e.target.value, false);
          setShowCheckmark(false);
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => checkVoucher(value)}
        placeholder="Enter voucher number"
      />
      
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        {isChecking ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
        ) : showCheckmark ? (
          <div className={`transform transition-all duration-300 ${showCheckmark ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
            <Check className="h-5 w-5 text-green-500" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default VoucherInput;