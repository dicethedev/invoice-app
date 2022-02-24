<template>
  <!-- Before I start creating a mockup for this are area ===== I Went back to Home.vue to Import this component inside and I register it also -->
  <!-- ===== Testing it either the information here is communicating with firebase database -->
  <!-- <div> -->
  <!-- This InvoiceId is going to give you unique ID from firebase where the details information is enter -->
  <!-- <h2>{{ invoice.invoiceId }}</h2>
  </div> -->
  <!-- This router is created for information that am not passing to anyway for now -->
  <!--  name: 'Invoice', params: { invoiceId: invoice.invoiceId } -->
  <router-link
    class="invoice flex"
    :to="{ name: 'Invoice', params: { invoiceId: invoice.invoiceId } }"
  >
    <div class="left flex">
      <span class="tracking-number">#{{ invoice.invoiceId }}</span>
      <span class="due-date">{{ invoice.paymentDueDate }}</span>
      <span class="person">{{ invoice.clientName }}</span>
    </div>
    <div class="right flex">
      <span class="price">${{ invoice.invoiceTotal }}</span>

      <!-- A class is bind adding a condition either true or false for the price payment -->
      <div
        class="status-button flex"
        :class="{
          paid: invoice.invoicePaid,
          draft: invoice.invoiceDraft,
          pending: invoice.invoicePending,
        }"
      >
        <span v-if="invoice.invoicePaid">Paid</span>
        <span v-if="invoice.invoiceDraft">Draft</span>
        <span v-if="invoice.invoicePending">Pending</span>
      </div>
      <div class="icon">
        <img src="@/assets/icon-arrow-right.svg" alt="" />
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "invoice",
  //The props pass here is coming from the invoice that is bind in the Home.vue -- Check Invoice component
  props: ["invoice"],
};
</script>

<style lang="scss">
.invoice {
  text-decoration: none;
  cursor: pointer;
  gap: 16px;
  margin-bottom: 16px;
  color: #fff;
  border-radius: 20px;
  padding: 28px 32px;
  background-color: #0e203d;
  align-items: center;

  span {
    font-size: 14px;
  }

  .left {
    align-items: center;
    //this will push the position to the left
    flex-basis: 60%;
    gap: 16px;

    span {
      flex: 1;
    }

    .tracking-number {
      text-transform: uppercase;
    }
  }

  .right {
    gap: 16px;
    flex-basis: 40%;
    align-items: center;

    .price {
      flex: 1;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>