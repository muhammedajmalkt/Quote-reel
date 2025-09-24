"use client";

import { Share2 } from "lucide-react";

const  ShareButton =()  =>{
  const handleShare = () => {
    alert(`Currently not available"`);
  };

  return (
    <button
      onClick={handleShare}
      className="mt-4 px-4 py-2 ml-2 text-blue-600"
    >
        <Share2 />
    </button>
  );
}

export default ShareButton;
