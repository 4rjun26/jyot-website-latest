import { useState } from "react";
import { Box, Button, Input, Text, VStack, Spinner, useToast } from "@chakra-ui/react";

export default function CWP() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!question) {
      toast({
        title: "Error",
        description: "Please enter a question.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  
    setLoading(true);
    setResponse(null);
  
    try {
      const res = await fetch("/api/askAI", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
  
      const text = await res.text(); // Read response as text first
  
      try {
        const data = JSON.parse(text); // Try parsing JSON
        if (res.ok) {
          setResponse(data.answer);
        } else {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (jsonError) {
        throw new Error(`Unexpected response: ${text}`);
      }
    } catch (error) {
      toast({
        title: "Request Failed",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  
    setLoading(false);
  };
  
  return (
    <Box p={6} maxW="600px" mx="auto">
      <VStack spacing={4} align="stretch">
        <Text fontSize="xl" fontWeight="bold">
          Ask OpenAI a Question Based on Stored Text
        </Text>
        <Input
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleSubmit} isDisabled={loading}>
          {loading ? <Spinner size="sm" /> : "Submit"}
        </Button>
        {response && (
          <Box p={4} bg="gray.100" borderRadius="md">
            <Text fontSize="md" fontWeight="bold">OpenAI’s Response:</Text>
            <Text>{response}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}