"use client";
import { useState, useEffect, useRef, useMemo } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const C = {
  indigo:     "#4f46e5",
  indigoDark: "#3730a3",
  indigoLight:"#eef2ff",
  navy:       "#0a1628",
  gold:       "#c9a84c",
  slate50:    "#f8fafc",
  slate100:   "#f1f5f9",
  slate200:   "#e2e8f0",
  slate500:   "#64748b",
  slate600:   "#475569",
  slate700:   "#334155",
  slate900:   "#0f172a",
  slate950:   "#020617",
  emerald:    "#059669",
  emeraldLight:"#ecfdf5",
  amber:      "#d97706",
  amberLight: "#fffbeb",
  red:        "#dc2626",
  white:      "#ffffff",
  border:     "#e2e8f0",
};

// ─── SHARED UI ───────────────────────────────────────────────────────────────
function Card({ children, className = "", style = {}, onClick = null }: any) {
  return (
    <div 
      onClick={onClick}
      style={{ borderRadius: 16, border: `1px solid ${C.border}`, background: C.white, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", ...style }} 
      className={className}
    >
      {children}
    </div>
  );
}
function Button({ children, onClick, variant = "primary", disabled = false }: any) {
  const styles: any = {
    primary:   { background: C.indigo, color: C.white, border: "none" },
    secondary: { background: C.slate100, color: C.slate700, border: "none" },
    ghost:     { background: C.white, color: C.slate700, border: `1px solid ${C.border}` },
    success:   { background: C.emerald, color: C.white, border: "none" },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...styles[variant], borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, transition: "opacity 0.15s", fontFamily: "inherit" }}>
      {children}
    </button>
  );
}
function SectionTitle({ eyebrow, title, subtitle }: any) {
  return (
    <div style={{ marginBottom: 24 }}>
      <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: C.indigo, marginBottom: 8, margin: "0 0 8px" }}>{eyebrow}</p>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: C.slate950, margin: "0 0 8px", letterSpacing: "-0.4px" }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 13, lineHeight: 1.6, color: C.slate600, margin: 0, maxWidth: 680 }}>{subtitle}</p>}
    </div>
  );
}
function ProgressBar({ value }: any) {
  return (
    <div style={{ height: 8, background: C.slate100, borderRadius: 99, overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: C.indigo, borderRadius: 99, transition: "width 0.4s ease" }} />
    </div>
  );
}
function Pill({ children, active = false }: any) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", borderRadius: 99, padding: "3px 10px", fontSize: 12, fontWeight: 600, background: active ? C.indigo : C.slate100, color: active ? C.white : C.slate700 }}>
      {children}
    </span>
  );
}

// ─── MODULES LIST ────────────────────────────────────────────────────────────
const modules = [
  "Overview", "Parent Onboarding", "Student Welcome",
  "Maths Health Check", "Diagnostic Report", "Logic Brick Workshop",
  "Maths Problem Solving", "Badges & Certificates", "Parent Dashboard", "Admin / RAG Library",
];

const concerns = ["Low confidence", "Algebra feels confusing", "Homework avoidance", "Needs stronger foundations", "Future skills: AI, data & coding"];
const interests = ["AI", "Games", "Business", "Sport", "Science", "Coding", "Money", "Space"];

const BRICKS = [
  { id: "find_daily", name: "Find daily usage", icon: "📅", desc: "How much water used per day?" },
  { id: "find_rate", name: "Find the rate", icon: "⚡", desc: "Litres used per unit of time" },
  { id: "total_needed", name: "Total water needed", icon: "💧", desc: "Total over all 9 days" },
  { id: "compare", name: "Compare to tank", icon: "⚖️", desc: "Is the tank enough?" },
  { id: "find_days", name: "Find number of days", icon: "📆", desc: "How many days until empty?" },
  { id: "check_sense", name: "Check it makes sense", icon: "✅", desc: "Does the answer fit the scenario?" },
  { id: "percentage", name: "Find percentage", icon: "💯", desc: "Express as a percentage" },
  { id: "interpret", name: "Interpret in context", icon: "🗺️", desc: "What does this mean in real life?" },
];

// ─── MATHS PROBLEM SOLVING DATA ────────────────────────────────────────────
const THEMATIC_PROBLEMS = [
  {
    id: "basic_operations_ai",
    theme: "AI & Machine Learning",
    emoji: "🤖",
    color: "#4f46e5",
    title: "Basic Number Operations and Place Value",
    subtitle: "How many calculations does AI do?",
    coreMaths: "Basic number operations, multiplication, division",
    realWorldContext: "Estimate operations in everyday devices: if a phone unlock uses 1,000 operations and you unlock 20 times a day, how many per week? AI models train on millions of images, each requiring many operations.",
    problems: [
      {
        id: "operations_1",
        question: "Your phone performs 1,000 operations per unlock. You unlock it 20 times daily. How many operations per week?",
        hint: "Multiply: operations × unlocks per day × days per week",
        expectedApproach: "1,000 × 20 × 7 = 140,000",
      },
      {
        id: "operations_2",
        question: "An AI model trains on 50 million images. Each image requires 2,000 operations. Total operations needed?",
        hint: "Use multiplication of large numbers",
        expectedApproach: "50,000,000 × 2,000 = 100,000,000,000",
      },
    ],
    programmingTask: {
      title: "Build a Calculator with Training Counter",
      language: "Python or Scratch",
      description: "Create a four-operation calculator. Add a 'training counter' that asks for data points and epochs, then computes total training steps.",
      pseudocode: `
# Calculator function
def calculate(num1, operation, num2):
    if operation == '+': return num1 + num2
    elif operation == '-': return num1 - num2
    elif operation == '*': return num1 * num2
    elif operation == '/': return num1 / num2

# Training counter
data_points = input("How many data points?")
epochs = input("How many epochs?")
total_steps = data_points × epochs
print(f"Total training steps: {total_steps}")
      `,
    },
  },
  {
    id: "primes_blockchain",
    theme: "Blockchain & Cryptography",
    emoji: "🔐",
    color: "#dc2626",
    title: "Factors, Multiples, and Primes",
    subtitle: "How blockchain security relies on prime numbers",
    coreMaths: "Prime numbers, factors, multiples, prime factorisation, HCF, LCM",
    realWorldContext: "Secure communication and blockchain systems rely on prime numbers. Factorising very large primes is computationally hard — this 'hard problem' underpins cryptographic security. A 200-digit number takes humans and computers serious time to factor.",
    problems: [
      {
        id: "primes_1",
        question: "Find all prime numbers between 1 and 30.",
        hint: "A prime number has exactly 2 factors: 1 and itself",
        expectedApproach: "2, 3, 5, 7, 11, 13, 17, 19, 23, 29",
      },
      {
        id: "primes_2",
        question: "Find the prime factorisation of 84 using a factor tree.",
        hint: "Start: 84 = 2 × 42, then keep dividing until all are prime",
        expectedApproach: "84 = 2² × 3 × 7",
      },
      {
        id: "primes_3",
        question: "Why is factorising a 200-digit number hard? What does this tell us about security?",
        hint: "Think about computers checking billions of factors per second — would it be fast or slow?",
        expectedApproach: "Even computers would take millions of years, so large primes protect data",
      },
    ],
    programmingTask: {
      title: "Prime Checker and Cryptographic Encoding",
      language: "Python or Scratch",
      description: "Write a program that checks if a number is prime. Generate primes up to 100. Optional: use primes to encode a word (A→2, B→3, C→5...) and encode/decode messages.",
      pseudocode: `
# Prime checker
def is_prime(n):
    if n < 2: return False
    for i in range(2, n):
        if n % i == 0: return False
    return True

# Generate primes up to 100
primes = [n for n in range(2, 101) if is_prime(n)]
print(primes)

# Optional: Simple cipher (A=2, B=3, C=5...)
primes_map = {'A': 2, 'B': 3, 'C': 5, 'D': 7, ...}
word = "HELLO"
encoded = [primes_map[letter] for letter in word]
# To decode: factor the product of all numbers
      `,
    },
  },
  {
    id: "data_patterns",
    theme: "Data Science & Statistics",
    emoji: "📊",
    color: "#059669",
    title: "Patterns, Sequences, and Averages",
    subtitle: "Finding patterns in datasets",
    coreMaths: "Sequences, averages, mean/median/mode, data interpretation",
    realWorldContext: "Data scientists find patterns in millions of data points. Understanding averages, trends, and outliers helps predict future outcomes — from weather forecasting to disease tracking.",
    problems: [
      {
        id: "data_1",
        question: "A dataset of test scores: 45, 62, 58, 92, 71, 88, 55. Find the mean, median, and mode.",
        hint: "Mean = sum ÷ count. Median = middle value when sorted. Mode = most frequent.",
        expectedApproach: "Mean: 67.3, Median: 62, Mode: none (all unique)",
      },
      {
        id: "data_2",
        question: "Why is the median sometimes better than the mean when there are outliers?",
        hint: "Think about a few very high or very low values affecting the average",
        expectedApproach: "One outlier can skew the mean; median ignores extreme values",
      },
    ],
    programmingTask: {
      title: "Data Analysis Tool",
      language: "Python",
      description: "Write a program that reads a dataset of numbers and calculates mean, median, mode, and standard deviation. Visualise the distribution.",
      pseudocode: `
import statistics

data = [45, 62, 58, 92, 71, 88, 55]
mean = statistics.mean(data)
median = statistics.median(data)
mode = statistics.mode(data)  # or handle no mode
stdev = statistics.stdev(data)

print(f"Mean: {mean}, Median: {median}, Stdev: {stdev}")
      `,
    },
  },
];


