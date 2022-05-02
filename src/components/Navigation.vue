<template>
  <header class="flex">
    <div class="branding flex">
      <img src="@/assets/file-invoice-dollar-solid.png" alt="" />
    </div>
  </header>
</template>

<script>
export default {
  name: "MyNavigation",
};
</script>

<style lang="scss" scoped>
header {
  z-index: 99; //to help the navaigation to come behind to overlap
  flex-direction: row;
  background-color: #0e203d;

  @media (min-width: 900px) {
    min-height: 100%;
    min-width: 90px;
    flex-direction: column;
    border-radius: 0 20px 20px 0;
  }

  .branding {
    border-radius: 0 20px 20px 0;
    background-color: #00cffd;
    justify-content: center;
    padding: 24px;

    @media (min-width: 900px) {
      width: 100%;

      img {
        width: auto;
        height: 30px;
      }
    }
  }
}
</style>