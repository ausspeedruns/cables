import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";

import image01 from "../css/cursed/F1XTk43aMAAUHTI.jpg";
import image02 from "../css/cursed/F1YysiCaYAEswL3.jpg";
import image03 from "../css/cursed/F1YyvOWacAYd0oZ.jpg";
import image04 from "../css/cursed/F1dDmKFXoAEWiEL.jpg";
import image05 from "../css/cursed/FYBkcCEUEAY8VMg.jpg";
import image06 from "../css/cursed/IMG_4889.JPG";
import image07 from "../css/cursed/9d6fddb27b89302ccc4674f987fc.jpg";
import image08 from "../css/cursed/IMG_5003.JPG";
import image09 from "../css/cursed/IMG_6159.JPG";
import image10 from "../css/cursed/fca2d21aa3b32a7e661e92b0ccb4.jpg";
import image11 from "../css/cursed/1606eae510bf7ac84585c8381be8.jpg";
import image12 from "../css/cursed/9101ef4f972b7432b47e9daf61ff.jpg";
import image13 from "../css/cursed/e0cc6cf139ba1cbb7f02a01b740c.jpg";
import image14 from "../css/cursed/ecef9f70f326b9246d809fe94ba3.jpg";

const cursedImages = [
	image03,
	image05,
	image01,
	image02,
	image04,
	image06,
	image07,
	image08,
	image09,
	image10,
	image11,
	image12,
	image13,
	image14,
];

function HomepageHeader() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<header className={clsx("hero hero--primary", styles.heroBanner)}>
			<div className="container">
				<h1 className="hero__title">{siteConfig.title}</h1>
				<p className="hero__subtitle">{siteConfig.tagline}</p>
				<marquee scrollamount="8">
					{cursedImages.map((imageSrc) => (
						<img src={imageSrc} />
					))}
				</marquee>
			</div>
		</header>
	);
}

export default function Home(): JSX.Element {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout title={`Techies checkin' them cables`} description="AusSpeedruns tech documentation site">
			<HomepageHeader />
			<main>{/* <HomepageFeatures /> */}</main>
		</Layout>
	);
}
