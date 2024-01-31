import { html } from "../../node_modules/lit-html/lit-html.js";
import { editBookInfo, getTheBook } from "../api/data.js";

let editTemplate = (book, onEdit) => html` <section class="edit">
  <div class="form">
    <h2 class="edit-Title">Edit Your Book</h2>

    <form class="edit-form" @submit=${onEdit}>
      <span class="input">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          .value=${book.title}
        />
      </span>

      <span class="input">
        <input
          type="text"
          name="type"
          id="type"
          placeholder="type"
          .value=${book.type}
        />
      </span>

      <span class="input">
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          placeholder="Image"
          .value=${book.imageUrl}
        />
      </span>
      <span class="input">
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          .value=${book.description}
        />
      </span>
      <button type="submit">Edit</button>
    </form>
  </div>
</section>`;

export async function showEdit(ctx) {
  let bookId = ctx.params.id;
  let book = await getTheBook(bookId);

  ctx.render(editTemplate(book, onEdit));

  async function onEdit(event) {
    event.preventDefault();

    let formData = new FormData(event.target);

    let title = formData.get("title");
    let type = formData.get("type");
    let description = formData.get("description");
    let imageUrl = formData.get("imageUrl");

    let data = { title, description, imageUrl, type };

    if (
      !title ||
      title.length == 0 ||
      !description ||
      description.length == 0 ||
      !imageUrl ||
      imageUrl.length == 0 ||
      !type ||
      type.length == 0
    ) {
      alert("Please, fill all empty fields!");
      return;
    }

    try {
      await editBookInfo(bookId, data);
      ctx.page.redirect("/details/" + bookId);
    } catch (err) {
      alert(err.message);
      throw err;
    }
  }
}
