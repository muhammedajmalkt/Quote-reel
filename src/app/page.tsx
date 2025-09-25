"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import QuoteCard from "@/components/QuoteCard";
import LikeButton from "@/components/LikeButton";
import ShareButton from "@/components/ShareButton";
import Loading from "@/components/Loading";
import { ArrowDownUp } from "lucide-react";
import { fetchRandomQuote, fetchMoreQuotes } from "@/api/quoteApi";
import { mockQuotes } from "./utils/quotes";

type Quote = {
  quote: string;
  author: string;
  book?: string;
};

const Home = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const quoteCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function getQuotes() {
      const data = await fetchRandomQuote();
      setQuotes(data);
      setLoading(false);
    }
    getQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length > 0 && currentIndex >= quotes.length - 2) {
      fetchMoreQuotes(3).then((newQuotes) =>
        setQuotes((prev) => [...prev, ...newQuotes])
      );
    }
  }, [currentIndex, quotes.length]);

  const navigateToQuote = useCallback(
    (newIndex: number) => {
      if (isScrolling || newIndex === currentIndex) return;

      setIsScrolling(true);
      if (quoteCardRef.current)
        quoteCardRef.current.classList.add("opacity-0", "scale-95");

      setTimeout(() => {
        setCurrentIndex(newIndex);
        setTimeout(() => {
          if (quoteCardRef.current)
            quoteCardRef.current.classList.remove("opacity-0", "scale-95");
          setIsScrolling(false);
        }, 300);
      }, 50);
    },
    [currentIndex, isScrolling]
  );

  const nextQuote = () => navigateToQuote((currentIndex + 1) % quotes.length);
  const prevQuote = () =>
    navigateToQuote((currentIndex - 1 + quotes.length) % quotes.length);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let touchStartY = 0;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 15) nextQuote();
      else if (e.deltaY < -15) prevQuote();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " ") nextQuote();
      else if (e.key === "ArrowUp") prevQuote();
    };
    const handleTouchStart = (e: TouchEvent) =>
      (touchStartY = e.touches[0].clientY);
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) diff > 0 ? nextQuote() : prevQuote();
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextQuote, prevQuote]);

  if (loading) return <Loading />;
  if (!quotes.length)
    return (
      <div className="flex items-center justify-center min-h-screen">
        No quotes found
      </div>
    );

  const currentQuote =
    quotes[currentIndex] || mockQuotes[currentIndex % mockQuotes.length];

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 overflow-hidden select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="  absolute  top-2 left-0  p-2 lg:p-6">
        <h1 className="lg:text-4xl text-2xl px-3 py-2 font-serif italic  text-blue-700 underline leading-0 ">
          LitFlips
        </h1>
        <p className="text-gray-700 lg:text-sm text-[10px] px-4 py-2 ">
          Inspire in Seconds
        </p>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div
          ref={quoteCardRef}
          className="transition-all duration-500 ease-in-out transform-gpu"
        >
          <QuoteCard
            text={currentQuote.quote}
            author={currentQuote.author}
            book={currentQuote.book}
          />
        </div>
        <div className=" absolute  bottom-1/5 lg:bottom-1/3 lg:right-0 right-2  flex lg:flex-row gap-3 mt-6 lg:justify-center  w-full flex-col items-end">
          <LikeButton />
          <ShareButton />
        </div>
      </div>

      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-10 flex space-x-1 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
        {quotes.slice(0, Math.min(8, quotes.length)).map((_, idx) => (
          <div
            key={idx}
            className={`transition-all duration-500 w-2 h-2 rounded-full ${
              idx === currentIndex
                ? "bg-blue-600 w-4 scale-125"
                : idx < currentIndex
                ? "bg-blue-400"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {quotes.length > 1 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-3 text-gray-600">
          <span className="hidden lg:flex  text-[10px] font-medium bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
            Scroll up/down
          </span>
          <span className="lg:hidden flex text-[10px] font-medium bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
            Swip up/down
          </span>
          <ArrowDownUp className="animate-bounce text-gray-500" />
        </div>
      )}
    </main>
  );
};
export default Home;
