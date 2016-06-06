'use babel';

var $ = require('jquery');
import DialogView from './dialog-view';

export default class NewProjectDialog extends DialogView {

	constructor(serializedState) {
		super(serializedState);
		//get this.element and its child dialogContent from superclass

		const newProjectForm = document.createElement('form');
		// dialogContent.classList.add('dialog_content');
		newProjectForm.setAttribute('method','post');

		const newProjectName = document.createElement('input');
		newProjectName.setAttribute('type','text');
		newProjectName.setAttribute('name','username');
		newProjectName.setAttribute('placeholder','project name');

		const newProjectSubmit = document.createElement("input");
		newProjectSubmit.setAttribute('type', 'submit');
		newProjectSubmit.setAttribute('value','Submit');

		newProjectForm.appendChild(newProjectName);
		newProjectForm.appendChild(newProjectSubmit);
		this.dialogContent.appendChild(newProjectForm);
	}
}