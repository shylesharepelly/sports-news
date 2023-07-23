
import {
  useArticlesState
} from "../../context/articles/context";

export default function ArticleListItems() {
  const state: any = useArticlesState();


  const { articles, isLoading, isError, errorMessage } = state;
  //console.log(articles);
 
  if (articles.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const handleLinkClick = () => {
    //fetch link
  };

 
  

  return (
        <div>
        <div className='m-4'>
            {articles.map((article:any) => (
            <div key={article.id} className="my-4 p-4 bg-gray-100 rounded-md flex">
                <div className="flex-1">
                    <div>
                    <h3 className="text-sm  mb-2">{article.sport.name}</h3>
                    <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                    <p className="text-black-600 mb-2">{article.summary}</p>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xs text-gray-900">{article.date}</h3>
                    <button onClick={() => handleLinkClick()} className=" text-black  underline">
                        Read More...
                    </button>
                    </div>
                </div>
                <div className="ml-4">
                    <img src={article.thumbnail} alt={article.title} className="w-40 h-40 object-cover rounded" />
                </div>
            </div>
            ))}
        </div>

          
     </div>
    
  );
}
