import { Slug } from './slug'

test('it should be able to create a slug from text', () => {
  const slug = Slug.createFromText(
    'In portuguese, the word "programming" is "programação".',
  )

  expect(slug.value).toEqual(
    'in-portuguese-the-word-programming-is-programacao',
  )
})
