"use client";

const  QuoteNavigator =({ onNext, onPrev }) =>{
  return (
    <div className="flex justify-center gap-4 mt-4">
      <button onClick={onPrev} className="px-4 py-2 bg-gray-200 rounded">
        ⏮️ Prev
      </button>
      <button onClick={onNext} className="px-4 py-2 bg-gray-200 rounded">
        ⏭️ Next
      </button>
    </div>
  );
}

export default QuoteNavigator;
