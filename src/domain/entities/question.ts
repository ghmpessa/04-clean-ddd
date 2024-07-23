import { randomUUID } from "node:crypto"
import { Slug } from "./value-objects/slug"

interface QuestionProps {
  title: string
  content: string
  slug: Slug
  authorId: string
}

export class Question {
  public id: string
  public title: string
  public slug: Slug
  public content: string
  public authorId: string

  constructor({ title, content, authorId, slug }: QuestionProps, id?: string) {
    this.title = title
    this.slug = slug
    this.content = content
    this.authorId = authorId
    this.id = id ?? randomUUID()
  }
}
