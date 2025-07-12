import { Schema, model } from 'mongoose'

interface ArticleInterface {
  title: string;
  subtitle: string;
  content: string;
  images: string[]
}

const ArticleSchema = new Schema<ArticleInterface>(
  {
    title: { type: String, required: true, minlength: 5, maxlength: 100 },
    subtitle: { type: String, required: true, minlength: 5, maxlength: 100 },
    content: { type: String, required: true, minlength: 5 },
    images: { type: [String], required: true }
  },
  { versionKey: false, timestamps: true }
)

export default model('Articles', ArticleSchema, 'articles');