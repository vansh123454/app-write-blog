import React, { useEffect, useState } from "react";
import service from "../appwriteServices/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) { 
    return <div>No posts available</div>;
  }
  return (
    <div>
      <Container>
        <div>
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard /*post={post}*/ {...post} /> {/* both are same */}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
