import React from 'react';

// Format the API response for rendering
const formatApiResponse = (response) => {
  if (typeof response !== 'string') {
    return { __html: '<p>Invalid response format</p>' };
  }

  // Replace **heading** with <h2>heading</h2>
  const formattedResponse = response
    .replace(/\*\*(.*?)\*\*/g, '<h2>$1</h2>') // Replace **heading** with <h2>heading</h2>
    .replace(/- (.*?)(?=\n|$)/g, '<li>$1</li>') // Replace - item with <li>item</li>
    .replace(/<\/li>\n<li>/g, '</li><li>') // Remove newlines between <li> elements
    .replace(/(?:<\/li>\n)+/g, '</li>') // Remove remaining newlines after <li> elements
    .replace(/(?:<li>(.*?)<\/li>)+/g, '<ul>$&</ul>') // Wrap <li> elements with <ul>
    .replace(/<\/ul>\n<ul>/g, '') // Remove empty <ul> tags between lists
    .replace(/\n\n/g, '</ul><p>') // Replace double newlines with </ul><p>
    .replace(/\n/g, ''); // Remove remaining newlines

  return { __html: formattedResponse };
};

const ApiResponseComponent = ({ response }) => {
  return (
    <div dangerouslySetInnerHTML={formatApiResponse(response)} />
  );
};

export default ApiResponseComponent;
