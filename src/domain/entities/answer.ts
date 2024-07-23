import { randomUUID } from "node:crypto"

interface AnswerProps {
  content: string
  authorId: string
  questionId: string
}

export class Answer {
  public id: string
  public content: string
  public authorId: string
  public questionId: string

  constructor({ content, authorId, questionId }: AnswerProps, id?: string) {
    this.content = content
    this.authorId = authorId
    this.questionId = questionId
    this.id = id ?? randomUUID()
  }
}
