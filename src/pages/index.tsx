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
import image07 from "../css/cursed/IMG_4995.JPG";
import image08 from "../css/cursed/IMG_5003.JPG";
import image09 from "../css/cursed/IMG_6159.JPG";
import image10 from "../css/cursed/IMG_6167.JPG";

const cursedImages = [image03, image05, image01, image02, image04, image06, image07, image08, image09, image10];

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
				<div className={styles.buttons}></div>
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
