//protocol.js:
class ProtocolAdapter {
    async signup(userData) {}
   
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
}
class WebSocketAdapter extends ProtocolAdapter {
    constructor() {
        super();
        this.ws = new WebSocket("ws://localhost:9001/signupWS");
        this.ready = new Promise(resolve => {
            this.ws.onopen = () => resolve();
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
}

let protocol = "ws"; // یا "ws"
let adapter;

if (protocol === "http") {
    adapter = new HTTPAdapter();
} else {
    adapter = new WebSocketAdapter();
}