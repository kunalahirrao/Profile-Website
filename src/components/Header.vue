<template>
  <header id="header-home">
    <div class="container">
      <nav id="main-nav">
        <h1 id="logo">KC</h1>
        <ul>
          <li v-for="item in totalPages" :key="item.text">
            <a
              :href="`#${item.val}`"
              :class="[currentPage === item.val ? 'current' : '']"
              @click="
                currentPage = item.val;
                enContactForm();
              "
              >{{ item.text }}</a
            >
          </li>
        </ul>
      </nav>
      <div class="header-content">
        <h1>
          I Am Kunal The
          <span class="typed-text">{{ typeValue }}</span>
          <span class="cursor" :class="{ typing: typeStatus }">&nbsp;</span>
        </h1>
        <p class="lead">
          I specialize in creating SPA's,PWA's,
        </p>
        <a href="#" class="btn-light">View My Work</a>
      </div>
    </div>
  </header>
</template>

<script>
import { setTimeout } from "timers";
import { eventBus } from "../main";
export default {
  name: "Header",
  data() {
    return {
      totalPages: [
        { text: "home", val: "header-home" },
        { text: "about", val: "home-a" },
        { text: "work", val: "home-b" },
        { text: "contact", val: "contact-form" },
      ],
      currentPage: "home",
      // Typing effect
      typeValue: "",
      typeStatus: false,
      typeArray: [
        "Full Stack Dev",
        "Software architect",
        "Backend Dev",
        "Frontend Dev",
      ],
      typingSpeed: 200,
      erasingSpeed: 100,
      newTextDelay: 1000,
      typeArrayIndex: 0,
      charIndex: 0,
      formState: false,
    };
  },
  created() {
    setTimeout(this.typeText, this.newTextDelay + 200);
    eventBus.$on("disableForm", (state) => {    
      this.formState = state;
    });
  }, 
  methods: {
    typeText() {
      if (this.charIndex < this.typeArray[this.typeArrayIndex].length) {
        if (!this.typeStatus) this.typeStatus = true;
        this.typeValue += this.typeArray[this.typeArrayIndex].charAt(
          this.charIndex
        );
        this.charIndex += 1;
        setTimeout(this.typeText, this.typingSpeed);
      } else {
        this.typeStatus = false;
        setTimeout(this.eraseText, this.newTextDelay);
      }
    },
    eraseText() {
      if (this.charIndex > 0) {
        if (!this.typeStatus) this.typeStatus = true;
        this.typeValue = this.typeArray[this.typeArrayIndex].substring(
          0,
          this.charIndex - 1
        );
        this.charIndex -= 1;
        setTimeout(this.eraseText, this.erasingSpeed);
      } else {
        this.typeStatus = false;
        this.typeArrayIndex += 1;
        if (this.typeArrayIndex >= this.typeArray.length)
          this.typeArrayIndex = 0;
        setTimeout(this.typeText, this.typingSpeed + 1000);
      }
    },
    enContactForm() {
      this.formState = !this.formState;
      eventBus.$emit("formEnabled", this.formState);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/header";
</style>
