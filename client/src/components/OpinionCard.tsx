import { Article } from "@/lib/types";
import { Link } from "wouter";

interface OpinionCardProps {
  article: Article;
}

export default function OpinionCard({ article }: OpinionCardProps) {
  // Extract author name from byline without "By " prefix
  const author = article.byline.replace(/^By\s+/i, '');
  
  // For opinion pieces, try to get the contributor image (if available)
  // Otherwise use a default avatar from Unsplash
  const defaultAvatars = [
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
  ];
  
  // Use a random avatar based on the article URI (to be consistent)
  const avatarIndex = article.uri.length % defaultAvatars.length;
  const avatarUrl = defaultAvatars[avatarIndex];
  
  // Create URL for article detail page
  const getArticleUrl = () => {
    // Extract the last part of the URI as the ID
    const uriParts = article.uri.split('/');
    const id = uriParts[uriParts.length - 1];
    return `/article/${article.section}/${id}`;
  };

  return (
    <article className="article-card p-2 cursor-pointer">
      <Link href={getArticleUrl()}>
        <div>
          <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden float-left mr-3 mt-1">
            <img src={avatarUrl} alt="Columnist portrait" className="w-full h-full object-cover" />
          </div>
          <h3 className="font-nyt font-bold text-lg mb-1 hover:text-nyt-blue">{article.title}</h3>
          <p className="text-sm text-nyt-gray mb-2">{article.abstract}</p>
          <span className="text-xs text-nyt-gray block">{author}</span>
        </div>
      </Link>
    </article>
  );
}
