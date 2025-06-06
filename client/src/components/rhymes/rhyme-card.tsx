import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useFavorites } from "@/hooks/use-favorites";
import { type Rhyme } from "@/types/schema";
import VideoPlayer from "./video-player";

interface RhymeCardProps {
  rhyme: Rhyme;
}

export default function RhymeCard({ rhyme }: RhymeCardProps) {
  const [showPlayer, setShowPlayer] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "animals":
        return "bg-sky text-white";
      case "numbers":
        return "bg-sunny text-white";
      case "abc":
        return "bg-sunny text-white";
      case "lullabies":
        return "bg-pink text-white";
      case "action":
        return "bg-turquoise text-white";
      default:
        return "bg-coral text-white";
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      >
        <Card className="bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-transparent hover:border-coral group">
          <div className="relative">
            <img
              src={rhyme.thumbnailUrl}
              alt={rhyme.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 right-4">
              <Button
                onClick={() => toggleFavorite(rhyme.id)}
                size="icon"
                className={`w-12 h-12 rounded-full transition-all duration-200 hover:scale-110 ${
                  isFavorite(rhyme.id)
                    ? "bg-coral text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isFavorite(rhyme.id) ? "fill-current" : ""
                  }`}
                />
              </Button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  onClick={() => setShowPlayer(true)}
                  size="icon"
                  className="w-16 h-16 bg-gradient-to-r from-coral to-pink text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Play className="h-6 w-6 ml-1 drop-shadow-sm" />
                </Button>
              </motion.div>
            </div>
          </div>
          <CardContent className="p-6">
            <h4 className="text-xl font-fredoka text-gray-800 mb-2">
              {rhyme.title}
            </h4>
            <p className="text-gray-600 mb-4">{rhyme.description}</p>
            <div className="flex items-center justify-between mb-4">
              <Badge className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(rhyme.category)}`}>
                {rhyme.category}
              </Badge>
              <Badge className="bg-mint text-white px-3 py-1 rounded-full text-sm font-semibold">
                Ages {rhyme.ageGroup}
              </Badge>
            </div>
            <Button
              onClick={() => setShowPlayer(true)}
              className="w-full bg-gradient-to-r from-coral to-pink text-white py-3 rounded-full font-semibold hover:from-pink hover:to-coral transition-all duration-200"
            >
              <Play className="mr-2 h-4 w-4" />
              Play Now
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {showPlayer && (
        <VideoPlayer
          videoId={rhyme.youtubeId}
          title={rhyme.title}
          onClose={() => setShowPlayer(false)}
        />
      )}
    </>
  );
}
