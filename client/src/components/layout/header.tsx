import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Music, Play, ShoppingCart, Heart, Settings, Menu } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { href: "/", label: "Rhymes", icon: Play, active: location === "/" },
    { href: "/toys", label: "Toys", icon: ShoppingCart, active: location === "/toys" },
    { href: "/favorites", label: "Favorites", icon: Heart, active: location === "/favorites" },
  ];

  return (
    <header className="bg-white shadow-lg border-b-4 border-coral sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <motion.div
              className="w-14 h-14 bg-gradient-to-br from-coral via-pink to-sunny rounded-full flex items-center justify-center shadow-lg"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Music className="text-white text-xl drop-shadow-sm" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl font-fredoka bg-gradient-to-r from-coral to-pink bg-clip-text text-transparent">
                🎵 Rhyme Time
              </h1>
              <p className="text-xs text-gray-500 font-comic hidden md:block">
                Where learning meets fun!
              </p>
            </motion.div>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`text-lg font-semibold transition-colors duration-200 ${
                      item.active ? "text-coral bg-coral/10" : "text-gray-700 hover:text-coral"
                    }`}
                  >
                    <Icon className="mr-2 h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-3">
            <Link href="/admin">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 bg-sunny hover:bg-sunny/80 rounded-full text-white hover:scale-105 transition-transform duration-200"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden w-12 h-12 bg-turquoise hover:bg-turquoise/80 rounded-full text-white"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.href} href={item.href}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-lg font-semibold ${
                            item.active ? "text-coral bg-coral/10" : "text-gray-700"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <Icon className="mr-3 h-6 w-6" />
                          {item.label}
                        </Button>
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
