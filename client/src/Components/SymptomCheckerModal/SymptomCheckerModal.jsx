import { useState } from "react";
import {
  Modal,
  Button,
  Textarea,
  Stack,
  Text,
  Loader,
  Paper,
  Divider,
  Badge,
} from "@mantine/core";
import axios from "axios";
import { useEffect } from "react";

export default function SymptomCheckerModal({ opened, onClose }) {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loadingIndex, setLoadingIndex] = useState(0);

  const loadingSteps = [
  "Analyzing symptoms...",
  "Finding probable disease...",
  "Selecting appropriate doctor...",
  "Preparing recommendations...",
];

useEffect(() => {
  let interval;

  if (loading) {
    setLoadingIndex(0);

    interval = setInterval(() => {
      setLoadingIndex((prev) =>
        prev < loadingSteps.length - 1 ? prev + 1 : prev
      );
    }, 1500); // change text every 1.5 sec
  }

  return () => clearInterval(interval);
}, [loading]);

  const handleSubmit = async () => {
    if (!symptoms.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/ai/symptom-check`, { symptoms });

      // Expecting JSON string from backend
      const parsed =
        typeof res.data.result === "string"
          ? JSON.parse(res.data.result)
          : res.data.result;

      setResult(parsed);
      setSymptoms("")
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.log(err)
    }

    setLoading(false);
  };
  return (
    <Modal
      opened={opened}
      onClose={() => {
        setResult(null);
        setSymptoms("");
        setError("");
        setLoading(false);
        setLoadingIndex(0);
        onClose();
      }}
      title="AI Symptom Checker"
      centered
      size="lg"
      radius="md"
      zIndex="2000"
    >
      <Stack spacing="md">
        <Textarea
          label="Enter your symptoms"
          placeholder="Example: Fever, headache, body pain..."
          minRows={4}
          value={symptoms}
          onChange={(e) => setSymptoms(e.currentTarget.value)}
        />

        <Button
          fullWidth
          onClick={handleSubmit}
          loading={loading}
        >
          Get AI Suggestion
        </Button>

        {/* {loading && (
          <Stack align="center">
            <Loader />
            <Text size="sm" color="dimmed">
              Analyzing symptoms...
            </Text>
          </Stack>
        )} */}

        {loading && (
         <Stack align="center" gap="xs" mt="md">
           <Text key={loadingIndex}
             size="sm"
             c="orangered"
             ta="center"
             style={{ transition: "all 0.3s ease" }}>
             {loadingSteps[loadingIndex]}
           </Text>
         </Stack>
       )}

        {error && (
          <Text color="red" size="sm">
            {error}
          </Text>
        )}

        {result && (
          <Paper withBorder p="md" radius="md" shadow="xs">
            <Stack spacing="sm">
              <Divider label="AI Suggestion" labelPosition="center" />

              <Text fw={600}>
                Probable Disease:
              </Text>
              <Badge color="red" size="lg">
                {result.disease}
              </Badge>

              <Text fw={600}>
                Recommended Doctor:
              </Text>
              <Badge color="blue" size="lg">
                {result.doctor}
              </Badge>

              <Text fw={600}>
                Recommendation:
              </Text>
              <Text color="green" size="sm">
                {result.Recommendation}
              </Text>

              {result.homeRemedies && (
                <>
                  <Text fw={600}>
                    Home Remedies:
                  </Text>
                  <Text size="sm" color="dimmed">
                    {result.homeRemedies}
                  </Text>
                </>
              )}
            </Stack>
          </Paper>
        )}
      </Stack>
    </Modal>
  );
}