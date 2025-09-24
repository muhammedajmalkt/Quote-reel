"use client";

import {  ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

const  LikeButton =()=> {
  const [liked, setLiked] = useState(false);

  return (
    <button
      onClick={() => setLiked(!liked)}
      className="mt-4 px-4 py-2  text-red-600 sha  "
    >
      {liked ? <ThumbsDown /> : <ThumbsUp />}
    </button>
  );
}

export default LikeButton;
