const colors = {
  1: "#f97316",
  2: "#22c55e",
  3: "#14b8a6",
  4: "#8b5cf6",
  5: "#ec4899",
  6: "#f43f5e",
};

export default {
  install: (app) => {
    const helper = {
      fileToBase64: async (data) => {
        return new Promise((resolve, reject) => {
          const fr = new FileReader();
          fr.onerror = reject;
          fr.onload = () => {
            resolve(fr.result.split(",")[1]);
          };
          fr.readAsDataURL(data);
        });
      },
      generateRandomColor: () => {
        return colors[Math.ceil(Math.random() * 6)];
      },

      detailedParsedDate(date) {
        return `${helper.timeStampToWeekDay(
          helper.parseDate(date)
        )} ${helper.timeStampToDay(helper.parseDate(date))}
         ${helper.timeStampToMonth(
           helper.parseDate(date)
         )} ${helper.timeStampToHour(helper.parseDate(date))}`;
      },
      parseDate(date) {
        return Date.parse(date);
      },
      timeStampToDay(timestamp) {
        return new Date(timestamp).toLocaleDateString("fa-IR", {
          day: "numeric",
        });
      },
      timeStampToWeekDay(timestamp) {
        return new Date(timestamp).toLocaleDateString("fa-IR", {
          weekday: "long",
        });
      },
      timeStampToMonth(timestamp) {
        return new Date(timestamp).toLocaleDateString("fa-IR", {
          month: "long",
        });
      },
      timeStampToHour(timestamp) {
        return new Date(timestamp).toLocaleTimeString("fa-IR", {
          hour: "numeric",
          minute: "numeric",
        });
      },
      appName: "داشبورد",
      baseUrl: "https://api.tambord.com/",
    };
    app.provide("helper", helper);
  },
};
