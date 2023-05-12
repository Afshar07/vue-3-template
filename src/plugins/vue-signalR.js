import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {useAuthStore} from "@/stores/auth";
        const hub = new HubConnectionBuilder()
            .withUrl("https://api.tambord.com/chatHub", {
                accessTokenFactory: function () {
                    // console.log("Getting token for hub");
                },
            })
            .configureLogging(LogLevel.Information)
            .build();
        hub.on("SendMessage", (res) => {
        });
        hub.on("ReadMessage", (res) => {
        });
        hub.on("DeliverMessage", (res) => {

        });
        async function start() {
            try {
                console.log("Attempting reconnect");
                await hub.start();
            } catch (err) {
                console.log(err);
                setTimeout(() => start(), 5000);
            }
        }
        hub.onclose(async () => {
            await start();
        });
        start()
export default {
    install: (app) => {
        app.provide('hub',hub)
    }
}


// sample sending of message
/*
hub
  .invoke('SendMessageToOthers', {
    action: action,
    data: Object.assign(
      { user: get(store, 'getters.loggedUser.name') },
      message
    )
  })
  .catch(err => console.error(err.toString()))
*/
// }


