const colors ={
    1:'#f97316',
    2:'#22c55e',
    3:'#14b8a6',
    4:'#8b5cf6',
    5:'#ec4899',
    6:'#f43f5e',


}
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
            generateRandomColor: ()=>{
                return colors[Math.ceil(Math.random()*6)]
            },
            appName:'داشبورد',
            baseUrl :'https://api.1minex.com/'
        }
        app.provide('helper', helper)
    }
}
