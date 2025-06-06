import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Heart } from "lucide-react";
import CategoryFilter from "@/components/rhymes/category-filter";
import RhymeCard from "@/components/rhymes/rhyme-card";
import VideoPlayer from "@/components/rhymes/video-player";
import { useFavorites } from "@/hooks/use-favorites";
import { useSwipe } from "@/hooks/use-swipe";
import { type Rhyme } from "@/types/schema";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFeaturedVideo, setShowFeaturedVideo] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const { data: rhymes = [], isLoading } = useQuery<Rhyme[]>({
    queryKey: ["/api/rhymes", selectedCategory],
  });

  const filteredRhymes = rhymes.filter(rhyme => 
    selectedCategory === "all" || rhyme.category === selectedCategory
  );

  const featuredRhyme = rhymes.find(rhyme => rhyme.title.includes("Twinkle")) || rhymes[0];

  // Swipe navigation for categories
  useSwipe({
    onSwipeLeft: () => {
      // Implement category navigation
    },
    onSwipeRight: () => {
      // Implement category navigation
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-pink-50 to-mint-100">
      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-5xl md:text-6xl font-fredoka text-coral mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            🎵 Welcome to Rhyme Time! 🎵
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover magical nursery rhymes, fun songs, and amazing toys for little ones!
          </motion.p>

          {/* Featured Video */}
          {featuredRhyme && (
            <motion.div
              className="max-w-4xl mx-auto mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-white rounded-3xl p-6 shadow-2xl border-4 border-sunny">
                <h3 className="text-2xl font-fredoka text-coral mb-4">
                  🌟 Featured Today
                </h3>
                <div className="relative w-full h-0 pb-[56.25%] mb-4">
                  <img
                    src={featuredRhyme.thumbnailUrl}
                    alt={featuredRhyme.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-2xl">
                    <Button
                      onClick={() => setShowFeaturedVideo(true)}
                      size="icon"
                      className="w-16 h-16 bg-white text-coral rounded-full hover:scale-110 transition-transform duration-200"
                    >
                      <Play className="h-6 w-6 ml-1" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-sky text-white px-4 py-2 rounded-full text-sm font-semibold">
                    ⭐ Classic Songs
                  </Badge>
                  <Badge className="bg-mint text-white px-4 py-2 rounded-full text-sm font-semibold">
                    👶 Ages {featuredRhyme.ageGroup}
                  </Badge>
                  <Button
                    onClick={() => toggleFavorite(featuredRhyme.id)}
                    className={`px-6 py-2 rounded-full transition-colors duration-200 ${
                      isFavorite(featuredRhyme.id)
                        ? "bg-coral text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-coral hover:text-white"
                    }`}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${isFavorite(featuredRhyme.id) ? "fill-current" : ""}`} />
                    {isFavorite(featuredRhyme.id) ? "Favorited" : "Add to Favorites"}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Rhyme Library */}
      <section className="py-12 px-4" id="rhyme-library">
        <div className="container mx-auto">
          <h3 className="text-3xl font-fredoka text-center text-coral mb-8">
            🎬 Nursery Rhyme Collection
          </h3>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No rhymes found for this category. Try selecting a different category!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Video Player */}
      {showFeaturedVideo && featuredRhyme && (
        <VideoPlayer
          videoId={featuredRhyme.youtubeId}
          title={featuredRhyme.title}
          onClose={() => setShowFeaturedVideo(false)}
        />
      )}
    </div>
  );
}
