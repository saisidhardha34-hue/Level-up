import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, Activity, Code, Flame, Droplets, Trophy, TrendingUp, 
  User, Settings, Play, Square, CheckCircle, 
  AlertCircle, BarChart3, Clock, Target, Shield, Zap, ArrowRight, Lock
} from 'lucide-react';

// --- MOCK DATA & CONSTANTS ---
const TOPICS = ['Arrays', 'Recursion', 'OOPS', 'Sorting', 'Pointers', 'Graphs', 'DP'];
const LANGUAGES = ['Python', 'C', 'C++', 'Java'];
const DIFFICULTIES = {
  Easy: { mult: 1.0, color: 'text-green-400' },
  Medium: { mult: 1.2, color: 'text-yellow-400' },
  Hard: { mult: 1.5, color: 'text-red-400' }
};

const LEARNING_PATHS = {
  C: [
    { stage: '🟢 Beginner Stage', topic: 'Structure of C', desc: 'Write a basic program with main() that prints "Hello, LevelUp".' },
    { stage: '🟢 Beginner Stage', topic: 'Variables & Data Types', desc: 'Declare int, float, and char variables and print their sizes.' },
    { stage: '🟢 Beginner Stage', topic: 'Operators', desc: 'Implement a simple calculator using arithmetic operators.' },
    { stage: '🟢 Beginner Stage', topic: 'Input/Output', desc: 'Take user age as input using scanf and print it.' },
    { stage: '🟢 Beginner Stage', topic: 'Conditionals', desc: 'Check if a given year is a leap year.' },
    { stage: '🟢 Beginner Stage', topic: 'Loops', desc: 'Print the Fibonacci series up to N terms.' },
    { stage: '🟢 Beginner Stage', topic: 'Basic Functions', desc: 'Write a function to calculate the factorial of a number.' },
    { stage: '🟢 Beginner Stage', topic: 'Arrays', desc: 'Find the maximum element in an integer array.' },
    { stage: '🟡 Intermediate Stage', topic: 'Strings', desc: 'Reverse a given string without using library functions.' },
    { stage: '🟡 Intermediate Stage', topic: 'Pointers', desc: 'Swap two numbers using pointers (call by reference).' },
    { stage: '🟡 Intermediate Stage', topic: 'Structures', desc: 'Create a Student structure and store/print details.' },
    { stage: '🟡 Intermediate Stage', topic: 'Recursion', desc: 'Find the Nth Fibonacci number using recursion.' },
    { stage: '🟡 Intermediate Stage', topic: 'Storage Classes', desc: 'Demonstrate the use of a static variable inside a function.' },
    { stage: '🔴 Advanced Stage', topic: 'Dynamic Memory Allocation', desc: 'Allocate memory for an array using malloc() and free it.' },
    { stage: '🔴 Advanced Stage', topic: 'File Handling', desc: 'Write a string to a file and read it back.' },
    { stage: '🔴 Advanced Stage', topic: 'Preprocessor Directives', desc: 'Define a macro to find the square of a number.' },
    { stage: '🔴 Advanced Stage', topic: 'Command Line Arguments', desc: 'Write a program that takes two numbers from CLI and adds them.' },
    { stage: '🔴 Advanced Stage', topic: 'Complex Pointer Concepts', desc: 'Create an array of function pointers and execute them.' }
  ],
  Python: [
    { stage: '🟢 Beginner Stage', topic: 'Python Syntax & Indentation', desc: 'Write a properly indented program to print a greeting.' },
    { stage: '🟢 Beginner Stage', topic: 'Variables', desc: 'Declare variables of different types and print them.' },
    { stage: '🟢 Beginner Stage', topic: 'Data Types', desc: 'Work with int, float, str, and bool data types.' },
    { stage: '🟢 Beginner Stage', topic: 'Type Casting', desc: 'Convert user string input into integer and float.' },
    { stage: '🟢 Beginner Stage', topic: 'Operators', desc: 'Use arithmetic and logical operators to evaluate conditions.' },
    { stage: '🟢 Beginner Stage', topic: 'Input & Output', desc: 'Use input() and print() to create a simple interactive script.' },
    { stage: '🟢 Beginner Stage', topic: 'Conditional Statements', desc: 'Implement if, elif, and else to categorize a temperature.' },
    { stage: '🟢 Beginner Stage', topic: 'Loops', desc: 'Use a for loop to iterate over a list and a while loop for a counter.' },
    { stage: '🟢 Beginner Stage', topic: 'Break & Continue', desc: 'Print numbers 1-10, skipping 5 and stopping at 8.' },
    { stage: '🟢 Beginner Stage', topic: 'Basic Functions', desc: 'Define a function with default arguments and a return value.' },
    { stage: '🟡 Intermediate Stage', topic: 'Lists', desc: 'Perform append, insert, pop, and sort on a Python list.' },
    { stage: '🟡 Intermediate Stage', topic: 'Tuples', desc: 'Demonstrate tuple packing, unpacking, and immutability.' },
    { stage: '🟡 Intermediate Stage', topic: 'Sets', desc: 'Find the intersection and union of two sets.' },
    { stage: '🟡 Intermediate Stage', topic: 'Dictionaries', desc: 'Iterate over key-value pairs in a dictionary.' },
    { stage: '🟡 Intermediate Stage', topic: 'Strings', desc: 'Perform slicing, formatting, and split/join string operations.' },
    { stage: '🟡 Intermediate Stage', topic: 'List Comprehensions', desc: 'Create a list of squares for even numbers using comprehension.' },
    { stage: '🟡 Intermediate Stage', topic: 'Lambda Functions', desc: 'Sort a list of dictionaries using a lambda function key.' },
    { stage: '🟡 Intermediate Stage', topic: 'Recursion', desc: 'Write a recursive function to compute the factorial.' },
    { stage: '🟡 Intermediate Stage', topic: 'Modules & Packages', desc: 'Import the math module and calculate the square root.' },
    { stage: '🟡 Intermediate Stage', topic: 'Exception Handling', desc: 'Use try, except, finally to handle division by zero.' },
    { stage: '🔴 Advanced Stage', topic: 'File Handling', desc: 'Open, read, write, and safely close a text file using \'with\'.' },
    { stage: '🔴 Advanced Stage', topic: 'OOP', desc: 'Create a Class with __init__, encapsulation, and a class method.' },
    { stage: '🔴 Advanced Stage', topic: 'Decorators', desc: 'Write a decorator to measure the execution time of a function.' },
    { stage: '🔴 Advanced Stage', topic: 'Generators', desc: 'Create a generator function using yield for a large sequence.' },
    { stage: '🔴 Advanced Stage', topic: 'Iterators', desc: 'Implement a custom iterator class using __iter__ and __next__.' },
    { stage: '🔴 Advanced Stage', topic: 'Virtual Environments', desc: 'Explain how to create and activate a venv (Concept task).' },
    { stage: '🔴 Advanced Stage', topic: 'Multithreading & Multiprocessing', desc: 'Spawn basic threads and processes to run concurrently.' },
    { stage: '🔴 Advanced Stage', topic: 'Regular Expressions', desc: 'Use the re module to extract all email addresses from a string.' },
    { stage: '🔴 Advanced Stage', topic: 'Working with APIs', desc: 'Use the requests module to fetch JSON data from a public API.' },
    { stage: '🔴 Advanced Stage', topic: 'Command Line Arguments', desc: 'Use sys.argv to parse arguments passed to the script.' }
  ],
  'C++': [
    { stage: '🟢 Beginner Stage', topic: 'C++ Syntax & I/O', desc: 'Use cin and cout to interact with the user.' },
    { stage: '🟡 Intermediate Stage', topic: 'OOP in C++', desc: 'Create a class with public and private members.' },
    { stage: '🔴 Advanced Stage', topic: 'Templates & STL', desc: 'Use std::vector and std::map in a program.' }
  ],
  Java: [
    { stage: '🟢 Beginner Stage', topic: 'Java Basics', desc: 'Write a public class with a main method.' },
    { stage: '🟡 Intermediate Stage', topic: 'Inheritance & Interfaces', desc: 'Implement an interface and override its methods.' },
    { stage: '🔴 Advanced Stage', topic: 'Streams & Concurrency', desc: 'Filter a List using Java Streams API.' }
  ]
};

