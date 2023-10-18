import PythonMode from "ace-builds/src-noconflict/mode-python";

// Create a new Mode that extends the PythonMode
let CustomPythonMode = function () {
  PythonMode.call(this);

  // Add your custom rules
  let CustomHighlightRules = function () {
    this.$rules = {
      start: [
        // Add your custom rules here
      ],
    };

    // Call this to normalize the rules (required by Ace)
    this.normalizeRules();
  };

  // Set up inheritance
  CustomHighlightRules.prototype = new this.HighlightRules();
  CustomHighlightRules.prototype.constructor = CustomHighlightRules;

  // Replace the HighlightRules with your custom HighlightRules
  this.HighlightRules = CustomHighlightRules;
};

// Set up inheritance
CustomPythonMode.prototype = new PythonMode();
CustomPythonMode.prototype.constructor = CustomPythonMode;

export default CustomPythonMode;

