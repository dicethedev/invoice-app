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
import { mapMutations, mapState } from "vuex";
export default {
  name: "modal",
  methods: {
    // added mutation inside the array -  TOGGLE_EDIT_INVOICE
    ...mapMutations(["TOGGLE_MODAL", "TOGGLE_INVOICE", " TOGGLE_EDIT_INVOICE"]),

    closeModal() {
      this.TOGGLE_MODAL();
    },

    closeInvoice() {
      this.TOGGLE_MODAL();
      this.TOGGLE_INVOICE(); // this toggle-invoice() when it is close it will be close completely
      if (this.editInvoice) {
        this.TOGGLE_EDIT_INVOICE();
      }
      // I head back to InvoiceModal inside closeInvoice to add a condition to it
    },
  },
  computed: {
    ...mapState(["editInvoice"]),
    // head back to method and add some "if" condition to it under closeInvoice() method
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