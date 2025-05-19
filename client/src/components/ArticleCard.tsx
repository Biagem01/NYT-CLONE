import { Article } from "@/lib/types";
import { formatTimeAgo } from "@/lib/api";
import { Link } from "wouter";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { addFavorite, removeFavorite } from "@/redux/favorites.slice";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase"; // Assicurati che questo punti al tuo file firebase.ts
import {
  saveFavoriteToFirestore,
  removeFavoriteFromFirestore,
} from "@/lib/firebaseFavorites"; // Funzioni che interagiscono con Firestore

interface ArticleCardProps {
  article: Article;
  variant?: "main" | "secondary" | "topStory";
}

export default function ArticleCard({ article, variant = "topStory" }: ArticleCardProps) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.articles);
  const isFavorite = favorites.some((fav) => fav.uri === article.uri);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserId(user?.uid || null);
    });
    return () => unsubscribe();
  }, []);

  const toggleFavorite = async () => {
    if (!userId) return;

    if (isFavorite) {
      dispatch(removeFavorite(article.uri));
      await removeFavoriteFromFirestore(userId, article.uri);
    } else {
      dispatch(addFavorite(article));
      await saveFavoriteToFirestore(userId, article);
    }
  };

  const getImage = () => {
    if (!article.multimedia || article.multimedia.length === 0) return null;
    if (variant === "main") {
      const jumbo = article.multimedia.find((m) => m.format === "superJumbo");
      if (jumbo) return jumbo.url;
    }
    const medium = article.multimedia.find((m) => m.format === "mediumThreeByTwo210");
    return medium ? medium.url : article.multimedia[0].url;
  };

  const imageUrl = getImage();
  const timeAgo = formatTimeAgo(article.published_date);
  const byline = article.byline.replace(/^By\s+/i, '');
  const getArticleUrl = () => {
    const id = article.uri.split("/").pop();
    return `/article/${article.section}/${id}`;
  };

  const FavoriteButton = () => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleFavorite();
      }}
      className={`text-sm ${isFavorite ? "text-red-600" : "text-gray-500"} hover:text-red-700`}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <i className={`fas ${isFavorite ? "fa-heart" : "fa-heart-circle-plus"}`}></i>
    </button>
  );

  const renderContent = () => (
    <div>
      {imageUrl && variant !== "secondary" && (
        <img
          src={imageUrl}
          alt={article.title}
          className={`w-full ${variant === "topStory" ? "h-48 object-cover" : "h-auto"} mb-3`}
        />
      )}
      <h3 className={`font-nyt font-bold ${variant === "main" ? "text-2xl md:text-3xl" : "text-lg"} mb-1 hover:text-nyt-blue`}>
        {article.title}
      </h3>
      <p className="text-sm text-nyt-gray mb-2">{article.abstract}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-nyt-gray">{byline}</span>
        <span className="text-xs text-nyt-gray">{timeAgo}</span>
      </div>
    </div>
  );

  const wrapperClass = `article-card p-2 ${
    variant === "secondary" ? "border-b pb-4 last:border-0" : "pb-6 md:pb-4"
  } cursor-pointer`;

  return (
    <article className={wrapperClass}>
      <div className="relative">
        <Link href={getArticleUrl()}>
          {renderContent()}
        </Link>
        <div className="absolute top-2 right-2 z-10 bg-white/80 rounded-full p-1 shadow">
          <FavoriteButton />
        </div>
      </div>
    </article>
  );
}
