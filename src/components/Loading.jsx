const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-400 rounded-full mix-blend-multiply blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-gray-400 rounded-full mix-blend-multiply blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="quote-card rounded-2xl lg:shadow-lg shadow-md text-center lg:p-6 p-8 lg:w-[600px] w-[350px] animate-pulse">
        <div className="mb-4">
          <div className="h-6 bg-gray-300 rounded mb-2"></div>
          <div className="h-6 bg-gray-300 rounded mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
        </div>

        <div className="text-end">
          <div className="h-4 bg-gray-300 rounded w-2/3 ml-auto mb-1"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 ml-auto"></div>
        </div>
      </div>

      <div className=" absolute  bottom-1/5 lg:bottom-1/3 lg:right-0 right-2  flex lg:flex-row gap-3 mt-6 lg:justify-center  w-full flex-col items-end">
        <div className="bg-gray-300 w-12 h-8 rounded-2xl animate-pulse"> {""} </div>
        <div className="bg-gray-300 w-12 h-8 rounded-2xl animate-pulse"> {""} </div>
      </div>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-10 flex space-x-1 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
