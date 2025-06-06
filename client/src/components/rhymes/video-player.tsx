import { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface VideoPlayerProps {
  videoId: string;
  title: string;
  onClose: () => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function VideoPlayer({ videoId, title, onClose }: VideoPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<any>(null);

  useEffect(() => {
    // Load YouTube IFrame API if not already loaded
    if (!window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      initializePlayer();
    }

    function initializePlayer() {
      if (playerRef.current && window.YT?.Player) {
        ytPlayerRef.current = new window.YT.Player(playerRef.current, {
          height: "315",
          width: "560",
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            controls: 1,
            rel: 0,
            modestbranding: 1,
            fs: 1,
            origin: window.location.origin,
            enablejsapi: 1,
          },
          events: {
            onReady: (event: any) => {
              event.target.playVideo();
            },
            onError: (event: any) => {
              console.error('YouTube Player Error:', event.data);
            },
          },
        });
      }
    }

    return () => {
      if (ytPlayerRef.current) {
        ytPlayerRef.current.destroy();
      }
    };
  }, [videoId]);

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl w-full bg-white rounded-3xl">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl font-fredoka text-coral text-center pr-12">
            {title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Watch and enjoy this nursery rhyme video with your child
          </DialogDescription>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-0 right-0 w-10 h-10 bg-gray-300 hover:bg-gray-400 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader>
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <div
            ref={playerRef}
            className="absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
