import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { type Toy } from "@/types/schema";

interface ToyCardProps {
  toy: Toy;
}

export default function ToyCard({ toy }: ToyCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "musical":
        return "bg-coral text-white";
      case "animals":
        return "bg-sky text-white";
      case "numbers":
        return "bg-sunny text-white";
      case "abc":
        return "bg-sunny text-white";
      case "reading":
        return "bg-pink text-white";
      default:
        return "bg-turquoise text-white";
    }
  };

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= numRating ? "text-sunny fill-current" : "text-gray-300"
          }`}
        />
      );
    }
    
    return stars;
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="relative">
          <img
            src={toy.imageUrl}
            alt={toy.name}
            className="w-full h-56 object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(toy.category)}`}>
              {toy.category}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge className="bg-mint text-white px-3 py-1 rounded-full text-sm font-semibold">
              Ages {toy.ageGroup}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <h4 className="text-xl font-fredoka text-gray-800 mb-2">
            {toy.name}
          </h4>
          <p className="text-gray-600 mb-4">{toy.description}</p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-fredoka text-coral">
              ${toy.price}
            </span>
            <div className="flex items-center space-x-1">
              {renderStars(toy.rating || "0")}
              <span className="ml-2 text-gray-600 text-sm">
                ({toy.rating})
              </span>
            </div>
          </div>
          {toy.relatedRhymes && toy.relatedRhymes.length > 0 && (
            <div className="mb-4">
              <span className="text-sm text-gray-500">Related Rhymes:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {toy.relatedRhymes.slice(0, 2).map((rhyme, index) => (
                  <Badge
                    key={index}
                    className="bg-sky text-white px-2 py-1 rounded-full text-xs"
                  >
                    {rhyme}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          <Button className="w-full bg-gradient-to-r from-turquoise to-sky text-white py-3 rounded-full font-semibold hover:from-sky hover:to-turquoise transition-all duration-200">
            <ShoppingCart className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