// ─── LIVE DIAGNOSTIC DATA ────────────────────────────────────────────────────
const DIAGNOSTIC_QS = [
  {
    id: 1, conceptId: "linear_equations", topic: "Linear equations",
    q: "Solve: 2x + 3 = 11",
    options: ["x = 4", "x = 7", "x = 5", "x = 8"],
    correct: "x = 4",
    explanation_prompt: "How did you work this out? What was your first step?",
    concept: "Inverse operations",
    commonErrors: [
      { answer: "x = 7", gapType: "inverse_operations", note: "Added 3 rather than subtracting" },
      { answer: "x = 5", gapType: "algebraic_notation", note: "Divided 11 by 2 ignoring the +3" },
    ],
  },
  {
    id: 2, conceptId: "proportional_reasoning", topic: "Ratio and proportion",
    q: "A recipe uses 2 cups of flour for 5 cakes. How many cups are needed for 15 cakes?",
    options: ["4", "5", "6", "7.5"],
    correct: "6",
    explanation_prompt: "Explain your steps — what did you find first?",
    concept: "Scaling proportionally",
    commonErrors: [
      { answer: "4", gapType: "weak_number_sense", note: "Added 2 instead of scaling" },
      { answer: "5", gapType: "proportional_reasoning", note: "Confused ratio with the answer" },
    ],
  },
  {
    id: 3, conceptId: "data_interpretation", topic: "Data interpretation",
    q: "A model is correct 8 times out of 10. What is its percentage accuracy?",
    options: ["8%", "10%", "80%", "90%"],
    correct: "80%",
    explanation_prompt: "What does 'out of 10' tell you about the calculation?",
    concept: "Fractions to percentages",
    commonErrors: [
      { answer: "8%", gapType: "language_comprehension", note: "Read the numerator as the percentage" },
    ],
  },
];

const PROJECT = {
  id: "smart_farm", title: "The Smart Farm", emoji: "🌾",
  domain: "Data Science", concept: "Proportional Reasoning",
  scenario: "A farmer in Yorkshire has a 600-litre water tank. Their irrigation system uses 8 litres per minute. The weather forecast shows no rain for 9 days. Each day they need to water crops for at least 60 minutes.",
  question: "Will the farmer have enough water? How many days can they irrigate before the tank runs dry?",
  data: { tank: 600, ratePerMin: 8, daysNoRain: 9, minsPerDay: 60 },
  interpretationPrompt: "In your own words: what does your answer mean for the farmer? What should they do?",
  expectedAnswer: 75,
  answerUnit: "days",
};

// ─── AI HELPERS ───────────────────────────────────────────────────────────────
async function callClaude(messages: any[], system: string, maxTokens = 400, model = "claude-haiku-4-5-20251001") {
  try {
    const res = await fetch("/api/claude", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, max_tokens: maxTokens, system, messages }),
    });
    const data = await res.json();
    return data.content?.[0]?.text || "";
  } catch { return ""; }
}

async function interpretDiagnosticAI(responses: any[], childName: string) {
  const system = `You are a UK secondary mathematics diagnostic engine for Scaffio.
Analyse the student's quiz responses. Return ONLY valid JSON, no markdown, no preamble.
Gap types: weak_number_sense | inverse_operations | proportional_reasoning | algebraic_notation | language_comprehension | transfer_difficulty | confidence_problem

Return exactly:
{"gaps":[{"concept":"string","gapType":"string","strength":0.0-1.0,"parentLabel":"plain English label"}],"strongAreas":["string"],"summary":"2 warm blame-free sentences for a UK parent","mainGap":"string","confidenceStatus":"string","nextMission":"string","reasoningStyle":"string","algebraReadiness":"string"}`;

  const content = responses.map((r, i) => {
    const q = DIAGNOSTIC_QS[i];
    return `Q${i+1} (${q.conceptId}): "${q.q}" → Answer: "${r.answer}" | Explanation: "${r.explanation||"none"}" | Confidence: ${r.confidence}/5`;
  }).join("\n");

  try {
    const raw = await callClaude([{ role: "user", content }], system, 700);
    const clean = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch {
    const q1Wrong = responses[0]?.answer !== DIAGNOSTIC_QS[0].correct;
    return {
      gaps: [{ concept: q1Wrong ? "Inverse operations" : "Proportional reasoning", gapType: q1Wrong ? "inverse_operations" : "proportional_reasoning", strength: 0.35, parentLabel: q1Wrong ? "Undoing operations in equations" : "Scaling and ratio" }],
      strongAreas: ["Reading mathematical problems", "Percentage reasoning"],
      summary: `${childName} shows good engagement with mathematical problems. The main area to strengthen is ${q1Wrong ? "working through equations step by step using inverse operations" : "applying proportional reasoning in new contexts"}.`,
      mainGap: q1Wrong ? "Inverse operations in equations" : "Proportional reasoning under pressure",
      confidenceStatus: q1Wrong && responses[0]?.confidence >= 4 ? "Overconfident misconception" : "Developing confidence",
      nextMission: q1Wrong ? "Algebra Foundations Mission 2" : "AI Pattern Finder Mission 1",
      reasoningStyle: "Visual/contextual",
      algebraReadiness: "Developing",
    };
  }
}

async function getCoachResponse(studentMessage: string, sessionData: any, history: any[]) {
  const brickNames = (sessionData.sequence || []).join(" → ");
  const system = `You are Scaffio, an AI mathematics coach for UK secondary students aged 12–15.

RULES:
- Ask ONE short question only. Max 2 sentences.
- NEVER give the answer, formula, or worked example.
- ALWAYS reference something specific the student did — a brick they chose, their working, their explanation.
- Start with Why, How, What, or Can you explain.
- Tone: warm, curious, never condescending.
- If asked for the answer directly: "I'm not going to — you're closer than you think. Let me ask about [specific step]..."

Student context:
- Project: "${PROJECT.title}" — ${PROJECT.question}
- Data: Tank=${PROJECT.data.tank}L, Rate=${PROJECT.data.ratePerMin}L/min, ${PROJECT.data.minsPerDay} min/day
- Their Logic Brick sequence: ${brickNames || "not yet provided"}
- Final answer given: ${sessionData.finalAnswer || "not provided"}
- Identified gaps: ${sessionData.gaps?.map((g: any) => g.concept).join(", ") || "proportional reasoning"}`;

  return callClaude([...history, { role: "user", content: studentMessage }], system, 150, "claude-sonnet-4-6");
}

// ─── SCREEN: MATHS HEALTH CHECK (LIVE) ───────────────────────────────────────
function MathsHealthCheck({ child, onComplete }: any) {
  const [qi, setQi] = useState(0);
  const [responses, setResponses] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [explanation, setExplanation] = useState("");
  const [confidence, setConfidence] = useState(3);
  const [showExpl, setShowExpl] = useState(false);

  const q = DIAGNOSTIC_QS[qi];
  const progress = (qi / DIAGNOSTIC_QS.length) * 100;
  const canProceed = selected !== null && showExpl && explanation.trim().length > 5;

  const handleNext = () => {
    const newR = [...responses, { answer: selected, explanation, confidence }];
    setResponses(newR);
    if (qi < DIAGNOSTIC_QS.length - 1) {
      setQi(qi + 1); setSelected(null); setExplanation(""); setConfidence(3); setShowExpl(false);
    } else {
      onComplete(newR);
    }
  };

  return (
    <div>
      <SectionTitle
        eyebrow="Step 3"
        title="Maths Health Check"
        subtitle="This live diagnostic captures answer, explanation quality, confidence and misconception signals — all passed to the AI diagnostic engine."
      />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, fontSize: 13, color: C.slate600 }}>
        <span>Question {qi + 1} of {DIAGNOSTIC_QS.length} · {q.topic}</span>
        <span style={{ fontSize: 11, background: C.indigoLight, color: C.indigo, padding: "2px 10px", borderRadius: 8, fontWeight: 600 }}>Live AI diagnostic</span>
      </div>
      <ProgressBar value={progress} />

      <Card style={{ marginTop: 20 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: C.slate950, margin: "0 0 20px", lineHeight: 1.4 }}>{q.q}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {q.options.map((opt) => (
            <button key={opt} onClick={() => { setSelected(opt); setShowExpl(true); }}
              style={{ borderRadius: 12, border: `1.5px solid ${selected === opt ? C.indigo : C.border}`, padding: "13px 16px", background: selected === opt ? C.indigoLight : C.white, color: selected === opt ? C.indigo : C.slate700, fontWeight: selected === opt ? 700 : 500, fontSize: 14, cursor: "pointer", textAlign: "left", transition: "all 0.15s", fontFamily: "inherit" }}>
              {opt}
            </button>
          ))}
        </div>

        {showExpl && (
          <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.slate700, display: "block", marginBottom: 8 }}>{q.explanation_prompt}</label>
              <textarea value={explanation} onChange={e => setExplanation(e.target.value)}
                style={{ width: "100%", height: 88, borderRadius: 10, border: `1.5px solid ${C.border}`, padding: "10px 12px", fontSize: 13, outline: "none", resize: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                placeholder="Type your explanation here…" />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.slate700, display: "block", marginBottom: 8 }}>How confident are you? ({confidence}/5)</label>
              <input type="range" min={1} max={5} value={confidence} onChange={e => setConfidence(Number(e.target.value))}
                style={{ width: "100%", marginBottom: 6 }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.slate500 }}>
                <span>Not sure</span><span>Very confident</span>
              </div>
              <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 6 }}>
                {[1,2,3,4,5].map(v => (
                  <div key={v} onClick={() => setConfidence(v)} style={{ borderRadius: 8, background: confidence === v ? C.indigo : C.slate100, color: confidence === v ? C.white : C.slate700, padding: "8px 0", textAlign: "center", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{v}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between" }}>
          <Button variant="secondary" disabled={qi === 0} onClick={() => { setQi(Math.max(0, qi-1)); setSelected(null); setExplanation(""); setShowExpl(false); }}>Previous</Button>
          {qi < DIAGNOSTIC_QS.length - 1
            ? <Button disabled={!canProceed} onClick={handleNext}>Next question</Button>
            : <Button variant="success" disabled={!canProceed} onClick={handleNext}>Generate diagnostic report →</Button>
          }
        </div>
      </Card>
    </div>
  );
}

// ─── SCREEN: ANALYSING ────────────────────────────────────────────────────────
function AnalysingScreen({ childName, responses, onComplete }: any) {
  const [stage, setStage] = useState(0);
  const stages = ["Mapping concept connections…", "Identifying gap patterns…", "Generating your report…"];
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1200);
    const t2 = setTimeout(() => setStage(2), 2400);
    interpretDiagnosticAI(responses, childName).then(r => setTimeout(() => onComplete(r), 3400));
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, gap: 24 }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ width: 56, height: 56, borderRadius: "50%", border: "3px solid #e0e7ff", borderTop: `3px solid ${C.indigo}`, animation: "spin 1s linear infinite" }} />
      <div style={{ textAlign: "center" }}>
        <p style={{ fontWeight: 700, fontSize: 16, color: C.slate950, margin: "0 0 6px" }}>Analysing {childName}&apos;s responses</p>
        <p style={{ color: C.indigo, fontSize: 13, margin: 0 }}>{stages[stage]}</p>
      </div>
    </div>
  );
}

