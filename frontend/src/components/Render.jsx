import React from 'react';

const parseText = (text) => {
    // Split the text by lines
    const lines = text.split('\n');
    const elements = [];

    lines.forEach(line => {
        if (line.startsWith('**') && line.endsWith('**')) {
            // Heading (bold text)
            elements.push(<h3 key={line}>{line.replace(/\*\*/g, '')}</h3>);
        } else if (line.startsWith('- ')) {
            // Bullet point
            if (!elements.length || elements[elements.length - 1].type !== 'ul') {
                elements.push(<ul key={line + 'ul'}><li key={line}>{line.substring(2)}</li></ul>);
            } else {
                elements[elements.length - 1].props.children.push(<li key={line}>{line.substring(2)}</li>);
            }
        } else {
            // Regular text
            elements.push(<p key={line}>{line}</p>);
        }
    });

    return elements;
};
