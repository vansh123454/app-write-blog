import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import service from "../appwriteServices/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div>
      <Container>
        <div>
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
