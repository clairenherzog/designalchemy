import { useState } from 'react';
import { ArrowDown } from 'lucide-react';

export default function DesignAlchemyLab() {
  const [currentFlask, setCurrentFlask] = useState(0);
  const [flasks, setFlasks] = useState([
    { filled: false, colors: [], text: '', ingredients: [] },
    { filled: false, colors: [], text: '', ingredients: [] },
    { filled: false, colors: [], text: '', ingredients: [] }
  ]);
  const [selectedTubes, setSelectedTubes] = useState([]);
  const [pouring, setPouring] = useState([]);

  const testTubes = [
    {
      id: 'learnedness',
      name: 'Spirit of Eternal Learnedness',
      colors: ['#FFD700', '#FFA500'],
      glowColor: '#FFD700'
    },
    {
      id: 'analytica',
      name: 'Elixir Analytica',
      colors: ['#00CED1', '#4169E1'],
      glowColor: '#00CED1'
    },
    {
      id: 'manyfaces',
      name: 'Substance of Many Faces',
      colors: ['#32CD32', '#FFD700'],
      glowColor: '#32CD32'
    },
    {
      id: 'curiosa',
      name: 'Elixir Curiosa',
      colors: ['#FF69B4', '#FFD700'],
      glowColor: '#FF69B4'
    },
    {
      id: 'collaboration',
      name: 'Concoction of Collaboration',
      colors: ['#9370DB', '#4169E1'],
      glowColor: '#9370DB'
    }
  ];

  const mixSequence = [
    { tubes: ['learnedness', 'collaboration'], flask: 0 },
    { tubes: ['analytica', 'curiosa'], flask: 1 },
    { tubes: ['manyfaces', 'analytica'], flask: 2 }
  ];

  const mixResults = {
    'learnedness-collaboration': {
      colors: ['#FFD700', '#9370DB'],
      text: 'Learning that 10% of BUCK\'s leadership started as interns ignited my passion. I\'m ready to grow from emerging talent to creative leader in an environment that values fresh voices and collaborative excellence.'
    },
    'collaboration-learnedness': {
      colors: ['#FFD700', '#9370DB'],
      text: 'Learning that 10% of BUCK\'s leadership started as interns ignited my passion. I\'m ready to grow from emerging talent to creative leader in an environment that values fresh voices and collaborative excellence.'
    },
    'analytica-curiosa': {
      colors: ['#00CED1', '#FF69B4'],
      text: 'My analytical mindset meets experimental curiosity. I approach design with both strategic thinking and playful exploration—balancing data-driven decisions with bold creative risks, just like BUCK\'s multifaceted approach.'
    },
    'curiosa-analytica': {
      colors: ['#00CED1', '#FF69B4'],
      text: 'My analytical mindset meets experimental curiosity. I approach design with both strategic thinking and playful exploration—balancing data-driven decisions with bold creative risks, just like BUCK\'s multifaceted approach.'
    },
    'manyfaces-analytica': {
      colors: ['#32CD32', '#00CED1'],
      text: 'My cross-disciplinary versatility—from motion graphics to 3D modeling to UX design—is strengthened by analytical rigor. I adapt my craft to any challenge while maintaining strategic clarity, matching BUCK\'s style-agnostic philosophy.'
    },
    'analytica-manyfaces': {
      colors: ['#32CD32', '#00CED1'],
      text: 'My cross-disciplinary versatility—from motion graphics to 3D modeling to UX design—is strengthened by analytical rigor. I adapt my craft to any challenge while maintaining strategic clarity, matching BUCK\'s style-agnostic philosophy.'
    }
  };

  // (Removed unused bubbles/particles state and effect to avoid unused variable lint errors)

  const getActiveGlowingTubes = () => {
    if (currentFlask < mixSequence.length) {
      return mixSequence[currentFlask].tubes;
    }
    return [];
  };

  const isGlowing = (tubeId) => {
    return getActiveGlowingTubes().includes(tubeId);
  };

  const isDisabled = (tubeId) => {
    return !isGlowing(tubeId);
  };

  const handleTubeClick = (tubeId) => {
    if (isDisabled(tubeId) || pouring.length > 0) return;

    // Check if tube is already selected - if so, deselect it
    if (selectedTubes.includes(tubeId)) {
      setSelectedTubes(selectedTubes.filter(id => id !== tubeId));
      return;
    }

    // Don't allow more than 2 selections
    if (selectedTubes.length >= 2) return;

    const newSelected = [...selectedTubes, tubeId];
    setSelectedTubes(newSelected);

    if (newSelected.length === 2) {
      setPouring(newSelected);

      setTimeout(() => {
        const mixKey = `${newSelected[0]}-${newSelected[1]}`;
        const result = mixResults[mixKey];

        if (!result) {
          // Gracefully handle unknown mixes: reset selection & pouring
          // You can improve UX here (show a message) if desired
          console.warn(`No mix result for key: ${mixKey}`);
          setSelectedTubes([]);
          setPouring([]);
          return;
        }

        const newFlasks = [...flasks];
        newFlasks[currentFlask] = {
          filled: true,
          colors: result.colors,
          text: result.text,
          ingredients: newSelected
        };

        setFlasks(newFlasks);
        setSelectedTubes([]);
        setCurrentFlask(prev => prev + 1);
        setPouring([]);
      }, 2000);
    }
  };

  const getCurrentInstructions = () => {
    if (currentFlask === 0) {
      return "Click the two glowing test tubes to pour them into the first flask!";
    } else if (currentFlask === 1) {
      return "Now mix the next two glowing elements into the second flask!";
    } else if (currentFlask === 2) {
      return "Final mix! Pour the glowing elements into the last flask!";
    } else {
      return "All potions created! See what happens when you combine different aspects of design.";
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 overflow-hidden relative bg-white">
      {/* Background images on both sides */}
      <div
        className="hidden md:block fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{
          backgroundImage: 'url(https://i.imgur.com/i1cF3LP.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left -20% center',
          backgroundSize: '30%'
        }}
      ></div>
      <div
        className="hidden md:block fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{
          backgroundImage: 'url(https://i.imgur.com/h6nIP8S.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right -20% center',
          backgroundSize: '30%'
        }}
      ></div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Styleturn&family=Black+Chancery&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Almendra:wght@400;700&display=swap');

          .medieval-title {
            font-family: 'UnifrakturMaguntia', 'Old English Text MT', 'Blackletter', serif;
            letter-spacing: 0.05em;
          }

          .ancient-title {
            font-family: 'UnifrakturMaguntia', 'Old English Text MT', 'Blackletter', serif;
            letter-spacing: 0.05em;
          }

          .typewriter {
            overflow: hidden;
            border-right: 3px solid black;
            white-space: nowrap;
            animation: typing 3s steps(26, end), blink-caret 1s step-end infinite;
            animation-fill-mode: forwards;
            width: 100%;
            max-width: fit-content;
            margin: 0 auto;
          }

          @keyframes typing {
            0% { width: 0; }
            100% { width: 100%; }
          }

          @keyframes blink-caret {
            from, to { border-color: transparent; }
            50% { border-color: black; }
          }

          .medieval-text {
            font-family: 'Black Chancery', cursive;
            letter-spacing: 0.02em;
          }

          .glow-pulse {
            animation: glow-pulse 3s ease-in-out infinite;
          }

          @keyframes glow-pulse {
            0%, 100% {
              text-shadow: 0 0 20px rgba(255, 215, 0, 0.8),
                           0 0 40px rgba(255, 215, 0, 0.5),
                           0 0 60px rgba(255, 215, 0, 0.3);
            }
            50% {
              text-shadow: 0 0 10px rgba(255, 215, 0, 0.4),
                           0 0 20px rgba(255, 215, 0, 0.2),
                           0 0 30px rgba(255, 215, 0, 0.1);
            }
          }

          @keyframes liquid-swirl {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(180deg); }
          }

          @keyframes particle-float {
            0% { transform: translateY(0) translateX(0); opacity: 0.8; }
            50% { transform: translateY(-30px) translateX(10px); opacity: 1; }
            100% { transform: translateY(-60px) translateX(-5px); opacity: 0; }
          }

          @keyframes liquid-shimmer {
            0%, 100% {
              filter: brightness(1.1) contrast(1.1) saturate(1.2) hue-rotate(0deg);
              opacity: 0.35;
            }
            50% {
              filter: brightness(1.2) contrast(1.15) saturate(1.4) hue-rotate(5deg);
              opacity: 0.45;
            }
          }

          @keyframes iridescent-flow {
            0% { transform: translateY(-100%) rotate(-10deg); }
            50% { transform: translateY(0%) rotate(0deg); }
            100% { transform: translateY(100%) rotate(10deg); }
          }

          .animation-delay-200 { animation-delay: 0.2s; }
          .animation-delay-300 { animation-delay: 0.3s; }
          .animation-delay-400 { animation-delay: 0.4s; }
          .animation-delay-500 { animation-delay: 0.5s; }
          .animation-delay-600 { animation-delay: 0.6s; }
          .animation-delay-700 { animation-delay: 0.7s; }
          .animation-delay-800 { animation-delay: 0.8s; }

          .bottle-mask {
            background: transparent !important;
          }

          .bottle-container {
            background: transparent;
          }

          .bottle-container img {
            background: transparent;
          }
        `}
      </style>
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-2">
          <h1 className="ancient-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-black typewriter inline-block">
            Welcome to Design Alchemy!
          </h1>
        </div>

        {/* Content within border */}
        <div className="px-2 sm:px-4 md:px-12 sm:pt-8 pb-4 sm:pb-8">
          {/* Chemical Flasks Section */}
          <div className="mb-8 mt-0">
            <div className="flex items-center justify-center mb-4">
              <ArrowDown className="w-4 h-4 sm:w-6 sm:h-6 text-black animate-bounce" />
              <span className="ml-2 text-xl sm:text-2xl md:text-3xl font-bold text-black medieval-text">Potions</span>
              <ArrowDown className="w-6 h-6 text-black animate-bounce ml-2" />
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 md:gap-32 items-center">
              {flasks.map((flask, index) => (
                <div key={index} className="relative w-full sm:w-auto flex justify-center">
                  {/* Ultra-Realistic Vintage Potion Bottle */}
                  <div className={`relative transition-all duration-500 ${
                    index === currentFlask && pouring.length === 0 ? 'scale-110' : 'scale-100'
                  }`}>
                    <div className="relative w-40 h-48 sm:w-48 sm:h-60 md:w-56 md:h-72 flex items-center justify-center overflow-hidden bottle-container">
                      {/* Imgur Potion Bottle Image */}
                      <div className="relative bg-transparent">
                        <img
                          src="https://i.imgur.com/P0bO9B0.png"
                          alt="Potion Bottle"
                          className="w-full h-full object-contain"
                          style={{
                            backgroundColor: 'transparent'
                          }}
                        />

                        {/* Liquid overlay for filled state */}
                        {flask.filled && (
                          <div
                            className="absolute inset-0 w-full h-full opacity-60 mix-blend-overlay animate-pulse"
                            style={{
                              background: `linear-gradient(180deg, ${flask.colors?.[0] ?? '#ffffff'} 0%, ${flask.colors?.[1] ?? '#000000'} 100%)`,
                              maskImage: 'url(https://i.imgur.com/P0bO9B0.png)',
                              maskSize: 'contain',
                              maskRepeat: 'no-repeat',
                              maskPosition: 'center'
                            }}
                          />
                        )}

                        {/* Active glow indicator with fireflies */}
                        {index === currentFlask && !flask.filled && pouring.length === 0 && (
                          <div className="absolute inset-0">
                            {/* Fireflies around the bottle - more centralized and closer together */}
                            <div className="absolute top-16 left-6 w-4 h-4 bg-yellow-400 rounded-full animate-pulse border-4 border-white shadow-lg" style={{boxShadow: '0 0 40px #ffff00, 0 0 80px #ffff00, 0 0 120px #ffd700, inset 0 0 20px #ffffff'}}></div>
                            <div className="absolute top-20 right-6 w-3.5 h-3.5 bg-yellow-500 rounded-full animate-bounce animation-delay-200 border-4 border-white shadow-lg" style={{boxShadow: '0 0 35px #ffff00, 0 0 70px #ffff00, 0 0 105px #ffd700, inset 0 0 15px #ffffff'}}></div>
                            <div className="absolute top-24 left-8 w-3 h-3 bg-yellow-400 rounded-full animate-pulse animation-delay-500 border-3 border-white shadow-lg" style={{boxShadow: '0 0 30px #ffff00, 0 0 60px #ffff00, 0 0 90px #ffd700, inset 0 0 12px #ffffff'}}></div>
                            <div className="absolute top-26 right-8 w-3.5 h-3.5 bg-yellow-500 rounded-full animate-bounce animation-delay-700 border-4 border-white shadow-lg" style={{boxShadow: '0 0 35px #ffff00, 0 0 70px #ffff00, 0 0 105px #ffd700, inset 0 0 15px #ffffff'}}></div>
                            <div className="absolute top-32 left-6 w-3 h-3 bg-yellow-400 rounded-full animate-pulse animation-delay-300 border-3 border-white shadow-lg" style={{boxShadow: '0 0 30px #ffff00, 0 0 60px #ffff00, 0 0 90px #ffd700, inset 0 0 12px #ffffff'}}></div>
                            <div className="absolute top-32 right-6 w-4 h-4 bg-yellow-500 rounded-full animate-bounce animation-delay-600 border-4 border-white shadow-lg" style={{boxShadow: '0 0 40px #ffff00, 0 0 80px #ffff00, 0 0 120px #ffd700, inset 0 0 20px #ffffff'}}></div>
                            <div className="absolute top-36 left-8 w-3.5 h-3.5 bg-yellow-400 rounded-full animate-pulse animation-delay-400 border-4 border-white shadow-lg" style={{boxShadow: '0 0 35px #ffff00, 0 0 70px #ffff00, 0 0 105px #ffd700, inset 0 0 15px #ffffff'}}></div>
                            <div className="absolute top-36 right-8 w-3 h-3 bg-yellow-500 rounded-full animate-bounce animation-delay-800 border-3 border-white shadow-lg" style={{boxShadow: '0 0 30px #ffff00, 0 0 60px #ffff00, 0 0 90px #ffd700, inset 0 0 12px #ffffff'}}></div>
                          </div>
                        )}

                        {/* Pouring sparkles */}
                        {pouring.length > 0 && index === currentFlask && (
                          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-6xl animate-bounce"></div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Text bubble */}
                  {flask.filled && flask.text && (
                    <div className={`absolute left-1/2 -translate-x-1/2 w-64 sm:w-72 md:w-80 p-3 sm:p-4 bg-white rounded-2xl shadow-xl border-2 border-gray-300 animate-in fade-in slide-in-from-top duration-700 delay-500 ${
                      index === 0 ? '-bottom-20' : '-bottom-24'
                    }`}>
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-l-2 border-t-2 border-gray-300 rotate-45"></div>
                      <p className="text-sm font-bold text-black leading-relaxed medieval-text">{flask.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Test Tubes Section */}
          <div className="mt-4 pt-4">
            <div className="flex items-center justify-center mb-4">
              {currentFlask === 0 && <ArrowDown className="w-4 h-4 sm:w-6 sm:h-6 text-black animate-bounce" />}
              <span className={`text-xl sm:text-2xl md:text-3xl font-bold text-black medieval-text ${currentFlask === 0 ? 'ml-2' : ''}`}>Core Elements</span>
              {currentFlask === 0 && <ArrowDown className="w-6 h-6 text-black animate-bounce ml-2" />}
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {testTubes.map((tube) => {
                const glowing = isGlowing(tube.id);
                const disabled = isDisabled(tube.id);
                const selected = selectedTubes.includes(tube.id);
                const isPouringThis = pouring.includes(tube.id);

                return (
                  <div key={tube.id} className="flex flex-col items-center">
                    {/* Medieval Test tube SVG */}
                    <button
                      onClick={() => handleTubeClick(tube.id)}
                      disabled={disabled || pouring.length > 0}
                      className={`relative transition-all duration-500 ${
                        glowing ? 'scale-110 cursor-pointer' : 'scale-100'
                      } ${
                        disabled ? 'opacity-100 cursor-not-allowed' : ''
                      } ${
                        isPouringThis ? '-rotate-45 -translate-y-8' : 'rotate-0'
                      }`}
                    >
                      {/* Test Tube Image */}
                      <div className="relative">
                        <img
                          src="https://i.imgur.com/wglGmb7.png"
                          alt="Test Tube"
                          className="w-14 h-32 sm:w-16 sm:h-36 md:w-20 md:h-44 object-contain drop-shadow-xl"
                          style={{
                            backgroundColor: 'transparent',
                            filter: glowing ? 'brightness(1.2) saturate(1.3) drop-shadow(0 0 10px rgba(255,255,255,0.8))' : 'brightness(1.0)'
                          }}
                        />

                        {/* Luminescent, glowing, iridescent liquid overlay */}
                        <div
                          className="absolute inset-0 w-full h-full"
                          style={{
                            background: `linear-gradient(180deg,
                              ${tube.colors[0]} 10%,
                              ${tube.colors[1]} 40%,
                              ${tube.colors[0]} 70%,
                              ${tube.colors[1]} 90%)`,
                            maskImage: 'url(https://i.imgur.com/wglGmb7.png)',
                            maskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            opacity: 0.35,
                            filter: 'brightness(1.1) contrast(1.1) saturate(1.2)',
                            boxShadow: `inset 0 0 10px ${tube.glowColor}20, 0 0 15px ${tube.glowColor}15`,
                            animation: 'liquid-shimmer 3s ease-in-out infinite'
                          }}
                        />

                        {/* Iridescent shimmer effect */}
                        <div
                          className="absolute inset-0 w-full h-full"
                          style={{
                            background: `linear-gradient(45deg,
                              transparent 0%,
                              rgba(255,255,255,0.1) 25%,
                              transparent 50%,
                              rgba(255,255,255,0.08) 75%,
                              transparent 100%)`,
                            maskImage: 'url(https://i.imgur.com/wglGmb7.png)',
                            maskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            animation: 'iridescent-flow 4s ease-in-out infinite',
                            opacity: 0.3
                          }}
                        />

                        {/* Glow effect when active */}
                        {glowing && !disabled && (
                          <div
                            className="absolute inset-0 animate-pulse"
                            style={{
                              boxShadow: `0 0 20px ${tube.glowColor}, 0 0 40px ${tube.glowColor}`,
                              borderRadius: '10px'
                            }}
                          />
                        )}

                        {/* Pouring effect */}
                        {isPouringThis && (
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-4xl animate-bounce"></div>
                        )}
                      </div>

                      {/* Selected indicator */}
                      {selected && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center text-black font-bold shadow-lg">
                          ✓
                        </div>
                      )}
                    </button>

                    {/* Label */}
                    <div className="mt-2 sm:mt-3 text-center max-w-[80px] sm:max-w-[100px]">
                      <p className={`text-sm sm:text-base md:text-lg font-black text-black transition-all duration-300 medieval-text ${
                        glowing ? 'scale-110 text-amber-600' : ''
                      }`}>
                        {tube.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-4 text-center px-2">
            <p className="text-sm sm:text-base md:text-xl font-bold text-black bg-gray-100/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full inline-block shadow-lg border-2 border-gray-400 medieval-text">
              {getCurrentInstructions()}
            </p>
            {selectedTubes.length === 1 && (
              <p className="text-xs sm:text-sm md:text-base text-black mt-2 sm:mt-3 medieval-text">
                Select one more glowing element to complete the mix!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
