"use client";

import { Navbar } from "@/components/shared";

import { FlashCardGame } from "@/logic/fsrs";
import { use, useEffect, useState } from "react";
import { FlashCardsSection } from "./flash-cards-section";
import { ReactButtons } from "./react-buttons";

// Mock data for demonstration
const mockCards = [
  {
    id: "1",
    question: `<h1>Заголовок</h1>
  <p>Абзац с \<b>жирным</b>, <i>курсивом</i> иjdfslakjflaksdjfalskfjaslfjalsjfdaslfslf <code>кодом</code>.</p>
  <ul>
    <li>Элемент списка 1</li>
    <li>Элемент <u>списка</u> 2</li>
  </ul>
  <blockquote>Цитата с <h1>Заh1>Заголовок</h1>
  <p>Абзац с \<b>жирным</b>, <i>курсивом</i> и <code>кодом</code>.</p>
  <ul>
    <li>Элемент списка 1</li>
    <li>Элемент <u>списка</u> 2</li>
  </ul>
  <blockquote>Цитата с <h1>Заh1>Заголовок</h1>
  <p>Абзац с \<b>жирным</b>, <i>курсивом</i> и <code>кодом</code>.</p>
  <ul>
    <li>Элемент списка 1</li>
    <li>Элемент <u>списка</u> 2</li>
  </ul>
  <blockquote>Цитата с <h1>Заh1>Заголовок</h1>
  <p>Абзац с \<b>жирным</b>, <i>курсивом</i> и <code>кодом</code>.</p>
  <ul>
    <li>Элемент списка 1</li>
    <li>Элемент <u>списка</u> 2</li>
  </ul>
  </ul>
  <blockquote>Цитата с <span style="color:red;">цветом</span></blockquote>`,
    answer: `<h1>Заголовок</h1>
  <p>Абзац с \<b>жирным</b>, <i>курсивом</i> и <code>кодом</code>.</p>
  <ul>
    <li>Элемент списка 1</li>
    <li>Элемент <u>списка</u> 2</li>
  </ul>
  <blockquote>Цитата с <span style="color:red;">цветом</span></blockquote>`,
    difficulty: 3,
    lastReviewed: "2 days ago",
    nextReview: "in 1 day",
  },
  {
    id: "2",
    question: "Explain the concept of photosynthesis",
    answer:
      "<p><pre><code class=\"language-javascript\">function test(){ return 'Literature'; }</code></pre></p>",
    difficulty: 7,
    lastReviewed: "1 week ago",
    nextReview: "in 3 days",
  },
  {
    id: "3",
    question: "What is the Pythagorean theorem?",
    answer:
      "The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the lengths of the other two sides: a² + b² = c²",
    difficulty: 5,
    lastReviewed: "3 days ago",
    nextReview: "in 2 days",
  },
  {
    id: "4",
    question: "Define the term 'democracy'",
    answer:
      "Democracy is a system of government in which power is vested in the people, who rule either directly or through freely elected representatives. It is characterized by free and fair elections, protection of individual rights, and the rule of law.",
    difficulty: 4,
    lastReviewed: "5 days ago",
    nextReview: "in 1 week",
  },
];

export default function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: deckId } = use(params);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [game, setGame] = useState<Awaited<
    ReturnType<typeof FlashCardGame>
  > | null>(null);

  const [sessionStats, setSessionStats] = useState({
    total: mockCards.length,
    completed: 0,
    correct: 0,
    incorrect: 0,
  });
  //TODO: think about logic and getting cards with the parms or not realize how to get date before indexdb make rate and test it
  useEffect(() => {
    const init = async () => {
      try {
        const fsrsGame = await FlashCardGame(deckId); // твоя async функция
        setGame(fsrsGame as any);
      } catch (error) {
        console.error("Ошибка инициализации FSRS:", error);
      }
    };
    init();
  }, [deckId]);

  const currentCard = mockCards[currentCardIndex];
  const handleRating = (rating: "again" | "hard" | "good" | "easy") => {
    // Update session stats
    const newStats = { ...sessionStats };
    newStats.completed += 1;

    if (rating === "again" || rating === "hard") {
      newStats.incorrect += 1;
    } else {
      newStats.correct += 1;
    }

    setSessionStats(newStats);

    if (!game) return <div>Error loading game</div>;

    // Move to next card or end session
    if (currentCardIndex < mockCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    } else {
      // Session completed
      console.log("Session completed!", newStats);
    }
  };

  return (
    <div className="h-dvh flex flex-col">
      <Navbar title="Study Session"></Navbar>

      <FlashCardsSection card={currentCard} showAnswer={showAnswer} />

      {/* Fixed Bottom Buttons */}
      <ReactButtons
        handleRating={handleRating}
        setShowAnswer={setShowAnswer}
        showAnswer={showAnswer}
      />
    </div>
  );
}
