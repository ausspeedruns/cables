"use strict";(self.webpackChunkcables=self.webpackChunkcables||[]).push([[777],{3890:(e,n,s)=>{s.r(n),s.d(n,{default:()=>d});s(6540);var r=s(4586),c=s(781),a=s(5090);const t={"checklist-root":"checklist-root_dY4v","print-only-run-container":"print-only-run-container_qe1t","run-container":"run-container_rBCt","run-info":"run-info_S6Lj",people:"people_Vq3M",staff:"staff_dHSL","run-runners":"run-runners_Y6Nn",pronouns:"pronouns_JC0l","run-checklist-heading":"run-checklist-heading_D8Pm","run-checklist":"run-checklist_Jhqs","run-notes":"run-notes_Z3qX","print-only":"print-only_mrLu","do-not-print":"do-not-print_crlY"};var i=s(8478),o=s(4848);function l(e){let{item:n,printOnly:s}=e;return(0,o.jsxs)("li",{className:s?t["print-only-run-container"]:t["run-container"],children:[(0,o.jsxs)("h1",{className:t["run-title"],children:[(0,o.jsx)("img",{className:t["print-only"],src:"/cables/img/AusSpeedruns-LogoBlack.svg"}),(0,o.jsx)("span",{children:n.game})]}),(0,o.jsxs)("ul",{className:t["run-info"],children:[(0,o.jsxs)("li",{children:[(0,o.jsx)("span",{children:"Category"}),(0,o.jsx)("span",{children:n.category.length>40?"Way Too Long":n.category})]}),(0,o.jsxs)("li",{children:[(0,o.jsx)("span",{children:"Platform"}),(0,o.jsx)("span",{children:n.techPlatform?h(n.techPlatform):h(n.platform)})]}),(0,o.jsxs)("li",{children:[(0,o.jsx)("span",{children:"Estimate"}),(0,o.jsx)("span",{children:n.estimate})]}),(0,o.jsxs)("li",{children:[(0,o.jsx)("span",{children:"Scheduled"}),(0,o.jsx)("span",{children:n.scheduledTime?(0,a.GP)(new Date(n.scheduledTime),"E d H:mm a"):(0,o.jsx)("br",{})})]})]}),(0,o.jsxs)("div",{className:t.people,children:[(0,o.jsxs)("ul",{className:t["run-runners"],children:[(0,o.jsxs)("h2",{children:["Runners",n.race&&" [Race]",n.coop&&" [Co-op]"]}),n.runners.map((e=>(0,o.jsxs)("li",{children:[(0,o.jsx)("input",{type:"checkbox"}),e.username," ",(0,o.jsx)("span",{className:t.pronouns,children:e.pronouns&&`[${e.pronouns}]`})]},e.id)))]}),(0,o.jsx)("div",{className:t.staff,children:(0,o.jsx)("h2",{children:"Tech"})})]}),(0,o.jsx)("h2",{className:t["do-not-print"],children:"Checklist"}),(0,o.jsx)("div",{className:t["run-checklist-heading"],children:"Pre-run"}),(0,o.jsx)("ul",{className:t["run-checklist"],children:m.preTech.map((e=>(0,o.jsxs)("li",{children:[(0,o.jsx)("input",{type:"checkbox"}),e]},e)))}),(0,o.jsx)("div",{className:t["run-checklist-heading"],children:"Setup"}),(0,o.jsxs)("ul",{className:t["run-checklist"],children:[S(p(h(n.platform))).map((e=>(0,o.jsxs)("li",{children:[(0,o.jsx)("input",{type:"checkbox"}),e]},e))),m.postConsole.map((e=>(0,o.jsxs)("li",{children:[(0,o.jsx)("input",{type:"checkbox"}),e]},e)))]}),(0,o.jsx)("div",{className:t["run-checklist-heading"],children:"Post Start"}),(0,o.jsx)("ul",{className:t["run-checklist"],children:m.postTech.map((e=>(0,o.jsxs)("li",{children:[(0,o.jsx)("input",{type:"checkbox"}),e]},e)))}),(0,o.jsxs)("div",{className:t["run-notes"],children:[(0,o.jsx)("h3",{children:"Notes:"}),(0,o.jsx)("span",{children:n.specialRequirements.split("\n").flatMap(((e,n,s)=>n===s.length-1?e:[e,(0,o.jsx)("br",{},n)]))})]})]})}function u(){const{siteConfig:e}=(0,r.A)(),{schedule:n}=e.customFields,s=new Array(4+(n?.length??0)%2).fill(0).map(((e,n)=>(0,o.jsx)(l,{item:f,printOnly:!0},`blank-${n}`)));return(0,o.jsxs)("ol",{className:t["checklist-root"],children:[n?.map((e=>(0,o.jsx)(l,{item:e},e.id))),s]})}function d(){return(0,o.jsxs)(c.A,{title:"Checklists",description:"Checklists for the current AusSpeedruns event",children:[(0,o.jsx)(i.A,{children:()=>(0,o.jsx)("button",{onClick:window.print,className:t["do-not-print"],children:"Print"})}),(0,o.jsx)(u,{}),(0,o.jsx)("main",{})]})}function h(e){switch(e.toLowerCase()){case"pc":return"PC";case"playstation 1":case"playstation1":return"PS1";case"playstation 2":case"playstation2":return"PS2";case"playstation 3":case"playstation3":return"PS3";case"playstation 4":case"playstation4":return"PS4";case"playstation 5":case"playstation5":return"PS5";case"xbox 360":return"X360";case"nintendo snes":case"super nintendo":case"super nintendo entertainment system":return"SNES";case"nintendo entertainment system":case"nintendo nes":return"NES";case"nintendo nes classic":return"NES Classic";case"nintendo switch":return"Switch";case"xbox series s":return"Series S";case"xbox series x":return"Series X";case"nintendo gamecube":return"GameCube";case"nintendo game boy advance":case"game boy advance":case"gb advance":return"GBA";case"nintendo game boy":return"Game Boy";case"nintendo game boy color":case"nintendo game boy colour":case"game boy color":case"game boy colour":case"gb color":case"gb colour":return"GBC";case"nintendo gamecube game boy player":return"Game Boy Player";case"arcade pcb":return"Arcade";case"sega saturn":return"Saturn";case"nintendo wiiu":return"WiiU"}return e}function p(e){switch(e){case"PC":return"PC";case"PS1":case"PS2":case"SNES":case"NES":case"GameCube":case"GBA":case"Game Boy":case"GBC":case"Game Boy Player":case"Saturn":return"Analogue Console";case"PS3":case"PS4":case"PS5":case"X360":case"NES Classic":case"Switch":case"Series S":case"Series X":case"WiiU":return"HD Console";case"Arcade":return"Unknown"}return"Unknown"}const m={preTech:["Previous Runner gear gone","Wipe Down Headsets"],postConsole:["Runner's equipment setup","Runner Info/Pronouns","Game Video","Audio","Cropping","Cameras","Names match order","Preview audio","Runner informed about going live"],postTech:["Speakers Audio","Monitor Twitch Chat"]},x=["HDMI from Splitter into PC","Monitor on correct source","Steam/Launcher Overlay Off","Wipe Down Keyboard + Mouse"],j=["HDMI from Splitter into Console","Monitor on correct source"],y=["Discuss with runner how to capture console."],g=["HDMI from Splitter into RetroTink","Monitor on correct source"];function S(e){switch(e){case"Analogue Console":return g;case"HD Console":return j;case"PC":return x;case"Unknown":return y}}const f={id:"",game:" ",category:"",platform:"",race:!1,coop:!1,estimate:"",scheduledTime:"",runners:[{id:"",username:"_______",pronouns:"",twitch:""},{id:"",username:"_______",pronouns:"",twitch:""}],techPlatform:"",specialRequirements:""}}}]);