import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, IconButton, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import api from "../api"; // Adjust the import as needed

export default function Questions({ transcript }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const handleSendMessage = async () => {
        if (message.trim()) {
            setMessages([...messages, { text: message, sender: 'user' }]);
            setMessage('');

            if (transcript) {
                try {
                    const response = await api.post('/api/ask-question/', {
                        transcript: transcript,
                        question: message,
                    });

                    if (response.status === 200) {
                        const formattedAnswer = formatResponse(response.data.response);
                        setMessages(prevMessages => [
                            ...prevMessages,
                            { text: formattedAnswer, sender: 'bot' },
                        ]);
                    } else {
                        setMessages(prevMessages => [
                            ...prevMessages,
                            { text: 'Error: Could not retrieve the answer.', sender: 'bot' },
                        ]);
                    }
                } catch (err) {
                    setMessages(prevMessages => [
                        ...prevMessages,
                        { text: `Error: ${err.message}`, sender: 'bot' },
                    ]);
                }
            } else {
                setMessages(prevMessages => [
                    ...prevMessages,
                    { text: 'Error: No transcript available.', sender: 'bot' },
                ]);
            }
        }
    };

    const formatResponse = (response) => {
        return response
            .replace(/\n/g, '<br />') // Replace new lines with <br />
            .replace(/- /g, '<li>') // Replace bullet points with list items
            .replace(/(?:<li>.*<\/li>\s*)+/g, (match) => `<ul>${match}</ul>`) // Wrap list items in a <ul> tag
            .replace(/<\/li>\s*<\/ul>\s*<ul>/g, '</li><li>') // Fix spacing between lists
            .replace(/<\/li>\s*$/g, '</li>'); // Close any open list item tags
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            justifyContent="space-between" 
            height="500px"
            mx="auto"
            bgcolor="background.default"
            p={2}
        >
            <Box sx={{ width: { sm: '100%'} }}>
                <Typography
                    component="h2"
                    variant="h4"
                    gutterBottom
                    sx={{ color: 'text.primary' }}
                >
                    Ask Questions
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 } }}
                >
                    Provide a brief overview of the key features of the product. For example,
                    you could list the number of features, their types or benefits, and
                    add-ons.
                </Typography>
            </Box>

            {/* Messages Display */}
            <Box 
                flexGrow={1} 
                overflow="auto" 
                mb={2}
                display="flex"
                flexDirection="column"
            >
                {messages.map((msg, index) => (
                    <Box 
                        key={index} 
                        display="flex" 
                        justifyContent={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
                        mb={1}
                    >
                        <Typography 
                            variant="body1" 
                            bgcolor={msg.sender === 'user' ? 'primary.main' : 'grey.300'}
                            color={msg.sender === 'user' ? 'white' : 'black'}
                            p={1}
                            borderRadius="10px"
                            maxWidth="80%"
                            sx={{ wordWrap: 'break-word' }} // Correct property name
                            dangerouslySetInnerHTML={{ __html: msg.text }} // Render HTML content
                        />
                    </Box>
                ))}
                <div ref={messagesEndRef} />
            </Box>

            {/* Input Field */}
            <Box display="flex" alignItems="center">
                <TextField
                    variant="outlined"
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' ? handleSendMessage() : null}
                />
                <IconButton 
                    color="primary" 
                    onClick={handleSendMessage} 
                    sx={{ ml: 1 }}
                >
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    );
}
