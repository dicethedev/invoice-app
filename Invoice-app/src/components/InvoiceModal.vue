<template>
  <div
    @click="checkClick"
    ref="invoiceWrap"
    class="invoice-wrap flex flex-column"
  >
    <!-- //the submit function is created to run a subitform -->
    <!-- By dafault when you submit a form is going to refresh the page. so, i don't want to refresh the page so i add to @click eventhandler .prevent -->
    <form @submit.prevent="submitForm" class="invoice-content">
      <!-- Preloader here is for invoiceModal -->
      <Preloader v-show="preloader" />
      <h1>New Invoice</h1>

      <!-- Bill From -->
      <div class="bill-from flex flex-column">
        <h4>Bill From</h4>
        <!-- Biller Address -->
        <div class="input flex flex-column">
          <!-- //the billerStreetAddress is found in the data in the script file below -->
          <label for="billerStreetAddress">Street Addresss</label>
          <!-- No validation is input for the project to be simple -->
          <input
            required
            type="text"
            id="billerStreetAddress"
            v-model="billerStreetAddress"
          />
        </div>

        <!-- //Location Details is below -->
        <div class="location-details flex">
          <!-- Biller City -->
          <div class="input flex flex-column">
            <!-- //the billerCity is found in the data in the script file below -->
            <label for="billerCity">City</label>
            <input required type="text" id="billerCity" v-model="billerCity" />
          </div>

          <!-- Biller Zip Code -->
          <div class="input flex flex-column">
            <!-- //the billerZipCode is found in the data in the script file below -->
            <label for="billerZipCode">Zip Code</label>
            <input
              required
              type="text"
              id="billerZipCode"
              v-model="billerZipCode"
            />
          </div>

          <!-- Biller Country -->
          <div class="input flex flex-column">
            <!-- //the billerCountry is found in the data in the script file below -->
            <label for="billerCountry">Country</label>
            <input
              required
              type="text"
              id="billerCountry"
              v-model="billerCountry"
            />
          </div>
        </div>
      </div>

      <!-- Bill To -->
      <div class="bill-to flex flex-column">
        <h4>Bill To</h4>
        <!-- Customer Name -->
        <div class="input flex flex-column">
          <!-- //the customerName is found in the data in the script file below -->
          <label for="customerName">Customer's Name</label>
          <input
            required
            type="text"
            id="customerName"
            v-model="customerName"
          />
        </div>

        <!-- Customer Emails -->
        <div class="input flex flex-column">
          <!-- //the customerEmail is found in the data in the script file below -->
          <label for="customerEmail">Customer's Email</label>
          <input
            required
            type="text"
            id="customerEmail"
            v-model="customerEmail"
          />
        </div>

        <!-- Customer StreetAddress -->
        <div class="input flex flex-column">
          <!-- //the customerStreetAddress is found in the data in the script file below -->
          <label for="customerStreetAddress">Street Address</label>
          <input
            required
            type="text"
            id="customerStreetAddress"
            v-model="customerStreetAddress"
          />
        </div>
        <!-- //Location Details is below -->
        <div class="location-details flex">
          <!-- Customer City -->
          <div class="input flex flex-column">
            <!-- //the customerCity is found in the data in the script file below -->
            <label for="customerCity">City</label>
            <input
              required
              type="text"
              id="customerCity"
              v-model="customerCity"
            />
          </div>

          <!-- Customer Zip Code -->
          <div class="input flex flex-column">
            <!-- //the customerZipCode is found in the data in the script file below -->
            <label for="customerZipCode">Zip Code</label>
            <input
              required
              type="text"
              id="customerZipCode"
              v-model="customerZipCode"
            />
          </div>

          <!-- customer Country -->
          <div class="input flex flex-column">
            <!-- //the customerCountry is found in the data in the script file below -->
            <label for="customerCountry">Country</label>
            <input
              required
              type="text"
              id="customerCountry"
              v-model="customerCountry"
            />
          </div>
        </div>
      </div>

      <!-- Invoice Work Details-->
      <div class="invoice-work flex flex-column">
        <div class="payment flex">
          <!--Invoice Date -->
          <div class="input flex flex-column">
            <!-- //the invoiceDate is found in the data in the script file below and the disabled is added -->
            <label for=" invoiceDate"> Invoice Date</label>
            <input
              disabled
              type="text"
              id=" invoiceDate"
              v-model="invoiceDate"
            />
          </div>

          <!-- Payment Due -->
          <div class="input flex flex-column">
            <!-- //the paymentDueDate is found in the data in the script file below and the disabled is adde -->
            <label for="paymentDueDate">Payment Due</label>
            <input
              disabled
              type="text"
              id="paymentDueDate"
              v-model="paymentDueDate"
            />
          </div>
        </div>
        <!-- Payment Terms -->
        <div class="input flex flex-column">
          <!-- //the  paymentTerms is found in the data in the script file below -->
          <label for="paymentTerms">Payment Terms</label>
          <select required type="text" id="paymentTerms" v-model="paymentTerms">
            <option value="30">Next 30 Days</option>
            <option value="60">Next 60 Days</option>
            <!-- <option value="60">Next 90 Days</option> -->
          </select>
        </div>
        <!-- Product Description -->
        <div class="input flex flex-column">
          <!-- //the productDescription is found in the data in the script file below -->
          <label for="productDescription">Product Description</label>
          <input
            required
            type="text"
            id="productDescription"
            v-model="productDescription"
          />
        </div>

        <div class="work-items">
          <h3>Item List</h3>
          <table class="item-list">
            <!-- tr = table-row -->
            <tr class="table-heading flex">
              <th class="item-name">Item Name</th>
              <th class="qty">Qty</th>
              <th class="price">Price</th>
              <th class="total">Total</th>
            </tr>
            <!-- this Tbale-Row here is Dynamic == You are going to be able to add invoiceItemList: [] by iterate through in this table-row below-->
            <!-- The v-for is creating the item that you wnat to iterate through -->
            <tr
              class="table-items flex"
              v-for="(item, index) in invoiceItemList"
              :key="index"
            >
              <td class="item-name">
                <input type="text" v-model="item.itemName" />
              </td>
              <td class="qty"><input type="text" v-model="item.qty" /></td>
              <td class="price">
                <input type="text" v-model="item.price" />
              </td>
              <!-- To get Total = Mutiply Item.qty * Item.price -->
              <td class="total flex">
                ${{ (item.total = item.qty * item.price) }}
              </td>
              <!-- Img is added here with a function of eventListener -->
              <img
                @click="deleteInvoiceItem(item.id)"
                src="@/assets/icon-delete.svg"
                alt=""
              />
            </tr>
          </table>
          <!-- On div below i pass on an eventListener @click="addNweInvoiceItem" -->
          <div @click="addNewInvoiceItem" class="flex button">
            <img src="@/assets/icon-plus.svg" alt="" />
            Add New Item
          </div>
        </div>
      </div>

      <!-- Save & Exit Button -->
      <div class="save flex">
        <!-- left hand side -->
        <div class="left">
          <!-- <button @click="closeInvoice" class="red">Cancel</button> -->
          <button type="button" @click="closeInvoice" class="red">
            Cancel
          </button>
        </div>
        <!-- right hand side -->
        <div class="right flex">
          <!-- <button @click="saveDraft" class="dark-blue">Save as Draft</button>
          <button @click="publishInvoice" class="blue">Issue Invoice</button> -->
          <button type="submit" @click="saveDraft" class="dark-blue">
            Save as Draft
          </button>
          <button type="submit" @click="publishInvoice" class="blue">
            Issue Invoice
          </button>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import db from "@/firebase/firebaseInit";
