import { Link } from 'react-router-dom';


  const Favourites = () => {
  const items = [
    {
      id: 1,
      title: 'Item 1',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      title: 'Item 2',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    // Add more items as needed
  ];  

  return (
  // <div className='m-3  bg-gray-200'>
  //     <h1 className="py-3 px-4 font-bold">Favourites</h1>
  //       <div className="flex flex-col md:flex-row h-screen">
  //         <div className="flex-1 ">
  //           <ul className="h-full p-4">
  //             {list1.map((item, index) => (
  //               <li key={index} className="border-b border-gray-400 py-2">
  //                 {item}
  //               </li>
  //             ))}
  //           </ul>
  //         </div>
          
  //       </div> 
  //     </div>

  <div className='m-4 bg-gray-200'>
    <h1 className="py-3 px-4 font-bold">Favourites</h1>
    <div className='m-2'>
      {items.map((item) => (
        <div key={item.id} className="my-4 p-4 bg-white rounded-md flex">
        <div className="flex-1 bg-white flex flex-col justify-center">
          <div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-black-600 mb-2">{item.details}</p>
      
            <div className="flex justify-center">
              <button className="mt-4 bg-gray-500 w-full hover:bg-gray-800 text-white py-2 px-4 ">
                <Link to="/" className="text-white font-bold">
                  Read More
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      ))}
      </div>
  </div>
)}

export default Favourites