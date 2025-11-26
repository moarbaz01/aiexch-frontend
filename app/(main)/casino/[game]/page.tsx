"use client";

import { useInit } from "@/hooks/useCasino";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const CasinoGame = () => {
  const { game } = useParams();
  const router = useRouter();
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
              window.location.href = response.data.url;
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

  return (
    <div className="h-screen w-full relative pb-12">
      <div className="absolute inset-0 flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    </div>
  );
};

export default CasinoGame;
