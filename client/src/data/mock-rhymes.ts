import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

// Define the Rhyme type
interface Rhyme {
  id: string;
  title: string;
  description: string;
  category: string;
  videoUrl?: string;
}

// CategoryFilter component with proper TypeScript props
const CategoryFilter = ({
  selectedCategory,
  onCategoryChange,
}: {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}) => {
  const categories = [
    { value: "all", label: "All" },
    { value: "animals", label: "Animals" },
    { value: "numbers", label: "Numbers" },
    { value: "alphabet", label: "Alphabet" },
  ];

  return (
    <div className="container mx-auto px-4 mb-8">
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === category.value
                ? "bg-coral text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// RhymeCard component with proper TypeScript props
const RhymeCard = ({ rhyme }: { rhyme: Rhyme }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="aspect-video bg-gray-100 rounded-2xl mb-4 overflow-hidden">
        {rhyme.videoUrl && (
          <iframe
            src={rhyme.videoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={rhyme.title}
          />
        )}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-1">{rhyme.title}</h3>
      <p className="text-gray-600 mb-4">{rhyme.description}</p>
      <div className="mt-auto">
        <button className="w-full bg-mint text-white py-2 px-4 rounded-full font-medium hover:bg-mint-dark transition-colors">
          Watch Now
        </button>
      </div>
    </div>
  );
};

// Main Rhymes component
const Rhymes = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const {
    data: rhymes = [],
    isLoading,
    isError,
    error,
  } = useQuery<Rhyme[], Error>({
    queryKey: ["rhymes", selectedCategory],
    queryFn: async () => {
      const url =
        selectedCategory === "all"
          ? "/api/rhymes"
          : `/api/rhymes?category=${encodeURIComponent(selectedCategory)}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

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
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="bg-white rounded-3xl p-6 animate-pulse"
                >
                  <div className="h-48 bg-gray-200 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded-full"></div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-12 text-red-600">
              Failed to load rhymes: {error?.message || "Unknown error"}
            </div>
          ) : rhymes.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {rhymes.map((rhyme, index) => (
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
          ) : (
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
                No rhymes found for the "{selectedCategory}" category. Try
                selecting a different category!
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Rhymes;