const app = {
  init: () => {
    app.addEventHandlers();
    app.loadUsers();
    app.loadComments();
  },
  addEventHandlers: () => {
    const addUser = document.getElementById("user-form");
    const addComment = document.getElementById("comment-form");
    addUser && addUser.addEventListener("submit", app.submitUser);
    addComment && addComment.addEventListener("submit", app.submitComment);
  },

  /* 유저 로딩 */
  loadUsers: async () => {
    try {
      const res = await axios.get(`/users`);
      const users = res.data;
      app.renderUsers(users);
    } catch (err) {
      console.error(err);
    }
  },
  /* 댓글 로딩 */
  loadComments: async () => {
    try {
      const res = await axios.get(`/comments`);
      const comments = res.data;
      app.renderComments(comments);
    } catch (err) {
      console.error(err);
    }
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
    console.log(userid, comment);
    try {
      await axios.post("/comments", { userid, comment });
      app.getComment();
    } catch (err) {
      console.error(err);
    }
    app.clearForm("comments");
  },
  getUser: async () => {
    try {
      const res = await axios.get("/users");
      const users = res.data;
      app.renderUsers(users);
    } catch (err) {
      console.error(err);
    }
  },
  getComment: async (userid) => {
    try {
      if (!userid) {
        const res = await axios.get(`/comments`);
        const comments = res.data;
        app.renderComments(comments);
      } else {
        /* Filtering */
        const res = await axios.get(`/users/${userid}`);
        const comments = res.data;
        app.renderComments(comments);
      }
    } catch (err) {
      console.error(err);
    }
  },
  renderUsers: (users) => {
    const tbody = document.querySelector("#user-table tbody");
    tbody.innerHTML = "";
    users.map((user) => {
      const row = document.createElement("tr");
      let td = document.createElement("td");
      td.textContent = user.id;
      row.appendChild(td);
      td = document.createElement("td");
      td.textContent = user.name;
      td.classList.add("filter");
      td.addEventListener("click", () => app.getComment(user.id));
      row.appendChild(td);

      td = document.createElement("td");
      td.textContent = user.email;
      row.appendChild(td);

      tbody.appendChild(row);
    });
  },
  renderComments: (comments) => {
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

      const edit = document.createElement("td");
      edit.textContent = "수정";
      edit.classList.add("edit");
      edit.addEventListener("click", () => app.handleEdit(comment.id));
      row.appendChild(edit);

      const remove = document.createElement("td");
      remove.textContent = "삭제";
      remove.classList.add("remove");
      remove.addEventListener("click", () => app.handleRemove(comment.id));
      row.appendChild(remove);

      tbody.appendChild(row);
    });
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
  handleEdit: async (id) => {
    const newComment = prompt("바꿀 내용을 입력하세요");
    if (!newComment) {
      return alert("내용을 필수로 입력하셔야 됩니다.");
    }
    try {
      await axios.patch(`/comments/${id}`, { comment: newComment });
      app.getComment();
    } catch (err) {
      console.error(err);
    }
  },
  handleRemove: async (id) => {
    try {
      await axios.delete(`/comments/${id}`);
      app.getComment();
    } catch (err) {
      console.error(err);
    }
  },
};

app.init();
