'use babel';
'use strict';

const iPath = require('path');
const iRef = require('child_process');
const spawn = require('child_process').spawn;
const iExec = require('child_process').exec;
const iExecFile = iRef.execFile;
const fs = require('fs');
//const prompt = require('prompt');


/**
* Class for running the git commands.
* @author niklas fallik
*/
export default class Git {

	clone(user, repo, path) {
		var gitPath = atom.config.get('agsbs-atom-package.gitPath');
		iExec(`git clone git+ssh://${user}@${gitPath}/${repo} ${path}`, {cwd: path}, (error, stdout, stderr) => {
			if (error) {
    			console.error(`exec error: ${error}`);
    			return;
  			}
  			console.log(`stdout: ${stdout}`);
  			console.log(`stderr: ${stderr}`);
		});
	}

	/**
	* Executes `git pull`.
	*/
	pull(path) {
		iExec('git pull', {cwd: path}, (error, stdout, stderr) => {
  			if (error) {
    			console.error(`exec error: ${error}`);
    			return;
  			}
  			console.log(`stdout: ${stdout}`);
  			console.log(`stderr: ${stderr}`);
		});
	}


	/**
	* Executes `git add -A`.
	*/
	add(message, path) {
		iExec('git add -A', {cwd: path}, (error, stdout, stderr) => {
  			if (error) {
    			console.error(`exec error: ${error}`);
    			return;
  			}
  			console.log(`stdout: ${stdout}`);
  			console.log(`stderr: ${stderr}`);
			this.commit(message, path);
		});
	}

	/**
	* Executes `git commit -am "message"`.
	* @param {string} message The commit message.
	* @param {string} path The path of the local git repository.
	*/
	commit(message, path) {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
			iExec(`git commit -am "${message}"`, {cwd: path}, (error, stdout, stderr) => {
				if (error) {
	    			console.error(`exec error: ${error}`);
					atom.notifications.addError(language.commitChangesError, {
						detail : language.commitChangesErrorDetail + error,
						dismissable : true
					});
	    			return;
	  			}
				console.log(`stdout: ${stdout}`);
	  			console.log(`stderr: ${stderr}`);
				this.push(path);
				atom.notifications.addSuccess(language.commitChangesSuccess, {
					detail : stdout,
					dismissable : true
				});
			});
	}

	/**
	* Executes `git push`.
	*/
	push(path) {
		iExec('git push', {cwd: path}, (error, stdout, stderr) => {
  			if (error) {
    			console.error(`exec error: ${error}`);
    			return;
  			}
  			console.log(`stdout: ${stdout}`);
  			console.log(`stderr: ${stderr}`);
		});
	}
}
