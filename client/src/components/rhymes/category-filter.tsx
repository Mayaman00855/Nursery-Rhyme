import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CATEGORIES } from "@/lib/constants";
import { motion } from "framer-motion";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <section className="py-6 px-4 bg-white border-t-4 border-b-4 border-turquoise">
      <div className="container mx-auto">
        <h3 className="text-2xl font-fredoka text-center text-coral mb-6">
          Choose Your Adventure!
        </h3>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4 pb-4">
            {CATEGORIES.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => onCategoryChange(category.id)}
                  className={`whitespace-nowrap min-w-max px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-coral text-white ring-4 ring-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-coral hover:text-white"
                  }`}
                  style={{
                    backgroundColor:
                      selectedCategory === category.id
                        ? category.id === "animals"
                          ? "hsl(var(--sky))"
                          : category.id === "numbers"
                          ? "hsl(var(--sunny))"
                          : category.id === "abc"
                          ? "hsl(var(--sunny))"
                          : category.id === "lullabies"
                          ? "hsl(var(--pink))"
                          : category.id === "action"
                          ? "hsl(var(--turquoise))"
                          : "hsl(var(--coral))"
                        : undefined,
                  }}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </Button>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </section>
  );
}
