import { useEffect } from "react";
import { useParams } from "wouter";
import { Helmet } from "react-helmet-async";
import { useQueryClient } from "@tanstack/react-query";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import ArticleCard from "@/components/ArticleCard";
import OpinionCard from "@/components/OpinionCard";
import MoreNewsCard from "@/components/MoreNewsCard";

import { useSection } from "@/contexts/SectionContext";
import { useArticlesBySection } from "@/hooks/useArticles";

export default function Home() {
  const { section } = useParams(); // ← legge la sezione dall'URL
  const { setActiveSection } = useSection();

  // Sincronizza il context con la rotta attuale
  useEffect(() => {
    if (section) {
      setActiveSection(section);
    }
  }, [section, setActiveSection]);

  const queryClient = useQueryClient();
  const {
    articlesBySection,
    isLoading,
    isError,
    error,
  } = useArticlesBySection(section || "home");

  const handleRetry = () => {
    queryClient.invalidateQueries({ queryKey: ["articles", section] });
  };

  return (
    <div className="bg-white text-nyt-black min-h-screen">
      <Helmet>
        <title>{`${section} - The New York Times`}</title>
        <meta
          name="description"
          content={`Latest news in the ${section} section on The New York Times Clone.`}
        />
      </Helmet>

      <Header />

      {isLoading && <LoadingState />}
      {isError && <ErrorState onRetry={handleRetry} />}

      {!isLoading && !isError && articlesBySection && (
        <main className="container mx-auto px-4 py-6">
          {/* Hero Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 border-b border-nyt-border pb-8">
            {articlesBySection.mainArticle && (
              <div className="md:col-span-2">
                <ArticleCard
                  article={articlesBySection.mainArticle}
                  variant="main"
                />
              </div>
            )}

            <div className="space-y-6">
              {articlesBySection.secondaryArticles.map((article) => (
                <ArticleCard
                  key={article.uri}
                  article={article}
                  variant="secondary"
                />
              ))}
            </div>
          </section>

          {/* Top Stories */}
          <section className="mb-12">
            <div className="border-b border-nyt-border mb-4">
              <h2 className="font-nyt text-xl font-bold pb-2">Top Stories</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articlesBySection.topStories.map((article) => (
                <ArticleCard key={article.uri} article={article} />
              ))}
            </div>
          </section>

          {/* Opinion */}
          {articlesBySection.opinionArticles.length > 0 && (
            <section className="mb-12">
              <div className="border-b border-nyt-border mb-4">
                <h2 className="font-nyt text-xl font-bold pb-2">Opinion</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {articlesBySection.opinionArticles.map((article) => (
                  <OpinionCard key={article.uri} article={article} />
                ))}
              </div>
            </section>
          )}

          {/* More News */}
          <section className="mb-12">
            <div className="border-b border-nyt-border mb-4">
              <h2 className="font-nyt text-xl font-bold pb-2">More News</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articlesBySection.moreNews.map((article) => (
                <MoreNewsCard key={article.uri} article={article} />
              ))}
            </div>
          </section>
        </main>
      )}

      <Footer />
    </div>
  );
}