// ─── SCREEN: DIAGNOSTIC REPORT (LIVE) ─────────────────────────────────────────
function DiagnosticReport({ child, diagResult, onNext }: any) {
  if (!diagResult) return <AnalysingScreen childName={child} responses={[]} onComplete={() => {}} />;

  const gaps = diagResult.gaps || [];
  const strong = diagResult.strongAreas || [];
  const correct = DIAGNOSTIC_QS.filter((_, i) => i < 3).length; // placeholder
  const score = Math.round(((3 - gaps.length) / 3) * 100);

  return (
    <div>
      <SectionTitle
        eyebrow="Step 4"
        title="Diagnostic report and reasoning fingerprint"
        subtitle="The report explains the root cause of difficulty in parent-friendly language, powered by live AI analysis of the student's answers, explanations and confidence signals."
      />
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <Card>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: C.slate950, margin: "0 0 4px" }}>{child}&apos;s Maths Health Report</h3>
              <p style={{ fontSize: 13, color: C.slate500, margin: 0 }}>Live AI diagnostic · Scaffio</p>
            </div>
            <div style={{ borderRadius: 14, background: C.indigoLight, padding: "10px 20px", textAlign: "center", flexShrink: 0 }}>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: C.indigo, margin: "0 0 2px" }}>Score</p>
              <p style={{ fontSize: 26, fontWeight: 900, color: C.indigo, margin: 0 }}>{score}%</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 20 }}>
            <div style={{ borderRadius: 12, background: C.slate50, padding: "14px 16px" }}>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: C.slate500, margin: "0 0 6px" }}>Main gap</p>
              <p style={{ fontWeight: 700, color: C.slate950, margin: 0, fontSize: 14 }}>{diagResult.mainGap || gaps[0]?.concept}</p>
            </div>
            <div style={{ borderRadius: 12, background: C.slate50, padding: "14px 16px" }}>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: C.slate500, margin: "0 0 6px" }}>Confidence signal</p>
              <p style={{ fontWeight: 700, color: C.slate950, margin: 0, fontSize: 14 }}>{diagResult.confidenceStatus}</p>
            </div>
          </div>

          <div style={{ borderRadius: 12, background: C.indigoLight, border: `1px solid #c7d2fe`, padding: 16, marginTop: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: C.indigoDark, margin: "0 0 6px" }}>Parent-friendly explanation</p>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: C.indigoDark, margin: 0 }}>{diagResult.summary}</p>
          </div>

          {/* Foundations visual */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
            <div style={{ borderRadius: 12, background: C.emeraldLight, padding: "14px 16px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: C.emerald, margin: "0 0 8px" }}>✅ Solid foundations</p>
              {strong.map((s: string, i: number) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.emerald, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: C.slate700 }}>{s}</span>
                </div>
              ))}
            </div>
            <div style={{ borderRadius: 12, background: C.amberLight, padding: "14px 16px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: C.amber, margin: "0 0 8px" }}>🔧 Foundations to build</p>
              {gaps.map((g: any, i: number) => {
                const pct = Math.round((g.strength || 0.4) * 100);
                return (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: C.slate900 }}>{g.concept}</span>
                      <span style={{ fontSize: 11, color: C.amber, fontWeight: 700 }}>{pct}%</span>
                    </div>
                    <div style={{ height: 4, background: "#fde68a", borderRadius: 2 }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: pct < 50 ? C.red : C.amber, borderRadius: 2 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <Button onClick={() => onNext("Logic Brick Workshop")}>Start recommended mission</Button>
            <Button variant="secondary" onClick={() => onNext("Parent Dashboard")}>View parent dashboard</Button>
          </div>
        </Card>

        <Card>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: C.slate950, margin: "0 0 16px" }}>Reasoning fingerprint</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              ["Algebra readiness", diagResult.algebraReadiness || "Developing"],
              ["Main misconception", diagResult.mainGap || gaps[0]?.concept || "—"],
              ["Reasoning style", diagResult.reasoningStyle || "Visual/contextual"],
              ["Next mission", diagResult.nextMission || "AI Pattern Finder Mission 1"],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 12, color: C.slate500 }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.slate950, textAlign: "right", maxWidth: 140 }}>{value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── SCREEN: LOGIC BRICK WORKSHOP (SMART FARM) ────────────────────────────────
function LogicBrickWorkshop({ child, diagResult, onComplete }: any) {
  const [sequence, setSequence] = useState<any[]>([]);
  const [workings, setWorkings] = useState<Record<string, string>>({});
  const [finalAnswer, setFinalAnswer] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  // Embedded AI coach state
  const [coachMessages, setCoachMessages] = useState<any[]>([]);
  const [coachInput, setCoachInput] = useState("");
  const [coachLoading, setCoachLoading] = useState(false);
  const coachRef = useRef<HTMLDivElement>(null);
  const coachInputRef = useRef<HTMLInputElement>(null);

  const usedIds = sequence.map(b => b.id);
  const availBricks = BRICKS.filter(b => !usedIds.includes(b.id));
  const canSubmit = sequence.length >= 2 && finalAnswer.trim() && interpretation.trim().length > 10;
  
  const brickNames = sequence.map(b => b.name).join(" → ");
  const coachQuestionCount = coachMessages.filter(m => m.role === "coach").length;
  const coachComplete = coachQuestionCount >= 3;

  // Initialize coach when workshop submitted
  useEffect(() => {
    if (!submitted) return;
    const firstBrick = sequence?.[0];
    const prompt = firstBrick
      ? `I just completed the Logic Brick Workshop. I started with "${firstBrick.name}". My final answer is: ${finalAnswer} ${PROJECT.answerUnit}. My interpretation: ${interpretation}. Can you help me think deeper?`
      : "I just completed the Logic Brick Workshop. Can you help me reflect on my thinking?";
    setCoachLoading(true);
    getCoachResponse(prompt, { sequence, finalAnswer, interpretation, gaps: diagResult?.gaps }, [])
      .then(r => { setCoachMessages([{ role: "coach", content: r }]); setCoachLoading(false); });
  }, [submitted]);

  useEffect(() => { coachRef.current?.scrollIntoView({ behavior: "smooth" }); }, [coachMessages, coachLoading]);

  const sendCoachMessage = async () => {
    if (!coachInput.trim() || coachLoading || coachComplete) return;
    const userMsg = { role: "user", content: coachInput };
    const newMsgs = [...coachMessages, userMsg];
    setCoachMessages(newMsgs);
    setCoachInput("");
    setCoachLoading(true);
    const history = newMsgs.map(m => ({ role: m.role === "coach" ? "assistant" : "user", content: m.content }));
    const r = await getCoachResponse(coachInput, { sequence, finalAnswer, interpretation }, history.slice(0, -1));
    
    // Check if this will be the 3rd coach response
    const futureCoachCount = history.filter(m => m.role === "assistant").length + 1;
    
    if (futureCoachCount >= 3) {
      // This is the final coach response - add a completion explanation
      const completionExplanation = `\n\n---\n\n🎓 **Session Summary:**\n\nYou've completed 3 guided coaching questions. Through our conversation, you've:\n1. Reflected on your initial approach and brick sequence\n2. Tested your reasoning against the problem's constraints\n3. Explained the real-world meaning of your answer\n\nYour mathematical thinking has become deeper and more rigorous. You're now ready to apply this reasoning to new problems. Well done! 🎉`;
      setCoachMessages(p => [...p, { role: "coach", content: r + completionExplanation }]);
    } else {
      setCoachMessages(p => [...p, { role: "coach", content: r }]);
    }
    
    setCoachLoading(false);
    setTimeout(() => coachInputRef.current?.focus(), 100);
  };

  return (
    <div>
      <SectionTitle
        eyebrow="Step 5"
        title="Logic Brick Workshop"
        subtitle="Students solve real-world applied maths missions by selecting and sequencing Logic Bricks. Then get real-time AI coaching."
      />
      <div style={{ maxWidth: 1000 }}>
        {/* Project card */}
        <Card style={{ background: C.navy, color: C.white, marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <span style={{ fontSize: 40 }}>{PROJECT.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: C.white }}>{PROJECT.title}</h2>
                <span style={{ fontSize: 11, background: "rgba(79,70,229,0.3)", color: "#c7d2fe", padding: "4px 10px", borderRadius: 6, fontWeight: 600 }}>{PROJECT.domain}</span>
              </div>
              <p style={{ margin: "0 0 12px", fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.8)" }}>{PROJECT.scenario}</p>
              <div style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 10, padding: "12px 16px" }}>
                <span style={{ color: C.gold, fontWeight: 600, fontSize: 14 }}>🎯 {PROJECT.question}</span>
              </div>
            </div>
          </div>
        </Card>

        {!submitted ? (
          // ── WORKSHOP (BEFORE SUBMISSION) ────────────────────────────────────
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>
            {/* Brick library */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.slate500, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Logic Bricks</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {availBricks.map(brick => (
                  <button key={brick.id} onClick={() => !submitted && setSequence(p => [...p, brick])}
                    style={{
                      background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", cursor: "pointer",
                      textAlign: "left", opacity: submitted ? 0.5 : 1, transition: "all 0.15s", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 10
                    }}>
                    <span style={{ fontSize: 18 }}>{brick.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.slate900 }}>{brick.name}</div>
                      <div style={{ fontSize: 11, color: C.slate500 }}>{brick.desc}</div>
                    </div>
                  </button>
                ))}
                {availBricks.length === 0 && <p style={{ fontSize: 12, color: C.slate500, textAlign: "center", padding: 10 }}>All bricks used</p>}
              </div>
            </div>

            {/* Workspace */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.slate500, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>My reasoning trail</div>
              {sequence.length === 0 ? (
                <Card style={{ textAlign: "center", color: C.slate500, padding: "48px 32px", border: `2px dashed ${C.border}` }}>
                  Click bricks on the left to build your reasoning trail
                </Card>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {sequence.map((brick, i) => (
                    <Card key={brick.id} style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ width: 24, height: 24, background: C.indigo, color: C.white, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                          <span style={{ fontSize: 18 }}>{brick.icon}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: C.slate900 }}>{brick.name}</span>
                        </div>
                        {!submitted && (
                          <button onClick={() => { setSequence(p => p.filter(b => b.id !== brick.id)); setWorkings(p => { const n = { ...p }; delete n[brick.id]; return n; }); }}
                            style={{ background: "none", border: "none", color: C.slate500, cursor: "pointer", fontSize: 20, padding: 0 }}>×</button>
                        )}
                      </div>
                      <textarea disabled={submitted} value={workings[brick.id] || ""}
                        onChange={e => setWorkings(p => ({ ...p, [brick.id]: e.target.value }))}
                        placeholder={`Show your working for "${brick.name}"…`}
                        style={{ width: "100%", height: 56, borderRadius: 8, border: `1px solid ${C.border}`, padding: "10px 12px", fontSize: 13, outline: "none", resize: "none", fontFamily: "inherit", boxSizing: "border-box", opacity: submitted ? 0.6 : 1 }} />
                    </Card>
                  ))}
                </div>
              )}

              {sequence.length >= 1 && (
                <Card style={{ marginTop: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: C.slate700, display: "block", marginBottom: 8 }}>My final answer</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <input disabled={submitted} value={finalAnswer} onChange={e => setFinalAnswer(e.target.value)} type="number"
                      style={{ width: 120, borderRadius: 8, border: `1.5px solid ${C.border}`, padding: "10px 12px", fontSize: 14, outline: "none", fontFamily: "inherit" }} placeholder="e.g. 75" />
                    <span style={{ fontSize: 13, color: C.slate500 }}>days</span>
                  </div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: C.slate700, display: "block", marginBottom: 8 }}>{PROJECT.interpretationPrompt}</label>
                  <textarea disabled={submitted} value={interpretation} onChange={e => setInterpretation(e.target.value)}
                    style={{ width: "100%", height: 76, borderRadius: 8, border: `1.5px solid ${C.border}`, padding: "10px 12px", fontSize: 13, outline: "none", resize: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                    placeholder="What does the number mean for the farmer?" />
                </Card>
              )}

              {!submitted ? (
                <Button disabled={!canSubmit} onClick={() => setSubmitted(true)} style={{ marginTop: 16, opacity: canSubmit ? 1 : 0.4 }}>Show my thinking →</Button>
              ) : null}
            </div>
          </div>
        ) : (
          // ── EMBEDDED AI COACH (AFTER SUBMISSION) ────────────────────────────
          <div>
            <Card style={{ background: C.emeraldLight, border: `1px solid ${C.emerald}`, marginBottom: 20 }}>
              <p style={{ fontWeight: 700, fontSize: 14, color: C.emerald, margin: "0 0 8px" }}>✅ Reasoning trail captured!</p>
              <p style={{ fontSize: 13, color: C.slate600, margin: 0, lineHeight: 1.5 }}>
                Your brick sequence: <span style={{ fontWeight: 600, color: C.slate900 }}>{brickNames || "—"}</span>
              </p>
            </Card>

            <SectionTitle eyebrow="Embedded coach" title="AI Socratic Coach" subtitle="Answer questions to deepen your thinking. We ask up to 3 questions." />

            {/* Coach messages */}
            <Card style={{ display: "flex", flexDirection: "column", minHeight: 300, maxHeight: 440, marginBottom: 20 }}>
              <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14, paddingBottom: 8 }}>
                <style>{`@keyframes bounce{0%,80%,100%{transform:scale(1)}40%{transform:scale(1.4)}}`}</style>
                {coachMessages.map((msg, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
                    {msg.role === "coach" && (
                      <div style={{ width: 32, height: 32, background: C.indigo, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontWeight: 800, fontSize: 12, flexShrink: 0 }}>AI</div>
                    )}
                    <div style={{ background: msg.role === "coach" ? C.slate100 : C.indigo, color: msg.role === "coach" ? C.slate700 : C.white, borderRadius: msg.role === "coach" ? "4px 12px 12px 12px" : "12px 4px 12px 12px", padding: "12px 16px", maxWidth: "80%", fontSize: 13, lineHeight: 1.6, fontWeight: msg.role === "coach" ? 500 : 400 }}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {coachLoading && (
                  <div style={{ display: "flex", gap: 10 }}>
                    <div style={{ width: 32, height: 32, background: C.indigo, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontWeight: 800, fontSize: 12 }}>AI</div>
                    <div style={{ background: C.slate100, borderRadius: "4px 12px 12px 12px", padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: 4 }}>
                        {[0,1,2].map(i => <div key={i} style={{ width: 7, height: 7, background: C.slate500, borderRadius: "50%", animation: `bounce 1.2s ease-in-out ${i*0.2}s infinite` }} />)}
                      </div>
                    </div>
                  </div>
                )}
                {coachComplete && (
                  <div style={{ background: C.emeraldLight, borderRadius: 10, padding: "16px 18px", border: `2px solid ${C.emerald}`, marginTop: 10 }}>
                    <p style={{ fontSize: 13, fontWeight: 800, color: C.emerald, margin: "0 0 8px", display: "flex", alignItems: "center", gap: 8 }}>
                      <span>✅</span> Coaching session complete!
                    </p>
                    <p style={{ fontSize: 12, color: C.slate700, margin: "0 0 6px", lineHeight: 1.5 }}>
                      You've successfully completed 3 guided questions with your AI coach. Your mathematical reasoning and problem-solving approach have been strengthened.
                    </p>
                    <p style={{ fontSize: 11, color: C.slate600, margin: 0, fontStyle: "italic" }}>
                      Next: Review your badges or try the Maths Problem Solving module to practice with other real-world scenarios.
                    </p>
                  </div>
                )}
                <div ref={coachRef} />
              </div>
              {!coachComplete && (
                <div style={{ display: "flex", gap: 8, paddingTop: 12, borderTop: `1px solid ${C.border}`, marginTop: 8 }}>
                  <input ref={coachInputRef} value={coachInput} onChange={e => setCoachInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendCoachMessage()}
                    placeholder="Type your answer or question…" disabled={coachLoading}
                    style={{ flex: 1, borderRadius: 8, border: `1.5px solid ${C.border}`, padding: "10px 12px", fontSize: 13, outline: "none", fontFamily: "inherit" }} />
                  <button onClick={sendCoachMessage} disabled={!coachInput.trim() || coachLoading}
                    style={{ background: C.indigo, color: C.white, border: "none", borderRadius: 8, padding: "0 18px", cursor: "pointer", fontSize: 16, opacity: !coachInput.trim() || coachLoading ? 0.4 : 1 }}>→</button>
                </div>
              )}
              <p style={{ fontSize: 11, color: C.slate500, textAlign: "center", margin: "8px 0 0" }}>
                {coachComplete ? "Coaching complete · 3 of 3 questions" : `Question ${coachQuestionCount} of 3 · Socratic coaching powered by Claude AI`}
              </p>
            </Card>

            {coachComplete && (
              <Button onClick={() => onComplete?.()} style={{ width: "100%", padding: "14px 20px", fontSize: 15, fontWeight: 700 }}>
                Continue to Badges & Certificates →
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SCREEN: MATHS PROBLEM SOLVING (REBUILT WITH SUB-MODULES) ───────────────
function MathsProblemSolving() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedSubModule, setSelectedSubModule] = useState<"problems" | "programming" | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<any>(null);
  const [studentAnswer, setStudentAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [programmingCode, setProgrammingCode] = useState("");
  const [programmingSubmitted, setProgrammingSubmitted] = useState(false);

  const problem = selectedTheme && selectedProblem 
    ? THEMATIC_PROBLEMS.find(p => p.id === selectedTheme)?.problems.find(pr => pr.id === selectedProblem)
    : null;
  const theme = selectedTheme ? THEMATIC_PROBLEMS.find(p => p.id === selectedTheme) : null;

  // ─── SCREEN 1: THEME SELECTION ──────────────────────────────────────────────
  if (!selectedTheme) {
    return (
      <div>
        <SectionTitle
          eyebrow="Step 6"
          title="Maths Problem Solving"
          subtitle="Explore real-world maths connected to AI, Data Science, Blockchain, and Programming. Build skills across themes."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, maxWidth: 1000 }}>
          {THEMATIC_PROBLEMS.map(t => (
            <Card key={t.id} onClick={() => setSelectedTheme(t.id)} style={{ background: C.white, border: `2px solid ${t.color}`, cursor: "pointer", transition: "all 0.2s", paddingTop: 0 }}>
              <div style={{ background: t.color, color: C.white, padding: "20px", borderRadius: "14px 14px 0 0", fontSize: 36, marginBottom: 0, textAlign: "center" }}>
                {t.emoji}
              </div>
              <div style={{ padding: "20px" }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: C.slate950, margin: "0 0 6px" }}>{t.title}</h3>
                <p style={{ fontSize: 13, color: t.color, fontWeight: 700, margin: "0 0 10px" }}>{t.theme}</p>
                <p style={{ fontSize: 12, lineHeight: 1.6, color: C.slate600, margin: "0 0 14px" }}>{t.subtitle}</p>
                <p style={{ fontSize: 11, color: C.slate500, margin: 0 }}>📚 {t.problems.length} problems · 💻 Programming task</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // ─── SCREEN 2: SUB-MODULE SELECTION (Problems vs Programming) ───────────────
  if (selectedTheme && !selectedSubModule && theme) {
    return (
      <div>
        <button onClick={() => setSelectedTheme(null)} style={{ background: "none", border: "none", color: C.indigo, cursor: "pointer", fontSize: 14, fontWeight: 600, marginBottom: 20, padding: 0 }}>
          ← Back to themes
        </button>
        
        <SectionTitle
          eyebrow={theme.theme}
          title={theme.title}
          subtitle={theme.realWorldContext}
        />

        <Card style={{ background: `${theme.color}15`, border: `1px solid ${theme.color}40`, marginBottom: 20 }}>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: C.slate700, margin: 0 }}><strong>Core maths:</strong> {theme.coreMaths}</p>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, maxWidth: 1000 }}>
          {/* Sub-Module 1: Solve Problems */}
          <Card onClick={() => setSelectedSubModule("problems")} style={{ background: C.white, border: `2px solid ${C.emerald}`, cursor: "pointer", transition: "all 0.2s" }}>
            <div style={{ fontSize: 44, textAlign: "center", marginBottom: 14 }}>📚</div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: C.slate950, margin: "0 0 8px", textAlign: "center" }}>Solve Problems</h3>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: C.slate600, margin: "0 0 14px", textAlign: "center" }}>
              Practice {theme.problems.length} maths problem{theme.problems.length !== 1 ? 's' : ''} with hints and feedback
            </p>
            <div style={{ textAlign: "center" }}>
              <span style={{ background: C.emerald, color: C.white, borderRadius: 20, padding: "6px 12px", fontSize: 11, fontWeight: 700 }}>
                {theme.problems.length} questions
              </span>
            </div>
          </Card>

          {/* Sub-Module 2: Programming Task */}
          <Card onClick={() => setSelectedSubModule("programming")} style={{ background: C.white, border: `2px solid ${C.indigo}`, cursor: "pointer", transition: "all 0.2s" }}>
            <div style={{ fontSize: 44, textAlign: "center", marginBottom: 14 }}>💻</div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: C.slate950, margin: "0 0 8px", textAlign: "center" }}>Programming Task</h3>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: C.slate600, margin: "0 0 14px", textAlign: "center" }}>
              Write code to solve a real-world problem using {theme.programmingTask.language}
            </p>
            <div style={{ textAlign: "center" }}>
              <span style={{ background: C.indigo, color: C.white, borderRadius: 20, padding: "6px 12px", fontSize: 11, fontWeight: 700 }}>
                {theme.programmingTask.language}
              </span>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // ─── SCREEN 3A: SOLVE PROBLEMS SUB-MODULE ──────────────────────────────────
  if (selectedTheme && selectedSubModule === "problems" && !selectedProblem && theme) {
    return (
      <div>
        <button onClick={() => setSelectedSubModule(null)} style={{ background: "none", border: "none", color: C.indigo, cursor: "pointer", fontSize: 14, fontWeight: 600, marginBottom: 20, padding: 0 }}>
          ← Back to {theme.title}
        </button>

        <SectionTitle
          eyebrow="Sub-module: Solve Problems"
          title={`${theme.title} - Practice Questions`}
          subtitle={`Solve ${theme.problems.length} problem${theme.problems.length !== 1 ? 's' : ''} to master these concepts`}
        />

        <div style={{ display: "grid", gap: 16, maxWidth: 800, marginBottom: 20 }}>
          {theme.problems.map((p, i) => (
            <Card key={p.id} onClick={() => setSelectedProblem(p.id)} style={{ background: C.white, border: `1px solid ${C.border}`, cursor: "pointer", transition: "all 0.2s", paddingRight: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: C.slate950, margin: "0 0 8px" }}>Question {i + 1}</h4>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: C.slate600, margin: 0 }}>{p.question}</p>
              </div>
              <div style={{ fontSize: 24, padding: "0 16px", color: C.emerald }}>→</div>
            </Card>
          ))}
        </div>

        <Card style={{ background: C.emeraldLight, border: `1px solid ${C.emerald}` }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: C.emerald, margin: "0 0 6px" }}>💡 Tip:</p>
          <p style={{ fontSize: 12, color: C.slate600, margin: 0, lineHeight: 1.5 }}>
            Use the hint if you're stuck, but try to solve it yourself first. This builds stronger problem-solving skills!
          </p>
        </Card>
      </div>
    );
  }

  // ─── SCREEN 3B: SOLVE INDIVIDUAL PROBLEM ────────────────────────────────────
  if (selectedTheme && selectedSubModule === "problems" && selectedProblem && problem && theme) {
    return (
      <div>
        <button onClick={() => setSelectedProblem(null)} style={{ background: "none", border: "none", color: C.indigo, cursor: "pointer", fontSize: 14, fontWeight: 600, marginBottom: 20, padding: 0 }}>
          ← Back to questions
        </button>

        <SectionTitle eyebrow={`${theme.theme} - Question`} title={problem.question} subtitle="" />

        {!submitted ? (
          <div style={{ maxWidth: 700 }}>
            <Card style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.slate700, display: "block", marginBottom: 12 }}>Your answer</label>
              <textarea value={studentAnswer} onChange={e => setStudentAnswer(e.target.value)}
                style={{ width: "100%", height: 120, borderRadius: 8, border: `1.5px solid ${C.border}`, padding: "12px 14px", fontSize: 13, outline: "none", resize: "none", fontFamily: "inherit", boxSizing: "border-box", marginBottom: 14 }}
                placeholder="Show your working or write your answer…" />
              
              <div style={{ display: "flex", gap: 10 }}>
                <Button onClick={() => setShowHint(!showHint)} variant="secondary">
                  {showHint ? "Hide hint" : "Show hint"}
                </Button>
                <Button onClick={() => setSubmitted(true)} disabled={!studentAnswer.trim()}>
                  Submit answer
                </Button>
              </div>

              {showHint && (
                <div style={{ background: "#fef3e2", border: `1px solid #fed7aa`, borderRadius: 8, padding: "12px 14px", marginTop: 14 }}>
                  <p style={{ fontSize: 12, color: "#b45309", fontWeight: 600, margin: "0 0 6px" }}>💡 Hint:</p>
                  <p style={{ fontSize: 12, color: "#b45309", margin: 0, lineHeight: 1.5 }}>{problem.hint}</p>
                </div>
              )}
            </Card>
          </div>
        ) : (
          <Card style={{ background: C.indigoLight, marginBottom: 20 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.indigo, margin: "0 0 10px" }}>✅ Answer received!</h4>
            <p style={{ fontSize: 12, color: C.indigoDark, margin: "0 0 10px", lineHeight: 1.6 }}><strong>Your approach:</strong></p>
            <p style={{ fontSize: 13, color: C.indigoDark, margin: "0 0 14px", lineHeight: 1.6, fontStyle: "italic", background: C.white, padding: "10px 12px", borderRadius: 6 }}>"{studentAnswer}"</p>
            <p style={{ fontSize: 12, color: C.indigoDark, margin: "0 0 10px", lineHeight: 1.6 }}><strong>Expected approach:</strong></p>
            <p style={{ fontSize: 13, color: C.indigoDark, margin: 0, lineHeight: 1.6 }}>{problem.expectedApproach}</p>
            <Button onClick={() => { setSubmitted(false); setStudentAnswer(""); setShowHint(false); }} style={{ marginTop: 14 }} variant="secondary">
              Try another problem
            </Button>
          </Card>
        )}
      </div>
    );
  }

  // ─── SCREEN 4: PROGRAMMING TASK PRACTICE ────────────────────────────────────
  if (selectedTheme && selectedSubModule === "programming" && theme) {
    return (
      <div>
        <button onClick={() => setSelectedSubModule(null)} style={{ background: "none", border: "none", color: C.indigo, cursor: "pointer", fontSize: 14, fontWeight: 600, marginBottom: 20, padding: 0 }}>
          ← Back to {theme.title}
        </button>

        <SectionTitle
          eyebrow="Sub-module: Programming Task"
          title={theme.programmingTask.title}
          subtitle={`Write code in ${theme.programmingTask.language} to solve this problem`}
        />

        <Card style={{ background: C.indigoLight, border: `1px solid ${C.indigo}`, marginBottom: 20 }}>
          <p style={{ fontSize: 12, lineHeight: 1.7, color: C.indigoDark, margin: 0 }}><strong>📋 Problem:</strong><br />{theme.programmingTask.description}</p>
        </Card>

        <Card style={{ marginBottom: 20 }}>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: C.slate950, margin: "0 0 12px" }}>📝 Starter Template</h4>
          <pre style={{ background: "#f8f9fa", padding: "12px", borderRadius: 8, fontSize: 11, lineHeight: 1.5, overflowX: "auto", color: C.slate700, margin: "0 0 14px", border: `1px solid ${C.border}` }}>
            {theme.programmingTask.pseudocode}
          </pre>

          <label style={{ fontSize: 13, fontWeight: 600, color: C.slate700, display: "block", marginBottom: 10 }}>Your code ({theme.programmingTask.language})</label>
          <textarea value={programmingCode} onChange={e => setProgrammingCode(e.target.value)}
            style={{ width: "100%", height: 200, borderRadius: 8, border: `1.5px solid ${C.border}`, padding: "12px 14px", fontSize: 12, outline: "none", resize: "none", fontFamily: "monospace", boxSizing: "border-box", marginBottom: 14, background: "#f8f9fa" }}
            placeholder={`# Write your ${theme.programmingTask.language} code here...`} />
          
          <div style={{ display: "flex", gap: 10 }}>
            <Button onClick={() => setProgrammingCode("")} variant="secondary">
              Clear code
            </Button>
            <Button onClick={() => setProgrammingSubmitted(true)} disabled={!programmingCode.trim()}>
              Submit solution
            </Button>
          </div>
        </Card>

        {programmingSubmitted && (
          <Card style={{ background: C.emeraldLight, border: `1px solid ${C.emerald}` }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.emerald, margin: "0 0 10px" }}>✅ Solution submitted!</h4>
            <p style={{ fontSize: 12, color: C.slate700, margin: "0 0 10px", lineHeight: 1.5 }}>
              <strong>Great work!</strong> You've written code to solve this problem. 
            </p>
            <div style={{ background: C.white, padding: "12px", borderRadius: 8, marginBottom: 12 }}>
              <p style={{ fontSize: 11, color: C.slate600, margin: "0 0 8px", fontWeight: 600 }}>Your submission:</p>
              <pre style={{ margin: 0, fontSize: 11, lineHeight: 1.4, color: C.slate700, whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                {programmingCode.slice(0, 300)}{programmingCode.length > 300 ? "..." : ""}
              </pre>
            </div>
            <p style={{ fontSize: 12, color: C.slate700, margin: "0 0 12px", lineHeight: 1.5, fontStyle: "italic" }}>
              💡 <strong>Next step:</strong> Test your code with different inputs and edge cases to make sure it works correctly!
            </p>
            <Button onClick={() => { setProgrammingSubmitted(false); setProgrammingCode(""); }} variant="secondary">
              Edit code
            </Button>
          </Card>
        )}

        <Card style={{ background: "#fef3e2", border: `1px solid #fed7aa`, marginTop: 20 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#b45309", margin: "0 0 6px" }}>💻 Tips for success:</p>
          <ul style={{ fontSize: 12, color: "#b45309", margin: "0", paddingLeft: 20, lineHeight: 1.6 }}>
            <li>Start with the pseudocode template provided above</li>
            <li>Test your code with different inputs</li>
            <li>Check edge cases (empty inputs, very large numbers, etc.)</li>
            <li>Add comments to explain your logic</li>
          </ul>
        </Card>
      </div>
    );
  }

  return null;
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function ScaffioDemo() {
  const [screen, setScreen] = useState("Overview");
  const [childName, setChildName] = useState("Ayaan");
  const [yearGroup, setYearGroup] = useState("Year 8");
  const [selectedConcerns, setSelectedConcerns] = useState(["Low confidence", "Algebra feels confusing"]);
  const [selectedInterests, setSelectedInterests] = useState(["AI", "Coding"]);

  // Live AI state
  const [diagResponses, setDiagResponses] = useState<any>(null);
  const [diagResult, setDiagResult] = useState<any>(null);
  const [analysing, setAnalysing] = useState(false);

  const goto = (s: string) => setScreen(s);

  const ragItems = [
    { collection: "curriculum_concepts", sample: "Linear equations → inverse operations → balance model → checking solutions" },
    { collection: "misconception_taxonomy", sample: "Adds instead of subtracting; treats equals sign as answer marker; operation on one side only" },
    { collection: "logic_brick_rules", sample: "Valid sequence: Variable → Equation → Inverse Operation → Check Answer → Context Meaning" },
    { collection: "socratic_prompts", sample: "What operation would undo adding 3? How can you keep both sides balanced?" },
    { collection: "future_tech_contexts", sample: "Equations can model unknown values in prediction systems and simple AI rules." },
    { collection: "parent_report_templates", sample: "Plain-English explanation of gap, reason for struggle, and next learning mission." },
  ];

  const diagnostic = useMemo(() => {
    if (diagResult) return diagResult;
    const q1Wrong = true;
    return {
      score: 67, correct: 2,
      mainGap: "Inverse operations in equations",
      confidenceStatus: "Overconfident misconception",
      nextMission: "Algebra Foundations Mission 2",
      parentSummary: `${childName} understands algebra involves finding a missing value, but needs support undoing operations in the correct order.`,
    };
  }, [diagResult, childName]);

  const renderScreen = () => {
    if (analysing) {
      return <AnalysingScreen childName={childName} responses={diagResponses} onComplete={(r: any) => { setDiagResult(r); setAnalysing(false); setScreen("Diagnostic Report"); }} />;
    }

    switch (screen) {
      // ── OVERVIEW (LANDING PAGE) ────────────────────────────────────────────
      case "Overview": return (
        <div style={{ minHeight: "100vh", background: C.slate50 }}>
          {/* Hero Section */}
          <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1e3a8a 100%)`, color: C.white, padding: "60px 40px", textAlign: "center", marginBottom: 40 }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <h1 style={{ fontSize: 48, fontWeight: 900, margin: "0 0 20px", letterSpacing: "-1.5px", lineHeight: 1.2 }}>
                The maths gap is a <span style={{ color: C.gold }}>system failure.</span><br />Not a student failure.
              </h1>
              <p style={{ fontSize: 18, lineHeight: 1.8, margin: "0 0 32px", color: "rgba(255,255,255,0.85)", maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>
                1 in 3 UK students leave secondary school without a standard GCSE maths pass. Scaffio fixes the root cause — not the symptom.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Button onClick={() => goto("Parent Onboarding")} style={{ background: C.gold, color: C.navy, border: "none", padding: "16px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer", borderRadius: 10 }}>
                  Try the free demo →
                </Button>
                <Button onClick={() => setScreen("_LOGIN")} variant="ghost" style={{ border: `2px solid ${C.gold}`, color: C.gold, padding: "14px 30px", fontSize: 16, fontWeight: 700, cursor: "pointer", borderRadius: 10 }}>
                  Parent login
                </Button>
              </div>
            </div>
          </div>

          {/* Pain Points Section */}
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 60px" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: C.indigo, textTransform: "uppercase", letterSpacing: "0.15em", margin: "0 0 12px" }}>The problem</p>
              <h2 style={{ fontSize: 36, fontWeight: 800, color: C.slate950, margin: 0, letterSpacing: "-0.5px" }}>Why UK students struggle with maths</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
              {[
                {
                  icon: "📊",
                  title: "Gaps aren't diagnosed correctly",
                  desc: "Traditional tests measure scores, not the real misconceptions blocking progress. A student who gets 60% might have 3 different root problems.",
                  pain: "1 in 3 leave secondary without a standard pass"
                },
                {
                  icon: "🎯",
                  title: "One-size-fits-all tutoring fails",
                  desc: "Generic tutoring treats all low scorers the same. But inverse operations gaps are completely different from proportional reasoning gaps.",
                  pain: "£2B/year spent on ineffective private tutoring"
                },
                {
                  icon: "😟",
                  title: "Low confidence breeds avoidance",
                  desc: "Without understanding the root cause, students develop maths anxiety. They avoid homework. They avoid GCSE revision. The gap widens.",
                  pain: "82% of parents report low child confidence"
                },
                {
                  icon: "⏰",
                  title: "Remediation comes too late",
                  desc: "Gaps discovered at Year 10 are too late. Students have already built wrong mental models. They've memorised rules without understanding.",
                  pain: "Years 7–9 gaps predict GCSE failure"
                },
                {
                  icon: "🤷",
                  title: "Parents feel powerless",
                  desc: "Schools lack time for 1-to-1 feedback. Parents get vague reports ('needs to improve fractions') without knowing how to help.",
                  pain: "Parents can't diagnose or close gaps"
                },
                {
                  icon: "🧠",
                  title: "Transfer skills are weak",
                  desc: "Even when students pass a test on linear equations, they can't apply the same reasoning to proportional reasoning or other contexts.",
                  pain: "Only 18% show strong transfer ability"
                },
              ].map((pain, idx) => (
                <Card key={idx} style={{ background: C.white, border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>{pain.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: C.slate950, margin: "0 0 10px" }}>{pain.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: C.slate600, margin: "0 0 14px" }}>{pain.desc}</p>
                  <div style={{ background: "#fef3e2", border: "1px solid #fed7aa", borderRadius: 8, padding: "10px 12px" }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#b45309", margin: 0 }}>🚨 {pain.pain}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* How Scaffio Solves It */}
          <div style={{ background: C.white, padding: "60px 40px", marginBottom: 40 }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: C.indigo, textTransform: "uppercase", letterSpacing: "0.15em", margin: "0 0 12px" }}>The solution</p>
                <h2 style={{ fontSize: 36, fontWeight: 800, color: C.slate950, margin: 0, letterSpacing: "-0.5px" }}>How Scaffio closes the gap</h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                {[
                  { emoji: "🧭", title: "Diagnose the real gap", desc: "AI analyzes answer accuracy, explanation quality, confidence and misconception patterns — not just scores." },
                  { emoji: "🧱", title: "Capture reasoning", desc: "Logic Bricks make mathematical thinking visible. Students show their reasoning, not just their answer." },
                  { emoji: "🤖", title: "Coach Socratically", desc: "AI asks targeted questions using curriculum context. Develops understanding, never gives answers." },
                ].map((solution, idx) => (
                  <Card key={idx}>
                    <div style={{ fontSize: 44, marginBottom: 12 }}>{solution.emoji}</div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: C.slate950, margin: "0 0 12px" }}>{solution.title}</h3>
                    <p style={{ fontSize: 13, lineHeight: 1.6, color: C.slate600, margin: 0 }}>{solution.desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 60px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {[
              ["1.9M", "UK Year 7–9 students"],
              ["£2B/yr", "Private tutoring market"],
              ["82%", "Parents report low confidence"],
              ["78%", "Interested after seeing Scaffio"],
            ].map(([stat, label]) => (
              <div key={stat} style={{ textAlign: "center" }}>
                <p style={{ fontSize: 36, fontWeight: 900, color: C.indigo, margin: "0 0 8px" }}>{stat}</p>
                <p style={{ fontSize: 13, color: C.slate600, margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ background: C.indigoLight, padding: "40px", textAlign: "center", borderRadius: 14, maxWidth: 800, margin: "0 auto 40px", marginLeft: "auto", marginRight: "auto" }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: C.slate950, margin: "0 0 12px" }}>Ready to close the maths gap?</h3>
            <p style={{ fontSize: 14, color: C.slate600, margin: "0 0 20px" }}>Try the free Health Check. No credit card needed. 5 minutes. AI-powered.</p>
            <Button onClick={() => goto("Parent Onboarding")} style={{ background: C.indigo, color: C.white, border: "none", padding: "14px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", borderRadius: 10 }}>
              Start free demo →
            </Button>
          </div>
        </div>
      );

      // ── PARENT LOGIN ───────────────────────────────────────────────────────
      case "_LOGIN": return (
        <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.navy} 0%, #1e3a8a 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <Card style={{ background: C.white, maxWidth: 420, width: "100%" }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ width: 50, height: 50, background: C.indigo, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: C.white, fontSize: 24, margin: "0 auto 16px" }}>S</div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: C.slate950, margin: "0 0 8px" }}>Parent login</h2>
              <p style={{ fontSize: 13, color: C.slate600, margin: 0 }}>Access your child's Scaffio account</p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.slate700, display: "block", marginBottom: 6 }}>Email address</label>
              <input type="email" placeholder="parent@example.com"
                style={{ width: "100%", borderRadius: 8, border: `1.5px solid ${C.border}`, padding: "11px 14px", fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.slate700, display: "block", marginBottom: 6 }}>Password</label>
              <input type="password" placeholder="••••••••"
                style={{ width: "100%", borderRadius: 8, border: `1.5px solid ${C.border}`, padding: "11px 14px", fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
            </div>

            <Button onClick={() => goto("Parent Onboarding")} style={{ width: "100%", background: C.indigo, color: C.white, border: "none", padding: "13px 20px", fontSize: 15, fontWeight: 700, cursor: "pointer", borderRadius: 8 }}>
              Sign in to your account
            </Button>

            <div style={{ textAlign: "center", marginTop: 20 }}>
              <p style={{ fontSize: 13, color: C.slate600, margin: "0 0 12px" }}>Don't have an account?</p>
              <Button onClick={() => goto("Parent Onboarding")} variant="ghost" style={{ width: "100%", padding: "11px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", borderRadius: 8 }}>
                Create new account
              </Button>
            </div>

            <button onClick={() => goto("Overview")} style={{ width: "100%", background: "none", border: "none", color: C.slate500, padding: "12px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 12 }}>
              ← Back
            </button>
          </Card>
        </div>
      );

      // ── PARENT ONBOARDING ─────────────────────────────────────────────────
      case "Parent Onboarding": return (
        <div>
          <SectionTitle eyebrow="Step 1" title="Parent onboarding and consent"
            subtitle="The parent is the buyer and account holder. The journey begins by identifying the child's year group, concern, learning goal and consent." />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <Card>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.slate700, display: "block", marginBottom: 6 }}>Child name or nickname</label>
              <input value={childName} onChange={e => setChildName(e.target.value)}
                style={{ width: "100%", borderRadius: 10, border: `1px solid ${C.border}`, padding: "10px 14px", fontSize: 14, outline: "none", marginBottom: 16, boxSizing: "border-box", fontFamily: "inherit" }} />
              <label style={{ fontSize: 13, fontWeight: 600, color: C.slate700, display: "block", marginBottom: 6 }}>Year group</label>
              <select value={yearGroup} onChange={e => setYearGroup(e.target.value)}
                style={{ width: "100%", borderRadius: 10, border: `1px solid ${C.border}`, padding: "10px 14px", fontSize: 14, outline: "none", marginBottom: 16, fontFamily: "inherit" }}>
                {["Year 7","Year 8","Year 9","Year 10"].map(y => <option key={y}>{y}</option>)}
              </select>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.slate700, margin: "0 0 8px" }}>Main concerns</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                {concerns.map(c => (
                  <button key={c} onClick={() => setSelectedConcerns(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])}
                    style={{ borderRadius: 99, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none", background: selectedConcerns.includes(c) ? C.indigo : C.slate100, color: selectedConcerns.includes(c) ? C.white : C.slate700, fontFamily: "inherit" }}>
                    {c}
                  </button>
                ))}
              </div>
              <div style={{ background: C.slate50, borderRadius: 10, padding: "12px 14px", fontSize: 12, color: C.slate600, marginBottom: 16 }}>
                Parent consent: data used only for learning diagnosis, progress reporting and AI coaching safety.
              </div>
              <Button onClick={() => goto("Student Welcome")}>Continue to student welcome</Button>
            </Card>
            <Card style={{ background: C.slate950, color: C.white }}>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "#818cf8", margin: "0 0 16px" }}>Live profile preview</p>
              <h3 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>{childName || "Student"}</h3>
              <p style={{ color: "#94a3b8", margin: "0 0 16px" }}>{yearGroup}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                {selectedConcerns.map(c => <span key={c} style={{ borderRadius: 99, background: "rgba(255,255,255,0.1)", padding: "3px 10px", fontSize: 11 }}>{c}</span>)}
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: "#94a3b8", margin: 0 }}>Scaffio uses these signals to personalise the diagnostic tone, learning path and parent report.</p>
            </Card>
          </div>
        </div>
      );

      // ── STUDENT WELCOME ───────────────────────────────────────────────────
      case "Student Welcome": return (
        <div>
          <SectionTitle eyebrow="Step 2" title={`Welcome, ${childName}`}
            subtitle="This screen makes the student feel safe. The message frames this as finding how they think, not testing whether they are good or bad at maths." />
          <Card style={{ background: "linear-gradient(135deg,#eff6ff,#eef2ff)" }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: C.slate950, margin: "0 0 8px" }}>This is not a test.</h3>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: C.slate700, margin: "0 0 20px", maxWidth: 560 }}>Scaffio will ask a few questions to understand how you think. Mistakes are useful — they show what to rebuild next.</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: C.slate700, margin: "0 0 10px" }}>What makes maths more interesting for you?</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
              {interests.map(i => (
                <button key={i} onClick={() => setSelectedInterests(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i])}
                  style={{ borderRadius: 99, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", background: selectedInterests.includes(i) ? C.indigo : C.white, color: selectedInterests.includes(i) ? C.white : C.slate700, fontFamily: "inherit" }}>
                  {i}
                </button>
              ))}
            </div>
            <div style={{ background: C.white, borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.slate900, margin: "0 0 10px" }}>Confidence baseline</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
                {[1,2,3,4,5].map(n => <div key={n} style={{ borderRadius: 10, background: C.slate50, padding: "10px 0", textAlign: "center", fontSize: 14, fontWeight: 700, color: C.slate700 }}>{n}</div>)}
              </div>
              <p style={{ fontSize: 11, color: C.slate500, margin: "6px 0 0" }}>1 = very unsure, 5 = very confident</p>
            </div>
            <Button onClick={() => goto("Maths Health Check")}>Start Maths Health Check</Button>
          </Card>
        </div>
      );

      // ── MATHS HEALTH CHECK (LIVE) ────────────────────────────────────────
      case "Maths Health Check": return (
        <MathsHealthCheck
          child={{ name: childName, year: yearGroup }}
          onComplete={(responses: any) => { setDiagResponses(responses); setAnalysing(true); }}
        />
      );

      // ── DIAGNOSTIC REPORT (LIVE) ─────────────────────────────────────────
      case "Diagnostic Report": return (
        <DiagnosticReport child={childName} diagResult={diagResult} onNext={goto} />
      );

      // ── LOGIC BRICK WORKSHOP (LIVE) ──────────────────────────────────────
      case "Logic Brick Workshop": return (
        <LogicBrickWorkshop
          child={childName}
          diagResult={diagResult}
          onComplete={() => goto("Badges & Certificates")}
        />
      );

      // ── MATHS PROBLEM SOLVING ──────────────────────────────────────────────
      case "Maths Problem Solving": return (
        <MathsProblemSolving />
      );

      // ── BADGES ────────────────────────────────────────────────────────────
      case "Badges & Certificates": return (
        <div>
          <SectionTitle eyebrow="Step 7" title="Evidence-based badges and certificates"
            subtitle="Badges are awarded for completed applied maths projects with reasoning evidence, not simple participation." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {[["AI Pattern Finder","Earned",100,"Used algebra to create and test a simple prediction rule."],["Data Explorer","In progress",65,"Analyse a dataset, calculate averages and explain a trend."],["Blockchain Logic Starter","Locked",20,"Use number patterns to simulate a secure chain of records."]].map(([name,status,progress,desc]) => (
              <Card key={name as string}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>🏅</div>
                <h3 style={{ fontWeight: 700, color: C.slate950, margin: "0 0 6px", fontSize: 14 }}>{name}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: C.slate600, margin: "0 0 14px" }}>{desc}</p>
                <ProgressBar value={progress as number} />
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: C.indigo, margin: "8px 0 0" }}>{status}</p>
              </Card>
            ))}
          </div>
          <Card style={{ marginTop: 16, background: "linear-gradient(135deg,#ecfdf5,#eff6ff)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: C.slate950, margin: "0 0 8px" }}>Certificate preview</h3>
            <p style={{ fontSize: 13, color: C.slate600, margin: "0 0 16px" }}>This certifies that {childName} completed an applied mathematics mission using algebraic reasoning in an AI prediction context.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <Button onClick={() => goto("Parent Dashboard")}>View parent dashboard</Button>
              <Button variant="secondary">Download sample certificate</Button>
            </div>
          </Card>
        </div>
      );

      // ── PARENT DASHBOARD ──────────────────────────────────────────────────
      case "Parent Dashboard": return (
        <div>
          <SectionTitle eyebrow="Step 8" title="Parent dashboard"
            subtitle="The dashboard keeps parents focused on usage, confidence progress, repaired misconceptions and next steps." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
            {[["Sessions","4","this week"],["Confidence","+18%","from baseline"],["Badges","1","earned"],["Next mission","Algebra","foundation"]].map(([label,value,hint]) => (
              <Card key={label as string}>
                <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: C.slate500, margin: "0 0 6px" }}>{label}</p>
                <p style={{ fontSize: 28, fontWeight: 900, color: C.slate950, margin: "0 0 2px" }}>{value}</p>
                <p style={{ fontSize: 12, color: C.slate500, margin: 0 }}>{hint}</p>
              </Card>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Card>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: C.slate950, margin: "0 0 10px" }}>Weekly summary</h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: C.slate600, margin: "0 0 14px" }}>{childName} completed the Maths Health Check and one AI Pattern Finder mission. The main improvement is recognising that equations can be tested by substituting values back into the original problem.</p>
              <div style={{ borderRadius: 10, background: C.amberLight, padding: "12px 14px", fontSize: 13, color: "#92400e" }}>
                <strong>Next step:</strong> Rebuild inverse operations using the visual balance model before moving to harder equations.
              </div>
            </Card>
            <Card>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: C.slate950, margin: "0 0 10px" }}>Subscription conversion panel</h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: C.slate600, margin: "0 0 16px" }}>Your free Health Check is complete. Continue with a personalised pathway, AI coaching, weekly parent reports and future-skills badges.</p>
              <div style={{ borderRadius: 10, border: `1px solid ${C.border}`, padding: "14px 16px", marginBottom: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: C.slate950, margin: "0 0 4px" }}>Scaffio Starter</p>
                <p style={{ fontSize: 28, fontWeight: 900, color: C.slate950, margin: 0 }}>£14.95<span style={{ fontSize: 13, fontWeight: 500, color: C.slate500 }}>/month</span></p>
              </div>
              <Button>Start subscription mock</Button>
            </Card>
          </div>
        </div>
      );

      // ── ADMIN / RAG LIBRARY ───────────────────────────────────────────────
      case "Admin / RAG Library": return (
        <div>
          <SectionTitle eyebrow="Build view" title="Admin panel and RAG knowledge base"
            subtitle="The controlled knowledge layer that prevents Scaffio from becoming a generic chatbot. The AI retrieves only from Scaffio's own curriculum, misconception framework and coaching rules." />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <Card>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: C.slate950, margin: "0 0 14px" }}>RAG collections</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {ragItems.map(item => (
                  <div key={item.collection} style={{ borderRadius: 10, background: C.slate50, padding: "12px 14px" }}>
                    <p style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, color: C.indigo, margin: "0 0 4px" }}>{item.collection}</p>
                    <p style={{ fontSize: 12, lineHeight: 1.6, color: C.slate600, margin: 0 }}>{item.sample}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: C.slate950, margin: "0 0 14px" }}>MVP technology stack</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {[["Frontend","Next.js 14, TypeScript, Tailwind, shadcn/ui"],["Backend","Next.js API routes (no separate server)"],["Database","Supabase PostgreSQL + pgvector"],["Vector search","pgvector in Supabase (replaces Pinecone)"],["AI","Anthropic Claude Haiku + Sonnet via API"],["Payments","Stripe Checkout + Billing"],["Analytics","PostHog + Sentry"]].map(([k,v]) => (
                  <div key={k as string} style={{ borderRadius: 8, background: C.slate50, padding: "10px 12px", fontSize: 13 }}>
                    <strong style={{ color: C.slate900 }}>{k}:</strong> <span style={{ color: C.slate600 }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderRadius: 10, background: C.indigoLight, padding: "12px 14px", fontSize: 13, lineHeight: 1.6, color: C.indigoDark }}>
                Founder/admin can review flagged AI responses, edit RAG items, update prompts, add diagnostic questions and monitor AI cost per active student.
              </div>
            </Card>
          </div>
        </div>
      );

      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: C.slate50, fontFamily: "system-ui,-apple-system,sans-serif", display: "flex" }}>
      {/* Sidebar */}
      <aside style={{ width: 256, flexShrink: 0, borderRight: `1px solid ${C.border}`, background: C.white, padding: 20, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <div style={{ width: 40, height: 40, background: C.indigo, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: C.white, fontSize: 18 }}>S</div>
          <div>
            <h1 style={{ fontWeight: 900, color: C.slate950, fontSize: 15, margin: 0, letterSpacing: "-0.3px" }}>Scaffio</h1>
            <p style={{ fontSize: 11, color: C.slate500, margin: 0 }}>MVP mock demo</p>
          </div>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 3, flex: 1 }}>
          {modules.map(m => (
            <button key={m} onClick={() => goto(m)} style={{
              width: "100%", borderRadius: 9, padding: "9px 12px", textAlign: "left", fontSize: 13,
              fontWeight: screen === m ? 700 : 500, cursor: "pointer", border: "none", fontFamily: "inherit",
              background: screen === m ? C.indigo : "transparent", color: screen === m ? C.white : C.slate600,
              transition: "all 0.15s",
            }}>{m}</button>
          ))}
        </nav>
        <div style={{ borderRadius: 10, background: C.slate50, padding: "12px 14px", marginTop: 16 }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: C.slate500, margin: "0 0 4px" }}>Demo student</p>
          <p style={{ fontWeight: 700, color: C.slate950, fontSize: 14, margin: "0 0 2px" }}>{childName || "Student"}</p>
          <p style={{ fontSize: 12, color: C.slate500, margin: 0 }}>{yearGroup}</p>
          {diagResult && <p style={{ fontSize: 11, color: C.indigo, fontWeight: 600, margin: "6px 0 0" }}>✓ Live diagnostic complete</p>}
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "32px 40px", overflowY: "auto", maxHeight: "100vh" }}>
        <div style={{ maxWidth: 1000 }}>{renderScreen()}</div>
      </main>
    </div>
  );
}
