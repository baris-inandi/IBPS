const oop = require("../lib/oop");
const TextHighlightRules =
  require("./text_highlight_rules").TextHighlightRules;

const PythonHighlightRules = function () {
  const keywords =
    "and|as|assert|break|class|continue|def|del|elif|else|except|exec|" +
    "finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|" +
    "raise|return|try|while|with|yield|async|await|nonlocal";

  const builtinConstants =
    "True|False|None|NotImplemented|Ellipsis|__debug__";

  const builtinFunctions =
    "abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|" +
    "eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|" +
    "binfile|bin|iter|property|tuple|bool|filter|len|range|type|bytearray|" +
    "float|list|raw_input|unichr|callable|format|locals|reduce|unicode|" +
    "chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|" +
    "cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|" +
    "__import__|complex|hash|min|apply|delattr|help|next|setattr|set|" +
    "buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern|" +
    "ascii|breakpoint|bytes";

  //const futureReserved = "";
  const keywordMapper = this.createKeywordMapper(
    {
      "invalid.deprecated": "debugger",
      "support.function": builtinFunctions,
      "variable.language": "self|cls",
      "constant.language": builtinConstants,
      "keyword": keywords,
    },
    "identifier",
  );

  const strPre = "[uU]?";
  const strRawPre = "[rR]";
  const strFormatPre = "[fF]";
  const strRawFormatPre = "(?:[rR][fF]|[fF][rR])";
  const decimalInteger = "(?:(?:[1-9]\\d*)|(?:0))";
  const octInteger = "(?:0[oO]?[0-7]+)";
  const hexInteger = "(?:0[xX][\\dA-Fa-f]+)";
  const binInteger = "(?:0[bB][01]+)";
  const integer =
    "(?:" +
    decimalInteger +
    "|" +
    octInteger +
    "|" +
    hexInteger +
    "|" +
    binInteger +
    ")";

  const exponent = "(?:[eE][+-]?\\d+)";
  const fraction = "(?:\\.\\d+)";
  const intPart = "(?:\\d+)";
  const pointFloat =
    "(?:(?:" + intPart + "?" + fraction + ")|(?:" + intPart + "\\.))";
  const exponentFloat =
    "(?:(?:" + pointFloat + "|" + intPart + ")" + exponent + ")";
  const floatNumber = "(?:" + exponentFloat + "|" + pointFloat + ")";

  const stringEscape =
    "\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv'\"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";

  this.$rules = {
    start: [
      {
        token: "comment",
        regex: "#.*$",
      },
      {
        token: "string", // multi line """ string start
        regex: strPre + '"{3}',
        next: "qqstring3",
      },
      {
        token: "string", // " string
        regex: strPre + '"(?=.)',
        next: "qqstring",
      },
      {
        token: "string", // multi line ''' string start
        regex: strPre + "'{3}",
        next: "qstring3",
      },
      {
        token: "string", // ' string
        regex: strPre + "'(?=.)",
        next: "qstring",
      },
      {
        token: "string",
        regex: strRawPre + '"{3}',
        next: "rawqqstring3",
      },
      {
        token: "string",
        regex: strRawPre + '"(?=.)',
        next: "rawqqstring",
      },
      {
        token: "string",
        regex: strRawPre + "'{3}",
        next: "rawqstring3",
      },
      {
        token: "string",
        regex: strRawPre + "'(?=.)",
        next: "rawqstring",
      },
      {
        token: "string",
        regex: strFormatPre + '"{3}',
        next: "fqqstring3",
      },
      {
        token: "string",
        regex: strFormatPre + '"(?=.)',
        next: "fqqstring",
      },
      {
        token: "string",
        regex: strFormatPre + "'{3}",
        next: "fqstring3",
      },
      {
        token: "string",
        regex: strFormatPre + "'(?=.)",
        next: "fqstring",
      },
      {
        token: "string",
        regex: strRawFormatPre + '"{3}',
        next: "rfqqstring3",
      },
      {
        token: "string",
        regex: strRawFormatPre + '"(?=.)',
        next: "rfqqstring",
      },
      {
        token: "string",
        regex: strRawFormatPre + "'{3}",
        next: "rfqstring3",
      },
      {
        token: "string",
        regex: strRawFormatPre + "'(?=.)",
        next: "rfqstring",
      },
      {
        token: "keyword.operator",
        regex:
          "\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|@|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|=",
      },
      {
        token: "punctuation",
        regex:
          ",|:|;|\\->|\\+=|\\-=|\\*=|\\/=|\\/\\/=|%=|@=|&=|\\|=|^=|>>=|<<=|\\*\\*=",
      },
      {
        token: "paren.lparen",
        regex: "[\\[\\(\\{]",
      },
      {
        token: "paren.rparen",
        regex: "[\\]\\)\\}]",
      },
      {
        token: ["keyword", "text", "entity.name.function"],
        regex:
          "(def|class)(\\s+)([\\u00BF-\\u1FFF\\u2C00-\\uD7FF\\w]+)",
      },
      {
        token: "text",
        regex: "\\s+",
      },
      {
        include: "constants",
      },
    ],
    qqstring3: [
      {
        token: "constant.language.escape",
        regex: stringEscape,
      },
      {
        token: "string", // multi line """ string end
        regex: '"{3}',
        next: "start",
      },
      {
        defaultToken: "string",
      },
    ],
    qstring3: [
      {
        token: "constant.language.escape",
        regex: stringEscape,
      },
      {
        token: "string", // multi line ''' string end
        regex: "'{3}",
        next: "start",
      },
      {
        defaultToken: "string",
      },
    ],
    qqstring: [
      {
        token: "constant.language.escape",
        regex: stringEscape,
      },
      {
        token: "string",
        regex: "\\\\$",
        next: "qqstring",
      },
      {
        token: "string",
        regex: '"|$',
        next: "start",
      },
      {
        defaultToken: "string",
      },
    ],
    qstring: [
      {
        token: "constant.language.escape",
        regex: stringEscape,
      },
      {
        token: "string",
        regex: "\\\\$",
        next: "qstring",
      },
      {
        token: "string",
        regex: "'|$",
        next: "start",
      },
      {
        defaultToken: "string",
      },
    ],
    rawqqstring3: [
      {
        token: "string", // multi line """ string end
        regex: '"{3}',
        next: "start",
      },
      {
        defaultToken: "string",
      },
    ],
    rawqstring3: [
      {
        token: "string", // multi line ''' string end
        regex: "'{3}",
        next: "start",
      },
      {
        defaultToken: "string",
      },
    ],
    rawqqstring: [
      {
        token: "string",
        regex: "\\\\$",
        next: "rawqqstring",
      },
      {
        token: "string",
        regex: '"|$',
        next: "start",
      },
      {
        defaultToken: "string",
      },
    ],
    rawqstring: [
      {
        token: "string",
        regex: "\\\\$",
        next: "rawqstring",
      },
      {
        token: "string",
        regex: "'|$",
        next: "start",
      },
      {
        defaultToken: "string",
      },
    ],
    fqqstring3: [
      {
        token: "constant.language.escape",
        regex: stringEscape,
      },
      {
        token: "string", // multi line """ string end
        regex: '"{3}',
        next: "start",
      },
      {
        token: "paren.lparen",
        regex: "{",
        push: "fqstringParRules",
      },
      {
        defaultToken: "string",
      },
    ],
    fqstring3: [
      {
        token: "constant.language.escape",
        regex: stringEscape,
      },
      {
        token: "string", // multi line ''' string end
        regex: "'{3}",
        next: "start",
      },
      {
        token: "paren.lparen",
        regex: "{",
        push: "fqstringParRules",
      },
      {
        defaultToken: "string",
      },
    ],
    fqqstring: [
      {
        token: "constant.language.escape",
        regex: stringEscape,
      },
      {
        token: "string",
        regex: "\\\\$",
        next: "fqqstring",
      },
      {
        token: "string",
        regex: '"|$',
        next: "start",
      },
      {
        token: "paren.lparen",
        regex: "{",
        push: "fqstringParRules",
      },
      {
        defaultToken: "string",
      },
    ],
    fqstring: [
      {
        token: "constant.language.escape",
        regex: stringEscape,
      },
      {
        token: "string",
        regex: "'|$",
        next: "start",
      },
      {
        token: "paren.lparen",
        regex: "{",
        push: "fqstringParRules",
      },
      {
        defaultToken: "string",
      },
    ],
    rfqqstring3: [
      {
        token: "string", // multi line """ string end
        regex: '"{3}',
        next: "start",
      },
      {
        token: "paren.lparen",
        regex: "{",
        push: "fqstringParRules",
      },
      {
        defaultToken: "string",
      },
    ],
    rfqstring3: [
      {
        token: "string", // multi line ''' string end
        regex: "'{3}",
        next: "start",
      },
      {
        token: "paren.lparen",
        regex: "{",
        push: "fqstringParRules",
      },
      {
        defaultToken: "string",
      },
    ],
    rfqqstring: [
      {
        token: "string",
        regex: "\\\\$",
        next: "rfqqstring",
      },
      {
        token: "string",
        regex: '"|$',
        next: "start",
      },
      {
        token: "paren.lparen",
        regex: "{",
        push: "fqstringParRules",
      },
      {
        defaultToken: "string",
      },
    ],
    rfqstring: [
      {
        token: "string",
        regex: "'|$",
        next: "start",
      },
      {
        token: "paren.lparen",
        regex: "{",
        push: "fqstringParRules",
      },
      {
        defaultToken: "string",
      },
    ],
    fqstringParRules: [
      {
        //TODO: nested {}
        token: "paren.lparen",
        regex: "[\\[\\(]",
      },
      {
        token: "paren.rparen",
        regex: "[\\]\\)]",
      },
      {
        token: "string",
        regex: "\\s+",
      },
      {
        token: "string",
        regex: "'[^']*'",
      },
      {
        token: "string",
        regex: '"[^"]*"',
      },
      {
        token: "function.support",
        regex: "(!s|!r|!a)",
      },
      {
        include: "constants",
      },
      {
        token: "paren.rparen",
        regex: "}",
        next: "pop",
      },
      {
        token: "paren.lparen",
        regex: "{",
        push: "fqstringParRules",
      },
    ],
    constants: [
      {
        token: "constant.numeric", // imaginary
        regex: "(?:" + floatNumber + "|\\d+)[jJ]\\b",
      },
      {
        token: "constant.numeric", // float
        regex: floatNumber,
      },
      {
        token: "constant.numeric", // long integer
        regex: integer + "[lL]\\b",
      },
      {
        token: "constant.numeric", // integer
        regex: integer + "\\b",
      },
      {
        token: ["punctuation", "function.support"], // method
        regex: "(\\.)([a-zA-Z_]+)\\b",
      },
      {
        token: keywordMapper,
        regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b",
      },
    ],
  };
  this.normalizeRules();
};

oop.inherits(PythonHighlightRules, TextHighlightRules);

exports.PythonHighlightRules = PythonHighlightRules;

