
import { useState } from "react";
import PasswordGenerator from "@/components/PasswordGenerator";
import PasswordHeader from "@/components/PasswordHeader";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <div className="container max-w-2xl mx-auto px-4 py-8 flex-grow flex flex-col">
        <PasswordHeader />
        <main className="flex-grow flex items-center justify-center">
          <PasswordGenerator />
        </main>
        <footer className="text-center text-sm text-slate-500 dark:text-slate-400 py-6">
          <p>Secure Password Generator © {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
