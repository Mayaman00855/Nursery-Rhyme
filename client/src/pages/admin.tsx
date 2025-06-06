import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Settings } from "lucide-react";
import AdminPanel from "@/components/admin/admin-panel";
import { ADMIN_PASSWORD } from "@/lib/constants";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setShowError(false);
    } else {
      setShowError(true);
      setPassword("");
    }
  };

  if (isAuthenticated) {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-pink-50 to-mint-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white rounded-3xl shadow-2xl border-4 border-coral">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-coral to-pink rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="text-white text-2xl" />
            </div>
            <CardTitle className="text-3xl font-fredoka text-coral">
              Admin Access
            </CardTitle>
            <p className="text-gray-600">
              Enter the password to access the admin panel
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setShowError(false);
                  }}
                  className={`pl-10 h-12 rounded-xl border-2 transition-colors duration-200 ${
                    showError
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-coral"
                  }`}
                  required
                />
              </div>
              
              {showError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm text-center"
                >
                  Incorrect password. Please try again.
                </motion.p>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-coral to-pink text-white font-semibold rounded-xl hover:from-pink hover:to-coral transition-all duration-200"
              >
                Access Admin Panel
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 text-center">
                <strong>Demo Password:</strong> admin123
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
