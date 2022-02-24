import { createStore } from 'vuex';
import db from "@/firebase/firebaseInit";

export default createStore({
  state: {
    invoiceModal: null, // i want to toggle the naviagtion to true to false // false to true
    modalActive: null,
    invoiceData: [],
    invoicesLoaded: null,
    //This is apply in invoiceView.vue file
    currentInvoiceArray: null,
  },
  mutations: {
    //the toggle-invoice i pass the state inside the function
    // ! sign means opposite
    TOGGLE_INVOICE(state) {
      state.invoiceModal = !state.invoiceModal;
    },

    TOGGLE_MODAL(state) {
      state.modalActive = !state.modalActive;
    },

    SET_INVOICE_DATA(state, payload) {
      state.invoiceData.push(payload);
      // console.log(state.invoiceData);
    },

    INVOICES_LOADED(state) {
      state.invoicesLoaded = true;
      //I return to App.vue to pass a function in it
    },
    // This working for the populating of Unique ID for InvoiceView.vue file
    SET_CURRENT_INVOICE(state, payLoad) {
       state.currentInvoiceArray = state.invoiceData.filter(invoice => {
         return invoice.invoiceId === payLoad;
      });
     }
  },
  actions: {
    //to retrieve the data from firebase
    // I commit in here and state value // pass async to await the data from the firebase
    async GET_INVOICES({ commit, state }) {
      const getData = db.collection("invoices");
      const results = await getData.get();
      // iterating this results using for each loop // doc is a firebase world // => means arrow function
      results.forEach((doc) => {
        // pass invoice  as our parameter here
        if (!state.invoiceData.some(invoice => invoice.docId === doc.id)) {
          const data = {
            docId: doc.id,
            invoiceId: doc.data().invoiceId,
            billerStreetAddress: doc.data().billerStreetAddress,
            billerCity: doc.data().billerCity,
            billerZipCode: doc.data().billerZipCode,
            billerCountry: doc.data().billerCountry,
            customerName: doc.data().customerName,
            customerEmail: doc.data(). customerEmail,
            customerStreetAddress: doc.data().customerStreetAddress,
            customerCity: doc.data().customerCity,
            customerZipCode: doc.data().customerZipCode,
            customerCountry: doc.data().customerCountry,
            invoiceDateUnix: doc.data().invoiceDateUnix,
            invoiceDate: doc.data().invoiceDate,
            paymentTerms: doc.data().paymentTerms,
            paymentDueDateUnix: doc.data().paymentDueDateUnix,
            paymentDueDate: doc.data().paymentDueDate,
            productDescription: doc.data().productDescription,
            invoiceItemList: doc.data().invoiceItemList,
            invoiceTotal: doc.data().invoiceTotal,
            invoicePending: doc.data().invoicePending,
            invoiceDraft: doc.data().invoiceDraft,
            invoicePaid: doc.data().invoicePaid,
          };
          commit('SET_INVOICE_DATA', data);
        }
      });
      commit('INVOICES_LOADED');
    },


  },
  modules: {
  },
});