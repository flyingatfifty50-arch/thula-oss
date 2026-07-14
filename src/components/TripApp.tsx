"use client";

import { useState } from "react";
import { CONFIRMATIONS, runFakeConcierge, type TabId } from "@/data/trip";
import { BottomTabBar } from "@/components/BottomTabBar";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { FlightsScreen } from "@/components/screens/FlightsScreen";
import { HotelsScreen } from "@/components/screens/HotelsScreen";
import { TransfersScreen } from "@/components/screens/TransfersScreen";
import { ItineraryScreen } from "@/components/screens/ItineraryScreen";
import { TipsScreen } from "@/components/screens/TipsScreen";
import { EmergencyScreen } from "@/components/screens/EmergencyScreen";
import { ConciergeScreen } from "@/components/screens/ConciergeScreen";

type ChatMessage = { from: "user" | "assistant"; text: string };

export function TripApp() {
  const [tab, setTab] = useState<TabId>("home");
  const [transferOpen, setTransferOpen] = useState<number | null>(null);
  const [itinOpen, setItinOpen] = useState<number | null>(null);
  const [packOpen, setPackOpen] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [modalKey, setModalKey] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      from: "assistant",
      text: "Hi! I'm your Thula concierge — ask me anything while you're away: restaurants, safety, what to pack for tomorrow, whatever comes up.",
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);

  function toggleCheck(key: string) {
    setChecked((c) => ({ ...c, [key]: !c[key] }));
  }

  function copy(text: string, key: string) {
    if (navigator.clipboard) navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1800);
  }

  function sendPrompt(text: string) {
    setChatMessages((m) => [...m, { from: "user", text }]);
    setIsThinking(true);
    setTimeout(() => {
      setChatMessages((m) => [...m, { from: "assistant", text: runFakeConcierge(text) }]);
      setIsThinking(false);
    }, 900);
  }

  const activeConfirmation = modalKey ? CONFIRMATIONS[modalKey] : null;

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "0 auto",
        minHeight: "100vh",
        background: "var(--paper)",
        position: "relative",
        fontFamily: "var(--font-serif)",
        boxShadow: "0 0 60px rgba(30,36,28,0.12)",
      }}
    >
      <div style={{ height: "100vh", overflowY: "auto", paddingBottom: 84 }}>
        {tab === "home" && <HomeScreen onNavigate={setTab} />}
        {tab === "flights" && <FlightsScreen />}
        {tab === "hotels" && <HotelsScreen onOpenModal={setModalKey} />}
        {tab === "transfers" && (
          <TransfersScreen openIndex={transferOpen} onToggle={(i) => setTransferOpen((o) => (o === i ? null : i))} onOpenModal={setModalKey} />
        )}
        {tab === "itinerary" && (
          <ItineraryScreen openIndex={itinOpen} onToggle={(i) => setItinOpen((o) => (o === i ? null : i))} />
        )}
        {tab === "concierge" && <ConciergeScreen messages={chatMessages} isThinking={isThinking} onSendPrompt={sendPrompt} />}
        {tab === "tips" && (
          <TipsScreen
            packOpen={packOpen}
            onTogglePack={() => setPackOpen((o) => !o)}
            checked={checked}
            onToggleCheck={toggleCheck}
            onResetPacking={() => setChecked({})}
          />
        )}
        {tab === "emergency" && <EmergencyScreen copiedKey={copiedKey} onCopy={copy} />}
      </div>

      <BottomTabBar activeTab={tab} onSelect={setTab} />

      {activeConfirmation && <ConfirmationModal confirmation={activeConfirmation} onClose={() => setModalKey(null)} />}
    </div>
  );
}
