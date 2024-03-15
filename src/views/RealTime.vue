<template>
  <h1>Real-time Listeners</h1>
  <div v-for="post in posts" :key="post.id">
    <div>{{ post.title }}</div>
  </div>
</template>

<script setup>
import { projectFirestore } from '../firebase/config';
import { onSnapshot, collection, orderBy, query } from 'firebase/firestore';
import { ref } from 'vue';

const posts = ref([]);
const q = query(
  collection(projectFirestore, 'posts'),
  orderBy('createdAt', 'desc')
);
onSnapshot(q, (snap) => {
  console.log('snapshot: ', snap);
  let docs = snap.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  console.log('documents: ', docs);
  posts.value = docs;
});
</script>

<style></style>
