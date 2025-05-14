import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "@/lib/api";
import { Article, ArticlesBySection } from "@/lib/types";

export function useArticles(section: string) {
  return useQuery({
    queryKey: ["articles", section],
    queryFn: () => fetchArticles(section),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

export function useArticlesBySection(section: string) {
  const { data: articles, isLoading, isError, error } = useArticles(section);

  const categorizeArticles = (articles: Article[] = []): ArticlesBySection => {
    // Filter to ensure articles have multimedia
    const articlesWithImages = articles.filter(
      (article) => article.multimedia && article.multimedia.length > 0
    );

    // Get opinion articles
    const opinionArticles = articlesWithImages.filter(
      (article) => article.section === "opinion" || article.section === "Opinion"
    );

    // Get non-opinion articles for other categories
    const nonOpinionArticles = articlesWithImages.filter(
      (article) => article.section !== "opinion" && article.section !== "Opinion"
    );

    // Main article is the first non-opinion article
    const mainArticle = nonOpinionArticles.length > 0 ? nonOpinionArticles[0] : null;

    // Secondary articles are the next 3 non-opinion articles
    const secondaryArticles = nonOpinionArticles.slice(1, 4);

    // Top stories are the next 6 non-opinion articles
    const topStories = nonOpinionArticles.slice(4, 10);

    // More news are the next 6 non-opinion articles
    const moreNews = nonOpinionArticles.slice(10, 16);

    return {
      mainArticle,
      secondaryArticles,
      topStories,
      opinionArticles: opinionArticles.slice(0, 4),
      moreNews,
    };
  };

  return {
    articlesBySection: articles ? categorizeArticles(articles) : null,
    isLoading,
    isError,
    error,
  };
}
