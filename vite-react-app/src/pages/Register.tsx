import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const departments = [
  "Communication Studies", "English", "History", "Sociology", "Political Science",
  "Theatre and Dance", "Art and Design", "Music", "Religious Studies", "Women's Studies",
  "Elementary Education", "Early Childhood Education", "Secondary Education",
  "Special Education", "Educational Leadership", "Career and Technology Education",
  "Health Studies", "Nursing", "Nutrition", "Kinesiology", "Biology", "Environmental Science",
  "Computer Science", "Cybersecurity", "Design and Drafting Technology",
  "Accounting", "Finance", "Marketing", "Management", "Entrepreneurship", "Aviation",
  "Criminal Justice", "Social Work"
];

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Student',
    program: '',
  });

  const [error, setError] = useState('');
  const [filteredPrograms, setFilteredPrograms] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'program') {
      if (value.trim() === '') {
        setFilteredPrograms([]); // Hide suggestions if input is empty
      } else {
        const filtered = departments.filter((department) =>
          department.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredPrograms(filtered);
      }
    }
  };

  const handleProgramSelect = (program: string) => {
    setFormData({ ...formData, program });
    setFilteredPrograms([]); // Hide suggestions when a program is selected
  };

  const handleProgramKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredPrograms.length > 0) {
      e.preventDefault(); // Prevent form submission
      setFormData({ ...formData, program: filteredPrograms[0] }); // Select the first suggestion
      setFilteredPrograms([]); // Hide suggestions
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    console.log('Registering:', formData);
    setError('');

    try {
      await axios.post('http://172.172.215.186:8080/api/auth/register', {
        email: formData.email,
        password: formData.password,
        role: formData.role.toUpperCase(),
        program: formData.program,
      });
      console.log('Registration successful');
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Registration error. Email may already exist or fields may be invalid.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">User Registration</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="email-register-input"
          />

          <div className="register-inline-fields">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="register-input"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="register-input"
            />
          </div>

          <div className="register-inline-fields">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="register-select"
            >
              <option value="Student">Student</option>
              <option value="Staff">Staff</option>
            </select>
            <div className="register-program-field">
              <input
                type="text"
                name="program"
                placeholder=" Program"
                value={formData.program}
                onChange={handleChange}
                onKeyDown={handleProgramKeyDown} // Handle Enter key
                required
                className="register-program-input"
              />
              {filteredPrograms.length > 0 && (
                <ul className="program-suggestions">
                  {filteredPrograms.map((department, index) => (
                    <li
                      key={index}
                      className="program-suggestion-item"
                      onClick={() => handleProgramSelect(department)}
                    >
                      {department}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {error && <p className="register-error">{error}</p>}
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        
      </div>
      <p className="register-footer">
          Already have an account?{' '}
          <Link to="/login" className="register-link">
            Login
          </Link>
        </p>
    </div>
  );
};

export default Register;