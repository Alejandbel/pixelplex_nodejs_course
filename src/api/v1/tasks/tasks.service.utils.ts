export const isAnswerCorrect = (answer: string, word: string): boolean => {
  return answer.trim().toLowerCase() === word.trim().toLowerCase();
};
