"use client";
import { create } from "zustand";
import { students as initialStudents } from "../data/dummyData";
import type { Student } from "../types/student";

type StudentStore = {
  students: Student[];
  addStudent: (s: Omit<Student, "id">) => void;
  updateStudent: (s: Student) => void;
  deleteStudent: (id: number) => void;
};

export const useStudentStore = create<StudentStore>((set) => ({
  students: initialStudents,
  addStudent: (s) =>
    set((state) => ({
      students: [...state.students, { ...s, id: Date.now() }],
    })),
  updateStudent: (updated) =>
    set((state) => ({
      students: state.students.map((s) => (s.id === updated.id ? updated : s)),
    })),
  deleteStudent: (id) =>
    set((state) => ({
      students: state.students.filter((s) => s.id !== id),
    })),
}));