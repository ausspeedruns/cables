import React, { useEffect, useMemo, useState } from "react";
import Layout from "@theme/Layout";

import styles from "./bump-in.module.scss";

type Task = {
	id: string;
	title: string;
	deps?: string[]; // task ids this depends on
	note?: string;
};

// Initial task graph for bump-in. Adjust freely to your event.
const TASKS: Task[] = [
	{ id: "venue-power", title: "Get power from venue" },
	{ id: "power", title: "Power: run boards and tape down", deps: ["venue-power"] },
	{ id: "tables", title: "Get 3 tables: runner, tech, host and chairs" },
	{ id: "table-cloths", title: "Put table cloths on runner and host tables", deps: ["tables"] },
	{ id: "internet", title: "Get internet access from venue" },
	{ id: "network", title: "Networking: connect switch + uplink", deps: ["internet", "rack-power"] },
	{ id: "rack", title: "Open and unpack rack" },
	{ id: "unpack-monitors", title: "Unpack and prepare monitors" },
	{ id: "unpack-pc", title: "Unpack PC, KB/Mouse and Mousepad" },
	{ id: "retrotink", title: "Unpack RetroTINK" },
	{ id: "setup-pcs", title: "Setup PCs", deps: ["tables", "power", "unpack-pc", "unpack-monitors"] },
	{ id: "rack-power", title: "Power up rack", deps: ["venue-power"] },
	{ id: "monitors", title: "Setup monitors", deps: ["tables", "power"] },
	{ id: "audio-place", title: "Place headsets and cable manage headsets", deps: ["tables"] },
	{ id: "capture-chain", title: "OREI/RetroTINK chain wired", deps: ["power", "rack", "monitors"] },
	{ id: "scenes", title: "OBS scenes verified", deps: ["rack", "capture-chain", "audio_wire", "network"] },
	{ id: "cams", title: "Cameras placed & framed", deps: ["monitors", "power"] },
	{ id: "lights", title: "Lights placed & set", deps: ["tables", "power"] },
	{ id: "preview", title: "Preview audio & video fine", deps: ["scenes", "cams"] },
	{ id: "runner-tablet", title: "Setup Runner Tablet", deps: ["network"] },
	{ id: "nodecg", title: "Setup NodeCG", deps: ["tech-pc"] },
	{ id: "tech-pc", title: "Setup Tech PC", deps: ["rack", "unpack-monitors", "network"] },
	{ id: "host-laptop", title: "Setup Host Laptop", deps: ["power", "network"] },
	{ id: "host-laptop-dashboard", title: "Open Host Dashboard", deps: ["nodecg", "host-laptop"] },
	{ id: "venue-speakers", title: "Speakers from venue" },
	{
		id: "test-headset-audio-speakers",
		title: "Test the headset audio is coming out of the speakers",
		deps: ["tech-pc", "audio-place", "venue-speakers"],
	},
	{
		id: "cable-management",
		title: "Clean up Cables once all is done",
		deps: ["test-headset-audio-speakers", "capture-chain"],
	},
];

type CheckedState = Record<string, boolean>;

const STORAGE_KEY = "bumpin-checklist-v1";

function usePersistentChecks(tasks: Task[]) {
	const [checked, setChecked] = useState<CheckedState>({});

	// Load from localStorage once on mount
	useEffect(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) setChecked(JSON.parse(raw));
		} catch {}
	}, []);

	// Persist whenever checks change
	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
		} catch {}
	}, [checked]);

	// Ensure keys exist for all tasks (helps with controlled checkboxes)
	useEffect(() => {
		setChecked((prev) => {
			const next = { ...prev } as CheckedState;
			for (const t of tasks) if (!(t.id in next)) next[t.id] = false;
			return next;
		});
	}, [tasks]);

	return { checked, setChecked } as const;
}

