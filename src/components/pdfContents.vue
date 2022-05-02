<template>
  <!-- Invoice Details area -->
    <div class="invoice-view invoice-details container flex flex-column" ref="document">
      <div class="top flex">
        <!-- div left -->
        <!-- All this info here is coming form the Firebase Database -->
        <div class="left flex flex-column">
          <p><span>#</span>{{ currentInvoice.invoiceId }}</p>
          <p>{{ currentInvoice.productDescription }}</p>
        </div>
        <!-- div right -->
        <!-- All this info here is coming form the Firebase Database -->
        <div class="right flex flex-column">
          <p>{{ currentInvoice.billerStreetAddress }}</p>
          <p>{{ currentInvoice.billerCity }}</p>
          <p>{{ currentInvoice.billerZipCode }}</p>
          <p>{{ currentInvoice.billerCountry }}</p>
        </div>
      </div>

      <div class="middle flex">
        <!-- Mock up for payment is here -->
        <div class="payment flex flex-column">
          <h4>Invoice Date</h4>
          <p>{{ currentInvoice.invoiceDate }}</p>
          <h4>Payment Date</h4>
          <p>{{ currentInvoice.paymentDueDate }}</p>
        </div>

        <!-- Mock up for bill is here -->
        <div class="bill flex flex-column">
          <h4>Bill To</h4>
          <p>{{ currentInvoice.customerName }}</p>
          <p>{{ currentInvoice.customerStreetAddress }}</p>
          <p>{{ currentInvoice.customerCity }}</p>
          <p>{{ currentInvoice.customerCode }}</p>
          <p>{{ currentInvoice.customerCountry }}</p>
        </div>

        <!-- Send-to is the customer Email and here is the area -->
        <div class="send-to flex flex-column">
          <h4>Send To</h4>
          <p>{{ currentInvoice.customerEmail }}</p>
        </div>
      </div>

      <div class="bottom flex flex-column">
        <div class="billing-items">
          <div class="heading flex">
            <p>Item Name</p>
            <p>QTY</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          <!-- iterating through the item using v-for loop -->
          <div
            v-for="(item, index) in currentInvoice.invoiceItemList"
            :key="index"
            class="item flex"
          >
            <p>{{ item.itemName }}</p>
            <p>{{ item.qty }}</p>
            <p>{{ item.price }}</p>
            <p>{{ item.total }}</p>
          </div>
        </div>

        <div class="total flex">
          <p>Amount Due</p>
          <p>{{ currentInvoice.invoiceTotal }}</p>
        </div>
      </div>
    </div>

    <button @click="printDocumentPDF" class="PDF-color">Print PDF</button>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import html2pdf from 'html2pdf.js';
export default {
  name: "invoiceView",
  data() {
    return {
      currentInvoice: null,
    };
  },

  created() {
    this.getCurrentInvoice();
  },
  methods: {

    //   I pass a ref="document" in the <div> above
    //  function for exportToPDF
       printDocumentPDF() {
				html2pdf(this.$refs.document, {
					margin: 1,
					filename: 'invoice.pdf',
					image: { type: 'jpeg', quality: 0.99 },
					html2canvas: { dpi: 200, letterRendering: true },
					jsPDF: { unit: 'in', format: 'A4', orientation: 'landscape' }
				})
			},


    ...mapMutations([
      "SET_CURRENT_INVOICE",
      "TOGGLE_EDIT_INVOICE",
      "TOGGLE_INVOICE",
    ]),

    ...mapActions([
      "DELETE_INVOICE",
      "UPDATE_STATUS_TO_PAID",
      "UPDATE_STATUS_TO_PENDING",
    ]),

    getCurrentInvoice() {
      // passing the params invoiceId from router to get the unique Id
      this.SET_CURRENT_INVOICE(this.$route.params.invoiceId);
      // this line of code is helping in generating the unique InvoiceId on this InvoiceView.vue file here
      this.currentInvoice = this.currentInvoiceArray[0];
    },
    // This effective for the Edit button on the invoice details
    toggleEditInvoice() {
      this.TOGGLE_EDIT_INVOICE();
      this.TOGGLE_INVOICE();
      //I head back to invoiceModal to change the mode when you click the edit button.
      //Check the writing on inside the invoiceModal
    },

    //deleteInvoice is from Button 2 of clickevent &
    //I import ...mapActions to place
    async deleteInvoice(docId) {
      await this.DELETE_INVOICE(docId);

      //I need to return back to the home page(Home.vue) that is why I input this code fuction below
      this.$router.push({ name: "Home" });
    },
    updateStatusToPaid(docId) {
      this.UPDATE_STATUS_TO_PAID(docId);
    },

    updateStatusToPending(docId) {
      this.UPDATE_STATUS_TO_PENDING(docId);
    },
  },
  computed: {
    // added editInvoice inside the mapstate because if each time their is a change in the value
    // you want to go ahead and watch that. added a watch lifecycle hook for vue
    ...mapState(["currentInvoiceArray", "editInvoice"]),
  },
  //This watch decalaration will make the edited details update fast and display it on your screen
  watch: {
    //each time this toggle.. look for the condition false
    editInvoice() {
      if (!this.editInvoice) {
        this.currentInvoice = this.currentInvoiceArray[0];
      }
    },
  },
};
</script>

