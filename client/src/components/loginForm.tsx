import React, { useState } from 'react';
import './loginForm.css';

interface LoginData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });

  // Handle change for form inputs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   
    console.log('Form Data:', formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className='loginheader'>Login</h2>
        <fieldset className='fieldset'>
          <div>
            <label htmlFor='email'>
              Email:<br />
              <input
                name='email'
                placeholder='Enter your email'
                type='email'
                id='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor='password'>
              Password:<br />
              <input
                name='password'
                placeholder='Enter your password'
                type='password'
                id='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <button type='submit' className='loginbutton'>
            Login
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default LoginForm;
