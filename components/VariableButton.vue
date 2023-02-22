<template>
    <NuxtLink :to="link" >
      <button class="button" :style="{ backgroundColor: getColor(), borderRadius: radiusStyle === 'rounded' ? '50px' : '0%', color: getTextColor() }">
        <span class="button-text">{{ text }}</span>
      </button>
    </NuxtLink>
  </template>
  
  <script>

  export default {
    props: {
      link: {
        type: String,
        required: true
      },
      radiusStyle: {
        type: String,
        required: true,
        validator: value => ['rounded', 'square'].includes(value)
      },
      color: {    // background color
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      textColor: {
        type: String,
        default: '--brand-white'
      },
      filled: {   // background color OR transparent
        type: Boolean,
        required: true
      }
    },
    methods: {
      getColor() {
        console.log({
          'color':this.color,
          'text': this.text,
          'radius': this.radiusStyle,
          'link': this.link
        })
        if (/^#([0-9a-f]{3}){1,2}$/i.test(this.color)) {
            console.log("The color prop is a hex color")
          return this.color;
        } else if (this.color.startsWith('--')) {
          console.log('The color prop is a CSS variable')
          return `var(${this.color})`;
        } else {
          console.log('The color value is css named color')
          return this.color;
        }
      },
      getTextColor() {
        if (/^#([0-9a-f]{3}){1,2}$/i.test(this.textColor)) {
            console.log("The textColor prop is a hex color")
          return this.textColor;
        } else if (this.textColor.startsWith('--')) {
          console.log('The color prop is a CSS variable')
          return `var(${this.textColor})`;
        } else {
          console.log('The color value is css named color')
          return this.textColor;
        }
      },
     }
  }
  </script>
  
  <style scoped>
  @import '~/styles/vars.css';
  .button {
    height: 3.5rem;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 2rem;
    border: 1px var(--brand-indigo);
    box-shadow: 0px 3px 5px rgba(0,0,0,0.2);
    color: var(--brand-white);
    margin: 0 1rem;
  }
  .button:hover {
    
  }
  .button-text {
    text-align: center;
  }

  </style>
  