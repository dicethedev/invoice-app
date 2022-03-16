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
    //This editInvoice is active in the invoiceView in Views Folder
    editInvoice: null,
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
    //available for Edir=t invoice
    TOGGLE_EDIT_INVOICE(state) {
      state.editInvoice = !state.editInvoice;
    },

    DELETE_INVOICE(state, payLoad) {
      state.invoiceData = state.invoiceData.filter(invoice => invoice.docId !== payLoad);
      //I went down to create an action for this DELETE_INVOICE
    },

     //Created a two(2) new mutations here
    UPDATE_STATUS_TO_PAID(state, payLoad) {
       //Iterating through the function using forrach loop
       state.invoiceData.forEach(invoice => {
         if(invoice.docId === payLoad) {
              invoice.invoicePaid = true;
              invoice.invoicePending = false;
         }
       });
     },

    
    
    UPDATE_STATUS_TO_PENDING(state, payLoad) {
       //Iterating through the function using forrach loop
       state.invoiceData.forEach(invoice => {
         if(invoice.docId === payLoad) {
              invoice.invoicePaid = false;
              invoice.invoicePending = true;
              invoice.invoiceDraft = false;
         }
       });
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
            customerEmail: doc.data().customerEmail,
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
    // UPDATE_INVOICE IS WORKING WITH DELETE_INVOICE\
    //Using the docId to pass as a payLoad and delete_Invoice
    //Then I use the routeId inside SET_CURRENT_INVOICE to reset the current Invoice
    async UPDATE_INVOICE({ commit, dispatch }, { docId, routeId }) {
      commit('DELETE_INVOICE', docId);
      await dispatch('GET_INVOICES');
      //commit below will toggle the invoice close and turn off editing invoice state here
      commit('TOGGLE_INVOICE');
      commit('TOGGLE_EDIT_INVOICE');
      commit('SET_CURRENT_INVOICE', routeId);

      //I went back to InvoiceModal.vue to add a fuction in data() and is called the docId: null,
      // and create a function similar to upload and is called  updateInvoice() after uploadInvoice
      //I also pass map the action in the methods area called ...mapActions(['UPDATE_INVOICE']) and 
      //don't forget to import the mapActions
    },

    //DELETE INVOICE DETAILS Actions is here below\
    //The docId inide the function is the payLoad that is the invoice Id
    async DELETE_INVOICE({commit}, docId){
      //db.collection is from the firebase and the doc is reserved for firebase and it will help to get the currentInvoice
       const getInvoice = db.collection('invoices').doc(docId);
       await getInvoice.delete();
       commit('DELETE_INVOICE', docId);
    },
    
    //This actions is for UPADTE_STATUS_TO_PENDING & UPADTE_STATUS_TO_PAID
    async UPDATE_STATUS_TO_PAID(commit, docId) {
      const getInvoice = db.collection('invoices').doc(docId);
      await getInvoice.update({
        invoicePaid: true,
        invoicePending: false,
      });
      commit('UPDATE_STATUS_TO_PAID', docId);
    },

    async UPDATE_STATUS_TO_PENDING(commit, docId) {
      const getInvoice = db.collection('invoices').doc(docId);
      await getInvoice.update({
        invoicePaid: false,
        invoicePending: true,
        invoiceDraft: false,
      });
      commit('UPDATE_STATUS_TO_PENDING', docId);
    }
     //Went back to InvoiceView to map inside mutations and run a function to be effect to the app
  }, 
  modules: {
  },
});