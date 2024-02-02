import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@chakra-ui/react';

const API_URL = process.env.REACT_APP_API_URL || 'http://ec2-3-21-122-71.us-east-2.compute.amazonaws.com:3000/generate-text';

function PrayerForm({ setPrayer }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [prayerRequest, setPrayerRequest] = useState({
    denomination: '',
    subjectType: '',
    subjectName: '',
    focus: [],
    additionalDetails: '',
    prayerLength: ''
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (e) => {
    const { name, value, options } = e.target;

    if (name === 'focus') {
      const selectedOptions = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setPrayerRequest(prevState => ({ ...prevState, [name]: selectedOptions }));
    } else {
      setPrayerRequest(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const buildPromptFromState = (request) => {
    let prompt = `Generate a ${request.denomination} prayer`;
    if (request.subjectType && request.subjectName) {
      prompt += ` for ${request.subjectType}: ${request.subjectName}`;
    }
    if (request.focus.length > 0) {
      prompt += `. Focus on: ${request.focus.join(', ')}`;
    }
    if (request.additionalDetails) {
      prompt += `. Additional details: ${request.additionalDetails}`;
    }
    if (request.prayerLength) {
      prompt += `. This should be a ${request.prayerLength} prayer.`;
    }
    return prompt;
  };

  const handleNext = () => {
    if (currentStep < 6) { // Assuming there are 5 steps
      setCurrentStep(current => current + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    onOpen();
    const userPrompt = buildPromptFromState(prayerRequest);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [{ role: "user", content: userPrompt }] }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${data.message}`);
      }

      setPrayer(data.response);
    } catch (error) {
      console.error("Error making API call: ", error);
    } finally {
      onClose();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormControl id="denomination">
            <FormLabel>Denomination</FormLabel>
            <Select name="denomination" onChange={handleChange} placeholder="Select denomination">
              <option value="baptist">Baptist</option>
              <option value="orthodox">Orthodox</option>
              <option value="catholic">Catholic</option>
              <option value="methodist">Methodist</option>
              <option value="protestant">Protestant</option>
              <option value="mormon">Mormon</option>
              <option value="lutheran">Lutheran</option>
              <option value="pentecostal">Pentecostal</option>
              <option value="other">Other/Non-Denominational</option>
            </Select>
          </FormControl>
        );
      case 2:
        return (
          <FormControl id="subjectType">
            <FormLabel>Subject Type</FormLabel>
            <Select name="subjectType" onChange={handleChange} placeholder="Select subject type">
              <option value="person">Person</option>
              <option value="place">Place</option>
              <option value="event">Event</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>
        );
      case 3:
        return (
          <FormControl id="subjectName">
            <FormLabel>Subject Name</FormLabel>
            <Input
              name="subjectName"
              value={prayerRequest.subjectName}
              onChange={handleChange}
              placeholder="Enter the subject name"
            />
          </FormControl>
        );
      case 4:
        return (
          <FormControl id="focus">
            <FormLabel>Focus Area</FormLabel>
            <Select name="focus" onChange={handleChange} placeholder="Select focus area" multiple>
              <option value="gratitude">Gratitude</option>
              <option value="guidance">Guidance</option>
              <option value="healing">Healing</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>
        );
        case 5:
            return (
              <FormControl id="prayerLength">
                <FormLabel>Prayer Length</FormLabel>
                <Select
                  name="prayerLength"
                  value={prayerRequest.prayerLength}
                  onChange={handleChange}
                  placeholder="Select prayer length"
                >
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </Select>
              </FormControl>
            );
          case 6:
            return (
              <FormControl id="additionalDetails">
                <FormLabel>Additional Details</FormLabel>
                <Textarea
                  name="additionalDetails"
                  value={prayerRequest.additionalDetails}
                  onChange={handleChange}
                  placeholder="Enter any additional details for your prayer"
                />
              </FormControl>
            );               
      default:
        return null; // This will be replaced by the PrayerDisplay component if needed
    }
  };
  

  return (
    <>
      <VStack as="form" onSubmit={(e) => e.preventDefault()} spacing={4}>
        {renderStepContent()}
        <Button onClick={handleNext} colorScheme="blue">
          {currentStep < 6 ? 'Next' : 'Submit Prayer Request'}
        </Button>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submitting your Prayer Request</ModalHeader>
          <ModalBody>
            {/* You can place a spinner here while waiting for the response */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PrayerForm;
