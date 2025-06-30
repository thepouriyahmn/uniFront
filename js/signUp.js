  //signUp.js:
  async function signUp() {
        const studentSelected = document.getElementById("studentCheckbox").checked;
        const professorSelected = document.getElementById("professorCheckbox").checked;
      let data={
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            studentRole: studentSelected,
            professorRole:  professorSelected
        }

   console.log(data.password)
        const regex = /^[a-zA-Z0-9]{6,}$/;
    if (!regex.test(data.password)) {
        alert("از رمز قوی تر استفاده کنید");
        return;
    }

    const response = await adapter.signup(data);

    if (response.ok) {
        alert("Signup successful!");
        window.location.href = "http://localhost:9000/loginPage";
    } else if (response.status === 409) {
        alert("Signup failed: Username already exists");
    } else if (response.status === 400) {
        alert("رمز عبور ضعیف است");
    } else {
        alert("Unexpected error: " + response.status);
    }
    }
    window.signUp=signUp