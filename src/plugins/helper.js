export default {
    install: (app) => {
        const helper = {
            fileToBase64: async (data) => {
                return new Promise((resolve, reject) => {
                    const fr = new FileReader();
                    fr.onerror = reject;
                    fr.onload = () => {
                        resolve(fr.result.split(",")[1]);
                    }
                    fr.readAsDataURL(data);
                });
            },
            appName:'داشبورد',
            baseUrl :'https://api.1minex.com/'
        }
        app.provide('helper', helper)
    }
}
