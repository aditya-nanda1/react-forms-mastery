import React, { useState, useEffect } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (values) => {
    const newErrors = {};

    // Name
    if (!values.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(values.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Phone
    const phoneRegex = /^\d{10}$/;
    if (!values.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(values.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }

    // Password
    if (!values.password) {
      newErrors.password = 'Password is required';
    } else if (values.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(values.password)) {
      newErrors.password = 'Must contain uppercase, lowercase and number';
    }

    // Confirm Password
    if (values.confirmPassword !== values.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Gender
    if (!values.gender) {
      newErrors.gender = 'Please select a gender';
    }

    // Terms
    if (!values.terms) {
      newErrors.terms = 'You must accept the terms';
    }

    return newErrors;
  };

  useEffect(() => {
    const validationErrors = validate(formData);
    setErrors(validationErrors);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBlur = (e) => {
    setTouched(prev => ({
      ...prev,
      [e.target.name]: true
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    // Mark all as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {});
    setTouched(allTouched);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          gender: '',
          terms: false
        });
        setTouched({});
        setTimeout(() => setIsSuccess(false), 5000);
      }, 1500);
    }
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Create Account</h2>

      {isSuccess && (
        <div style={{
          background: 'rgba(34, 197, 94, 0.2)',
          border: '1px solid var(--success)',
          color: '#4ade80',
          padding: '1rem',
          borderRadius: 'var(--radius)',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          Registration Successful! Welcome aboard, {formData.name || 'User'}.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Aditya Nanda"
          />
          {touched.name && errors.name && <div className="error-msg">{errors.name}</div>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="aditya@example.com"
          />
          {touched.email && errors.email && <div className="error-msg">{errors.email}</div>}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            name="phone"
            className="form-input"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="9876543210"
          />
          {touched.phone && errors.phone && <div className="error-msg">{errors.phone}</div>}
        </div>

        {/* Password Group */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && <div className="error-msg">{errors.password}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.confirmPassword && errors.confirmPassword && <div className="error-msg">{errors.confirmPassword}</div>}
          </div>
        </div>

        {/* Gender */}
        <div className="form-group">
          <label className="form-label">Gender</label>
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
            {['Male', 'Female', 'Other'].map(option => (
              <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={formData.gender === option}
                  onChange={handleChange}
                  style={{ accentColor: 'var(--primary)' }}
                />
                {option}
              </label>
            ))}
          </div>
          {touched.gender && errors.gender && <div className="error-msg">{errors.gender}</div>}
        </div>

        {/* Terms */}
        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--primary)' }}
            />
            <span style={{ fontSize: '0.9rem' }}>I agree to the Terms & Conditions</span>
          </label>
          {touched.terms && errors.terms && <div className="error-msg">{errors.terms}</div>}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '1rem' }}
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Creating Account...' : 'Register Now'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
