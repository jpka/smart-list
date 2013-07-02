var cp = require("child_process");

module.exports = function(grunt) {
  grunt.initConfig({
    replace: {
      build: {
        options: {
          variables: {
            "script": "<%= grunt.script %>"
          }
        },
        files: [
          {src: ["component.html"], dest: "./index.html"}
        ]
      }
    },
    watch: {
      build: {
        files: ["script.js", "component.html"],
        tasks: ["build"]
      }
    }
  });
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-replace");

  grunt.registerTask("karma", function() {
    cp.spawn("node_modules/.bin/karma", ["start"], {stdio: "inherit"});
  });

  grunt.registerTask("uglifyjs", function() {
    var done = this.async();
    cp.exec("node_modules/.bin/uglifyjs script.js -c -m", function(err, stdout) {
      if (err) throw err;
      grunt.script = stdout;
      done();
    });
  });

  grunt.registerTask("build", ["uglifyjs", "replace:build"]);
  grunt.registerTask("test", ["build", "karma", "watch:build"]);
}
