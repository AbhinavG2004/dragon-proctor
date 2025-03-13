
import { create } from 'zustand';

interface User {
  name: string;
  regNo: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export interface ExamState {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  answers: Record<number, string | string[]>;
  setAnswer: (questionId: number, answer: string | string[]) => void;
}

export const useExamStore = create<ExamState>((set) => ({
  currentQuestionIndex: 0,
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  answers: {},
  setAnswer: (questionId, answer) => set((state) => ({
    answers: { ...state.answers, [questionId]: answer }
  })),
}));
