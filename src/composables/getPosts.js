import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

const getPosts = () => {
  const posts = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      const postCollection = collection(projectFirestore, 'posts');
      const q = query(postCollection, orderBy('createdAt', 'desc'));
      const postSnapshot = await getDocs(q);
      const postData = postSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      posts.value = postData;
      console.log(postData);
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };

  return { posts, error, load };
};

export default getPosts;
