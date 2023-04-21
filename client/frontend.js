import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

console.log("ololo");

const app = createApp({
  data() {
    return {
      loading: false,
      form: {
        name: "",
        value: "",
      },
      contacts: [],
    };
  },
  computed: {
    canCreate() {
      return this.form.value.trim() && this.form.value.trim();
    },
  },
  methods: {
    async createContact() {
      const { ...contact } = this.form;

      const newContact = await request("/api/contacts", "POST", contact);

      this.contacts.push(newContact);

      this.form.name = this.form.value = "";
    },
    markContact(id) {
      const contact = this.contacts.find((elem) => elem.id === id);
      contact.marked = true;
    },
    removeContact(id) {
      this.contacts = this.contacts.filter((el) => el.id !== id);
    },
  },
  // mounted saiys that our vue is ready. We make it async and wait antil our function request run
  async mounted() {
    this.loading = true;
    const data = await request("/api/contacts");
    this.contacts = data;
    this.loading = false;
  },
});

app.component(
  // the registered name
  "Loader",
  // the implementation
  {
    template: `
    <div style="display: flex;justify-content: center;align-items: center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  `,
  }
);

app.mount("#app");

// Service to get data
async function request(url, method = "GET", data = null) {
  try {
    const headers = {};
    let body;

    if (data) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }

    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    return await response.json();
  } catch (err) {
    console.warn("Error", err.message);
  }
}
