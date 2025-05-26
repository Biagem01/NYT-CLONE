import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { removeFavorite } from "@/redux/favorites.slice";
import { removeFavoriteFromFirestore } from "@/lib/firebaseFavorites";
import type { Article } from "@/lib/types";
import { Helmet } from "react-helmet-async";

// ✅ Verifica se il lazy loading funziona
console.log("✅ Favorites component loaded (lazy)");

export default function Favorites() {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.articles);

  const handleRemove = async (article: Article) => {
    if (!user) return;

    dispatch(removeFavorite(article.uri));
    await removeFavoriteFromFirestore(user.uid, article.uri);
  };

  return (
    <div className="bg-white min-h-screen text-nyt-black">
      <Helmet>
        <title>Saved Articles - The New York Times Clone</title>
        <meta name="description" content="Your list of saved articles on The New York Times Clone." />
      </Helmet>

      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Saved Articles</h1>

        {loading ? (
          <p>Loading...</p>
        ) : !user ? (
          <div className="text-gray-600">
            <p className="mb-2">You are not signed in.</p>
            <p>
              Please <Link href="/login" className="text-nyt-blue underline">sign in</Link> to view and save your favorite articles.
            </p>
          </div>
        ) : favorites.length === 0 ? (
          <p>No articles saved yet.</p>
        ) : (
          <ul className="grid gap-6">
            {favorites.map((article) => (
              <li key={article.uri} className="border p-4 rounded shadow">
                <Link href={`/article/${article.section}/${article.uri.split('/').pop()}`}>
                  <h2 className="text-xl font-semibold hover:underline cursor-pointer">{article.title}</h2>
                </Link>
                <p className="text-gray-500">{article.byline}</p>
                <button
                  className="mt-2 text-sm text-red-600 underline"
                  onClick={() => handleRemove(article)}
                >
                  Remove from favorites
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
}
