<template>
  <!-- Added a v-for inside this div below and invoiceLoaded acan found inside mapstate below -->
  <div v-if="invoicesLoaded">
    <!-- <div class="app flex flex-column"> -->
    <div v-if="!mobile" class="app flex flex-column">
      <Navigation />

      <!-- The Loading Component is Preloader 1 -->
      <Preloader2 />

      <div class="app-content flex flex-column">
        <!-- adding animation when you click on the New invoice and them it will
        display the information with animation -->
        <Modal v-if="modalActive" />

        <transition name="invoice">
          <InvoiceModal v-if="invoiceModal" />
        </transition>

        <router-view />
      </div>
    </div>
    <!-- 
    <div v-else class="mobile-message flex flex-column">
      <h2>Sorry! this app is not supported on Mobile Devices</h2>
      <p>
        To use this Invoice app, please use a computer or Tablet in your
        Department in (Companyname)
      </p>
    </div> -->

    <div v-else class="mobile-message flex flex-column">
      <div class="message-alert">
        <div>
          <h2>Sorry! this app is not supported on Mobile Devices</h2>
          <p>
            To use this Invoice app, please use a Tablet Phone, Laptop or
            Desktop for better display. Thank You!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
//added ampActions to the state
import Preloader2 from "@/components/Preloader2.vue";
import Navigation from "./components/Navigation.vue";
import InvoiceModal from "./components/InvoiceModal";
import Modal from "./components/Modal.vue";

export default {
  data() {
    return {
      mobile: null,
    };
  },

  components: {
    Navigation,
    Preloader2,
    InvoiceModal,
    Modal,
  },

  created() {
    this.GET_INVOICES();
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen);
  },

  methods: {
    //This function is for state in the Vuex
    ...mapActions(["GET_INVOICES"]),

    // I went down to created() to call this function

    // ==============================================================
    checkScreen() {
      const windowWidth = window.innerWidth;
      //Create a condition here to check the screen if is below 900px to Mobile view
      if (windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
    },
  },
  computed: {
    //i pass inside the mapState the state name
    // add inside mapstate (['invoiceLoaded'])
    ...mapState(["invoiceModal", "modalActive", "invoicesLoaded"]), // went back to top on the <InvoiceModal /> component to add a condition to it i.e v-if condition
  },
};
</script>

<style lang="scss">
//Use SCSS framework for CSS
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Rubik", sans-serif;
}

.app {
  background-color: #12284e;
  min-height: 100vh;
  //flex-direction: column;
  @media (min-width: 900px) {
    flex-direction: row !important;
  }

  .app-content {
    padding: 0 20px;
    flex: 1;
    position: relative;
  }
}

.mobile-message {
  padding: 19px;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #12284e;
  color: #fff;

  .message-alert {
    display: flex;
    justify-content: space-between;
    background-color: #ff0000;
    padding: 1.5rem;
    border-radius: 15px;
  }

  p {
    margin-top: 16px;
  }
}

//animated invoice
//i give it a name invoice-enter-active
.invoice-enter-active,
.invoice-leave-active {
  transition: 0.5s ease all;
}

.invoice-enter-from,
.invoice-leave-to {
  transform: translateX(-700px);
}

button,
.button {
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 30px;
  border: none;
  font-size: 14px;
  margin-right: 8px;
  color: #fff;
}

.sky-color {
  background-color: #00cffd;
}

.dark-blue {
  background-color: #ec5757;
}

.red {
  background-color: #ff0000;
}

.blue {
  background-color: #00ff88;
}

.green {
  background-color: #33d69f;
}

.pink {
  // orange = #ff8f00
  background-color: #ff00d4;
}

// utility classes

.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.container {
  width: 100%;
  padding: 40px 10px;
  max-width: 850px;
  margin: 0 auto;

  @media (min-width: 900px) {
    padding-top: 72px;
  }
}

.nav-link {
  text-decoration: none;
  color: initial;
}

// Status Button Styling

.status-button {
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
  }
  font-size: 12px;
  margin-right: 30px;
  align-items: center;
  padding: 8px 30px;
  border-radius: 10px;
}

.paid {
  &::before {
    background-color: #33d69f;
  }
  color: #33d69f;
  background-color: rgba(51, 214, 160, 0.1);
}

.pending {
  &::before {
    background-color: #ff00d4;
  }
  // #ff8f00
  color: #ff00d4;
  background-color: rgba(255, 145, 0, 0.1);
}

.draft {
  &::before {
    background-color: #494d69;
  }
  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.1);
}
</style>
