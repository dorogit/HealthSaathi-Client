import emailjs from 'emailjs-com';

const handleSubmission = (formData, submitOpen, setSubmitOpen) => {
  // Define your email service ID, template ID, and user ID from Email.js dashboard
  const serviceId = 'service_f9y2u8q';
  const templateId = 'template_wosc9ls';
  const publicKey = 'wws8b_0CvvcFUn_Kd';

  // Prepare the email parameters
  const emailParams = {
    from_name: `${formData.firstName} ${formData.lastName}`, // Your name or the sender's name
    to_email: 'healthsathi27@gmail.com',
    to_name: 'Health Saathi',
    message: JSON.stringify(formData), // Convert the data to JSON string for the message body
  };

  // Send the email using Email.js
  emailjs.send(serviceId, templateId, emailParams, publicKey)
    .then((response) => {
      console.log('Email sent successfully:', response);
    })
    .catch((error) => {
      console.error('Email sending failed:', error);
    });
};

export default handleSubmission;
