import React from "react";
import service from "../appwriteServices/config";
import { Link } from "react-router-dom";

function PostCard({ slug, title, featuredImage }) {
  return (
    <Link to={`/post/${slug}`}>
      <div>
        <div>
          <img
            src={service.getPreviewFile(featuredImage)}
            alt={title}
            className=""
          />
        </div>
        <h2>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
