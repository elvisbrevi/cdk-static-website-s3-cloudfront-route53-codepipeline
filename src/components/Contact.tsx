import React, { useState } from "react";

const Contact = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formValues);
    };

    return (
      <div>
        <h2 className="text-2xl mb-4">Contact</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formValues.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formValues.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2">Message:</label>
            <textarea
              name="message"
              id="message"
              value={formValues.message}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
              rows={5}
            />
          </div>
          <button type="submit" className="bg-primary text-white p-2 rounded">
            Submit
          </button>
        </form>
      </div>
    );
};

export default Contact;