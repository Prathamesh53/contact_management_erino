import { useState } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        jobTitle: ''
    });
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/contacts', formData);
            setNotification({ open: true, message: 'Contact successfully created!', severity: 'success' });
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                company: '',
                jobTitle: ''
            });
        } catch (error) {
            console.log(error)
            setNotification({ open: true, message: 'Failed to create contact. Please try again.', severity: 'error' });
        }
    };

    const handleClose = () => {
        setNotification({ ...notification, open: false });
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    label="Company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    label="Job Title"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                />
                <Button type="submit" variant="contained" color="primary" className="mt-4">
                    Submit
                </Button>
            </form>
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ContactForm;
