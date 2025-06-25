// import { useEffect } from "react";

// import { sessionState, useChatSession } from "@chainlit/react-client";
// import { useRecoilValue } from "recoil";
// import Playground from "./components/playground";

// const userEnv = {};

// function App() {
//   const { connect } = useChatSession();
//   const session = useRecoilValue(sessionState);

//   useEffect(() => {
//     console.log('session', session);
//     if (session?.socket.connected) {
//       return;
//     }
//     fetch("http://localhost:80/custom-auth", {credentials: "include"})
//       .then(() => {
//         connect({
//           userEnv
//         });
//       });
//   }, [connect, session]);

//   return (
//     <>
//       <div>
//         <Playground />
//       </div>
//     </>
//   );
// }

// export default App;

// React virtualization

import { FixedSizeList as List } from 'react-window';

// Generate large mock data
const generateMockData = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    name: `User ${index}`,
    message: `This is message number ${index}. It contains some sample text to demonstrate virtualization. Message ${index} has been generated for testing purposes.`,
    timestamp: new Date(Date.now() - Math.random() * 10000000000),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`,
    likes: Math.floor(Math.random() * 1000),
    replies: Math.floor(Math.random() * 100),
  }));
};

// Generate 10,000 items
const mockData = generateMockData(1000000);

const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
  const item = mockData[index];

  return (
    <div
      style={style}
      className="flex items-start space-x-3 p-4 border-b hover:bg-gray-50 transition-colors"
    >
      <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-medium text-gray-900">{item.name}</span>
          <span className="text-xs text-gray-500">{item.timestamp.toLocaleTimeString()}</span>
          <span className="text-xs text-gray-400">#{index + 1}</span>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">{item.message}</p>
        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
          <span>❤️ {item.likes}</span>
          <span>💬 {item.replies}</span>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">React Window Virtualization Demo</h1>

        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">How React Window Works</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>Total Items:</strong> {mockData.length.toLocaleString()}
            </p>
            <p>
              <strong>Item Height:</strong> 120px
            </p>
            <p>
              <strong>Container Height:</strong> 600px
            </p>
            <p>
              <strong>Visible Items:</strong> ~{Math.ceil(600 / 120) + 1} at a time
            </p>
            <p>
              <strong>Memory Usage:</strong> Constant regardless of data size
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-green-600">✅ Virtualized List (Fast)</h3>
          <List
            height={600} // Total height of the scroll container
            itemCount={mockData.length} // Total items
            itemSize={120} // Height of each item
            width="100%" // Width of the list
            className="border rounded-lg"
          >
            {Row}
          </List>
        </div>
      </div>
    </div>
  );
}

export default App;
