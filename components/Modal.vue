<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal-container">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <div class="button-container">
        <button class="proceed" @click="proceed">Proceed</button>
        <button class="cancel" @click="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    proceed() {
      this.$emit('proceed');
    },
    cancel() {
      this.$emit('cancel');
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-container {
  background-color: #fff;
  border-radius: 4px;
  outline: 2px solid var(--brand-indigo);
  outline-offset: -5px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  max-height: 93%;
  overflow-y: auto;
}

h2 {
  text-align: center;
  margin: 0 0 2rem;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

button {
  border: none;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
  padding: 1rem;
  width: 48%;
}

button.proceed {
  background-color: var(--brand-indigo);
}

button.proceed:hover{
  background-color: var(--brand-blue);
  outline: 2px solid var(--accent-color);
  outline-offset: -2px;
}

button.cancel {
  background-color: var(--brand-white);
  outline: 2px solid var(--accent-color);
  outline-offset: -2px;
  color: var(--brand-indigo);
}

button.cancel:hover,
button.cancel:active {
  background-color: var(--accent-color);
  color: var(--brand-white);
  outline: 2px solid var(--brand-indigo);
  outline-offset: -2px;
}

</style>
