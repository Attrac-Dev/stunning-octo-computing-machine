<template>
    <div>
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
  data() {
    return {
      contacts: [],
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
  