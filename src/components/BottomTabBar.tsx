import { TABS_DEF, type TabId } from "@/data/trip";
import { Icon } from "@/lib/icons";

export function BottomTabBar({
  activeTab,
  onSelect,
}: {
  activeTab: TabId;
  onSelect: (id: TabId) => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(255,253,248,0.97)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-around", padding: "8px 4px 10px", overflowX: "auto" }}>
        {TABS_DEF.map((tb) => {
          const active = activeTab === tb.id;
          const color = active ? "var(--accent)" : "var(--fg3)";
          return (
            <button
              key={tb.id}
              onClick={() => onSelect(tb.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                padding: "4px 6px",
                borderRadius: 10,
                flexShrink: 0,
                color,
              }}
            >
              <Icon name={tb.icon} size={active ? 21 : 18} />
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 9,
                  letterSpacing: "0.04em",
                  color,
                  fontWeight: active ? 700 : 400,
                  whiteSpace: "nowrap",
                }}
              >
                {tb.label}
              </span>
              {active && <div style={{ width: 16, height: 2.5, background: "var(--primary)", borderRadius: 2 }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
