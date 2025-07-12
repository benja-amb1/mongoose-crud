import { Request, Response } from "express";
import { ArticleRequest } from "../interfaces/ArticleReq.interface";
import mongoose from 'mongoose'
import Article from "../models/article";
import path from 'path'
import fs from 'fs'

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