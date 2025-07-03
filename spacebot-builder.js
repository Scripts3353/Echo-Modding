// spacebot-builder.js

// Initialize Blockly
const workspace = Blockly.inject("blocklyDiv", {
  toolbox: document.getElementById("toolbox"),
  theme: Blockly.Themes.Dark,
  scrollbars: true,
  trashcan: true,
  renderer: "zelos",
});

// Define custom blocks
Blockly.defineBlocksWithJsonArray([
  {
    type: "bot_command",
    message0: "when /%1 is used",
    args0: [{ type: "field_input", name: "CMD", text: "start" }],
    message1: "%1",
    args1: [{ type: "input_statement", name: "DO" }],
    colour: 230
  },
  {
    type: "on_user_join",
    message0: "when user joins",
    message1: "%1",
    args1: [{ type: "input_statement", name: "DO" }],
    colour: 200
  },
  {
    type: "on_message_contains",
    message0: "when message contains %1",
    args0: [{ type: "field_input", name: "TEXT", text: "hello" }],
    message1: "%1",
    args1: [{ type: "input_statement", name: "DO" }],
    colour: 200
  },
  {
    type: "mod_kick",
    message0: "kick user %1 with reason %2",
    args0: [
      { type: "field_input", name: "USER", text: "@user" },
      { type: "field_input", name: "REASON", text: "rule violation" }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 10
  },
  {
    type: "mod_ban",
    message0: "ban user %1 with reason %2",
    args0: [
      { type: "field_input", name: "USER", text: "@user" },
      { type: "field_input", name: "REASON", text: "spamming" }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 10
  },
  {
    type: "mod_mute",
    message0: "mute user %1 for %2 minutes",
    args0: [
      { type: "field_input", name: "USER", text: "@user" },
      { type: "field_number", name: "MINUTES", value: 5 }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 10
  },
  {
    type: "mod_warn",
    message0: "warn user %1 with reason %2",
    args0: [
      { type: "field_input", name: "USER", text: "@user" },
      { type: "field_input", name: "REASON", text: "toxic behavior" }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 10
  },
  {
    type: "delete_message",
    message0: "delete message",
    previousStatement: null,
    nextStatement: null,
    colour: 10
  },
  {
    type: "game_coinflip",
    message0: "play coin flip",
    previousStatement: null,
    nextStatement: null,
    colour: 290
  },
  {
    type: "game_rps",
    message0: "play rock paper scissors",
    previousStatement: null,
    nextStatement: null,
    colour: 290
  },
  {
    type: "game_guess",
    message0: "play number guessing game",
    previousStatement: null,
    nextStatement: null,
    colour: 290
  },
  {
    type: "game_slot",
    message0: "play slot machine",
    previousStatement: null,
    nextStatement: null,
    colour: 290
  },
  {
    type: "game_dice",
    message0: "roll a dice",
    previousStatement: null,
    nextStatement: null,
    colour: 290
  },
  {
    type: "send_embed",
    message0: "send embed titled %1 with text %2",
    args0: [
      { type: "field_input", name: "TITLE", text: "Notice" },
      { type: "field_input", name: "DESC", text: "Important update!" }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 260
  },
  {
    type: "assign_role",
    message0: "assign role %1 to user",
    args0: [{ type: "field_input", name: "ROLE", text: "Member" }],
    previousStatement: null,
    nextStatement: null,
    colour: 260
  },
  {
    type: "remove_role",
    message0: "remove role %1 from user",
    args0: [{ type: "field_input", name: "ROLE", text: "Muted" }],
    previousStatement: null,
    nextStatement: null,
    colour: 260
  },
  {
    type: "timeout_user",
    message0: "timeout user %1 for %2 minutes",
    args0: [
      { type: "field_input", name: "USER", text: "@user" },
      { type: "field_number", name: "MINUTES", value: 10 }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 260
  },
  {
    type: "level_up",
    message0: "level up user",
    previousStatement: null,
    nextStatement: null,
    colour: 260
  }
]);

// Generators
const jsGen = Blockly.JavaScript;

jsGen.forBlock["bot_command"] = (block, gen) => {
  const cmd = block.getFieldValue("CMD");
  const body = gen.statementToCode(block, "DO");
  return `bot.command("/${cmd}", async (ctx) => {\n${body}});\n`;
};

jsGen.forBlock["on_user_join"] = (block, gen) => {
  const body = gen.statementToCode(block, "DO");
  return `bot.on("guildMemberAdd", async (member) => {\n${body}});\n`;
};

jsGen.forBlock["on_message_contains"] = (block, gen) => {
  const text = block.getFieldValue("TEXT");
  const body = gen.statementToCode(block, "DO");
  return `bot.on("messageCreate", async (msg) => {\n  if (msg.content.includes("${text}")) {\n${body}  }\n});\n`;
};

jsGen.forBlock["mod_kick"] = block =>
  `  kick(${block.getFieldValue("USER")}, "${block.getFieldValue("REASON")}");\n`;

jsGen.forBlock["mod_ban"] = block =>
  `  ban(${block.getFieldValue("USER")}, "${block.getFieldValue("REASON")}");\n`;

jsGen.forBlock["mod_warn"] = block =>
  `  warn(${block.getFieldValue("USER")}, "${block.getFieldValue("REASON")}");\n`;

jsGen.forBlock["mod_mute"] = block =>
  `  mute(${block.getFieldValue("USER")}, ${block.getFieldValue("MINUTES")});\n`;

jsGen.forBlock["delete_message"] = () => `  msg.delete();\n`;

jsGen.forBlock["game_coinflip"] = () => `  playCoinFlip(ctx);\n`;
jsGen.forBlock["game_rps"] = () => `  playRPS(ctx);\n`;
jsGen.forBlock["game_guess"] = () => `  playGuessingGame(ctx);\n`;
jsGen.forBlock["game_slot"] = () => `  playSlots(ctx);\n`;
jsGen.forBlock["game_dice"] = () => `  rollDice(ctx);\n`;

jsGen.forBlock["send_embed"] = block =>
  `  sendEmbed(ctx, "${block.getFieldValue("TITLE")}", "${block.getFieldValue("DESC")}");\n`;

jsGen.forBlock["assign_role"] = block =>
  `  assignRole(ctx.user, "${block.getFieldValue("ROLE")}");\n`;

jsGen.forBlock["remove_role"] = block =>
  `  removeRole(ctx.user, "${block.getFieldValue("ROLE")}");\n`;

jsGen.forBlock["timeout_user"] = block =>
  `  timeout(${block.getFieldValue("USER")}, ${block.getFieldValue("MINUTES")});\n`;

jsGen.forBlock["level_up"] = () => `  levelUp(ctx.user);\n`;

// Code Generation
function generateCode() {
  const code = jsGen.workspaceToCode(workspace);
  document.getElementById("output").textContent = code || "// No code generated.";
}

// Export to .js
function exportFile() {
  const code = jsGen.workspaceToCode(workspace);
  const blob = new Blob([code], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "bot.js";
  a.click();
  URL.revokeObjectURL(url);
}
