"use strict";

import React from "react";

import MainMenu from "./MainMenu.react";
import StatusBar from "./StatusBar.react";

import AppStateEnvelope from "./AppStateEnvelope.react";

class Manager extends React.Component {
    render() {
        return <div>
					<div id="windowTop"></div>
					<header>
                        <div id="mainMenu">
							<MainMenu></MainMenu>
						</div>
					</header>
					<main>
						<div id="content">
                            <AppStateEnvelope></AppStateEnvelope>
						</div>
					</main>
					<footer className="page-footer">
						<StatusBar></StatusBar>
					</footer>
				</div>;
    }
};

export default Manager;