import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ShieldCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Lock,
  Server,
  AlertTriangle,
  Bot,
  Sparkles,
} from 'lucide-react';
import { ChamferCard } from '../common/ChamferCard';
import { CtaButton } from '../common/CtaButton';

interface SimulationPhase {
  id: number;
  label: string;
  startTime: number; // in seconds
  endTime: number;
  legacyStatus: string;
  legacyDetail: string;
  legacyBadge: string;
  nivaStatus: string;
  nivaDetail: string;
  nivaBadge: string;
}

const PHASES: SimulationPhase[] = [
  {
    id: 1,
    label: '01. Trigger & Prompting',
    startTime: 0.0,
    endTime: 3.8,
    legacyStatus: 'Manual Prompt Crafting & Upload',
    legacyDetail:
      'User manually formulates multi-paragraph instructions, pastes sensitive internal logs, and submits to cloud API endpoint.',
    legacyBadge: 'Friction: High (3,800ms)',
    nivaStatus: 'Instant Natural Voice / Context Trigger',
    nivaDetail:
      'Proactive acoustic parsing via "NIVA, compile security dossier" or OS global hotkey. Intent parsed locally under 40ms.',
    nivaBadge: 'Zero Latency (< 40ms)',
  },
  {
    id: 2,
    label: '02. Data Processing & Enclave',
    startTime: 3.8,
    endTime: 7.5,
    legacyStatus: 'Cloud Ingestion & Unencrypted Transit',
    legacyDetail:
      'Unencrypted payload traverses external WAN into public cloud data center. Vulnerable to interception, model training leakage.',
    legacyBadge: 'Privacy: Exfiltration Risk',
    nivaStatus: 'Zero-Knowledge Cryptographic Enclave',
    nivaDetail:
      'Isolated local sandbox verified via zero-knowledge proofs. Confidential memory allocation; zero bytes leave user host.',
    nivaBadge: '100% Local Sovereignty',
  },
  {
    id: 3,
    label: '03. Execution & Action',
    startTime: 7.5,
    endTime: 12.0,
    legacyStatus: 'Disconnected Token Output (Text Only)',
    legacyDetail:
      'Generic text response generated. Chatbot cannot access file system or email client; user must manually copy, reformat & attach.',
    legacyBadge: 'OS Access: None',
    nivaStatus: 'Native OS Workflow Orchestration',
    nivaDetail:
      'Full operating system integration: compiles PDF audit dossier, signs cryptographically, and delegates delivery via Digital Twin.',
    nivaBadge: 'Direct OS Action',
  },
  {
    id: 4,
    label: '04. Final Resolution',
    startTime: 12.0,
    endTime: 16.5,
    legacyStatus: 'Manual Completion with High Friction',
    legacyDetail:
      'Task completed after 14.8 seconds of manual labor. Residual prompt data remains logged in third-party cloud data repository.',
    legacyBadge: 'Total Time: 14.8s (Risky)',
    nivaStatus: 'Task Complete Autonomously in 2.4s',
    nivaDetail:
      'Workflow dispatched and verified in 2.4 seconds. Audit trail written to sovereign tamper-proof log with zero data exposure.',
    nivaBadge: 'Dispatched in 2.4s (Sovereign)',
  },
];

