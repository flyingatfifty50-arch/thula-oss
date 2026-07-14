import { TIPS_DATA, PACKING_DATA } from "@/data/trip";
import { Icon } from "@/lib/icons";

export function TipsScreen({
  packOpen,
  onTogglePack,
  checked,
  onToggleCheck,
  onResetPacking,
}: {
  packOpen: boolean;
  onTogglePack: () => void;
  checked: Record<string, boolean>;
  onToggleCheck: (key: string) => void;
  onResetPacking: () => void;
}) {
  return (
    <div>
      <div style={{ padding: "26px 20px 0" }}>
        <p style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 4px" }}>
          From us to you
        </p>
        <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 26, color: "var(--fg1)", margin: "0 0 18px", lineHeight: 1.1 }}>Thula tips</h2>
      </div>

      <div style={{ padding: "0 20px 4px" }}>
        {TIPS_DATA.map((t, i) => (
          <div
            key={i}
            style={{
              background: "var(--card)",
              borderRadius: "var(--r-md)",
              border: "1px solid var(--line)",
              padding: "13px 15px",
              marginBottom: 9,
              display: "flex",
              gap: 12,
              position: "relative",
              overflow: "hidden",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: t.color, opacity: 0.5 }} />
            <div style={{ color: t.color, flexShrink: 0 }}>
              <Icon name={t.icon} size={21} />
            </div>
            <div>
              <h4 style={{ fontWeight: 700, fontSize: 14, color: "var(--fg1)", margin: "0 0 4px" }}>{t.title}</h4>
              <p style={{ fontSize: 13, color: "var(--fg2)", margin: 0, lineHeight: 1.6 }}>{t.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "8px 20px 28px" }}>
        <button
          onClick={onTogglePack}
          style={{
            width: "100%",
            background: "var(--accent)",
            color: "var(--fg-on-dark)",
            border: "none",
            borderRadius: "var(--r-md)",
            padding: "14px 18px",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="luggage" size={19} /> Packing list
          </span>
          <span style={{ fontSize: 18, transform: packOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>&rsaquo;</span>
        </button>

        {packOpen && (
          <div style={{ background: "var(--card)", borderRadius: "0 0 var(--r-md) var(--r-md)", border: "1px solid var(--line)", borderTop: "none", padding: 16 }}>
            {PACKING_DATA.map((cat) => (
              <div key={cat.name} style={{ marginBottom: 18 }}>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: cat.color,
                    margin: "0 0 8px",
                    borderBottom: "2px solid var(--secondary)",
                    paddingBottom: 4,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Icon name={cat.icon} size={15} />
                  {cat.name}
                </p>
                {cat.items.map((item, j) => {
                  const key = `${cat.name}-${j}`;
                  const isChecked = !!checked[key];
                  return (
                    <div
                      key={key}
                      onClick={() => onToggleCheck(key)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "7px 0",
                        borderBottom: "1px solid var(--line-soft)",
                        fontSize: 13,
                        color: isChecked ? "var(--fg3)" : "var(--fg1)",
                        cursor: "pointer",
                        textDecoration: isChecked ? "line-through" : "none",
                      }}
                    >
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          border: `1.5px solid ${isChecked ? cat.color : "var(--sage-300)"}`,
                          borderRadius: 5,
                          flexShrink: 0,
                          background: isChecked ? cat.color : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {isChecked && <span style={{ fontSize: 11, color: "var(--fg-on-clay)" }}>&#10003;</span>}
                      </div>
                      {item}
                    </div>
                  );
                })}
              </div>
            ))}
            <button
              onClick={onResetPacking}
              style={{ width: "100%", marginTop: 6, background: "transparent", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", padding: 9, fontSize: 12, color: "var(--fg3)", cursor: "pointer" }}
            >
              Reset all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
