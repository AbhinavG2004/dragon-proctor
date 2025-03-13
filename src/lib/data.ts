
import { Question } from "@/components/QuestionCard";

export const examQuestions: Question[] = [
  {
    id: 1,
    text: "Which of the following is a characteristic of a secure proctoring system?",
    type: "single",
    options: [
      { id: "q1_a", text: "Recording the screen without student's consent" },
      { id: "q1_b", text: "Continuous identity verification during the exam" },
      { id: "q1_c", text: "Allowing unlimited access to external resources" },
      { id: "q1_d", text: "Disabling computer functionality completely" }
    ]
  },
  {
    id: 2,
    text: "What security features should be implemented in an online proctoring system? (Select all that apply)",
    type: "multiple",
    options: [
      { id: "q2_a", text: "Facial recognition technology" },
      { id: "q2_b", text: "Browser lockdown capabilities" },
      { id: "q2_c", text: "Public chat functionality" },
      { id: "q2_d", text: "Room environment scanning" }
    ]
  },
  {
    id: 3,
    text: "What is the primary purpose of using AI in modern proctoring systems?",
    type: "single",
    options: [
      { id: "q3_a", text: "To replace human proctors completely" },
      { id: "q3_b", text: "To detect potential cheating behaviors and anomalies" },
      { id: "q3_c", text: "To grade exams automatically" },
      { id: "q3_d", text: "To make exams more difficult" }
    ]
  }
];