export const SaferFasterSection: React.FC = () => {
  const TOTAL_DURATION = 16.5; // Synchronized 16.5-second comparison
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [activePhaseIdx, setActivePhaseIdx] = useState<number>(0);

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Synchronized 16.5s animation loop using requestAnimationFrame
  useEffect(() => {
    const updateProgress = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      const delta = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      if (isPlaying) {
        setCurrentTime((prev) => {
          const next = prev + delta * playbackSpeed;
          if (next >= TOTAL_DURATION) {
            return 0; // Seamless loop
          }
          return next;
        });
      }

      requestRef.current = requestAnimationFrame(updateProgress);
    };

    requestRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying, playbackSpeed]);

  // Sync active phase with current timestamp
  useEffect(() => {
    const foundIdx = PHASES.findIndex(
      (p) => currentTime >= p.startTime && currentTime < p.endTime
    );
    if (foundIdx !== -1 && foundIdx !== activePhaseIdx) {
      setActivePhaseIdx(foundIdx);
    }
  }, [currentTime, activePhaseIdx]);

  // Legacy progress: fills continuously up to 14.8s (90% width)
  const legacyElapsed = Math.min(currentTime, 14.8);
  const legacyPercent = Math.min(100, (legacyElapsed / 14.8) * 100);

  // NIVA progress: completes fast at 2.4s, then stays 100% green
  const nivaElapsed = Math.min(currentTime, 2.4);
  const nivaPercent = Math.min(100, (nivaElapsed / 2.4) * 100);
  const isNivaDone = currentTime >= 2.4;

  const currentPhase = PHASES[activePhaseIdx] || PHASES[0];

  const handleSeek = (phaseIdx: number) => {
    setActivePhaseIdx(phaseIdx);
    setCurrentTime(PHASES[phaseIdx].startTime);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
    lastTimeRef.current = null;
  };

  const handleReset = () => {
    setCurrentTime(0);
    setActivePhaseIdx(0);
    lastTimeRef.current = null;
  };

  return (
    <section
      id="safer-faster"
      data-saferfaster=""
      className="SaferFasterSection relative py-28 md:py-36 border-y border-white/[0.08] bg-cyber-surface-0 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mb-12 md:mb-16">
          <div className="Caption inline-flex items-center gap-2 mb-3">
            <span className="decoration">/ </span>
            <span>The Experience — Comparative State Race</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.05]">
            Smarter, safer, and truly autonomous.{' '}
            <strong className="text-cyber-primary font-inherit">
              Experience NIVA.
            </strong>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-cyber-text-secondary font-mono leading-relaxed max-w-3xl">
            Legacy chatbots require manual prompt crafting, lack system access, and upload sensitive enterprise data to
            third-party clouds. Cybergenix NIVA integrates directly into your operating system to execute workflows
            instantly and securely.
          </p>
        </div>

        {/* Master Synchronized 16.5s Controller Bar */}
        <div className="mb-10 p-5 rounded-2xl bg-cyber-surface-1 border border-white/[0.12] backdrop-blur-card">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="w-9 h-9 rounded-lg bg-cyber-primary text-white flex items-center justify-center hover:bg-cyber-primary-hover shadow-glow-primary transition-colors cursor-pointer"
                aria-label={isPlaying ? 'Pause comparison race' : 'Play comparison race'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.1] text-cyber-text-primary hover:text-white hover:bg-white/[0.1] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Restart race simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/[0.08]">
                <Clock className="w-3.5 h-3.5 text-cyber-primary" />
                <span className="text-white font-bold tracking-wider">
                  {currentTime.toFixed(1)}s
                </span>
                <span className="text-cyber-text-muted">/ 16.5s cycle</span>
              </div>
            </div>

            {/* Interactive Phase Jump Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-cyber-text-muted hidden lg:inline">Inspect Phase:</span>
              {PHASES.map((phase, idx) => (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => handleSeek(idx)}
                  className={`px-3 py-1.5 rounded-md font-mono text-xs transition-all cursor-pointer ${
                    activePhaseIdx === idx
                      ? 'bg-cyber-primary text-white shadow-glow-primary font-bold'
                      : 'bg-white/[0.04] text-cyber-text-secondary hover:text-white border border-white/[0.06]'
                  }`}
                >
                  {phase.label}
                </button>
              ))}

              {/* Speed multiplier toggle */}
              <div className="flex items-center rounded-lg bg-black/40 border border-white/[0.08] p-0.5 ml-2">
                {[1, 2].map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-1 text-[1.1rem] font-bold rounded transition-colors ${
                      playbackSpeed === spd
                        ? 'bg-cyber-primary/40 text-cyber-primary'
                        : 'text-cyber-text-muted hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Master Synchronized Progress Track */}
          <div className="relative w-full h-2 rounded-full bg-white/[0.08] overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-red-500 via-amber-500 to-emerald-400 transition-all duration-100"
              style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
            />
          </div>
        </div>

        {/* Side-by-Side Comparative Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ============================================================ */}
          {/* LEFT CARD: Traditional AI Chatbot (Friction, Cloud Leak)     */}
          {/* ============================================================ */}
          <ChamferCard
            chamfer="lg"
            surface="surface-1"
            className="p-8 border-red-500/30 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top red header badge */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs uppercase tracking-wider font-semibold">
                  <Bot className="w-3.5 h-3.5" />
                  <span>The Old Way: Traditional AI Chatbot</span>
                </span>
                <span className="font-mono text-xs text-red-400/80 font-bold">
                  {legacyElapsed.toFixed(1)}s elapsed
                </span>
              </div>

              <h3 className="font-display text-2xl font-semibold text-white mb-2">
                Manual Prompt Engineering &amp; Exfiltration
              </h3>

              <p className="text-sm font-mono text-cyber-text-secondary leading-relaxed mb-6">
                Generic cloud models operate in isolated browser tabs, require multi-step prompt writing, lack OS control,
                and transmit proprietary enterprise data to external vendor clusters.
              </p>

              {/* Dynamic Phase Status Display */}
              <div className="p-4 rounded-xl bg-black/60 border border-red-500/20 mb-6 font-mono">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-red-400 font-semibold uppercase flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Current Bottleneck</span>
                  </span>
                  <span className="text-[1.1rem] px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                    {currentPhase.legacyBadge}
                  </span>
                </div>
                <div className="text-sm font-medium text-white mb-1">
                  {currentPhase.legacyStatus}
                </div>
                <div className="text-xs text-cyber-text-secondary leading-relaxed">
                  {currentPhase.legacyDetail}
                </div>
              </div>

              {/* Simulated Chatbot Terminal Interaction */}
              <div className="rounded-xl border border-white/[0.08] bg-black/80 p-4 font-mono text-xs space-y-3 mb-6">
                <div className="flex items-center justify-between text-cyber-text-muted border-b border-white/[0.08] pb-2">
                  <span className="flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-red-400" />
                    <span>cloud-llm-api-v1.internal (Remote)</span>
                  </span>
                  <span className="text-red-400">UNENCRYPTED REST</span>
                </div>

                <div className="space-y-2 text-cyber-text-secondary">
                  <div className="p-2 rounded bg-white/[0.03] border border-white/[0.04]">
                    <span className="text-cyber-text-muted">&gt; Prompt: </span>
                    <span className="text-neutral-300">
                      "Summarize compliance audit, format PDF, email to executive board..."
                    </span>
                  </div>

                  <div className="p-2 rounded bg-red-950/20 border border-red-500/20 text-red-300 flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Context Failure: No Native OS Access</div>
                      <div className="text-[1.1rem] text-red-400/80">
                        Chatbot cannot access local filesystem or dispatch emails directly. User must copy output manually.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Liabilities Checklist */}
              <ul className="space-y-2.5 font-mono text-xs text-cyber-text-secondary mb-6">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>14+ seconds of high manual context switching and prompt formatting</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Confidential corporate IP uploaded unencrypted to third-party clouds</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Zero execution capability across native apps or operating system workflows</span>
                </li>
              </ul>
            </div>

            {/* Left Timeline Progress Bar */}
            <div className="pt-4 border-t border-white/[0.08]">
              <div className="flex items-center justify-between font-mono text-xs mb-2">
                <span className="text-cyber-text-muted">Legacy Task Completion:</span>
                <span className="text-red-400 font-bold">
                  {legacyElapsed >= 14.8 ? '14.8s (Delayed & Fragile)' : `${legacyElapsed.toFixed(1)}s in progress...`}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all duration-100"
                  style={{ width: `${legacyPercent}%` }}
                />
              </div>
              <div className="mt-3 text-[1.1rem] font-mono text-red-400/70 text-right">
                Result: Severe security liability &amp; 6x longer execution time.
              </div>
            </div>
          </ChamferCard>

          {/* ============================================================ */}
          {/* RIGHT CARD: Cybergenix NIVA Assistant (Instant, Sovereign)   */}
          {/* ============================================================ */}
          <ChamferCard
            chamfer="lg"
            surface="glass"
            glow="orange"
            className="p-8 border-emerald-500/40 shadow-glow-primary flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top emerald header badge */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-cyber-primary" />
                  <span>With Cybergenix NIVA: Autonomous System Assistant</span>
                </span>
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  {isNivaDone ? 'COMPLETED (2.4s)' : `${nivaElapsed.toFixed(1)}s executing...`}
                </span>
              </div>

              <h3 className="font-display text-2xl font-semibold text-white mb-2">
                Instant Voice, Zero-Knowledge &amp; Local Action
              </h3>

              <p className="text-sm font-mono text-cyber-text-secondary leading-relaxed mb-6">
                Direct operating system integration executing multi-application workflows instantly via natural voice and
                proactive context, backed by hardware-isolated zero-knowledge security.
              </p>

              {/* Dynamic Phase Status Display */}
              <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/30 mb-6 font-mono">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-emerald-400 font-semibold uppercase flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Autonomous Enclave State</span>
                  </span>
                  <span className="text-[1.1rem] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    {currentPhase.nivaBadge}
                  </span>
                </div>
                <div className="text-sm font-medium text-white mb-1">
                  {currentPhase.nivaStatus}
                </div>
                <div className="text-xs text-cyber-text-secondary leading-relaxed">
                  {currentPhase.nivaDetail}
                </div>
              </div>

              {/* Simulated NIVA Enclave Terminal */}
              <div className="rounded-xl border border-white/[0.08] bg-black/80 p-4 font-mono text-xs space-y-3 mb-6">
                <div className="flex items-center justify-between text-cyber-text-muted border-b border-white/[0.08] pb-2">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-cyber-primary" />
                    <span>niva.local-enclave (Device Enclave)</span>
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    ZERO-KNOWLEDGE
                  </span>
                </div>

                <div className="space-y-2 text-cyber-text-secondary">
                  <div className="p-2 rounded bg-white/[0.03] border border-white/[0.04] flex items-center justify-between">
                    <span className="text-white">
                      &gt; Voice: "NIVA, prepare compliance dossier &amp; notify board"
                    </span>
                    <span className="text-cyber-primary text-[1.0rem]">40ms</span>
                  </div>

                  <div className="p-2 rounded bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Autonomous OS Action Complete (2.4s)</div>
                      <div className="text-[1.1rem] text-emerald-400/80">
                        Generated encrypted PDF dossier, attached audit hash, dispatched via Digital Twin agent.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Benefits Checklist */}
              <ul className="space-y-2.5 font-mono text-xs text-cyber-text-secondary mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Sub-3 second execution via contextual intent &amp; proactive system triggers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>100% Zero-Knowledge cryptographic privacy — data never leaves client device</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Autonomous Digital Twin handles cross-app delegation and meeting follow-ups</span>
                </li>
              </ul>
            </div>

            {/* Right Timeline Progress Bar */}
            <div className="pt-4 border-t border-white/[0.08]">
              <div className="flex items-center justify-between font-mono text-xs mb-2">
                <span className="text-cyber-text-muted">Cybergenix NIVA Completion:</span>
                <span className="text-emerald-400 font-bold">
                  {isNivaDone ? 'Completed in 2.4s (6x Faster)' : `${nivaElapsed.toFixed(1)}s executing...`}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyber-primary to-emerald-400 transition-all duration-100"
                  style={{ width: `${nivaPercent}%` }}
                />
              </div>
              <div className="mt-3 text-[1.1rem] font-mono text-emerald-400/90 text-right font-semibold">
                Result: Flawless autonomy with military-grade privacy.
              </div>
            </div>
          </ChamferCard>
        </div>

        {/* Bottom CTA Row */}
        <div className="mt-12 text-center">
          <p className="text-sm font-mono text-cyber-text-muted mb-5">
            Ready to eliminate AI friction and secure your enterprise workflows?
          </p>
          <div className="inline-flex flex-wrap items-center justify-center gap-4">
            <CtaButton href="#schedule-a-meeting" variant="primary" size="default">
              Request NIVA Live Demo
            </CtaButton>
            <CtaButton href="#capabilities" variant="transparent" size="default">
              Explore All 6 Capabilities
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaferFasterSection;
