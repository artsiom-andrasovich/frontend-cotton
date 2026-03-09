"use client";

import { Navbar } from "@/components/shared";
import { AppPaths, GITHUB_URL, SUPPORT_EMAIL } from "@/constants";
import {
  BookOpen,
  Mail,
  MessageCircle,
  Repeat,
  Trophy,
  Zap,
} from "lucide-react";

import {
  FAQItem,
  FAQItemProps,
  SectionHeader,
  SettingItem,
  TipCard,
} from "../_components";

const FAQ_ITEMS: FAQItemProps[] = [
  {
    question: "What is spaced repetition?",
    answer:
      "Spaced repetition shows you cards right before you're about to forget them. The FSRS algorithm schedules reviews at optimal intervals, so you spend less time studying and remember more.",
  },
  {
    question: "How do difficulty ratings work?",
    answer:
      "After reviewing a card, rate how well you remembered it (Again, Hard, Good, Easy). The algorithm adjusts the next review interval — harder cards are shown more frequently.",
  },
  {
    question: "Can I organize my decks?",
    answer:
      "Yes! Create categories with custom names, colors, and icons. Each deck belongs to a category. Use sort and filter on the decks page to find what you need.",
  },
  {
    question: "How does mastery work?",
    answer:
      "Mastery reflects how well you know cards in a deck. It increases when you rate cards Good or Easy, and decreases when you struggle. 100% means you've mastered all cards.",
  },
  {
    question: "Can I use rich text in cards?",
    answer:
      "Yes! The editor supports bold, italic, code blocks, and math formulas via KaTeX — great for technical subjects.",
  },
  {
    question: "How do I delete multiple cards?",
    answer:
      "In All Cards, long-press a card to enter selection mode. Tap more cards to select them, then hit Delete in the header.",
  },
];

export default function HelpPage() {
  return (
    <>
      <Navbar title={"Help & Support"} path={AppPaths.settings.ABOUT} />
      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* Getting started */}
        <div>
          <SectionHeader>Getting Started</SectionHeader>
          <div className="grid grid-cols-2 gap-2">
            <TipCard
              icon={BookOpen}
              title="Create a deck"
              description="Group flashcards by topic"
              color="indigo"
            />
            <TipCard
              icon={Zap}
              title="Add cards"
              description="Write questions & answers"
              color="yellow"
            />
            <TipCard
              icon={Repeat}
              title="Study daily"
              description="Review with spaced repetition"
              color="green"
            />
            <TipCard
              icon={Trophy}
              title="Track progress"
              description="Watch your mastery grow"
              color="purple"
            />
          </div>
        </div>

        {/* FAQ */}
        <div>
          <SectionHeader>FAQ</SectionHeader>
          <div className="space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem key={i} {...item} />
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <SectionHeader>Need More Help?</SectionHeader>
          <div className="space-y-2">
            <SettingItem
              icon={Mail}
              title="Email Support"
              description={SUPPORT_EMAIL}
              href={`mailto:${SUPPORT_EMAIL}`}
              compact
              external
            />
            <SettingItem
              icon={MessageCircle}
              title="Report a Bug"
              description="Open an issue on GitHub"
              href={GITHUB_URL}
              compact
              external
            />
          </div>
        </div>
      </div>
    </>
  );
}
