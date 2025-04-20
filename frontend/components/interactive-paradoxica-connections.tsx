import React, { useState } from 'react';
import { Info, ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react';

const ConstellationNode = ({ title, subtitle, description, color, icon, x, y, size = 100, onClick, isActive, isHovered }) => {
  return (
    <div 
      className={`absolute rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${isActive ? 'ring-4 ring-white shadow-lg scale-110' : ''} ${isHovered ? 'ring-2 ring-white scale-105' : ''}`}
      style={{ 
        width: size, 
        height: size, 
        left: `calc(${x}% - ${size/2}px)`, 
        top: `calc(${y}% - ${size/2}px)`,
        backgroundColor: color,
        boxShadow: isActive ? '0 0 20px 5px rgba(255,255,255,0.5)' : '0 0 10px 2px rgba(255,255,255,0.2)'
      }}
      onClick={onClick}
    >
      <div className="text-white text-3xl mb-1">{icon}</div>
      <div className="text-white text-xs font-bold text-center px-2">{title}</div>
    </div>
  );
};

const ConnectionEdge = ({ startX, startY, endX, endY, label, isActive, onClick, isSelected }) => {
  // Calculate midpoint for label
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  
  // Calculate angle for arrow rotation
  const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
  
  // Calculate length
  const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  
  return (
    <>
      <div 
        className={`absolute h-1 cursor-pointer transition-all duration-300 ${isActive ? 'bg-white' : 'bg-gray-500'} ${isSelected ? 'bg-yellow-400 h-2' : ''}`}
        style={{
          width: `${length}%`,
          left: `${startX}%`,
          top: `${startY}%`,
          transformOrigin: 'left center',
          transform: `rotate(${angle}deg)`,
          zIndex: 10
        }}
        onClick={onClick}
      />
      
      {/* Arrow head */}
      <div 
        className={`absolute w-3 h-3 transition-all duration-300 ${isActive ? 'border-white' : 'border-gray-500'} ${isSelected ? 'border-yellow-400' : ''}`}
        style={{
          left: `${endX}%`,
          top: `${endY}%`,
          transform: `translate(-50%, -50%) rotate(${angle + 45}deg)`,
          borderTop: '2px solid',
          borderRight: '2px solid',
          marginLeft: '-1px',
          marginTop: '-1px',
          zIndex: 11
        }}
      />
      
      {label && (
        <div 
          className={`absolute bg-black bg-opacity-80 px-3 py-2 rounded text-xs whitespace-nowrap z-20 transition-all duration-300 cursor-pointer ${isActive ? 'text-white' : 'text-gray-300'} ${isSelected ? 'bg-yellow-900 bg-opacity-90 text-yellow-200 text-sm' : ''}`} 
          style={{
            left: `${midX}%`,
            top: `${midY}%`,
            transform: 'translate(-50%, -50%)',
            maxWidth: '150px',
            textAlign: 'center'
          }}
          onClick={onClick}
        >
          {label}
        </div>
      )}
    </>
  );
};

const ConnectionNode = ({ x, y, connectionData, isActive, onClick, isSelected }) => {
  return (
    <div 
      className={`absolute rounded-lg p-2 cursor-pointer transition-all duration-300 z-30
        ${isActive ? 'bg-white bg-opacity-20' : 'bg-black bg-opacity-60'} 
        ${isSelected ? 'bg-yellow-900 bg-opacity-80 ring-2 ring-yellow-400' : ''}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        minWidth: '120px',
        maxWidth: '140px'
      }}
      onClick={onClick}
    >
      <h4 className={`text-center text-xs font-bold mb-1 ${isSelected ? 'text-yellow-200' : 'text-white'}`}>
        {connectionData.label}
      </h4>
      {isSelected && (
        <p className="text-xs text-gray-200 mt-2">
          {connectionData.description}
        </p>
      )}
    </div>
  );
};

const ParadoxicalEcosystem = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [viewMode, setViewMode] = useState('constellation'); // 'constellation' or 'connections'
  
  const nodes = [
    {
      id: 'principia',
      title: 'Principia Paradoxica',
      subtitle: 'North Star (Seed)',
      description: 'The guiding mythic narrative at the center of the sky. It provides mythic and moral direction, orienting all other activities. This is the ethical compass of the ecosystem.',
      color: '#3a86ff',
      icon: '✧',
      x: 50,
      y: 20,
      size: 120
    },
    {
      id: 'foundry',
      title: 'Paradox Foundry',
      subtitle: 'Forge & Telescope (Fertile Soil)',
      description: 'The creative tech engine turning ideas into tangible tools. It\'s the R&D crucible forging AI algorithms and interactive platforms. This is the innovation hub.',
      color: '#ff006e',
      icon: '⚒️',
      x: 20,
      y: 50,
      size: 100
    },
    {
      id: 'heart',
      title: 'Mariem\'s Heart',
      subtitle: 'Planet (Fruit-Bearing Tree)',
      description: 'The on-the-ground community project where narrative principles bear real fruit. It\'s teeming with life – real people in workshops providing reality checks and demonstrable impact. This is the community innovation lab.',
      color: '#8338ec',
      icon: '♥',
      x: 80,
      y: 50,
      size: 100
    },
    {
      id: 'dao',
      title: 'DAO IZM (DUNA)',
      subtitle: 'Cosmic Web (Pollinator/Rain)',
      description: 'The decentralised governance layer connecting all nodes. It\'s the invisible gravitational web linking participants and resources, analogous to bees pollinating or rain nurturing all plants. This is the participatory funding network.',
      color: '#fb5607',
      icon: '⊛',
      x: 50,
      y: 80,
      size: 100
    },
    {
      id: 'holdings',
      title: 'Paradoxical Holdings',
      subtitle: 'Galactic Center (Gardener/Trellis)',
      description: 'The legal/financial spine holding the ecosystem together. As the axis that the constellation rotates around, it provides stability and oversight. This is the mission anchor & vault.',
      color: '#ffbe0b',
      icon: '⊕',
      x: 50,
      y: 50,
      size: 80
    }
  ];
  
  const connections = [
    { 
      id: 'p-to-f',
      from: 'principia', 
      to: 'foundry', 
      label: 'Mythic Requirements',
      description: 'Narrative requirements and ethical cues that guide technological development.',
      examples: ['Story themes requiring new AI capabilities', 'Ethical constraints from narrative dilemmas']
    },
    { 
      id: 'p-to-h',
      from: 'principia', 
      to: 'heart', 
      label: 'Inspiration & Values',
      description: 'Inspirational stories and themes that motivate and guide community actions.',
      examples: ['Character journeys inspiring workshop formats', 'Moral dilemmas adapted for educational use']
    },
    { 
      id: 'p-to-d',
      from: 'principia', 
      to: 'dao', 
      label: 'Guiding Principles',
      description: 'Ethical frameworks from the narrative that inform governance structures.',
      examples: ['Narrative governance models adapted to DAO structure', 'Story-driven ethical guidelines']
    },
    
    { 
      id: 'f-to-p',
      from: 'foundry', 
      to: 'principia', 
      label: 'Tech Prototypes & Story Data',
      description: 'New interactive platforms and AI insights that expand the narrative possibilities.',
      examples: ['AI-generated story branches', 'User interaction patterns informing narrative direction']
    },
    { 
      id: 'f-to-h',
      from: 'foundry', 
      to: 'heart', 
      label: 'Tools & Training',
      description: 'Technologies and expertise delivered for community use in real-world settings.',
      examples: ['Infinite Weiqi software', 'Robotics kits', 'AI learning platforms']
    },
    { 
      id: 'f-to-d',
      from: 'foundry', 
      to: 'dao', 
      label: 'AI Outputs & Funding Proposals',
      description: 'Research reports and AI models that inform policy decisions and funding allocation.',
      examples: ['AI governance frameworks', 'Technical roadmaps for community voting']
    },
    
    { 
      id: 'h-to-p',
      from: 'heart', 
      to: 'principia', 
      label: 'Community Stories & Data',
      description: 'Real-world experiences and feedback that enrich the central narrative.',
      examples: ['Workshop outcomes feeding back into story development', 'Cultural insights from diverse communities']
    },
    { 
      id: 'h-to-f',
      from: 'heart', 
      to: 'foundry', 
      label: 'Field Feedback & Co-innovation',
      description: 'Practical feedback on tools and co-created innovations from community implementation.',
      examples: ['Feature requests from field use', 'User testing data', 'Locally designed adaptations']
    },
    { 
      id: 'h-to-d',
      from: 'heart', 
      to: 'dao', 
      label: 'Impact Reports & Proposals',
      description: 'Evidence of impact and new project proposals seeking community support.',
      examples: ['Documented outcomes', 'New community needs', 'Expansion proposals']
    },
    
    { 
      id: 'd-to-p',
      from: 'dao', 
      to: 'principia', 
      label: 'Crowd Story Influence',
      description: 'Community decisions that directly shape narrative directions and resolutions.',
      examples: ['Voting on narrative outcomes', 'Collective resolution of ethical dilemmas']
    },
    { 
      id: 'd-to-f',
      from: 'dao', 
      to: 'foundry', 
      label: 'Crowdsourced R&D Direction',
      description: 'Collective intelligence and funding priorities that guide research and development.',
      examples: ['Community-prioritized feature development', 'Distributed problem-solving']
    },
    { 
      id: 'd-to-h',
      from: 'dao', 
      to: 'heart', 
      label: 'Resource Allocation & Governance',
      description: 'Funding decisions and volunteer coordination for community projects.',
      examples: ['Token-based project funding', 'Volunteer matching to local initiatives']
    },
    
    { 
      id: 'hold-to-p',
      from: 'holdings', 
      to: 'principia', 
      label: 'IP Stewardship',
      description: 'Legal ownership and licensing that ensures story assets are protected.',
      examples: ['Copyright protection', 'Creative Commons licensing strategies']
    },
    { 
      id: 'hold-to-f',
      from: 'holdings', 
      to: 'foundry', 
      label: 'IP Stewardship',
      description: 'Patent management and licensing for technological innovations.',
      examples: ['Patent applications', 'Open source licensing frameworks']
    },
    { 
      id: 'hold-to-h',
      from: 'holdings', 
      to: 'heart', 
      label: 'License & Oversight',
      description: 'Governance support and brand/IP licensing for community initiatives.',
      examples: ['Community trademark usage', 'Legal templates for local partnerships']
    },
    { 
      id: 'hold-to-d',
      from: 'holdings', 
      to: 'dao', 
      label: 'Legal Bridge & Assurance',
      description: 'Legal interface and backup support for decentralized operations.',
      examples: ['Legal compliance frameworks', 'Treasury management', 'Dispute resolution']
    }
  ];
  
  // Position connection nodes between entity nodes
  const connectionNodes = connections.map(conn => {
    const fromNode = nodes.find(n => n.id === conn.from);
    const toNode = nodes.find(n => n.id === conn.to);
    
    // Calculate position (slightly offset from direct line)
    const midX = (fromNode.x + toNode.x) / 2;
    const midY = (fromNode.y + toNode.y) / 2;
    
    // Slightly offset based on connection id to prevent overlap
    const hashCode = conn.id.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const offset = 4;
    const offsetX = offset * Math.cos(hashCode);
    const offsetY = offset * Math.sin(hashCode);
    
    return {
      ...conn,
      x: midX + offsetX,
      y: midY + offsetY
    };
  });
  
  const isConnectionActive = (connection) => {
    return activeNode === connection.from || activeNode === connection.to;
  };
  
  const isNodeHovered = (nodeId) => {
    if (!hoveredNode) return false;
    return hoveredNode === nodeId;
  };
  
  const handleConnectionClick = (connectionId) => {
    setSelectedConnection(selectedConnection === connectionId ? null : connectionId);
  };
  
  return (
    <div className="relative bg-gray-900 rounded-xl w-full h-screen min-h-[600px] max-h-[700px] overflow-hidden">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-30 flex space-x-2">
        <button 
          className="bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700 transition"
          onClick={() => setShowInfo(!showInfo)}
        >
          <Info size={20} />
        </button>
        <button 
          className={`px-3 py-1 rounded-full text-xs font-bold transition ${viewMode === 'constellation' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setViewMode('constellation')}
        >
          Constellation View
        </button>
        <button 
          className={`px-3 py-1 rounded-full text-xs font-bold transition ${viewMode === 'connections' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setViewMode('connections')}
        >
          Connection Detail
        </button>
      </div>
      
      {showInfo && (
        <div className="absolute top-14 right-4 w-80 bg-black bg-opacity-80 p-4 rounded-lg text-white text-sm z-30 overflow-auto max-h-[80%]">
          <h3 className="text-lg font-bold mb-2">The Living Constellation</h3>
          <p className="mb-3">A modular storytelling structure where each entity represents a node in a cosmic ecosystem, with their interactions forming the connecting threads.</p>
          <p className="mb-2 text-gray-300">Click on any node to see its relationships. Click connections to explore details of each resource flow.</p>
          <div className="border-t border-gray-700 mt-4 pt-4">
            {selectedConnection ? (
              <>
                <h4 className="font-bold mb-1">{connections.find(c => c.id === selectedConnection)?.label}</h4>
                <p className="text-xs text-gray-300">
                  {connections.find(c => c.id === selectedConnection)?.from.toUpperCase()} → {connections.find(c => c.id === selectedConnection)?.to.toUpperCase()}
                </p>
                <p className="mt-2">{connections.find(c => c.id === selectedConnection)?.description}</p>
                {connections.find(c => c.id === selectedConnection)?.examples && (
                  <div className="mt-3">
                    <h5 className="text-xs font-bold text-gray-300">Examples:</h5>
                    <ul className="list-disc pl-4 mt-1 text-xs">
                      {connections.find(c => c.id === selectedConnection)?.examples.map((ex, i) => (
                        <li key={i}>{ex}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : activeNode ? (
              <>
                <h4 className="font-bold mb-2">{nodes.find(n => n.id === activeNode)?.title}</h4>
                <p className="text-xs text-gray-300">{nodes.find(n => n.id === activeNode)?.subtitle}</p>
                <p className="mt-2">{nodes.find(n => n.id === activeNode)?.description}</p>
              </>
            ) : (
              <>
                <h4 className="font-bold mb-2">Select a node or connection</h4>
                <p>Click on any node to view its details and connections, or click on a connection line to see examples of that resource flow.</p>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Star field background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 to-gray-950">
        {/* Generate stars */}
        {Array.from({ length: 100 }).map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full opacity-70"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite`
            }}
          />
        ))}
      </div>
      
      {/* Draw connections */}
      {viewMode === 'constellation' && connections.map((connection, index) => {
        const startNode = nodes.find(node => node.id === connection.from);
        const endNode = nodes.find(node => node.id === connection.to);
        
        return (
          <ConnectionEdge 
            key={index}
            startX={startNode.x}
            startY={startNode.y}
            endX={endNode.x}
            endY={endNode.y}
            label={connection.label}
            isActive={isConnectionActive(connection)}
            isSelected={selectedConnection === connection.id}
            onClick={() => handleConnectionClick(connection.id)}
          />
        );
      })}
      
      {/* Draw connection nodes in connection view */}
      {viewMode === 'connections' && connectionNodes.map((conn, index) => (
        <React.Fragment key={index}>
          {/* Draw subtle lines to originating nodes */}
          <div 
            className="absolute h-0.5 bg-gray-700 opacity-30"
            style={{
              width: `${Math.sqrt(Math.pow(conn.x - nodes.find(n => n.id === conn.from).x, 2) + Math.pow(conn.y - nodes.find(n => n.id === conn.from).y, 2))}%`,
              left: `${nodes.find(n => n.id === conn.from).x}%`,
              top: `${nodes.find(n => n.id === conn.from).y}%`,
              transformOrigin: 'left center',
              transform: `rotate(${Math.atan2(conn.y - nodes.find(n => n.id === conn.from).y, conn.x - nodes.find(n => n.id === conn.from).x) * 180 / Math.PI}deg)`,
              zIndex: 0
            }}
          />
          <div 
            className="absolute h-0.5 bg-gray-700 opacity-30"
            style={{
              width: `${Math.sqrt(Math.pow(conn.x - nodes.find(n => n.id === conn.to).x, 2) + Math.pow(conn.y - nodes.find(n => n.id === conn.to).y, 2))}%`,
              left: `${nodes.find(n => n.id === conn.to).x}%`,
              top: `${nodes.find(n => n.id === conn.to).y}%`,
              transformOrigin: 'left center',
              transform: `rotate(${Math.atan2(conn.y - nodes.find(n => n.id === conn.to).y, conn.x - nodes.find(n => n.id === conn.to).x) * 180 / Math.PI}deg)`,
              zIndex: 0
            }}
          />
          
          <ConnectionNode
            x={conn.x}
            y={conn.y}
            connectionData={conn}
            isActive={activeNode === conn.from || activeNode === conn.to}
            isSelected={selectedConnection === conn.id}
            onClick={() => handleConnectionClick(conn.id)}
          />
        </React.Fragment>
      ))}
      
      {/* Draw nodes */}
      {nodes.map(node => (
        <ConstellationNode 
          key={node.id}
          title={node.title}
          subtitle={node.subtitle}
          description={node.description}
          color={node.color}
          icon={node.icon}
          x={node.x}
          y={node.y}
          size={node.size}
          onClick={() => {
            setActiveNode(node.id === activeNode ? null : node.id);
            setSelectedConnection(null);
          }}
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
          isActive={activeNode === node.id}
          isHovered={isNodeHovered(node.id)}
        />
      ))}
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 p-3 rounded-lg text-white text-xs">
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          <span>North Star - Ethical Compass</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full bg-pink-600 mr-2"></div>
          <span>Forge - Innovation Hub</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full bg-purple-600 mr-2"></div>
          <span>Planet - Community Lab</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
          <span>Web - Participatory Network</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <span>Center - Mission Anchor</span>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default ParadoxicalEcosystem;
