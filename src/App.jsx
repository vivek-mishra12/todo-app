import React from 'react';
import Todo from './assets/components/Todo';
import AIChatbot from './assets/components/AIChatbot'; // New import

const App = () => {
  return (
    <div className='bg-stone-900 grid py-4 min-h-screen'>
      {/* New container for side-by-side layout */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-8 place-self-center max-w-7xl w-full'>

        <div className="col-span-1">
          <Todo />
        </div>

        <div className="col-span-1">
           <AIChatbot />
        </div>

      </div>
    </div>
  );
};

export default App;