function BumpInChecklist() {
	const { checked, setChecked } = usePersistentChecks(TASKS);
	const [hideCompleted, setHideCompleted] = useState(true);
	const [showBlocked, setShowBlocked] = useState(false); // collapsed by default on mobile
	const [overrides, setOverrides] = useState<Record<string, boolean>>({});

	const done = useMemo(
		() =>
			new Set(
				Object.entries(checked)
					.filter(([, v]) => v)
					.map(([k]) => k)
			),
		[checked]
	);
	const taskMap = useMemo(() => Object.fromEntries(TASKS.map((t) => [t.id, t])), []);

	const missingDeps = (t: Task) => (t.deps ?? []).filter((d) => !done.has(d));
	const isBlocked = (t: Task) => missingDeps(t).length > 0;

	const readyTasks = TASKS.filter((t) => !isBlocked(t));
	const blockedTasks = TASKS.filter((t) => isBlocked(t));

	const visibleReady = hideCompleted ? readyTasks.filter((t) => !checked[t.id]) : readyTasks;
	const visibleBlocked = hideCompleted ? blockedTasks.filter((t) => !checked[t.id]) : blockedTasks;
	const completedTasks = TASKS.filter((t) => checked[t.id]);

	const toggle = (id: string) => {
		setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	const resetAll = () => {
		if (confirm("Clear all checkmarks?")) setChecked({});
	};

	const enableOverride = (id: string) => setOverrides((o) => ({ ...o, [id]: true }));
	const disableOverride = (id: string) => setOverrides((o) => ({ ...o, [id]: false }));

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<h1>Bump-in Checklist</h1>
				<div className={styles.controls}>
					<label className={styles.toggle}>
						<input type="checkbox" checked={hideCompleted} onChange={(e) => setHideCompleted(e.target.checked)} />
						Hide completed
					</label>
					<button className={styles.secondary} onClick={resetAll} aria-label="Reset all checkboxes">
						Reset
					</button>
				</div>
				<p className={styles.hint}>
					Items unlock as their dependencies are completed. You can still override a blocked item if needed.
				</p>
			</header>

			<section className={styles.section}>
				<h2>Ready now</h2>
				{visibleReady.length === 0 ? (
					<p className={styles.empty}>Nothing ready right now {hideCompleted ? "(or all done)" : ""}.</p>
				) : (
					<ul className={styles.list}>
						{visibleReady.map((t) => (
							<li key={t.id} className={styles.item}>
								<label className={styles.label}>
									<input type="checkbox" checked={!!checked[t.id]} onChange={() => toggle(t.id)} />
									<span className={styles.title}>{t.title}</span>
								</label>
								{t.note && <div className={styles.note}>{t.note}</div>}
								{/* {t.deps && t.deps.length > 0 && (
									<div className={styles.deps}>
										Depends on:{" "}
										{t.deps.map((d, i) => (
											<span key={d} className={done.has(d) ? styles.depDone : styles.dep}>
												{taskMap[d]?.title ?? d}
												{i < (t.deps?.length ?? 0) - 1 ? ", " : ""}
											</span>
										))}
									</div>
								)} */}
							</li>
						))}
					</ul>
				)}
			</section>

			<section className={styles.section}>
				<div className={styles.blockedHeader}>
					<h2>
						Blocked items
						<span className={styles.count}>({visibleBlocked.length})</span>
					</h2>
					<button className={styles.secondary} onClick={() => setShowBlocked((s) => !s)}>
						{showBlocked ? "Hide" : "Show"}
					</button>
				</div>
				{showBlocked &&
					(visibleBlocked.length === 0 ? (
						<p className={styles.empty}>No blocked items.</p>
					) : (
						<ul className={styles.list}>
							{visibleBlocked.map((t) => {
								const missing = missingDeps(t);
								const isOverridden = !!overrides[t.id];
								const disabled = missing.length > 0 && !isOverridden;
								return (
									<li key={t.id} className={styles.item}>
										<div className={styles.blockedRow}>
											<label className={styles.label + " " + styles.blocked}>
												<input
													type="checkbox"
													checked={!!checked[t.id]}
													disabled={disabled}
													onChange={() => toggle(t.id)}
													aria-disabled={disabled}
												/>
												<span className={styles.title}>{t.title}</span>
											</label>
											{disabled ? (
												<button className={styles.linkButton} onClick={() => enableOverride(t.id)}>
													Override to check
												</button>
											) : isOverridden ? (
												<button className={styles.linkButton} onClick={() => disableOverride(t.id)}>
													Remove override
												</button>
											) : null}
										</div>
										<div className={styles.blockedReason}>
											Waiting on:{" "}
											{missing.map((d, i) => (
												<span key={d} className={styles.dep}>
													{taskMap[d]?.title ?? d}
													{i < missing.length - 1 ? ", " : ""}
												</span>
											))}
										</div>
									</li>
								);
							})}
						</ul>
					))}
			</section>

			<section className={styles.section}>
				<div className={styles.blockedHeader}>
					<h2>
						Completed items
						<span className={styles.count}>({completedTasks.length})</span>
					</h2>
				</div>
				{completedTasks.length === 0 ? (
					<p className={styles.empty}>Nothing completed right now.</p>
				) : (
					<ul className={styles.list}>
						{completedTasks.map((t) => (
							<li key={t.id} className={[styles.item, styles.completed].join(" ")}>
								<label className={styles.label}>
									<input type="checkbox" checked={!!checked[t.id]} onChange={() => toggle(t.id)} />
									<span className={styles.title}>{t.title}</span>
								</label>
								{t.note && <div className={styles.note}>{t.note}</div>}
							</li>
						))}
					</ul>
				)}
			</section>
		</div>
	);
}

export default function BumpInPage() {
	return (
		<Layout title="Bump-in" description="Mobile-friendly bump-in checklist with dependencies">
			<main className={styles.main}>
				<BumpInChecklist />
			</main>
		</Layout>
	);
}
