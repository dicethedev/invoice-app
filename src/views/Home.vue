<template>
  <div class="home container">
    <!-- Header -->
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>Invoices</h1>
        <span>There are 4 total invoices</span>
      </div>

      <div class="right flex">
        <!-- @click is Vue function working with Events and that is the shortcut for v-on -->
        <div @click="toggleFilterMenu" class="status flex">
          <span>Invoices by status</span>
          <img src="@/assets/icon-arrow-down.svg" alt="" />

          <!-- The Dropdown action is and the v-show is the vue function from vue -->
          <ul v-show="filterMenu" class="status-menu">
            <li>Drafted</li>
            <li>Pending</li>
            <li>Paid</li>
            <li>Clear Status</li>
          </ul>
        </div>

        <div @click="newInvoice" class="button flex">
          <div class="inner-button flex">
            <img src="@/assets/icon-plus.svg" alt="" />
          </div>
          <span>New Invoice</span>
        </div>
      </div>
    </div>

    <!-- Invoices area -->
    <!-- Div was created before a condition was inside it -->
    <!-- Pass a condition inside because if the their is no invoices in the application you will know that is no invoices inside the app -->
    <!-- invoiceData.length > 3 -->
    <div v-if="invoiceData.length > 0">
      <!-- itetaring through using v-for and also a v-bind is inside the Invoice Component (:invoice) -->
      <Invoice
        v-for="(invoice, index) in invoiceData"
        :invoice="invoice"
        :key="index"
      />
    </div>
    <!-- Output this condition in the new div here -->
    <div v-else class="oops flex flex-column">
      <img src="@/assets/illustration-opps.svg" alt="" />
      <h1>oops!</h1>
      <h3>There no invoices here!</h3>
      <p>
        Create a new invoice by clicking the New Invoice button and get started
        with this Appliaction.
      </p>
    </div>
  </div>
</template>


<script>
import Invoice from "@/components/Invoice.vue";
// add mapState inside Home.vue to display or populate each invoice from database (Firebase)
// And I also added a computed method where the mapstate is defined for use
import { mapMutations, mapState } from "vuex";
export default {
  name: "Home",
  data() {
    //displaying the dropdown menu here
    return {
      filterMenu: null,
      filterInvoice: null,
    };
  },
  components: {
    Invoice,
  },
  methods: {
    ...mapMutations(["TOGGLE_INVOICE"]),
    //when you click on New Invoice that will run on the function inside newInvoice
    //created a function for the @click = "newInvoice" & @click ="toggleFilterMenu"
    newInvoice() {
      this.TOGGLE_INVOICE(); //when you now click on new invoice it will display New information out from the left hand side
    },

    toggleFilterMenu() {
      //altering the condition for Dropdowning the dropdown menu
      //this.filterMenu is opposite to the other filter below (from Flase to True or True to False)
      this.filterMenu = !this.filterMenu;
    },
  },

  computed: {
    ...mapState(["invoiceData"]),
    // After this place... I went back up to add a div to display the information
  },
};
</script>



<style lang="scss" scoped>
.home {
  color: #fff;

  .header {
    margin-bottom: 65px;

    .left,
    .right {
      flex: 1;
    }

    .right {
      justify-content: flex-end;
      align-items: center;

      .button,
      .status {
        align-items: center;

        span {
          font-size: 16px;
        }
      }

      .status {
        position: relative;
        margin-right: 40px;

        span,
        img {
          pointer-events: none;
        }

        img {
          margin-left: 12px;
          width: 9px;
          height: 5px;
        }

        //Dropdown menu styling is here
        .status-menu {
          width: 120px;
          position: absolute;
          top: 25px;
          list-style: none;
          background-color: #0e203d;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(100, 71, 71, 0.06);

          li {
            cursor: pointer;
            font-size: 12px;
            padding: 10px 12px;

            &:hover {
              color: #0e203d;
              background-color: #fff; //BG color of the list items
            }
          }
        }
      }

      .button {
        padding: 8px 10px;
        background-color: #00cffd;
        border-radius: 40px;

        .inner-button {
          margin-right: 8px;
          border-radius: 50%;
          padding: 8px;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          img {
            width: 10px;
            height: 10px;
          }
        }
      }
    }
  }

  .oops {
    margin-top: 160px;
    align-items: center;

    img {
      width: 214px;
      height: 200px;
    }

    h1 {
      margin-top: 10px;
      text-transform: uppercase;
    }

    h3 {
      font-size: 20px;
      margin-top: 20px;
      text-transform: uppercase;
    }
    p {
      text-align: center;
      max-width: 250px;
      font-size: 13px;
      font-weight: 300;
      margin-top: 16px;
    }
  }
}
</style>