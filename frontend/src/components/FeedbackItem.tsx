import { useState } from "react";

type Feedback = {
  id: string;
  username: string;
  useremail: string;
  feedbackMessage: string;
  createdAt: string;
};

type FeedbackItemProps = {
  feedback: Feedback;
  onUpdate: (id: string, payload: Omit<Feedback, "id">) => Promise<void>;
  onDelete: (id: string, createdAt: string) => Promise<void>;
};

const iconClasses =
  "inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 transition";

function FeedbackItem({ feedback, onUpdate, onDelete }: FeedbackItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState<Omit<Feedback, "id">>({
    username: feedback.username,
    useremail: feedback.useremail,
    feedbackMessage: feedback.feedbackMessage,
    createdAt: feedback.createdAt,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onUpdate(feedback.id, form);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(feedback.id, feedback.createdAt);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="w-full">
          {isEditing ? (
            <div className="space-y-3">
              <div className="relative">
                <input
                  className="peer block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-transparent transition-all focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
                  value={form.username}
                  onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
                  placeholder="Name"
                />
                <label className="pointer-events-none absolute left-4 top-3 text-sm text-gray-500 transition-all duration-150 peer-focus:-translate-y-3 peer-focus:scale-90 peer-not-placeholder-shown:-translate-y-3 peer-not-placeholder-shown:scale-90">
                  Name
                </label>
              </div>
              <div className="relative">
                <input
                  className="peer block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-transparent transition-all focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
                  value={form.useremail}
                  onChange={(e) => setForm((prev) => ({ ...prev, useremail: e.target.value }))}
                  placeholder="Email"
                />
                <label className="pointer-events-none absolute left-4 top-3 text-sm text-gray-500 transition-all duration-150 peer-focus:-translate-y-3 peer-focus:scale-90 peer-not-placeholder-shown:-translate-y-3 peer-not-placeholder-shown:scale-90">
                  Email
                </label>
              </div>
              <div className="relative">
                <textarea
                  className="peer block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-transparent transition-all focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
                  rows={4}
                  value={form.feedbackMessage}
                  onChange={(e) => setForm((prev) => ({ ...prev, feedbackMessage: e.target.value }))}
                  placeholder="Feedback"
                />
                <label className="pointer-events-none absolute left-4 top-3 text-sm text-gray-500 transition-all duration-150 peer-focus:-translate-y-3 peer-focus:scale-90 peer-not-placeholder-shown:-translate-y-3 peer-not-placeholder-shown:scale-90">
                  Feedback
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-800">{feedback.username}</p>
              <p className="text-xs text-gray-500">{feedback.useremail}</p>
              <p className="mt-3 text-sm text-gray-700">{feedback.feedbackMessage}</p>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <button
              type="button"
              disabled={isSaving}
              onClick={handleSave}
              className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 focus:outline-hidden disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          ) : (
            <button type="button" onClick={() => setIsEditing(true)} className={iconClasses} title="Edit feedback">
              ✏️
            </button>
          )}
          <button
            type="button"
            disabled={isDeleting}
            onClick={handleDelete}
            className={iconClasses}
            title="Delete feedback"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export type { Feedback, FeedbackItemProps };
export default FeedbackItem;
