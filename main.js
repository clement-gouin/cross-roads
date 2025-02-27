/* exported app */

const HELP_HEADER = ["Title and description (html, <h1> on plain text)"];
const HELP_PART = ["Link", "Label (html)"];

let app = {
  data() {
    return {
      debug: true,
      debugData:
        "Where to find me\nhttps://www.youtube.com/watch?v=dQw4w9WgXcQ\n🎥 | My Youtube Channel\nhttps://www.instagram.com/officialrickastley\n📷 | My Instagram Profile\nhttps://open.spotify.com/artist/0gxyHStUsqpMadRV0Di1Qt\n🎵 | My Spotify",
      header: "",
      links: [],
      debugUrl: "",
      editor: {
        numbersCols: 0,
        numbersText: "",
        overlayText: "",
      },
    };
  },
  computed: {
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
      this.updateEditor(value);
      this.updateDebugUrl(value);
    },
  },
  methods: {
    showApp() {
      document.getElementById("app").setAttribute("style", "");
    },
    updateDebugUrl(value) {
      this.debugUrl = value.trim().length
        ? window.location.pathname + "?z=" + this.encodeData(value.trim())
        : "";
    },
    updateEditor(value) {
      const debugDataSplit = value.split("\n");
      let size = HELP_HEADER.length + HELP_PART.length;
      while (debugDataSplit.length > size) {
        size += HELP_PART.length;
      }
      const lines = Array(size).fill(0);
      this.editor.numbersText = lines.map((v, i) => `${i + 1}.`).join("\n");
      this.editor.overlayText = lines
        .map((v, i) => {
          if (debugDataSplit.length > i && debugDataSplit[i].trim().length) {
            return " ".repeat(debugDataSplit[i].length);
          }
          if (HELP_HEADER.length > i) {
            return HELP_HEADER[i];
          }
          return HELP_PART[(i - HELP_HEADER.length) % HELP_PART.length];
        })
        .join("\n");
      this.editor.numbersCols = lines.length.toString().length + 1;
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
      this.header = parts.shift();
      if (!/<[^>]*>/.test(this.header)) {
        this.header = `<h1>${this.header}</h1>`;
      }
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
        this.updateEditor(this.debugData);
        this.updateDebugUrl(this.debugData);
      }
    },
    updateIcons() {
      lucide.createIcons({
        nameAttr: "icon",
        attrs: {
          width: "1.1em",
          height: "1.1em",
        },
      });
    },
  },
  beforeMount: function () {
    this.initApp();
  },
  mounted: function () {
    console.log("app mounted");
    setTimeout(this.showApp);
    this.updateIcons();
    this.$refs.code?.addEventListener("scroll", () => {
      this.$refs.numbers.scrollTop = this.$refs.code.scrollTop;
      this.$refs.overlay.scrollTop = this.$refs.code.scrollTop;
      this.$refs.overlay.scrollLeft = this.$refs.code.scrollLeft;
    });
  },
  updated: function () {
    this.updateIcons();
  },
};

window.onload = () => {
  app = Vue.createApp(app);
  app.mount("#app");
};
