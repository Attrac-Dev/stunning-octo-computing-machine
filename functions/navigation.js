export function navigationScript() {
    const toggle = document.querySelector(".toggle")
    const hamburger = document.querySelector(".hamburger")
    const menu = document.querySelector(".menu")
     
    /* Toggle mobile menu */
    function toggleMenu() {
        if (menu.classList.contains("active")) {
            menu.classList.remove("active")
            // console.log('removed active from menu navigation')
            // adds the menu (hamburger) icon
            hamburger.classList.remove("is-active")
        } else {
            menu.classList.add("active")
             
            // adds the close (x) icon
            hamburger.classList.add("is-active")
        }
    }
     
    /* Event Listener: addEventListener(type, listener, options)*/
    toggle.addEventListener("click", toggleMenu, false)
    
    const items = document.querySelectorAll(".item")
     
    /* Activate Submenu */
    function toggleItem() {
      // submenu toggle OFF
      if (this.classList.contains("submenu-active")) {
        this.classList.remove("submenu-active")
        // console.log('Closed Sub-Menu')
        
        
        // still trying to change the font awesome chevron to f077
        const linkElement = this.querySelector("a")
        const afterSelector = window.getComputedStyle(linkElement, '::after')

        const chevron = afterSelector.getPropertyValue('content')

        // console.log(`p tag content for chevron = ${chevron}`)
        
        
        // toggle the chevron

      } else if (menu.querySelector(".submenu-active")) {
        menu.querySelector(".submenu-active").classList.remove("submenu-active")
        this.classList.add("submenu-active")
        // console.log('second line of toggleItem()')
        // toggle the chevron DOWN
      } else {
        this.classList.add("submenu-active")
        // console.log('Opened Sub-Menu')
        // toggle the chevron UP
      }
    }
     
    /* Event Listeners */
    for (let item of items) {
        if (item.querySelector(".submenu")) {
          item.addEventListener("click", toggleItem, false)
          item.addEventListener("keypress", toggleItem, false)
        }   
    }
    
    /* Close Submenu From Anywhere */
    function closeSubmenu(e) {
        const targetElement = e.target
        // console.log(targetElement, targetElement.nodeName)
        let isClickInside = menu.contains(e.target)
        if (isClickInside && targetElement.nodeName === 'A' && !targetElement.nextSibling){
          setTimeout(() => toggleMenu(), 800)
          // console.log('should this be closed?')
        }
        if (!isClickInside && menu.querySelector(".submenu-active")) {
          menu.querySelector(".submenu-active").classList.remove("submenu-active")
          // toggle the chevron DOWN
          // console.log(`item clicked ${e.target}`)
          setTimeout(() => toggleMenu(), 800)

        }
      }
       
      /* Event listener */
      document.addEventListener("click", closeSubmenu, false)
}