<style lang="scss">
.invoice-view {
  .nav-link {
    // display: flex is already call in the class declaration that is coming from app.vue style scss
    margin-bottom: 32px;
    align-items: center;
    color: #fff;
    font-size: 13px;
    img {
      margin-right: 16px;
      width: 7px;
      height: 10px;
    }
  }

  // Targeted The header and invoice-details area at once
  .header,
  .invoice-details {
    background-color: #0e203d;
    border-radius: 10px;
  }

  .header {
    align-items: center;
    padding: 24px 32px;
    font-size: 13px;

    .left {
      align-items: center;

      span {
        color: #dfe3fa;
        margin-right: 16px;
      }
    }

    // This where the buttons is on right hand side
    .right {
      flex: 1;
      justify-content: flex-end;

      .button {
        color: #fff;
      }
    }
  }

  .invoice-details {
    padding: 48px;
    margin-top: 24px;

    .top {
      //inside the top, we have left and right div.. So I simply represent with one div
      // to target the two div
      div {
        color: #dfe3fa;
        flex: 1;
      }

      .left {
        font-size: 14px;
        // Targeted first paragraph
        p:first-child {
          font-size: 24px;
          //the text will transform to Capital letter
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 8px;
        }

        // Targeted Second paragraph
        p:nth-child(2) {
          font-size: 16px;
        }

        // span for #
        span {
          color: #888eb0;
        }
      }

      .right {
        font-size: 14px;
        align-items: flex-end;
      }
    }

    .middle {
      margin-top: 50px;
      color: #dfe3fa;
      gap: 16px;

      h4 {
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 12px;
      }

      p {
        font-size: 16px;
      }
      .bill,
      .payment {
        flex: 1;
      }

      .payment {
        h4:nth-child(3) {
          margin-top: 32px;
        }
        p {
          font-weight: 600;
        }
      }
      .bill {
        p:nth-child(2) {
          font-size: 16px;
        }
        p:nth-child(3) {
          margin-top: auto;
        }

        p {
          font-size: 13px;
          max-width: 200px;
        }
      }

      .send-to {
        flex: 2;
      }
    }

    .bottom {
      margin-top: 50px;

      .billing-items {
        padding: 32px;
        // border-radius: 20px 20px 10px 10px;
        border-radius: 10px;
        background-color: #13294e;

        .heading {
          color: #dfe3fa;
          font-size: 13px;
          font-weight: 400;
          margin-bottom: 32px;

          p:first-child {
            flex: 3;
            text-align: left;
          }

          p {
            flex: 1;
            text-align: right;
          }
        }

        .item {
          margin-bottom: 32px;
          font-size: 14px;
          color: #fff;

          &:last-child {
            //I input 0 because I don't want the las item to have a margin-bottom of 32px
            margin-bottom: 0;
          }

          p:first-child {
            flex: 3;
            text-align: left;
          }
          p {
            flex: 1;
            text-align: right;
          }
        }
      }

      .total {
        color: #fff;
        padding: 32px;
        margin-top: 25px;
        background-color: rgba(12, 14, 23, 0.7);
        align-items: center;
        border-radius: 0 0 20px 20px;

        p {
          flex: 1;
          font-size: 13px;
        }
        // nth-child(2) is focusing on the right hand
        p:nth-child(2) {
          font-size: 28px;
          text-align: right;
        }
      }
    }
  }
}
</style>