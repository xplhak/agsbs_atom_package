'use babel';

const pathHandler = require('path');

import ViewManager from './view-manager';
import DialogView from './dialog-view';

export default class CommitChangesDialog extends DialogView {

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
		const git = agsbs.git;

		//get this.element and its child dialogContent from superclass
		super(serializedState);

		this.dialogHeadline.innerHTML = language.commitChanges;

		const commitChangesForm = document.createElement('form');
		commitChangesForm.classList.add('commit_changes_form');
		commitChangesForm.setAttribute('method','post');

		const commitMessageInput = this.viewManager.addTextInput(commitChangesForm, 'commit_message', language.commitMessage);
		commitMessageInput.setAttribute('tabindex', 1);
		commitMessageInput.addEventListener('input', function() {
			if(commitMessageInput.value == '') {
				viewManager.disableButton(commitChangesSubmit);
			} else {
				viewManager.enableButton(commitChangesSubmit);
			};
		});

		//Submit button
		const commitChangesSubmit = document.createElement('input');
		commitChangesSubmit.setAttribute('type', 'submit');
		commitChangesSubmit.setAttribute('value', language.commit);
		commitChangesSubmit.setAttribute('tabindex', 2);
		//Initialize submit button.
		viewManager.disableButton(commitChangesSubmit);

		commitChangesForm.appendChild(commitChangesSubmit);
		this.dialogContent.appendChild(commitChangesForm);

		commitChangesForm.addEventListener('submit', function(event) {
			var editor = atom.workspace.getActivePaneItem();
			editor.save();
			var path = pathHandler.dirname(editor.buffer.file.path);
			git.add(commitMessageInput.value, path);
			viewManager.closeDialog();
		});

		commitChangesForm.addEventListener('reset', function() {
			viewManager.disableButton(commitChangesSubmit);
		});
	}
}
