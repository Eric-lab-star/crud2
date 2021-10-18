const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");

const addComment = (text) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  newComment.appendChild(icon);
  newComment.appendChild(span);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;

  const videoId = videoContainer.dataset.id;
  if (textarea === "") {
    return;
  }

  const { status } = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  textarea.value = "";
  if (status === 201) {
    addComment(text);
  }
};
if (form) {
  form.addEventListener("submit", handleSubmit);
}
