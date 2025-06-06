import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import CategoryFilter from "@/components/rhymes/category-filter";
import RhymeCard from "@/components/rhymes/rhyme-card";
import { type Rhyme } from "@/types/schema";

export default function Rhymes() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: rhymes = [], isLoading } = useQuery<Rhyme[]>({
    queryKey: ["/api/rhymes", selectedCategory],
  });

  const filteredRhymes = rhymes.filter(rhyme => 
    selectedCategory === "all" || rhyme.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-pink-50 to-mint-100 pb-20 md:pb-8">
      {/* Header */}
      <section className="py-8 px-4">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-fredoka text-coral mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            🎬 All Nursery Rhymes
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Browse our complete collection of fun and educational nursery rhymes!
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Rhyme Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredRhymes.map((rhyme, index) => (
                <motion.div
                  key={rhyme.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <RhymeCard rhyme={rhyme} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {filteredRhymes.length === 0 && !isLoading && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-fredoka text-coral mb-2">
                No rhymes found
              </h3>
              <p className="text-lg text-gray-600">
                No rhymes found for the "{selectedCategory}" category. Try selecting a different category!
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
