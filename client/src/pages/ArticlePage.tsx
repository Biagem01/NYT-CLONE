import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addFavorite, removeFavorite } from "@/redux/favorites.slice";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { Article } from "@/lib/types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { Helmet } from "react-helmet-async";

export default function ArticlePage() {
  const [location] = useLocation();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const apiKey = import.meta.env.VITE_NYT_API_KEY;

  const favorites = useSelector((state: RootState) => state.favorites.articles);

  const isFavorite = article
    ? favorites.some((fav) => fav.uri === article.uri)
    : false;

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        setError(false);

        const parts = location.split("/");
        const section = parts[2];
        const slug = parts[3];

        let articles = queryClient.getQueryData<Article[]>(["articles", section]);

        if (!articles) {
          const response = await fetch(
            `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKey}`
          );

          if (!response.ok) throw new Error("Errore nella fetch");

          const data = await response.json();
          if (!data?.results || !Array.isArray(data.results)) throw new Error("Dati non validi");

          articles = data.results;
          queryClient.setQueryData(["articles", section], articles);
        }

        const match = articles.find((a) => {
          const uriParts = a.uri?.split("/");
          return uriParts?.[uriParts.length - 1] === slug;
        });

        if (!match) throw new Error("Articolo non trovato");
        setArticle(match);
      } catch (err) {
        console.error("Errore nel caricamento dell'articolo:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [location, queryClient]);

  const getMainImage = () => {
    if (!article?.multimedia?.length) return;
    return (
      article.multimedia.find((m) => m.format === "superJumbo")?.url ??
      article.multimedia.find((m) => m.width > 600)?.url ??
      article.multimedia[0]?.url
    );
  };

  const handleToggleFavorite = () => {
    if (!article) return;

    if (!user) {
      alert("Devi effettuare il login per salvare articoli nei preferiti.");
      return;
    }

    isFavorite
      ? dispatch(removeFavorite(article.uri))
      : dispatch(addFavorite(article));
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleCloseModal = () => {
    setShowShareModal(false);
  };

  const handleCopyLink = () => {
    if (!article) return;
    navigator.clipboard.writeText(article.url).then(() => {
      alert("Link copiato negli appunti!");
    });
  };

  const handleRetry = () => {
    const section = location.split("/")[2];
    queryClient.invalidateQueries({ queryKey: ["articles", section] });
    window.location.reload();
  };

  return (
    <div className="bg-white text-nyt-black min-h-screen relative">
      <Header />

      {loading && <LoadingState />}
      {error && <ErrorState onRetry={handleRetry} />}

      {!loading && !error && article && (
        <>
          <Helmet>
            <title>{article.title} - The New York Times Clone</title>
            <meta name="description" content={article.abstract} />
          </Helmet>

          <main className="container mx-auto px-4 py-8">
            <nav className="mb-6 text-sm text-nyt-gray">
              <Link href="/">
                <span className="hover:text-nyt-blue cursor-pointer">Home</span>
              </Link>
              <span className="mx-2">›</span>
              <Link href={`/?section=${article.section}`}>
                <span className="hover:text-nyt-blue capitalize cursor-pointer">
                  {article.section}
                </span>
              </Link>
            </nav>

            <article className="max-w-4xl mx-auto">
              <h1 className="font-bold text-3xl md:text-4xl mb-4">{article.title}</h1>
              <h2 className="text-xl text-nyt-gray mb-6">{article.abstract}</h2>

              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="font-medium">{article.byline.replace(/^By\s+/i, "")}</p>
                  <p className="text-sm text-nyt-gray">
                    {new Date(article.published_date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleToggleFavorite}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <i className={isFavorite ? "fas fa-bookmark text-blue-600" : "far fa-bookmark"}></i>
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <i className="fas fa-share"></i>
                  </button>
                </div>
              </div>

              {getMainImage() && (
                <div className="mb-8">
                  <img src={getMainImage()} alt={article.title} className="w-full h-auto" />
                  <p className="text-sm text-nyt-gray mt-2">
                    {article.multimedia?.find((m) => m.url === getMainImage())?.caption}
                  </p>
                </div>
              )}

              <div className="prose prose-lg max-w-none mb-8">
                <p>{article.abstract}</p>
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
            </article>
          </main>
        </>
      )}

      <Footer />

      {showShareModal && article && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Condividi questo articolo</h3>
            <div className="flex flex-col gap-3">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(article.url)}&text=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center"
              >
                Condividi su Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(article.url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 text-center"
              >
                Condividi su Facebook
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + " " + article.url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-center"
              >
                Condividi su WhatsApp
              </a>
              <button
                onClick={handleCopyLink}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              >
                Copia link
              </button>
              <button
                onClick={handleCloseModal}
                className="mt-2 text-sm text-gray-500 hover:underline self-center"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
