# invoice

![project-image-2](https://user-images.githubusercontent.com/85754527/162850867-5505e61b-9424-47be-935c-d21c4916aa86.jpg)


Learning Vue, Vuex & Firebase

## Project setup
```
npm install -- This will install all the dependencies that i need in this project




```

### Compiles and hot-reloads for development
```
npm run serve --- This will serving and running for our localserver

If you want to start this project offline just oprn your cmd and click npm run serve
```

### Compiles and minifies for production
```
npm run build --- to build another different serve to run
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Dependencies that i use in the project

 "uid": "^2.0.0", use it to get unique-id in the Invoice-App  

 "vue": "^3.0.11", Use the Vue3 version of Vue

  "vue-router": "^4.0.0-0",

 "vuex": "^4.0.0-0", Using Vuex for state management

### Create a Component folder in the src and inside the components folder i created a Navigation.vue file.

## working with the responsive of 900px --- if is below 900px it will change to row on Navigation --- if is above 900px it will change on Navigation to columns and A message will popup on the screen

## Displaying some information on the Home.vue
### 

### Went to Firebase that is Firebase Console and create a new folder and i name it Customer Invoice App and i remove Google analystics ### npm install firebase
 i locate Firebase database and i create a database for this project
 And after loading i click the test-mode and i next and enabling the firebase so that it can Provison the cloud firebase

 Then i start to create start collection ### I need to connect the frontend to the backend now. so, i went back to project overview in firebase and on the screen i click on webapp to register my app, so that i can add it to frontend to backend

### I create a folder inside the src folder namely: Firebase and also inside the Firebase folder i create a file namely: firebaseinit.js == the place where i can connect to the backend

## To install them, you can run: npm install --save firebase/app firebase/firestore I install this to get access to firebase


### inside components i created a preloader.vue file --- 
  This where loading snippets is created and i imported the components inside InvoiceModal.vue file

  added the componenet <Preloader /> inside the form in InvoiceModal.vue the added inside the preloader
 a data value (v-show) <Preloader v-show="preloader" /> then i end back to data() options to create the preloader as null object

 ### Created a new file name Modal.vue inside components
 This where i created a pop up message and after then I imported the compenent into the entire application that is APP.vue then i place it above transition index <Modal /> 
 
  ###modalActive area 

 Now, i need add some functionality to it ----- 
 I went back to store folder and locate the index.js, Inside the index.js i created new state value ( modalActive: null,)  and i created a new mutations and inside the mutations i added ( TOGGLE_MODAL(state) {
      state.modalActive = !state.modalActive
    },) 
Then i head back to App.vue inside the computed: i added this (...mapState(["invoiceModal", "modalActive"])) 
Then i created a condition i went back to <Modal /> and add ( <Modal v-if="modalActive" />)

I went back to InvoiceModal and i puck the function that have i created before that is "checkClick"

went down to methods: {} and create functionality for this below 


//this checkClick is determining when a user click outside anyway on the browser then Toggle left will disappear


# This optional --- You can connect to MySQL database applying NodeJs with it, instead of Firebase

### Connecting to the backend (Database) using this command line

npm i express --save
It will install Express Framework to work with Nodejs effectively and easily

npm i mysql --save //YTou can get a problem running this because of the lastest version of MySQL update.
 So, you can install this "npm run i mysql".

Using mySQL Database Mangement System for backend

#### Go to your terminal and run this to refresh the connection of the database 

run "node server.js"

### Working on the backend --- Storing information in the database

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;

I use this above in MySql work bench
