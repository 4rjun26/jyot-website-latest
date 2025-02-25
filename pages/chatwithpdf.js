import { useState } from "react";
import { Box, Button, Input, Text, VStack, Spinner, useToast } from "@chakra-ui/react";

export default function CWP() {
  const [pdfURL, setPdfURL] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!pdfURL) {
      toast({
        title: "Error",
        description: "Please enter a valid PDF URL.",
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
        body: JSON.stringify({ pdfURL }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data);
      } else {
        toast({
          title: "API Error",
          description: data.error || "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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
          Upload PDF URL for Claude AI Processing
        </Text>
        <Input
          placeholder="Enter PDF URL"
          value={pdfURL}
          onChange={(e) => setPdfURL(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleSubmit} isDisabled={loading}>
          {loading ? <Spinner size="sm" /> : "Submit"}
        </Button>
        {response && (
          <Box p={4} bg="gray.100" borderRadius="md">
            <Text fontSize="md" fontWeight="bold">Claude’s Response:</Text>
            <Text>{JSON.stringify(response, null, 2)}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
