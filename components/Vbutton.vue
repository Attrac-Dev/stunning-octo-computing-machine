<!-- New test variable button with slot and possible hover styles -->

<template>
    <NuxtLink :to="link">
      <button
        class="button"
        :style="{ backgroundColor: getColor(), borderRadius: radiusStyle === 'rounded' ? '50px' : '0%', color: getTextColor() }"
        @mouseover="hoverOver"
        @mouseout="hoverAway"
      >
        <slot></slot>
      </button>
    </NuxtLink>
  </template>
  
  <script>
  export default {
    props: {
      // ... your existing props
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
    data() {
        return {
            buttonBackgroundColor: null,
            initialColor: null
        }
    },
    methods: {
        // ... your existing methods
        shadeColor(color, percent) {
        const hexColor = this.rgbToHex(this.hexToRgb(color));
        const amount = Math.round(2.55 * percent);
        const darkenedColor = color.replace(
            /^#/,
            `#${(0x1000000 + (parseInt(hexColor.slice(1), 16) + amount) % 0x1000000).toString(16).slice(1)}`
        );
        return darkenedColor;
        },
        hexToRgb(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        const fullHexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
        const result = shorthandRegex.exec(hex) || fullHexRegex.exec(hex);
        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            }
            : null;
        },
        rgbToHex(rgb) {
        return `#${((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1)}`;
        },
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
        hoverOver() {
            const button = this.$el.querySelector('.button');
            const computedStyle = getComputedStyle(button);
            const backgroundColor = computedStyle.getPropertyValue('background-color');
            this.buttonBackgroundColor = this.shadeColor(backgroundColor, -20); // Adjust the darkness level as needed
        },

        hoverAway() {
            this.buttonBackgroundColor = null;
        },
    },
    created() {
        this.initialColor = this.color
    }
  };
  </script>
  
  <style scoped>
  /* ... your existing styles */
  .button:hover {
    /* Add your hover styles here */
  }
  .button:active {
    /* Add your active styles here */
  }
  </style>
  