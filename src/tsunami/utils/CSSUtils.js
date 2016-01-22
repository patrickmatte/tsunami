function getCSSRule(ruleName, deleteFlag) {
   if (document.styleSheets) {
      for (var i = 0; i < document.styleSheets.length; i++) {
         var styleSheet = document.styleSheets[i];
         var ii = 0;
         var cssRule = false;
         do {
            if (styleSheet.cssRules) {
               cssRule = styleSheet.cssRules[ii];
            } else {
               cssRule = styleSheet.rules[ii];
            }
            if (cssRule) {
				if (cssRule instanceof CSSStyleRule) {
				   if (cssRule.selectorText == ruleName) {
					  if (deleteFlag == 'delete') {
						 if (styleSheet.cssRules) {
							styleSheet.deleteRule(ii);
						 } else {
							styleSheet.removeRule(ii);
						 }
						 return true;
					  } else {
						 return cssRule;
					  }
				   }
				}
            }
            ii++;
         } while (cssRule)
      }
   }
   return false;
}

function killCSSRule(ruleName) {
   return getCSSRule(ruleName,'delete');
}

function addCSSRule(ruleName) {
   if (document.styleSheets) {
      if (!getCSSRule(ruleName)) {
         if (document.styleSheets[0].addRule) {
            document.styleSheets[0].addRule(ruleName, null,0);
         } else {
            document.styleSheets[0].insertRule(ruleName+' { }', 0);
         }
      }
   }
   return getCSSRule(ruleName);
} 
