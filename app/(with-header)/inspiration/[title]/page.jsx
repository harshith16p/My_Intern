import { fetchSuggestionData } from "@/components/Features/api";
import Suggestion from "@/components/suggestion/Suggestion";
import { ArticleJsonLd } from "next-seo";

export const generateMetadata = async ({ params: { title } }) => {
  const suggestion = await fetchSuggestionData(title?.replace(/-/g, " "));

  return {
    title: suggestion?.metadata?.title,
    description: suggestion.summary,
    openGraph: {
      title: suggestion?.metadata?.title,
      description: suggestion.summary,
      images: [
        {
          url: suggestion.mainImage.imgSrc,
        },
      ],
    },
    alternates: {
        canonical: `${BASE_URL}/${params.title}/inspiration`,
    },
  };
};

const SuggestionPage = async ({ params: { title } }) => {
  const suggestion = await fetchSuggestionData(title?.replace(/-/g, " "));

  return (
    <>
      {!!suggestion ? (
        <ArticleJsonLd
          useAppDir={true}
          type="BlogPosting"
          title={suggestion.metadata.title}
          description={suggestion.summary}
          images={[suggestion.mainImage, suggestion.suggestionCardImage]}
          datePublished={suggestion.createdAt?.toString()}
          dateModified={suggestion.updatedAt?.toString()}
          authorName={suggestion.author?.name || "Ayatrio"}
        />
      ) : null}
      <Suggestion id={title.replace(/-/g, " ")} />;
    </>
  );
};

export default SuggestionPage;
