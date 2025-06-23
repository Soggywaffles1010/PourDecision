'use client';
import React, { useState } from 'react';
import { Star } from 'lucide-react';

type Review = {
  name: string;
  rating: number;
  comment: string;
  date: string;
};

const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Review = {
      ...form,
      date: new Date().toLocaleDateString(),
    };
    setReviews([newReview, ...reviews]);
    setForm({ name: '', rating: 5, comment: '' });
  };

  return (
    <section className="bg-gray-50 py-12 px-4 md:px-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-900 mb-4">
        Customer Reviews
      </h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-8">
        Hear what our visitors have to say about Pour Decision Cafe!
      </p>

          <div className="max-w-2xl mx-auto space-y-4 mb-12">
  <input
    type="text"
    name="name"
    placeholder="Your Name"
    value={form.name}
    onChange={(e) => setForm({ ...form, name: e.target.value })}
    required
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-800"
  />

  <div className="flex items-center gap-2">
    <label className="text-gray-700">Rating:</label>
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        onClick={() => setForm({ ...form, rating: n })}
        className={n <= form.rating ? 'text-yellow-500' : 'text-gray-300'}
      >
        <Star size={24} fill={n <= form.rating ? '#facc15' : 'none'} />
      </button>
    ))}
  </div>

  <textarea
    name="comment"
    placeholder="Your Review"
    value={form.comment}
    onChange={(e) => setForm({ ...form, comment: e.target.value })}
    required
    rows={4}
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-800"
  />

  <a
    href="https://g.page/r/CegVTT1F-yolEAE/review"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-yellow-800 text-white px-6 py-2 rounded-lg hover:bg-yellow-900 transition w-full md:w-auto text-center"
  >
    Submit Review on Google
  </a>
</div>


      <div className="max-w-3xl mx-auto space-y-6">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center">No reviews yet. Be the first! https://g.page/r/CegVTT1F-yolEAE/review</p>
        ) : (
          reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-yellow-900">{r.name}</p>
                <span className="text-sm text-gray-500">{r.date}</span>
              </div>
              <div className="flex items-center mb-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={18}
                    className={n <= r.rating ? 'text-yellow-500' : 'text-gray-300'}
                    fill={n <= r.rating ? '#facc15' : 'none'}
                  />
                ))}
              </div>
              <p className="text-gray-800">{r.comment}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
