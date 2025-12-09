import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_AWS_API_GATEWAY!;

function FeedbackForm() {
  const [form, setForm] = useState({ username: "", useremail: "", feedbackMessage: "" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    try {
      setSubmitting(true);
      const payload = {
        username: form.username,
        useremail: form.useremail,
        feedbackMessage: form.feedbackMessage,
        createdAt: new Date().getTime().toString(),
      };
      const res = await fetch(`${BASE_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      setStatus("Thank you for your feedback!");

      setForm({ useremail: "", username: "", feedbackMessage: "" });
      navigate("/feedback");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Something went wrong, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="lg:max-w-lg lg:mx-auto lg:me-0 ms-auto">
        <div className="p-4 sm:p-7 flex flex-col bg-white rounded-2xl shadow-lg">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">Send us your feedback</h1>
            <p className="mt-2 text-sm text-gray-600">We'd love to hear from you!</p>
          </div>

          <div className="mt-5">
            <div className="grid gap-4">
              <div>
                <div className="relative">
                  <input
                    type="text"
                    id="feedback-form-name"
                    name="name"
                    placeholder="John Doe"
                    className="peer block w-full rounded-lg border border-gray-300 px-4 py-3 sm:py-4 text-sm
               placeholder-transparent transition-all
               focus:border-blue-500 focus:ring-blue-500
               disabled:opacity-50 disabled:pointer-events-none"
                    value={form.username}
                    onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
                    required
                  />

                  <label
                    htmlFor="feedback-form-name"
                    className="absolute left-4 top-3 sm:top-4 text-gray-500 text-sm pointer-events-none
               transition-all duration-150
               peer-focus:-translate-y-3 peer-focus:scale-90
               peer-not-placeholder-shown:-translate-y-3 peer-not-placeholder-shown:scale-90"
                  >
                    Name
                  </label>
                </div>
              </div>

              <div>
                <div className="relative">
                  <input
                    type="email"
                    id="feedback-form-email"
                    name="email"
                    placeholder="you@email.com"
                    className="peer block w-full rounded-lg border border-gray-300 px-4 py-3 sm:py-4 text-sm 
               placeholder-transparent transition-all
               focus:border-blue-500 focus:ring-blue-500
               disabled:opacity-50 disabled:pointer-events-none"
                    value={form.useremail}
                    onChange={(e) => setForm((prev) => ({ ...prev, useremail: e.target.value }))}
                    required
                  />

                  <label
                    htmlFor="feedback-form-email"
                    className="absolute left-4 top-3 sm:top-4 text-gray-500 text-sm pointer-events-none 
               transition-all duration-150
               peer-focus:-translate-y-3 peer-focus:scale-90
               peer-not-placeholder-shown:-translate-y-3 peer-not-placeholder-shown:scale-90"
                  >
                    Email
                  </label>
                </div>
              </div>

              <div>
                <div className="relative">
                  <textarea
                    id="feedback-form-message"
                    name="message"
                    rows={6}
                    placeholder="Your feedback here..."
                    className="peer block w-full rounded-lg border border-gray-300 px-4 py-3 sm:py-4 text-sm
               placeholder-transparent transition-all resize-none
               focus:border-blue-500 focus:ring-blue-500
               disabled:opacity-50 disabled:pointer-events-none"
                    value={form.feedbackMessage}
                    onChange={(e) => setForm((prev) => ({ ...prev, feedbackMessage: e.target.value }))}
                    required
                  ></textarea>

                  <label
                    htmlFor="feedback-form-message"
                    className="absolute left-4 top-3 sm:top-4 text-gray-500 text-sm pointer-events-none
               transition-all duration-150
               peer-focus:-translate-y-3 peer-focus:scale-90
               peer-not-placeholder-shown:-translate-y-3 peer-not-placeholder-shown:scale-90"
                  >
                    Feedback
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                {submitting ? "Sending..." : "Send Feedback"}
              </button>
              {status && <p className="mt-3 text-sm text-gray-600">{status}</p>}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FeedbackForm;
