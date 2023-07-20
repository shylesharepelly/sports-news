
  const Livescore = () => {

// const sportName = 'Football';
// const teams = ['Team A', 'Team B'];
// const scores = ['3', '2'];
// const buttonText = 'View Details';

// const handleButtonClick = () => {
//   // Handle button click logic
//   console.log('Button clicked!');
// };

// return (
//   <div className="bg-white rounded-lg shadow p-4">
//     <div className="flex justify-between">
//       <p className="text-lg font-semibold">{sportName}</p>
//       <button
//         className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
//         onClick={handleButtonClick}
//       >
//         {buttonText}
//       </button>
//     </div>
//     <div className="mt-2">
//       {teams.map((team, index) => (
//         <p key={team} className="flex justify-between">
//           <span className="mr-2">{team}</span>
//           <span>{scores[index]}</span>
//         </p>
//       ))}
//     </div>
//   </div>
// );
// }


  const sportNames = ['Football', 'Basketball', 'Tennis', 'Cricket', 'Baseball'];
  const teams = [
    ['Team A', 'Team B'],
    ['Team C', 'Team D'],
    ['Team E', 'Team F'],
    ['Team G', 'Team H'],
    ['Team I', 'Team J']
  ];
  const scores = [['3', '2'], ['80', '76'],  ['6-2', '4-6'], ['150', '120'], ['5', '3']];


  const handleButtonClick = () => {
    // Handle button click logic
    console.log('Button clicked!');
  };

  return (
    <div>
      <div className='font-bold text-xl px-5 py-4'>Live Games</div>
  
    <div className="flex px-4 py-2 overflow-x-auto shadow-lg">
       <div className="flex space-x-10">
          {sportNames.map((sportName, index) => (
            <div className="bg-gray-100 rounded-lg shadow p-4 border border-black" key={sportName}>
              <div className="flex justify-between space-x-3" >
                <p className="text-lg font-semibold">{sportName}</p>
                <button
                  className=" hover:bg-blue-600 text-white py-2 px-2  rounded-md"
                  onClick={handleButtonClick}
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
  <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clip-rule="evenodd" />
</svg>

                </button>
              </div>
              <div className="mt-2">
                {teams[index].map((team, teamIndex) => (
                  <p key={team} className="flex justify-between">
                    <span className="mr-2">{team}</span>
                    <span>{scores[index][teamIndex]}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
         </div>
    </div>
    </div>
  
  );
}

export default Livescore