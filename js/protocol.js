//protocol.js:
class ProtocolAdapter {
    async signup(userData) {}
   async login(data) {}
}
class HTTPAdapter extends ProtocolAdapter {
    async signup(userData) {
        const res = await fetch("http://localhost:9001/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        return res;
    }
    async login(data){
  let loginRequest = await fetch("http://localhost:9001/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return loginRequest
    }

}
class WebSocketAdapter extends ProtocolAdapter {
    constructor() {
        super();
        this.ws = new WebSocket("ws://localhost:9001/signupWS");
        this.ready = new Promise(resolve => {
            this.ws.onopen = () => resolve();
        });
          this.loginWS = new WebSocket("ws://localhost:9001/loginWS");
        this.loginReady = new Promise(resolve => {
            this.loginWS.onopen = () => resolve();
        });
    }

    async signup(userData) {
        await this.ready;

        return new Promise((resolve, reject) => {
            this.ws.onmessage = (msg) => {
                const data = JSON.parse(msg.data);
                resolve({
                    ok: data.status === "ok",
                    status: data.status,
                    message: data.message
                });
            };

            this.ws.onerror = reject;

            this.ws.send(JSON.stringify({
                action: "signup",
                username: userData.username,
                password: userData.password,
                studentRole: userData.studentRole,
                professorRole: userData.professorRole
            }));
        });
    }
       async login(data){
   
    await this.loginReady;  // انتظار باز شدن کانکشن loginWS

    return new Promise((resolve, reject) => {
        this.loginWS.onmessage = (msg) => {
            const resData = JSON.parse(msg.data);
            resolve({
                ok: resData.status === "ok",
                status: resData.code, // مثل 401، 200 و غیره
                json: async () => resData,
            });
            console.log("msg is: ", msg);
        };

        this.loginWS.onerror = reject;

        this.loginWS.send(JSON.stringify({
            username: data.username,
            password: data.password
        }));
    });
}

}


let protocol = "ws"; 
let adapter;

if (protocol === "http") {
    adapter = new HTTPAdapter();
} else {
    adapter = new WebSocketAdapter();
}