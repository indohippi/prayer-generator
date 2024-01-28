import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  Textarea
} from '@chakra-ui/react';
import PrayerDisplay from './PrayerDisplay';

const API_URL = process.env.REACT_APP_API_URL || 'http://ec2-3-21-122-71.us-east-2.compute.amazonaws.com:3000/generate-text';

function PrayerForm() {
  const [prayerRequest, setPrayerRequest] = useState({
    denomination: '',
    subjectType: '',
    subjectName: '',
    focus: [],
    additionalDetails: '',
    prayerLength: ''
  });
  const [generatedPrayer, setGeneratedPrayer] = useState('');

  const handleChange = (e) => {
    const { name, value, options } = e.target;
  
    if (name === 'focus') {
      // Handle multiple selection for focus
      const selectedOptions = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setPrayerRequest(prevState => ({ ...prevState, focus: selectedOptions }));
    } else {
      // Handle single value fields
      setPrayerRequest(prevState => ({ ...prevState, [name]: value }));
    }
  };  

  const handleFocusChange = (e) => {
    const options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPrayerRequest({ ...prayerRequest, focus: value });
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userPrompt = buildPromptFromState(prayerRequest);
  
    const messagesPayload = [{
      role: "user",
      content: userPrompt
    }];
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: messagesPayload }), // Sending messages array
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${data.message}`);
      }

      setGeneratedPrayer(data.response);
      console.log('Generated Prayer:', data.response); // Adjusted to match the backend's response structure
      // Handle the successful response data here, like displaying it in the UI
    } catch (error) {
      console.error("Error making API call: ", error);
    }
  };  


  return (
    <VStack as="form" onSubmit={handleSubmit} spacing={4}>
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
            <option value="other">Other/Non-Denominational</option>        </Select>
      </FormControl>

      <FormControl id="subjectType">
        <FormLabel>Subject Type</FormLabel>
        <Select name="subjectType" onChange={handleChange} placeholder="Select subject type">
              <option value="person">Person</option>
              <option value="place">Place</option>
              <option value="event">Event</option>
              <option value="other">Other</option>
            </Select>
      </FormControl>

      {prayerRequest.subjectType && (
        <FormControl id="subjectName">
          <FormLabel>{`Name of the ${prayerRequest.subjectType}`}</FormLabel>
          <Input
            name="subjectName"
            onChange={handleChange}
            placeholder={`Enter the name of the ${prayerRequest.subjectType}`}
          />
        </FormControl>
      )}

      <FormControl id="focus">
        <FormLabel>Focus Area</FormLabel>
        <Select name="focus" onChange={handleChange} placeholder="Select focus area">
        <option value="gratitude">Gratitude</option>
            <option value="guidance">Guidance</option>
            <option value="healing">Healing</option>
            <option value="other">Other</option>        </Select>
      </FormControl>

      <FormControl id="additionalDetails">
        <FormLabel>Prayer Details</FormLabel>
        <Textarea
          name="additionalDetails"
          onChange={handleChange}
          placeholder="Enter additional details for your prayer"
        />
      </FormControl>

      <FormControl id="prayerLength">
        <FormLabel>Prayer Length</FormLabel>
        <Select name="prayerLength" onChange={handleChange} placeholder="Select prayer length">
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </Select>
      </FormControl>

      <Button type="submit" colorScheme="blue">Submit Prayer Request</Button>
    </VStack>
  );
}

export default PrayerForm;
