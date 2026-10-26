export type Question = {
  id: number;
  section: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type ModuleData = {
  title: string;
  description: string;
  durationMinutes: number;
  iconName: string;
  isWriting?: boolean;
  passageTitle?: string;
  passageContent?: string;
  questions?: Question[];
  writingPrompt?: {
    taskType: string;
    promptText: string;
    minWords: number;
  };
};

export const moduleDataStore: Record<string, ModuleData> = {
  "Listening Practice": {
    title: "Listening Practice",
    description: "Listen to academic audio dialogues and answer detail-oriented questions.",
    durationMinutes: 10,
    iconName: "Headphones",
    passageTitle: "Audio Transcript Summary (Section 1 & 2)",
    passageContent:
      "Speaker A: Hello, welcome to the University Central Library. How can I help you today?\nSpeaker B: Hi, I would like to inquire about the weekend opening hours and borrowing limits for international students.\nSpeaker A: Sure! On weekdays we are open from 8:00 AM to 10:00 PM. On Saturdays, we close at 5:00 PM, and on Sundays we operate from 12:00 PM to 6:00 PM. Standard undergraduate students can borrow up to 8 books at a time for 14 days.\n\nSpeaker B: Perfect. What about multimedia items like DVDs and audiobooks?\nSpeaker A: DVDs can be checked out for 3 days only, with a maximum limit of 2 items simultaneously.",
    questions: [
      {
        id: 1,
        section: "Listening - Section 1",
        question: "What time does the university library close on Saturdays?",
        options: ["4:00 PM", "5:00 PM", "6:00 PM", "10:00 PM"],
        answer: 1,
        explanation: "The library representative explicitly states: 'On Saturdays, we close at 5:00 PM'.",
      },
      {
        id: 2,
        section: "Listening - Section 1",
        question: "How many books can an undergraduate student borrow at one time?",
        options: ["5 books", "8 books", "10 books", "12 books"],
        answer: 1,
        explanation: "The transcript confirms that standard undergraduate students can borrow up to 8 books.",
      },
      {
        id: 3,
        section: "Listening - Section 2",
        question: "What is the maximum borrowing duration for DVDs?",
        options: ["1 day", "3 days", "7 days", "14 days"],
        answer: 1,
        explanation: "The transcript states that DVDs can be checked out for 3 days only.",
      },
      {
        id: 4,
        section: "Listening - Section 2",
        question: "How many DVDs can a student borrow simultaneously?",
        options: ["1 item", "2 items", "3 items", "5 items"],
        answer: 1,
        explanation: "The audio transcript mentions a maximum limit of 2 items simultaneously for DVDs.",
      },
    ],
  },
  "Reading Practice": {
    title: "Reading Practice",
    description: "Read authentic academic passages and solve timed comprehension questions.",
    durationMinutes: 15,
    iconName: "BookOpen",
    passageTitle: "Passage: The Shift Towards Sustainable Urban Transit",
    passageContent:
      "Modern urban centers are facing unprecedented pressure from population growth and traffic congestion. Recent municipal studies indicate that introducing electric bus rapid transit (BRT) systems reduces atmospheric carbon emissions by up to 35% within five years.\n\nFurthermore, regular commuters who switch to public transport report lower daily stress levels. However, researchers emphasize that daily reading during commutes improves cognitive focus but does not automatically guarantee native language fluency without deliberate practice. Economists also note that public transport expansion requires robust government subsidies to maintain affordable fare prices for low-income citizens.",
    questions: [
      {
        id: 1,
        section: "Reading - Passage 1",
        question: "According to the passage, by how much can electric BRT systems reduce carbon emissions?",
        options: ["Up to 15%", "Up to 25%", "Up to 35%", "Up to 50%"],
        answer: 2,
        explanation: "The text mentions a reduction in carbon emissions of 'up to 35% within five years'.",
      },
      {
        id: 2,
        section: "Reading - Passage 1",
        question: "Does daily reading during commutes guarantee native language fluency?",
        options: ["Yes, automatically", "No, deliberate practice is needed", "Only for urban commuters", "Not mentioned"],
        answer: 1,
        explanation: "The passage states that daily reading 'does not automatically guarantee native language fluency without deliberate practice'.",
      },
      {
        id: 3,
        section: "Reading - Passage 1",
        question: "What do economists say is necessary to maintain affordable fare prices?",
        options: ["Higher taxes", "Robust government subsidies", "Private foreign investment", "Free fuel supplies"],
        answer: 1,
        explanation: "Economists note that expansion requires robust government subsidies to keep fares affordable.",
      },
      {
        id: 4,
        section: "Reading - Passage 1",
        question: "What benefit do regular commuters report after switching to public transport?",
        options: ["Higher income", "Lower daily stress levels", "More sleeping time", "Faster vehicle speed"],
        answer: 1,
        explanation: "The passage notes that regular commuters who switch report lower daily stress levels.",
      },
    ],
  },
  "Writing Practice": {
    title: "Writing Practice",
    description: "Real IELTS Writing Task 2 practice where you can write your own essay.",
    durationMinutes: 20,
    iconName: "PenLine",
    isWriting: true,
    writingPrompt: {
      taskType: "IELTS Writing Task 2 (Essay)",
      promptText:
        "Some people believe that online learning is more effective and flexible than traditional classroom education. To what extent do you agree or disagree with this statement? Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 150,
    },
  },
};