import Preloader from "@/components/Preloader.vue";
//i went back up to form and add a <Preloader /> to it
import { mapMutations } from "vuex"; //import this to this project
import { uid } from "uid"; //uid is to generate id automatically
export default {
  name: "invoiceModal",
  data() {
    return {
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      preloader: null,
      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,
      customerName: null,
      customerEmail: null,
      customerStreetAddress: null,
      customerCity: null,
      customerZipCode: null,
      customerCountry: null,
      invoiceDateUnix: null, //using this to generate date
      invoiceDate: null,
      paymentTerms: null,
      paymentDueDateUnix: null, //using this to generate date
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceItemList: [],
      invoiceTotal: 0,
    };
  },

  components: {
    Preloader,
  },

  created() {
    // get current date for invoice date field here
    //Invoice Date Generator
    this.invoiceDateUnix = Date.now();
    this.invoiceDate = new Date(this.invoiceDateUnix).toLocaleDateString(
      "en-uk",
      this.dateOptions
    );
  },

  methods: {
    //...mapMutations(["TOGGLE_INVOICE"]), // adding a mapMutations here
    ...mapMutations(["TOGGLE_INVOICE", "TOGGLE_MODAL"]),

    // working on with the ref="invoiceWrap" here // you can find this from the above code
    //this checkClick is controlling the message that will pop-up on the application which you can click anywhere on the screen
    checkClick(e) {
      if (e.target === this.$refs.invoiceWrap) {
        this.TOGGLE_MODAL();
      }
    },

    closeInvoice() {
      this.TOGGLE_INVOICE();
    },

    addNewInvoiceItem() {
      this.invoiceItemList.push({
        id: uid(),
        itemName: "",
        qty: "",
        price: 0,
        total: 0,
      });
    },

    //i pass the id to the fuction
    deleteInvoiceItem(id) {
      //The JavaScript filter function iterates over the existing values in an array and returns the values that pass.
      //!== means not equal to
      this.invoiceItemList = this.invoiceItemList.filter(
        (item) => item.id !== id
      );
    },

    calcInvoiceTotal() {
      //reset invoiceTotal to zero(0)
      this.invoiceTotal = 0;
      this.invoiceItemList.forEach((item) => {
        this.invoiceTotal += item.total;
      });
    },

    publishInvoice() {
      this.invoicePending = true;
    },

    saveDraft() {
      this.invoiceDraft = true;
    },

    async uploadInvoice() {
      //Asynchronous code allows the program to be executed immediately where the synchronous
      // code will block further execution of the remaining code until it finishes the current one
      //validating if the user enter in the invoiceItemList i don't want that to be empty
      //<+ == sign means less than or equal
      if (this.invoiceItemList.length <= 0) {
        alert("Please ensure you filled out the work items!");
        return; // return the result back
      }
      //preloader will be set to true if you upload the invoice data
      //i went down below await dataBase.set to add the false condition
      this.preloader = true;

      this.calcInvoiceTotal();

      // Uploading file to?
      // // db.collection is refer to firebasee and it will create databse automatically
      const dataBase = db.collection("invoices").doc();

      //awaiting all information from db.collection
      await dataBase.set({
        invoiceId: uid(6),
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerZipCode: this.billerZipCode,
        billerCountry: this.billerCountry,
        customerName: this.customerName,
        customerEmail: this.customerEmail,
        customerStreetAddress: this.customerStreetAddress,
        customerCity: this.customerCity,
        customerZipCode: this.customerZipCode,
        customerCountry: this.customerCountry,
        invoiceDate: this.invoiceDate,
        invoiceDateUnix: this.invoiceDateUnix,
        paymentTerms: this.paymentTerms,
        paymentDueDateUnix: this.paymentDueDateUnix,
        paymentDueDate: this.paymentDueDate,
        productDescription: this.productDescription,
        invoicePending: this.invoicePending,
        invoiceDraft: this.invoiceDraft,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal: this.invoiceTotal,
        invoicePaid: null,
      });

      // Stopping Preloader execution here
      this.preloader = false;

      this.TOGGLE_INVOICE();
    },

    submitForm() {
      this.uploadInvoice();
    },
  },
  // calculating the payment terms below in watch: {}
  watch: {
    paymentTerms() {
      const futureDate = new Date();
      //added a methid called setDate and parseInt is conversting to integer here
      this.paymentDueDateUnix = futureDate.setDate(
        futureDate.getDate() + parseInt(this.paymentTerms)
      );
      this.paymentDueDate = new Date(
        this.paymentDueDateUnix
      ).toLocaleDateString("en-uk", this.dateOptions);
    },
  },
};
</script>


