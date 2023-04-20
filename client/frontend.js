import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

console.log(createApp);

createApp({
  data() {
    return {
      form: {
        name: "",
        value: "",
      },
      contacts: [
        { id: 1, name: "Liza", value: "+46-76-747-85-07", marked: false },
      ],
    };
  },
  computed: {
    canCreate () {
      return this.form.value.trim() && this.form.value.trim()
    }
  },
  methods: {
    createContact() {
      const { ...contact } = this.form;
      this.contacts.push({ ...contact, id: Date.now() });

      this.form.name = this.form.value = "";
    },
    markContact(id) {
      const contact = this.contacts.find((elem) => elem.id === id);
      contact.marked = true;
    },
    removeContact(id) {},
  },
}).mount("#app");
