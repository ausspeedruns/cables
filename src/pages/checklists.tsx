import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { format } from "date-fns";

import styles from "./checklists.module.scss";
import BrowserOnly from "@docusaurus/BrowserOnly";

function Checklist({ item, printOnly }: { item: ScheduleItem; printOnly?: boolean }) {
	return (
		<li className={printOnly ? styles["print-only-run-container"] : styles["run-container"]}>
			<h1 className={styles["run-title"]}>
				<img className={styles["print-only"]} src="/cables/img/AusSpeedruns-LogoBlack.svg" />
				<span>{item.game}</span>
			</h1>
			<ul className={styles["run-info"]}>
				<li>
					<span>Category</span>
					<span>{item.category}</span>
				</li>
				<li>
					<span>Platform</span>
					<span>{item.techPlatform ? abbreviateConsole(item.techPlatform) : abbreviateConsole(item.platform)}</span>
				</li>
				<li>
					<span>Estimate</span>
					<span>{item.estimate}</span>
				</li>
				<li>
					<span>Scheduled</span>
					<span>{item.scheduledTime ? format(new Date(item.scheduledTime), "E d H:mm a") : <br />}</span>
				</li>
			</ul>
			<div className={styles["people"]}>
				<ul className={styles["run-runners"]}>
					<h2>
						Runners{item.race && " [Race]"}
						{item.coop && " [Co-op]"}
					</h2>

					{item.runners.map((runner) => (
						<li key={runner.id}>
							<input type="checkbox" />
							{runner.username} <span className={styles["pronouns"]}>{runner.pronouns && `[${runner.pronouns}]`}</span>
						</li>
					))}
				</ul>
				<div className={styles["staff"]}>
					<h2>Tech</h2>
				</div>
			</div>
			<h2 className={styles["do-not-print"]}>Checklist</h2>
			<div className={styles["run-checklist-heading"]}>Pre-run</div>
			<ul className={styles["run-checklist"]}>
				{ChecklistItems.preTech.map((check) => (
					<li key={check}>
						<input type="checkbox" />
						{check}
					</li>
				))}
			</ul>
			<div className={styles["run-checklist-heading"]}>Setup</div>
			<ul className={styles["run-checklist"]}>
				{getChecklist(getConsoleType(abbreviateConsole(item.platform))).map((check) => (
					<li key={check}>
						<input type="checkbox" />
						{check}
					</li>
				))}
				{ChecklistItems.postConsole.map((check) => (
					<li key={check}>
						<input type="checkbox" />
						{check}
					</li>
				))}
			</ul>
			<div className={styles["run-checklist-heading"]}>Post Start</div>
			<ul className={styles["run-checklist"]}>
				{ChecklistItems.postTech.map((check) => (
					<li key={check}>
						<input type="checkbox" />
						{check}
					</li>
				))}
			</ul>
			<div className={styles["run-notes"]}>
				<h3>Notes:</h3>
				<span>
					{item.specialRequirements
						.split("\n")
						.flatMap((val, idx, arr) => (idx === arr.length - 1 ? val : [val, <br key={idx} />]))}
				</span>
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
		.map((_, idx) => <Checklist key={`blank-${idx}`} item={BlankChecklist} printOnly />);

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
		<Layout title={"Checklists"} description="Checklists for the current AusSpeedruns event">
			<BrowserOnly>
				{() => {
					return (
						<button onClick={window.print} className={styles["do-not-print"]}>
							Print
						</button>
					);
				}}
			</BrowserOnly>
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
		case "pc":
			return "PC";
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

type ConsoleType = "PC" | "HD Console" | "Analogue Console" | "Unknown";

function getConsoleType(consoleType: ReturnType<typeof abbreviateConsole>): ConsoleType {
	switch (consoleType) {
		case "PC":
			return "PC";
		case "PS1":
			return "Analogue Console";
		case "PS2":
			return "Analogue Console";
		case "PS3":
			return "HD Console";
		case "PS4":
			return "HD Console";
		case "PS5":
			return "HD Console";
		case "X360":
			return "HD Console";
		case "SNES":
			return "Analogue Console";
		case "NES":
			return "Analogue Console";
		case "NES Classic":
			return "HD Console";
		case "Switch":
			return "HD Console";
		case "Series S":
			return "HD Console";
		case "Series X":
			return "HD Console";
		case "GameCube":
			return "Analogue Console";
		case "GBA":
			return "Analogue Console";
		case "Game Boy":
			return "Analogue Console";
		case "GBC":
			return "Analogue Console";
		case "Game Boy Player":
			return "Analogue Console";
		case "Arcade":
			return "Unknown";
		case "Saturn":
			return "Analogue Console";
		case "WiiU":
			return "HD Console";
	}

	return "Unknown";
}

const ChecklistItems = {
	preTech: ["Previous Runner gear gone", "Wipe Down Headsets"],
	postConsole: [
		"Runner's equipment setup",
		"Runner Info/Pronouns",
		"Game Video",
		"Audio",
		"Cropping",
		"Cameras",
		"Names match order",
		"Preview audio",
		"Runner informed about going live",
	],
	postTech: ["Speakers Audio", "Monitor Twitch Chat"],
} as const;

const PCChecklist = [
	"HDMI from Splitter into PC",
	"Monitor on correct source",
	"Steam/Launcher Overlay Off",
	"Wipe Down Keyboard + Mouse",
] as const;

const HDConsoleChecklist = ["HDMI from Splitter into Console", "Monitor on correct source"] as const;

const UnknownChecklist = ["Discuss with runner how to capture console."] as const;

const ConsoleChecklist = ["HDMI from Splitter into RetroTink", "Monitor on correct source"];

function getChecklist(consoleType: ConsoleType) {
	switch (consoleType) {
		case "Analogue Console":
			return ConsoleChecklist;
		case "HD Console":
			return HDConsoleChecklist;
		case "PC":
			return PCChecklist;
		case "Unknown":
			return UnknownChecklist;
	}
}

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
			username: "_______",
			pronouns: "",
			twitch: "",
		},
		{
			id: "",
			username: "_______",
			pronouns: "",
			twitch: "",
		},
		// {
		// 	id: "",
		// 	username: "_______",
		// 	pronouns: "",
		// 	twitch: "",
		// },
		// {
		// 	id: "",
		// 	username: "_______",
		// 	pronouns: "",
		// 	twitch: "",
		// },
	],
	techPlatform: "",
	specialRequirements: "",
};
