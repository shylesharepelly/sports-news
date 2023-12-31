import { API_ENDPOINT } from "../../config/constants";
import { useArticlesState } from "../../context/articles/context";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

interface Article {
  id: number;
  title: string;
  summary: string;
  thumbnail: string;
  date: string;
  sport: {
    id: number;
    name: string;
  };
  content: string;
}

export default function ArticleListItems({ article }: { article: Article }) {
  const state: any = useArticlesState();

  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [articleData, setArticleData] = useState<Article | null>(null);

  const handleLinkClick = async (articleId: number) => {
    setSelectedArticleId(articleId);
    setIsDialogOpen(true);
    await fetchArticleData(articleId);
  };

  const fetchArticleData = async (id: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch article data");
      }
      const data: Article = await response.json();
      console.log("data", data);
      setArticleData(data);
    } catch (error) {
      console.error("Error fetching article data:", error);
    }
  };

  return (
    <div>
      <div className="m-4">
        <div
          key={article.id}
          className="my-4 p-4 bg-white rounded-md flex dark:bg-gray-600"
        >
          <div className="flex-1">
            <div>
              <h3 className="text-sm  mb-2">{article.sport.name}</h3>
              <h3 className="text-xl font-bold mb-2">{article.title}</h3>
              <p className="text-black-600 mb-2">{article.summary}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs text-gray-900">
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </h3>
              <button
                onClick={() => handleLinkClick(article.id)}
                className=" text-black  underline dark:text-white"
              >
                Read More...
              </button>
            </div>
          </div>
          <div className="ml-4">
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-40 h-40 object-cover rounded"
            />
          </div>
        </div>
      </div>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-h-screen overflow-y-auto p-4 max-w-xl rounded bg-white dark:bg-gray-500">
            <div className="flex justify-end">
              <button onClick={() => setIsDialogOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
            {articleData && (
              <div>
                <Dialog.Title
                  key={selectedArticleId}
                  className="bg-white shadow-lg font-bold text-xl py-2 dark:bg-gray-600"
                >
                  {articleData.title}
                </Dialog.Title>
                <div className="ml-4">
                  <img
                    src={articleData.thumbnail}
                    alt={articleData.title}
                    className="w-full h-40vh object-cover rounded"
                  />
                </div>
                <div>{articleData.content}</div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
