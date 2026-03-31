"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Student } from "@/types/student";
import { X } from "lucide-react";

type FormData = Omit<Student, "id">;

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  student?: Student | null;
};

const inputCls = `w-full px-3 py-2 border-[1.5px] border-c3/30 rounded-[9px] text-[13px]
  font-outfit text-sidebar dark:text-white bg-white dark:bg-white/5 outline-none
  focus:border-c4 focus:bg-c1 transition-all placeholder:text-gray-300`;

export default function StudentFormModal({ open, onClose, onSave, student }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    if (student) {
      reset({
        name: student.name, phone: student.phone, room: student.room,
        joiningDate: student.joiningDate, fees: student.fees,
        feeStatus: student.feeStatus, status: student.status,
      });
    } else {
      reset({ status: "Active", feeStatus: "Paid" });
    }
  }, [student, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-sidebar/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white dark:bg-[#0d2030] rounded-2xl p-6 w-full max-w-[460px]
        border-2 border-c3 max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[17px] font-extrabold text-sidebar dark:text-white">
            {student ? "Edit Student" : "Add New Student"}
          </h2>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-c1 border-[1.5px] border-c3 flex items-center
              justify-center hover:bg-c4 transition-all">
            <X size={14} className="text-sidebar" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSave)} className="grid grid-cols-2 gap-3">
          {/* Full Name */}
          <div className="col-span-2 flex flex-col gap-1.5">
            <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
              Full Name *
            </label>
            <input {...register("name", { required: true })} placeholder="Rahul Sharma"
              className={`${inputCls} ${errors.name ? "border-red-400" : ""}`} />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
              Phone *
            </label>
            <input {...register("phone", { required: true })} placeholder="9876543210"
              className={`${inputCls} ${errors.phone ? "border-red-400" : ""}`} />
          </div>

          {/* Room */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
              Room No. *
            </label>
            <input {...register("room", { required: true })} placeholder="203"
              className={`${inputCls} ${errors.room ? "border-red-400" : ""}`} />
          </div>

          {/* Joining Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
              Joining Date
            </label>
            <input type="date" {...register("joiningDate")} className={inputCls} />
          </div>

          {/* Fees */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
              Monthly Fees (₹)
            </label>
            <input type="number" {...register("fees")} placeholder="8000" className={inputCls} />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
              Status
            </label>
            <select {...register("status")} className={inputCls}>
              <option>Active</option>
              <option>Left</option>
            </select>
          </div>

          {/* Fee Status */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
              Fees Status
            </label>
            <select {...register("feeStatus")} className={inputCls}>
              <option>Paid</option>
              <option>Pending</option>
            </select>
          </div>

          {/* Save Button */}
          <button type="submit"
            className="col-span-2 mt-2 py-3 bg-c4 border-none rounded-xl text-[14px]
              font-extrabold text-sidebar hover:bg-c3 transition-all font-outfit">
            {student ? "Update Student" : "Save Student"}
          </button>
        </form>
      </div>
    </div>
  );
}