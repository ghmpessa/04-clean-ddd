import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch question answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    const question = makeQuestion()

    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: question.id }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: question.id }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: question.id }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: question.id }),
    )

    const { answers } = await sut.execute({
      questionId: question.id.toString(),
      page: 1,
    })

    expect(answers).toHaveLength(4)
  })

  it('should be able to fetch paginated question answers', async () => {
    const question = makeQuestion()

    for (let index = 1; index <= 22; index++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: question.id,
        }),
      )
    }

    const { answers } = await sut.execute({
      questionId: question.id.toString(),
      page: 2,
    })

    expect(answers).toHaveLength(2)
  })
})
