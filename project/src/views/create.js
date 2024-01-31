import { html } from "../../node_modules/lit-html/lit-html.js";
import { createBook } from "../api/data.js";
import { bookPreview } from "./bookPreview.js";

let createTemplate = (onCreate) => html`

<div class="createForm-container">
   <form id="create-form" @submit=${onCreate} action="" method="">
     <h2>Add new Book</h2>
      <div class="field">
        <label for="title">Title</label>
        <span class="input">
          <input type="text" name="title" id="title" placeholder="Title" />
        </span>
      </div>
      <div class="field">
        <label for="description">Description</label>
        <span class="input">
          <input
            name="description"
            id="description"
            placeholder="Description"
         />
        </span>
      </div>
      <div class="field">
        <label for="image">Image</label>
        <span class="input">
          <input type="text" name="imageUrl" id="image" placeholder="Image" />
        </span>
      </div>
      <div class="field">
        <label for="type">Type</label>
        <span class="input">
          <select id="type" name="type">
            <option value="Fiction">Fiction</option>
            <option value="Romance">Romance</option>
            <option value="Mistery">Mistery</option>
            <option value="Classic">Clasic</option>
            <option value="Other">Other</option>
          </select>
        </span>
      </div>
      <input class="button submit" type="submit" value="Add Book" />
  </form>
</div>
 
`;


export async function showCreate(ctx){
    ctx.render(createTemplate(onCreate));

    async function onCreate(event){
        event.preventDefault();

        let formData = new FormData(event.target);
        let title = formData.get('title').trim();
        let description = formData.get('description').trim();
        let imageUrl = formData.get('imageUrl').trim();
        let type = formData.get('type').trim();

        if(title.length ==0 || description.length ==0 || imageUrl.length ==0 || type.length ==0){
            return alert("Please, fill all fields!");
        }

        await createBook({title, description, imageUrl, type});

        ctx.page.redirect('/catalog');
    }
}
