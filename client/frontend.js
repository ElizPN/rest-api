import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

console.log(createApp);

createApp({
  data() {
    return {
      form: {
        name: "",
        value: "",
      },
      contacts: [],
    };
  },
  methods: {
    createContact() {
      const { ...contact } = this.form;
      this.contacts.push({...contact, id: Date.now()})

      this.form.name = this.form.value = ""
    
    },
  },
}).mount("#app");
