type Card = {
  id: number;
  question: string;
  answer: string;
  priority: number; // Чем меньше число, тем раньше повтор
  ef: number; // Коэффициент сложности
};
//grade - 5 4 3 2

class FlashcardTrainer {
  private queue: Card[];

  constructor(cards: Card[]) {
    this.queue = cards.sort((a, b) => a.priority - b.priority);
  }

  reviewCard() {
    if (!this.queue.length) return;

    const card = this.queue.shift();
    console.log(`Вопрос: ${card?.question}`);

    // Запрашиваем оценку от пользователя (имитация)
    const grade = Number(prompt("Оценка (0-5): "));

    if (card) this.updateCard(card, grade);
  }

  updateCard(card: Card, grade: number) {
    // Обновляем сложность (EF)
    card.ef = Math.max(
      1.3,
      card.ef + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
    );

    // Вычисляем новый приоритет на основе E-Factor
    if (grade === 5) card.priority += Math.round(card.ef * 10);
    else if (grade === 4) card.priority += Math.round(card.ef * 5);
    else if (grade === 3) card.priority += Math.round(card.ef * 2);
    else card.priority = 1;

    // Вставляем карточку обратно с учётом нового приоритета
    this.queue.push(card);
    this.queue.sort((a, b) => a.priority - b.priority);
  }
}

// Пример
const cards: Card[] = [
  {
    id: 1,
    question: "Apple на русском?",
    answer: "Яблоко",
    priority: 1,
    ef: 2.5,
  },
  {
    id: 2,
    question: "Car на русском?",
    answer: "Машина",
    priority: 2,
    ef: 2.5,
  },
];

const trainer = new FlashcardTrainer(cards);
trainer.reviewCard(); // Запуск
