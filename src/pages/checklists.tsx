import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import styles from "./checklists.module.scss";

function Checklist({
	item,
	printOnly,
}: {
	item: ScheduleItem;
	printOnly?: boolean;
}) {
	return (
		<li className={printOnly ? styles["print-only-run-container"] : styles["run-container"]}>
			<h1>
				<img
					className={styles["print-only"]}
					src="/cables/img/AusSpeedruns-Logo.svg"
				/>
				<span>{item.game}</span>
			</h1>
			<ul className={styles["run-info"]}>
				<li>
					<span>Category:</span>
					<br />
					<span>{item.category}</span>
				</li>
				<li>
					Platform:
					<br />
					{abbreviateConsole(item.platform)}
					{item.techPlatform !== item.platform
						? ` (${abbreviateConsole(item.techPlatform)})`
						: null}
				</li>
				<li>
					Estimate:
					<br />
					{item.estimate}
				</li>
				<li>
					Race / Co-op:
					<br />
					{item.race ? "TRUE" : "FALSE"} / {item.coop ? "TRUE" : "FALSE"}
				</li>
			</ul>
			<h2>Runners</h2>
			<ol className={styles["run-runners"]}>
				{item.runners.map((runner) => (
					<li key={runner.id}>
						<input type="checkbox" />
						{runner.username}
					</li>
				))}
			</ol>
			<h2 className={styles["do-not-print"]}>Checklist</h2>
			<ul className={styles["run-checklist"]}>
				{Object.entries(ChecklistItems).map((check) => (
					<li key={check[0]}>
						<input type="checkbox" />
						{check[1]}
					</li>
				))}
				{(item.techPlatform === "PC" ||
					(item.techPlatform === "" && item.platform === "")) &&
					Object.entries(PCChecklistItems).map((check) => (
						<li key={check[0]}>
							<input type="checkbox" />
							{check[1]}
						</li>
					))}
			</ul>
			<div className={styles["run-notes"]}>
				<h3>Notes:</h3>
				<br />
				{item.specialRequirements
					.split("\n")
					.flatMap((val, idx, arr) =>
						idx === arr.length - 1 ? val : [val, <br key={idx} />]
					)}
			</div>
		</li>
	);
}

function Checklists() {
	const { siteConfig } = useDocusaurusContext();
	const { schedule }: { schedule?: ScheduleItem[] } = siteConfig.customFields;

	// Always have at least 2 pages extra worth of blank checklists.
	const extraBlanks = new Array(4 + ((schedule?.length ?? 0) % 2))
		.fill(0)
		.map((_, idx) => (
			<Checklist key={`blank-${idx}`} item={BlankChecklist} printOnly />
		));

	return (
		<ol className={styles["checklist-root"]}>
			{schedule?.map((item) => (
				<Checklist key={item.id} item={item} />
			))}
			{extraBlanks}
		</ol>
	);
}

export default function ChecklistsPage() {
	return (
		<Layout
			title={"Checklists"}
			description="Checklists for the current AusSpeedruns event"
		>
			<button onClick={window.print} className={styles["do-not-print"]}>
				Print
			</button>
			<Checklists />
			<main></main>
		</Layout>
	);
}

export type ScheduleItem = {
	id: string;
	game: string;
	category: string;
	platform: string;
	race: boolean;
	coop: boolean;
	estimate: string;
	scheduledTime: string;
	runners: Runner[];
	techPlatform: string;
	specialRequirements: string;
};

export type Runner = {
	id: string;
	username: string;
	pronouns: string;
	twitch: string;
};

function abbreviateConsole(platform: string) {
	switch (platform.toLowerCase()) {
		case "playstation 1":
		case "playstation1":
			return "PS1";
		case "playstation 2":
		case "playstation2":
			return "PS2";
		case "playstation 3":
		case "playstation3":
			return "PS3";
		case "playstation 4":
		case "playstation4":
			return "PS4";
		case "playstation 5":
		case "playstation5":
			return "PS5";
		case "xbox 360":
			return "X360";
		case "nintendo snes":
		case "super nintendo":
		case "super nintendo entertainment system":
			return "SNES";
		case "nintendo entertainment system":
		case "nintendo nes":
			return "NES";
		case "nintendo nes classic":
			return "NES Classic";
		case "nintendo switch":
			return "Switch";
		case "xbox series s":
			return "Series S";
		case "xbox series x":
			return "Series X";
		case "nintendo gamecube":
			return "GameCube";
		case "nintendo game boy advance":
		case "game boy advance":
		case "gb advance":
			return "GBA";
		case "nintendo game boy":
			return "Game Boy";
		case "nintendo game boy color":
		case "nintendo game boy colour":
		case "game boy color":
		case "game boy colour":
		case "gb color":
		case "gb colour":
			return "GBC";
		case "nintendo gamecube game boy player":
			return "Game Boy Player";
		case "arcade pcb":
			return "Arcade";
		case "sega saturn":
			return "Saturn";
		case "nintendo wiiu":
			return "WiiU";
	}
	return platform;
}

const ChecklistItems = {
	//runnersPresent: "Runners Present",
	wipeDownHeadsets: "Wipe Down Headsets",
	audioReady: "Audio Ready",
	checkRunnerInfo: "Check Runner Info/Pronouns/Positions",
	checkCameras: "Check Cameras",
	beCool: "Be Super Cool",
} as const;

const PCChecklistItems = {
	steamOverlayOff: "Steam/Launcher Overlay Off",
} as const;

const BlankChecklist: ScheduleItem = {
	id: "",
	game: " ",
	category: "",
	platform: "",
	race: false,
	coop: false,
	estimate: "",
	scheduledTime: "",
	runners: [
		{
			id: "",
			username: "Runner 1",
			pronouns: "",
			twitch: "",
		},
		{
			id: "",
			username: "Runner 2",
			pronouns: "",
			twitch: "",
		},
		{
			id: "",
			username: "Runner 3",
			pronouns: "",
			twitch: "",
		},
		{
			id: "",
			username: "Runner 4",
			pronouns: "",
			twitch: "",
		},
	],
	techPlatform: "",
	specialRequirements: "",
};
