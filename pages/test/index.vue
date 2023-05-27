<template>
    <div class="content-container">
      <h1>My Contacts</h1>
      <ul>
        <li v-for="contact in contacts" :key="contact.id">
          <p>{{ contact.id }}</p>
          <p>{{ contact.email }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { getContacts } from "../../functions/sendInBlue";
  
  export default {
    head() {
      return {
        title: this.title,
        meta: [
          { name: 'robots', content: 'noindex, nofollow' }, // Set the value to "noindex, nofollow" to prevent indexing and following
          { name: 'author', content: this.author },
        ]
      }
    },
  data() {
    return {
      contacts: [],
      // page data
      title: 'Contacts Test Page',
      author: 'AttracDev',
    };
  },
  async created() {
    try {
      const limit = 10;
      const response = await getContacts(limit);
      this.contacts = response.contacts;
    } catch (error) {
      console.error(error);
    }
  },
};
  </script>
  
  <style>
  /* Add any custom styles for this component here */
  </style>
  