import AllMatches from "./AllMatches";
  const Livescore = () => {

  return (
    <div>
      <div className='font-bold text-xl px-5 py-2'>Live Games</div>
        <div className="flex px-4 py-2  shadow-lg">
          <div className="flex space-x-10">
            <AllMatches/>
          </div>
        </div>
    </div>

  );
}

export default Livescore;