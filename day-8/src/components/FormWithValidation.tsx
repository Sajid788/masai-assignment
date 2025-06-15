import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const FormWithValidation: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});

  const validateName = (name: string): string | undefined => {
    if (!name) return 'Name is required';
    if (name.length < 3) return 'Name must be at least 3 characters';
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Email is invalid';
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Real-time validation
    let validationError: string | undefined;
    switch (name) {
      case 'name':
        validationError = validateName(value);
        break;
      case 'email':
        validationError = validateEmail(value);
        break;
      case 'password':
        validationError = validatePassword(value);
        break;
    }

    setErrors({
      ...errors,
      [name]: validationError
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields before submitting
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    
    const formErrors = {
      name: nameError,
      email: emailError,
      password: passwordError
    };
    
    setErrors(formErrors);
    
    // Only submit if no errors
    if (!nameError && !emailError && !passwordError) {
      console.log('Form submitted successfully:', formData);
      // You can add API call or other logic here
    }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        </div>
        
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </div>
        
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormWithValidation; 