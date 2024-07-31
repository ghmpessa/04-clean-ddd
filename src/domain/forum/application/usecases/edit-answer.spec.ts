import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-01') },
      new UniqueEntityId('answer-01'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-01',
      content: 'Answer content'
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Answer content'
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-01') },
      new UniqueEntityId('answer-01'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    expect(() =>
      sut.execute({
        authorId: 'author-02',
        answerId: newAnswer.id.toString(),
        content: 'Answer content'
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
