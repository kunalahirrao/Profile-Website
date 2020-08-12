<template>
  <section v-if="formState" id="contact-form" class="text-center">
    <div class="container">
      <h2 class="section-title">
        Contact Me
      </h2>
      <div class="bottom-line"></div>
      <form
        name="contact"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        @submit.prevent="handleSubmit"
      >
        <input type="hidden" name="form-name" value="contact" />
        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="form.name" type="name" name="name" id="name" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="form.email" type="email" name="email" id="email" />
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea v-model="form.message" name="message" id="message"></textarea>
        </div>

        <button class="btn-dark" @click="diContactForm">
          Cancel
        </button>
        <button type="submit" class="btn-dark mx-1">Submit</button>
      </form>
    </div>
  </section>
</template>

<script>
import { eventBus } from "../main";
export default {
  data() {
    return {
      formState: false,
      form:{
        name:"",
        email:"",
        message:""
      }
    };
  },
  created() {
    eventBus.$on("formEnabled", (state) => {
      this.formState = state;
    });
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map((key) => {
          `${encodeURIComponent(key)} = ${encodeURIComponent(data[key])}`;
        })
        .join("&");
    },
    handleSubmit() {
      fetch("/", {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: this.encode({
          "form-name": "contact",
          ...this.form,
        }),
      })
        .then(() => {
          console.log("Success");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    diContactForm() {
      this.formState = !this.formState;
      eventBus.$emit("disableForm", this.formState);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/contact";
</style>
