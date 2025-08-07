import React, { useState, useEffect, useRef } from 'react';

const ParadoxAnimated: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(500);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const lastUpdateRef = useRef<number>(0);

  const trackWidth = 800;
  const trackHeight = 200;
  const startX = 50;
  const startY = 100;
  const headStart = 100;

  const startAnimation = () => {
    setCurrentStep(0);
    setIsRunning(true);
    lastUpdateRef.current = 0;
    animationRef.current = requestAnimationFrame(animate);
  };

  const animate = (timestamp: number) => {
    const stepDelay = animationSpeed;

    if (timestamp - lastUpdateRef.current < stepDelay) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    lastUpdateRef.current = timestamp;

    setCurrentStep((prev) => {
      const newStep = prev + 1;

      const currentDistance = headStart * Math.pow(0.5, newStep);

      if (currentDistance < 0.001) {
        setIsRunning(false);
        return prev;
      }

      animationRef.current = requestAnimationFrame(animate);
      return newStep;
    });
  };

  const stopAnimation = () => {
    setIsRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = undefined;
    }
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, trackWidth, trackHeight);

    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + trackWidth - 100, startY);
    ctx.moveTo(startX, startY + 50);
    ctx.lineTo(startX + trackWidth - 100, startY + 50);
    ctx.stroke();

    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(startX + trackWidth - 100, startY - 25);
    ctx.lineTo(startX + trackWidth - 100, startY + 75);
    ctx.stroke();
    ctx.setLineDash([]);

    let achillesX = startX;
    let tortoiseX = startX + headStart;
    let distance = headStart;

    for (let step = 1; step <= currentStep; step++) {
      const previousTortoiseX = tortoiseX;
      achillesX = previousTortoiseX;
      tortoiseX = previousTortoiseX + distance * 0.5;
      distance = tortoiseX - achillesX;
    }

    ctx.fillStyle = '#3B82F6';
    ctx.beginPath();
    ctx.arc(achillesX, startY, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('A', achillesX, startY + 4);

    ctx.fillStyle = '#10B981';
    ctx.beginPath();
    ctx.arc(tortoiseX, startY + 50, 12, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('T', tortoiseX, startY + 54);

    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(achillesX, startY);
    ctx.lineTo(tortoiseX, startY + 50);
    ctx.stroke();

    ctx.fillStyle = '#F59E0B';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(
      `${distance.toFixed(2)}m`,
      (achillesX + tortoiseX) / 2,
      (startY + startY + 50) / 2 - 10,
    );
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Zeno's Paradox: Achilles and the Tortoise
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4 flex flex-col items-center gap-4">
            <div className="flex justify-center gap-4">
              <button
                onClick={startAnimation}
                disabled={isRunning}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isRunning ? 'Running...' : 'Start'}
              </button>
              <button
                onClick={stopAnimation}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Stop
              </button>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-600">Speed:</label>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                disabled={isRunning}
                className="w-32"
              />
              <span className="text-sm text-gray-600">
                {(1000 / animationSpeed).toFixed(1)} steps/sec
              </span>
            </div>
          </div>

          <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              width={trackWidth}
              height={trackHeight}
              className="w-full h-auto"
            />
          </div>

          <div className="mt-4 text-center text-sm text-gray-600">
            Step: {currentStep} | Distance:{' '}
            {(headStart * Math.pow(0.5, currentStep)).toFixed(3)}m
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParadoxAnimated;
