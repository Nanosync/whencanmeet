import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import './MeetingForm.css';
import moment from 'moment';
import DatePicker from '../DatePickerField';

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required('Event name is required'),
  description: yup
    .string()
    .required('Event description is required'),
  startDate: yup
    .date('Invalid date')
    .required('Start date required')
    .min(new Date(), 'Event date cannot be in the past'),
  endDate: yup
    .date('Invalid date')
    .when('startDate', (start, schema) => schema.min(start, 'End date should be after start date')),
  location: yup
    .string()
    .required('Location is required'),
  website: yup
    .string()
    .url('Website should be a valid url (starts with http:// or https://)')
    .required('Website is required')
});


const currDate = new Date();
currDate.setDate(currDate.getDate());
currDate.setHours(24, 0, 0, 0);

const presetInitialValues = {
  name: '',
  description: '',
  startDate: currDate,
  endDate: currDate,
  location: '',
  public: true,
  website: ''
};

function MeetingForm(props) {
  const { initialValues, onSubmit, formButtonText } = props;
  
  return (
    <Formik
      initialValues={initialValues || presetInitialValues}
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >
      {({
        values, 
        errors, 
        // status,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldTouched,
        isSubmitting,
        isValid,
        setFieldValue,
        validateField,
        dirty
      }) => (
        <Form noValidate onSubmit={handleSubmit} autoComplete="off"> 
          <Form.Group as={Row} controlId="formHorizontalName">
            <Form.Label column sm="2">
              Event Name
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter the event name (e.g. Birthday Bash)"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                isValid={touched.name && !errors.name}
                isInvalid={touched.name && !!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalTextarea">
            <Form.Label column sm="2">
              Description
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="textarea"
                rows="3"
                name="description"
                placeholder="Enter a meaningful description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                isValid={touched.description && !errors.description}
                isInvalid={touched.description && !!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalDateStart">
            <Form.Label column sm="2">
              Starts on
            </Form.Label>
            <Col sm="10">
              <DatePicker
                name="startDate"
                placeholder="When is the event?"
                dateFormat="dd/MM/yyyy h:mm aa"
                value={values.startDate}
                onChange={setFieldValue}
                onBlur={handleBlur}
                onClickOutside={setFieldTouched}
                validate={validateField}
                isValid={touched.startDate && !errors.startDate}
                isInvalid={touched.startDate && !!errors.startDate}
                showTimeSelect
                timeFormat="h:mm aa"
                utcOffset={moment().utcOffset()}
              />
              <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                {errors.startDate}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalDateEnd">
            <Form.Label column sm="2">
              Ends on
            </Form.Label>
            <Col sm="10">
              <DatePicker
                name="endDate"
                placeholder="When does the event end?"
                dateFormat="dd/MM/yyyy h:mm aa"
                value={values.endDate}
                onChange={setFieldValue}
                onBlur={handleBlur}
                onClickOutside={setFieldTouched}
                validate={validateField}
                isValid={touched.endDate && !errors.endDate}
                isInvalid={touched.endDate && !!errors.endDate}
                showTimeSelect
                timeFormat="h:mm aa"
                utcOffset={moment().utcOffset()}
              />
              <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                {errors.endDate}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalLocation">
            <Form.Label column sm="2">
              Location
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name="location"
                placeholder="Location"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.location}
                isValid={touched.location && !errors.location}
                isInvalid={touched.location && !!errors.location}
              />
              <Form.Control.Feedback type="invalid">
                {errors.location}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPublicVisibility">
            <Form.Label column sm="2">
              Event Visibility
            </Form.Label>
            <Col sm="10">
              <Form.Group controlId="formCheckbox">
                <Form.Check
                  type="checkbox"
                  name="public"
                  label="Make this a public event"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.public}
                  value="true"
                />
              </Form.Group>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalWebsite">
            <Form.Label column sm="2">
              Website
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name="website"
                placeholder="Enter the event website (e.g. http://www.google.com)"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.website}
                isValid={touched.website && !errors.website}
                isInvalid={touched.website && !!errors.website}
              />
              <Form.Control.Feedback type="invalid">
                {errors.website}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isSubmitting || !isValid || !dirty}>
            {formButtonText}
          </Button>
        </Form>
        )
      }
    </Formik>
  );
}

MeetingForm.propTypes = {
  initialValues: PropTypes.arrayOf(PropTypes.any),
  onSubmit: PropTypes.func.isRequired,
  formButtonText: PropTypes.string.isRequired
};

export default MeetingForm;
