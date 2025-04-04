
import { ShieldCheck } from "lucide-react";

const PasswordHeader = () => {
  return (
    <header className="text-center mb-8 pt-6">
      <div className="flex items-center justify-center mb-4">
        <ShieldCheck size={40} className="text-emerald-500 mr-3" />
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
          Secure Password Generator
        </h1>
      </div>
      <p className="text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
        Generate strong, random passwords with customizable options to enhance your online security.
      </p>
    </header>
  );
};

export default PasswordHeader;
