/* exported app */

let app = {
  data() {
    return {
      debug: true,
      debugData:
        "Where to find me\nhttps://www.youtube.com/watch?v=dQw4w9WgXcQ\n🎥 | My Youtube Channel\nhttps://www.instagram.com/officialrickastley\n📷 | My Instagram Profile\nhttps://open.spotify.com/artist/0gxyHStUsqpMadRV0Di1Qt\n🎵 | My Spotify",
      title: "",
      links: [],
    };
  },
  computed: {
    debugUrl() {
      return window.location.pathname + "?z=" + this.encodeData(this.debugData);
    },
    success() {
      const self = this;
      return this.questions.every(
        (q) =>
          q.expected == null ||
          (q.answers.length === 1 &&
            self.normalize(q.value).includes(self.normalize(q.expected))) ||
          q.value === q.expected
      );
    },
  },
  watch: {
    debugData(value) {
      this.readZData(value);
    },
  },
  methods: {
    showApp() {
      document.getElementById("app").setAttribute("style", "");
    },
    submit() {
      this.readonly = true;
    },
    retry() {
      this.readonly = false;
      this.questions.forEach((question) => {
        question.value = "";
      });
    },
    base64URLTobase64(str) {
      const base64Encoded = str.replace(/-/g, "+").replace(/_/g, "/");
      const padding =
        str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
      return base64Encoded + padding;
    },
    base64tobase64URL(str) {
      return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    },
    decodeData(str) {
      return LZString.decompressFromBase64(
        this.base64URLTobase64(str.split("").reverse().join(""))
      );
    },
    encodeData(str) {
      return this.base64tobase64URL(LZString.compressToBase64(str))
        .split("")
        .reverse()
        .join("");
    },
    normalize(str) {
      return str
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    },
    readZData(str) {
      this.debugData = str;
      const parts = str.trim().split("\n");
      if (parts.length < 1) {
        return true;
      }
      this.title = parts.shift();
      this.links = [];
      while (parts.length >= 2) {
        this.links.push({
          href: parts.shift(),
          label: parts.shift(),
        });
      }
      return false;
    },
    initApp() {
      const url = new URL(window.location);
      if (url.searchParams.get("z") !== null) {
        this.debug = this.readZData(this.decodeData(url.searchParams.get("z")));
      }
      if (this.debug) {
        this.readZData(this.debugData);
      }
    },
  },
  beforeMount: function () {
    this.initApp();
  },
  mounted: function () {
    console.log("app mounted");
    setTimeout(this.showApp);
  },
};

window.onload = () => {
  app = Vue.createApp(app);
  app.mount("#app");
};
