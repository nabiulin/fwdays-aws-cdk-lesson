import { useEffect, useState } from "react";
import FeedbackItem, { Feedback } from "../components/FeedbackItem";

const API_BASE = import.meta.env.VITE_AWS_API_GATEWAY!;

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  const text = await res.text();

  try {
    const parsed = JSON.parse(text);
    if (parsed && typeof parsed === "object" && "body" in parsed) {
      if (typeof parsed.body === "string") return JSON.parse(parsed.body) as T;
      return parsed.body as T;
    }
    return parsed as T;
  } catch {
    return text as unknown as T;
  }
}

function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchJson<Feedback[] | { count: number; items: Feedback[] }>(`${API_BASE}/feedback`);
        const items = Array.isArray(data) ? data : data.items ?? [];
        setFeedbacks(items);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load feedback");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleUpdate = async (id: string, payload: Omit<Feedback, "id">) => {
    await fetchJson<Feedback>(`${API_BASE}/feedback/${id}`, {
      method: "PUT",
      body: JSON.stringify({ id, ...payload }),
    });
    setFeedbacks((prev) => prev.map((f) => (f.id === id ? { id, ...payload } : f)));
  };

  const handleDelete = async (id: string, createdAt: string) => {
    await fetchJson<void>(`${API_BASE}/feedback/${id}`, { method: "DELETE", body: JSON.stringify({ id, createdAt }) });
    setFeedbacks((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Feedback</h1>
      </header>

      {loading && <p className="text-sm text-gray-500">Loading feedback...</p>}
      {error && <p className="text-sm text-red-600">Error: {error}</p>}

      {!loading && !error && feedbacks.length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500">
          No feedback yet.
        </div>
      )}

      <div className="space-y-4">
        {feedbacks.map((item) => (
          <FeedbackItem key={item.id} feedback={item} onUpdate={handleUpdate} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default FeedbackPage;
