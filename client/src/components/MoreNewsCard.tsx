import { Article } from "@/lib/types";
import { Link } from "wouter";

interface MoreNewsCardProps {
  article: Article;
}

export default function MoreNewsCard({ article }: MoreNewsCardProps) {
  // Extract byline without "By " prefix
  const byline = article.byline.replace(/^By\s+/i, '');
  
  // Get an appropriate small thumbnail image
  const getThumbnailImage = () => {
    if (!article.multimedia || article.multimedia.length === 0) {
      return null;
    }
    
    // Prefer thumbnails or small images
    const thumbnail = article.multimedia.find(m => 
      m.format === "thumbLarge" || 
      m.format === "Standard Thumbnail"
    );
    
    if (thumbnail) return thumbnail.url;
    
    // Otherwise use the first image
    return article.multimedia[0].url;
  };
  
  const imageUrl = getThumbnailImage();
  
  // Create URL for article detail page
  const getArticleUrl = () => {
    // Extract the last part of the URI as the ID
    const uriParts = article.uri.split('/');
    const id = uriParts[uriParts.length - 1];
    return `/article/${article.section}/${id}`;
  };

  return (
    <article className="article-card p-2 flex border-b border-nyt-border pb-4 cursor-pointer">
      <Link href={getArticleUrl()}>
        <div className="flex w-full">
          <div className="flex-grow pr-4">
            <h3 className="font-nyt font-bold text-lg mb-1 hover:text-nyt-blue">{article.title}</h3>
            <p className="text-sm text-nyt-gray mb-2">{article.abstract}</p>
            <div className="flex items-center">
              <span className="text-xs text-nyt-gray">{byline}</span>
            </div>
          </div>
          {imageUrl && (
            <div className="flex-shrink-0 w-24 h-24">
              <img 
                src={imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover" 
              />
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
