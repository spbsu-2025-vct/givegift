import { NUM_OF_GENERATED_IDEAS } from './constants.js'

export const generateSystemPrompt = () => {
  return `Вы — ИИ-ассистент, специализирующийся на подборе подарков.
При получении списка интересов пользователя сгенерируйте ровно ${NUM_OF_GENERATED_IDEAS} идей подарков.
Выводите **только** названия подарков — без описаний и комментариев.
Верните результат как JSON-объект с единственным ключом "gifts", значением которого является массив строк.`
}

export const generateUserPrompt = (interests) => {
  return `{
  "interests": ${JSON.stringify(interests)}
}`
}
