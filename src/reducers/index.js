import { combineReducers } from 'redux';

import init from './init';
import decrypt from './decrypt';
import main from './main';
import dialogs from './dialogs';
import files from './files';

export default combineReducers({init, decrypt, main, files, dialogs});