import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import api from '../api';

const PostListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  useEffect(() => {
    fetchPosts();

    // Clean up observer when unmounting
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!loading && hasMore) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      };

      observer.current = new IntersectionObserver(handleIntersect, options);
      if (observer.current) {
        observer.current.observe(document.getElementById('load-more'));
      }
    }
  }, [loading, hasMore]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await api.getPosts(page);
      const newPosts = response.data.posts;
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage(page + 1);
      setHasMore(newPosts.length > 0);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleIntersect = (entries) => {
    if (entries[0].isIntersecting && !loading && hasMore) {
      fetchPosts();
    }
  };

  // Dummy posts for testing
  const dummyPosts = [
    { id: 1, title: 'Dummy Post 1', body: 'This is the body of Dummy Post 1' },
    { id: 2, title: 'Dummy Post 2', body: 'This is the body of Dummy Post 2' },
    { id: 3, title: 'Dummy Post 3', body: 'This is the body of Dummy Post 3' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500"
    >
      <div className="bg-white p-8 rounded-md shadow-md w-full md:w-4/5 lg:w-3/5 xl:w-2/5">
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">Post List</h2>
        <div>
          {/* Render dummy posts */}
          {dummyPosts.map((post) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h3>
              <p className="text-gray-600">{post.body}</p>
            </motion.div>
          ))}
          {/* Render fetched posts */}
          {posts.map((post) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h3>
              <p className="text-gray-600">{post.body}</p>
            </motion.div>
          ))}
          {/* Loading indicator */}
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center my-6"
            >
              <div className="spinner"></div>
            </motion.div>
          )}
          {/* End of posts indicator */}
          {!loading && !hasMore && (
            <p className="text-center text-gray-600">No more posts to load.</p>
          )}
          {/* Intersection observer target */}
          <div id="load-more" className="py-6"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default PostListPage;