<style lang="scss" scoped>
//the backgroud on the form is the invoice-wrap
.invoice-wrap {
  position: fixed;
  top: 0;
  left: 0;
  background-color: transparent;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  //to remove the scrollbar when toggling our invoiceModal
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 900px) {
    left: 90px; // adding 90px because of navigation on the left habd side
  }

  .invoice-content {
    position: relative;
    padding: 56px;
    max-width: 700px;
    width: 100%;
    background-color: #11294e;
    color: #ffff;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.6),
      0 2px 4px -1px rgba(100, 71, 71, 0.06);

    h1 {
      margin-bottom: 48px;
      color: #ffff;
    }

    h3 {
      margin-bottom: 16px;
      font-size: 20px;
      color: #e0e0e0;
    }

    h4 {
      color: #00cffd;
      font-size: 16px;
      margin-bottom: 24px;
    }

    //Bill From & Bill To
    .bill-to,
    .bill-from {
      margin-bottom: 48px;

      .location-details {
        gap: 16px;
        div {
          flex: 1;
        }
      }
    }

    //Invoice Work
    .invoice-work {
      .payment {
        gap: 24px;
        div {
          flex: 1;
        }
      }
      .work-items {
        .item-list {
          width: 100%;

          // item table styling
          .table-heading,
          .table-items {
            gap: 16px;
            font-size: 12px;

            .item-name {
              flex-basis: 50%;
            }
            .qty {
              flex-basis: 10%;
            }

            .price {
              flex-basis: 20%;
            }
            .total {
              flex-basis: 20%;
              align-self: center;
            }
          }

          .table-heading {
            margin-bottom: 16px;

            th {
              text-align: left;
            }
          }
          .table-items {
            position: relative;
            margin-bottom: 24px;

            img {
              position: absolute;
              top: 15px;
              right: 0;
              width: 12px;
              height: 16px;
            }
          }
        }

        .button {
          color: #fff;
          background-color: #00b5dd;
          align-items: center;
          justify-content: center;
          width: 100%;

          img {
            margin-left: 4px;
          }
        }
      }
    }

    .save {
      margin-top: 60px;

      div {
        flex: 1;
      }

      .right {
        justify-content: flex-end;
      }
    }
  }

  .input {
    margin-bottom: 24px;
  }

  label {
    font-size: 14px;
    margin-bottom: 6px;
  }

  input,
  select {
    width: 100%;
    background-color: #2689a0;
    color: #fff;
    border-radius: 8px;
    padding: 12px 4px;
    border: none;

    &:focus {
      outline: none;
    }
  }
}
</style>