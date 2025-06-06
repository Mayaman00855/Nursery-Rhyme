import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Play, ShoppingCart, Heart, Settings } from "lucide-react";

export default function MobileNav() {
  const [location] = useLocation();

  const navigation = [
    { href: "/", label: "Rhymes", icon: Play, active: location === "/" },
    { href: "/toys", label: "Toys", icon: ShoppingCart, active: location === "/toys" },
    { href: "/favorites", label: "Favorites", icon: Heart, active: location === "/favorites" },
    { href: "/admin", label: "Settings", icon: Settings, active: location === "/admin" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-4 border-coral z-40">
      <div className="flex justify-around py-3">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className="flex flex-col items-center space-y-1 px-4 py-2 h-auto"
              >
                <Icon
                  className={`h-6 w-6 ${
                    item.active ? "text-coral" : "text-gray-400"
                  }`}
                />
                <span className="text-xs font-semibold text-gray-700">
                  {item.label}
                </span>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
