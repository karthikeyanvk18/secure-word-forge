
import { useMemo } from "react";
import { Progress } from "@/components/ui/progress";

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps) => {
  const { strength, label, color } = useMemo(() => {
    if (!password) return { strength: 0, label: "No Password", color: "bg-slate-300" };
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    
    // Character variety checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Normalize score to a 0-100 scale
    const normalizedScore = Math.min(Math.floor((score / 7) * 100), 100);
    
    // Determine label and color based on score
    if (normalizedScore < 25) {
      return { 
        strength: normalizedScore, 
        label: "Very Weak", 
        color: "bg-red-500" 
      };
    } else if (normalizedScore < 50) {
      return { 
        strength: normalizedScore, 
        label: "Weak", 
        color: "bg-orange-500" 
      };
    } else if (normalizedScore < 75) {
      return { 
        strength: normalizedScore, 
        label: "Moderate", 
        color: "bg-yellow-500" 
      };
    } else if (normalizedScore < 90) {
      return { 
        strength: normalizedScore, 
        label: "Strong", 
        color: "bg-emerald-500" 
      };
    } else {
      return { 
        strength: normalizedScore, 
        label: "Very Strong", 
        color: "bg-green-500" 
      };
    }
  }, [password]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Progress value={strength} className={`h-2 ${color}`} />
        <span className="text-sm font-medium ml-4 min-w-[100px] text-right">
          {label}
        </span>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
