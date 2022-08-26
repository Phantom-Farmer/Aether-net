import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createSleepCard, updateSleepCard } from '../api/sleepCardData';

const initialState = {
  timeStamp: '',
  mind: '',
  body: '',
  meditation: '',
  firebaseKey: '',
};

export default function NewSleepCardForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey)setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      const payload = {
        ...formInput,
        timeStamp: new Date().toLocaleString(),
      };
      updateSleepCard(payload).then(() => router.push('/'));
    } else {
      const payload = {
        ...formInput,
        timeStamp: new Date().toLocaleString(),
      };
      createSleepCard(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-black mt-5">{obj.firebaseKey ? 'update' : 'create'} sleepcard</h2>
      <FloatingLabel controlId="floatingInput2" label="mind" className="mb-3">
        <Form.Control type="text" placeholder="how does your mind feel?" name="mind" value={formInput.mind} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="body" className="mb-3">
        <Form.Control type="text" placeholder="how does your body feel?" name="body" value={formInput.body} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="meditation" className="mb-3">
        <Form.Control type="text" placeholder="choose a meditation" name="meditation" value={formInput.meditation} onChange={handleChange} required />
      </FloatingLabel>
      <Button type="submit">{obj.firebaseKey ? 'update' : 'create'} sleepcard</Button>
    </Form>
  );
}

NewSleepCardForm.propTypes = {
  obj: PropTypes.shape({
    timeStamp: PropTypes.string,
    mind: PropTypes.string,
    body: PropTypes.string,
    meditation: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

NewSleepCardForm.defaultProps = {
  obj: initialState,
};