import { Article } from "@/lib/types";
import { formatTimeAgo } from "@/lib/api";
import { Link } from "wouter";

interface ArticleCardProps {
  article: Article;
  variant?: "main" | "secondary" | "topStory";
}

export default function ArticleCard({ article, variant = "topStory" }: ArticleCardProps) {
  // Find the appropriate image
  const getImage = () => {
    if (!article.multimedia || article.multimedia.length === 0) {
      return null;
    }

    // For main article, prefer larger image
    if (variant === "main") {
      const superJumbo = article.multimedia.find(m => m.format === "superJumbo");
      if (superJumbo) return superJumbo.url;
    }

    // For top stories, prefer medium images
    const mediumImage = article.multimedia.find(m => m.format === "mediumThreeByTwo210");
    if (mediumImage) return mediumImage.url;
    
    // Fallback to first image
    return article.multimedia[0].url;
  };
  
  const imageUrl = getImage();
  const timeAgo = formatTimeAgo(article.published_date);
  
  // Extract byline without "By " prefix
  const byline = article.byline.replace(/^By\s+/i, '');
  
  // Create URL for article detail page
  const getArticleUrl = () => {
    // Extract the last part of the URI as the ID
    const uriParts = article.uri.split('/');
    const id = uriParts[uriParts.length - 1];
    return `/article/${article.section}/${id}`;
  };

  // Main article (large)
  if (variant === "main") {
    return (
      <article className="article-card p-2 cursor-pointer">
        <Link href={getArticleUrl()}>
          <div>
            <h2 className="font-nyt font-bold text-2xl md:text-3xl mb-2 hover:text-nyt-blue">{article.title}</h2>
            <p className="text-sm text-nyt-gray mb-2">{article.abstract}</p>
            
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt={article.title} 
                className="w-full h-auto mb-3" 
              />
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-nyt-gray">{byline}</span>
              <span className="text-xs text-nyt-gray">{timeAgo}</span>
            </div>
          </div>
        </Link>
      </article>
    );
  }
  
  // Secondary article (text only)
  if (variant === "secondary") {
    return (
      <article className="article-card p-2 border-b border-nyt-border pb-4 last:border-0 cursor-pointer">
        <Link href={getArticleUrl()}>
          <div>
            <h3 className="font-nyt font-bold text-lg mb-1 hover:text-nyt-blue">{article.title}</h3>
            <p className="text-sm text-nyt-gray mb-2">{article.abstract}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-nyt-gray">{byline}</span>
              <span className="text-xs text-nyt-gray">{timeAgo}</span>
            </div>
          </div>
        </Link>
      </article>
    );
  }
  
  // Default/Top story (medium with image)
  return (
    <article className="article-card p-2 border-b border-nyt-border pb-6 md:pb-4 cursor-pointer">
      <Link href={getArticleUrl()}>
        <div>
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt={article.title} 
              className="w-full h-48 object-cover mb-3" 
            />
          )}
          
          <h3 className="font-nyt font-bold text-lg mb-1 hover:text-nyt-blue">{article.title}</h3>
          <p className="text-sm text-nyt-gray mb-2">{article.abstract}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-nyt-gray">{byline}</span>
            <span className="text-xs text-nyt-gray">{timeAgo}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
