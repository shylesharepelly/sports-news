import React, { useEffect, useState } from "react";
import { useArticlesState ,useArticlesDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/actions";
import { Link } from "react-router-dom";
import { Article } from "../../context/articles/reducer";
import { API_ENDPOINT } from '../../config/constants';
import { Dialog } from '@headlessui/react';

interface FavouriteItemsProps {
    selectedSport: string;
    selectedTeam: string;
  }

type ArticleContent= Article & {
    content:string;
}

const Favouriteitems = ({ selectedSport, selectedTeam }:FavouriteItemsProps) => {

    const dispatchArticles = useArticlesDispatch();
    useEffect(() => {
      fetchArticles(dispatchArticles);
    }, [dispatchArticles]);
    // console.log(selectedSport)
    // console.log(selectedTeam)
  
    const state: any = useArticlesState();

    const [articleData, setArticleData] = useState<ArticleContent >();
    const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { articles, isLoading, isError, errorMessage } = state;

    
    if (articles.length === 0 && isLoading) {
        return <span>Loading...</span>;
      }
      if (isError) {
        return <span>{errorMessage}</span>;
      }



    const handleLinkClick = async (articleId : number ) => {
        setSelectedArticleId(articleId); 
        setIsDialogOpen(true);
        await fetchArticleData(articleId); 
      };
  
      
    const fetchArticleData = async (id : number) => {
        try {
          const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch article data');
          }
          const data : ArticleContent = await response.json();
          console.log("data",data)
          setArticleData(data);
        } catch (error) {
          console.error('Error fetching article data:', error);
        }
      };


      const filteredArticles = articles.filter((item: any) => {
        if (selectedSport && selectedTeam) {
            return (
                item.sport.name === selectedSport &&
                item.teams.some((team:any) => team.name === selectedTeam)
            );
        } else if (selectedSport) {
            return item.sport.name === selectedSport;
        } else if (selectedTeam) {
            return item.teams.some((team: any) => team.name === selectedTeam);
        }
        return true; 
    });



    return (
      
     <div className='m-4 bg-gray-200'>
        <div className='m-2'>
            {filteredArticles.map((item:any) => (
                <div key={item.id} className="my-4 p-4 bg-white rounded-md flex">
                <div className="flex-1 bg-white flex flex-col justify-center">
                <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-black-600 mb-2">{item.summary}</p>
            
                    <div className="flex justify-center">
                    <button onClick={() => handleLinkClick(item.id)} className="w-full bg-black text-white py-1 ">
                          Read More
                      </button>
                    </div>
                </div>
                </div>

                
              <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          className="relative z-50"
          >
          <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-h-screen overflow-y-auto p-4 max-w-xl rounded bg-white">
              <div className="flex justify-end">
              <button onClick={() => setIsDialogOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
              </button>
            </div>
            {articleData && (
              <div>
              <Dialog.Title key={selectedArticleId} className="bg-white shadow-lg font-bold text-xl py-2">{articleData.title}</Dialog.Title>
              <div className="ml-4">
                    <img src={articleData.thumbnail} alt={articleData.title} className="w-full h-40vh object-cover rounded" />
                </div>
              <div>
                 {articleData.content}
              </div>
              </div>
            )}
              </Dialog.Panel>
          </div>
          </Dialog>
    
            </div>
            
            ))}
      </div>
  
     </div>
 
    )
    
}

export default Favouriteitems;