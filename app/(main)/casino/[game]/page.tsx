"use client";

import { useInit } from "@/hooks/useCasino";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const CasinoGame = () => {
  const { game } = useParams();
  const router = useRouter();
  const [gameUrl, setGameUrl] = useState<string | null>(null);
  const { mutate: init, isPending } = useInit();
  const { isLoggedIn, user } = useAuth();

  console.log(isLoggedIn, user);
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please login to play casino games");
      router.push("/casino");
      return;
    }

    if (game) {
      init(
        {
          game_uuid: game as string,
        },
        {
          onSuccess: (response) => {
            if (response.data?.url) {
              setGameUrl(response.data.url);
            }
          },
          onError: (error) => {
            console.error(error);
          },
        }
      );
    }
  }, [game, init, isLoggedIn, router]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!gameUrl) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Failed to load game</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full relative pb-12">
      <div className="absolute inset-0 flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
      <iframe
        src={gameUrl}
        className="w-full h-full border-0 relative z-10"
        allow="autoplay; fullscreen"
        title="Casino Game"
        onLoad={(e) => {
          const loader = e.currentTarget.previousElementSibling;
          if (loader) loader.remove();
        }}
      />
    </div>
  );
};

export default CasinoGame;
