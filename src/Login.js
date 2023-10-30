import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from 'react-router-dom';
import { Box, Button, Center, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import Todolists from './Todolists';
import Registration from './Registration';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [confirmRegistration, setConfirmRegistration ] = useState(false);

    useEffect (()=> {
        const storedToken = localStorage.getItem('token');
//TODO: remove and avoid storing a token in the browser local storage for security reasons. implement a login auth service like clark or similar instead or build a proxy yourself to encrypt the token
// accessing the token in your the local storage is super easy to hack by hackers
        if (storedToken) {
            
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) setUser(storedUser);
        }
    }, []);

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password
            });

            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setUser(response.data.user);
            }
        } catch(err) {
            // setError('Login Credentials missing');
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    }

    return (
        <div>
            {user ? (
            <div>
                <Todolists/>
                <Center>
                    <Button boxShadow="lg" onClick={handleLogout}>Logout</Button>
                </Center>
            </div>
            ) : (
                <div>
                    {!confirmRegistration &&
                <Center>
                    <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={true}>
                        <ModalOverlay>
                            <ModalHeader>
                                Registration
                            </ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody>
                                <Center>
                                    <Registration setConfirmRegistration={setConfirmRegistration} onClose={onClose}/>
                                </Center>
                            </ModalBody>
                        </ModalOverlay>
                    </Modal>
                </Center>
                }
                    <Center mt={30}>
                        <Box w="50%" rounded="md" p="2" bg="white">
                            <Center>
                                <Text fontSize="5xl">Todolist - Login</Text>
                            </Center>
                        </Box>    
                    </Center>
                    <Center>
                        <Box boxShadow="lg" w="50%" h="350px" rounded="3em" p="10" bg="white" background='#E0E9BE'>
                            <Form onSubmit={handleSignIn}>
                                <div>
                                    <FormControl>
                                    <Input 
                                        boxShadow="lg" 
                                        rounded="2xl"
                                        placeholder="email"
                                        background="white"
                                        mt={12}
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <div>
                                        <Input
                                            boxShadow="lg" 
                                            rounded="2xl"
                                            placeholder="password"
                                            color="black"
                                            background="white"
                                            mt={8}
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    {/* {error && <p style={{color: 'red'}}>{error}</p>} */}
                                    <Center>
                                        <Button textColor="#184E77" background="#76C893" color="blue" boxShadow="lg" rounded="2xl" mt={8} type='submit' fontWeight="light">Sing in</Button>
                                        <Button textColor="#184E77" background="#76C893" color="blue" boxShadow="lg" rounded="2xl" mt={8} fontWeight="light" ml={4} onClick={onOpen}>Registration</Button>
                                    </Center>
                                    </FormControl>
                                </div>
                            </Form>
                        </Box>
                    </Center>
                </div>
            )
        }
        </div>
    )
};

export default Login;