export default function App() {
  // --- APP NAVIGATION STATE ---
  const [appState, setAppState] = useState('splash'); // 'splash', 'auth', 'main'

  // --- GLOBAL STATE ---
  const [userEmail, setUserEmail] = useState('user@gmail.com');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [xp, setXp] = useState(0);
  const [weeklyXp, setWeeklyXp] = useState(0);
  const [level, setLevel] = useState(0);
  const MAX_WEEKLY_XP = 630;

  // --- MIND STATE ---
  const [codingPrefs, setCodingPrefs] = useState({ lang: 'Python', diff: 'Medium' });
  const [dailyQuestionsSolved, setDailyQuestionsSolved] = useState(0);
  const [pathProgress, setPathProgress] = useState({ Python: 0, C: 0, 'C++': 0, Java: 0 });
  const [codingTimer, setCodingTimer] = useState(0);
  const [isCodingActive, setIsCodingActive] = useState(false);
  
  // --- NEW CODING STATES ---
  const [userCode, setUserCode] = useState('');
  const [codeStatus, setCodeStatus] = useState('idle'); // 'idle', 'evaluating', 'error', 'gave_up', 'success'
  const [errorMessage, setErrorMessage] = useState('');
  
  const [topicStats, setTopicStats] = useState({
    Arrays: { attempts: 10, correct: 8 },
    Recursion: { attempts: 5, correct: 2 }, // Weak (<60%)
    OOPS: { attempts: 8, correct: 7 },
    Sorting: { attempts: 6, correct: 5 },
    Pointers: { attempts: 4, correct: 2 }, // Weak
  });

  // --- BODY STATE ---
  const [waterGlasses, setWaterGlasses] = useState(2); // out of 8
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isPomodoroActive, setIsPomodoroActive] = useState(false);
  const [totalStudyMinutes, setTotalStudyMinutes] = useState(45);
  const [calorieData, setCalorieData] = useState({ weight: 70, height: 175, age: 25, gender: 'male', activity: '1.55' });
  const [dailyCalories, setDailyCalories] = useState(0);
  const [calorieTargetMet, setCalorieTargetMet] = useState(false);

  // --- IMAGE FALLBACK STATE ---
  const [imgError, setImgError] = useState(false);

  // --- REFS ---
  const codingIntervalRef = useRef(null);
  const pomodoroIntervalRef = useRef(null);

  // --- LEVEL UP LOGIC ---
  useEffect(() => {
    const newLevel = Math.floor(xp / 630);
    if (newLevel > level) {
      setLevel(newLevel);
    }
  }, [xp, level]);

  // --- AVATAR LOGIC ---
  const getAvatarState = () => {
    const baseGokuUrl = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f13de84d-8eaf-403c-868c-a5d2541b4513/d9v4mgh-3490fbb1-8633-4d98-8615-98136171200c.png/v1/fill/w_1024,h_2555,q_75,strp/goku_lineart_by_frost_z-d9v4mgh.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi9mMTNkZTg0ZC04ZWFmLTQwM2MtODY4Yy1hNWQyNTQxYjQ1MTMvZDl2NG1naC0zNDkwZmJiMS04NjMzLTRkOTgtODYxNS05ODEzNjE3MTIwMGMucG5nIiwid2lkdGgiOiI8PTEwMjQiLCJoZWlnaHQiOiI8PTI1NTUifV1dfQ.u0aOtsgzMRPBUNRPTX4m2TGBEiR-nsum18tyqTZUY2I";
    
    if (level === 0) {
      return { 
        title: 'Base Form (Lvl 0)', 
        imageUrl: baseGokuUrl,
        color: 'text-orange-400', 
        glow: 'shadow-orange-500/40',
        imageClass: 'drop-shadow-[0_0_10px_rgba(249,115,22,0.3)] transition-all duration-1000' 
      };
    }
    if (level === 1) {
      return { 
        title: 'Super Saiyan (Lvl 1)', 
        imageUrl: baseGokuUrl,
        color: 'text-yellow-400', 
        glow: 'shadow-yellow-500/80',
        imageClass: 'saturate-[1.5] brightness-110 drop-shadow-[0_0_25px_rgba(250,204,21,0.8)] transition-all duration-1000' 
      };
    }
    return { 
      title: 'Super Saiyan Blue (Lvl 2+)', 
      imageUrl: baseGokuUrl,
      color: 'text-cyan-400', 
      glow: 'shadow-cyan-500/80',
      imageClass: 'saturate-[1.5] hue-rotate-[160deg] brightness-125 drop-shadow-[0_0_30px_rgba(34,211,238,0.9)] transition-all duration-1000' 
    };
  };
  const avatar = getAvatarState();

  const addXp = (amount) => {
    setXp(prev => prev + amount);
    setWeeklyXp(prev => Math.min(prev + amount, MAX_WEEKLY_XP));
  };

  // --- CODING ACTIONS ---
  const toggleCodingTimer = () => {
    if (isCodingActive) {
      clearInterval(codingIntervalRef.current);
    } else {
      codingIntervalRef.current = setInterval(() => {
        setCodingTimer(prev => prev + 1);
      }, 1000);
      
      if (!userCode) {
          setUserCode(codingPrefs.lang === 'Python' ? 'def solve():\n    # Write code here\n    pass' : 'int main() {\n    // Write code here\n    return 0;\n}');
      }
    }
    setIsCodingActive(!isCodingActive);
  };

  const handleRunCode = () => {
    if (userCode.trim().length < 10) {
      setCodeStatus('error');
      setErrorMessage('SyntaxError: Code is too short or incomplete. Please write a proper solution.');
      return;
    }
    const lowerCode = userCode.toLowerCase();
    if (!lowerCode.includes('return') && !lowerCode.includes('print') && !lowerCode.includes('cout') && !lowerCode.includes('printf')) {
      setCodeStatus('error');
      setErrorMessage('LogicError: No output or return statement detected.\nHow will we check your answer? Make sure to return or print the result.');
      return;
    }
    
    setCodeStatus('evaluating');
    setTimeout(() => {
      if (Math.random() > 0.8) {
         setCodeStatus('error');
         setErrorMessage('RuntimeError: Hidden test case failed. Check your logic for edge cases!');
      } else {
         setCodeStatus('success');
         submitCode(true);
      }
    }, 1500);
  };

  const getSolutionSnippet = (lang, topic) => {
    if (lang === 'Python') return `def solve():\n    # Optimal solution for ${topic}\n    # 1. Process inputs\n    # 2. Apply algorithm\n    print("Success")\n    return True`;
    if (lang === 'C' || lang === 'C++') return `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Optimal solution for ${topic}\n    cout << "Success!" << endl;\n    return 0;\n}`;
    if (lang === 'Java') return `public class Solution {\n    public static void main(String[] args) {\n        // Optimal solution for ${topic}\n        System.out.println("Success!");\n    }\n}`;
    return `// Solution for ${topic}`;
  };

  const submitCode = (success) => {
    clearInterval(codingIntervalRef.current);
    setIsCodingActive(false);
    setUserCode('');
    setCodeStatus('idle');
    setErrorMessage('');
    
    const activeLangPath = LEARNING_PATHS[codingPrefs.lang];
    const currentIndex = pathProgress[codingPrefs.lang] || 0;
    const currentQ = activeLangPath[currentIndex];

    if (currentQ) {
        setTopicStats(prev => ({
          ...prev,
          [currentQ.topic]: {
            attempts: (prev[currentQ.topic]?.attempts || 0) + 1,
            correct: (prev[currentQ.topic]?.correct || 0) + (success ? 1 : 0)
          }
        }));
    }

    if (success) {
      const baseXP = dailyQuestionsSolved === 9 ? 30 : 20; 
      const diffMult = DIFFICULTIES[codingPrefs.diff].mult;
      
      let timeMult = 1.0;
      if (codingTimer > 600) timeMult = 0.6; 
      else if (codingTimer > 300) timeMult = 0.8; 
      
      const earnedXP = Math.round(baseXP * diffMult * timeMult);
      addXp(earnedXP);
      setDailyQuestionsSolved(prev => prev + 1);
      
      setPathProgress(prev => ({
        ...prev,
        [codingPrefs.lang]: prev[codingPrefs.lang] + 1
      }));
    }
    setCodingTimer(0);
  };

  // --- HEALTH ACTIONS ---
  const calculateCalories = () => {
    let bmr = 10 * calorieData.weight + 6.25 * calorieData.height - 5 * calorieData.age;
    bmr += calorieData.gender === 'male' ? 5 : -161;
    const tdee = bmr * parseFloat(calorieData.activity);
    setDailyCalories(Math.round(tdee));
    
    if (!calorieTargetMet) {
      addXp(20);
      setCalorieTargetMet(true);
    }
  };

  const togglePomodoro = () => {
    if (isPomodoroActive) {
      clearInterval(pomodoroIntervalRef.current);
    } else {
      pomodoroIntervalRef.current = setInterval(() => {
        setPomodoroTime(prev => {
          if (prev <= 1) {
            clearInterval(pomodoroIntervalRef.current);
            setIsPomodoroActive(false);
            setTotalStudyMinutes(m => m + 25);
            if (totalStudyMinutes + 25 >= 60 && totalStudyMinutes < 60) addXp(25);
            return 25 * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    setIsPomodoroActive(!isPomodoroActive);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const drinkWater = () => {
    if (waterGlasses < 8) {
      setWaterGlasses(prev => prev + 1);
      if (waterGlasses === 7) addXp(15);
    }
  };

  const weakTopics = Object.entries(topicStats)
    .map(([topic, stats]) => ({ topic, accuracy: (stats.correct / stats.attempts) * 100 }))
    .filter(t => t.accuracy < 60);

  // ================= COMPONENTS AS FUNCTIONS =================

  const AvatarImage = ({ sizeClass }) => {
    if (imgError) {
      return (
        <div className={`flex items-center justify-center ${sizeClass} ${avatar.color} bg-slate-800 rounded-full border-2 border-current shadow-[0_0_15px_currentColor]`}>
          <User className="w-1/2 h-1/2" />
        </div>
      );
    }
    return (
      <img 
        src={avatar.imageUrl} 
        alt={avatar.title} 
        className={`${sizeClass} object-contain filter ${avatar.imageClass}`} 
        onError={() => setImgError(true)}
      />
    );
  };

  const Sidebar = () => (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 z-20">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <Zap className="w-8 h-8 text-purple-500 fill-purple-500" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent tracking-tight">LevelUp</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {[
          { id: 'dashboard', icon: Activity, label: 'Dashboard' },
          { id: 'mind', icon: Brain, label: 'Mind (Coding)' },
          { id: 'body', icon: Flame, label: 'Body (Health)' },
          { id: 'analytics', icon: BarChart3, label: 'Analytics' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      {/* Profile Section - Now acts as a button to the Settings page */}
      <div 
        onClick={() => setActiveTab('settings')}
        className={`p-6 border-t border-slate-800 cursor-pointer transition-colors ${activeTab === 'settings' ? 'bg-slate-800' : 'hover:bg-slate-800/50'}`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center shadow-lg overflow-hidden border-2 border-slate-700 ${avatar.glow}`}>
            {imgError ? (
               <User className={`w-6 h-6 ${avatar.color}`} />
            ) : (
              <img 
                src={avatar.imageUrl} 
                alt="Avatar" 
                className={`w-full h-full object-cover object-top ${avatar.imageClass}`} 
                onError={() => setImgError(true)}
              />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Lvl {level} User</p>
            <p className={`text-xs ${avatar.color}`}>{avatar.title}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const TopBar = () => (
    <header className="h-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8">
      <div>
        <h2 className="text-xl font-bold text-slate-100 capitalize">{activeTab} View</h2>
        <p className="text-sm text-slate-400 hidden md:block">Transform your habits, upgrade your life.</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-purple-400 font-bold uppercase tracking-wider">Lvl {level}</span>
            <span className="text-slate-400">{xp} / {level * 630 + 630} XP</span>
          </div>
          <div className="w-32 md:w-48 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500 relative"
              style={{ width: `${(xp % 630) / 630 * 100}%` }}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>
        {/* Settings Button */}
        <div 
          onClick={() => setActiveTab('settings')}
          className={`w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 cursor-pointer transition ${activeTab === 'settings' ? 'bg-slate-700 border-slate-500 text-white' : 'hover:bg-slate-700 text-slate-400'}`}
        >
          <Settings className="w-5 h-5" />
        </div>
      </div>
    </header>
  );

  const DashboardView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-center shadow-2xl gap-8">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="z-10 relative text-center md:text-left">
          <h3 className="text-3xl font-bold text-white mb-2 flex flex-col md:flex-row items-center gap-3">
            Current Status: <span className={avatar.color}>{avatar.title}</span>
          </h3>
          <p className="text-slate-400 max-w-md mx-auto md:mx-0">
            Maintain your daily streak to reach Elite Mode. Complete Mind and Body tasks to earn XP and level up your avatar.
          </p>
          <div className="mt-6 flex justify-center md:justify-start gap-4">
            <button onClick={() => setActiveTab('mind')} className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition shadow-lg shadow-purple-500/20">
              Start Coding
            </button>
          </div>
        </div>
        <div className="z-10 transition-transform hover:scale-110 duration-500">
          {AvatarImage({ sizeClass: "w-48 h-48 md:w-56 md:h-56" })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-bold text-white flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-500" /> Weekly XP Limit</h4>
            <span className="text-sm font-bold text-emerald-400">{weeklyXp} / {MAX_WEEKLY_XP}</span>
          </div>
          <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000"
              style={{ width: `${(weeklyXp / MAX_WEEKLY_XP) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-500 mt-3 text-center">Prevents burnout & XP farming. Keep consistency!</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-indigo-400" /> Daily Objectives</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-300 flex items-center gap-2"><Code className="w-4 h-4 text-purple-400"/> Solve 1 Problem</span>
              {dailyQuestionsSolved > 0 ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <span className="text-xs text-slate-500">0/1</span>}
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-300 flex items-center gap-2"><Droplets className="w-4 h-4 text-blue-400"/> Hydration</span>
              <span className="text-xs font-bold text-blue-400">{waterGlasses}/8</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-300 flex items-center gap-2"><Brain className="w-4 h-4 text-amber-400"/> 60m Deep Work</span>
              <span className="text-xs font-bold text-amber-400">{totalStudyMinutes}/60</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MindView = () => {
    const activeLangPath = LEARNING_PATHS[codingPrefs.lang];
    const currentIndex = pathProgress[codingPrefs.lang] || 0;
    const isPathComplete = currentIndex >= activeLangPath.length;
    const currentQuestion = isPathComplete ? 
      { stage: '🏆 Path Completed', topic: 'All Topics Mastered', desc: 'You have successfully completed the structured learning path for this language! Check back later for advanced modules.' } : 
      activeLangPath[currentIndex];

    return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Brain className="w-6 h-6 text-purple-400"/> Coding Arena</h2>
          <p className="text-slate-400 mt-1">Daily requirement: 1. You've solved <span className="text-white font-bold">{dailyQuestionsSolved}/10</span> today.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select 
            value={codingPrefs.lang}
            onChange={(e) => {
              setCodingPrefs({...codingPrefs, lang: e.target.value});
              setUserCode('');
              setCodeStatus('idle');
              setErrorMessage('');
            }}
            className="flex-1 bg-slate-900 border border-slate-700 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2.5"
          >
            {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select 
            value={codingPrefs.diff}
            onChange={(e) => setCodingPrefs({...codingPrefs, diff: e.target.value})}
            className="flex-1 bg-slate-900 border border-slate-700 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2.5"
          >
            {Object.keys(DIFFICULTIES).map(d => <option key={d} value={d}>{d} (x{DIFFICULTIES[d].mult} XP)</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col min-h-[500px]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-xs font-bold bg-slate-800 text-purple-400 px-3 py-1 rounded-full border border-purple-500/30">
                {currentQuestion.stage}
              </span>
              <h3 className="text-xl font-bold text-white mt-3">{currentQuestion.topic}</h3>
            </div>
            <div className={`text-2xl font-mono font-bold ${isCodingActive ? 'text-red-400' : 'text-slate-500'}`}>
              {formatTime(codingTimer)}
            </div>
          </div>
          
          <p className="text-slate-300 mb-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
            {currentQuestion.desc}
          </p>

          <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-sm relative overflow-hidden flex flex-col">
            <div className="absolute top-2 right-2 flex gap-2 z-10">
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
            </div>
            
            {codeStatus === 'gave_up' ? (
              <div className="flex-1 overflow-y-auto mt-4 text-slate-300">
                <div className="text-purple-400 mb-2">{'// Official Solution for: ' + currentQuestion.topic}</div>
                <pre className="whitespace-pre-wrap">{getSolutionSnippet(codingPrefs.lang, currentQuestion.topic)}</pre>
              </div>
            ) : (
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full flex-1 bg-transparent text-emerald-400 mt-4 resize-none focus:outline-none"
                placeholder={isCodingActive ? "Type your code here..." : "// Click Start Challenge to begin"}
                disabled={!isCodingActive || codeStatus === 'evaluating'}
                spellCheck="false"
              />
            )}

            {!isCodingActive && codingTimer === 0 && !isPathComplete && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-20">
                <button 
                  onClick={toggleCodingTimer}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                >
                  <Play className="w-5 h-5 fill-white" /> Start Challenge
                </button>
              </div>
            )}

            {codeStatus === 'evaluating' && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center z-20 flex-col gap-4">
                 <Zap className="w-10 h-10 text-purple-500 animate-spin" />
                 <p className="text-purple-400 font-bold animate-pulse text-lg">Evaluating Code...</p>
                 <p className="text-slate-400 text-sm">Running test cases...</p>
              </div>
            )}

            {isPathComplete && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-20">
                <div className="text-center">
                  <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-3 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                  <p className="text-white font-bold text-xl">Path Completed!</p>
                  <p className="text-slate-400 text-sm mt-1">You've mastered all current topics.</p>
                </div>
              </div>
            )}
          </div>

          {codeStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-950/50 border border-red-500/20 rounded-xl flex items-start gap-3">
               <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
               <div className="text-red-300 font-mono text-sm whitespace-pre-wrap">{errorMessage}</div>
            </div>
          )}

          {isCodingActive && !isPathComplete && (
            <div className="mt-6 flex gap-4 justify-end">
              {codeStatus === 'gave_up' ? (
                <>
                  <button 
                    onClick={() => setCodeStatus('idle')}
                    className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition"
                  >
                    Back to Editor
                  </button>
                  <button 
                    onClick={() => submitCode(false)}
                    className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition shadow-[0_0_15px_rgba(168,85,247,0.3)] flex items-center gap-2"
                  >
                    Next Question <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setCodeStatus('gave_up')}
                    className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition"
                    disabled={codeStatus === 'evaluating'}
                  >
                    Give Up
                  </button>
                  <button 
                    onClick={handleRunCode}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={codeStatus === 'evaluating'}
                  >
                    Submit Code
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-[500px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
            <h4 className="text-white font-bold mb-4 flex items-center gap-2 sticky top-0 bg-slate-900 pb-2 z-10 border-b border-slate-800">
              <Target className="w-5 h-5 text-purple-400" /> Learning Path
            </h4>
            
            <div className="relative border-l-2 border-slate-800 ml-3 pl-4 space-y-4 mt-4">
              {activeLangPath.map((step, idx) => {
                const isCompleted = idx < currentIndex;
                const isCurrent = idx === currentIndex;
                const isLocked = idx > currentIndex;

                return (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[25px] top-1 w-4 h-4 rounded-full border-2 ${
                      isCompleted ? 'bg-emerald-500 border-emerald-500' : 
                      isCurrent ? 'bg-purple-500 border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)] animate-pulse' : 
                      'bg-slate-900 border-slate-700'
                    }`}></div>
                    
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        isCurrent ? 'text-purple-400' : 
                        isCompleted ? 'text-emerald-500' : 
                        'text-slate-500'
                      }`}>{step.stage}</span>
                      <p className={`text-sm font-medium leading-tight mt-0.5 ${
                        isLocked ? 'text-slate-500' : 'text-slate-200'
                      }`}>{step.topic}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-sm">
            <h4 className="text-white font-bold mb-3 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" /> XP Mechanics
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex justify-between"><span>Base Question:</span> <span className="text-white">+20 XP</span></li>
              <li className="flex justify-between"><span>10th Question:</span> <span className="text-white">+30 XP</span></li>
              <li className="border-t border-slate-800 pt-2 mt-2"></li>
              <li className="flex justify-between"><span>Easy Mult:</span> <span className="text-green-400">1.0x</span></li>
              <li className="flex justify-between"><span>Medium Mult:</span> <span className="text-yellow-400">1.2x</span></li>
              <li className="flex justify-between"><span>Hard Mult:</span> <span className="text-red-400">1.5x</span></li>
              <li className="border-t border-slate-800 pt-2 mt-2"></li>
              <li className="flex justify-between"><span>Fast Time (&lt;5m):</span> <span className="text-purple-400">100% XP</span></li>
              <li className="flex justify-between"><span>Mod Time (&lt;10m):</span> <span className="text-purple-400">80% XP</span></li>
              <li className="flex justify-between"><span>Slow Time:</span> <span className="text-purple-400">60% XP</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    );
  };

  const BodyView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Flame className="w-6 h-6 text-orange-400"/> Health & Focus</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg relative overflow-hidden">
           <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-orange-400"/> Calorie Targets</h3>
          
          <div className="space-y-4 mb-6 relative z-10">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Weight (kg)</label>
                <input type="number" value={calorieData.weight} onChange={e => setCalorieData({...calorieData, weight: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Height (cm)</label>
                <input type="number" value={calorieData.height} onChange={e => setCalorieData({...calorieData, height: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Age</label>
                <input type="number" value={calorieData.age} onChange={e => setCalorieData({...calorieData, age: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Gender</label>
                <select value={calorieData.gender} onChange={e => setCalorieData({...calorieData, gender: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Activity Level</label>
              <select value={calorieData.activity} onChange={e => setCalorieData({...calorieData, activity: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white">
                <option value="1.2">Sedentary</option>
                <option value="1.375">Lightly Active</option>
                <option value="1.55">Moderately Active</option>
                <option value="1.725">Very Active</option>
              </select>
            </div>
          </div>

          <button onClick={calculateCalories} className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold transition">
            Calculate TDEE
          </button>

          {dailyCalories > 0 && (
            <div className="mt-6 p-4 bg-orange-950/30 border border-orange-500/20 rounded-xl text-center">
              <p className="text-sm text-orange-200">Daily Target</p>
              <p className="text-3xl font-black text-orange-400">{dailyCalories} <span className="text-lg font-normal">kcal</span></p>
              {calorieTargetMet && <p className="text-xs text-emerald-400 mt-2 flex items-center justify-center gap-1"><CheckCircle className="w-3 h-3"/> Target Logged (+20 XP)</p>}
            </div>
          )}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col relative overflow-hidden">
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Droplets className="w-5 h-5 text-blue-400"/> Hydration</h3>
          <p className="text-slate-400 text-sm mb-8">Track your daily water intake. Goal: 8 glasses.</p>
          
          <div className="flex-1 flex flex-col items-center justify-center relative z-10">
            <div className="grid grid-cols-4 gap-4 mb-8 w-full max-w-xs">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  onClick={drinkWater}
                  className={`w-full h-16 rounded-b-xl rounded-t flex items-end p-1 cursor-pointer transition-all duration-300 border-2
                    ${i < waterGlasses ? 'border-blue-500/50 bg-blue-950/30' : 'border-slate-700 bg-slate-800 hover:border-slate-600'}`}
                >
                  <div className={`w-full rounded-b-lg rounded-t-sm transition-all duration-700 ${i < waterGlasses ? 'bg-blue-500 h-full' : 'h-0 bg-blue-500'}`}></div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <h4 className="text-2xl font-bold text-white">{waterGlasses} <span className="text-slate-500 text-lg">/ 8</span></h4>
              {waterGlasses >= 8 ? (
                <span className="text-xs text-emerald-400 font-bold px-3 py-1 bg-emerald-950/50 rounded-full mt-2 inline-block border border-emerald-500/20">Goal Reached! (+15 XP)</span>
              ) : (
                <span className="text-xs text-slate-500 mt-2 inline-block">Click a glass to drink</span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col relative overflow-hidden">
          <div className="absolute -right-10 top-1/2 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Clock className="w-5 h-5 text-amber-400"/> Focus Timer</h3>
          <p className="text-slate-400 text-sm mb-6">60 mins deep work = +25 XP</p>
          
          <div className="flex-1 flex flex-col items-center justify-center relative z-10">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-8 border-slate-800 flex items-center justify-center relative mb-6">
               <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                 <circle cx="50%" cy="50%" r="46%" className="stroke-slate-800 stroke-[8px] fill-none" />
                 <circle 
                   cx="50%" cy="50%" r="46%" 
                   className="stroke-amber-500 stroke-[8px] fill-none transition-all duration-1000" 
                   strokeDasharray={2 * Math.PI * 84}
                   strokeDashoffset={(2 * Math.PI * 84) * (1 - pomodoroTime / (25 * 60))}
                 />
               </svg>
              <span className="text-4xl sm:text-5xl font-mono font-bold text-white relative z-10">{formatTime(pomodoroTime)}</span>
            </div>

            <button 
              onClick={togglePomodoro}
              className={`w-full py-3 rounded-xl font-bold transition flex justify-center items-center gap-2 ${
                isPomodoroActive ? 'bg-red-950 text-red-400 hover:bg-red-900 border border-red-900' : 'bg-amber-600 text-white hover:bg-amber-500'
              }`}
            >
              {isPomodoroActive ? <><Square className="w-4 h-4 fill-current"/> Pause Focus</> : <><Play className="w-4 h-4 fill-current"/> Start Pomodoro</>}
            </button>
            
            <p className="text-xs text-slate-500 mt-4 text-center">Total Focus Today: <strong className="text-amber-400">{totalStudyMinutes} mins</strong></p>
          </div>
        </div>
      </div>
    </div>
  );

  const AnalyticsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2"><TrendingUp className="w-6 h-6 text-indigo-400"/> Performance Analytics</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Weekly Accuracy %</h3>
          <div className="h-64 flex items-end gap-2 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none border-b border-l border-slate-700">
              {[100, 80, 60, 40, 20, 0].map(val => (
                <div key={val} className="w-full border-t border-slate-800 relative">
                  <span className="absolute -left-8 -top-2.5 text-xs text-slate-500">{val}</span>
                </div>
              ))}
            </div>
            
            {[
              { day: 'Mon', acc: 65 }, { day: 'Tue', acc: 80 }, { day: 'Wed', acc: 55 },
              { day: 'Thu', acc: 90 }, { day: 'Fri', acc: 85 }, { day: 'Sat', acc: 70 }, { day: 'Sun', acc: 95 }
            ].map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full z-10 group relative">
                <div 
                  className={`w-full max-w-[40px] rounded-t-sm transition-all duration-1000 ${
                    data.acc < 60 ? 'bg-red-500/80 hover:bg-red-400' : 'bg-indigo-500/80 hover:bg-indigo-400'
                  }`}
                  style={{ height: `${data.acc}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition">
                    {data.acc}%
                  </div>
                </div>
                <span className="text-xs text-slate-400 mt-2">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Topic Mastery (Accuracy)</h3>
          <div className="space-y-4">
            {Object.entries(topicStats).map(([topic, stats]) => {
              const acc = (stats.correct / stats.attempts) * 100;
              const isWeak = acc < 60;
              return (
                <div key={topic}>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="text-slate-300 font-medium">{topic} <span className="text-slate-500 text-xs ml-1">({stats.attempts} attempts)</span></span>
                    <span className={isWeak ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>{acc.toFixed(0)}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${isWeak ? 'bg-red-500' : 'bg-emerald-500'}`}
                      style={{ width: `${acc}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2"><User className="w-6 h-6 text-purple-400"/> Profile & Settings</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-500/20 to-transparent"></div>
           <div className="z-10 mt-4 mb-4 relative">
             <div className={`w-32 h-32 rounded-full bg-slate-950 flex items-center justify-center shadow-lg overflow-hidden border-2 border-slate-700 ${avatar.glow}`}>
                {imgError ? (
                   <User className={`w-12 h-12 ${avatar.color}`} />
                ) : (
                  <img 
                    src={avatar.imageUrl} 
                    alt="Avatar" 
                    className={`w-full h-full object-cover object-top ${avatar.imageClass}`} 
                    onError={() => setImgError(true)}
                  />
                )}
              </div>
           </div>
           <h3 className="text-xl font-bold text-white z-10">Lvl {level} User</h3>
           <p className={`text-sm font-medium z-10 ${avatar.color}`}>{avatar.title}</p>
           <p className="text-slate-400 text-sm mt-2 z-10">{userEmail}</p>
           
           <div className="w-full mt-6 bg-slate-950 rounded-xl p-4 border border-slate-800 z-10">
             <div className="flex justify-between text-sm mb-2">
               <span className="text-slate-400">Total XP</span>
               <span className="text-purple-400 font-bold">{xp}</span>
             </div>
             <div className="flex justify-between text-sm">
               <span className="text-slate-400">Weekly XP</span>
               <span className="text-emerald-400 font-bold">{weeklyXp} / {MAX_WEEKLY_XP}</span>
             </div>
           </div>
        </div>

        {/* Settings Form */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">Account Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Email Address</label>
                <input type="email" value={userEmail} disabled className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-400 cursor-not-allowed" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Password</label>
                <input type="password" value="********" disabled className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-400 cursor-not-allowed" />
              </div>
              <button className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition">Change Password</button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">Preferences</h3>
            <div className="space-y-4">
               <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div>
                    <p className="text-slate-200 text-sm font-bold">Daily Reminders</p>
                    <p className="text-slate-500 text-xs mt-0.5">Get notified to complete your daily habits</p>
                  </div>
                  <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                  </div>
               </div>
               <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div>
                    <p className="text-slate-200 text-sm font-bold">Sound Effects</p>
                    <p className="text-slate-500 text-xs mt-0.5">Play sounds when leveling up or completing tasks</p>
                  </div>
                  <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-red-950/30 border border-red-900/50 rounded-2xl p-6 shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-red-400">Danger Zone</h3>
              <p className="text-red-400/70 text-sm mt-0.5">Log out of this session safely.</p>
            </div>
            <button 
              onClick={() => {
                 setAppState('auth');
                 setActiveTab('dashboard'); // Reset tab for next login
              }} 
              className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition shadow-[0_0_15px_rgba(220,38,38,0.3)] w-full sm:w-auto"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SplashView = () => (
    <div 
      className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden text-slate-200 cursor-pointer animate-[fadeIn_1s_ease-in-out]" 
      onClick={() => setAppState('auth')}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="z-10 text-center space-y-6 px-4">
        <Zap className="w-20 h-20 md:w-24 md:h-24 text-purple-500 fill-purple-500 mx-auto animate-pulse" />
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent tracking-tighter">LevelUp</h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-lg mx-auto leading-relaxed">
          AI-Powered Mind & Body Growth System.<br/>
          Master your code, optimize your health, level up your life.
        </p>
      </div>
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce text-slate-400">
        <span className="text-sm font-bold uppercase tracking-widest mb-2 text-center w-max">Tap to Continue</span>
        <ArrowRight className="w-6 h-6 rotate-90" />
      </div>
    </div>
  );

  const AuthView = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      setError('');

      if (!email.toLowerCase().endsWith('@gmail.com')) {
        setError('Only @gmail.com addresses are allowed.');
        return;
      }

      setUserEmail(email); // Save the login email to global state
      setAppState('main');
    };

    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden animate-[fadeIn_0.5s_ease-in-out]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl z-10">
          <div className="text-center mb-8">
            <Zap className="w-12 h-12 text-purple-500 fill-purple-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-slate-400 text-sm">Enter your details to access your dashboard.</p>
          </div>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
            
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Gmail Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 border border-slate-700 rounded-xl bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" 
                  placeholder="example@gmail.com" 
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 border border-slate-700 rounded-xl bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" 
                  placeholder="••••••••" 
                />
              </div>
            </div>
            <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-bold shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-6">
              {isLogin ? 'Login to Dashboard' : 'Start Your Journey'}
            </button>
          </form>
          
          <div className="mt-8 text-center border-t border-slate-800 pt-6">
            <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-slate-400 text-sm hover:text-white transition">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span className="text-purple-400 font-bold ml-1">{isLogin ? 'Register' : 'Login'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (appState === 'splash') return <SplashView />;
  if (appState === 'auth') return <AuthView />;

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-purple-500/30">
      <div className="hidden md:block">
        {Sidebar()}
      </div>
      
      {/* Mobile nav fallback for extremely small screens */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center sticky top-0 z-20">
         <div className="flex items-center gap-2">
           <Zap className="w-6 h-6 text-purple-500 fill-purple-500" />
           <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">LevelUp</h1>
         </div>
         <select 
           value={activeTab} 
           onChange={e => setActiveTab(e.target.value)}
           className="bg-slate-800 text-white text-sm rounded-lg p-2 border border-slate-700"
         >
           <option value="dashboard">Dashboard</option>
           <option value="mind">Mind</option>
           <option value="body">Body</option>
           <option value="analytics">Analytics</option>
           <option value="settings">Profile / Settings</option>
         </select>
      </div>

      <div className="md:ml-64 flex flex-col min-h-screen">
        {TopBar()}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'dashboard' && DashboardView()}
            {activeTab === 'mind' && MindView()}
            {activeTab === 'body' && BodyView()}
            {activeTab === 'analytics' && AnalyticsView()}
            {activeTab === 'settings' && SettingsView()}
          </div>
        </main>
      </div>
    </div>
  );
}