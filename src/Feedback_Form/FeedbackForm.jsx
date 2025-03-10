import { useState } from "react";
import "./feedbackform.css"

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedFeedback, setSubmittedFeedback] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    }
    if (!formData.feedback.trim()) newErrors.feedback = "Feedback is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      setSubmittedFeedback(formData);
      setFormData({ name: "", email: "", feedback: "" });
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="feedback-container">
      <h2 className="title">Feedback Form</h2>

      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error-input" : ""}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Feedback:</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            className={errors.feedback ? "error-input" : ""}
          />
          {errors.feedback && <p className="error">{errors.feedback}</p>}
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {submittedFeedback && (
        <div className="feedback-display">
          <h3>Submitted Feedback:</h3>
          <p><strong>Name:</strong> {submittedFeedback.name}</p>
          <p><strong>Email:</strong> {submittedFeedback.email}</p>
          <p><strong>Feedback:</strong> {submittedFeedback.feedback}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
