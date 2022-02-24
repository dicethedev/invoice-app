<template>
  <div class="modal flex">
    <div class="modal-content">
      <p>Are you sure you want to exist? Your changes will not be saved</p>
      <div class="actions flex">
        <button @click="closeModal" class="blue">Return</button>
        <button @click="closeInvoice" class="red">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "modal",
  methods: {
    ...mapMutations(["TOGGLE_MODAL", "TOGGLE_INVOICE"]),

    closeModal() {
      this.TOGGLE_MODAL();
    },

    closeInvoice() {
      this.TOGGLE_MODAL();
      this.TOGGLE_INVOICE(); // this toggle-invoice() when it is close it will be close completely
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  z-index: 100;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  .modal-content {
    border-radius: 20px;
    padding: 48px 32px;
    max-width: 450px;
    background-color: #0e203d;
    color: #fff;
    p {
      text-align: center;
    }
    .actions {
      margin-top: 24px;
      button {
        flex: 1;
      }
    }
  }
}
</style>