import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { Article } from "@/lib/types";
import { formatTimeAgo } from "@/lib/api";

export default function ArticlePage() {
  const [location] = useLocation();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const queryClient = useQueryClient();

  // Extract article URI from URL
  // Format is /article/section/uri-identifier
  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(false);

      try {
        // Extract section and article identifier from URL
        const urlParts = location.split('/');
        if (urlParts.length < 4) {
          throw new Error("Invalid article URL");
        }

        const section = urlParts[2];
        
        // Get cached articles from the query client
        const cachedArticles = queryClient.getQueryData<Article[]>(["articles", section]);
        
        if (!cachedArticles) {
          // If we don't have the articles cached, redirect to home
          throw new Error("Articles not found in cache");
        }

        // Find the article that matches the URL
        const foundArticle = cachedArticles.find(a => {
          // Create a slug from the URI
          const uriParts = a.uri.split('/');
          const slug = uriParts[uriParts.length - 1];
          return slug === urlParts[3];
        });

        if (!foundArticle) {
          throw new Error("Article not found");
        }

        setArticle(foundArticle);
      } catch (err) {
        console.error("Error loading article:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [location, queryClient]);

  const handleRetry = () => {
    // Extract section from URL
    const urlParts = location.split('/');
    if (urlParts.length >= 3) {
      const section = urlParts[2];
      queryClient.invalidateQueries({ queryKey: ["articles", section] });
    }
    
    // Reload current page
    window.location.reload();
  };

  // Find the best image to display
  const getMainImage = (): string | undefined => {
    if (!article?.multimedia || article.multimedia.length === 0) {
      return undefined;
    }

    // Prefer superJumbo format for full article page
    const superJumbo = article.multimedia.find(m => m.format === "superJumbo");
    if (superJumbo) return superJumbo.url;

    // Fallback to any large format
    const anyLarge = article.multimedia.find(m => 
      m.width > 600 || m.format === "mediumThreeByTwo440"
    );
    if (anyLarge) return anyLarge.url;

    // Last resort: use first image
    return article.multimedia[0].url;
  };

  return (
    <div className="bg-white text-nyt-black min-h-screen">
      <Header />
      
      {loading && <LoadingState />}
      
      {error && <ErrorState onRetry={handleRetry} />}
      
      {!loading && !error && article && (
        <main className="container mx-auto px-4 py-8">
          <nav className="mb-6 text-sm text-nyt-gray">
            <Link href="/">
              <a className="hover:text-nyt-blue">Home</a>
            </Link>
            <span className="mx-2">›</span>
            <Link href={`/?section=${article.section}`}>
              <a className="hover:text-nyt-blue capitalize">{article.section}</a>
            </Link>
            {article.subsection && (
              <>
                <span className="mx-2">›</span>
                <span className="capitalize">{article.subsection}</span>
              </>
            )}
          </nav>
          
          <article className="max-w-4xl mx-auto">
            <h1 className="font-nyt font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
              {article.title}
            </h1>
            
            <h2 className="text-xl md:text-2xl font-nyt font-medium text-nyt-gray mb-6">
              {article.abstract}
            </h2>
            
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-nyt-border">
              <div>
                <p className="font-medium">{article.byline.replace(/^By\s+/i, '')}</p>
                <p className="text-sm text-nyt-gray">
                  {new Date(article.published_date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <i className="far fa-bookmark"></i>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <i className="fas fa-share"></i>
                </button>
              </div>
            </div>
            
            {getMainImage() && (
              <div className="mb-8">
                <img 
                  src={getMainImage()} 
                  alt={article.title} 
                  className="w-full h-auto" 
                />
                <p className="text-sm text-nyt-gray mt-2">
                  {article.multimedia.find(m => getMainImage() && m.url === getMainImage())?.caption || ''}
                </p>
                <p className="text-xs text-nyt-gray">
                  {article.multimedia.find(m => getMainImage() && m.url === getMainImage())?.copyright || ''}
                </p>
              </div>
            )}
            
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-lg">{article.abstract}</p>
              
              <p className="italic text-nyt-gray my-6">
                This is a preview of the article. To read the full article, please visit the New York Times website:
              </p>
              
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-nyt-blue text-white px-6 py-3 rounded inline-block hover:bg-blue-800 transition-colors"
              >
                Read Full Article at NYTimes.com
              </a>
            </div>
            
            <div className="border-t border-nyt-border pt-6 mb-12">
              <h3 className="font-nyt font-bold text-lg mb-4">More in {article.section}:</h3>
              
              <div className="text-sm text-nyt-blue">
                <Link href={`/?section=${article.section}`}>
                  <a className="hover:underline">
                    View all {article.section} articles →
                  </a>
                </Link>
              </div>
            </div>
          </article>
        </main>
      )}
      
      <Footer />
    </div>
  );
}