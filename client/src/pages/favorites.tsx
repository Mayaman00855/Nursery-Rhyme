import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import RhymeCard from "@/components/rhymes/rhyme-card";
import { useFavorites } from "@/hooks/use-favorites";
import { type Rhyme } from "@/types/schema";

export default function Favorites() {
  const { favorites } = useFavorites();

  const { data: allRhymes = [], isLoading } = useQuery<Rhyme[]>({
    queryKey: ["/api/rhymes"],
  });

  const favoriteRhymes = allRhymes.filter(rhyme => favorites.includes(rhyme.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-coral-50 to-sunny-100 pb-20 md:pb-8">
      {/* Header */}
      <section className="py-8 px-4">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-fredoka text-coral mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heart className="inline-block mr-4 h-12 w-12 text-coral fill-current" />
            My Favorite Rhymes
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            All your favorite nursery rhymes in one special place!
          </motion.p>
        </div>
      </section>

      {/* Favorites Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded-full"></div>
                </div>
              ))}
            </div>
          ) : favoriteRhymes.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {favoriteRhymes.map((rhyme, index) => (
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
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8">
                <Heart className="mx-auto h-24 w-24 text-gray-300" />
              </div>
              <h3 className="text-3xl font-fredoka text-coral mb-4">
                No favorites yet!
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Start exploring our nursery rhymes and tap the heart icon to add your favorites here.
              </p>
              <motion.div
                className="bg-white rounded-3xl p-8 max-w-lg mx-auto shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="text-xl font-fredoka text-coral mb-4">
                  💡 How to add favorites:
                </h4>
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-coral rounded-full flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <p className="text-gray-700">Browse our rhyme collection</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-coral rounded-full flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <p className="text-gray-700">
                      Tap the <Heart className="inline w-4 h-4 mx-1" /> icon on any rhyme card
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-coral rounded-full flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <p className="text-gray-700">Find them here in your favorites!</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
