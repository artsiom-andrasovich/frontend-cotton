"use client";
import { ColorPicker } from "@/components/shared";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialCategories = [
  "Programming",
  "Design",
  "Language",
  "Education",
  "Science",
  "History",
]; // TODO: Replace with real categories from API

export default function CreateDeckPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState(initialCategories);
  const [category, setCategory] = useState(categories[0]);
  const [newCategory, setNewCategory] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "__create__") {
      setIsCreatingCategory(true);
      setCategory("");
    } else {
      setIsCreatingCategory(false);
      setCategory(e.target.value);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories((prev) => [...prev, newCategory.trim()]);
      setCategory(newCategory.trim());
      setNewCategory("");
      setIsCreatingCategory(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Replace with API call
    // console.log({ name, description, category, color });
    setTimeout(() => {
      setLoading(false);
      router.push("/decks");
    }, 1000);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Create a New Deck</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Deck Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter deck name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter deck description"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <div className="flex gap-2 items-center">
            <select
              value={isCreatingCategory ? "__create__" : category}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 border rounded bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="__create__">+ Create new category</option>
            </select>
          </div>
          {isCreatingCategory && (
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1 px-3 py-2 border rounded bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="New category name"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCreatingCategory(false);
                  setNewCategory("");
                }}
                className="px-2 py-2 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Deck Color</label>
          <ColorPicker />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Deck"}
        </button>
      </form>
    </div>
  );
}
