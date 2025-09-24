"use client";

const QuoteCard = ({ text, author, book }) => {
  return (
    <div className="quote-card rounded-2xl lg:shadow-lg shadow-md text-center lg:p-6  p-8 lg:w-[600px] w-[350px]">
      <p className="text-xl font-medium italic text-gray-600  mb-4">"{text}"</p>
      <p className="text-gray-400  text-end">
        – {author}, <em>{book}</em>
      </p>
    </div>
  );
}

export default QuoteCard;
