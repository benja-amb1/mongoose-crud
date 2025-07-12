import { Request, Response } from "express";
import { ArticleRequest } from "../interfaces/ArticleReq.interface";
import mongoose from 'mongoose'
import Article from "../models/article";
import path from 'path'
import fs from 'fs'
import article from "../models/article";

//here we use ArticleRequest
export const addArticle = async (req: ArticleRequest, res: Response): Promise<any> => {
  try {
    const { title, subtitle, content } = req.body;

    // 1. Access uploaded files from Multer
    const images = req.files as Express.Multer.File[];

    // 2. Extract file paths from uploaded images
    const imagesPath = images.map(img => img.path);

    // 3. Validate required fields
    if (!title || !subtitle || !content || !imagesPath.length) {
      return res.status(400).json({ status: false, message: "All fields are required." });
    }

    // 4. Create new article document
    const article = new Article({
      title,
      subtitle,
      content,
      images: imagesPath // ¡¡¡return the imagesPath!!!
    });

    // 5. Save to database
    await article.save();

    // 6. Respond with success
    return res.status(201).json({
      status: true,
      message: "Article created successfully.",
      data: article
    });

  } catch (error) {
    console.error("Error creating article:", error);
    return res.status(500).json({ status: false, message: "Server error." });
  }
};


//here we use ArticleRequest
export const deleteArticle = async (req: ArticleRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: false, message: "Invalid article ID." });
    }

    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ status: false, message: "Article not found." });
    }

    // delete images from disk
    if (article.images && article.images.length > 0) {
      for (const imagePath of article.images) {
        try {
          fs.unlinkSync(path.resolve(imagePath)); // ¡¡¡IMPORTANT!!!
        } catch (err) {
          console.warn(`Could not delete image ${imagePath}:`, err);
        }
      }
    }

    // delete article from DB
    await Article.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      message: "Article deleted successfully.",
    });

  } catch (error) {
    console.error("Error deleting article:", error);
    return res.status(500).json({ status: false, message: "Server error." });
  }
};


//here we use ArticleRequest
export const updateArticle = async (req: ArticleRequest, res: Response): Promise<any> => {
  try {
    const { title, subtitle, content } = req.body;
    const { id } = req.params;

    // 1. Access uploaded files from Multer
    const images = req.files as Express.Multer.File[];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: false, message: "Invalid article ID." });
    }

    if (!title || !subtitle || !content) {
      return res.status(400).json({ status: false, message: "Title, subtitle, and content are required." });
    }


    // 2. ¡IMPORTANT! findById
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ status: false, message: "Article not found." });
    }

    // 3. delete old images
    if (article.images && article.images.length > 0) {
      for (const oldImg of article.images) {
        try {
          fs.unlinkSync(path.join(oldImg));
        } catch (error) {
          console.warn(`Error deleting image ${oldImg}:`, error);
        }
      }
    }

    // 4. Extract file paths from uploaded images
    const imagesPath = images.map(img => img.path);

    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { title, subtitle, content, images: imagesPath }, //return the imagesPath
      { new: true }
    );

    res.status(200).json({ status: true, message: "Article updated successfully.", data: updatedArticle });

  } catch (error) {
    console.error("Error updating article:", error);
    return res.status(500).json({ status: false, message: "Server error." });
  }
};