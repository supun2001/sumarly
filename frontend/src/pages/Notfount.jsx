import React from 'react';
import ApiResponseComponent from '../components/Results';


const apiResponse = `
**What is Figma**
- Figma is a cloud-based design tool that allows real-time collaboration.
- Key features of Figma include: intuitive interface, real-time collaboration, design systems, version control, and integrations with other tools.
- Figma has free and paid plans. The paid plan offers more features and unlimited storage.

**Benefits of Using Figma**
- Allows you to collaborate with others in real-time on the same files.
- Has design system features to create and manage reusable components.
- Includes version control to track changes over time.
- Integrates with tools like Slack, Trello, and GitHub.

**Summary**
Figma is a cloud-based design tool focused on collaboration and workflow efficiency. Key benefits are real-time teamwork, design systems, version control, and tool integrations. It has free and paid plans.
`;

const App = () => {
  return (
    <div>
      <h1>API Response</h1>
      <ApiResponseComponent response={apiResponse} />
    </div>
  );
};

export default App;
