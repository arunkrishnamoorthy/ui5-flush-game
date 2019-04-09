sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"../controls/MessageToastDeluxe",
	"../model/formatter",
	"sap/base/util/UriParameters",
], function (BaseController, JSONModel, MessageToastDeluxe, formatter, UriParameters) {
	"use strict";

	return BaseController.extend("flush.game.controller.Game", {

		formatter: formatter,

		/**
		 * Sets up the home screen
		 */
		onInit: function () {
			BaseController.prototype.onInit.apply(this, arguments);

			var oViewModel = new JSONModel({
				level: "",
				multi: false,
				instructions: "",
				difficulty: 1,
				title: this.getResourceBundle().getText("gameTitleLoading"),
				busy: true,
				// multiplayer properties (updated by game)
				player1Energy: 0,
				player2Energy: 0,
				player1Lives: 0,
				player2Lives: 0,
				// an additional array to be bound
				player1LivesArray: [],
				player2LivesArray: []
			});
			this.setModel(oViewModel, "view");

			this.getRouter().getRoute("game").attachPatternMatched(this._loadLevel, this);
		},

		/**
		 * Load and configure the level based on url parameters
		 * @param {sap.ui.base.Event} oEvent the routing event
		 * @private
		 */
		_loadLevel: function (oEvent) {
			var oArguments = oEvent.getParameter("arguments");

			// set level parameters
			this.getModel("view").setProperty("/busy", true);
			this.getModel("view").setProperty("/level", oArguments.level);
			this.getModel("view").setProperty("/difficulty", parseInt(oArguments.difficulty));
			this.getModel("view").setProperty("/multi", /multi/i.test(oArguments.level));

			// update level instructions
			this.getModel("view").setProperty("/instructions", this.getResourceBundle().getText("gameInstructions" + oArguments.level));

			// set level-specific time limit
			if (oArguments.level === "WhackABug") {
				this.getModel("view").setProperty("/timeLimit", 45);
			} else if (oArguments.level === "Uncontrollable") {
				this.getModel("view").setProperty("/timeLimit", 60);
			} else if (oArguments.level === "UncontrollableMultiplayer") {
				this.getModel("view").setProperty("/timeLimit", 60);
			} else if (oArguments.level === "PlopARobot") {
				this.getModel("view").setProperty("/timeLimit", 30);
			}

			// reset time limit and display special canvas for debugging
			var oUriParameters = new UriParameters(window.location.href);

			if (oUriParameters.get("game-debug")) {
				this.getModel("view").setProperty("/timeLimit", 999999);
				this.getModel("view").setProperty("/debug", true);
			}

			// update page title
			this.getModel("view").setProperty("/title", this.getResourceBundle().getText("gameTitleLevel", [this.getModel("view").getProperty("/level"), this.getModel("view").getProperty("/difficulty")]));

			// force re-rendering also when going to the same level again
			this.byId("page").invalidate();

			// play game story
			this._playStory(this.getModel("view").getProperty("/level"));

			// play level sound
			this.getSoundManager().stop("Level");
			this.getSoundManager().play("Level");
		},

		/**
		 * Updates the life bar in the multiplayer controls
		 * @param {int} iWho the player that has been hit
		 * @private
		 */
		_updateLifeBar: function (iWho) {
			var iLives = this.getModel("view").getProperty("/player" + iWho + "Lives");
			var aLives = [];
			for (var i = 0; i < iLives; i++) {
				aLives.push(1);
			}
			this.getModel("view").setProperty("/player" + iWho + "LivesArray", aLives);
		},

		/**
		 * Initialization after a game level has been initialized
		 */
		onLevelInit: function () {
			this.getModel("view").setProperty("/busy", false);
			this._updateLifeBar(1);
			this._updateLifeBar(2);
			this.getSoundManager().play("roboStart");
		},

		/**
		 * Cleanup after a game level has been ended
		 * @param {sap.ui.base.Event} oEvent the game end event
		 */
		onLevelEnd: function (oEvent) {
			clearInterval(this._iInterval);
			this.getModel("appView").setProperty("/fromGame", true);
			this.getModel("view").setProperty("/instructions", "");
			// go to single or multiplayer mode home depending on current level
			if (this.getModel("view").getProperty("/multi")) {
				// just place a target so that winner info is not in the URL
				this.getRouter().getTargets().display("multi", {
					who: oEvent.getParameter("who"),
					level: this.getModel("view").getProperty("/level"),
					difficulty: this.getModel("view").getProperty("/difficulty")
				});
				// update hash as well but no navigation
				this.getRouter().navTo("multi", undefined, true);
			} else {
				this.getRouter().navTo("home");
			}
		},

		/**
		 * Called when a player has been hit in the game to update the display
		 * @param {sap.ui.base.Event} oEvent the game hit event
		 */
		onLevelHit: function (oEvent) {
			var iWho = oEvent.getParameter("who");
			this._updateLifeBar(iWho);
		},

		/**
		 * Called when a bomb has been thrown in the game to update the display
		 * @param {sap.ui.base.Event} oEvent the game bomb event
		 */
		onLevelBomb: function (oEvent) {
			var iWho = oEvent.getParameter("who");
		},

		/**
		 * Go back to home screen after ending the current game level
		 */
		onBack: function () {
			clearInterval(this._iInterval);
			this._stopStory();
			this.byId("page").end().then(function () {
				if (this.getModel("view").getProperty("/multi")) {
					this.getRouter().navTo("multi");
				} else {
					this.getRouter().navTo("home");
				}
			}.bind(this));
		}

	});
});