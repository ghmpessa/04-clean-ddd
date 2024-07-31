import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'

export interface QuestioncommentProps extends CommentProps {
  questionId: UniqueEntityId
}

export class Questioncomment extends Comment<QuestioncommentProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<QuestioncommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const questioncomment = new Questioncomment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return questioncomment
  }
}
