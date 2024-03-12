import { ref } from 'vue';
import { doc, getDoc } from 'firebase/firestore';
import { projectFirestore } from '../firebase/config';

const getPost = (id) => {
  const post = ref(null);
  const error = ref(null);

  const load = async () => {
    try {
      const docRef = doc(projectFirestore, 'posts', id);
      let query = await getDoc(docRef);

      post.value = { ...query.data(), id: query.id };
      //simulate delay
      //   await new Promise((resolve) => {
      //     setTimeout(resolve, 2000);
      //   });
      //   let data = await fetch('http://localhost:3000/posts/' + id);
      //   if (!data.ok) {
      //     throw Error('That post does not exist');
      //   }
      //   post.value = await data.json();
    } catch (err) {
      error.value = err.message;
    }
  };

  return { post, error, load };
};

export default getPost;
