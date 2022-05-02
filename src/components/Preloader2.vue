<template>
  <transition name="fade">
    <div v-if="show" class="preloader">
      <div class="preloader-content">
        <span>
          <div class="logo">
          <img src="@/assets/Logo.svg" alt="" />
        </div>
        </span>
   
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "MyPreloader2",
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
.preloader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  // background-color: rgba(255, 255, 255, 0.836);
  background: #0e203d;
  z-index: 9999;

  .preloader-content {
    span {
      display: block;
      width: 180px;
      height: 180px;
      margin: 0 auto;
      border: 10px solid transparent;
      border-top-color: #00cffd;
      // border-bottom-style: double;
      border-bottom-color: #ffff;
      border-left-color: #00ff88;
      border-left-style: double;
      border-right-color: #00ff88;
      // border-right-style: double;
      border-radius: 50%;
      animation: spin ease 1000ms infinite;
    }
    @keyframes spin {
      to {
        transform: rotateZ(360deg);
      }
    }

    .logo img {
      width: 140px;
      height: 140px;
      background-repeat: no-repeat;
    }
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>