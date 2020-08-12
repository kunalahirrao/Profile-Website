<template>
  <div>
    <Header />
    <Specialize />
    <Stats />
    <Process />
    <Contact />
    <Footer/>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Specialize from "./components/Specialize";
import Stats from "./components/Stats";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Specialize,
    Stats,
    Process,
    Contact,
    Footer,
  },
};
</script>

<style lang="scss"></style>
