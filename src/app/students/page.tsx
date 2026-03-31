"use client";
import { useState, useMemo } from "react";
import MainLayout from "@/comonents/layout/MainLayout";
import PageHeader from "@/comonents/ui/PageHeader";
import StudentMiniCards from "@/comonents/students/StudentMiniCards";
import StudentFilters from "@/comonents/students/StudentFilters";
import StudentsTable from "@/comonents/students/StudentsTable";
import StudentFormModal from "@/comonents/students/StudentFormModal";
import StudentViewModal from "@/comonents/students/StudentViewModal";
import DeleteConfirmModal from "@/comonents/students/DeleteConfirmModal";
import { useStudentStore } from "@/store/useStudentStore";
import type { Student } from "@/types/student";

export default function StudentsPage() {
  const { students, addStudent, updateStudent, deleteStudent } = useStudentStore();

  const [search, setSearch]         = useState("");
  const [roomFilter, setRoomFilter] = useState("");
  const [statusFilter, setStatus]   = useState("");

  const [addOpen, setAddOpen]       = useState(false);
  const [editStudent, setEditSt]    = useState<Student | null>(null);
  const [viewStudent, setViewSt]    = useState<Student | null>(null);
  const [delStudent, setDelSt]      = useState<Student | null>(null);

  const filtered = useMemo(() => students.filter((s) => {
    const q = search.toLowerCase();
    return (
      (!search || s.name.toLowerCase().includes(q) || s.phone.includes(q)) &&
      (!roomFilter || s.room === roomFilter) &&
      (!statusFilter || s.status === statusFilter)
    );
  }), [students, search, roomFilter, statusFilter]);

  return (
    <MainLayout>
      <PageHeader
        title="Students Management"
        subtitle="Add, edit, view and track all hostel students"
        breadcrumb="Hostel / Students"
        action={
          <button onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-c4 rounded-xl text-[13px]
              font-extrabold text-sidebar hover:bg-c3 hover:-translate-y-px transition-all">
            + Add Student
          </button>
        }
      />

      <StudentMiniCards students={students} />

      <StudentFilters
        search={search} room={roomFilter} status={statusFilter}
        onSearch={setSearch} onRoom={setRoomFilter} onStatus={setStatus}
        count={filtered.length} total={students.length}
      />

      <StudentsTable
        students={filtered}
        onView={(s) => setViewSt(s)}
        onEdit={(s) => setEditSt(s)}
        onDelete={(s) => setDelSt(s)}
      />

      {/* Add Modal */}
      <StudentFormModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={(data) => { addStudent(data); setAddOpen(false); }}
      />

      {/* Edit Modal */}
      <StudentFormModal
        open={!!editStudent}
        student={editStudent}
        onClose={() => setEditSt(null)}
        onSave={(data) => {
          if (editStudent) updateStudent({ ...data, id: editStudent.id });
          setEditSt(null);
        }}
      />

      {/* View Modal */}
      <StudentViewModal
        open={!!viewStudent} student={viewStudent}
        onClose={() => setViewSt(null)}
        onEdit={(s) => { setViewSt(null); setEditSt(s); }}
        onDelete={(s) => { setViewSt(null); setDelSt(s); }}
      />

      {/* Delete Confirm */}
      <DeleteConfirmModal
        open={!!delStudent} student={delStudent}
        onConfirm={() => { if (delStudent) deleteStudent(delStudent.id); setDelSt(null); }}
        onCancel={() => setDelSt(null)}
      />
    </MainLayout>
  );
}