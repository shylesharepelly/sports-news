import { Link } from 'react-router-dom';


function Articles() {

  const items = [
    {
      id: 1,
      sport:"cricket",
      title: 'Item 1',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date:"Dec 22,2022",
      image: 'image.jpg',
    },
    {
      id: 2,
      sport:"cricket",
      title: 'Item 2',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date:"Dec 22,2022",
      image: 'image.jpg',
    },
    // Add more items as needed
  ];

  return (
    <div className='m-4'>
      {items.map((item) => (
        <div key={item.id} className="my-4 p-4 bg-gray-100 rounded-md flex">
          <div className="flex-1">
              <div>
                <h3 className="text-sm  mb-2">{item.sport}</h3>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-black-600 mb-2">{item.details}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs text-gray-900">{item.date}</h3>
                <Link to="/" className=" text-black  underline">
                  Read More...
                </Link>
              </div>
          </div>
            <div className="ml-4">
              <img src={item.image} alt={item.title} className="w-40 h-40 object-cover rounded" />
            </div>
        </div>
      ))}
    </div>
  );
}


export default Articles
