const core=require('./scripts/core.cjs');
module.exports=function(config){
  config.setNunjucksEnvironmentOptions({autoescape:true});
  config.addPassthroughCopy({'public':'/'});
  config.addFilter('mediaImage',core.mediaImage);
  config.addFilter('markdown',text=>core.markdown(text));
  config.addFilter('relatedUrl',relation=>core.relatedUrl(relation));
  config.addFilter('optionalVideo',video=>core.optionalVideo(video));
  config.addFilter('readingTime',core.readingTime);
  config.addFilter('signupForm',require('./scripts/signup.cjs').form);
  config.addFilter('signupPrimary',require('./scripts/signup.cjs').primary);
  config.addFilter('signupFooter',require('./scripts/signup.cjs').footer);
  config.addFilter('chapterBlock',require('./scripts/journey.cjs').renderBlock);
  return {dir:{input:'src',includes:'_includes',data:'_data',output:'dist'},htmlTemplateEngine:'njk',markdownTemplateEngine:'njk'};
};

