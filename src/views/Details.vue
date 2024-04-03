<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="post" class="post">
    <h3>{{ post.title }}</h3>
    <p class="pre">{{ post.body }}</p>
    <button class="delete" @click="handleDelete(post)" disabled>
      delete post
    </button>
  </div>
  <div v-else>
    <Spinner />
  </div>
</template>

<script setup>
import getPost from '@/composables/getPost';
import { useRoute, useRouter } from 'vue-router';

// component imports
import Spinner from '../components/Spinner.vue';
//firebase imports
import { projectFirestore } from '../firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';

const props = defineProps(['id']);
const route = useRoute();
const router = useRouter();
const { error, post, load } = getPost(route.params.id);

load();

const handleDelete = async (post) => {
  const docRef = doc(projectFirestore, 'posts', post.id);
  await deleteDoc(docRef);
  router.push({ name: 'home' });
};
</script>

<style scoped>
.post {
  max-width: 1200px;
  margin: 0 auto;
}
.post p {
  color: #444;
  line-height: 1.5em;
  margin-top: 40px;
}
.pre {
  white-space: pre-wrap;
}
button.delete {
  cursor: not-allowed;
}
</style>
