import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToyCard from "@/components/toys/toy-card";
import { TOY_CATEGORIES } from "@/lib/constants";
import { type Toy } from "@/types/schema";

export default function Toys() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: toys = [], isLoading } = useQuery<Toy[]>({
    queryKey: ["/api/toys", selectedCategory],
  });

  const filteredToys = toys.filter(toy => 
    selectedCategory === "all" || toy.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-mint-100 to-turquoise-100 pb-20 md:pb-8">
      {/* Header */}
      <section className="py-8 px-4">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-fredoka text-coral mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            🧸 Amazing Toys for Little Learners!
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover educational toys that bring nursery rhymes to life and help children learn while they play!
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 px-4 bg-white border-t-4 border-b-4 border-turquoise">
        <div className="container mx-auto">
          <h3 className="text-2xl font-fredoka text-center text-coral mb-6">
            Shop by Category!
          </h3>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-4 pb-4">
              {TOY_CATEGORIES.map((category) => (
                <motion.div
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => setSelectedCategory(category.id)}
                    className={`whitespace-nowrap min-w-max px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                      selectedCategory === category.id
                        ? "bg-turquoise text-white ring-4 ring-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-turquoise hover:text-white"
                    }`}
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

      {/* Toy Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl p-6 animate-pulse">
                  <div className="h-56 bg-gray-200 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredToys.map((toy, index) => (
                <motion.div
                  key={toy.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ToyCard toy={toy} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {filteredToys.length === 0 && !isLoading && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-fredoka text-coral mb-2">
                No toys found
              </h3>
              <p className="text-lg text-gray-600">
                No toys found for the "{selectedCategory}" category. Try selecting a different category!
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
