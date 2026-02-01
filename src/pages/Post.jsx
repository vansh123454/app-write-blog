import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwriteServices/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.fileDelete(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-10">
      <Container>
        {/* Image Section */}
        <div className="w-full flex justify-center mb-8 relative rounded-2xl overflow-hidden shadow-lg">
          <img
            src={appwriteService.getPreviewFile(post.featuredImage)}
            alt={post.title}
            className="w-full max-h-[420px] object-cover"
          />

          {isAuthor && (
            <div className="absolute top-4 right-4 flex gap-3">
              <Link to={`/edit-post/${post.slug}`}>
                <Button
                  bgColor="bg-green-500"
                  className="cursor-pointer px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500"
                onClick={deletePost}
                className="cursor-pointer px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="w-full mb-6">
          <h1 className="text-3xl font-bold text-gray-800 leading-tight">
            {post.title}
          </h1>
        </div>

        {/* Content */}
        <div className="prose max-w-none text-gray-700 leading-relaxed">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
