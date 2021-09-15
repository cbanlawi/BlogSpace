let postsArray = [];
const titleInput = document.getElementById("post-title");
const bodyInput = document.getElementById("post-body");
const form = document.getElementById("post-form");

function renderPosts() {
  let postInfo = "";

    postsArray.forEach(post => {
      postInfo += `
        <div class="individual-post">     
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </div>
      `;
    });

    document.querySelector(".post-container").innerHTML = postInfo;
};

fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response => response.json())
  .then(data => {
    postsArray = data.slice(0, 5);

    renderPosts();
  });

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const postTitle = titleInput.value;
    const postBody = bodyInput.value;
    const postData = {
      title: postTitle,
      body: postBody
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(post => {
        
        postsArray.unshift(post);
        renderPosts();

        // titleInput.value = "";
        // bodyInput.value = "";
        form.reset();
      });
  });
