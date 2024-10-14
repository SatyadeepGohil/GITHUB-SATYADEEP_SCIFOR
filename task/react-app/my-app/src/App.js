import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';

class Students extends React.Component {
  // constructor is used to invoke object state in class
  constructor() {
    // it is used to access parent properties and methods from the child component
    // super() is used to invoke parent class constructor
    super();
  }

  render() {
    return (<h1>Hello guys</h1>);
  }
}

// Render the Students component inside the root element
const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Students /> renders the Students component)
root.render(<Students/>);

export default Students