import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2024, 0, 20) }))
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2024, 0, 14) }))
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2024, 0, 16) }))
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2024, 0, 18) }))

    const { questions } = await sut.execute({ page: 1 })

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 18) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 16) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 14) }),
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let index = 1; index <= 22; index++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const { questions } = await sut.execute({ page: 2 })

    expect(questions).toHaveLength(2)
  })
})
