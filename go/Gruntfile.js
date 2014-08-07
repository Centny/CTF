module.exports = function(grunt) {
  // var go_b_dir = process.env["GO_B_DIR"];
  var js_b_idr = process.env["JS_B_DIR"];
  var ws_b_dir = process.env["WS_B_DIR"];
  //
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-srv');
  grunt.initConfig({
    srv: {
      wdm: {
        options: {
          ctrlc: true,
          wait: 1000
        },
        cmd: 'webdriver-manager start'
      },
      igsrv: {
        options: {
          stdout: true,
          wait: 2000,
          stopf: function(exec) {
            grunt.SrvWebKill("http://localhost:7899/ctf/exit");
          },
          cwd: ws_b_dir
        },
        ucmd: 'bin/srv.test -test.v --test.coverprofile=../go/ig.out',
        wcmd: '.\\bin\\srv.test.exe -test.v --test.coverprofile=../go/ig.out'
      },
      jcr: {
        options: {
          stdout: true,
          wait: 1000,
          stopf: function(exec) {
            grunt.SrvWebKill("http://localhost:5457/jcr/exit");
          }
        },
        cmd: 'jcr start -o ' + js_b_idr + " /e2e"
      }
    },
    shell: {
      uni: {
        command: "karma start www/test/karma-unit.conf.js"
      },
      e2e: {
        command: "protractor www/test/protractor-conf.js"
      }
    }
  });
  grunt.registerTask('duni', ['shell:uni']);
  grunt.registerTask('de2e', ['shell:e2e']);
  grunt.registerTask('dsrv', ['srv:wdm', 'srv:igsrv', 'srv:jcr']);
  grunt.registerTask('e2e', ['dsrv', 'de2e', 'srv-stop']);
  grunt.registerTask('default', ['duni', 'e2e']);
};