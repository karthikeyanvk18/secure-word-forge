
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";
import { generatePassword } from "@/lib/password-utils";

const PasswordGenerator = () => {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  // Generate initial password
  useEffect(() => {
    generateNewPassword();
  }, []);

  const handleLengthChange = (value: number[]) => {
    setPasswordLength(value[0]);
  };

  const generateNewPassword = () => {
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      toast({
        title: "Warning",
        description: "Please select at least one character type",
        variant: "destructive",
      });
      return;
    }

    try {
      const newPassword = generatePassword(
        passwordLength,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols
      );
      setPassword(newPassword);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate password",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      toast({
        title: "Success",
        description: "Password copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy password",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    generateNewPassword();
  }, [passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  return (
    <Card className="w-full p-6 shadow-lg">
      <div className="space-y-6">
        {/* Password Display */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-base font-medium">
              Your Generated Password
            </Label>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={generateNewPassword}
                title="Generate new password"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={copyToClipboard}
                title="Copy to clipboard"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex">
            <Input
              id="password"
              value={password}
              readOnly
              className="font-mono text-base h-12"
            />
          </div>
        </div>

        {/* Password Strength */}
        <div className="space-y-2">
          <Label className="text-base">Password Strength</Label>
          <PasswordStrengthMeter password={password} />
        </div>

        {/* Password Length */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="passwordLength" className="text-base">
              Password Length
            </Label>
            <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">
              {passwordLength}
            </span>
          </div>
          <Slider
            id="passwordLength"
            defaultValue={[passwordLength]}
            max={64}
            min={8}
            step={1}
            onValueChange={handleLengthChange}
            className="py-4"
          />
        </div>

        {/* Character Types */}
        <div className="space-y-4">
          <Label className="text-base">Character Types</Label>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="uppercase" className="cursor-pointer">
                Uppercase Letters (A-Z)
              </Label>
              <Switch
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={setIncludeUppercase}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="lowercase" className="cursor-pointer">
                Lowercase Letters (a-z)
              </Label>
              <Switch
                id="lowercase"
                checked={includeLowercase}
                onCheckedChange={setIncludeLowercase}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="numbers" className="cursor-pointer">
                Numbers (0-9)
              </Label>
              <Switch
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={setIncludeNumbers}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="symbols" className="cursor-pointer">
                Special Characters (!@#$%^&*)
              </Label>
              <Switch
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={setIncludeSymbols}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PasswordGenerator;
