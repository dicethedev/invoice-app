<template>
  <transition name="fade">
    <!-- //changing to v-if directive (v-if="show")  -->
    <!-- <div class="preloader"> -->
    <div v-if="show" class="preloader">
      <div class="logo">
        <img src="@/assets/logo-blessing.png" alt="" />
      </div>
      <!-- <p>Blessing Samuel Project!</p> -->
      <div class="circles">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    </div>
  </transition>
</template>

<script>
//changing the if directive
export default {
  name: "prelaoder1",
  data() {
    return {
      show: true,
    };
  },

  mounted() {
    this.showToggle();
  },

  methods: {
    //setting the animation to delay to let application load
    showToggle() {
      setTimeout(() => {
        this.show = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
//Preloader must fill full window and hide background till the load ends
.preloader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 9999;

  .logo img {
    width: 14rem;
    height: 14rem;
    background: url(../assets/logo-blessing.png);
    background-repeat: no-repeat;
  }

  // p {
  //   font: 600 1.5rem;
  //   margin-top: 2rem;
  //   color: #fff;
  // }

  .circles {
    display: flex;
    margin-top: 1rem;

    .circle {
      width: 1.5rem;
      height: 1.5rem;
      margin: 1rem;
      background-color: #00cffd;
      border-radius: 50%;
      animation-name: scaleIn;
      animation-duration: 1s;
      transform: scale(0);

      &:nth-child(1) {
        animation-delay: 0s;
      }
      &:nth-child(2) {
        animation-delay: 0.1s;
      }
      &:nth-child(3) {
        animation-delay: 0.2s;
      }
      &:nth-child(4) {
        animation-delay: 0.3s;
      }
      &:nth-child(5) {
        animation-delay: 0.4s;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s;

    .logo {
      animation-name: scaleOut;
      animation-duration: 1s;
      p {
        animation-name: scaleOut;
        animation-duration: 1s;
      }
    }
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  @keyframes scaleOut {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }

  @keyframes scaleIn {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>