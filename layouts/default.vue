<!-- <template>
<div class="body-container">
      <Navigation />
      <Nuxt/>
      <Footer />
</div>
</template> -->\

<template>
      <div class="body-container">
        <Navigation />
        <div class="content-container">
          <Nuxt/>
        </div>
        <Footer />
      </div>
</template>
    
    <style>
    .body-container {
      /* Add a minimum height to ensure the container has enough space for content */
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .content-container {
      /* Add a margin to separate the content from the navigation and footer */
      margin-top: 80px;
      margin-bottom: 80px;
      flex-grow: 1; /* Allow the content container to grow to fill remaining space */
      min-height: 100vh;
    }
    </style>
    
