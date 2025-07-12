## What is Multer, fs, and path?

- **Multer**: A middleware for handling file uploads in Node.js. It processes `multipart/form-data` and saves files (like images) to your server.

- **fs**: The Node.js File System module. It allows you to read, write, delete, and manage files and directories on the server.

- **path**: A Node.js module used to handle and format file paths safely across different operating systems.

[Español](https://github.com/benja-amb1/multer-crud-es)

# Multer CRUD

Basic CRUD for articles with image upload, update, and deletion using **Express**, **Multer**, and **MongoDB**.

---

## Main Features

- Create articles with images (`POST /api/articles`)
- Update articles and replace images (`PUT /api/articles/:id`)
- Delete articles and remove associated images (`DELETE /api/articles/:id`)
- Serve static images from the `uploads` folder

---

## Project Steps

1. **Initial setup**
   - Created the Article model (`models/article.ts`)
   - Defined the request interface (`ArticleReq`)

2. **Server setup**
   - Main file (`index.ts`) with MongoDB connection
   - Used middlewares: `express.json()`, `express.urlencoded()`, `cors`
   - Served the `uploads` folder statically (`app.use('/uploads', express.static('uploads'))`)

3. **Routes and controllers**
   - Created CRUD routes in `routes/article.ts`
   - Controller to add articles with images (`addArticle`)
   - Controller to update articles and replace images (`updateArticle`)
   - Controller to delete articles and delete images from server (`deleteArticle`)

4. **Multer usage**
   - Middleware configured to handle file uploads (images)
   - Handled uploaded files in controllers
   - Stored image paths in database

---

## How to run the project

1. Clone the repo

```bash
git clone https://github.com/benja-amb1/multer-crud.git
cd multer-crud
