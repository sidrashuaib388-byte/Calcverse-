
import React, { useState, useCallback, useEffect } from 'react';
import { Screen } from './components/Screen';
import { ButtonPad } from './components/ButtonPad';
import { GraphView } from './components/GraphView';
import { ButtonType } from './types';

declare const math: any;

enum View {
  CALCULATOR,
  GRAPH_INPUT,
  GRAPH_VIEW,
}

const App: React.FC = () => {
  const [expression, setExpression] = useState<string>('');
  const [display, setDisplay] = useState<string>('0');
  const [history, setHistory] = useState<string[]>([]);
  const [lastAnswer, setLastAnswer] = useState<string>('0');
  const [view, setView] = useState<View>(View.CALCULATOR);
  const [graphFunction, setGraphFunction] = useState<string>('x^2');
  const [isShift, setIsShift] = useState<boolean>(false);

  const handleButtonClick = useCallback(
    (value: string, type: ButtonType, shiftValue?: string) => {
      const effectiveValue = isShift && shiftValue ? shiftValue : value;
      
      if (view === View.GRAPH_INPUT) {
        if (value === 'ENTER') {
          setView(View.GRAPH_VIEW);
        } else if (value === 'CLEAR') {
          setGraphFunction('');
        } else if (value === 'DEL') {
          setGraphFunction((prev) => prev.slice(0, -1));
        } else if (value === 'MODE') {
          setView(View.CALCULATOR);
        } else {
           setGraphFunction((prev) => prev + effectiveValue);
        }
        setIsShift(false);
        return;
      }

      switch (effectiveValue) {
        case 'ENTER':
          if (expression.trim() === '') return;
          try {
            const result = math.evaluate(expression.replace('π', 'pi').replace('√', 'sqrt'));
            const resultStr = String(result);
            setDisplay(resultStr);
            setHistory((prev) => [...prev, `${expression} = ${resultStr}`]);
            setLastAnswer(resultStr);
            setExpression(resultStr);
          } catch (error) {
            setDisplay('SYNTAX ERROR');
            setExpression('');
          }
          break;
        case 'CLEAR':
          setExpression('');
          setDisplay('0');
          break;
        case 'DEL':
          setExpression((prev) => prev.slice(0, -1));
          break;
        case 'ANS':
          setExpression((prev) => prev + lastAnswer);
          break;
        case '2nd':
          setIsShift((prev) => !prev);
          return; // Return early to not reset shift
        case 'Y=':
          setView(View.GRAPH_INPUT);
          break;
        case 'GRAPH':
          setView(View.GRAPH_VIEW);
          break;
        case 'MODE':
          if(view !== View.CALCULATOR) setView(View.CALCULATOR);
          break;
        case '(-)':
            setExpression((prev) => prev + '-');
            break;
        default:
          if (display === 'SYNTAX ERROR' || (expression === '' && display === '0')) {
            setExpression(effectiveValue);
          } else if (expression === lastAnswer) {
             // If starting a new calculation after an answer
             if (['+', '-', '*', '/','^'].includes(effectiveValue)) {
                setExpression((prev) => prev + effectiveValue);
             } else {
                setExpression(effectiveValue);
             }
          } else {
            setExpression((prev) => prev + effectiveValue);
          }
          break;
      }
      setIsShift(false);
    },
    [expression, lastAnswer, view, isShift]
  );
  
  useEffect(() => {
    if (view === View.CALCULATOR) {
        setDisplay(expression || '0');
    } else if (view === View.GRAPH_INPUT) {
        setDisplay(`Y1=${graphFunction}`);
    }
  }, [expression, view, graphFunction]);


  const renderView = () => {
    switch(view) {
        case View.GRAPH_VIEW:
            return <GraphView func={graphFunction} />;
        case View.CALCULATOR:
        case View.GRAPH_INPUT:
        default:
            return <Screen display={display} history={history} isShift={isShift} />;
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen font-sans">
      <div className="w-full max-w-sm mx-auto bg-gray-700 rounded-lg shadow-2xl p-4 space-y-4">
        <div className="bg-gray-800 rounded-md p-2 shadow-inner">
           {renderView()}
        </div>
        <ButtonPad onButtonClick={handleButtonClick} isShift={isShift} />
      </div>
    </div>
  );
};

export default App;
