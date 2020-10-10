import React, {  useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Container, Feed, Form, Message, Modal, Tab, TabPane } from 'semantic-ui-react';
import { AuthContext } from '../context/AuthContext';
import config from '../configuration/config';
import axios from 'axios';

const Dashboard = () => {
    const image = 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg';

    const [messages, setMessages] = useState({});
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(0);

    const handleNewMessage = async () => {
        if(!to || !subject || !message) {
            setError('Missing Information...');
            return;
        } else {
            setError('');
            const response = await axios.post(config.server.api_baseurl + '/api/createMessage', {
                receiver: to,
                subject: subject,
                message: message
            } ,{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('gal_token')
                }
            });
            if(response.data.status == 200) {
                alert('message sent!');
                setTo('');
                setSubject('');
                setMessage('');
                document.getElementById('newMessage').reset();
                refreshMessages();
            } else {
                setError(response.data.data);
            }
        }
    }

    useEffect(() => {
        (async () => {
            const messages = await axios.get(config.server.api_baseurl + '/api/getAllMessages', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('gal_token')
                }
            });
            if(messages.data.status == 200) {
                setMessages(messages.data.data);
            }
        })();
    },[]);

    const refreshMessages = async () => {
        const messages = await axios.get(config.server.api_baseurl + '/api/getAllMessages', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('gal_token')
            }
        });
        if(messages.data.status == 200) {
            setMessages(messages.data.data);
        }
    }

    return (
        <AuthContext.Consumer>{(context) => {
            if(!context.isAuth) {
                return <Redirect to="/login" />
            }
            return (
                <>
                <Container text className="middleDiv">
                    <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={[
                        { menuItem: 'New Message', render: () => (
                        <Tab.Pane>
                            <Form id="newMessage" onSubmit={handleNewMessage}>
                                <Form.Field>
                                    <label>To</label>
                                    <input placeholder='Username' onChange={(e) => setTo(e.target.value) }/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Subject</label>
                                    <input placeholder='Subject..' onChange={(e) => setSubject(e.target.value) }/>
                                </Form.Field>
                                <Form.TextArea style={{resize:'none'}} label='Message..' placeholder='Tell us more about you...' onChange={(e) => setMessage(e.target.value) }/>
                                <Button color='green' type='submit'>Send</Button>
                                <Message negative style={{display: error ? 'block' : 'none'}}>{error}</Message>
                            </Form>
                        </Tab.Pane>)
                        },
                        { menuItem: 'Inbox', render: () => (
                            <Tab.Pane>
                                <Feed>
                                    {messages && messages.received.map(obj => {
                                        return (<><Feed.Event image={image} date={new Date(obj.created_at).toDateString()} summary={obj.subject} extraText={obj.message} /><hr/></>)
                                    })}
                                </Feed>
                            </Tab.Pane>
                        ) },
                        { menuItem: 'Sent', render: () => (
                            <Tab.Pane>
                                <Feed>
                                    {messages && messages.sent.map(obj => {
                                        return (<><Feed.Event image={image} date={new Date(obj.created_at).toDateString()} summary={obj.subject} extraText={obj.message} /><hr/></>)
                                    })}
                                </Feed>
                            </Tab.Pane>
                        ) }
                    ]} />
                    <Button className="refreshBtn" onClick={() => refreshMessages() }>Refresh Messages</Button>
                    <Button color='red' size='large' className="logout" onClick={() => {
                        context.setIsAuth(false);
                        localStorage.removeItem('gal_token');
                        localStorage.removeItem('gal_user_id');
                        window.location.reload();
                    }}>Logout</Button>
                </Container>
                <Modal
                    size={'tiny'}
                    open={modalOpen}
                    onClose={() => setModalOpen(0)}
                >
                    <Modal.Header>Delete Your Account</Modal.Header>
                    <Modal.Content>
                    <p>Are you sure you want to delete your account</p>
                    </Modal.Content>
                    <Modal.Actions>
                    <Button negative onClick={() => setModalOpen(0)}>
                        close
                    </Button>
                    </Modal.Actions>
                </Modal>
            </>
                
            )
        }}
        </AuthContext.Consumer>
    )
}

export default Dashboard;