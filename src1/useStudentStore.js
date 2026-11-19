import { create } from "zustand";
import { toast } from "react-toastify";
import { supabase } from "./supabaseClient";

export const useStudentStore = create((set) => ({
  students: [],
  isLoading: false,

  getRecords: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;
      set({ students: data || [] });
    } catch (err) {
      toast.error(err.message || "Action failed...");
    } finally {
      set({ isLoading: false });
    }
  },

  updateStudent: async (id, updatedData) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from("students")
        .update(updatedData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      set((store) => ({
        students: store.students.map((student) =>
          String(student.id) === String(id) ? data : student
        ),
      }));
      toast.success("Student updated successfully!");
    } catch (err) {
      toast.error(err.message || "Action failed...");
    } finally {
      set({ isLoading: false });
    }
  },

  deleteRecord: async (id) => {
    try {
      const { error } = await supabase.from("students").delete().eq("id", id);
      if (error) throw error;
      set((store) => ({
        students: store.students.filter((student) => student.id !== id),
      }));
      toast.success("Student removed successfully!");
    } catch (err) {
      toast.error(err.message || "Action failed...");
    }
  },
}));
