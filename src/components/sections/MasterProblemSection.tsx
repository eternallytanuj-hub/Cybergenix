import React, { useEffect, useState, useRef } from 'react';
import {
  AlertTriangle,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Lock,
  RefreshCw,
  Server,
} from 'lucide-react';

export const MasterProblemSection: React.FC = () => {
  // Simulation typing state
  const [typedEmail, setTypedEmail] = useState<string>('');
  const [typedPassword, setTypedPassword] = useState<string>('');
  const [step, setStep] = useState<'email' | 'password' | 'breached' | 'shielded'>('email');
  const [isShieldActive, setIsShieldActive] = useState<boolean>(true);

  const fullEmail = 'chief.security@enterprise-corp.com';
  const fullPasswordBullets = '••••••••••••••••';

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Live typing simulation loop
  useEffect(() => {
    let emailIdx = 0;
    let passIdx = 0;
    let currentStep: 'email' | 'password' | 'breached' | 'shielded' = 'email';

    const runSimulation = () => {
      // Step 1: Type email character by character
      if (currentStep === 'email') {
        if (emailIdx < fullEmail.length) {
          setTypedEmail(fullEmail.slice(0, emailIdx + 1));
          emailIdx++;
          timerRef.current = setTimeout(runSimulation, 45);
        } else {
          currentStep = 'password';
          setStep('password');
          timerRef.current = setTimeout(runSimulation, 300);
        }
      }
      // Step 2: Type password dots
      else if (currentStep === 'password') {
        if (passIdx < fullPasswordBullets.length) {
          setTypedPassword(fullPasswordBullets.slice(0, passIdx + 1));
          passIdx++;
          timerRef.current = setTimeout(runSimulation, 70);
        } else {
          currentStep = 'breached';
          setStep('breached');
          timerRef.current = setTimeout(runSimulation, 1200);
        }
      }
      // Step 3: Trigger exfiltration alert, then shield
      else if (currentStep === 'breached') {
        currentStep = 'shielded';
        setStep('shielded');
        timerRef.current = setTimeout(runSimulation, 2400);
      }
      // Step 4: Reset loop
      else if (currentStep === 'shielded') {
        emailIdx = 0;
        passIdx = 0;
        setTypedEmail('');
        setTypedPassword('');
        currentStep = 'email';
        setStep('email');
        timerRef.current = setTimeout(runSimulation, 800);
      }
    };

    timerRef.current = setTimeout(runSimulation, 100);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleManualReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setTypedEmail('');
    setTypedPassword('');
    setStep('email');
  };

  return (
    <section
      id="master-problem"
      data-masterproblem=""
      className="MasterProblemSection relative py-24 md:py-32 border-y border-white/[0.08] bg-cyber-surface-0 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyber-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column: Context & Architectural Rationale */}
        <div>
          <div className="Caption inline-flex items-center gap-2 mb-3">
            <span className="decoration">/ </span>
            <span className="text-cyber-threat">The Core Vulnerability</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.05]">
            Centralized AI models are the biggest{' '}
            <strong className="text-cyber-threat font-inherit">data privacy risk</strong>{' '}
            in modern technology.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-cyber-text-secondary font-mono leading-relaxed">
            Traditional AI platforms upload every prompt, source code repository, and customer record to external cloud
            data centers. One training leak or server intrusion, and your enterprise crown jewels are compromised.
          </p>

          <p className="mt-4 text-sm font-mono text-cyber-text-muted leading-relaxed">
            Cybergenix's answer: don't centralize intelligence. Decentralize and encrypt it with verifiable zero-knowledge proofs.
          </p>

          {/* Key Vulnerability vs Cybergenix Comparison Points */}
          <div className="mt-8 space-y-4 font-mono text-xs sm:text-sm">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-500/[0.06] border border-red-500/20">
              <ShieldAlert className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-red-300">Centralized Cloud AI Liability:</span>{' '}
                <span className="text-cyber-text-secondary">
                  Prompts, tokens, and corporate credentials stored in plaintext across foreign multi-tenant clusters.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-300">Cybergenix Zero-Knowledge Shield:</span>{' '}
                <span className="text-cyber-text-secondary">
                  Decentralized cryptographic enclaves. Client keys never leave local host hardware. Zero plaintext leaks.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Terminal Typing Credential Compromise Simulation */}
        <div className="w-full">
          <div className="rounded-2xl border border-white/[0.12] bg-cyber-surface-1/95 backdrop-blur-heavy shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
            {/* Terminal Window Chrome */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] bg-black/70">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                <span className="ml-3 text-xs text-cyber-text-muted hidden sm:inline-block">
                  https://generic-cloud-llm.com/api/v1/auth
                </span>
              </div>

              {/* Required Trigger Badge #mp-captured */}
              <div className="flex items-center gap-2">
                <span
                  id="mp-captured"
                  data-alert=""
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
                    step === 'breached'
                      ? 'bg-red-500/20 border border-red-500 text-red-400 animate-pulse shadow-[0_0_15px_rgba(235,66,66,0.5)]'
                      : step === 'shielded'
                      ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'bg-white/[0.05] border border-white/[0.1] text-cyber-text-muted'
                  }`}
                >
                  {step === 'breached' ? (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                      <span>⚠ DATA EXFILTRATION DETECTED</span>
                    </>
                  ) : step === 'shielded' ? (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>SHIELD ACTIVE: 0 BYTES LEAKED</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-cyber-text-muted" />
                      <span>MONITORING STREAM...</span>
                    </>
                  )}
                </span>

                <button
                  type="button"
                  onClick={handleManualReset}
                  title="Restart Simulation"
                  className="p-1 rounded text-cyber-text-muted hover:text-white hover:bg-white/[0.08] transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 sm:p-7 space-y-5 bg-gradient-to-b from-black/60 to-black/90">
              {/* Simulated Phishing / Cloud LLM Input Fields */}
              <div className="space-y-4">
                {/* Field 1: User Identity / Email */}
                <div>
                  <label className="block text-xs uppercase text-cyber-text-muted mb-1.5">
                    User Credential / Enterprise SSO:
                  </label>
                  <div className="flex items-center px-4 py-2.5 rounded-lg bg-cyber-surface-2 border border-white/[0.1] text-white">
                    <span className="flex-1 font-mono tracking-wide text-xs sm:text-sm">
                      {typedEmail}
                      {step === 'email' && (
                        <span className="inline-block w-2 h-4 bg-cyber-primary ml-0.5 animate-pulse align-middle" />
                      )}
                    </span>
                    <Server className="w-4 h-4 text-cyber-text-muted" />
                  </div>
                </div>

                {/* Field 2: Sensitive Auth Secret / Private Key */}
                <div>
                  <label className="block text-xs uppercase text-cyber-text-muted mb-1.5">
                    Internal Authentication Token / Password:
                  </label>
                  <div className="flex items-center px-4 py-2.5 rounded-lg bg-cyber-surface-2 border border-white/[0.1] text-white">
                    <span className="flex-1 font-mono tracking-widest text-xs sm:text-sm text-cyber-primary">
                      {typedPassword}
                      {step === 'password' && (
                        <span className="inline-block w-2 h-4 bg-cyber-threat ml-0.5 animate-pulse align-middle" />
                      )}
                    </span>
                    <Lock className="w-4 h-4 text-cyber-text-muted" />
                  </div>
                </div>
              </div>

              {/* Dynamic Console Telemetry Logs */}
              <div className="pt-3 border-t border-white/[0.08] space-y-2 text-xs">
                <div className="text-cyber-text-muted flex items-center justify-between">
                  <span>TELEMETRY STREAM:</span>
                  <span className="text-[1.0rem] text-cyber-text-dim">TLS 1.3 / INSPECTOR</span>
                </div>

                {step === 'email' && (
                  <p className="text-cyber-text-secondary animate-fade-in">
                    &gt; User entering sensitive executive credentials into cloud portal...
                  </p>
                )}

                {step === 'password' && (
                  <p className="text-cyber-caution animate-fade-in">
                    &gt; Target keystroke capture in progress. Token buffer populated...
                  </p>
                )}

                {step === 'breached' && (
                  <div className="space-y-1.5 animate-fade-in">
                    <p className="text-red-400 font-bold">
                      [CRITICAL VULNERABILITY] Credential payload exfiltrated to external cloud endpoint!
                    </p>
                    <p className="text-red-400/80 text-[1.1rem]">
                      Plaintext password tokens intercepted by unverified intermediate proxy node.
                    </p>
                  </div>
                )}

                {step === 'shielded' && (
                  <div className="space-y-1.5 animate-fade-in">
                    <p className="text-emerald-400 font-bold">
                      [CYBERGENIX ZERO-KNOWLEDGE SHIELD INTERCEPT]
                    </p>
                    <p className="text-cyber-text-secondary text-[1.1rem]">
                      Zero-Knowledge cryptographic isolation blocked transmission. Secret never left host memory enclave.
                    </p>
                  </div>
                )}
              </div>

              {/* Interactive Simulation Controls */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-cyber-text-muted">
                  <span className="w-2 h-2 rounded-full bg-cyber-primary animate-ping" />
                  <span>Interactive Live Vulnerability Simulation</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsShieldActive(!isShieldActive)}
                  className={`px-3 py-1.5 rounded font-mono text-xs transition-colors flex items-center gap-1.5 ${
                    isShieldActive
                      ? 'bg-cyber-primary/20 text-cyber-primary border border-cyber-primary/40'
                      : 'bg-white/[0.05] text-cyber-text-muted border border-white/[0.1]'
                  }`}
                >
                  <Shield className="w-3 h-3" />
                  <span>ZK Shield: {isShieldActive ? 'ENFORCED' : 'BYPASSED'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MasterProblemSection;
