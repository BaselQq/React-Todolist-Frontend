import { Box, Button, Center, Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-router-dom";

function Registration({ onClose, setConfirmRegistration }) {

    const [ name, setNameForRegis ] = useState('');
    const [ email, setEmailForRegis ] = useState('');
    const [ password, setPasswordForRegis ] = useState('');
    const [ password_confirmation, setPasswordConfirmationForRegis ] = useState('');

    async function handleRegistration() {
        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                name,
                email,
                password,
                password_confirmation
            });
    
            if (response) {
                setConfirmRegistration(true); 
            }
        } catch (error) {
            console.log('Error register new user', error);
            return null;
        }
    }

    return (
        <Box boxShadow="lg" w="50%" h="420px" rounded="3em" p="10" bg="white" background='#E0E9BE'>
            <Form>
                <Input
                    mt={6}
                    rounded="2xl"
                    background="white"
                    placeholder="Name"
                    onChange={(e) => setNameForRegis(e.target.value)}
                />
                <Input
                    mt={6}
                    rounded="2xl"
                    background="white"
                    placeholder="Email"
                    type="email"
                    onChange={(e) => setEmailForRegis(e.target.value)}
                />
                <Input
                    mt={6}
                    rounded="2xl"
                    background="white"
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPasswordForRegis(e.target.value)}
                />
                <Input
                    mt={6}
                    rounded="2xl"
                    background="white"
                    type="password"
                    placeholder="Password Confirmation"
                    onChange={(e) => setPasswordConfirmationForRegis(e.target.value)}
                />
                <Button textColor="#164E77" background="#76C693" color="blue" boxShadow="lg" rounded="2xl" mt={6} fontWeight="light" onClick={handleRegistration}>Confirm</Button>
                <Button textColor="#164E77" background="#76C693" color="blue" boxShadow="lg" rounded="2xl" mt={6} fontWeight="light" ml={4} onClick={onClose}>Close</Button>
            </Form>
        </Box>
    );
}
//TODO: implement the Buttons as a seperate compontent in the Components Directory to avoid styling in the registration page by naming it CustomButton with adding children pros to it text label and exposing the onClick prop across the components
export default Registration;