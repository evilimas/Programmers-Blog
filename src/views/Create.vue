<template>
  <div class="create">
    <form action="" @submit.prevent="handleSubmit">
      <h2>Create a new post</h2>
      <label for="">Title:</label>
      <input v-model="title" type="text" required />
      <label for="">Content:</label>
      <textarea v-model="body" name="" id="" required></textarea>
      <label for="">Tags (hit enter to add a tag)</label>
      <input @keydown.enter.prevent="handleKeydown" v-model="tag" type="text" />
      <div class="pill" v-for="tag in tags" :key="tag">#{{ tag }}</div>
      <button>Add Post</button>
    </form>
  </div>
</template>

<script setup>
// imports
import { ref } from 'vue';
import { useRouter } from 'vue-router';

//firebase imports

import { projectFirestore, timestamp } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

// refs
const title = ref('');
const body = ref('');
const tag = ref('');
const tags = ref([]);

const router = useRouter();
// router.go(-1)

// functions

const handleKeydown = () => {
  if (!tags.value.includes(tag.value)) {
    tag.value = tag.value.replace(/\s/, ''); // removes all whitespace
    tags.value.push(tag.value);
  }
  tag.value = '';
};
const handleSubmit = async () => {
  const post = {
    title: title.value,
    body: body.value,
    tags: tags.value,
    createdAt: timestamp,
  };
  const colRef = collection(projectFirestore, 'posts');
  await addDoc(colRef, post);
  router.push({ name: 'home' });
};
</script>

<style>
form {
  max-width: 480px;
  margin: 0 auto;
  text-align: left;
}
input,
textarea {
  display: block;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #eee;
}
textarea {
  height: 160px;
}
label {
  display: inline-block;
  margin-top: 30px;
  position: relative;
  font-size: 20px;
  color: white;
  margin-bottom: 10px;
}
label::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background: #ff8800;
  position: absolute;
  z-index: -1;
  padding-right: 40px;
  left: -30px;
  transform: rotateZ(-1.5deg);
}
button {
  display: block;
  margin-top: 30px;
  background: #ff8800;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 18px;
}
.pill {
  display: inline-block;
  margin: 10px 10px 0 0;
  color: #444;
  background: #ddd;
  padding: 8px;
  border-radius: 20px;
  font-size: 14px;
}
</style>
