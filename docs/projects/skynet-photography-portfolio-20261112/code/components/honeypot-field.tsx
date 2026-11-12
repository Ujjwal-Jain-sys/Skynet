// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

/**
 * Hidden honeypot input for spam protection. Invisible to users and assistive
 * technology. A filled value signals a bot; the server silently discards it.
 */

export function HoneypotField({
  name = "honeypot",
  id = "honeypot-field",
}: {
  name?: string;
  id?: string;
}) {
  return (
    <input
      type="text"
      name={name}
      id={id}
      tabIndex={-1}
      aria-hidden="true"
      autoComplete="off"
      style={{
        position: "absolute",
        left: "-9999px",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
    />
  );
}
