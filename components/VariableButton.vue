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
        required: false,
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
        // console.log({
        //   'color':this.color,
        //   'text': this.text,
        //   'radius': this.radiusStyle,
        //   'link': this.link
        // })
        if (/^#([0-9a-f]{3}){1,2}$/i.test(this.color)) {
            // console.log("The color prop is a hex color")
          return this.color;
        } else if (this.color.startsWith('--')) {
          // console.log('The color prop is a CSS variable')
          return `var(${this.color})`;
        } else {
          // console.log('The color value is css named color')
          return this.color;
        }
      },
      getTextColor() {
        if (/^#([0-9a-f]{3}){1,2}$/i.test(this.textColor)) {
            // console.log("The textColor prop is a hex color")
          return this.textColor;
        } else if (this.textColor.startsWith('--')) {
          // console.log('The color prop is a CSS variable')
          return `var(${this.textColor})`;
        } else {
          // console.log('The color value is css named color')
          return this.textColor;
        }
      },
     }
  }
  </script>
  
  <style scoped>
  @import '~/styles/vars.css';
  @import '~/styles/typography.css';
  .button {
    /* height: inherit;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: inherit;
    border: 1px var(--brand-indigo);
    box-shadow: inherit;
    color: var(--brand-white);
    margin: 0 1rem; */
    /* new css */
    font-family: Karla;
    height: 48px;
    min-width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 24px;
    border: none;
    border-radius: 24px;
    /* box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1); */
    color: #FFFFFF;
    background-color: #000000;
    font-size: 16px;
    font-weight: 300;
    cursor: pointer;
  }
  .button:hover {
  background-color: #222222;
}

.button:active {
  background-color: #111111;
}

  </style>
  