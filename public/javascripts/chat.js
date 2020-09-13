const app = {
  init: () => {
    app.addEventHandlers();
  },
  addEventHandlers: () => {
    const addUser = document.getElementById("user-form");
    const addComment = document.getElementById("comment-form");
    addUser && addUser.addEventListener("submit", app.submitUser);
    addComment && addComment.addEventListener("submit", app.submitComment);
  },
  submitUser: async (e) => {
    e.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    try {
      await axios.post("/users", { name, email });
      app.getUser();
    } catch (err) {
      console.error(err);
    }
    app.clearForm("users");
  },
  submitComment: async (e) => {
    e.preventDefault();
    const userid = document.querySelector("#userid").value;
    const comment = document.querySelector("#comment").value;

    try {
      await axios.post("/comments", { userid, comment });
      app.getComment(userid);
    } catch (err) {
      console.error(err);
    }
    app.clearForm("comments");
  },
  getUser: async () => {
    try {
      const res = await axios.get("/users");
      const users = res.data;
      const tbody = document.querySelector("#user-table tbody");
      tbody.innerHTML = "";
      users.map((user) => {
        const row = document.createElement("tr");
        let td = document.createElement("td");
        td.textContent = user.id;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = user.name;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = user.email;
        row.appendChild(td);
        tbody.appendChild(row);
      });
    } catch (err) {
      console.error(err);
    }
  },
  getComment: async (userid) => {
    try {
      const res = await axios.get(`/comments`);
      const comments = res.data;
      const tbody = document.querySelector("#comment-table tbody");
      tbody.innerHTML = "";
      comments.map((comment) => {
        const row = document.createElement("tr");
        let td = document.createElement("td");
        td.textContent = comment.id;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = comment.User.name;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = comment.comment;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = "수정";
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = "삭제";
        row.appendChild(td);
        tbody.appendChild(row);
      });
    } catch (err) {
      console.error(err);
    }
  },
  clearForm: (table) => {
    if (table === "users") {
      document.querySelector("#name").value = "";
      document.querySelector("#email").value = "";
    }
    if (table === "comments") {
      document.querySelector("#userid").value = "";
      document.querySelector("#comment").value = "";
    }
  },
};

app.init();
